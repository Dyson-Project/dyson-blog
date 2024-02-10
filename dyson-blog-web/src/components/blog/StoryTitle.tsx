import Editor from "@draft-js-plugins/editor";
import {EditorState} from "draft-js";
import React, {useEffect, useMemo, useRef, useState} from "react";
import createInlineToolbarPlugin from "@draft-js-plugins/inline-toolbar";
import createSideToolbarPlugin from "@draft-js-plugins/side-toolbar";

export interface StoryTitleProps {
    title: EditorState,
    onTitleChange: (value: EditorState) => void
}

const StoryTitle = (props: StoryTitleProps) => {
    const editorRef = useRef<Editor | undefined>();
    const [editorState, setEditorState] = useState<EditorState>(EditorState.createEmpty());
    const [plugins,
        InlineToolbar,
        SideToolbar,
    ] = useMemo(() => {
        const inlineToolbarPlugin = createInlineToolbarPlugin();
        const sideToolbarPlugin = createSideToolbarPlugin();
        return [[inlineToolbarPlugin,
            sideToolbarPlugin,
        ],
            inlineToolbarPlugin.InlineToolbar,
            sideToolbarPlugin.SideToolbar,
        ]
    }, []);

    useEffect(() => {
        // fixing issue with SSR https://github.com/facebook/draft-js/issues/2332#issuecomment-761573306
        setEditorState(props.title);
    }, []);

    const focus = () => {
        editorRef.current?.focus();
    }


    return <>
        <div onClick={focus}>
            <Editor
                placeholder={"Title"}
                editorKey="StoryTitle"
                editorState={editorState}
                onChange={(value: EditorState) => {
                    setEditorState(value);
                    props.onTitleChange(value);
                }}
                plugins={plugins}
                ariaMultiline={false}
                ref={(element: Editor) => {
                    editorRef.current = element;
                }}
            />
        </div>
        <SideToolbar/>
        <InlineToolbar/>
    </>
}

export default StoryTitle;