const puppeteer = require("puppeteer");
const express = require("express");
const fs = require("fs");

const app = express();
const port = 3000; // Choose the desired port number

app.get("/generate-pdf", async (req, res) => {
  try {
    // Create a new headless browser instance
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    // Read the HTML template file
    const htmlTemplate = fs.readFileSync("./pdfTemplate.html", "utf-8");

    // Set the HTML content of the page
    await page.setContent(htmlTemplate);

    // Generate PDF from the page
    const pdfBuffer = await page.pdf();

    // Close the browser
    await browser.close();

    // Set the response headers
    res.setHeader("Content-Type", "application/pdf");
    res.setHeader("Content-Disposition", 'attachment; filename="output.pdf"');

    // Send the PDF as the response
    res.send(pdfBuffer);
  } catch (error) {
    console.error("Error generating PDF:", error);
    res.status(500).send("Error generating PDF");
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
