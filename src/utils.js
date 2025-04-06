export const setNewOffset = (card, mouseMoveDirection = { x:0, y:0}) => {
    const offsetLeft = card.offsetLeft - mouseMoveDirection.x;
    const offsetTop = card.offsetTop - mouseMoveDirection.y;

    return {
        x: offsetLeft < 0 ? 0 : offsetLeft,
        y: offsetTop < 0 ? 0 : offsetTop,
    };
};

export function autoGrow (textAreaRef) {
    const {current} = textAreaRef;
    current.style.height = "auto"; // Reset the height
    current.style.height = textAreaRef.current.scrollHeight + "px"; // set the new height
};

export const setZIndex = (selectedCard) => {
    selectedCard.style.zIndex = 999;

    Array.from(document.getElementsByClassName("card")).forEach((card) => {
        if (card !== selectedCard) {
            card.style.zIndex = selectedCard.style.zIndex - 1;
        }
    });
};