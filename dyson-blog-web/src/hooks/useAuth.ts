import {userLocalStorage} from "@/hooks/useLocalStorage";
import {useContext, useEffect} from "react";
import {LoginRequest, User} from "@/types/user";
import {AuthContext, AuthContextProps, EAuthActions, INITIAL_AUTH_CONTEXT_STATE} from "@/context/AuthContext";
import {useRouter} from "next/router";

export const useAuth = () => {
    const {state, dispatch} = useContext<AuthContextProps>(AuthContext);
    const {getItem, setItem, removeItem} = userLocalStorage();
    const router = useRouter();

    useEffect(() => {
        (async function () {
            const userRaw = getItem("user");
            const token = getItem("token");
            if (userRaw && token) {
                let user = JSON.parse(userRaw);
                dispatch({
                    type: EAuthActions.LOGIN,
                    payload: {
                        isAuthenticated: true,
                        user: user,
                        token: token
                    }
                })
                await router.replace("/");
            }
        })();
    }, []);

    const login = (loginRequest: LoginRequest) => {
        (async function () {
            let user: User = {
                id: '1',
                name: 'TikTuzki',
                email: 'tiktuzki@gmail.com'
            }
            let token = "token" // TODO: complete me
            setItem("user", JSON.stringify(user));
            setItem("token", JSON.stringify(token));
            dispatch({
                type: EAuthActions.LOGIN,
                payload: {
                    isAuthenticated: true,
                    user: user,
                    token: token
                }
            });
            await router.replace("/");
        })();
    };

    const logout = () => {
        (async function () {
            removeItem("user");
            removeItem("token");
            dispatch({
                type: EAuthActions.LOGOUT,
                payload: INITIAL_AUTH_CONTEXT_STATE
            });
            await router.replace("/login")
        })();
    }

    const user = state.user;
    const isAuthenticated = state.isAuthenticated;

    return {isAuthenticated, user, login, logout};
};
