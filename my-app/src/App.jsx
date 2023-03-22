import { useEffect, useState } from 'react';
import './index.css';
import FRQ from './FRQ';
import MCQ from './MCQ';
import MCMA from './MCMA';

function App() {

  const [quiz_questions, setQuestions] = useState([]);
  const [curr_id, setCurrID] = useState(0);
  const [quiz_name, setQuizName] = useState("");
  const [class_name, setClassName] = useState("");
  const [teacher_name, setTeacherName] = useState("");



  function add_Q(type) {
    let info = {};
    info['type'] = type;
    info['id'] = curr_id;
    info['obj'] = getObject(type, curr_id);
    setCurrID(curr_id+1);

    let oldArr = quiz_questions.slice();
    oldArr.push(info);
    setQuestions(oldArr);
  } // add_Q()


  function getObject(type, id){
    if (type === "MCQ") {
      return <MCQ key={id} uniqueKey={id}/>;
    }
    else if (type === "FRQ"){
      return <FRQ key={id} uniqueKey={id}/>;
    }
    else if (type === "MCMA"){
      return <MCMA key={id} uniqueKey={id}/>;
    }
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
            // if (elem['type'] === "MCQ") {
            //   return <MCQ key={elem['id']} />;
            // }
            // else if (elem['type'] === "FRQ"){
            //   return <FRQ key={elem['id']} />;
            // }
            // else if (elem['type'] === "MCMA"){
            //   return <MCMA key={elem['id']} />;
            // }
            return elem['obj'];
          })}
        </div>

        <div className="quiz-add-questions-wrapper">
          <button onClick={() => add_Q("MCQ")} className="add-question-button"> Add MCQ</button>
          <div className="button-space"/>
          <button onClick={() => add_Q("FRQ")} className="add-question-button"> Add FRQ</button>
          <div className="button-space"/>
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
          <input className="quiz-header-input" placeholder="Enter teacher name..." value={teacher_name} onChange={(e)=>setTeacherName(e.target.value)}></input>
        </form>
        <ImportantNote />
        <hr className="quiz-divider" />
      </div>
    );
  }

  function PDFThing() {
      return (
        <button className='to-pdf-button'> Convert Quiz to PDF!</button>
      );
  }// PDFThing()

  function ImportantNote(){
    return(
      <textarea className="important-note"
             placeholder="Enter note for quiz..."
      />
    );
  }//importantNote()

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
