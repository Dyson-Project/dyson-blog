import * as React from 'react';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import DriveFileRenameOutlineOutlinedIcon from '@mui/icons-material/DriveFileRenameOutlineOutlined';
import {Tooltip} from "@mui/material";
import Image from "next/image";
import {useAuth} from "@/hooks/useAuth";

interface HeaderProps {
    sections: ReadonlyArray<{
        title: string;
        url: string;
    }>;
    title: string;
}

export default function Header(props: HeaderProps) {
    const {sections, title} = props;
    const {logout} = useAuth();

    return (
        <>
            <Toolbar sx={{borderBottom: 1, borderColor: 'divider'}}>
                <Link href="/">
                    <Image src="/images/logo.png" alt={"logo"} width={70} height={70}/>
                </Link>
                <Button size="small">Subscribe</Button>
                <Tooltip title={"Search"}>
                    <IconButton>
                        <SearchIcon/>
                    </IconButton>
                </Tooltip>
                <Typography
                    component="h2"
                    variant="h5"
                    color="inherit"
                    align="center"
                    noWrap
                    sx={{flex: 1}}
                >
                    {title}
                </Typography>
                <Tooltip title={"Write"}>
                    <Link href="/new-story">
                        <IconButton>
                            <DriveFileRenameOutlineOutlinedIcon/>
                        </IconButton>
                    </Link>
                </Tooltip>
                <Button onClick={logout}>
                    Logout
                </Button>
            </Toolbar>
            <Toolbar
                component="nav"
                variant="dense"
                sx={{justifyContent: 'space-between', overflowX: 'auto'}}
            >
                {sections.map((section) => (
                    <Link
                        color="inherit"
                        noWrap
                        key={section.title}
                        variant="body2"
                        href={section.url}
                        sx={{p: 1, flexShrink: 0}}
                    >
                        {section.title}
                    </Link>
                ))}
            </Toolbar>
        </>
    );
}