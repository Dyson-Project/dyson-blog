import Editor from "@draft-js-plugins/editor";
import {convertFromRaw, EditorState} from "draft-js";
import React, {useEffect, useMemo, useRef, useState} from "react";
import createSideToolbarPlugin from "@draft-js-plugins/side-toolbar";

export interface StoryTitleProps {
    initTitleValue: string | undefined,
    onTitleChange: (value: EditorState) => void
}

const StoryTitle = (props: StoryTitleProps) => {
    const {initTitleValue} = props;
    const editorRef = useRef<Editor | undefined>();
    const [editorState, setEditorState] = useState<EditorState>(initTitleValue
        ? EditorState.createWithContent(convertFromRaw(JSON.parse(initTitleValue)))
        : EditorState.createEmpty());
    const [plugins,
        SideToolbar,
    ] = useMemo(() => {
        const sideToolbarPlugin = createSideToolbarPlugin();
        return [[
            sideToolbarPlugin,
        ],
            sideToolbarPlugin.SideToolbar,
        ]
    }, []);

    useEffect(() => {
        if (initTitleValue)
            setEditorState(EditorState.createWithContent(convertFromRaw(JSON.parse(initTitleValue))))
        else
            setEditorState(EditorState.createEmpty());
    }, [initTitleValue]);
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
    </>
}

export default StoryTitle;