const { PDFDocument, StandardFonts, rgb } = require("pdf-lib");
const fs = require("fs");
const express = require("express");
const app = express();
const port = 3000; //

app.get("/generate-pdf", async (req, res) => {
  // Create a new PDF document
  const pdfDoc = await PDFDocument.create();

  // Add a new page
  const page = pdfDoc.addPage();

  // Set the font and font size
  const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
  page.setFont(font);
  page.setFontSize(24);

  // Add some text to the page
  page.drawText("Hello, World!", { x: 50, y: 500, color: rgb(0, 0.53, 0.71) });

  // Serialize the PDF document
  const pdfBytes = await pdfDoc.save();

  // Set the response headers
    res.setHeader("Content-Type", "application/pdf");
    res.setHeader("Content-Disposition", 'attachment; filename="example.pdf"');

  //res.setHeader("Content-Type", "application/pdf");
  //res.setHeader("Content-Disposition", 'inline; filename="example.pdf"');

  // Send the PDF as the response
  //res.send(pdfBytes);
  res.send(Buffer.from(pdfBytes));
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
