import {useUser} from "@/hooks/useUser";
import {userLocalStorage} from "@/hooks/useLocalStorage";
import {useEffect} from "react";
import {User} from "@/types/user";

export const useAuth = () => {
    const {user, addUser, removeUser} = useUser();
    const {getItem} = userLocalStorage();

    useEffect(() => {
        const user = getItem("user");
        if (user) {
            addUser(JSON.parse(user));
        }
    }, []);

    const login = (user: User) => {
        addUser(user);
    };

    const logout = () => {
        removeUser();
    };

    return {user, login, logout};
};
