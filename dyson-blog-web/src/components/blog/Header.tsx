import * as React from 'react';
import {useContext} from 'react';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import Typography from '@mui/material/Typography';
import DriveFileRenameOutlineOutlinedIcon from '@mui/icons-material/DriveFileRenameOutlineOutlined';
import {Tooltip} from "@mui/material";
import Image from "next/image";
import {useAuth} from "@/hooks/useAuth";
import Link from "@mui/material/Link";
import {useTheme} from "@mui/material/styles";
import Box from "@mui/material/Box";
import {ColorModeContext} from "@/context/ColorModeContext";
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import Avatar from "@mui/material/Avatar";

interface HeaderProps {
    sections: ReadonlyArray<{
        title: string;
        url: string;
    }>;
    title: string;
}

export default function Header(props: HeaderProps) {
    const {sections, title} = props;
    const {isAuthenticated, user, logout} = useAuth();
    const theme = useTheme();
    const {toggleColorMode} = useContext(ColorModeContext);
    const rightSideComponents = isAuthenticated && user ?
        <>
            <Tooltip title={"Write"}>
                <Link href="/new-story">
                    <IconButton>
                        <DriveFileRenameOutlineOutlinedIcon/>
                    </IconButton>
                </Link>
            </Tooltip>
            <Link href={`/profile/${user.username}`}>
                <Avatar sx={{m: 1, bgcolor: 'primary.main'}}>
                    <Image src={user.avatar} alt="user-avatar" width={50} height={50}/>
                </Avatar>
            </Link>
            <Button onClick={logout}>Logout</Button>
        </>
        : <Button href="/login" LinkComponent={Link}>Login</Button>
    return (
        <>
            <Toolbar sx={{borderBottom: 1, borderColor: 'divider'}}>
                <Link href="/">
                    <Image src="/images/logo.png" alt={"website-logo"} width={70} height={70}/>
                </Link>
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
                {rightSideComponents}
                <Box
                    sx={{
                        display: 'flex',
                        width: '10%',
                        alignItems: 'center',
                        justifyContent: 'center',
                        bgcolor: 'background.default',
                        color: 'text.primary',
                        borderRadius: 1,
                        p: 3,
                    }}
                >
                    <IconButton sx={{ml: 1}} onClick={toggleColorMode} color="inherit">
                        {theme.palette.mode === 'dark' ? <Brightness7Icon/> : <Brightness4Icon/>}
                    </IconButton>
                </Box>
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
    )
        ;
}