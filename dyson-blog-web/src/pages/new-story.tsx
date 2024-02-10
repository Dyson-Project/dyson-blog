import {useEffect} from "react";
import Layout from "@/components/Layout";
import Head from "next/head";
import StoryContentSection, {EditingDraft} from "@/components/blog/StoryContentSection";
import axios, {AxiosResponse} from "axios";
import {Draft} from "@/types/draft";
import {convertToRaw} from "draft-js";
import {useRouter} from "next/router";


export default function NewStory() {
    const router = useRouter();
    useEffect(() => {
    }, [])

    const saveDraft = async (draft: EditingDraft): Promise<AxiosResponse<Draft>> => {
        let response = await axios.post<Draft, AxiosResponse<Draft>>(`${process.env.NEXT_PUBLIC_API_HOST}/api/v1/drafts`, {
            title: JSON.stringify(convertToRaw(draft.titleEditorState.getCurrentContent())),
            content: JSON.stringify(convertToRaw(draft.contentEditorState.getCurrentContent()))
        });
        let data = response.data;
        await router.replace(`/draft/${data.draftId}/edit`)
    }

    return <Layout home={false}>
        <Head>
            <title>New story</title>
        </Head>
        <StoryContentSection
            saveDraft={saveDraft}/>
    </Layout>
}
