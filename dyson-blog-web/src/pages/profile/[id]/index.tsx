import {useRouter} from "next/router";
import Layout from "@/components/Layout";
import Head from "next/head";
import styles from "@/components/layout.module.css";
import Image from "next/image";
import utilStyles from "@/styles/utils.module.css";
import Link from "next/link";
import React, {useState} from "react";
import {DraftSummary} from "@/types/draft";
import {Profile} from "@/types/profile";

export interface ProfileProps {
    home: boolean
}

const Profile = ({home}: ProfileProps) => {
    const router = useRouter();
    const profileId = router.query.id as string;
    const [profile, setProfile] = useState<Profile>();
    const [drafts, setDrafts] = useState<DraftSummary[]>();

    return <Layout home={true}>
        <Head>
            <title>{profileId}</title>
        </Head>
        <div className={styles.header}>
            {home ? (
                <>
                    <Image
                        priority
                        src="/images/profile.jpeg"
                        className={utilStyles.borderCircle}
                        height={144}
                        width={144}
                        alt=""
                    />
                    <h1 className={utilStyles.heading2Xl}>{name}</h1>
                </>
            ) : (
                <>
                    <Link href="/">
                        <Image
                            priority
                            src="/images/profile.jpeg"
                            className={utilStyles.borderCircle}
                            height={108}
                            width={108}
                            alt=""
                        />
                    </Link>
                    <h2 className={utilStyles.headingLg}>
                        <Link href="/" className={utilStyles.colorInherit}>
                            {profile?.name}
                        </Link>
                    </h2>
                </>
            )}
        </div>
    </Layout>

}
export default Profile;