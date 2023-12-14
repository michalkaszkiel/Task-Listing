import { Link } from "react-router-dom";
import regImg from "../images/Register-IMG.jpeg";
import { useState } from "react";
import apiInstance from "../utils/axiosInstance.js";

export const Register = () => {
    const inst = apiInstance();
    const [userName, setUserName] = useState("");
    const [password, setPassword] = useState("");
    const [userEmail, setUserEmail] = useState("");
    const [isRegistered, setIsRegistered] = useState(false);
    const [loading, setLoading] = useState(false);
    const handleRegister = async (e) => {
        e.preventDefault();
        try {
            setLoading(true);
            const response = await inst.post("/create-user", {
                userName: userName,
                email: userEmail,
                password: password,
            });
            if (response.status === 201) {
                setIsRegistered(true);
                setLoading(false);
                console.log("User created successfully");
            }
        } catch (err) {
            let errorMessage = "Failed to register. Please try again.";

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
        <div className="Register">
            {loading ? (
                <div className="loading-spinner"></div>
            ) : (
                <>
                    {isRegistered && (
                        <div className="Register-Successful">
                            <p>
                                You have successfully registered!{" "}
                                <Link to="/Login">Log in</Link>
                            </p>
                        </div>
                    )}
                    {!isRegistered && (
                        <div className="Register-Container">
                            <form
                                className="Register-Form"
                                onSubmit={handleRegister}
                            >
                                <h1 style={{ marginBottom: "2vh" }}>
                                    Create an account{" "}
                                </h1>
                                <input
                                    onChange={(e) => {
                                        setUserName(e.target.value);
                                    }}
                                    type="text"
                                    className="Login-input"
                                    placeholder="User Name"
                                    minlength="8"
                                    required
                                />
                                <input
                                    onChange={(e) => {
                                        setUserEmail(e.target.value);
                                    }}
                                    className="Login-input"
                                    type="email"
                                    placeholder="E-mail"
                                    minlength="3"
                                    maxlength="36"
                                    required
                                />
                                <input
                                    onChange={(e) => {
                                        setPassword(e.target.value);
                                    }}
                                    type="password"
                                    placeholder="Password"
                                    required
                                    className="Login-input"
                                />
                                <p style={{ marginBottom: "1.5vh" }}>
                                    Already have an account?{" "}
                                    <Link to="/Login">Sign in</Link>
                                </p>

                                <section className="Login-Section">
                                    <button type="submit" className="btn1">
                                        submit
                                    </button>
                                </section>
                            </form>
                            <div className="Register-Text">
                                <p>
                                    With your own account, you can keep your
                                    tasks neatly organized, making it easier to
                                    manage your to-dos.
                                </p>
                                <img
                                    src={regImg}
                                    alt="register"
                                    className="Register-Image"
                                />
                            </div>
                        </div>
                    )}
                </>
            )}
        </div>
    );
};
