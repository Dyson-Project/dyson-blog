import {useContext} from "react";
import {userLocalStorage} from "@/hooks/useLocalStorage";
import {User} from "@/types/user";
import {AuthContext} from "@/context/AuthContext";

export const useUser = () => {
    const {user, setUser} = useContext(AuthContext);
    const {setItem} = userLocalStorage();

    const addUser = (user: User) => {
        setUser(user);
        setItem("user", JSON.stringify(user));
    };

    const removeUser = () => {
        setUser(null);
        setItem("user", "");
    };

    return {user, addUser, removeUser};
};
