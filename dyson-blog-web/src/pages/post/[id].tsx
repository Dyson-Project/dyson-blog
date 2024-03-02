import Layout from "@/components/Layout";
import Head from "next/head";
import SendError from "@/components/error/SendError";
import React, {useEffect, useState} from "react";
import {useRouter} from "next/router";
import {Post} from "@/types/post";
import {usePostApi} from "@/hooks/usePostApi";
import * as DOMPurify from "dompurify";
import {convertToHTML} from "draft-convert";
import {convertFromRaw} from "draft-js";

export default function PostPage() {
    const router = useRouter();
    const postId = router.query.id as string;
    const [post, setPost] = useState<Post | undefined>();
    const [titleConvertedContent, setTitleConvertedContent] = useState<any | undefined>("");
    const [contentConvertedContent, setContentConvertedContent] = useState<any | undefined>("");
    const {getPost} = usePostApi();

    function createMarkup(content: string) {
        return {
            __html: DOMPurify.sanitize(convertToHTML(convertFromRaw(JSON.parse(content))))
        }
    }

    useEffect(() => {
        getPost(postId)
            .then(value => {
                let data: Post = value.data;
                console.log(data);
                setPost(data);
                setTitleConvertedContent(createMarkup(data.titleEditorState));
                setContentConvertedContent(createMarkup(data.contentEditorState));
            })
            .catch(reason => {
                console.error(reason);
            })
    }, []);

    return <Layout home={false}>
        {post ?
            <>
                <Head>
                    <title> {post.title}</title>
                </Head>
                <div
                    className={"preview"}
                    dangerouslySetInnerHTML={titleConvertedContent}
                >
                </div>
                <div
                    className={"preview"}
                    dangerouslySetInnerHTML={contentConvertedContent}
                >
                </div>
            </>
            : <SendError>Edit error</SendError>}
    </Layout>
}