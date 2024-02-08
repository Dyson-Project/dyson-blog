import React, {useEffect, useMemo, useRef, useState} from "react";
import Editor, {createEditorStateWithText} from '@draft-js-plugins/editor';
import createInlineToolbarPlugin from '@draft-js-plugins/inline-toolbar';
import createSideToolbarPlugin from '@draft-js-plugins/side-toolbar';
import createStickerPlugin from '@draft-js-plugins/sticker';
import {EditorState} from "draft-js";
import stickers from "./stickers";

const StoryContentSection = () => {
    const editorRef = useRef<Editor | null>(null);
    const [editorState, setEditorState] = useState<EditorState>(createEditorStateWithText(""));
    const [plugins,
        InlineToolbar,
        SideToolbar,
        StickerSelect
    ] = useMemo(() => {
        const inlineToolbarPlugin = createInlineToolbarPlugin();
        const sideToolbarPlugin = createSideToolbarPlugin();
        const stickerPlugin = createStickerPlugin({stickers});
        return [[inlineToolbarPlugin, sideToolbarPlugin, stickerPlugin],
            inlineToolbarPlugin.InlineToolbar,
            sideToolbarPlugin.SideToolbar,
            stickerPlugin.StickerSelect,
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
            {editorRef.current ?
                <StickerSelect editor={editorRef.current}/> : (<></>)
            }
            <InlineToolbar/>
            <SideToolbar/>
        </div>
    )
}
export default StoryContentSection;