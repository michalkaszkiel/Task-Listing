import React, { useState } from "react";
import TimePicker from "react-time-picker";
import "react-time-picker/dist/TimePicker.css";

const TimePickerApp = ({ handleTimeChanged, item }) => {
    const handleTimeChange = (newTime) => {
        handleTimeChanged(item._id, newTime);
    };

    return (
        <div>
            <TimePicker
                onChange={handleTimeChange}
                value={item.time}
                format="HH:mm"
                disableClock={true}
                className={"Time-Picker"}
            />
        </div>
    );
};

export default TimePickerApp;
