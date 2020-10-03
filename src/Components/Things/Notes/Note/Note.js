import React, { useState} from "react";
import classes from "./Note.module.css";
import cn from 'classnames'

export const Note = ({note, deleteThing, updateThing, updateTime, changeDone}) => {
    const [editModeThing, setEditModeThing] = useState(false);
    const [editModeTime, setEditModeTime] = useState(false);
    const [thing, setThing] = useState(note.thing);
    const [time, setTime] = useState(note.time);

    const changeThing = (event) => {
        setEditModeThing(!editModeThing);
        if(event.target.tagName === 'INPUT') {
            updateThing(thing, note.id)
        }
    }

    const changeTime = (event) => {
        setEditModeTime(!editModeTime);
        if(event.target.tagName === 'INPUT') {
            updateTime(time, note.id)
        }
    }

    const onChangeThing = (e) => {
        setThing(e.currentTarget.value)
    }

    const onChangeTime = (e) => {
        setTime(e.currentTarget.value)
    }

    const isDone = (e) => {
        changeDone(e.currentTarget.id)
    }

    return (
        <li className="list-group-item">
            <div className={classes.wrapper}>
                <div className={classes.done}>
                    <label htmlFor={note.id}></label>
                    <input type="checkbox" id={note.id} name="done" value="done" checked={note.done}
                           onChange={isDone}/>
                </div>
                {!editModeThing &&
                <div onDoubleClick={changeThing} className={cn(classes.thing,{ [classes.completed]: note.completed})}>
                    {note.thing}
                </div>
                }
                {editModeThing &&
                <div className={classes.thing}>
                    <input onChange={onChangeThing} autoFocus={true} onBlur={changeThing} value={thing}/>
                </div>
                }
                {!editModeTime &&
                <div onDoubleClick={changeTime} className={cn(classes.time,{ [classes.completed]: note.completed})}>
                    {note.time}
                </div>
                }
                {editModeTime &&
                <div className={classes.time}>
                    <input onChange={onChangeTime} autoFocus={true} onBlur={changeTime} value={time}/>
                </div>
                }
                <div className={classes.delete}>
                    <button onClick={() => {
                        deleteThing(note.id)
                    }} type="button" className="btn btn-outline-danger btn-sm">
                        &times;
                    </button>
                </div>

            </div>
        </li>
    )
}