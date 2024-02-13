import React, {MouseEventHandler, PropsWithRef, useEffect, useMemo, useRef, useState} from "react";
import Editor, {composeDecorators} from '@draft-js-plugins/editor';
import createInlineToolbarPlugin from '@draft-js-plugins/inline-toolbar';
import createSideToolbarPlugin from '@draft-js-plugins/side-toolbar';
import createStickerPlugin from '@draft-js-plugins/sticker';
import LoadingButton from '@mui/lab/LoadingButton';
import createFocusPlugin from '@draft-js-plugins/focus';
import createAlignmentPlugin from '@draft-js-plugins/alignment';
import createResizeablePlugin from '@draft-js-plugins/resizeable';
import createBlockDndPlugin from '@draft-js-plugins/drag-n-drop';
import createImagePlugin from '@draft-js-plugins/image';
import createDragNDropUploadPlugin, {DndUploadPluginConfig} from '@draft-js-plugins/drag-n-drop-upload';
import {convertFromRaw, EditorState} from "draft-js";
import stickers from "./stickers";
import mockUpload from "@/mocks/mockUpload";
import {
    BlockquoteButton,
    BoldButton,
    CodeBlockButton,
    CodeButton,
    HeadlineOneButton,
    HeadlineThreeButton,
    HeadlineTwoButton,
    ItalicButton,
    OrderedListButton,
    UnderlineButton,
    UnorderedListButton
} from "@draft-js-plugins/buttons";
import axios, {AxiosResponse} from "axios";
import {Draft} from "@/types/draft";
import SendError from "@/components/error/SendError";
import StoryTitle from "@/components/blog/StoryTitle";

const focusPlugin = createFocusPlugin();
const resizeablePlugin = createResizeablePlugin();
const blockDndPlugin = createBlockDndPlugin();
const alignmentPlugin = createAlignmentPlugin();

export interface EditingDraft {
    titleEditorState: EditorState;
    contentEditorState: EditorState
}

interface StoryContentSectionProps {
    draftId?: string,
    saveDraft: (editingDraft: EditingDraft) => Promise<any> | undefined,
}

const getDraft = async (draftId: string): Promise<AxiosResponse<Draft>> => {
    return axios.get(`${process.env.NEXT_PUBLIC_API_HOST}/api/v1/drafts/${draftId}`)
}


const StoryContentSection = (props: PropsWithRef<StoryContentSectionProps>) => {
    const [error, setError] = useState<any>(null);
    const [draftId, setDraftId] = useState<string | undefined>(props.draftId);
    const [isSavingDraft, setIsSavingDraft] = useState<boolean>(false);

    const [titleEditorState, setTitleEditorState] = useState<EditorState>(EditorState.createEmpty());
    const contentEditorRef = useRef<Editor | undefined>();
    const [contentEditorState, setContentEditorState] = useState<EditorState>(EditorState.createEmpty());

    const [plugins,
        InlineToolbar,
        SideToolbar,
        StickerSelect,
        AlignmentTool
    ] = useMemo(() => {
        const inlineToolbarPlugin = createInlineToolbarPlugin();
        const sideToolbarPlugin = createSideToolbarPlugin();
        const stickerPlugin = createStickerPlugin({stickers});
        const decorator = composeDecorators(
            resizeablePlugin.decorator,
            alignmentPlugin.decorator,
            focusPlugin.decorator,
            blockDndPlugin.decorator
        );
        const imagePlugin = createImagePlugin({decorator})
        const dragNDropFileUploadPlugin = createDragNDropUploadPlugin({
            handleUpload: mockUpload,
            addImage: imagePlugin.addImage
        } as DndUploadPluginConfig);
        return [[inlineToolbarPlugin,
            sideToolbarPlugin,
            stickerPlugin,
            dragNDropFileUploadPlugin,
            blockDndPlugin,
            focusPlugin,
            alignmentPlugin,
            resizeablePlugin,
            imagePlugin,
        ],
            inlineToolbarPlugin.InlineToolbar,
            sideToolbarPlugin.SideToolbar,
            stickerPlugin.StickerSelect,
            alignmentPlugin.AlignmentTool
        ]
    }, []);

    useEffect(() => {
        // fixing issue with SSR https://github.com/facebook/draft-js/issues/2332#issuecomment-761573306
        if (draftId) {
            getDraft(draftId)
                .then((value) => {
                    let data = value.data;
                    if (data) {
                        if (data.title) {
                            console.log("set title");
                            setTitleEditorState(EditorState.createWithContent(convertFromRaw(JSON.parse(data.title))));
                        }
                        if (data.content)
                            setContentEditorState(EditorState.createWithContent(convertFromRaw(JSON.parse(data.content))));
                    } else
                        setError("Not found")
                })
                .catch(reason => {
                    setError(reason)
                });
        } else {
            setContentEditorState(EditorState.createEmpty());
        }
    }, []);

    const onClickSaveDraft: MouseEventHandler<HTMLButtonElement> = async (event: React.MouseEvent<HTMLButtonElement>) => {
        setIsSavingDraft(true);
        await props.saveDraft({
            titleEditorState: titleEditorState,
            contentEditorState: contentEditorState
        })
        setIsSavingDraft(false);
    }

    const focus = () => {
        contentEditorRef.current?.focus();
    }
    return (
        error ? <SendError>Story Content Section Error: {error.toString()}</SendError>
            : <div>
                <StoryTitle
                    title={titleEditorState}
                    onTitleChange={value => {
                        setTitleEditorState(value);
                    }}
                />
                <div onClick={focus}>
                    <Editor
                        placeholder={"Tell your story..."}
                        editorKey="StoryContentSection"
                        editorState={contentEditorState}
                        onChange={(value: EditorState) => setContentEditorState(value)}
                        plugins={plugins}
                        ref={(element: Editor) => {
                            contentEditorRef.current = element;
                        }}
                    />
                </div>
                <InlineToolbar/>
                <SideToolbar>
                    {// may be use React.Fragment instead of div to improve perfomance after React 16
                        externalProps => (
                            <>
                                <BoldButton {...externalProps} />
                                <ItalicButton {...externalProps} />
                                <UnderlineButton {...externalProps} />
                                <CodeButton {...externalProps} />
                                <HeadlineOneButton {...externalProps} />
                                <HeadlineTwoButton {...externalProps} />
                                <HeadlineThreeButton {...externalProps} />
                                <UnorderedListButton {...externalProps} />
                                <OrderedListButton {...externalProps} />
                                <BlockquoteButton {...externalProps} />
                                <CodeBlockButton {...externalProps} />
                            </>
                        )}
                </SideToolbar>
                <AlignmentTool/>
                <LoadingButton
                    onClick={onClickSaveDraft}
                    loading={isSavingDraft}>
                    Save draft
                </LoadingButton>
            </div>
    )
}
export default StoryContentSection;