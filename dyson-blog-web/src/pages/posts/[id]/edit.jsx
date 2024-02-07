import Layout from "../../../components/Layout";
import Head from "next/head";
import {useState} from "react";
import StoryContentSection from "../../../components/StoryContentSection";

export default function Edit() {
    const [title, setTitle] = useState("");

    return <Layout home={false}>
        <Head>
            <title>Editing {} story</title>
        </Head>
        <StoryContentSection/>
    </Layout>
}
