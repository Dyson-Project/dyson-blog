import {useEffect} from "react";
import Layout from "@/components/Layout";
import Head from "next/head";
import EditStoryContentSection, {EditingDraft} from "@/components/blog/EditStoryContentSection";
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
            titleEditorState: JSON.stringify(convertToRaw(draft.titleEditorState.getCurrentContent())),
            contentEditorState: JSON.stringify(convertToRaw(draft.contentEditorState.getCurrentContent()))
        })
            .then(value => {
                let id = value.data;
                router.replace(`/draft/${id}/edit`);
            })
            .catch(reason => {
                console.error(reason);
            })
    }

    return <Layout home={false}>
        <Head>
            <title>New story</title>
        </Head>
        <EditStoryContentSection
            saveDraft={saveDraft}/>
    </Layout>
}
