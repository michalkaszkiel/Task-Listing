import React from "react";

export const Item = ({
    item,
    handleDoneItems,
    handleUndoneItems,
    handleDelete,
}) => {
    return (
        <div className="Item-Container">
            <p>{item.name}</p>
            {!item.completed && (
                <i
                    className="fa-solid fa-circle-check"
                    onClick={() => handleDoneItems(item.id)}
                ></i>
            )}
            {item.completed && (
                <div className="Done-Icons">
                    <i
                        className="fa-solid fa-clock-rotate-left"
                        onClick={() => handleUndoneItems(item.id)}
                    ></i>
                    <i
                        className="fa-regular fa-calendar-xmark"
                        onClick={() => handleDelete(item.id)}
                    ></i>
                </div>
            )}
        </div>
    );
};
