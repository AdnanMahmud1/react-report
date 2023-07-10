const puppeteer = require("puppeteer");
const fs = require("fs");
const Handlebars = require("handlebars");
const path = require("path");

async function generatePDF() {
  // Compile the Handlebars template

  const headerTemplate = Handlebars.compile(
    fs.readFileSync(path.join(__dirname, "public/header.html"), "utf-8")
  );
  const mainTemplate = Handlebars.compile(
    fs.readFileSync(path.join(__dirname, "public/body.html"), "utf-8")
  );

const data = {
  title: "My PDF",
  content: "This is the content of my PDF!",
  logo: "https://www.buet.ac.bd/web/assets/img/BImages/logoBIRN.png",
  logo1: "./images/logoBIRN.png",
  logo2: "/images/logoBIRN.png",
  logo3: "images/logoBIRN.png",
  logo4: "./public/images/logoBIRN.png",
  logo5: path.join(__dirname, "public/images/logoBIRN.png"),
  logo6: path.join(__dirname, "/public/images/logoBIRN.png"),
  logo7: path.join(__dirname, "./public/images/logoBIRN.png"),
  //logo8: base64img.base64Sync("./public/images/logoBIRN.png"),
};

const headerHtml = headerTemplate(data);
const mainHtml = mainTemplate(data);

const html = headerHtml + mainHtml;

  // Launch a headless Chrome browser with Puppeteer
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  // Set the HTML content of the page
  await page.setContent(html, { waitUntil: "networkidle0" } );

  // Generate the PDF
  await page.pdf({ path: "output.pdf", format: "A4" });

  // Close the browser
  await browser.close();

  console.log("PDF generated successfully!");
}

generatePDF();
