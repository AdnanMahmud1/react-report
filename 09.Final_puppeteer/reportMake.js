const puppeteer = require("puppeteer");
const hbs = require("handlebars");
const fs = require("fs-extra");
const path = require("path");

const processHtml = async function (templateName, data) {
  const filePath = path.join(process.cwd(), "public", `${templateName}.hbs`);
  const html = await fs.readFile(filePath, "utf8");
  return hbs.compile(html)(data);
};
const currentDate = new Date().toLocaleDateString();
const headerTemp =
  '<div style="font-size: 12px; text-align: center; padding: 10px;">Research and Innovation Centre </div>';
  const riseHeader = `<div>
        <div class="row">
            <div class="col-md-12" style="border-bottom: #780e50 2px solid">
                <table class="table borderless">
                    <tr>

                        <td>
                            <div align="right" style="padding-top: 10px;background: white">
                                <img src="./logoBIRN.png" style="height: 85px; width: 85px;" />
                            </div>
                        </td>
                        <td>
                            <h5 style="padding-top: 10px; font-size: 30px;color: #780e29">
                                Bangladesh University of Engineering and Technology
                                <br />
                                <small style="font-size: 20px; color: #021f7c">
                                    Research and Innovation Centre for Science and Engineering (RISE)
                                </small>
                            </h5>
                        </td>
                    </tr>
                </table>
            </div>
            @*<div class="col-md-4">
                <div style="border-bottom: #780e50 2px solid">
                    <div class="pull-right"><i style="font-size: 15px" class="fa fa-clock"></i>&nbsp;Printed  ${currentDate} &nbsp;<i class="fa fa-list" aria-hidden="true"></i>&nbsp; Page <span class="page"></span>of <span class="topage"></span></div>
                </div>
            </div>*@
        </div>
    </div>`;
const footerTemp =
  '<div style="font-size: 10px; text-align: center; padding: 10px;"><span class="pageNumber"></span>/<span class="totalPages"></span></div>';

const makeReport = async (reportData) => {
  try {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    const printObj = {
      title: "Person List",
      list: reportData,
      currentDate,
    };
    const content = await processHtml("index", printObj);

    await page.setContent(content, { waitUntil: "networkidle0" });
    const pdfBuffer = await page.pdf({
      //path: "output.pdf",
      format: "A4",
      printBackground: true,
      landscape: false,
      margin: { top: "3cm", bottom: "2cm" },
      displayHeaderFooter: true,
      headerTemplate: headerTemp,
      footerTemplate: footerTemp,
    });
    console.log("Done PDF");
    await browser.close();
    //process.exit();
    return pdfBuffer;
  } catch (e) {
    console.log(e);
  }
};

module.exports = makeReport;
