const { PDFDocument, rgb, StandardFonts } = require("pdf-lib");
const fs = require("fs");
const express = require("express");

const app = express();
const port = 3000;



async function updatePDF() {
  const pdfBytes = fs.readFileSync("rise.pdf");
  const pdfDoc = await PDFDocument.load(pdfBytes);

  const tableData = [
    ["Name", "Age", "City"],
    ["John Doe", "30", "New York"],
    ["Jane Smith", "28", "London"],
    ["Bob Johnson", "35", "Sydney"],
    ["Samantha Brown", "42", "Paris"],
    ["Michael Anderson", "51", "Tokyo"],
    // ...
    // Add more data here if needed
  ];

  const tableWidth = 400;
  const tableHeight = 200;
  const tableX = 50;
  const tableFontSize = 12;

  const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
  const fontSize = tableFontSize;

  const cellWidth = tableWidth / tableData[0].length;
  const cellHeight = tableHeight / (tableData.length + 1);

  let currentPage = pdfDoc.getPages()[0];
  let currentRow = 0;
  let currentY = currentPage.getHeight() - 50;

  for (let i = 0; i < tableData.length; i++) {
    const rowData = tableData[i];
    const rowHeight = Math.max(cellHeight, font.size);

    if (currentY - rowHeight < 50) {
      currentPage = pdfDoc.addPage();
      currentY = currentPage.getHeight() - 50;
      currentRow = 0;
    }

    for (let j = 0; j < rowData.length; j++) {
      let cellText = rowData[j];
      if (typeof cellText !== "string") {
        cellText = String(cellText); // Convert to string if not already a string
      }
      const cellX = tableX + j * cellWidth;
      const cellY = currentY - rowHeight;
      const cell = {
        x: cellX,
        y: cellY,
        width: cellWidth,
        height: rowHeight,
        text: cellText,
        font,
        fontSize,
        color: rgb(0, 0, 0),
      };
      currentPage.drawText(cell);
    }

    currentY -= rowHeight;
    currentRow++;
  }

  const modifiedPdfBytes = await pdfDoc.save();
  return modifiedPdfBytes;
}

app.get("/updated-pdf", async (req, res) => {
  try {
    const modifiedPdfBytes = await updatePDF();

    res.setHeader("Content-Type", "application/pdf");
    res.setHeader("Content-Disposition", 'attachment; filename="updated.pdf"');

    res.send(Buffer.from(modifiedPdfBytes));
  } catch (error) {
    console.error(error);
    res.status(500).send("An error occurred while updating the PDF.");
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
