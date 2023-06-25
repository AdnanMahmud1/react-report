const express = require("express");
const puppeteer = require("puppeteer");

const app = express();
const port = 3000;

app.get("/generate-pdf", async (req, res) => {
  try {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    // Generate your HTML content
    const htmlContent = `
      <html>
        <head>
          <style>
            /* Your custom CSS styles here */
          </style>
        </head>
        <body>
          <header>
            <!-- Header content here -->
          </header>
          <main>
           <h1>Hello from puppetier</h1>
          </main>
          <footer>
            <!-- Footer content here -->
          </footer>
        </body>
      </html>
    `;

    // Set the page content and wait for network idle
    await page.setContent(htmlContent, { waitUntil: "networkidle0" });

    // Set the desired PDF options
    const pdfOptions = {
      format: "A4",
      displayHeaderFooter: true,
      headerTemplate: "<header>Your Header</header>",
      footerTemplate: "<footer>Your Footer</footer>",
      margin: {
        top: "2cm",
        right: "2cm",
        bottom: "2cm",
        left: "2cm",
      },
    };

    // Generate the PDF buffer
    const pdfBuffer = await page.pdf(pdfOptions);

    // Close the browser
    await browser.close();

    // Set the appropriate headers for PDF download
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
