import Head from 'next/head';
import utilStyles from "../styles/utils.module.css";
import Layout, {siteTitle} from "../components/layout";
import {getSortedPostsData, Post} from "../libs/posts";
import Link from "next/link";
import Date from "../components/Date";


export default function Home({posts}:{posts: Post[]}) {
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
                <ul className={utilStyles.list}>
                    {posts.map(({id, date, title}) => (
                        <li className={utilStyles.listItem} key={id}>
                            <Link href={`/posts/${id}`}> {title} </Link>
                            <br/>
                            <small className={utilStyles.lightText}>
                                <Date dateString={date}></Date>
                            </small>
                        </li>
                    ))}
                </ul>
            </section>
        </Layout>
    );
}

export async function getStaticProps() {
    const posts = getSortedPostsData();
    return {
        props: {
            posts,
        },
    };
}
