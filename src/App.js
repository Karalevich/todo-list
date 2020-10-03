import React, {useState, useEffect} from 'react';
import {Weekdays} from "./Components/Weekdays/Weeksday";
import {Things} from "./Components/Things/Things";
import {nanoid} from 'nanoid';
import {DndProvider} from 'react-dnd'
import {HTML5Backend} from 'react-dnd-html5-backend'

const App = () => {
    const [date, setDate] = useState(new Date().getDay());

    const [weekdays, setWeekday] = useState([
        {name: 'Sunday', notes: []},
        {name: 'Monday', notes: []},
        {name: 'Tuesday', notes: []},
        {name: 'Wednesday', notes: []},
        {name: 'Thursday', notes: []},
        {name: 'Friday', notes: []},
        {name: 'Saturday', notes: []},
    ])
    const [currentlyWeekday, setDay] = useState(date);
    useEffect(() => {
        const a = new Date().getDay();
        setDate(a);
        if (localStorage.getItem('weekdays') == null) {
            setWeekday(weekdays)
        } else {
            setWeekday(JSON.parse(localStorage.getItem('weekdays')))
        }
    }, [])

    useEffect(() => {
        localStorage.setItem('weekdays', JSON.stringify(weekdays));
    })

    const changeNotes = (indexDay) => {
        setWeekday(
            weekdays.map((day, index) => {
                if (index === indexDay) {
                    day.notes = [...weekdays[currentlyWeekday].notes]
                }
                return day;
            })
        )
    }

    const checkNotes = () => {
        let date = new Date().toLocaleTimeString('en-US', {hour12: false}).split(':').slice(0, 2).join(':')
        weekdays.forEach((weekday, indexDay) => {
            for (let indexNote = 0; indexNote < weekday.notes.length; indexNote++) {
                if (weekday.notes[indexNote] == null) {
                    continue
                }
                if (weekday.notes[indexNote].time < date) {
                    setWeekday(
                        weekdays
                            .map((day, i) => {
                                if (i === indexDay) {
                                    day.notes[indexNote].completed = true;
                                }
                                return day;
                            })
                    )
                }
            }
        })
    }

    setInterval(checkNotes, 60000)

    const changeDone = (indexThing) => {
        console.log(indexThing)
        setWeekday(
            weekdays.map((day, index) => {
                if (index === currentlyWeekday) {
                    for (let i = 0; i <= day.notes.length; i++) {
                        if (day.notes[i] == null) {
                            continue
                        }
                        if (day.notes[i].id === indexThing) {
                            console.log(day.notes[i])
                            day.notes[i].done = !day.notes[i].done
                            console.log(day.notes[i])
                        }
                    }
                }
                return day;
            })
        )
    }

    const updateThing = (thing, indexThing) => {
        setWeekday(
            weekdays.map((day, index) => {
                if (index === currentlyWeekday) {
                    for (let i = 0; i <= day.notes.length; i++) {
                        if (day.notes[i] == null) {
                            continue
                        }
                        if (day.notes[i].id === indexThing) {
                            day.notes[i] = {
                                ...day.notes[i],
                                thing
                            }
                        }
                    }
                }
                return day;
            })
        )
    }

    const updateTime = (time, indexThing) => {
        setWeekday(
            weekdays.map((day, i) => {
                if (i === currentlyWeekday) {
                    for (let i = 0; i <= day.notes.length; i++) {
                        if (day.notes[i] == null) {
                            continue
                        }
                        if (day.notes[i].id === indexThing) {
                            day.notes[i] = {
                                ...day.notes[i],
                                time
                            }
                            sortNotes(day.notes)
                        }
                    }
                }
                return day;
            })
        )
    }

    const changeWeekday = (index) => {
        setDay(index);
    }

    const deleteThing = (indexThing) => {
        setWeekday(
            weekdays.map((day, index) => {
                if (index === currentlyWeekday) {
                    for (let i = 0; i <= day.notes.length; i++) {
                        if (day.notes[i] == null) {
                            continue
                        }
                        if (day.notes[i].id === indexThing) {
                            day.notes[i] = null;
                        }
                    }
                }
                return day;
            })
        )
    }

    const sortNotes = (notes) => {
        notes.sort((a, b) => {
            if (a == null || b == null) {
                return
            }
            if (a.time > b.time) {
                return 1
            }
            if (a.time < b.time) {
                return -1
            }
            return 0
        })
    }

    const onCreate = (thing, time) => {
        setWeekday(
            weekdays.map((day, i) => {
                if (i === currentlyWeekday) {
                    day.notes = [...day.notes, {
                        id: nanoid(8),
                        time,
                        thing,
                        completed: false,
                        done: false
                    }]
                    sortNotes(day.notes)
                }
                return day;
            })
        )
    }


    return (
        <DndProvider backend={HTML5Backend}>
            <div className="container">
                <Weekdays date={currentlyWeekday} weekdays={weekdays} changeWeekday={changeWeekday}/>
                <Things changeNotes={changeNotes}
                        notes={weekdays[currentlyWeekday].notes}
                        deleteThing={deleteThing}
                        onCreate={onCreate}
                        updateThing={updateThing}
                        changeDone={changeDone}
                        updateTime={updateTime}/>
            </div>
        </DndProvider>
    );

}

export default App;
