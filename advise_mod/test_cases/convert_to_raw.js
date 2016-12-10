// convert pdf file to raw data
/////////////////////////////////////

try {
    let fs = require('fs'),
        PDFParser = require("pdf2json");
}
catch (err) {
    throw err;
}

let pdfParser = new PDFParser();

try {
    pdfParser.on("pdfParser_dataError", errData => console.error(errData.parserError));
    pdfParser.on("pdfParser_dataReady", pdfData => {
        fs.writeFile("../rawtest.json", JSON.stringify(pdfData));
    });

    pdfParser.loadPDF("../unofficial.pdf");
}
catch (err) {
    throw err;
}