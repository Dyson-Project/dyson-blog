import {AxiosResponse} from "axios";
import {PostSummary} from "@/types/post";
import InfiniteScroll from "react-infinite-scroll-component";
import utilStyles from "@/styles/utils.module.scss";
import Link from "next/link";
import React, {useEffect, useState} from "react";
import {DraftSummary} from "@/types/draft";
import {useDraftApi} from "@/hooks/useDraftApi";

export interface DraftsInfiniteScrollProps {
}

const DraftsInfiniteScroll = ({}: DraftsInfiniteScrollProps) => {
    const [drafts, setDrafts] = useState<DraftSummary[]>([]);
    const {getDrafts} = useDraftApi();

    useEffect(() => {
        fetchMoreData();
    }, []);

    const fetchMoreData = () => {
        getDrafts({})
            .then((value: AxiosResponse<PostSummary[]>) => {
                const fetchedPosts = value.data;
                setDrafts(drafts.concat(fetchedPosts));
            })
            .catch(reason => {
                console.error(reason);
            })
    }
    return <InfiniteScroll style={{}} next={fetchMoreData}
                           hasMore={true}
                           loader={<h4>...</h4>}
                           dataLength={drafts.length}>
        {
            drafts.map(({id, title, lastModifiedDate}) => (
                <li className={utilStyles.listItem} key={id +(Math.random() + 1).toString(36).substring(7) }>
                    <Link href={`/draft/${id}/edit`}> {title || "untitled story"} </Link>
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
export default DraftsInfiniteScroll;