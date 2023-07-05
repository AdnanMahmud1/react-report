
const { PDFDocument, StandardFonts, rgb } = require("pdf-lib");
const fs = require("fs");
var path = require("path");

 async function updatePDF() {
   // Read the existing PDF file
   const filePath = path.resolve(__dirname, "./rise.pdf");
   console.log(
     `Path of file in parent dir: ${filePath}`
   );
   const pdfBytes = fs.readFileSync(filePath);

   // Load the PDF document
   const pdfDoc = await PDFDocument.load(pdfBytes);
   //const document = await PDFDocument.load(pdfBytes("./rise.pdf"));

   // Update the PDF contents (e.g., add text, modify existing text, add images, etc.)
   // Example: Add a text to the first page

   const courierBoldFont = await pdfDoc.embedFont(StandardFonts.Courier);
   const firstPage = pdfDoc.getPage(0);
   const pageIndices = pdfDoc.getPageIndices();
   firstPage.moveTo(72, 570);
   firstPage.drawText(new Date().toUTCString(), {
     font: courierBoldFont,
     size: 12,
   });

   firstPage.moveTo(105, 530);

   firstPage.drawText("Ms. Jane,", {
     font: courierBoldFont,
     size: 12,
   });

   firstPage.moveTo(72, 330);
   firstPage.drawText("John Doe \nSr. Vice President Engineering \nLogRocket", {
     font: courierBoldFont,
     size: 12,
     lineHeight: 10,
   });

   for (const pageIndex of pageIndices) {
     const page = pdfDoc.getPage(pageIndex);

     page.drawText(`${pageIndex + 1}`, {
       x: page.getWidth() / 2,
       y: 20,
       font: courierBoldFont,
       size: 12,
     });
   }
   //    const footer = "Page Number";
   //    firstPage.drawText(footer, {
   //      x: 50,
   //      y: 20,
   //      size: 12,
   //      font: await pdfDoc.embedFont(StandardFonts.Helvetica),
   //      color: rgb(0.5, 0.5, 0.5),
   //    });
   //const pages = pdfDoc.getPages();
   //    const firstPage = pages[0];

   //    firstPage.drawText(
   //      text,
   //      { x: 50, y: 50, size: 24 }
   //    );

   // Save the modified PDF as a new buffer
   const modifiedPdfBytes = await pdfDoc.save();

   return modifiedPdfBytes;
 }


 module.exports = { updatePDF };