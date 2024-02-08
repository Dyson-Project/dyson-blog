import "../styles/global.scss";
import {FC} from "react";

export default function App({Component, pageProps}: { Component: FC, pageProps: object }) {
    return <Component {...pageProps}/>
}