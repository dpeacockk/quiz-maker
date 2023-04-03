import { useEffect, useState, useCallback } from 'react';
import genPDF from './pdfGen';
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
  const [total_points, setTotalPoints] = useState(0);



  ////////////////////////////
  // useEffect(() => {
  //   window.addEventListener("keydown", sumPoints);
  //   return () => {
  //     window.removeEventListener("keydown", sumPoints);
  //   };
  // }, [sumPoints]);
  //////////////////

  function sumPoints() {
    let points = 0;
    quiz_questions.map((elem, key) => {
      points += parseFloat(document.getElementById(`${elem['id']}points`).value);
    })
    setTotalPoints(points);
    //SaveInputVals();
  }//sumPoints()


  function SaveInputVals() {
    // Saving Headers
    setQuizName(document.getElementById("qName").value);
    setClassName(document.getElementById("cName").value);
    setTeacherName(document.getElementById("tName").value);
    setQuizNotes(document.getElementById("qNotes").value);

    // Saving Quiz Question Values
    quiz_questions.map((elem, key) => {
      if (elem['type'] === 'MCQ') {
        SaveMCQ(elem);
      } else if (elem['type'] === 'FRQ') {
        SaveFRQ(elem);
      } else if (elem['type'] === 'MCMA') {
        SaveMCMA(elem);
      }
    })
  }//SaveInputVals()


  function SaveMCQ(elem) {
    elem.contents = {
      "q": document.getElementById(`${elem['id']}question`).value,
      "points": document.getElementById(`${elem['id']}points`).value,
      "A": document.getElementById(`${elem['id']}A`).value,
      "B": document.getElementById(`${elem['id']}B`).value,
      "C": document.getElementById(`${elem['id']}C`).value,
      "D": document.getElementById(`${elem['id']}D`).value,
    }
    let update_arr = quiz_questions[elem['id']] = elem
    setQuestions(update_arr);
  }//SaveFRQ
  function SaveFRQ(elem) {
    elem.contents = {
      "q": document.getElementById(`${elem['id']}question`).value,
      "points": document.getElementById(`${elem['id']}points`).value,
      "short": document.getElementById(`${elem['id']}short`).checked,
      "med": document.getElementById(`${elem['id']}med`).checked,
      "long": document.getElementById(`${elem['id']}long`).checked
    }
    let update_arr = quiz_questions[elem['id']] = elem
    setQuestions(update_arr);
  }//SaveFRQ
  function SaveMCMA(elem) {
    elem.contents = {
      "q": document.getElementById(`${elem['id']}question`).value,
      "points": document.getElementById(`${elem['id']}points`).value,
      "A": document.getElementById(`${elem['id']}A`).value,
      "B": document.getElementById(`${elem['id']}B`).value,
      "C": document.getElementById(`${elem['id']}C`).value,
      "D": document.getElementById(`${elem['id']}D`).value,
    }
    let update_arr = quiz_questions[elem['id']] = elem
    setQuestions(update_arr);
  }//SaveMCMA


  function swap_Q(q1, q2) {
    let new_order = [quiz_questions[q1], quiz_questions[q2]] = [quiz_questions[q2], quiz_questions[q1]];
    setQuestions(new_order);
  }//swap_Q()


  function add_Q(type) {
    SaveInputVals();
    let info = {};
    info['type'] = type;
    info['id'] = curr_id;
    info['obj'] = getObject(type, curr_id);
    setCurrID(curr_id + 1);
    info['contents'] = setDefContent(type)

    let oldArr = quiz_questions.slice();
    oldArr.push(info);
    setQuestions(oldArr);
    sumPoints();
  } // add_Q()


  function getObject(type, id) {
    if (type === "MCQ") {
      return <MCQ key={id} uniqueKey={id} id={id} />;
    }
    else if (type === "FRQ") {
      return <FRQ key={id} uniqueKey={id} id={id} />;
    }
    else if (type === "MCMA") {
      return <MCMA key={id} uniqueKey={id} id={id} />;
    }
  }

  function setDefContent(type) {
    let content = ''
    if (type === "MCQ" || type === "MCMA") {
      content = {
        "q": "",
        "points": 0,
        "A": "",
        "B": "",
        "C": "",
        "D": ""
      }
    }//if
    else {
      content = {
        "q": "",
        "points": 0,
      }
    }//else
    return content
  }//setDefContent()


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
              return <MCQ key={elem['id']} id={elem['id']} content={elem['contents']} />;
            }
            else if (elem['type'] === "FRQ") {
              return <FRQ key={elem['id']} id={elem['id']} content={elem['contents']} pUp={sumPoints} />;
            }
            else if (elem['type'] === "MCMA") {
              return <MCMA key={elem['id']} id={elem['id']} content={elem['contents']} />;
            }
          })}
        </div>

        <div className="quiz-add-questions-wrapper">
          <button onClick={() => add_Q("MCQ")} className="add-question-button"> Add MCQ</button>
          <div className="button-space" />
          <button onClick={() => add_Q("FRQ")} className="add-question-button"> Add FRQ</button>
          <div className="button-space" />
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
          <input id="cName" className="quiz-header-input" placeholder="Enter class name..." defaultValue={class_name}></input>
          <input id="tName" className="quiz-header-input" placeholder="Enter teacher name..." defaultValue={teacher_name}></input>
        </form>
        <ImportantNote />
        <hr className="quiz-divider" />
      </div>
    );
  }


  function PDFThing() {
    return (
      <button className='to-pdf-button' onClick={()=>{sumPoints(); genPDF(quiz_questions, total_points);}}> Convert Quiz to PDF!</button>
    );
  }// PDFThing()

  function ImportantNote() {
    return (
      <textarea id="qNotes" className="important-note"
        placeholder="Enter note for quiz..." defaultValue={quiz_notes}
      />
    );
  }//importantNote()

  function UpArrow(curr_index) {
    return (
      <div className="arrow" onClick={swap_Q(curr_index, curr_index - 1)}>
        {String.fromCharCode(8593)}
      </div>
    );
  }//UpArrow()

  function DownArrow(curr_index) {
    return (
      <div className="arrow" onClick={() => swap_Q(curr_index, curr_index + 1)}>
        {String.fromCharCode(8595)}
      </div>
    );
  }//DownArrow()



  return (
    <div>
      <div className="title">MDST Baddies Quizmaker</div>

      <QuizTitle />

      <div className="points-wrapper"> 
      <span> Total Points: </span><span id="totalPoints">{total_points}</span>
      </div>

      <QuizContent />

      <PDFThing />

    </div>
  );
}

export default App;
