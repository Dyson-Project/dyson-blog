import Button from "@mui/material/Button";
import {CircularProgress} from "@mui/material";
import React, {useState} from "react";
import {ButtonProps} from "@mui/material/Button/Button";

interface CircularProcessButtonProps extends ButtonProps {

}

const styles = (theme: any) => ({
    circularProgress: {
        marginLeft: 0,
        marginRight: theme.spacing.unit,
    },

});

const CircularProcessButton = (props: CircularProcessButtonProps) => {
    const [loading, setLoading] = useState<boolean>(false);
    const onclick = () => {

    }

    return <Button
        variant="contained"
        color="success"
        disabled={loading}
        onClick={props.on}
    >
        <CircularProgress className={styles.circularProgress} size={20}/>
        Save draft
    </Button>
}