import "../styles/global.scss";
import {FC} from "react";
import {AuthContext} from "@/context/AuthContext";
import {useAuth} from "@/hooks/useAuth";
import {ThemeProvider, useTheme} from "@mui/material/styles";

export default function App({Component, pageProps}: { Component: FC, pageProps: object }) {
    const {user, setUser} = useAuth();
    const theme = useTheme();
    return (
        <ThemeProvider theme={theme}>
            <AuthContext.Provider value={{user, setUser}}>
                <Component {...pageProps}/>
            </AuthContext.Provider>
        </ThemeProvider>
    )
}