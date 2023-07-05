const fs = require("fs");
const { PDFDocument, rgb, StandardFonts, table } = require("pdf-lib");
var path = require("path");


async function addTableToPDF() {
    const filePath = path.resolve(__dirname, "./rise2.pdf");

    const existingPdfBytes = fs.readFileSync(filePath);
    const pdfDoc = await PDFDocument.load(existingPdfBytes);
    const pages = pdfDoc.getPages();
    const currentPage = pages[0]; // Choose the page you want to add the table to

   const tableWidth = 400;
   const tableHeight = 200;
   const tableX = 100; // X-coordinate of the table's top-left corner
   const tableY = 400; // Y-coordinate of the table's top-left corner

   const tableData = [
     ["Header 1", "Header 2", "Header 3"],
     ["Data 1", "Data 2", "Data 3"],
     ["Data 4", "Data 5", "Data 6"],
   ];

   // Create a new page for the table
   const tablePage = pdfDoc.insertPage(1, currentPage.getSize());

   // Copy the content from the original page to the new table page
   const [copiedPage] = await pdfDoc.copyPages(pdfDoc, [0], {
     size: currentPage.getSize(),
   });
   tablePage.drawPage(copiedPage);

   const tableInstance = drawTable();

   tableInstance.width(tableWidth);
   tableInstance.setPosition(tableX, tableY);

   tableInstance.borderWidth(1);
   tableInstance.borderColor(rgb(0, 0, 0));

   for (const row of tableData) {
     tableInstance.addRow(row);
   }

   tableInstance.drawOn(tablePage);

   const modifiedPdfBytes = await pdfDoc.save();
   return modifiedPdfBytes;
}


module.exports = { updatePDF: addTableToPDF };