import {useContext, useEffect} from "react";
import {JwtPayload, newUser, User} from "@/types/user";
import {AuthContext, AuthContextProps, EAuthActions, INITIAL_AUTH_CONTEXT_STATE} from "@/context/AuthContext";
import {useRouter} from "next/router";
import {CredentialResponse, googleLogout} from "@react-oauth/google";
import {jwtService} from "@/hooks/jwtService";

export const USER = "user";

export const useAuth = () => {
    const {state, dispatch} = useContext<AuthContextProps>(AuthContext);
    const router = useRouter();
    const {setToken, getToken, removeToken} = jwtService();

    useEffect(() => {
        (async function () {
            const user = getUser();
            const token = getToken();
            if (user) {
                if (token)
                    dispatch({
                        type: EAuthActions.LOGIN,
                        payload: {
                            isAuthenticated: true,
                            user: user,
                            token: token
                        }
                    })
            }
        })();
    }, []);

    // const login = (loginRequest: LoginRequest) => {
    //     (async function () {
    //         let token = "token" // TODO: complete me
    //         let user = newUser({
    //             id: '1',
    //             username: 'TikTuzki',
    //             name: 'TikTuzki',
    //             email: 'tiktuzki@gmail.com',
    //             authToken: token,
    //         });
    //         setItem("user", JSON.stringify(user));
    //         dispatch({
    //             type: EAuthActions.LOGIN,
    //             payload: {
    //                 isAuthenticated: true,
    //                 user: user,
    //                 token: token
    //             }
    //         });
    //         await router.replace("/");
    //     })();
    // };

    const setUser = (user: User) => {
        localStorage.setItem(USER, JSON.stringify(user));
    }
    const removeUser = () => {
        localStorage.removeItem(USER);
    }

    const getUser = (): User | undefined => {
        return JSON.parse(localStorage.getItem(USER));
    }

    const onOAuth2Success = (credentialResponse: CredentialResponse) => {
        const token = credentialResponse.credential!;
        const payload: JwtPayload = decodeTokenPayload(token);
        let user: User = newUser({
            id: payload.sub,
            name: payload.name,
            email: payload.email,
            username: payload.email,
            avatar: payload.picture
        })

        setUser(user);
        setToken(token);

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
        removeUser();
        removeToken();

        googleLogout();
        dispatch({
            type: EAuthActions.LOGOUT,
            payload: INITIAL_AUTH_CONTEXT_STATE
        });
    }

    const logoutAndRedirect = () => {
        logout();
        (async function () {
            await router.replace("/login");
        })();
    }

    function decodeTokenPayload(token: string): any {
        return JSON.parse(decodeURIComponent(atob(token.split(".")[1]).split('').map(function (c) {
            return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        }).join('')));
    }


    return {
        isAuthenticated: state.isAuthenticated,
        user: state.user,
        token: state.token,
        onOAuth2Success,
        logout,
        logoutAndRedirect
    };
};
