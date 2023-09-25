import { useState } from "react";
import { Form } from "./Form";
import { Done } from "./Done";
import { Undone } from "./Undone";

export const List = () => {
    const [items, setItems] = useState([]);
    const [inputName, setInputName] = useState("");
    const [showCompleted, setShowCompleted] = useState(false);

    const handleAddTask = () => {
        const newTask = {
            id: items.length,
            name: inputName,
            completed: false,
        };
        setItems([...items, newTask]);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!inputName) return;
        handleAddTask(inputName);
        setInputName(""); // Clear the input
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
        const updated = items.filter((item) => item.id !== id);
        setItems(updated);
    };
    const handleBackground = showCompleted ? "MainOff" : "Sub-List-Main";
    return (
        <div className="List-Main">
            <div className={handleBackground}>
                <Form handleSubmit={handleSubmit} setInputName={setInputName} />
                {showCompleted && (
                    <Done
                        done={done}
                        handleUndone={handleUndoneItems}
                        handleDone={handleDoneItems}
                        handleDelete={handleDelete}
                    />
                )}
                <Undone
                    toDo={toDo}
                    handleUndone={handleUndoneItems}
                    handleDone={handleDoneItems}
                    handleShowCompleted={handleShowCompleted}
                    showCompleted={showCompleted}
                />
            </div>
        </div>
    );
};

// Rest of your code for Undone and Item components remains the same.
