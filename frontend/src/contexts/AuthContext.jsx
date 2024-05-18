import { createContext, useContext, useState } from "react";
const stateContext = createContext({
    user: null,
    setUser: () => {},
});
export const AuthProvider = ({ children }) => {
    const [user, _setUser] = useState(JSON.parse(localStorage.getItem("USER")));
    const setUser = (user) => {
        _setUser(user);
        if (user) localStorage.setItem("USER", JSON.stringify(user));
        else localStorage.removeItem("USER");
    };
    return (
        <stateContext.Provider value={{ user, setUser }}>
            {children}
        </stateContext.Provider>
    );
};

export const useAuthContext = () => useContext(stateContext);
