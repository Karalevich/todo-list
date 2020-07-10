import React from "react";
import classes from "./Day.module.css";
import { useDrop } from 'react-dnd';
import { ItemTypes } from '../../Things/DnDStar/Constants/Constants';
import cn from 'classnames';


export const Day = (props) => {
    const [{ canDrop, isOver }, drop] = useDrop({
        accept: ItemTypes.STAR,
        drop: () => ({ index: props.index }),
        collect: (monitor) => ({
            isOver: monitor.isOver(),
            canDrop: monitor.canDrop(),
        }),
    })
    const isActive = canDrop && isOver;

    return (
        <button  ref={drop}  type="button"
                 className={cn("btn btn-success size", {[classes.darkkhaki]:canDrop}, {[classes.darkgreen]:isActive})}
                 onClick={() => {
            props.changeWeekday(props.index);
        }}>
            {isActive
                ? <div className={props.index === props.date ? classes.active : classes.noActive}>Here</div>
                : <div className={props.index === props.date ? classes.active : classes.noActive}>{props.day.name}</div>}
        </button>
    )
}


