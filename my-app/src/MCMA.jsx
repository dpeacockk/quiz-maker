import { useEffect, useState } from 'react';
import './index.css';

export default function MCMA() {

    return (
        <div className="quiz-mcq-wrapper">
            <div className='mcma-defining-title'> 
                <p className='mcma-header'>Multiple Choice Multiple Answer Question</p>
            </div>
            
            Question: <input type="text" name="MCMA_question" ></input> &nbsp;
            Points: <input type="text" name="points" size="4"></input>  <br/> 
            Select all answers that apply. <br/>
                A. <input type="text" name="MCMA_answer_A" ></input> <br/>
                B. <input type="text" name="MCMA_answer_B" ></input> <br/>
                C. <input type="text" name="MCMA_answer_C" ></input><br/>
                D. <input type="text" name="MCMA_answer_D" ></input><br/>
            <br/>
        </div>
    );
}
