const express = require("express");
const app = express();
const port = 3000;
const report = require("./reportMake");
const path = require("path");
const { personListLong, personListShort } = require("./peronList");

//app.use("/images", express.static(path.join(__dirname, "./public/images")));
app.use(express.static("./public"));
//app.use(express.static("public/images"));

app.get("/pdf", async (req, res) => {
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
app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "./public", "header.html"));
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
