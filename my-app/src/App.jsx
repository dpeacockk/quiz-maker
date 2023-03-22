import { useEffect, useState } from 'react';
import './index.css';
import FRQ from './FRQ';
import MCQ from './MCQ';
import MCMA from './MCMA';

function App() {

  const [quiz_questions, setQuestions] = useState([]);
  const [curr_id, setCurrID] = useState(0);
  // Header Values
  const [quiz_name, setQuizName] = useState("");
  const [class_name, setClassName] = useState("");
  const [teacher_name, setTeacherName] = useState("");
  const [quiz_notes, setQuizNotes] = useState("");

  
  function SaveInputVals(){
    // Saving Headers
    setQuizName(document.getElementById("qName").value);
    setClassName(document.getElementById("cName").value);
    setTeacherName(document.getElementById("tName").value);
    setQuizNotes(document.getElementById("qNotes").value);
    
    // Saving Quiz Question Values
    quiz_questions.map((elem, key) => {
      if(elem['type'] === 'MCQ'){
        SaveMCQ(elem);
      } else if (elem['type'] === 'FRQ'){
        SaveFRQ(elem);
      } else if (elem['type'] ==='MCMA') {
        SaveMCMA(elem);
      }
    })

  }//SaveInputVals()


  function SaveMCQ(elem){
    elem.contents = {
      "q":document.getElementById(`${elem['id']}question`).value,
      "points":0,
      "A":0,
      "B":0,
      "C":0,
      "D":0,                    
    }
  }//SaveFRQ

  function SaveFRQ(elem){
    
  }//SaveFRQ

  function SaveMCMA(elem){
    
  }//SaveMCMA


  function add_Q(type) {
    SaveInputVals();
    let info = {};
    info['type'] = type;
    info['id'] = curr_id;
    info['obj'] = getObject(type, curr_id);
    setCurrID(curr_id+1);
    info['contents'] = setDefContent(type)

    let oldArr = quiz_questions.slice();
    oldArr.push(info);
    setQuestions(oldArr);
  } // add_Q()


  function getObject(type, id){
    if (type === "MCQ") {
      return <MCQ key={id} uniqueKey={id} id={id}/>;
    }
    else if (type === "FRQ"){
      return <FRQ key={id} uniqueKey={id} id={id}/>;
    }
    else if (type === "MCMA"){
      return <MCMA key={id} uniqueKey={id} id={id}/>;
    }
  }

  function setDefContent(type){
    if (type === "MCQ"){
      return {
        "q":"0",
        "points":0,
        "A":0,
        "B":0,
        "C":0,
        "D":0}
    }
    return {}
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
              return <MCQ key={elem['id']} id={elem['id']} content={elem['content']}/>;
            }
            else if (elem['type'] === "FRQ"){
              return <FRQ key={elem['id']} />;
            }
            else if (elem['type'] === "MCMA"){
              return <MCMA key={elem['id']} />;
            }
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
          <input id="qName" className="quiz-header-input" placeholder="Enter quiz name..." defaultValue={quiz_name}></input>
          <input id="tName" className="quiz-header-input" placeholder="Enter class name..." defaultValue={class_name}></input>
          <input id="cName" className="quiz-header-input" placeholder="Enter teacher name..." defaultValue={teacher_name}></input>
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
      <textarea id="qNotes" className="important-note"
             placeholder="Enter note for quiz..." defaultValue={quiz_notes}
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
