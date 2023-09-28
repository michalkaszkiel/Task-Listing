import React from "react";
import Rating from "react-rating";

export const Item = ({
    item,
    handleDoneItems,
    handleUndoneItems,
    handleDelete,
}) => {
    return (
        <div className="Item-Container">
            <div className="Rating-Date">
                <Rating
                    emptySymbol={
                        <i
                            className="fa-regular fa-star"
                            style={{ fontSize: "small" }}
                        ></i>
                    }
                    fullSymbol={
                        <i
                            className="fa-solid fa-star"
                            style={{ fontSize: "small" }}
                        ></i>
                    }
                />
                <p className="Item-Date">{item.date}</p>
            </div>
            <p className="Item-Name">{item.name}</p>
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
