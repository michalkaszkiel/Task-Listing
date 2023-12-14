import { useState } from "react";

import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";
import { useCookie } from "../context/CookieContext.jsx";
import Cookies from "js-cookie";
import apiInstance from "../utils/axiosInstance.js";
export const Login = () => {
    const inst = apiInstance();
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const { login } = useAuth(); // Get the login function and rememberMe setter from the context
    const { cookie } = useCookie();
    const [rememberMe, setRememberMe] = useState(false);
    const handleLogIn = async (e) => {
        e.preventDefault();
        try {
            setLoading(true);
            const response = await inst.post("/login", {
                email: email,
                password: password,
                rememberMe: rememberMe,
            });

            if (response.status === 200) {
                // Login successful, store the token and navigate to the List
                const token = response.data.token;
                if (cookie === false) {
                    localStorage.setItem("jwtToken", token);
                } else {
                    Cookies.set("jwtToken", token);
                }
                // Call the login function from the context and set rememberMe state
                login();

                navigate("/List");
            } else {
                // Handle other response statuses if needed
                setError("Login failed");
            }
        } catch (err) {
            let errorMessage = "Failed to login. Please try again.";
            if (err.response && err.response.data) {
                if (err.response.data.errors) {
                    const formattedErrors = err.response.data.errors.map(
                        (error) => error.msg
                    );
                    errorMessage = formattedErrors.join("\n");
                } else if (err.response.data.message) {
                    errorMessage = err.response.data.message;
                }
            }
            window.alert(errorMessage);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="Login">
            <div className="Login-Welcome-Container">
                <div className="Login-Welcome-text">
                    <h1 className="Login-Welcome">Welcome Back!</h1>
                    <strong>Good to see you again.</strong>
                    <p className="Login-Welcome-Sub">
                        To keep connected with us, please login with your email
                        address and password.
                    </p>
                </div>
            </div>
            <div className="Login-Container">
                {loading ? (
                    <div className="loading-spinner"></div>
                ) : (
                    <form className="Login-Form" onSubmit={handleLogIn}>
                        <h1 style={{ marginBottom: "1vh" }}>Log in</h1>
                        <input
                            onChange={(e) => setEmail(e.target.value)}
                            className="Login-input"
                            type="email"
                            placeholder="E-mail"
                            minLength="3"
                            maxLength="36"
                            required
                        />
                        <input
                            onChange={(e) => setPassword(e.target.value)}
                            type={showPassword ? "text" : "password"}
                            placeholder="Password"
                            required
                            className="Login-input"
                        />
                        <p style={{ marginBottom: "1.5vh" }}>
                            Don't have an account?{" "}
                            <Link to="/Register">Join Us!</Link>
                        </p>
                        <section className="Login-Section">
                            <button type="submit" className="btn1">
                                submit
                            </button>
                            <label className="Login-label">
                                <input
                                    type="checkbox"
                                    name="rememberMe"
                                    className="Login-checkbox"
                                    checked={rememberMe}
                                    onChange={() => setRememberMe(!rememberMe)}
                                />
                                <span className="Login-span"></span>
                                Remember Me
                            </label>
                        </section>
                    </form>
                )}
            </div>
        </div>
    );
};
