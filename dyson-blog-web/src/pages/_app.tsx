import "../styles/global.scss";
import React, {FC, useReducer} from "react";
import {AuthContext, authReducer, INITIAL_AUTH_CONTEXT_STATE} from "@/context/AuthContext";
import {ThemeProvider} from "@mui/material/styles";
import {ColorModeContext} from "@/context/ColorModeContext";
import {AppRouterCacheProvider} from "@mui/material-nextjs/v13-appRouter";
import CssBaseline from "@mui/material/CssBaseline";
import {useCustomTheme} from "@/hooks/useCustomTheme";
import {GoogleOAuthProvider} from "@react-oauth/google";
import {useAuth} from "@/hooks/useAuth";


export default function App({Component, pageProps}: { Component: FC, pageProps: object }) {
    const [state, dispatch] = useReducer(authReducer, INITIAL_AUTH_CONTEXT_STATE);
    const {} = useAuth();
    const {theme, colorMode} = useCustomTheme('light');

    return (
        <AppRouterCacheProvider>
            <ColorModeContext.Provider value={colorMode}>
                <ThemeProvider theme={theme}>
                    <CssBaseline/>
                    <AuthContext.Provider value={{state, dispatch}}>
                        <GoogleOAuthProvider clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID!}>
                            <Component {...pageProps}/>
                        </GoogleOAuthProvider>
                    </AuthContext.Provider>
                </ThemeProvider>
            </ColorModeContext.Provider>
        </AppRouterCacheProvider>
    )
}