const { PDFDocument, StandardFonts, rgb } = require("pdf-lib");
const fs = require("fs");

async function generatePDF() {
  // Create a new PDF document
  const pdfDoc = await PDFDocument.create();

  // Add a new page to the document
  const page = pdfDoc.addPage();

  // Set the page size
  page.setSize(612, 792); // Width: 8.5 inches, Height: 11 inches (standard letter size)

  // Set the font and font size
  const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
  const fontSize = 24;

  // Add text to the page
  page.drawText("Hello, World!", {
    x: 50,
    y: 700,
    font,
    fontSize,
    color: rgb(0, 0.53, 0.71),
  });

  // Save the PDF to a file
  const pdfBytes = await pdfDoc.save();
  fs.writeFileSync("output.pdf", pdfBytes);
}

generatePDF().catch(console.error);


 const getPdf =async () => {
  await generatePDF();
 }

 export default getPdf