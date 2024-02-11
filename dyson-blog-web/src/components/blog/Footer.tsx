import * as React from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';

export function Copyright(props: any) {
    return (
        <Typography variant="body2" color="text.secondary" align="center" {...props}>
            {'Copyright © '}
            <Link color="inherit" href="https://github.com/tiktzuki">
                TikTuzki
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}


interface FooterProps {
    description: string;
    title: string;
}

export default function Footer(props: FooterProps) {
    const {description, title} = props;

    return (
        <Box component="footer" sx={{bgcolor: 'background.paper', py: 6}}>
            <Container maxWidth="lg">
                <Typography color="text.primary" variant="h6" align="center" gutterBottom>
                    {title}
                </Typography>
                <Typography
                    variant="subtitle1"
                    align="center"
                    color="text.secondary"
                    component="p"
                >
                    {description}
                </Typography>
                <Copyright/>
            </Container>
        </Box>
    );
}