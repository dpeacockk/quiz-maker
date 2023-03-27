import { jsPDF } from 'jspdf';


export default function genPDF() {
    const doc = new jsPDF();
    // Constants
    doc.setFont('Times-Roman');
    var lMargin = 15;
    var topMargin = 25;
    var currHLine = topMargin;
    var rMargin = 15;
    var normTextSize = 12;
    var headTextSize = 20;
    var verticalSpacing = 10;
    
    const teacher = document.getElementById("tName").value;
    const className = document.getElementById("cName").value;
    const quizName = document.getElementById("qName").value;
    doc.setFontSize(headTextSize);
    doc.text(`${className}: ${quizName}`, lMargin, currHLine);
    currHLine += 5;
    doc.setFontSize(normTextSize);
    doc.text(`Teacher name: ${teacher}`, lMargin, currHLine);
    doc.save('sample-pdf.pdf')
};