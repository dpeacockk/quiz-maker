import { useEffect, useState } from 'react';
import PropTypes from "prop-types";
import './index.css';

export default function MCQ() {


    return (
        <div className="quiz-mcq-wrapper">
            <div className='mcq-defining-title'> 
                <p className='mcq-header'>Multiple Choice Question </p>
            </div>
        
            Question: <input type="text" name="MCQ_question" ></input> &nbsp;
            Points: <input type="text" name="points" size="4"></input> <br/>
            A. <input type="text" name="MCQ_answer_A" ></input> <br/>
            B. <input type="text" name="MCQ_answer_B" ></input> <br/>
            C. <input type="text" name="MCQ_answer_C" ></input><br/>
            D. <input type="text" name="MCQ_answer_D" ></input><br/>

            <br />
        </div>
    );
}
