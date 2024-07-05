import { createContext, useContext, useState, useEffect } from "react";
import axiosClient from "../axios-client";
const stateContext = createContext({
    user: null,
    setUser: () => {},
});
export const AuthProvider = ({ children }) => {
    const [user, _setUser] = useState(
        JSON.parse(sessionStorage.getItem("USER"))
    );
    const setUser = (user) => {
        _setUser(user);
        if (user) sessionStorage.setItem("USER", JSON.stringify(user));
        else sessionStorage.removeItem("USER");
    };

    //Check auth if user is still valid in backend
    useEffect(() => {
        const checkAuth = async () => {
            try {
                const { data } = await axiosClient.get(
                    "/api/authenticated-user"
                );
                console.log(data);
                if (data.user) setUser(data.user);
            } catch (error) {
                console.log(error);
            }
        };
        checkAuth();
    }, []);
    return (
        <stateContext.Provider value={{ user, setUser }}>
            {children}
        </stateContext.Provider>
    );
};

export const useAuthContext = () => useContext(stateContext);
