const puppeteer = require("puppeteer");
const hbs = require("handlebars");
const fs = require("fs-extra");
const path = require("path");
const data = require("./data.json");

//compile the hbs to pdf

const compile = async function (templateName, data) {
  const filePath = path.join(process.cwd(), "template", `${templateName}.hbs`);
  //get the html
  const html = await fs.readFile(filePath, "utf8");
  return hbs.compile(html)(data);
};

(async function () {
  try {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    // const content = await page.setContent(
    //   "<div><table><tr><td>Hi dear <img  src='i' alt='My_Logo'></td></tr></table></div>"
    // );
    const content = await compile("index", data);
    await page.setContent(content);
    //create a pdf document
    await page.pdf({
      path: "output.pdf",
      format: "A4",
      printBackground: true,
    });
    console.log("Done PDF");
    await browser.close();
    process.exit();
  } catch (e) {
    console.log(e);
  }
})();
