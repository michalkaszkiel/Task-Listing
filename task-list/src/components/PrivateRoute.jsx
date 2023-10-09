import React from "react";
import { Route, Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";
const PrivateRoute = ({ element, ...rest }) => {
    const { isLoggedIn } = useAuth(); // Get the authentication status from your context

    return (
        <Route
            {...rest}
            element={isLoggedIn ? element : <Navigate to="/Login" />}
        />
    );
};

export default PrivateRoute;
