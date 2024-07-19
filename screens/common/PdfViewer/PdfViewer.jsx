import React from "react";
import { Dimensions, Text, TouchableOpacity } from "react-native";
import { View, StyleSheet, ActivityIndicator } from "react-native";
import { WebView } from "react-native-webview";
import { AntDesign } from "react-native-vector-icons";
// import PdfReader from "rn-pdf-reader-js";

const PdfViewer = ({ uri }) => {
  const pdfurll =
    "https://docs.aws.amazon.com/pdfs/code-samples/latest/catalog/code-sample-catalog.pdf";

  const source = { uri: pdfurll, caches: true };
  console.log(`uri`, uri);

  const htmlContent = `
  <!DOCTYPE html>
  <html>
    <head>
      <title>PDF Viewer</title>
      <style>
        body, html {
          margin: 0;
          padding: 0;
          height: 100%;
          display: flex;
          justify-content: center;
          align-items: center;
          background-color: #fff;
        }
        iframe {
          width: 100%;
          height: 100%;
          border: none;
        }
      </style>
    </head>
    <body>
      <iframe src="${uri}" type="application/pdf"></iframe>
    </body>
  </html>
`;

  return (
    // <View style={styles.container}>
    //   <View style={styles.header}>
    //     {/* <TouchableOpacity onPress={onBack}>
    //       <AntDesign name="arrowleft" size={24} color="black" />
    //     </TouchableOpacity> */}
    //     <Text style={styles.headerTitle}>PDF Viewer</Text>
    //   </View>
    //   <WebView
    //     originWhitelist={["*"]}
    //     source={{ html: htmlContent }}
    //     style={styles.webview}
    //     startInLoadingState={true}
    //     renderLoading={() => (
    //       <View style={styles.loadingContainer}>
    //         <ActivityIndicator size="large" color="#0000ff" />
    //       </View>
    //     )}
    //   />
    // </View>
    <View style={styles.container}>
      <WebView
        source={{ uri: pdfurll }}
        style={styles.webview}
        startInLoadingState={true}
        renderLoading={() => (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color="#0000ff" />
          </View>
        )}
      />
    </View>
    // <View style={styles.container}>
    //   <PdfReader
    //     source={{
    //       uri: pdfurll,
    //     }}
    //     withPinchZoom={true}
    //     onLoad={() => console.log("PDF loaded successfully")}
    //     onError={(error) => console.log("Error loading PDF:", error)}
    //   />
    // </View>
  );
};

const styles = StyleSheet.create({
  // container: {
  //   flex: 1,
  // },
  // loading: {
  //   position: "absolute",
  //   top: "50%",
  //   left: "50%",
  // },

  container: {
    flex: 1,
    backgroundColor: "#fff",
    width: "100%",
    height: "100%",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginLeft: 8,
  },
  webview: {
    flex: 1,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  // container: {
  //   flex: 1,
  //   justifyContent: "flex-start",
  //   alignItems: "center",
  //   marginTop: 25,
  // },
  // pdf: {
  //   flex: 1,
  //   width: Dimensions.get("window").width,
  //   height: Dimensions.get("window").height,
  // },
});

export default PdfViewer;

// <View style={styles.container}>
//   <Pdf
//     source={source}
//     onLoadComplete={(numberOfPages, filePath) => {
//       console.log(`Number of pages: ${numberOfPages}`);
//     }}
//     onPageChanged={(page, numberOfPages) => {
//       console.log(`Current page: ${page}`);
//     }}
//     onError={(error) => {
//       console.log(error);
//     }}
//     style={styles.pdf}
//   />
// </View>
