import {useEffect, useState} from "react";
import Layout from "@/components/Layout";
import Head from "next/head";
import StoryContentSection from "@/components/blog/StoryContentSection";
import axios, {AxiosResponse} from "axios";
import {Draft} from "@/types/draft";
import SendError from "@/components/error/SendError";

const createDraft = async (): Promise<AxiosResponse<Draft>> => {
    return axios.post(`${process.env.NEXT_PUBLIC_API_HOST}/api/v1/drafts`, {})
}
export default function NewStory() {
    const [draftId, setDraftId] = useState<string | null>(null);
    useEffect(() => {
        createDraft()
            .then(value => setDraftId(value.data.postId));
    }, [])

    return <Layout home={false}>
        {draftId ?
            <>
                <Head>
                    <title>Editing ${draftId} story</title>
                </Head>
                <StoryContentSection postId={draftId}/>
            </>
            : <SendError/>}
    </Layout>
}
