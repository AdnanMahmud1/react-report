
const fs = require("fs");
const path = require("path");
const { PDFDocument } = require("pdf-lib");

const splitPDF = async (pdfFilePath, outputDirectory) => {
  const data = await fs.promises.readFile(pdfFilePath);
  const readPdf = await PDFDocument.load(data);
  const { length } = readPdf.getPages();

  for (let i = 0, n = length; i < n; i += 1) {
    const writePdf = await PDFDocument.create();
    const [page] = await writePdf.copyPages(readPdf, [i]);
    writePdf.addPage(page);
    const bytes = await writePdf.save();
    const outputPath = path.join(outputDirectory, `Invoice_Page_${i + 1}.pdf`);
    await fs.promises.writeFile(outputPath, bytes);
    console.log(`Added ${outputPath}`);
  }
};

splitPDF("input/invoices.pdf", "invoices").then(() =>
  console.log("All invoices have been split!").catch(console.error)
);
