import React from "react";
import {Note} from "./Notes/Note/Note";
import {TransitionGroup, CSSTransition} from "react-transition-group";


export const Things = ({notes, deleteThing, updateThing, updateTime}) => {

    if (notes === null) {
        return <></>
    }

    let note = notes
        .filter(note => note)
        .map((note, index) => {
            return <CSSTransition  key={index} classNames={'note'} timeout={400}>
                     <Note deleteThing={deleteThing}
                      note={note}
                      updateThing={updateThing}
                      updateTime={updateTime}/>
                    </CSSTransition>
        })

    return (
        <div>
            <TransitionGroup  className="list-group">
                {note}
            </TransitionGroup>
        </div>

    )
}