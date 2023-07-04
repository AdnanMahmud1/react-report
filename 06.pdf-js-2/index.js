const express = require("express");
const cors = require("cors");
const { default: getPdf } = require("./report1");

const app = express();

const port = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//Post -route
app.post("/create-pdf", (req, res) => {
  getPdf();
  // pdf.create(pdfTemplate(req.body), {}).toFile("result.pdf", (err) => {
  //   if (err) {
  //     res.send(Promise.reject());
  //   }
  //   res.send(Promise.resolve());
  // });
});

//Get requets
app.get("/fetch-pdf", (req, res) => {
  res.sendFile(`${__dirname}/result.pdf`);
});

app.listen(port, () => {
  console.log(`Server started on port: ${port}`);
});
