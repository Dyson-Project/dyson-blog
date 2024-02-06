import "../styles/global.css";
import {FC} from "react";

export default function App({Component, pageProps}: { Component: FC, pageProps: object}) {
    return <Component {...pageProps}/>
}