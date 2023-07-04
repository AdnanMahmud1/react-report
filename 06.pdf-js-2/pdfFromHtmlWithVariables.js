const { PDFDocument, StandardFonts } = require("pdf-lib");
const fs = require("fs");

async function generatePDFFromHTML(htmlTemplatePath, variables) {
  const htmlTemplate = fs.readFileSync(htmlTemplatePath, "utf-8");

  // Replace variables in the HTML template
  let substitutedHTML = htmlTemplate;
  for (const variable in variables) {
    const placeholder = `{{${variable}}}`;
    substitutedHTML = substitutedHTML.replace(
      new RegExp(placeholder, "g"),
      variables[variable]
    );
  }

  // Create a new PDF document
  const pdfDoc = await PDFDocument.create();

  // Embed the standard Helvetica font
  const font = await pdfDoc.embedFont(StandardFonts.Helvetica);

  // Add a new page
  const page = pdfDoc.addPage();

  // Set the font and font size
  page.setFont(font);
  page.setFontSize(12);

  // Draw the substituted HTML content on the page
  page.drawHTML(substitutedHTML, { x: 50, y: page.getHeight() - 50 });

  // Serialize the PDF document
  const pdfBytes = await pdfDoc.save();

  return pdfBytes;
}

// Usage example
const htmlTemplatePath = "path/to/template.html";
const variables = {
  name: "John Doe",
  age: 30,
  email: "johndoe@example.com",
};
generatePDFFromHTML(htmlTemplatePath, variables)
  .then((pdfBytes) => {
    // Do something with the PDF bytes (e.g., save to a file or send as a response)
    fs.writeFileSync("output.pdf", pdfBytes);
    console.log("PDF generated successfully!");
  })
  .catch((error) => {
    console.error("Error generating PDF:", error);
  });


//   In this updated example, the generatePDFFromHTML function takes an additional variables parameter, which is an object containing key-value pairs for variable substitution. It replaces occurrences of placeholders (e.g., {{name}}, {{age}}, {{email}}) in the HTML template with their corresponding values.