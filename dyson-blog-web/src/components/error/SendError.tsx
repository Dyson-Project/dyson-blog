import React from "react";

interface SendErrorProps {
}

export default function SendError(props: React.PropsWithChildren<SendErrorProps>) {
    return <>Error Component:
        {props.children}
    </>
}