import React from "react";
import classes from "./Notes.module.css";
import {Form} from "../Form/Form";
import {Things} from "../Things";
import {Star} from "../DnDStar/Star";

export  const Notes = ({notes, deleteThing, onCreate, updateThing, updateTime, changeNotes}) => {

    return (
        <div className={classes.wrapper}>
            <div className="jumbotron jumbotron-fluid">
                <Star changeNotes={changeNotes}/>
                <div className="container">
                    <Things notes={notes} deleteThing={deleteThing}
                            updateThing={updateThing} updateTime={updateTime}/>
                    <hr/>
                    <Form onCreate={onCreate}/>
                </div>
            </div>
        </div>

    )
}