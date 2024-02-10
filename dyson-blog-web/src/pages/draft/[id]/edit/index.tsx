import Head from "next/head";
import axios, {AxiosResponse} from "axios";
import {Draft} from "@/types/draft";
import SendError from "@/components/error/SendError";
import {useRouter} from "next/router";
import Layout from "@/components/Layout";
import StoryContentSection, {EditingDraft} from "@/components/blog/StoryContentSection";
import {convertToRaw} from "draft-js";

export default function Edit() {
    const router = useRouter();
    const draftId = router.query.id as string;

    const saveDraft = async (draft: EditingDraft): Promise<AxiosResponse<Draft>> => {
        return axios.put(`${process.env.NEXT_PUBLIC_API_HOST}/api/v1/drafts/${draftId}`, {
            title: JSON.stringify(convertToRaw(draft.titleEditorState.getCurrentContent())),
            content: JSON.stringify(convertToRaw(draft.contentEditorState.getCurrentContent()))
        })
    }

    return <Layout home={false}>
        {draftId ?
            <>
                <Head>
                    <title>Editing {draftId} story</title>
                </Head>
                <StoryContentSection
                    draftId={draftId}
                    saveDraft={saveDraft}/>
            </>
            : <SendError>Edit error</SendError>}
    </Layout>

}