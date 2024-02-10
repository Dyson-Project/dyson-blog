import "../styles/global.scss";
import React, {FC, useMemo, useReducer, useState} from "react";
import {AuthContext, authReducer, INITIAL_AUTH_CONTEXT_STATE} from "@/context/AuthContext";
import {createTheme, ThemeOptions, ThemeProvider} from "@mui/material/styles";
import {ColorModeContext} from "@/context/ColorModeContext";
import {AppRouterCacheProvider} from "@mui/material-nextjs/v13-appRouter";
import * as Colors from '@mui/material/colors';
import {PaletteMode} from "@mui/material";
import {DefaultColorScheme} from "@mui/material/styles/experimental_extendTheme";


const getDesignTokens = (mode: PaletteMode): ThemeOptions => ({
    palette: {
        mode,
        ...(mode === 'light'
            ? {
                // palette values for light mode
                primary: Colors.amber,
                divider: Colors.amber[200],
                text: {
                    primary: Colors.grey[900],
                    secondary: Colors.grey[800],
                },
            }
            : {
                // palette values for dark mode
                primary: Colors.deepOrange,
                divider: Colors.deepOrange[700],
                background: {
                    default: Colors.deepOrange[900],
                    paper: Colors.deepOrange[900],
                },
                text: {
                    primary: '#fff',
                    secondary: Colors.grey[500],
                },
            }),
    },
});
export default function App({Component, pageProps}: { Component: FC, pageProps: object }) {
    const [state, dispatch] = useReducer(authReducer, INITIAL_AUTH_CONTEXT_STATE);
    const [mode, setMode] = useState<DefaultColorScheme>('light');
    const colorMode = useMemo(
        () => ({
            toggleColorMode: () => {
                setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
            },
        }),
        [],
    );
    const theme = React.useMemo(() => createTheme(getDesignTokens(mode)), [mode]);

    return (
        <AppRouterCacheProvider>
            <ColorModeContext.Provider value={colorMode}>
                <ThemeProvider theme={theme}>
                    <AuthContext.Provider value={{state, dispatch}}>
                        <Component {...pageProps}/>
                    </AuthContext.Provider>
                </ThemeProvider>
            </ColorModeContext.Provider>
        </AppRouterCacheProvider>
    )
}