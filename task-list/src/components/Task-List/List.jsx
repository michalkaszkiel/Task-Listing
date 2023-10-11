import { useState, useEffect } from "react";
import { Form } from "./Form";
import { Done } from "./Done";
import { Undone } from "./Undone";
import React from "react";
import { useAuth } from "../../context/AuthContext.jsx";
import { useCookie } from "../../context/CookieContext.jsx";
import Cookies from "js-cookie";
import createApiInstance from "../../util/axiosInstance.js";
export const List = () => {
    const [showCompleted, setShowCompleted] = useState(false);
    const [items, setItems] = useState([]);
    const [inputName, setInputName] = useState("");
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [perPage, setPerPage] = useState(5);
    const { isLoggedIn } = useAuth();
    const { cookie } = useCookie();
    const toDo = items.filter((item) => !item.completed);
    const done = items.filter((item) => item.completed);
    const token = cookie
        ? Cookies.get("jwtToken")
        : localStorage.getItem("jwtToken");
    const api = createApiInstance(token);

    useEffect(() => {
        getItems();
    }, [isLoggedIn]);

    useEffect(() => {
        // Check the screen width and set perPage accordingly
        if (window.innerWidth <= 768) {
            // Adjust perPage for smartphone resolutions
            setPerPage(3); // Change this value to your desired limit for smartphones
        } else {
            // Default perPage value for larger screens
            setPerPage(5); // Change this value to your default limit for larger screens
        }
    }, []);

    const getItems = async () => {
        try {
            if (!token) {
                // Handle the case where the user is not authenticated
                console.error("User is not authenticated");
                return;
            }
            const response = await api.get("/get-items"); // Use the api instance
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
            await api.post("/create-task", {
                // Corrected data structure to match the server's expectation.
                name: inputName,
                date: selectedDate,
                deadLine: calculateDaysRemaining(new Date(selectedDate)),
                priority: null,
                completed: false,
                time: null,
            });
            getItems();
        } catch (error) {
            console.log("Unable to send data to the server");
        }
    };

    const handleUndoneItems = async (id) => {
        try {
            const response = await api.patch(`/update-completed/${id}`, {
                completed: false,
            });
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
            const response = await api.patch(`/update-completed/${id}`, {
                completed: true,
            });
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
            const response = await api.delete(`/delete/${id}`);
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
            await api.patch(`/update-rating/${id}`, {
                priority: newRating,
            });
            getItems();
            // After updating priority, fetch the updated list of items
        } catch (error) {
            console.log("Unable to send data to the server");
        }
    };
    const handleTimeChanged = async (id, newTime) => {
        try {
            await api.patch(`update-time/${id}`, { time: newTime });
            getItems();
            // After updating priority, fetch the updated list of items
        } catch (error) {
            console.log("Unable to send data to the server", error);
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
                        handleTimeChanged={handleTimeChanged}
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
                    handleTimeChanged={handleTimeChanged}
                />
            </div>
        </div>
    );
};
