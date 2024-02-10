import {createContext, Dispatch} from "react";
import {User} from "@/types/user";


export interface AuthContextState {
    user: User | null;
    token: string | null;
    isAuthenticated: boolean;
}

export interface AuthContextProps {
    state: AuthContextState;
    dispatch: Dispatch<AuthAction>;
}

export enum EAuthActions {
    LOGIN,
    LOGOUT
}

interface AuthAction {
    type: EAuthActions;
    payload: AuthContextState;
}

export const authReducer = (state: AuthContextState, action: AuthAction) => {
    switch (action.type) {
        case EAuthActions.LOGIN:
            return {
                ...state,
                isAuthenticated: true,
                user: action.payload.user,
                token: action.payload.token
            };
        case EAuthActions.LOGOUT:
            return {
                ...state,
                isAuthenticated: false,
                user: null
            };
        default:
            return state;
    }
};

export const INITIAL_AUTH_CONTEXT_STATE: AuthContextState = {
    isAuthenticated: false,
    user: null,
    token: null
};

export const AuthContext = createContext<AuthContextProps>({
    state: INITIAL_AUTH_CONTEXT_STATE,
    dispatch: value => {
        console.log("Default AuthContext dispatch... do nothing")
    }
});
