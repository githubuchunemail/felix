import { useEffect } from "react";
import { useState } from "react";
import { createContext } from "react";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
    const initialToken = JSON.parse(localStorage.getItem("token"));
    let [token, setToken] = useState(initialToken);

    useEffect(() => {
        if (token) {
            localStorage.setItem("token", JSON.stringify(token));
        } else {
            localStorage.removeItem("token");
        }
    }, [token]);

    const logout = () => {
        setToken(null);
    };

    return (
        <AuthContext.Provider value={{ token, setToken, logout }}>
            {children}
        </AuthContext.Provider>
    );
};
