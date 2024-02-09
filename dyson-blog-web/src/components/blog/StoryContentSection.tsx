import React, {useEffect, useMemo, useRef, useState} from "react";
import Editor, {composeDecorators, createEditorStateWithText} from '@draft-js-plugins/editor';
import createInlineToolbarPlugin from '@draft-js-plugins/inline-toolbar';
import createSideToolbarPlugin from '@draft-js-plugins/side-toolbar';
import createStickerPlugin from '@draft-js-plugins/sticker';

import createFocusPlugin from '@draft-js-plugins/focus';
import createAlignmentPlugin from '@draft-js-plugins/alignment';
import createResizeablePlugin from '@draft-js-plugins/resizeable';
import createBlockDndPlugin from '@draft-js-plugins/drag-n-drop';
import createImagePlugin from '@draft-js-plugins/image';
import createDragNDropUploadPlugin, {DndUploadPluginConfig} from '@draft-js-plugins/drag-n-drop-upload';
import {convertFromRaw, convertToRaw, EditorState} from "draft-js";
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
import Button from "@mui/material/Button";
import axios, {AxiosResponse} from "axios";
import {Draft} from "@/types/draft";
import {CircularProgress} from "@mui/material";

const focusPlugin = createFocusPlugin();
const resizeablePlugin = createResizeablePlugin();
const blockDndPlugin = createBlockDndPlugin();
const alignmentPlugin = createAlignmentPlugin();

interface StoryContentSectionProps {
    postId: string
}

const getDraft = async (draftId: string): Promise<AxiosResponse<Draft>> => {
    return axios.get(`${process.env.NEXT_PUBLIC_API_HOST}/api/v1/drafts/${draftId}`)
}

const saveDraft = async (draftId: string, title: string, editorState: EditorState): Promise<AxiosResponse<Draft>> => {
    return axios.put(`${process.env.NEXT_PUBLIC_API_HOST}/api/v1/drafts/${draftId}`, {
        title: title,
        content: JSON.stringify(convertToRaw(editorState.getCurrentContent()))
    })
}

const StoryContentSection = (props: StoryContentSectionProps) => {
    const editorRef = useRef<Editor | null>(null);
    const [editorState, setEditorState] = useState<EditorState>(EditorState.createEmpty());
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
        getDraft(props.postId)
            .then((value) => {
                if (value.data.content)
                    setEditorState(EditorState.createWithContent(convertFromRaw(JSON.parse(value.data.content))));
                else
                    setEditorState(createEditorStateWithText(""));
            })
    }, []);

    const onChange = (value: EditorState): void => {
        setEditorState(value);
    }
    const onClickSaveDraft = (event: React.ChangeEvent<HTMLButtonElement>) => {
        saveDraft(editorState);
    }
    const focus = () => {
        editorRef.current?.focus();
    }
    return (
        <div>
            <div onClick={focus}>
                <Editor
                    editorKey="StoryContentSection"
                    editorState={editorState}
                    onChange={onChange}
                    plugins={plugins}
                    ref={(element: Editor) => {
                        editorRef.current = element;
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
            <Button
                variant="contained"
                color="success"
                disabled={savingDraft}
                onClick={onClickSaveDraft}
            >
                <CircularProgress size={20}/>
                Save draft
            </Button>
        </div>
    )
}
export default StoryContentSection;