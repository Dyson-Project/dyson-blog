import React, {useEffect, useMemo, useRef, useState,} from 'react';
import Editor, {createEditorStateWithText} from '@draft-js-plugins/editor';
import createInlineToolbarPlugin from '@draft-js-plugins/inline-toolbar';

const text =
    'In this editor a toolbar shows up once you select part of the text …';

const SimpleInlineToolbarEditor = () => {
    let editor = useRef(null);
    const [plugins,
        InlineToolbar
    ] = useMemo(() => {
        const inlineToolbarPlugin = createInlineToolbarPlugin();
        return [[inlineToolbarPlugin], inlineToolbarPlugin.InlineToolbar];
    }, []);

    const [editorState, setEditorState] = useState(() =>
        createEditorStateWithText('')
    );

    useEffect(() => {
        // fixing issue with SSR https://github.com/facebook/draft-js/issues/2332#issuecomment-761573306
        setEditorState(createEditorStateWithText(text));
    }, []);
    const onChange = (value) => {
        setEditorState(value);
    };

    const focus = () => {
        editor.current.focus();
    };
    return (
        <div className={""} onClick={focus}>
            <Editor
                editorKey="SimpleInlineToolbarEditor"
                editorState={editorState}
                onChange={onChange}
                plugins={plugins}
                ref={(element) => {
                    editor.current = element;
                }}
            />
            <InlineToolbar/>
        </div>
    );
};

export default SimpleInlineToolbarEditor;