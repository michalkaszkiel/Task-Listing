import list from "../images/list.png";
import { Fade } from "react-reveal";
import { Link } from "react-router-dom";
import { Footer } from "./Footer.jsx";
import { CookiesAlert } from "./CookiesAlert.jsx";
import { useAuth } from "../context/AuthContext.jsx";
export const LandingPage = () => {
    const { isLoggedIn } = useAuth();
    const goToList = isLoggedIn ? "/List" : "/SignInUp";
    const listed = list;
    return (
        <>
            <div className="Landing-Page-Main">
                <Fade
                    duration={2500}
                    delay={500}
                    timingFunction="ease-in"
                    className="custom-fade"
                >
                    <div className="Landing-text ">
                        <div className="Landing-Page-Sub-Text">
                            <h1>Keep your tasks in one place...</h1>
                            <p className="never-forget">
                                And never forget a thing...
                            </p>
                        </div>
                        <div className="Landing-Page-Image-Cont">
                            <Link to={goToList} className="link">
                                <img
                                    alt="list"
                                    src={listed}
                                    className="Landing-Page-Image pulse-on"
                                ></img>
                                <p className="Click-me">Let's start!</p>
                            </Link>
                        </div>
                    </div>
                </Fade>

                <Footer />
                <CookiesAlert />
            </div>
        </>
    );
};
