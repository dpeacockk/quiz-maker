import { useEffect, useState } from 'react';
import './index.css';

export default function FRQ(id) {

    const [length, setLength] = useState("short");
    const [frqPrompt, setFRQPrompt] = useState("");
    const handleSetValue = (event) => {
        event.preventDefault();
        setFRQPrompt(event.target.value);
    }
    function setDef(option){
        if(option === length){
            return true;
        }
        return false;
    }
    
    return (
        <div className="frq-wrapper">
            <div className='frq-defining-title'> 
                <p className='frq-header'>Free Response Question</p>
                Points: <input type="text" name="points" size="4"></input> <br/>
            </div>
            <input type="radio" name="FRQ-length" value="short" onClick={() => setLength("short")} defaultChecked={setDef("short")}/>
            <label htmlFor="FRQ-length">Short</label><br></br>
            <input type="radio" name="FRQ-length" value="medium" onClick={() => setLength("medium")} defaultChecked={setDef("med")}/>
            <label htmlFor="FRQ-length">Medium</label><br></br>
            <input type="radio" name="FRQ-length" value="long"   onClick={() => setLength("long")} defaultChecked={setDef("long")}/>
            <label htmlFor="FRQ-length">Long</label><br></br>

            Question: <input type="text" name="FRQ-input" onChange={(e) =>(handleSetValue(e))}></input>
            <br/><br/>

        </div>
    );
}
