import {useEffect} from "react";
import Layout from "@/components/Layout";
import Head from "next/head";
import StoryContentSection, {EditingDraft} from "@/components/blog/StoryContentSection";
import {convertToRaw} from "draft-js";
import {useRouter} from "next/router";
import {useDraftApi} from "@/hooks/useDraftApi";


export default function NewStory() {
    const router = useRouter();
    const {createDraft} = useDraftApi();

    useEffect(() => {
    }, [])

    const saveDraft = async (draft: EditingDraft): Promise<void> => {
        createDraft({
            title: JSON.stringify(convertToRaw(draft.titleEditorState.getCurrentContent())),
            content: JSON.stringify(convertToRaw(draft.contentEditorState.getCurrentContent()))
        })
            .then(value => {
                let data = value.data;
                router.replace(`/draft/${data.draftId}/edit`);
            })
            .catch(reason => {
                console.error(reason);
            })
    }

    return <Layout home={false}>
        <Head>
            <title>New story</title>
        </Head>
        <StoryContentSection
            saveDraft={saveDraft}/>
    </Layout>
}
