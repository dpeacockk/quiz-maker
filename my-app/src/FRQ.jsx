import { useEffect, useState } from 'react';
import './index.css';

export default function FRQ() {

    const [length, setLength] = useState("short");

    return (
        <div className="frq-wrapper">
            <div className='frq-defining-title'> 
                <p className='frq-header'>Free Response Question</p>
            </div>
            
            <input type="radio" name="FRQ-length" value="short" />
            <label for="FRQ-length">Short</label><br></br>
            <input type="radio" name="FRQ-length" value="medium"/>
            <label for="FRQ-length">Medium</label><br></br>
            <input type="radio" name="FRQ-length" value="long"/>
            <label for="FRQ-length">Long</label><br></br>

            Question: <input type="text" name="FRQ-input"></input>
            <br/><br/>

        </div>
    );
}