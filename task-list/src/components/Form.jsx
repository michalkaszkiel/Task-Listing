import { useState, useEffect } from "react";
import { Fade } from "react-reveal";
export const Form = ({ handleSubmit, setInputName }) => {
    const handleChange = (e) => {
        setInputName(e.target.value);
    };
    const [showSecondHeader, setShowSecondHeader] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => {
            setShowSecondHeader(true);
        }, 3000);

        return () => clearTimeout(timer);
    }, []);
    return (
        <div className="Form-Container">
            {!showSecondHeader && (
                <Fade duration={2000} delay={500}>
                    <h1>Welcome to your task list.</h1>
                </Fade>
            )}
            {showSecondHeader && (
                <Fade duration={2000}>
                    <h1>Let's plan something...</h1>
                </Fade>
            )}
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Add a task"
                    onChange={handleChange}
                ></input>
                <button type="submit" className="btn">
                    Add
                </button>
            </form>
        </div>
    );
};
