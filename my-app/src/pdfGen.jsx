import { jsPDF } from 'jspdf';

var lMargin = 0.5;
var rMargin = 7.75;
var writeSpace = 7.25;
var topMargin = 1;
var normTextSize = 12;
var normTextSpacing = normTextSize + 2;
var headTextSize = 20;

var currHLine = topMargin;
var pageHeight = 0;

export default function genPDF(quizArr) {
    const doc = new jsPDF({ unit: "in", format: "letter" }); // ppi 72
    pageHeight = doc.internal.pageSize.height;
    // Constants
    //let totalPoints = sum_points(quizArr);
    doc.setFont('Times-Roman');
    var verticalSpacing = 10 / 72;
    // reset global vars
    currHLine = topMargin;

    // content
    const teacher = document.getElementById("tName").value;
    const className = document.getElementById("cName").value;
    const quizName = document.getElementById("qName").value;
    const quizNote = document.getElementById("qNotes").value;
    const totalPoints = 100;//document.getElementById("totalPoints").value;

    // Header
    doc.setFontSize(headTextSize);
    doc.text(`${className}: ${quizName}`, lMargin, currHLine);
    currHLine += normTextSpacing / 72;
    doc.setFontSize(normTextSize);
    doc.text(`Teacher name: ${teacher}`, lMargin, currHLine);
    const offset = lMargin + writeSpace - 0.2;
    doc.setFontSize(headTextSize);
    doc.text(`/${totalPoints}`, offset, currHLine);
    doc.setFontSize(normTextSize);
    currHLine += normTextSpacing / 72;


    // Student Name Place
    const studentInfo = "Name:_____________________________________________			       Date:____________"
    doc.text(studentInfo, lMargin, currHLine);
    currHLine += (normTextSpacing / 72)+0.02;
    // Note
    let split_note = doc.splitTextToSize(quizNote, writeSpace);
    let sizeOfAdd = (normTextSpacing / 72 * (split_note.length));
    maybeAddNewPage(doc, sizeOfAdd);
    doc.text(split_note, lMargin, currHLine);
    currHLine += sizeOfAdd*2;


    // loop through questions
    quizArr.map((elem, key) => {
        if (key === quizArr.length-1){
            elem['id'] = key;
            elem['type'] = document.getElementById(key).getAttribute('type');
            console.log(elem['type']);
            elem['contents'] = {}
            if (elem['type'] === "FRQ"){
                elem.contents = {
                    "q": document.getElementById(`${elem['id']}question`).value,
                    "points": document.getElementById(`${elem['id']}points`).value,
                    "short": document.getElementById(`${elem['id']}short`).checked,
                    "med": document.getElementById(`${elem['id']}med`).checked,
                    "long": document.getElementById(`${elem['id']}long`).checked
                  }
            }//if
            else {
                elem.contents = {
                    "q": document.getElementById(`${elem['id']}question`).value,
                    "points": document.getElementById(`${elem['id']}points`).value,
                    "A": document.getElementById(`${elem['id']}A`).value,
                    "B": document.getElementById(`${elem['id']}B`).value,
                    "C": document.getElementById(`${elem['id']}C`).value,
                    "D": document.getElementById(`${elem['id']}D`).value,
                  }
            }//else
        }
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
    doc.setLineWidth(.02);
    let q_str = `Question ${elem['id'] + 1} (Multiple choice):  ${elem.contents.q}`;
    q_str = doc.splitTextToSize(q_str, writeSpace);
    doc.text(q_str, lMargin, currHLine);
    currHLine += (normTextSpacing*q_str.length/72);

    // print choices
    let tab = 0.2;
    let a = `A. ${elem["contents"]["A"]}`;
    let q_a = doc.splitTextToSize(a, writeSpace-tab);
    doc.text(q_a, lMargin+tab, currHLine);
    currHLine += (normTextSpacing * (q_a.length / 72));
    let b = `B. ${elem["contents"]["B"]}`;
    let q_b = doc.splitTextToSize(b, writeSpace-tab);
    doc.text(q_b, lMargin+tab, currHLine);
    currHLine += (normTextSpacing * (q_b.length / 72));
    let c = `C. ${elem["contents"]["C"]}`;
    let q_c = doc.splitTextToSize(c, writeSpace-tab);
    doc.text(q_c, lMargin+tab, currHLine);
    currHLine += (normTextSpacing * (q_c.length / 72));
    let d = `D. ${elem["contents"]["D"]}`;
    let q_d = doc.splitTextToSize(d, writeSpace-tab);
    doc.text(q_d, lMargin+tab, currHLine);
    currHLine += (normTextSpacing * (q_d.length / 72))*2;
}//printMCQ

function printMCMA(doc, elem, key) {
    doc.setFontSize(normTextSize);
    doc.setLineWidth(.02);
    let q_str = `Question ${elem['id'] + 1} (Select all that apply): ${elem.contents.q}`;
    q_str = doc.splitTextToSize(q_str, writeSpace);
    doc.text(q_str, lMargin, currHLine);
    currHLine += (normTextSpacing*q_str.length/72);
    // Select All that apply
    
    // print choices
    let tab = 0.2;
    let a = `A. ${elem["contents"]["A"]}`;
    let q_a = doc.splitTextToSize(a, writeSpace-tab);
    doc.text(q_a, lMargin+tab, currHLine);
    currHLine += (normTextSpacing * (q_a.length / 72));
    let b = `B. ${elem["contents"]["B"]}`;
    let q_b = doc.splitTextToSize(b, writeSpace-tab);
    doc.text(q_b, lMargin+tab, currHLine);
    currHLine += (normTextSpacing * (q_b.length / 72));
    let c = `C. ${elem["contents"]["C"]}`;
    let q_c = doc.splitTextToSize(c, writeSpace-tab);
    doc.text(q_c, lMargin+tab, currHLine);
    currHLine += (normTextSpacing * (q_c.length / 72));
    let d = `D. ${elem["contents"]["D"]}`;
    let q_d = doc.splitTextToSize(d, writeSpace-tab);
    doc.text(q_d, lMargin+tab, currHLine);
    currHLine += (normTextSpacing * (q_d.length / 72))*2;
}//printMCMA

function printFRQ(doc, elem, key) {
    doc.setFontSize(normTextSize);
    doc.setLineWidth(.02);
    let q_str = `Question ${elem['id'] + 1} (Free response): ${elem.contents.q}`
    q_str = doc.splitTextToSize(q_str, writeSpace)
    let width = writeSpace;
    let height = 1;
    if (elem.contents.med){ height = 3;}
    if (elem.contents.long){ height = 5;}
    maybeAddNewPage(doc, height);    
    doc.text(q_str, lMargin, currHLine) //write text after new page, too
    currHLine += normTextSpacing / 72;
    doc.rect(lMargin, currHLine, width, height);
    currHLine += height + normTextSpacing / 72;

}//printFRQ()


function maybeAddNewPage(doc, sizeOfAdd){
    if (currHLine + sizeOfAdd > pageHeight){
        currHLine = topMargin;
        doc.addPage();
    }
}
