
const express = require("express");

const { updatePDF}= require("./report");

const app = express();
const port = 3000;


app.get("/updated-pdf", async (req, res) => {
  try {
    // Update the existing PDF
    const modifiedPdfBytes = await updatePDF();

    // Set the response headers for the PDF file
    res.setHeader("Content-Type", "application/pdf");
    res.setHeader("Content-Disposition", 'attachment; filename="updated.pdf"');

    // Send the modified PDF as the response
     res.send(Buffer.from(modifiedPdfBytes));
  } catch (error) {
    console.error(error);
    res.status(500).send("An error occurred while updating the PDF.");
  }
});
    const text= "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."


app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
