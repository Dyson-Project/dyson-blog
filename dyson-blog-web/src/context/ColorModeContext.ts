import React from "react";

export interface ColorModeContextProps {
    toggleColorMode: () => void
}

const DEFAULT_COLOR_MODE_CONTEXT: ColorModeContextProps = {
    toggleColorMode: () => {
    }
}

export const ColorModeContext = React.createContext<ColorModeContextProps>(DEFAULT_COLOR_MODE_CONTEXT);
