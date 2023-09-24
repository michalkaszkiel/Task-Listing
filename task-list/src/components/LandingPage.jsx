import list from "../images/list.png";
import { Fade } from "react-reveal";
export const LandingPage = () => {
    const listed = list;
    return (
        <>
            <div className="Landing-Page-Main">
                <Fade duration={2500} delay={500} timingFunction="ease-in">
                    <div className="Landing-text">
                        <div className="Landing-Page-Sub-Text">
                            <h1>Keep your tasks in one place...</h1>
                            <p>And never forget a thing.</p>
                        </div>
                        <div className="Landing-Page-Image-Cont">
                            <img
                                alt="list"
                                src={listed}
                                className="Landing-Page-Image"
                            ></img>
                        </div>
                    </div>
                </Fade>
            </div>
        </>
    );
};
