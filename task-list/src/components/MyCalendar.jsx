import React from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

const MyCalendar = ({ selectedDate, handleDateChange }) => {
    return (
        <div className="calendar-container">
            <Calendar
                onChange={(date) => {
                    handleDateChange(date);
                }}
                value={selectedDate}
                calendarType="US" // Use the US calendar type to allow both month and day selection
            />
        </div>
    );
};

export default MyCalendar;
