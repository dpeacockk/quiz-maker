import { jsPDF } from 'jspdf';

var lMargin = 0.5;
var rMargin = 7.75;
var writeSpace = 7.25;
var topMargin = 1;
var normTextSize = 12;
var headTextSize = 20;

var currHLine = topMargin;

export default function genPDF(quizArr, tP) {
    const doc = new jsPDF({ unit: "in", format: "letter" }); // ppi 72
    // Constants
    doc.setFont('Times-Roman');
    var verticalSpacing = 10 / 72;
    // reset global vars
    currHLine = topMargin;

    // content
    const teacher = document.getElementById("tName").value;
    const className = document.getElementById("cName").value;
    const quizName = document.getElementById("qName").value;
    const quizNote = document.getElementById("qNotes").value;
    const totalPoints = document.getElementById("totalPoints").value;
    // Header
    doc.setFontSize(headTextSize);
    doc.text(`${className}: ${quizName}`, lMargin, currHLine);
    currHLine += normTextSize / 72;
    doc.setFontSize(normTextSize);
    doc.text(`Teacher name: ${teacher}`, lMargin, currHLine);
    const offset = lMargin + writeSpace - 0.2;
    doc.text(`/${tP}`, offset, currHLine);
    currHLine += normTextSize / 72;


    // Student Name Place
    const studentInfo = "Name:_____________________________________________			       Date:____________"
    doc.text(studentInfo, lMargin, currHLine);
    currHLine += normTextSize / 72;
    let split_note = doc.splitTextToSize(quizNote, writeSpace);
    doc.text(split_note, lMargin, currHLine);
    currHLine += (normTextSize / 72 * (split_note.length));


    // loop through questions
    quizArr.map((elem, key) => {
        if (elem['type'] === "MCQ") {
            printMCQ(doc, elem, key);
        }
        else if (elem['type'] === "FRQ") {
            printFRQ(doc, elem, key);
        }
        else if (elem['type'] === "MCMA") {
            printMCMA(doc, elem, key);
        }
    });

    doc.save(`${quizName}.pdf`);
};

function printMCQ(doc, elem, key) {
    doc.setFontSize(normTextSize);
}

function printMCMA(doc, elem, key) {
    doc.setFontSize(normTextSize);
    let q = elem["q"]


}

function printFRQ(doc, elem, key) {
    doc.setFontSize(normTextSize);
    doc.setLineWidth(.02);
    let q_str = `Question ${elem['id'] + 1}: ${elem.contents.q}`
    q_str = doc.splitTextToSize(q_str, writeSpace)
    doc.text(q_str, lMargin, currHLine)
    currHLine += normTextSize / 72;
    let height = 2;
    let width = writeSpace;
    doc.rect(lMargin, currHLine, width, height);
    currHLine += height + normTextSize / 72;

}//printFRQ()
