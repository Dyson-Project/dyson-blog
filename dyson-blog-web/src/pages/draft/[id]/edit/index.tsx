import Head from "next/head";
import axios from "axios";
import SendError from "@/components/error/SendError";
import {useRouter} from "next/router";
import Layout from "@/components/Layout";
import StoryContentSection, {EditingDraft} from "@/components/blog/StoryContentSection";
import {convertToRaw, EditorState} from "draft-js";
import LoadingButton from "@mui/lab/LoadingButton";
import React, {MouseEventHandler, useRef, useState} from "react";

export default function Edit() {
    const router = useRouter();
    const draftId = router.query.id as string;
    const titleEditorStateRef = useRef<EditorState>();
    const contentEditorStateRef = useRef<EditorState>();
    const [isPublishing, setPublishing] = useState(false);

    const saveDraft = async (draft: EditingDraft): Promise<void> => {
        return axios.put(`${process.env.NEXT_PUBLIC_API_HOST}/api/v1/drafts/${draftId}`, {
            title: JSON.stringify(convertToRaw(draft.titleEditorState.getCurrentContent())),
            content: JSON.stringify(convertToRaw(draft.contentEditorState.getCurrentContent()))
        })
    }
    const onClickPublish: MouseEventHandler<HTMLButtonElement> = async (event: React.MouseEvent<HTMLButtonElement>) => {
        console.log(titleEditorStateRef.current)
    }
    const publishPost = async (draft: EditingDraft): Promise<void> => {

    }

    return <Layout home={false}>
        {draftId ?
            <>
                <Head>
                    <title>Editing {draftId} story</title>
                </Head>
                <StoryContentSection
                    draftId={draftId}
                    saveDraft={saveDraft}
                    ref={(titleEditorState: EditorState) => {
                        titleEditorStateRef.current = titleEditorState
                    }}
                />
                <LoadingButton
                    onClick={onClickPublish}
                    loading={isPublishing}>
                    Publish
                </LoadingButton>
            </>
            : <SendError>Edit error</SendError>}
    </Layout>

}