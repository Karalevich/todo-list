import React from "react";
import {Day} from "./Day/Day";

export  const Weekdays = (props) => {
    let day = props.weekdays
        .map((day, index) => (<Day day={day} changeWeekday={props.changeWeekday}
                                   date={props.date} key={index} index={index}/>))

return (
    <nav className='navbar navbar-dark navbar-expand-lg bg-primary'>
        <div className='navbar-brand' >
            SPA
        </div>
        <ul className="navbar-nav">
            <li className="nav-item active">
                <div className="nav-link">{day} <span className="sr-only">(current)</span></div>
            </li>
        </ul>
    </nav>
    )
}


