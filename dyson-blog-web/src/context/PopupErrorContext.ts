import {createContext, useContext} from "react";

export interface PopupErrorState {
    errors: string[],
    setErrors: () => void
}

export const PopupErrorContext = createContext<PopupErrorState>({
    errors: [],
    setErrors: () => {
    }
})

export const usePopupErrorContext = () => useContext(PopupErrorContext);