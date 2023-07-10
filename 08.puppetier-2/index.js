const puppeteer = require('puppeteer');

const createPdf=async()=>{
  const browser=await puppeteer.launch()
  const page=await browser.newPage()
  const options=
  {
    path:'pdf/web.pdf',
    format:'A4',
  }
  page.goto('https://paulhalliday.io',{waitUntil:'networkidle2'});
  await page.pdf(options);
  await browser.close()
}
createPdf();