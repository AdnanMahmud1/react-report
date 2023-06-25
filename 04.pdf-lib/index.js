const { PDFDocument, StandardFonts } = require("pdf-lib");
const express = require("express");

const app = express();

app.get("/generate-pdf", async (req, res) => {
  // Create a new PDF document
  const pdfDoc = await PDFDocument.create();

  // Set the font and font size for the header and footer
  const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
  const fontSize = 12;

  // Custom CSS for styling the PDF
  const customCSS = `
    <style>
      body {
        font-family: 'Helvetica';
        font-size: 14px;
      }

      header, footer {
        position: fixed;
        left: 0;
        right: 0;
        color: #333;
      }

      header {
        top: 0;
        height: 50px;
        line-height: 50px;
        text-align: center;
        background-color: #eee;
      }

      footer {
        bottom: 0;
        height: 30px;
        line-height: 30px;
        font-size: 10px;
        text-align: center;
        background-color: #eee;
      }
    </style>
  `;

  // Add a new page to the document
  const page = pdfDoc.addPage();

  // Add header to the page
  const header = page.drawText("Header", {
    x: 200,
    y: page.getHeight() - 50,
    font,
    size: fontSize,
  });

  // Add footer to the page
  const footer = page.drawText("Footer", {
    x: 200,
    y: 20,
    font,
    size: fontSize,
  });

  // Add content to the page
  const content = page.drawText("This is the content of the page.", {
    x: 50,
    y: 400,
    font,
    size: fontSize,
  });

  // Add multiple pages
  for (let i = 0; i < 5; i++) {
    const newPage = pdfDoc.addPage();
    newPage.drawText(`Page ${i + 2}`, {
      x: 200,
      y: newPage.getHeight() - 50,
      font,
      size: fontSize,
    });
  }

  // Get the PDF document as a base64 string
  const pdfBytes = await pdfDoc.save();

  // Set the response headers for downloading the PDF
  res.setHeader("Content-Disposition", 'attachment; filename="generated.pdf"');
  res.setHeader("Content-Type", "application/pdf");

  // Send the PDF as the response
  res.send(pdfBytes);
});

// Start the server
app.listen(3000, () => {
  console.log("Server started on port 3000");
});
