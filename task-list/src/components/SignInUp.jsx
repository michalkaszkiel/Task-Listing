import { Login } from "./Login.jsx";
import { Register } from "./Register.jsx";
import { Link } from "react-router-dom";
export const SignInUp = () => {
    return (
        <div className="Sign-In-Up-Conatiner">
            <div className="Sign-In-Up-Sub-Cont">
                <div className="Sign-In-Up-Info">
                    <h1>Seamless Task Management: </h1>
                    <p>
                        Enjoy the benefits of a personalized experience. Create,
                        track, and organize your tasks effortlessly.
                    </p>
                    <h2>Stay Connected: </h2>
                    <p>
                        Access your tasks from any device, anywhere, and never
                        miss an important deadline.
                    </p>
                    <h3>Customization: </h3>
                    <p>
                        Tailor your task list with due dates, priorities, and
                        more.
                    </p>
                </div>
                <div className="Sign-In-Up-Controllers">
                    <div className="Sign-In-Up-Controllers-Login">
                        <Link to="/Login">
                            <button className="btn1">Login</button>
                        </Link>
                    </div>
                    <div className="Sign-In-Up-Controllers-Register">
                        <Link to="/Register">
                            <button className="btn1">Register</button>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};
