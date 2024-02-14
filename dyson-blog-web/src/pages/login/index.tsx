import * as React from 'react';
import {useEffect} from 'react';
import Avatar from '@mui/material/Avatar';
import CssBaseline from '@mui/material/CssBaseline';
import Link from '@mui/material/Link';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import {useAuth} from "@/hooks/useAuth";
import Image from "next/image";
import {Copyright} from "@/components/blog/Footer";
import {useRouter} from "next/router";
import {GoogleLogin} from "@react-oauth/google";


export default function SignIn() {
    const {isAuthenticated, onOAuth2Success} = useAuth();
    const router = useRouter();
    const prevPath = router.query.prevPath as string;

    const redirectToIndexIfAuthenticated = async () => {
        console.log(prevPath);
        if (isAuthenticated)
            if (prevPath)
                await router.replace(prevPath);
            else
                await router.back();
    }

    useEffect(() => {
        (async function () {
            await redirectToIndexIfAuthenticated()
        })();
    }, []);

    useEffect(() => {
        (async function () {
            await redirectToIndexIfAuthenticated()
        })();
    }, [isAuthenticated]);

    // const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    //     event.preventDefault();
    //     const data = new FormData(event.currentTarget);
    //     login({
    //         username: `${data.get("email")}`,
    //         password: `${data.get("password")}`
    //     })
    // };

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline/>
            <Box
                sx={{
                    marginTop: 8,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
            >
                <Link href="/">
                    <Avatar sx={{m: 1, bgcolor: 'primary.main', width: 100, height: 100}}>
                        <Image src="/images/logo.png" alt="logo" width={100} height={100}/>
                    </Avatar>
                </Link>
                <Typography component="h1" variant="h5">
                    Sign in
                </Typography>
                <Box>
                    <GoogleLogin
                        onSuccess={onOAuth2Success}
                        onError={() => {
                            console.log('Login Failed');
                        }}
                    />
                </Box>
                {/*<Box component="form" onSubmit={handleSubmit} noValidate sx={{mt: 1}}>*/}
                {/*    <TextField*/}
                {/*        margin="normal"*/}
                {/*        required*/}
                {/*        fullWidth*/}
                {/*        id="email"*/}
                {/*        label="Email Address"*/}
                {/*        name="email"*/}
                {/*        autoComplete="email"*/}
                {/*        autoFocus*/}
                {/*    />*/}
                {/*    <TextField*/}
                {/*        margin="normal"*/}
                {/*        required*/}
                {/*        fullWidth*/}
                {/*        name="password"*/}
                {/*        label="Password"*/}
                {/*        type="password"*/}
                {/*        id="password"*/}
                {/*        autoComplete="current-password"*/}
                {/*    />*/}
                {/*    <FormControlLabel*/}
                {/*        control={<Checkbox value="remember" color="primary"/>}*/}
                {/*        label="Remember me"*/}
                {/*    />*/}
                {/*    <Button*/}
                {/*        type="submit"*/}
                {/*        fullWidth*/}
                {/*        variant="contained"*/}
                {/*        sx={{mt: 3, mb: 2}}*/}
                {/*    >*/}
                {/*        Sign In*/}
                {/*    </Button>*/}
                {/*    <Grid container>*/}
                {/*        <Grid item xs>*/}
                {/*            <Link href="#" variant="body2">*/}
                {/*                Forgot password?*/}
                {/*            </Link>*/}
                {/*        </Grid>*/}
                {/*        <Grid item>*/}
                {/*            <Link href="#" variant="body2">*/}
                {/*                {"Don't have an account? Sign Up"}*/}
                {/*            </Link>*/}
                {/*        </Grid>*/}
                {/*    </Grid>*/}
                {/*</Box>*/}
            </Box>
            <Copyright sx={{mt: 8, mb: 4}}/>
        </Container>
    );
}