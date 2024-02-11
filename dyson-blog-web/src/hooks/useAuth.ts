import {userLocalStorage} from "@/hooks/useLocalStorage";
import {useContext, useEffect} from "react";
import {JwtPayload, LoginRequest, newUser, User} from "@/types/user";
import {AuthContext, AuthContextProps, EAuthActions, INITIAL_AUTH_CONTEXT_STATE} from "@/context/AuthContext";
import {useRouter} from "next/router";
import {CredentialResponse, googleLogout} from "@react-oauth/google";

function decodeTokenPayload(token: string): any {
    return JSON.parse(decodeURIComponent(atob(token.split(".")[1]).split('').map(function (c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join('')));
}

export const useAuth = () => {
    const {state, dispatch} = useContext<AuthContextProps>(AuthContext);
    const {getItem, setItem, removeItem} = userLocalStorage();
    const router = useRouter();

    useEffect(() => {
        (async function () {
            const userRaw = getItem("user");
            if (userRaw) {
                let user: User = JSON.parse(userRaw);
                if (user.authToken)
                    dispatch({
                        type: EAuthActions.LOGIN,
                        payload: {
                            isAuthenticated: true,
                            user: user,
                            token: user.authToken
                        }
                    })
            }
        })();
    }, []);

    const login = (loginRequest: LoginRequest) => {
        (async function () {
            let token = "token" // TODO: complete me
            let user = newUser({
                id: '1',
                username: 'TikTuzki',
                name: 'TikTuzki',
                email: 'tiktuzki@gmail.com',
                authToken: token,
            });
            setItem("user", JSON.stringify(user));
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
    const onOAuth2Success = (credentialResponse: CredentialResponse) => {
        const token = credentialResponse.credential!;
        const payload: JwtPayload = decodeTokenPayload(token);
        let user: User = newUser({
            id: payload.sub,
            name: payload.name,
            email: payload.email,
            username: payload.email,
            authToken: token,
            avatar: payload.picture
        })
        setItem("user", JSON.stringify(user));
        dispatch({
            type: EAuthActions.LOGIN,
            payload: {
                isAuthenticated: true,
                user: user,
                token: token
            }
        });
    }
    const logout = () => {
        (async function () {
            removeItem("user");
            googleLogout();
            dispatch({
                type: EAuthActions.LOGOUT,
                payload: INITIAL_AUTH_CONTEXT_STATE
            });
            await router.replace("/login")
        })();
    }

    const user = state.user;
    const isAuthenticated = state.isAuthenticated;

    return {isAuthenticated, user, onOAuth2Success, login, logout};
};
