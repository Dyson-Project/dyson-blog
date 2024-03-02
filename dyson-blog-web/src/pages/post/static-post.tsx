// import Layout from "../../components/Layout";
// import {getAllPostIds, getPostData} from "../../libs/posts";
import Head from "next/head";
import DateText from "@/components/DateText";

import utilStyles from "@/styles/utils.module.scss";
import {getAllPostIds, getPostData} from "@/libs/posts";
import Layout from "@/components/Layout";

export default function Post({post}) {
    return <Layout home={false}>
        <Head>
            <title>{post.title}</title>
        </Head>
        <article>
            <h1 className={utilStyles.headingXl}>{post.title}</h1>
            <div className={utilStyles.lightText}>
                <DateText dateString={post.date}/>
            </div>
            <div dangerouslySetInnerHTML={{__html: post.contentHtml}}/>
        </article>
    </Layout>
}

export async function getStaticPaths() {
    const paths = await getAllPostIds();
    return {
        paths,
        fallback: false,
    }
}

export async function getStaticProps({params}) {
    const post = await getPostData(params.id);
    return {
        props: {
            post
        }
    }
}