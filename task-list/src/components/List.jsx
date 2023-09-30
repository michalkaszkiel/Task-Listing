import { useState, useEffect } from "react";
import axios from "axios";
import { Form } from "./Form";
import { Done } from "./Done";
import { Undone } from "./Undone";
import React from "react";
export const List = () => {
    const [items, setItems] = useState([]);
    const [inputName, setInputName] = useState("");
    const [showCompleted, setShowCompleted] = useState(false);
    const [selectedDate, setSelectedDate] = useState(new Date().toDateString());
    const toDo = items.filter((item) => !item.completed);
    const done = items.filter((item) => item.completed);
    useEffect(() => {
        getItems(); // Fetch items whenever showCompleted changes
    }, [showCompleted, items]);

    const getItems = async () => {
        try {
            const response = await axios.get(
                "http://localhost:3001/api/task-list/get-items"
            );
            const receivedItems = Array.isArray(response.data)
                ? response.data // If the server directly returns an array
                : response.data.items; // If the server returns an object with an "items" property
            setItems(receivedItems);
        } catch (error) {
            console.log("Unable to get data from the server");
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!inputName) return;

        try {
            await axios.post(
                "http://localhost:3001/api/task-list/create-task",
                {
                    name: inputName,
                    date: selectedDate,
                    deadLine: 0,
                    priority: null,
                    completed: false,
                }
            );
        } catch (error) {
            console.log("Unable to send data to the server");
        }
    };
    const handleDateChange = (date) => {
        const formattedDate = date.toLocaleDateString();
        setSelectedDate(formattedDate);
    };

    const handleTimeLeft = (itemId, newDate) => {
        const today = new Date();
        const timeDifference = newDate - today;
        const daysRemaining = Math.ceil(timeDifference / (1000 * 60 * 60 * 24));
    };

    const handleUpdateRating = async (itemId, newRating) => {
        try {
            await axios.patch(
                `http://localhost:3001/api/task-list/update-rating/${itemId}`,
                {
                    priority: newRating,
                }
            );
            // After updating priority, fetch the updated list of items
        } catch (error) {
            console.log("Unable to send data to the server");
        }
    };
    const handleUndoneItems = async (taskId) => {
        try {
            // Make a PATCH request to update the task's completed status
            await axios.patch(
                `http://localhost:3001/api/task-list/update-completed/${taskId}`,
                {
                    completed: false,
                }
            );
        } catch (error) {
            console.error("Unable to mark task as undone:", error);
        }
    };

    const handleDoneItems = async (taskId) => {
        try {
            await axios.patch(
                `http://localhost:3001/api/task-list/update-completed/${taskId}`,
                {
                    completed: true,
                }
            );
        } catch (error) {
            console.error("Unable to mark task as completed:", error);
        }
    };

    const handleShowCompleted = () => {
        setShowCompleted(!showCompleted);
    };
    const handleDelete = (id) => {
        try {
            axios.delete(
                `http://localhost:3001/api/task-list/delete-task/${id}`
            );
        } catch (error) {
            console.log("Unable to delete data from the server");
        }
    };
    const handleBackground = showCompleted ? "MainOff" : "Sub-List-Main";
    return (
        <div className="List-Main">
            <div className={handleBackground}>
                <Form
                    handleSubmit={handleSubmit}
                    setInputName={setInputName}
                    selectedDate={selectedDate}
                    setSelectedDate={selectedDate}
                    handleDateChange={handleDateChange}
                />
                {showCompleted && (
                    <Done
                        done={done}
                        handleUndone={handleUndoneItems}
                        handleDone={handleDoneItems}
                        handleDelete={handleDelete}
                        selectedDate={selectedDate}
                        handleUpdateRating={handleUpdateRating}
                        handleTimeLeft={handleTimeLeft}
                    />
                )}
                <Undone
                    toDo={toDo}
                    handleUndone={handleUndoneItems}
                    handleDone={handleDoneItems}
                    handleShowCompleted={handleShowCompleted}
                    showCompleted={showCompleted}
                    selectedDate={selectedDate}
                    handleUpdateRating={handleUpdateRating}
                    handleTimeLeft={handleTimeLeft}
                />
            </div>
        </div>
    );
};
