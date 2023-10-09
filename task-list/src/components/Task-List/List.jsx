import { useState, useEffect } from "react";
import axios from "axios";
import { Form } from "./Form";
import { Done } from "./Done";
import { Undone } from "./Undone";
import React from "react";
import { useAuth } from "../../context/AuthContext.jsx";

export const List = () => {
    const [showCompleted, setShowCompleted] = useState(false);
    const [items, setItems] = useState([]);
    const [inputName, setInputName] = useState("");
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [perPage, setPerPage] = useState(5);
    const { isLoggedIn } = useAuth();
    const [error, setError] = useState(null);
    const toDo = items.filter((item) => !item.completed);
    const done = items.filter((item) => item.completed);
    useEffect(() => {
        getItems();
    }, [isLoggedIn]);

    const token = localStorage.getItem("jwtToken");
    const getItems = async () => {
        try {
            if (!token) {
                // Handle the case where the user is not authenticated
                console.error("User is not authenticated");
                return;
            }

            const response = await axios.get(
                "http://localhost:3001/api/task-list/get-items",
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            const receivedItems = response.data.tasks;
            setItems(receivedItems);
            console.log("Received items:", receivedItems);
        } catch (error) {
            console.error("Unable to get data from the server:", error);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!inputName) return;

        try {
            await axios({
                method: "post",
                url: "http://localhost:3001/api/task-list/create-task",
                headers: {
                    Authorization: `Bearer ${token}`,
                },
                // Corrected data structure to match the server's expectation.
                data: {
                    name: inputName,
                    date: selectedDate,
                    deadLine: calculateDaysRemaining(new Date(selectedDate)),
                    priority: null,
                    completed: false,
                },
            });
            getItems();
        } catch (error) {
            console.log("Unable to send data to the server");
        }
    };

    const handleUndoneItems = async (id) => {
        try {
            const response = await axios.patch(
                `http://localhost:3001/api/task-list/update-completed/${id}`,
                { completed: false },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            if (response.status === 200) {
                // Update the client-side state to mark the task as completed
                const updatedItems = items.map((item) =>
                    item._id === id ? { ...item, completed: false } : item
                );
                setItems(updatedItems);
            } else {
                console.error(
                    "Unable to mark task as uncompleted:",
                    response.data.message
                );
            }
        } catch (error) {
            console.error("Unable to mark task as uncompleted:", error);
        }
    };
    const handleDoneItems = async (id) => {
        try {
            const response = await axios.patch(
                `http://localhost:3001/api/task-list/update-completed/${id}`,
                { completed: true },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            if (response.status === 200) {
                // Update the client-side state to mark the task as completed
                const updatedItems = items.map((item) =>
                    item._id === id ? { ...item, completed: true } : item
                );
                setItems(updatedItems);
            } else {
                console.error(
                    "Unable to mark task as completed:",
                    response.data.message
                );
            }
        } catch (error) {
            console.error("Unable to mark task as completed:", error);
        }
    };

    const handleDelete = async (id) => {
        try {
            const response = await axios.delete(
                `http://localhost:3001/api/task-list/delete/${id}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            if (response.status === 200) {
                // Update the client-side state to remove the task
                const updatedItems = items.filter((item) => item._id !== id);
                setItems(updatedItems);
            } else {
                console.error("Unable to delete task:", response.data.message);
            }
        } catch (error) {
            console.error("Unable to delete task:", error);
        }
    };

    const handleUpdateRating = async (id, newRating) => {
        try {
            await axios.patch(
                `http://localhost:3001/api/task-list/update-rating/${id}`,
                { priority: newRating },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            getItems();
            // After updating priority, fetch the updated list of items
        } catch (error) {
            console.log("Unable to send data to the server");
        }
    };
    const calculateDaysRemaining = (newDate) => {
        const today = new Date();
        // Calculate the time difference in milliseconds
        const timeDifference = newDate - today;
        // Convert milliseconds to days
        return Math.ceil(timeDifference / (1000 * 60 * 60 * 24));
    };
    const handleDateChange = (date) => {
        setSelectedDate(date);
    };
    const handleShowCompleted = () => {
        setShowCompleted(!showCompleted);
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
                        perPage={perPage}
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
                    perPage={perPage}
                />
            </div>
        </div>
    );
};
