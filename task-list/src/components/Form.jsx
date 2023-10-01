import { useState, useEffect, useRef } from "react";
import { Fade } from "react-reveal";
import MyCalendar from "./MyCalendar";

export const Form = ({
    handleSubmit,
    setInputName,
    selectedDate,
    setSelectedDate,
    handleDateChange,
}) => {
    const handleChange = (e) => {
        setInputName(e.target.value);
    };

    const [showSecondHeader, setShowSecondHeader] = useState(false);
    const [showCalendar, setShowCalendar] = useState(false);

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
                <i
                    class="fa-solid fa-calendar-day"
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
    );
};
