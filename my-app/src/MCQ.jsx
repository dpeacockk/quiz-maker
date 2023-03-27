import { useEffect, useState } from 'react';
import PropTypes from "prop-types";
import './index.css';

export default function MCQ({ id, content }) {
    // const [message, setMessage] = useState( '' );

    return (
        <div className="quiz-mcq-wrapper">
            <div className='mcq-defining-title'>
                <p className='mcq-header'>Multiple Choice Question </p>
            </div>

            Question: <input id={`${id}question`} type="text" name="MCQ_question" defaultValue={content['q']}></input> &nbsp;
            Points: <input id={`${id}points`} type="text" name="points" size="4" defaultValue={content.points}></input> <br />
            A. <input id={`${id}A`} type="text" name="MCQ_answer_A" defaultValue={content.A}></input> <br />
            B. <input id={`${id}B`} type="text" name="MCQ_answer_B" defaultValue={content.B}></input> <br />
            C. <input id={`${id}C`} type="text" name="MCQ_answer_C" defaultValue={content.C}></input> <br />
            D. <input id={`${id}D`} type="text" name="MCQ_answer_D" defaultValue={content.D}></input> <br />

            <br />
        </div>
    );
}
