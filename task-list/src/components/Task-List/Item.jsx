import React from "react";
import Rating from "react-rating";

export const Item = React.memo(
    ({
        item,
        handleDoneItems,
        handleUndoneItems,
        handleDelete,
        handleUpdateRating,
    }) => {
        const handleUpdateChange = (newRating) => {
            handleUpdateRating(item._id, newRating);
            console.log(item._id, newRating);
        };

        return (
            <div className="Item-Container">
                <div className="Rating-Date">
                    <Rating
                        initialRating={item.priority}
                        onClick={handleUpdateChange}
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
                    <p className="Item-Date">
                        {new Date(item.date).toLocaleDateString()}
                    </p>
                    <p className="Item-DeadLine">{`${item.deadLine} days left`}</p>{" "}
                </div>
                <p className="Item-Name">{item.name}</p>
                {!item.completed && (
                    <i
                        className="fa-solid fa-circle-check"
                        onClick={() => handleDoneItems(item._id)}
                    ></i>
                )}
                {item.completed && (
                    <div className="Done-Icons">
                        <i
                            className="fa-solid fa-clock-rotate-left"
                            onClick={() => handleUndoneItems(item._id)}
                        ></i>
                        <i
                            className="fa-regular fa-calendar-xmark"
                            onClick={() => {
                                handleDelete(item._id);
                            }}
                        ></i>
                    </div>
                )}
            </div>
        );
    }
);
