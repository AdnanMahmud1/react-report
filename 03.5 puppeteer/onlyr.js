const puppeteer = require("puppeteer");
const fs = require("fs");

// Array of data to be added as a table
const dataArray = [
  { name: "John", age: 30, city: "New York" },
  { name: "Alice", age: 25, city: "London" },
  { name: "Bob", age: 35, city: "Paris" },
];

(async () => {
  try {
    // Launch a headless browser instance
    const browser = await puppeteer.launch();

    // Create a new page
    const page = await browser.newPage();

    // Read the HTML template file
    const htmlTemplate = await fs.promises.readFile("template.html", "utf-8");

    // Replace the data placeholder with the table markup
    const tableHtml = createTableHtml(dataArray);
    const modifiedHtml = htmlTemplate.replace(
      "<table-placeholder></table-placeholder>",
      tableHtml
    );

    // Load the modified HTML content
    await page.setContent(modifiedHtml, { waitUntil: "networkidle0" });

    // Wait for any required resources to load
    await page.waitForTimeout(2000);

    // Generate the PDF
    await page.pdf({ path: "output.pdf", format: "A4" });

    // Close the browser
    await browser.close();

    console.log("PDF created successfully.");
  } catch (error) {
    console.error("Error:", error);
  }
})();

// Helper function to generate the HTML table from the data array
function createTableHtml(dataArray) {
  let tableHtml = "<table>";
  tableHtml += "<tr><th>Name</th><th>Age</th><th>City</th></tr>";

  for (const data of dataArray) {
    tableHtml += `<tr><td>${data.name}</td><td>${data.age}</td><td>${data.city}</td></tr>`;
  }

  tableHtml += "</table>";

  return tableHtml;
}
