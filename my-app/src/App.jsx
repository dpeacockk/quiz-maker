import { useEffect, useState } from 'react';
import './index.css';
import FRQ from './FRQ';
import MCQ from './MCQ';
import MCMA from './MCMA';

function App() {

  const [quiz_questions, setQuestions] = useState([]);
  const [quiz_name, setQuizName] = useState("");
  const [class_name, setClassName] = useState("");
  const [teacher_name, setTeacherName] = useState("");

  function add_Q(type) {
    let info = {};
    info['type'] = type;

    let oldArr = quiz_questions.slice();
    oldArr.push(info);
    setQuestions(oldArr);
  } // add_Q()

  function QuizContent() {
    return (
      /*
      for each question:
        print out the format for that type of question,
        and the inputted content from the user

      then
        a button to add additional questions
      */
      <div className="quiz-content-wrapper">
        <div className="quiz-questions-wrapper">
          {quiz_questions.map((elem, key) => {
            if (elem['type'] === "MCQ") {
              return <MCQ keyy={key} />;
            }
            else if (elem['type'] === "FRQ"){
              return <FRQ keyy={key} />;
            }
            else if (elem['type'] === "MCMA"){
              return <MCMA keyy={key} />;
            }
          })}
        </div>

        <div className="quiz-add-questions-wrapper">
          <button onClick={() => add_Q("MCQ")} className="add-question-button"> Add MCQ</button>
          <div class="button-space"/>
          <button onClick={() => add_Q("FRQ")} className="add-question-button"> Add FRQ</button>
          <div class="button-space"/>
          <button onClick={() => add_Q("MCMA")} className="add-question-button"> Add MCMA</button>
        </div>
      </div>
    );
  }// quiz_content()

  function QuizTitle() {
    return (
      <div className="quiz-title-wrapper">
        <form action="">
          <input className="quiz-header-input" placeholder="Enter quiz name..."></input>
          <input className="quiz-header-input" placeholder="Enter class name..."></input>
          <input className="quiz-header-input" placeholder="Enter teacher name..."></input>
        </form>
        <hr className="quiz-divider" />
      </div>
    );
  }

  function PDFThing() {
      return (
        <button className='to-pdf-button'> Convert Quiz to PDF!</button>
      )
  }// PDFThing()

  return (
    <div>
      <div className="title">MDST Baddies Quizmaker</div>

      <QuizTitle />

      <QuizContent />

      <PDFThing />

    </div>
  );
}

export default App;
