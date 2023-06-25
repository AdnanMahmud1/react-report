const express = require("express");
const { PDFDocument, StandardFonts, rgb } = require("pdf-lib");
const fs = require("fs");
const path = require("path");
const fontKit = require ('@pdf-lib/fontkit')

const app = express();

// app.get("/generate-pdf", async (req, res) => {
//   // Create a new PDF document
//   const pdfDoc = await PDFDocument.create();
//   const page = pdfDoc.addPage();

//   // Set custom CSS styles
//   const customCss = `
//     <style>
//       body {
//         font-family: Helvetica;
//       }

//       .header {
//         position: fixed;
//         top: 750px;
//         left: 50px;
//       }

//       .footer {
//         position: fixed;
//         bottom: 50px;
//         left: 50px;
//       }
//     </style>
//   `;

//   // Add header
//   const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
//   const header = page.drawText("Header Text", {
//     x: 50,
//     y: 800,
//     size: 20,
//     font,
//   });

//   // Add footer
//   const footer = page.drawText("Footer Text", { x: 50, y: 20, size: 10, font });

//   // Add custom CSS to the document
//   page.addHtml(customCss);

//   // Serialize the PDF to a buffer
//   const pdfBytes = await pdfDoc.save();

//   // Set response headers for downloading the PDF
//   res.setHeader("Content-Type", "application/pdf");
//   res.setHeader("Content-Disposition", 'attachment; filename="generated.pdf"');

//   // Send the PDF buffer as the response
//   res.send(pdfBytes);
// });
app.get("/generate-pdf", async (req, res) => {
  // Create a new PDF document
  const pdfDoc = await PDFDocument.create();

  // Load an existing font and embed it in the document
   pdfDoc.registerFontkit(fontKit);
  const fontBytes = fs.readFileSync("arial.ttf");
  const font = await pdfDoc.embedFont(fontBytes);

  // Add a new page to the document
  const page = pdfDoc.addPage();

  // Set the header
  const header = "My Custom Header";
  page.drawText(header, {
    x: 50,
    y: page.getHeight() - 50,
    font,
    size: 18,
    //color: rgb(0, 0, 0),
  });

  // Set the footer
  const footer = "Page Number: 1";
  page.drawText(footer, { x: 50, y: 50, font, size: 12, color: rgb(0, 0, 0) });

  // Add custom CSS
  const css = fs.readFileSync("custom.css", "utf-8");

  // Set the CSS in the PDF metadata
  pdfDoc.setTitle("My Custom PDF");
  pdfDoc.setAuthor("Your Name");
  pdfDoc.setSubject("PDF generation in Node.js");
  pdfDoc.setKeywords(["PDF", "Node.js"]);
  pdfDoc.setProducer("pdf-lib");

  // Generate the PDF bytes
  const pdfBytes = await pdfDoc.save();

  // Set the appropriate headers for the PDF response
  res.setHeader("Content-Type", "application/pdf");
  res.setHeader(
    "Content-Disposition",
    'attachment; filename="my-custom-pdf.pdf"'
  );

  // Send the PDF to the client
  res.send(pdfBytes);
});

// Start the server
app.listen(3000, () => {
  console.log("Server started on port 3000");
});
