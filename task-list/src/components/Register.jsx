import { Link } from "react-router-dom";
import regImg from "../images/Register-IMG.jpeg";
import { useState } from "react";
import axios from "axios";

export const Register = () => {
    const [userName, setUserName] = useState("");
    const [password, setPassword] = useState("");
    const [userEmail, setUserEmail] = useState("");
    const [isRegistered, setIsRegistered] = useState(false);

    const handleRegister = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(
                "http://localhost:3001/api/task-list/create-user",
                {
                    userName: userName,
                    email: userEmail,
                    password: password,
                }
            );
            if (response.status === 201) {
                setIsRegistered(true);
                console.log("User created successfully");
            }
        } catch (err) {
            const response = await err.response;
            if (response.status) {
                window.alert(response.data.message);
                console.log("Unable to create user");
            } else {
                console.log("Unable to send data to the server");
            }
        }
    };
    return (
        <div className="Register">
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
                    <form className="Register-Form" onSubmit={handleRegister}>
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
                            With your own account, you can keep your tasks
                            neatly organized, making it easier to manage your
                            to-dos.
                        </p>
                        <img
                            src={regImg}
                            alt="register"
                            className="Register-Image"
                        />
                    </div>
                </div>
            )}
        </div>
    );
};
