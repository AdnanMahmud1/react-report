const { PDFDocument, StandardFonts, rgb } = require("pdf-lib");
const fs = require("fs");
var path = require("path");

async function updatePDF() {
  const filePath = path.resolve(__dirname, "./rise2.pdf");
  console.log(`Path of file in parent dir: ${filePath}`);
  const pdfBytes = fs.readFileSync(filePath);
  const pdfDoc = await PDFDocument.load(pdfBytes);

  const pages = pdfDoc.getPages();
  const firstPage = pages[0];

  // Define the table's data and styling
  const table = [
    ['Name', 'Age', 'City'],
    ['John Doe', '30', 'New York'],
    ['Jane Smith', '28', 'London'],
    ['Bob Johnson', '35', 'Sydney'],
  ];
  const tableWidth = 400;
  const tableHeight = 200;
  const tableX = 50;
  const tableY = firstPage.getHeight() - tableHeight - 50;
  const tableFontSize = 12;

  // Calculate the cell width and height
  const cellWidth = tableWidth / table[0].length;
  const cellHeight = tableHeight / (table.length + 1);

  // Set font and font size
  const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
  const fontSize = tableFontSize;

  // Add table headers
  for (let i = 0; i < table[0].length; i++) {
    const cellText = table[0][i];
    const cellX = tableX + i * cellWidth;
    const cellY = tableY + tableHeight - cellHeight;
    const cell = {
      x: cellX,
      y: cellY,
      width: cellWidth,
      height: cellHeight,
      text: cellText,
      font,
      fontSize,
      color: rgb(0, 0, 0),
    };
    firstPage.drawText(cell);
  }

  // Add table data
  for (let i = 1; i < table.length; i++) {
    for (let j = 0; j < table[i].length; j++) {
      const cellText = table[i][j];
      const cellX = tableX + j * cellWidth;
      const cellY = tableY + tableHeight - (i + 1) * cellHeight;
      const cell = {
        x: cellX,
        y: cellY,
        width: cellWidth,
        height: cellHeight,
        text: cellText,
        font,
        fontSize,
        color: rgb(0, 0, 0),
      };
      firstPage.drawText(cell);
    }
  }

  const modifiedPdfBytes = await pdfDoc.save();
  return modifiedPdfBytes;
}

module.exports = { updatePDF };

// app.get("/updated-pdf", async (req, res) => {
//   try {
//     const modifiedPdfBytes = await updatePDF();

//     res.setHeader("Content-Type", "application/pdf");
//     res.setHeader("Content-Disposition", 'attachment; filename="updated.pdf"');

//     res.send(Buffer.from(modifiedPdfBytes));
//   } catch (error) {
//     console.error(error);
//     res.status(500).send("An error occurred while updating the PDF.");
//   }
// });

// app.listen(port, () => {
//   console.log(`Server is running on http://localhost:${port}`);
// });
