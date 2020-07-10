import React, {useState} from "react";

export const Form = ({onCreate}) => {

    let [thing, setThing] = useState('');
    let [time, setTime] = useState('')

    const handleSubmit = (event) => {
        event.preventDefault();

        if(thing.trim() && time.trim()) {
            onCreate(thing, time);
            setThing('');
            setTime('');
        }
    }
    return (
        <form onSubmit={handleSubmit}>
            <div className="form-row">
                <div className="col">
                    <label className="sr-only" htmlFor="inlineFormInput">Thing</label>
                    <input value={thing} onChange={event => setThing(event.target.value)} type="text" className="form-control mb-2" id="inlineFormInput"
                           placeholder="Text your thing"/>
                </div>
                <div className="col-auto">
                    <label className="sr-only" htmlFor="inlineFormInputGroup">Username</label>
                    <div className="input-group mb-2">
                        <input value={time} onChange={event => setTime(event.target.value)} type="text" className="form-control" id="inlineFormInputGroup"
                               placeholder="Format time 13:30"/>
                    </div>
                </div>

                <div className="col-auto">
                    <button type="submit"  className="btn btn-primary mb-2">Submit</button>
                </div>
            </div>
        </form>
    )
}