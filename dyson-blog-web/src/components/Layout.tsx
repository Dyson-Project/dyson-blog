import styles from "./layout.module.css";
import Head from "next/head";
import Link from "next/link";
import Footer from "@/components/blog/Footer";
import Header from "@/components/blog/Header";
import React from "react";

const name = "TikTuzki";
export const siteTitle = "Next.js Sample Website";

interface LayoutProps {
    home: boolean
}

export default function Layout({home, children}: React.PropsWithChildren<LayoutProps>) {
    return (
        <div className={styles.container}>
            <Head>
                <link rel="icon" href="/favicon.ico"/>
                <meta
                    name="description"
                    content="Learn how to build a personal website using Next.js"
                />
                <meta
                    property="og:image"
                    content={`https://og-image.vercel.app/${encodeURI(
                        siteTitle,
                    )}.png?theme=light&md=0&fontSize=75px&images=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Ffront%2Fassets%2Fdesign%2Fnextjs-black-logo.svg`}
                />
                <meta name="og:title" content={siteTitle}/>
                <meta name="twitter:card" content="summary_large_image"/>
            </Head>
            <Header sections={[
                {title: "Section title", url: "/stuff"},
                {title: "Section title 2", url: "/stuff2"},
                {title: "Section title 3", url: "/stuff3"}
            ]}
                    title={""}
            />
            {/*<header className={styles.header}>*/}
            {/*    {home ? (*/}
            {/*        <>*/}
            {/*            <Image*/}
            {/*                priority*/}
            {/*                src="/images/profile.jpeg"*/}
            {/*                className={utilStyles.borderCircle}*/}
            {/*                height={144}*/}
            {/*                width={144}*/}
            {/*                alt=""*/}
            {/*            />*/}
            {/*            <h1 className={utilStyles.heading2Xl}>{name}</h1>*/}
            {/*        </>*/}
            {/*    ) : (*/}
            {/*        <>*/}
            {/*            <Link href="/">*/}
            {/*                <Image*/}
            {/*                    priority*/}
            {/*                    src="/images/profile.jpeg"*/}
            {/*                    className={utilStyles.borderCircle}*/}
            {/*                    height={108}*/}
            {/*                    width={108}*/}
            {/*                    alt=""*/}
            {/*                />*/}
            {/*            </Link>*/}
            {/*            <h2 className={utilStyles.headingLg}>*/}
            {/*                <Link href="/" className={utilStyles.colorInherit}>*/}
            {/*                    {name}*/}
            {/*                </Link>*/}
            {/*            </h2>*/}
            {/*        </>*/}
            {/*    )}*/}
            {/*</header>*/}
            <main>{children}</main>
            {!home && (
                <div className={styles.backToHome}>
                    <Link href="/">← Back to home</Link>
                </div>
            )}
            <Footer description={"Footer description"} title={"Footer title"}/>
        </div>
    );
}