import Head from "next/head";
import {AxiosResponse} from "axios";
import SendError from "@/components/error/SendError";
import {useRouter} from "next/router";
import Layout from "@/components/Layout";
import StoryContentSection, {EditingDraft} from "@/components/blog/StoryContentSection";
import {convertToRaw, EditorState} from "draft-js";
import LoadingButton from "@mui/lab/LoadingButton";
import React, {MouseEventHandler, useRef, useState} from "react";
import {useDraftApi} from "@/hooks/useDraftApi";
import {usePostApi} from "@/hooks/usePostApi";

export default function Edit() {
    const router = useRouter();
    const draftId = router.query.id as string;
    const titleEditorStateRef = useRef<EditorState>();
    const contentEditorStateRef = useRef<EditorState>();
    const [isPublishing, setPublishing] = useState(false);
    const {updateDraft} = useDraftApi();
    const {publishPost} = usePostApi();

    const saveDraft = async (draft: EditingDraft): Promise<AxiosResponse<void>> => {
        return updateDraft(draftId, {
            titleEditorState: JSON.stringify(convertToRaw(draft.titleEditorState.getCurrentContent())),
            contentEditorState: JSON.stringify(convertToRaw(draft.contentEditorState.getCurrentContent()))
        })
    }
    const onClickPublish: MouseEventHandler<HTMLButtonElement> = async (event: React.MouseEvent<HTMLButtonElement>) => {
        console.log(titleEditorStateRef.current)
        // publishPost({
        //     id: draftId,
        //     title: JSON.stringify(convertToRaw(titleEditorStateRef.current.getCurrentContent())),
        //     content: JSON.stringify(convertToRaw(draft.contentEditorState.getCurrentContent()))
        // }).catch(reason => {
        //     console.error(reason);
        // })
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