import React from "react";
import classes from "./Things.module.css";
import {Form} from "./Form/Form";
import {Star} from "./DnDStar/Star";
import {Notes} from "./Notes/Notes";

export  const Things = ({notes, deleteThing, onCreate, updateThing, updateTime, changeNotes}) => {

    return (
        <div className={classes.wrapper}>
            <div className="jumbotron jumbotron-fluid">
                <Star changeNotes={changeNotes}/>
                <div className="container">
                    <Notes notes={notes} deleteThing={deleteThing}
                            updateThing={updateThing} updateTime={updateTime}/>
                    <hr/>
                    <Form onCreate={onCreate}/>
                </div>
            </div>
        </div>

    )
}