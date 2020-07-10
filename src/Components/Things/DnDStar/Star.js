import React from "react";
import classes from "./Star.module.css";
import { ItemTypes } from './Constants/Constants';
import { useDrag } from 'react-dnd';
import cn from 'classnames';


export const Star = (props) => {
    const [{isDragging}, drag] = useDrag({
        item: { type: ItemTypes.STAR },
        end: (item, monitor) => {
            const dropResult = monitor.getDropResult()
            if (item && dropResult) {
               props.changeNotes(dropResult.index)
            }
        },
        collect: monitor => ({
            isDragging: !!monitor.isDragging(),
        }),
    })
    return (
        <div ref={drag}
            className={cn(classes.star,{[classes.opacity]:isDragging})}>&#10034;</div>
    )
}