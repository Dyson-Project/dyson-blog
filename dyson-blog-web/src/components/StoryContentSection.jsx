import {useState} from "react";
import createInlineToolbarPlugin from '@draft-js-plugins/inline-toolbar';
import createSideToolbarPlugin from '@draft-js-plugins/side-toolbar';
import Editor from '@draft-js-plugins/editor';

import {EditorState} from "draft-js";
import "draft-js/dist/Draft.css";

const inlineToolbarPlugin = createInlineToolbarPlugin();
const {InlineToolbar} = inlineToolbarPlugin;

const sideToolbarPlugin = createSideToolbarPlugin();
const {SideToolbar} = sideToolbarPlugin;
const plugins = [];

export default function StoryContentSection() {
    const [content, setContent] = useState();
    const [editorState, setEditorState] = useState(EditorState.createEmpty());
    const changeState = (value) => {
        setEditorState(value);
    }
    return (
        <>
            {/*<DraftailEditor*/}
            {/*    editorState={editorState}*/}
            {/*    onChange={changeState}*/}
            {/*    placeholder="Tell your story..."*/}
            {/*    plugins={plugins}*/}
            {/*/>*/}
            <Editor
                customStyleMap={{}}
                editorState={editorState}
                onChange={changeState}
            />
            <InlineToolbar/>
            <SideToolbar/>
        </>
    )
}