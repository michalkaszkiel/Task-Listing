import { useState } from "react";
// import axios from "axios";
import { Form } from "./Form";
import { Done } from "./Done";
import { Undone } from "./Undone";
import React from "react";

export const List = () => {
    const [showCompleted, setShowCompleted] = useState(false);

    const handleShowCompleted = () => {
        setShowCompleted(!showCompleted);
    };
    const handleBackground = showCompleted ? "MainOff" : "Sub-List-Main";
    return (
        <div className="List-Main">
            <div className={handleBackground}>
                <Form />
                {showCompleted && <Done />}
                <Undone />
            </div>
        </div>
    );
};
