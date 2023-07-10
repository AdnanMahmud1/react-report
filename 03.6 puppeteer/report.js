const puppeteer = require("puppeteer");
const fs = require("fs");

// Array of data to be added as a table
const dataArray = [
  { name: "John", age: 30, city: "New York" },
  { name: "Alice", age: 25, city: "London" },
  { name: "Bob", age: 35, city: "Paris" },
];

async function makeReport(personList) {
  try {
    // Launch a headless browser instance
    const browser = await puppeteer.launch();

    // Create a new page
    const page = await browser.newPage();

    // Set header and footer content using page.pdf() options
    const headerTemplate =
      '<div style="font-size: 12px; text-align: center; padding: 10px;">Header Content</div>';
    const footerTemplate =
      '<div style="font-size: 10px; text-align: center; padding: 10px;"><span class="pageNumber"></span>/<span class="totalPages"></span></div>';
    const pdfOptions = {
      //path: "output.pdf",
      format: "A4",
      displayHeaderFooter: true,
      headerTemplate,
      footerTemplate,
    };

    // Read the HTML template file
    const htmlTemplate = await fs.promises.readFile("template.html", "utf-8");

    // Replace the data placeholder with the table markup
    const tableHtml = createTableHtml(personList);
    const modifiedHtml = htmlTemplate.replace(
      "<table-placeholder></table-placeholder>",
      tableHtml
    );

    // Load the modified HTML content
    await page.setContent(modifiedHtml, { waitUntil: "networkidle0" });

    // Wait for any required resources to load

    // Generate the PDF with header and footer
    const pdfBuffer = await page.pdf(pdfOptions);

    // Close the browser
    await browser.close();
    return pdfBuffer;
    console.log("PDF created successfully.");
  } catch (error) {
    console.error("Error:", error);
  }
}

// Helper function to generate the HTML table from the data array
function createTableHtml(dataArray) {
  //let tableHtml = "<table>";
  let tableHtml =
    "<tr><th>Name</th><th>Designation</th><th>Official_ID</th><th>religion</th></tr>";

  for (const data of dataArray) {
    tableHtml += `<tr><td>${data.name}</td><td>${data.designation_name}</td><td>${data.official_ID}</td><td>${data.religion}</td></tr>`;
  }

  tableHtml += "</table>";

  return tableHtml;
}

module.exports = makeReport;
