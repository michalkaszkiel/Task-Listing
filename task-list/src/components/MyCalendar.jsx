import { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css"; // Import the default calendar styles

const MyCalendar = ({ setSelectedDate, selectedDate, handleDateChange }) => {
    return (
        <div className="calendar-container">
            <Calendar
                onChange={handleDateChange}
                value={new Date(selectedDate)}
            />
            <p className="selected-date">Selected Date: {selectedDate}</p>
        </div>
    );
};

export default MyCalendar;
