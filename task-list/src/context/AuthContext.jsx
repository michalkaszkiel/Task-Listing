// AuthContext.jsx
import React, { createContext, useContext, useState } from "react";
import Cookies from "js-cookie";
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(!!Cookies.get("jwtToken"));

    const login = () => {
        setIsLoggedIn(true);
    };

    const logout = () => {
        Cookies.remove("jwtToken", { httpOnly: true, secure: true });
        setIsLoggedIn(false);
    };

    return (
        <AuthContext.Provider
            value={{
                isLoggedIn,
                login,
                logout,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
