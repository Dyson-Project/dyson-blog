import * as React from 'react';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import DriveFileRenameOutlineOutlinedIcon from '@mui/icons-material/DriveFileRenameOutlineOutlined';
import {Tooltip} from "@mui/material";

interface HeaderProps {
    sections: ReadonlyArray<{
        title: string;
        url: string;
    }>;
    title: string;
}

export default function Header(props: HeaderProps) {
    const {sections, title} = props;

    return (
        <React.Fragment>
            <Toolbar sx={{borderBottom: 1, borderColor: 'divider'}}>
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
                <Button variant="outlined" size="small">
                    Sign up
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
        </React.Fragment>
    );
}