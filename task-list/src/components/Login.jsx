import { Link } from "react-router-dom";
export const Login = () => {
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
                <form className="Login-Form">
                    <h1 style={{ marginBottom: "1vh" }}>Log in</h1>
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
                            />
                            <span className="Login-span"></span>
                        </label>
                    </section>
                </form>
            </div>
        </div>
    );
};
