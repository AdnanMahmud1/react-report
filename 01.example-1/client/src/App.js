import "./App.css";
import axios from "axios";
import { saveAs } from "file-saver";
import react, {useState} from 'react'

 const intitialValue = {
   name: "",
   receiptId: 0,
   price1: 0,
   price2: 0,
 };


function App() {

const [values, setValues] = useState(intitialValue);

const handleChange =(e) => {
  const {name, value} = e.target;
  setValues({
    ...values,
    [name]: value,
  })
}

  const createAndDownloadPdf =() => {
    axios.post('/create-pdf', values).then(() => axios.get("/fetch-pdf", {responseType: 'blob'}))
    .then((res)=>{
     const pdfBlob = new Blob([res.data], {type: 'applcation/pdf'})


     saveAs(pdfBlob, 'newPdf.pdf')
    })
  }

  return (
    <div className="App">
      <input
        type="text"
        placeholder="name"
        name="name"
        value={values.name}
        onChange={handleChange}
      />
      <input
        type="number"
        placeholder="Receipt ID"
        name="receiptId"
        value={values.receiptId}
        onChange={handleChange}
      />
      <input
        type="number"
        placeholder="Price 1"
        name="price1"
        value={values.price1}
        onChange={handleChange}
      />
      <input
        type="number"
        placeholder="price2"
        name="price2"
        value={values.price2}
        onChange={handleChange}
      />
      <button onClick={createAndDownloadPdf}>Download PDF</button>
    </div>
  );
}

export default App;
