import { Item } from "./Item.jsx";
import { Fade } from "react-reveal";

export const Done = ({ done, handleDone, handleUndone, handleDelete }) => {
    // Check if 'done' is defined and is an array
    if (!done) {
        return null; // or a loading indicator
    }

    return (
        <>
            <Fade left>
                <div className="Done-Container">
                    {done.length >= 1 ? (
                        <h1>Completed Tasks</h1>
                    ) : (
                        <h1>List is empty</h1>
                    )}
                    {done.map((item) => (
                        <Item
                            item={item}
                            key={item.id}
                            handleDoneItems={handleDone}
                            handleUndoneItems={handleUndone}
                            handleDelete={handleDelete}
                        />
                    ))}
                </div>
            </Fade>
        </>
    );
};
