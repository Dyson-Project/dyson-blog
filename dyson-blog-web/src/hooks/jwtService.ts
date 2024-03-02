const ACCESS_TOKEN = "token";
export const jwtService = () => {
    const setItem = (key: string, value: string) => {
        localStorage.setItem(key, value);
    };

    const getItem = (key: string) => {
        return localStorage.getItem(key);
    };

    const removeItem = (key: string) => {
        localStorage.removeItem(key);
    };

    const getToken = (): string | undefined => {
        return getItem(ACCESS_TOKEN);
    }

    const removeToken = () => {
        removeItem(ACCESS_TOKEN)
    }

    const setToken = (token: string) => {
        setItem(ACCESS_TOKEN, token);
    }

    return {getToken, setToken, removeToken}
}