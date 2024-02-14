import {useRouter} from "next/router";
import Layout from "@/components/Layout";
import Head from "next/head";
import styles from "@/components/Layout.module.scss";
import Image from "next/image";
import utilStyles from "@/styles/utils.module.scss";
import React, {useEffect, useState} from "react";
import {DraftSummary} from "@/types/draft";
import {Profile} from "@/types/profile";
import {useAuth} from "@/hooks/useAuth";
import Typography from "@mui/material/Typography";
import {TabContext, TabList, TabPanel} from "@mui/lab";
import Box from "@mui/material/Box";
import {Tab} from "@mui/material";
import DraftsInfiniteScroll from "@/components/blog/DraftsInfiniteScroll";

export interface ProfileProps {
}

const Profile = ({}: ProfileProps) => {
    const {user} = useAuth();
    const router = useRouter();
    const profileId = router.query.id as string;
    const [profile, setProfile] = useState<Profile>();
    const [drafts, setDrafts] = useState<DraftSummary[]>();
    useEffect(() => {
    }, []);
    const [value, setValue] = React.useState('1');

    const handleChange = (event: React.SyntheticEvent, newValue: string) => {
        setValue(newValue);
    };


    return user && <Layout home={true}>
        <Head>
            <title>{profileId}</title>
        </Head>
        <div className={styles.header}>
            <Image
                priority
                src={user.avatar}
                className={utilStyles.borderCircle}
                height={144}
                width={144}
                alt=""
            />
            <Typography variant="h4">
                {user.name}
            </Typography>
            <Typography variant="subtitle2">
                {user.username}
            </Typography>

            <TabContext value={value}>
                <Box sx={{borderBottom: 1, borderColor: 'divider'}}>
                    <TabList onChange={handleChange} aria-label="lab API tabs example">
                        <Tab label="Drafts" value="1"/>
                        <Tab label="Posts" value="2"/>
                    </TabList>
                </Box>
                <TabPanel value="1">
                    <DraftsInfiniteScroll/>
                </TabPanel>
                <TabPanel value="2">Posts</TabPanel>
            </TabContext>

        </div>
    </Layout>

}
export default Profile;