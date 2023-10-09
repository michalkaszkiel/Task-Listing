import { Item } from "./Item.jsx";
import { Fade } from "react-reveal";

export const Done = ({
    done,
    handleDone,
    handleUndone,
    handleDelete,
    handleUpdateRating,
    perPage,
    handleTimeChanged,
}) => {
    // Check if 'done' is defined and is an array
    if (!done) {
        return null; // or a loading indicator
    }
    const shouldApplyOverflowClass = done && done.length > perPage;
    const doneClass = "Done-Container";
    return (
        <>
            <Fade left>
                <div
                    className={`${doneClass} ${
                        shouldApplyOverflowClass ? "overflow-auto" : ""
                    }`}
                >
                    {done.length >= 1 ? (
                        <h1>Completed Tasks</h1>
                    ) : (
                        <h1>List is empty</h1>
                    )}
                    {done.map((item) => (
                        <Item
                            item={item}
                            key={item._id}
                            handleDoneItems={handleDone}
                            handleUndoneItems={handleUndone}
                            handleDelete={handleDelete}
                            handleUpdateRating={handleUpdateRating}
                            handleTimeChanged={handleTimeChanged}
                        />
                    ))}
                </div>
            </Fade>
        </>
    );
};
