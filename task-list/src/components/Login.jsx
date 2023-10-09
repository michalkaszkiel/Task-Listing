import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

export const Login = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    // const [showPassword, setShowPassword] = useState(false);
    const [stayLoggedIn, setStayLoggedIn] = useState(false);
    const [error, setError] = useState("");
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const handleLogIn = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(
                "http://localhost:3001/api/task-list/login",
                {
                    email: email,
                    password: password,
                }
            );

            if (response.status === 200) {
                // Login successful, store the token and navigate to the List
                const token = response.data.token;
                localStorage.setItem("jwtToken", token);
                setIsLoggedIn(true);
                navigate("/List");
            } else {
                // Handle other response statuses if needed
                setError("Login failed");
            }
        } catch (error) {
            setError("Login failed");
            console.error(error);
        }
    };

    return (
        <div className="Login">
            <div className="Login-Welcome-Container">
                <div className="Login-Welcome-text">
                    <h1 className="Login-Welcome">Welcome Back!</h1>
                    <strong>Good to see you again.</strong>
                    <p className="Login-Welcome-Sub">
                        To keep connected with us please login with your adress
                        e-mail and password.
                    </p>
                </div>
            </div>
            <div className="Login-Container">
                <form className="Login-Form" onSubmit={handleLogIn}>
                    <h1 style={{ marginBottom: "1vh" }}>Log in</h1>
                    <input
                        onChange={(e) => setEmail(e.target.value)}
                        className="Login-input"
                        type="email"
                        placeholder="E-mail"
                        minlength="3"
                        maxlength="36"
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
                                name="know-more"
                                className="Login-checkbox"
                                checked={showPassword}
                                onChange={() => setShowPassword(!showPassword)}
                            />
                            <span className="Login-span"></span>
                        </label>
                    </section>
                </form>
            </div>
        </div>
    );
};
