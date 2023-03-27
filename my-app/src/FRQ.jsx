import { useEffect, useState } from 'react';
import './index.css';

export default function FRQ({ id, content }) {

    const [length, setLength] = useState("short");
    function setDef(option) {
        if (option === length) {
            return true;
        }
        return false;
    }

    return (
        <div className="frq-wrapper">
            <div className='frq-defining-title'>
                <p className='frq-header'>Free Response Question</p>
                Points: <input id={`${id}points`} type="text" name="points" size="4" defaultValue={content['points']}></input> <br />
            </div>
            <input type="radio" name="FRQ-length" value="short" onClick={() => setLength("short")} defaultChecked={setDef("short")} />
            <label htmlFor="FRQ-length">Short</label><br></br>
            <input type="radio" name="FRQ-length" value="medium" onClick={() => setLength("medium")} defaultChecked={setDef("med")} />
            <label htmlFor="FRQ-length">Medium</label><br></br>
            <input type="radio" name="FRQ-length" value="long" onClick={() => setLength("long")} defaultChecked={setDef("long")} />
            <label htmlFor="FRQ-length">Long</label><br></br>

            Question: <input id={`${id}question`} type="text" name="FRQ-input" defaultValue={content['q']}></input>
            <br /><br />

        </div>
    );
}
