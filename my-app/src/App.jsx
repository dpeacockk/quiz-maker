import { useEffect, useState } from 'react';
import './App.css';
import FRQ from './FRQ';
import MCQ from './MCQ';
import MCMA from './MCMA';

function App() {

  const [quiz_questions, setQuestions] = useState([]);

  function add_Q() {
    let info = {};
    info['type'] = "MCQ";

    let oldArr = quiz_questions.slice();
    oldArr.push(info);
    setQuestions(oldArr);
  }

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
          })}
        </div>

        <div className="quiz-add-questions-wrapper">
          <button onClick={() => add_Q()}> add question</button>
        </div>
      </div>
    );
  }// quiz_content()

  function QuizTitle() {
    return (
      <div className="quiz-title-wrapper">
        <form>
          <input className="quiz-header-input" placeholder="Enter quiz name..."></input>
          <input className="quiz-header-input" placeholder="Enter class name..."></input>
          <input className="quiz-header-input" placeholder="Enter teacher name..."></input>
        </form>
        <hr className="quiz-divider" />
      </div>
    );
  }

  return (
    <div>
      <div className="title">MDST Baddies Quizmaker</div>

      <QuizTitle />

      <QuizContent />

    </div>
  );
}

export default App;
