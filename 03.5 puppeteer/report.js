const puppeteer = require("puppeteer");
const fs = require("fs");

// Array of data to be added as a table
const dataArray = [
  { name: "John", age: 30, city: "New York" },
  { name: "Alice", age: 25, city: "London" },
  { name: "Bob", age: 35, city: "Paris" },
];

async function makePDf() {
  try {
    // Launch a headless browser instance
    const browser = await puppeteer.launch();

    // Create a new page
    const page = await browser.newPage();

    // Set header and footer content
    await page.setExtraHTTPHeaders({ "header-key": "header-value" });
    // await page.setFooterTemplate(
    //   '<div style="font-size: 10px; text-align: center; padding: 10px;"><span class="pageNumber"></span>/<span class="totalPages"></span></div>'
    // );
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
    // const pdfOptions = {
    //   format: "A4",
    //   displayHeaderFooter: true,
    //   headerTemplate: "<header>Your Header</header>",
    //   footerTemplate: "<footer>Your Footer</footer>",
    //   margin: {
    //     top: "2cm",
    //     right: "2cm",
    //     bottom: "2cm",
    //     left: "2cm",
    //   },
    // };
    const header =
      '<style>#header, #footer { padding: 0 !important; }</style><div class="header" style="padding: 0 !important; margin: 0; -webkit-print-color-adjust: exact; background-color: red; color: white; width: 100%; text-align: left; font-size: 12px;">header of Juan<br /> Page <span class="pageNumber"></span> of <span class="totalPages"></span></div>';
    const footer =
      '<style>#header, #footer { padding: 0 !important; }</style><div class="footer" style="padding: 0 !important; margin: 0; -webkit-print-color-adjust: exact; background-color: blue; color: white; width: 100%; text-align: right; font-size: 12px;">footer of Juan<br /> Page <span class="pageNumber"></span> of <span class="totalPages"></span></div>';
    const pdfOptions = {
      //path: `result_${type}.pdf`,
      // headerTemplate: "<header>Your Header</header>",
      // footerTemplate: "<footer>Your Footer</footer>",
      // margin: { top: "100px", right: "50px", bottom: "100px", left: "50px" },
      // printBackground: true,
      // displayHeaderFooter: true,
      // headerTemplate: header,
      // footerTemplate: footer,
      // format: "A4",
      format: "A4",
      landscape: false,
      printBackground: true,
      margin: { top: "2cm", bottom: "2cm" },
      displayHeaderFooter: true,
      headerTemplate: header,
      footerTemplate: footer,
    };
    // Generate the PDF
    //const pdfBuffer = await page.pdf({ path: "output.pdf", format: "A4" });
    const pdfBuffer = await page.pdf(pdfOptions);

    // Close the browser
    console.log("PDF created successfully.");
    await browser.close();
    return pdfBuffer;
  } catch (error) {
    console.error("Error:", error);
  }
}

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

module.exports = makePDf;
