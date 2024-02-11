import {PaletteMode} from "@mui/material";
import {createTheme, ThemeOptions} from "@mui/material/styles";
import * as Colors from "@mui/material/colors";
import colors from "@/styles/Home.module.scss";
import React, {useMemo, useState} from "react";
import {DefaultColorScheme} from "@mui/material/styles/experimental_extendTheme";


const getDesignTokens = (mode: PaletteMode): ThemeOptions => ({
    palette: {
        mode,
        ...(mode === 'light'
            ? {
                // palette values for light mode
                primary: Colors.teal,
                secondary: Colors.indigo,
                divider: colors.dimGray,
                text: {
                    primary: Colors.grey[900],
                    secondary: Colors.grey[800],
                }
            }
            : {
                // palette values for dark mode
                error: {
                    main: colors.cinnamonSatin
                },
                primary: Colors.teal,
                secondary: Colors.indigo,
                divider: colors.dimGray,
                background: {
                    default: colors.eerieBlack,
                    paper: colors.eerieBlack,
                },
                text: {
                    primary: colors.lotion,
                    secondary: colors.seaSalt,
                }
            }),
    },
});

export const useCustomTheme = (initTheme: DefaultColorScheme) => {
    const [mode, setMode] = useState<DefaultColorScheme>(initTheme);
    const colorMode = useMemo(
        () => ({
            toggleColorMode: () => {
                setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
            },
        }),
        [],
    );
    const theme = React.useMemo(() => createTheme(getDesignTokens(mode)), [mode]);
    return {theme, colorMode}
}