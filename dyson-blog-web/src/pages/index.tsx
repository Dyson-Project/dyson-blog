import Head from 'next/head';
import utilStyles from "../styles/utils.module.scss";
import Layout, {siteTitle} from "../components/Layout";
import {useState} from "react";
import {AxiosResponse} from "axios";
import {PostSummary} from "@/types/post";
import {usePostApi} from "@/hooks/usePostApi";
import PostsInfiniteScroll from "@/components/blog/PostsInfiniteScroll";

export default function Home() {
    const [posts, setPosts] = useState<PostSummary[]>([]);
    const {getPosts} = usePostApi();

    const fetchMoreData = () => {
        getPosts({})
            .then((value: AxiosResponse<PostSummary[]>) => {
                const fetchedPosts = value.data;
                setPosts(posts.concat(fetchedPosts));
            }).catch(reason => {
            console.error(reason);
        })
    }

    return (
        <Layout home>
            <Head>
                <title>{siteTitle}</title>
            </Head>
            <section className={utilStyles.headingMd}>
                <PostsInfiniteScroll/>
            </section>
        </Layout>
    );
}