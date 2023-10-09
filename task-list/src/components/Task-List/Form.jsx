import { useState, useEffect, useRef } from "react";
import { Fade } from "react-reveal";
import MyCalendar from "./MyCalendar";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../../context/AuthContext.jsx";
export const Form = ({
    handleSubmit,
    setInputName,
    selectedDate,
    setSelectedDate,
    handleDateChange,
}) => {
    const { isLoggedIn } = useAuth();
    const navigate = useNavigate();
    const [showSecondHeader, setShowSecondHeader] = useState(false);
    const [showCalendar, setShowCalendar] = useState(false);
    const handleChange = (e) => {
        setInputName(e.target.value);
    };

    const handleShowCalendar = () => {
        setShowCalendar(!showCalendar);
    };

    const calendarRef = useRef(null);

    useEffect(() => {
        const timer = setTimeout(() => {
            setShowSecondHeader(true);
        }, 3000);

        return () => clearTimeout(timer);
    }, []);

    const handleLogOut = async () => {
        try {
            const logOut = await axios.post(
                "http://localhost:3001/api/task-list/logout"
            );
            // Remove the JWT token from local storage

            if (logOut.status === 200) {
                localStorage.removeItem("jwtToken");
                navigate("/Login");
            }
        } catch (e) {
            console.error("Unable to Logout", e);
        }
    };

    return (
        <>
            <div className="User-Login">
                <i className="fa-solid fa-user"></i>
                {isLoggedIn ? (
                    <p onClick={handleLogOut}>Log out</p>
                ) : (
                    <p onClick={() => navigate("/Login")}>Log in</p>
                )}
            </div>
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
                    <i
                        className="fa-solid fa-calendar-day"
                        onClick={handleShowCalendar}
                        ref={calendarRef}
                    ></i>

                    <div className="Calendar">
                        {showCalendar && (
                            <MyCalendar
                                selectedDate={selectedDate}
                                setSelectedDate={setSelectedDate}
                                handleDateChange={handleDateChange}
                            />
                        )}
                    </div>

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
        </>
    );
};
