import Head from "next/head";
import {AxiosResponse} from "axios";
import SendError from "@/components/error/SendError";
import {useRouter} from "next/router";
import Layout from "@/components/Layout";
import EditStoryContentSection, {EditingDraft} from "@/components/blog/EditStoryContentSection";
import {convertToRaw, EditorState} from "draft-js";
import React, {useEffect, useRef, useState} from "react";
import {useDraftApi} from "@/hooks/useDraftApi";
import {usePostApi} from "@/hooks/usePostApi";
import {Draft} from "@/types/draft";

export default function Edit() {
    const router = useRouter();
    const draftId = router.query.id as string;
    // const titleEditorStateRef = useRef<EditorState>();
    // const contentEditorStateRef = useRef<EditorState>();
    const [isPublishing, setPublishing] = useState(false);
    const [draft, setDraft] = useState<Draft | undefined>();
    const {getDraft, updateDraft} = useDraftApi();
    const {publishPost: publishPostApi} = usePostApi();

    const saveDraft = async (draft: EditingDraft): Promise<AxiosResponse<void>> => {
        return updateDraft(draftId, {
            titleEditorState: JSON.stringify(convertToRaw(draft.titleEditorState.getCurrentContent())),
            contentEditorState: JSON.stringify(convertToRaw(draft.contentEditorState.getCurrentContent()))
        })
    }

    const publishPost = async (draft: EditingDraft): Promise<AxiosResponse<String>> => {
        return publishPostApi({
            draftId: draftId,
            categoryId: "",
            titleEditorState: JSON.stringify(convertToRaw(draft.titleEditorState.getCurrentContent())),
            contentEditorState: JSON.stringify(convertToRaw(draft.contentEditorState.getCurrentContent()))
        })
    }
    useEffect(() => {
        getDraft(draftId)
            .then((value) => {
                let draft = value.data;
                if (draft)
                    setDraft(draft);
            })
            .catch(reason => {
                console.error(reason);
            })
    }, []);


    return <Layout home={false}>
        {draftId ?
            <>
                <Head>
                    <title>Editing: {draft?.title}</title>
                </Head>
                <EditStoryContentSection
                    draftId={draftId}
                    saveDraft={saveDraft}
                    publishPost={publishPost}
                    draft={draft}
                />

            </>
            : <SendError>Edit error</SendError>}
    </Layout>

}