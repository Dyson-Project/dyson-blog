import Head from 'next/head';
import utilStyles from "../styles/utils.module.css";
import Layout, {siteTitle} from "../components/Layout";
import {PostSummary} from "@/libs/posts";
import Link from "next/link";
import InfiniteScroll from "react-infinite-scroll-component";
import {useState} from "react";
import axios, {AxiosResponse} from "axios";

export default function Home() {
    const [posts, setPosts] = useState<PostSummary[]>([]);

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
                <p>[Your Self Introduction]</p>
                <p>
                    (This is a sample website - you’ll be building a site like this on{' '}
                    <a href="https://nextjs.org/learn">our Next.js tutorial</a>.)
                </p>
                <h2 className={utilStyles.headingLg}>Blog</h2>
                <InfiniteScroll style={utilStyles.list} next={fetchMoreData}
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
                {/*<ul className={utilStyles.list}>*/}
                {/*    {posts.map(({id, date, title}) => (*/}
                {/*        <li className={utilStyles.listItem} key={id}>*/}
                {/*            <Link href={`/posts/${id}`}> {title} </Link>*/}
                {/*            <br/>*/}
                {/*            <small className={utilStyles.lightText}>*/}
                {/*                <Date dateString={date}></Date>*/}
                {/*            </small>*/}
                {/*        </li>*/}
                {/*    ))}*/}
                {/*</ul>*/}
            </section>
        </Layout>
    );
}

// export async function getStaticProps() {
//     const posts = getSortedPostsData();
//     return {
//         props: {
//             posts,
//         },
//     };
// }
