import Head from 'next/head';
import utilStyles from "../styles/utils.module.scss";
import Layout, {siteTitle} from "../components/Layout";
import Link from "next/link";
import InfiniteScroll from "react-infinite-scroll-component";
import {useState} from "react";
import axios, {AxiosResponse} from "axios";
import {PostSummary} from "@/types/post";
import {GoogleLogin} from "@react-oauth/google";
import {useAuth} from "@/hooks/useAuth";

export default function Home() {
    const [posts, setPosts] = useState<PostSummary[]>([]);
    const {onOAuth2Success} = useAuth();

    const fetchMoreData = () => {
        axios.get(`${process.env.NEXT_PUBLIC_API_HOST}/api/v1/posts/reactive`, {
            params: {"page": 0, "size": 20}
        }).then((value: AxiosResponse<PostSummary[]>) => {
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
                <GoogleLogin
                    onSuccess={onOAuth2Success}
                    onError={() => {
                        console.log('Login Failed');
                    }}
                />;
                <p>[Your Self Introduction]</p>
                <p>
                    (This is a sample website - you’ll be building a site like this on{' '}
                    <Link href="https://nextjs.org/learn">our Next.js tutorial</Link>.)
                </p>
                <h2 className={utilStyles.headingLg}>Blog</h2>
                <InfiniteScroll style={{}} next={fetchMoreData}
                                hasMore={true}
                                loader={<h4>Loading...</h4>}
                                dataLength={posts.length}>
                    {
                        posts.map(({id, title, lastModifiedDate}) => (
                            <li className={utilStyles.listItem} key={id}>
                                <Link href={`/posts/${id}`}> {title} </Link>
                                <br/>
                                <small className={utilStyles.lightText}>
                                    {lastModifiedDate}
                                    {/*<Date dateString={lastModifiedDate}></Date>*/}
                                </small>
                            </li>
                        ))
                    }
                </InfiniteScroll>
            </section>
        </Layout>
    );
}