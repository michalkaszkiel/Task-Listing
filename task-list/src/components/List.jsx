import { useState } from "react";
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

    const handleDateChange = (date) => {
        const formattedDate = date.toDateString();
        setSelectedDate(formattedDate);
    };
    const handleUpdateRating = (itemId, newRating) => {
        const updatedItems = items.map((item) =>
            item.id === itemId ? { ...item, priority: newRating } : item
        );
        setItems(updatedItems);
    };
    const handleTimeLeft = (itemId, newDate) => {
        const today = new Date();
        const timeDifference = newDate - today;
        const daysRemaining = Math.ceil(timeDifference / (1000 * 60 * 60 * 24));

        const updatedItems = items.map((item) =>
            item.id === itemId ? { ...item, deadLine: daysRemaining } : item
        );
        setItems(updatedItems);
    };

    const handleAddTask = () => {
        const newTask = {
            name: inputName,
            date: selectedDate,
            deadLine: 0,
            priority: null,
            completed: false,
        };
        handleTimeLeft(newTask.id, new Date(selectedDate));
        setItems([...items, newTask]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!inputName) return;
        handleAddTask(inputName);
        setInputName("");
        // try {
        //     await axios.post(
        //         "http://localhost:3001/api/task-list/create-task",
        //         {
        //             name: inputName,
        //             date: selectedDate,
        //             deadLine: 0,
        //             priority: null,
        //             completed: false,
        //         }
        //     );
        // } catch (error) {
        //     console.log("Unable to send POST to /notices/new");
        // }
    };

    const handleUndoneItems = (id) => {
        setItems((items) =>
            items.map((el) => (el.id === id ? { ...el, completed: false } : el))
        );
    };

    const handleDoneItems = (id) => {
        setItems((items) =>
            items.map((el) => (el.id === id ? { ...el, completed: true } : el))
        );
    };

    const toDo = items.filter((item) => !item.completed);
    const done = items.filter((item) => item.completed);

    const handleShowCompleted = () => {
        setShowCompleted(!showCompleted);
    };
    const handleDelete = (id) => {
        setItems((prevItems) => prevItems.filter((item) => item.id !== id));
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
