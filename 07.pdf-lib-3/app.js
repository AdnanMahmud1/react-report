
const express = require("express");
const { PDFDocument, StandardFonts, rgb } = require("pdf-lib");
const fs = require("fs");


const app = express();
const port = 3000;


app.get("/updated-pdf", async (req, res) => {
  try {
    // Update the existing PDF
    const modifiedPdfBytes = await updatePDF();

    // Set the response headers for the PDF file
    res.setHeader("Content-Type", "application/pdf");
    res.setHeader("Content-Disposition", 'attachment; filename="updated.pdf"');

    // Send the modified PDF as the response
     res.send(Buffer.from(modifiedPdfBytes));
  } catch (error) {
    console.error(error);
    res.status(500).send("An error occurred while updating the PDF.");
  }
});
    const text= "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."

 async function updatePDF() {
   // Read the existing PDF file
   const pdfBytes = fs.readFileSync("rise2.pdf");

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


app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
