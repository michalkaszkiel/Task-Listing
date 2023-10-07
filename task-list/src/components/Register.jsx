import { Link } from "react-router-dom";
import regImg from "../images/Register-IMG.jpeg";
export const Register = () => {
    return (
        <div className="Register">
            <div className="Register-Container">
                <form className="Register-Form">
                    <h1 style={{ marginBottom: "2vh" }}>Create an account </h1>
                    <input
                        type="text"
                        className="Login-input"
                        placeholder="User Name"
                        minlength="8"
                        required
                    />
                    <input
                        className="Login-input"
                        type="email"
                        placeholder="E-mail"
                        minlength="3"
                        maxlength="36"
                        required
                    />
                    <input
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
                        With your own account, you can keep your tasks neatly
                        organized, making it easier to manage your to-dos.
                    </p>
                    <img
                        src={regImg}
                        alt="register"
                        className="Register-Image"
                    />
                </div>
            </div>
        </div>
    );
};
