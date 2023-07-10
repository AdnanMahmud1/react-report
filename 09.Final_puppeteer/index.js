const puppeteer = require("puppeteer");
const hbs = require("handlebars");
const fs = require("fs-extra");
const path = require("path");
const { personListLong, personListShort } = require("./peronList");

//compile the hbs to pdf

const compile = async function (templateName, data) {
  const filePath = path.join(process.cwd(), "template", `${templateName}.hbs`);
  //get the html
  const html = await fs.readFile(filePath, "utf8");
  return hbs.compile(html)(data);
};

const headerTemp =
  '<div style="font-size: 12px; text-align: center; padding: 10px;">Header Content</div>';
const footerTemp =
  '<div style="font-size: 10px; text-align: center; padding: 10px;"><span class="pageNumber"></span>/<span class="totalPages"></span></div>';
(async function () {
  try {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    const printObj = {
      title: "Person List",
      list: personListLong,
    };
    const content = await compile("index", printObj);

    await page.setContent(content, { waitUntil: "networkidle0" });
    //create a pdf document
    await page.pdf({
      path: "output.pdf",
      format: "A4",
      printBackground: true,
      margin: { top: "5cm", bottom: "5cm" },
      displayHeaderFooter: true,
      headerTemplate: headerTemp,
      footerTemplate: footerTemp,
    });
    console.log("Done PDF");
    await browser.close();
    process.exit();
  } catch (e) {
    console.log(e);
  }
})();
