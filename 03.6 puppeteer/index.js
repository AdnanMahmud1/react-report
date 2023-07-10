const express = require("express");
const app = express();
const port = 3000;
const report = require("./report");
const {personListLong, personListShort} = require("./peronList");

app.get("/generate-pdf", async (req, res) => {
  try {
    const pdfBuffer = await report(personListLong);
    res.setHeader("Content-Type", "application/pdf");
    res.setHeader(
      "Content-Disposition",
      'attachment; filename="generated-pdf.pdf"'
    );

    // Send the PDF buffer as a response
    res.send(pdfBuffer);
  } catch (error) {
    console.error("Error generating PDF:", error);
    res.status(500).send("Error generating PDF");
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
