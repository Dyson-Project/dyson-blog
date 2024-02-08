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
import {EditorState} from "draft-js";
import stickers from "./stickers";
import mockUpload from "@/mocks/mockUpload";
import AlignmentTool from "@draft-js-plugins/alignment/lib/AlignmentTool";

const focusPlugin = createFocusPlugin();
const resizeablePlugin = createResizeablePlugin();
const blockDndPlugin = createBlockDndPlugin();
const alignmentPlugin = createAlignmentPlugin();

const StoryContentSection = () => {
    const editorRef = useRef<Editor | null>(null);
    const [editorState, setEditorState] = useState<EditorState>(createEditorStateWithText(""));
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
        setEditorState(createEditorStateWithText(""));
    }, []);

    const onChange = (value: EditorState): void => {
        setEditorState(value);
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
                    placeholder="Tell your story"
                    ref={(element: Editor) => {
                        editorRef.current = element;
                    }}
                />
            </div>
            <InlineToolbar/>
            <SideToolbar/>
            <AlignmentTool/>
        </div>
    )
}
export default StoryContentSection;