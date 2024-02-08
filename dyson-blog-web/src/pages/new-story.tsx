import {useState} from "react";
import Layout from "@/components/Layout";
import Head from "next/head";
import StoryContentSection from "@/components/blog/StoryContentSection";
import SimpleToolbarInlineEditor from "@/components/blog/SimpleToolbarInlineEditor";

export default function Edit() {
    const [title, setTitle] = useState("");

    return <Layout home={false}>
        <Head>
            <title>Editing {} story</title>
        </Head>
        <StoryContentSection/>
        <SimpleToolbarInlineEditor/>
    </Layout>
}
