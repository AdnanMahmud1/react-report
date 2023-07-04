const { PDFDocument, StandardFonts, rgb } = require("pdf-lib");
const express = require("express");

const app = express();
const port = 3000;

app.get("/generate-pdf", async (req, res) => {
  // Create a new PDF document
  const pdfDoc = await PDFDocument.create();

  // Add a new page
  const page = pdfDoc.addPage();
  const { width, height } = page.getSize();

  // Set the title of the document
  const title = "Generated PDF";
  page.drawText(title, {
    x: 50,
    y: height - 50,
    size: 24,
    font: await pdfDoc.embedFont(StandardFonts.HelveticaBold),
    color: rgb(0, 0.53, 0.71),
  });

  // Add header to each page
  const header = "Header Text";
  page.drawText(header, {
    x: 50,
    y: height - 30,
    size: 12,
    font: await pdfDoc.embedFont(StandardFonts.Helvetica),
    color: rgb(0.5, 0.5, 0.5),
  });

  // Add footer to each page
  const footer = "Page Number";
  page.drawText(footer, {
    x: 50,
    y: 20,
    size: 12,
    font: await pdfDoc.embedFont(StandardFonts.Helvetica),
    color: rgb(0.5, 0.5, 0.5),
  });

  // Serialize the PDF to a buffer
  const pdfBytes = await pdfDoc.save();

  // Set the response headers
  res.setHeader("Content-Type", "application/pdf");
  res.setHeader("Content-Disposition", 'attachment; filename="generated.pdf"');

  // Send the PDF as a response
  res.send(Buffer.from(pdfBytes));
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
