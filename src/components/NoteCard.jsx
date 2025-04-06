import {useRef, useEffect, useState} from 'react';
import Trash from '../icons/Trash';
import { setNewOffset, autoGrow, setZIndex } from '../utils';

const NoteCard = ({note}) => {
    const body = JSON.parse(note.body);
    const [position, setPosition] = useState(JSON.parse(note.position));
    const colors = JSON.parse(note.colors);

    let mouseStartPosition = { x:0, y:0};
    const cardRef = useRef(null);
    const textAreaRef = useRef(null);

    useEffect (() => {
        autoGrow(textAreaRef);
    }, []);

    textAreaRef.current

    const mouseDown = (e) => 
    {
        mouseStartPosition.x = e.clientX;
        mouseStartPosition.y = e.clientY;
        
        setZIndex(cardRef.current);

        document.addEventListener("mousemove", mouseMove);
        document.addEventListener("mouseup", mouseUp);
    };

    const mouseMove = (e) => {
        // 1 caculate move direction
        let mouseMoveDirection = {
            x: mouseStartPosition.x - e.clientX,
            y: mouseStartPosition.y - e.clientY,
        };

        // 2 update start position for next move
        mouseStartPosition.x = e.clientX;
        mouseStartPosition.y = e.clientY;

        // 3 update card top and left position
        const newPosition = setNewOffset(cardRef.current, mouseMoveDirection);
        setPosition(newPosition);
    };

    const mouseUp =() => {
        document.removeEventListener("mousemove", mouseMove);
        document.removeEventListener("mouseup", mouseUp);
    };

    return (
        <div 
            ref = {cardRef}
            className='card' 
            style={{
                backgroundColor: colors.colorBody,
                left: `${position.x}px`,
                top: `${position.y}px`
                }}
        >
            
            <div
                className='card-header'
                style = {{backgroundColor: colors.colorHeader}}
                onMouseDown={mouseDown}
            >
                <Trash />
            </div>
            
            <div className='card-body'>
                <textarea
                    ref = {textAreaRef}
                    style={{color: colors.colorText}}
                    defaultValue = {body}
                    onInput={() => {
                        autoGrow(textAreaRef);
                    }}
                    onFocus ={()=> {
                        setZIndex(cardRef.current);
                    }}
                ></textarea>
            </div>
        </div>
  )
}

export default NoteCard