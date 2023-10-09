// AuthContext.jsx
import React, { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(
        !!localStorage.getItem("jwtToken")
    );
    const [rememberMe, setRememberMe] = useState(false);
    const [shouldLogout, setShouldLogout] = useState(false); //automatic logout

    const login = (remember = false) => {
        setIsLoggedIn(true);
        if (remember) {
            setRememberMe(true);
        }
    };

    const logout = () => {
        setIsLoggedIn(false);
        if (!rememberMe) {
            localStorage.removeItem("jwtToken");
        }
    };

    // Add an effect to handle automatic logout
    useEffect(() => {
        if (shouldLogout) {
            logout();
            setShouldLogout(false); // Reset logout
        }
    }, [shouldLogout]);

    return (
        <AuthContext.Provider
            value={{
                isLoggedIn,
                login,
                logout,
                rememberMe,
                setRememberMe,
                setShouldLogout, // Provide the flag to components
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
