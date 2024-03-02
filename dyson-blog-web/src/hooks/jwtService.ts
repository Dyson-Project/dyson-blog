import {useState} from "react";
import {useLocalStorage} from "@/hooks/useLocalStorage";

export const useJwt = () => {
    const {setItem, getItem} = useLocalStorage();
    // const [accessToken, setAccessToken] = useState<string | null>(null);

    const getToken = (): string | null => {
        return accessToken;
    }

    const removeToken = () => {
        setAccessToken(null);
    }

    return {getToken, setAccessToken, removeToken}
}