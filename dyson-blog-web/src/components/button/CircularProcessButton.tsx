import Button from "@mui/material/Button";
import {CircularProgress} from "@mui/material";
import React, {MouseEventHandler, useEffect, useState} from "react";
import {ButtonProps} from "@mui/material/Button/Button";

interface CircularProcessButtonProps extends ButtonProps {
    onClick: MouseEventHandler<HTMLButtonElement>
}

const styles = (theme: any) => ({
    circularProgress: {
        marginLeft: 0,
        marginRight: theme.spacing.unit,
    },

});

const CircularProcessButton = (props: CircularProcessButtonProps) => {
    const [loading, setLoading] = useState<boolean>(false);
    useEffect(() => {

    }, [loading]);

    const onClick: MouseEventHandler<HTMLButtonElement> = (event: React.MouseEvent<HTMLButtonElement>) => {
        setLoading(true)
        return props.onClick(event);
    }

    return <Button
        variant="contained"
        color="success"
        disabled={loading}
        onClick={onClick}
    >
        <CircularProgress className={styles.circularProgress} size={20}/>
        Save draft
    </Button>
}