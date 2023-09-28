import React, { useState, useEffect } from "react";
import Rating from "react-rating";

export const Item = React.memo(
    ({
        item,
        handleDoneItems,
        handleUndoneItems,
        handleDelete,
        handleUpdateRating,
        handleTimeLeft,
    }) => {
        const [rating, setRating] = useState(item.priority);

        useEffect(() => {
            const unformattedDate = new Date(item.date);
            handleTimeLeft(item.id, unformattedDate);
        }, item.date);

        const handleRatingChange = (newRating) => {
            setRating(newRating);
            handleUpdateRating(item.id, newRating);
        };

        return (
            <div className="Item-Container">
                <div className="Rating-Date">
                    <Rating
                        initialRating={rating}
                        onChange={handleRatingChange}
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
                    <p className="Item-DeadLine">{`${item.deadLine} days left`}</p>{" "}
                    {/* Add days left */}
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
    }
);
