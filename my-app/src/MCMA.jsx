import { useEffect, useState } from 'react';
import './index.css';

export default function MCMA({ id, content }) {

    return (
        <div className="quiz-mcq-wrapper" id={`${id}`} type="MCMA">
            <div className='mcma-defining-title'>
                <p className='mcma-header'>Multiple Choice Multiple Answer Question</p>
            </div>

            Question: <input id={`${id}question`} type="text" name="MCMA_question" defaultValue={content['q']}></input> &nbsp;
            Points: <input id={`${id}points`} type="text" name="points" size="4" defaultValue={content['points']}></input>  <br />
            Select all answers that apply. <br />
            A. <input id={`${id}A`} type="text" name="MCMA_answer_A" defaultValue={content['A']}></input> <br />
            B. <input id={`${id}B`} type="text" name="MCMA_answer_B" defaultValue={content['B']}></input> <br />
            C. <input id={`${id}C`} type="text" name="MCMA_answer_C" defaultValue={content['C']}></input><br />
            D. <input id={`${id}D`} type="text" name="MCMA_answer_D" defaultValue={content['D']}></input><br />
            <br />
        </div>
    );
}
