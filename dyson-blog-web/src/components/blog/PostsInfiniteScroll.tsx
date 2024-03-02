import {AxiosResponse} from "axios";
import {PostSummary} from "@/types/post";
import InfiniteScroll from "react-infinite-scroll-component";
import utilStyles from "@/styles/utils.module.scss";
import Link from "next/link";
import React, {useEffect, useState} from "react";
import {usePostApi} from "@/hooks/usePostApi";

export interface PostsInfiniteScrollProps {
}

const PostsInfiniteScroll = ({}: PostsInfiniteScrollProps) => {
    const [posts, setPosts] = useState<PostSummary[]>([]);
    const {getPosts} = usePostApi();

    useEffect(() => {
        fetchMoreData();
    }, []);

    const fetchMoreData = () => {
        getPosts({})
            .then((value: AxiosResponse<PostSummary[]>) => {
                console.log(value)
                const fetchedPosts = value.data;
                setPosts(posts.concat(fetchedPosts));
            })
            .catch(reason => {
                console.log(reason);
            })
    }

    return <InfiniteScroll style={{}} next={fetchMoreData}
                           hasMore={true}
                           loader={<h4>...</h4>}
                           dataLength={posts.length}>
        {
            posts.map(({id, title, lastModifiedDate}) => (
                <li className={utilStyles.listItem} key={id}>
                    <Link href={`/post/${id}`}> {title} </Link>
                    <br/>
                    <small className={utilStyles.lightText}>
                        {lastModifiedDate}
                        {/*<Date dateString={lastModifiedDate}></Date>*/}
                    </small>
                </li>
            ))
        }
    </InfiniteScroll>
}
export default PostsInfiniteScroll;