const express = require("express");
var bodyParser = require("body-parser");
const cors = require("cors");
const { PDFDocument, StandardFonts } = require("pdf-lib");
const fs = require("fs");

const app = express();

const port = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get("/generate-pdf", async (req, res) => {
  try {
    const htmlTemplatePath = "./pdfTemplate.html";
    const variables = {
      name: "John Doe",
      age: 30,
      email: "johndoe@example.com",
    };

    // Generate the PDF using the modified function
    const pdfBytes = await generatePDFFromHTML(htmlTemplatePath, variables);

    // Set the response headers
    res.setHeader("Content-Type", "application/pdf");
    res.setHeader("Content-Disposition", 'attachment; filename="output.pdf"');

    // Send the PDF as the response
      res.send(Buffer.from(pdfBytes));
  } catch (error) {
    console.error("Error generating PDF:", error);
    res.status(500).send("Error generating PDF");
  }
});

async function generatePDFFromHTML(htmlTemplatePath, variables) {
  const htmlTemplate = fs.readFileSync(htmlTemplatePath, "utf-8");

  // Create a new PDF document
  const pdfDoc = await PDFDocument.create();

  // Embed the standard Helvetica font
  const font = await pdfDoc.embedFont(StandardFonts.Helvetica);

  // Add a new page
  const page = pdfDoc.addPage();

  // Set the font and font size
  page.setFont(font);
  page.setFontSize(12);

  // Draw the HTML content on the page
  page.drawHTML(htmlTemplate, { x: 50, y: page.getHeight() - 50 });

  // Serialize the PDF document
  const pdfBytes = await pdfDoc.save();

  return pdfBytes;
}


//Get requets
app.get("/fetch-pdf", (req, res) => {
  res.sendFile(`${__dirname}/result.pdf`);
});

app.listen(port, () => {
  console.log(`Server started on port: ${port}`);
});
