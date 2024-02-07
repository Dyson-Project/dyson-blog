import {createContext, useContext} from "react";

export const PopupErrorContext = createContext<>({
    errors: [],
    setErrors: () => {
    }
})

export const usePopupErrorContext = () => useContext(PopupErrorContext);