import "./App.css";
import React, { useState } from "react";
import {
  BlobProvider,
  Document,
  Page,
  StyleSheet,
  Text,
  View,
} from "@react-pdf/renderer";
import PSPDFKit from "./PSPDFKit";

import "./styles.css";

const styles = StyleSheet.create({
  page: {
    flexDirection: "row",
    backgroundColor: "#E4E4E4",
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1,
  },
});
const MyDocument = (
  <Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.section}>
        <Text>Hello World!</Text>
      </View>
      <View style={styles.section}>
        <Text>We're inside a PDF!</Text>
      </View>
    </Page>
  </Document>
);

function App() {
  return (
    <div className="App">
      <BlobProvider document={MyDocument}>
        {({ blob, url, loading, error }) => {
          if (blob) {
            return <PSPDFKit blob={blob} />;
          }

          if (error) {
            return error;
          }

          return <div>The PDF is rendering...</div>;
        }}
      </BlobProvider>
    </div>
  );
}

export default App;
