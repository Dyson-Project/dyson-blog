import Layout from "../../components/layout";
import {getAllPostIds, getPostData} from "../../libs/posts";
import Head from "next/head";
import Date from "../../components/Date";

import utilStyles from "../../styles/utils.module.css";

export default function Post({post}) {
    return <Layout>
        <Head>
            <title>{post.title}</title>
        </Head>
        <article>
            <h1 className={utilStyles.headingXl}>{post.title}</h1>
            <div className={utilStyles.lightText}>
                <Date dateString={post.date}/>
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