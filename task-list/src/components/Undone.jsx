import { Item } from "./Item.jsx";
export const Undone = ({
    toDo,
    handleDone,
    handleUndone,
    handleShowCompleted,
    showCompleted,
}) => {
    const showBothLists = showCompleted
        ? "Both-Containers"
        : "Undone-Container";
    if (!toDo) {
        return null; // or a loading indicator
    }

    return (
        <div className={showBothLists}>
            <h1 style={{ borderBottom: "solid 1px black" }}>Tasks</h1>
            {toDo.map((item) => (
                <Item
                    item={item}
                    key={item.id}
                    handleDoneItems={handleDone}
                    handleUndoneItems={handleUndone}
                />
            ))}
            <i
                className="fa-solid fa-clipboard-check"
                onClick={handleShowCompleted}
            >
                show completed
            </i>
        </div>
    );
};
