import {
  ActivityIndicator,
  Alert,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useLayoutEffect, useState } from "react";
import { Controller, useFieldArray, useForm } from "react-hook-form";
import { useThemeContext } from "../../../hooks/useTheme";
import CustomTextArea from "../../common/CustomResources/CustomTextArea";
import {
  Ionicons,
  Entypo,
  AntDesign,
  FontAwesome,
} from "react-native-vector-icons";
import moment from "moment";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { useTheme } from "react-native-paper";
import { post } from "../../../utils/apis/TeacherApis/login";
import * as DocumentPicker from "expo-document-picker";
import * as FileSystem from "expo-file-system";
import { Buffer } from "buffer";

export default function EditAssignment({ navigation, route }) {
  const Assignmentdata = route?.params?.Assignment;

  const { colors } = useTheme();
  const { theme } = useThemeContext();
  // const [fileName, setFileName] = useState(Assignmentdata?.documents[0]?.label);
  const [fileType, setFileType] = useState(null);
  const [fileUri, setFileUri] = useState(null);
  const TodaysDate = new Date();
  const [submissionDate, setSubmissionDate] = useState(TodaysDate);
  const [isDatePickerVisible, setIsDatePickerVisible] = useState(false);
  const [documents, setDocuments] = useState(Assignmentdata?.documents);
  const [updatedDocs, setUpdatedDocs] = useState([]);
  const [isLoading, setIsloading] = useState(false);

  AWS.config.update({
    accessKeyId: "AKIAZQ3DTDYZMSHJC7JR",
    secretAccessKey: "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",
    region: "ap-south-1",
  });

  const s3 = new AWS.S3();

  console.log(`Assignmentdata Update`, Assignmentdata);

  console.log(`documents`, documents);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Entypo
            name="chevron-thin-left"
            size={25}
            color={theme.secondaryTextColor}
            style={{ marginLeft: 10 }}
          />
        </TouchableOpacity>
      ),

      headerTitle: () => (
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <Text
            style={{
              color: theme.primaryTextColor,
              fontSize: 18,
              fontWeight: "bold",
              textAlign: "center",
            }}
          >
            Edit Assignment
          </Text>
        </View>
      ),

      headerRight: () => (
        <TouchableOpacity
          style={{ marginRight: 10 }}
          onPress={() => {
            navigation.navigate("Notification");
          }}
        >
          <Ionicons
            name="notifications"
            size={20}
            color={theme.secondaryTextColor}
          />
        </TouchableOpacity>
      ),
      headerStyle: {
        backgroundColor: theme.backgroundColor,
      },
      headerTitleAlign: "center",
      headerTintColor: theme.backgroundColor,
    });
  }, [navigation, theme]);

  //   const {
  //     control,
  //     handleSubmit,
  //     formState: { errors },
  //   } = useForm();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: Assignmentdata?.name,
      name: Assignmentdata?.name || "",
      instructions: Assignmentdata?.instructions || [""],
      resources: Assignmentdata?.resources || [""],
    },
  });

  const onSubmit = async (data) => {
    console.log(`submittedData`, data);

    try {
      setIsloading(true);
      // const formData = new FormData();

      console.log(`Add Assignment Data`, data);
      console.log(`date`, submissionDate);

      const UploadDocumentTos3 = async () => {
        try {
          // const uploadTasks = updatedDocs.map(async (document) => {
          //   const fileContents = await FileSystem.readAsStringAsync(
          //     document.uri,
          //     {
          //       encoding: FileSystem.EncodingType.Base64,
          //     }
          //   );

          //   const buffer = Buffer.from(fileContents, "base64");

          //   const params = {
          //     Bucket: "edba-dev-bucket",
          //     Key: `Assignments/${document.name}`,
          //     Body: buffer,
          //     ContentType: document.mimeType,
          //   };

          //   const uploadedDocument = await s3.upload(params).promise();

          //   console.log(
          //     "Document uploaded successfully:",
          //     uploadedDocument.Key
          //   );

          //   return {
          //     key: uploadedDocument.Key,
          //     url: uploadedDocument.Location,
          //     label: document.name,
          //   };
          // });
          const uploadTasks = updatedDocs.map(async (document) => {
            let fileContents;
            let tempUri = document?.uri;

            if (document?.uri.startsWith("content://")) {
              // Handle content URI
              const fileInfo = await FileSystem.getInfoAsync(document.uri);
              if (!fileInfo.exists) {
                throw new Error(`File does not exist: ${document.uri}`);
              }

              // Copy content URI to a temporary file
              const tempFileUri = FileSystem.documentDirectory + document.name;
              await FileSystem.copyAsync({
                from: document.uri,
                to: tempFileUri,
              });
              tempUri = tempFileUri;
            }

            // Read the file from either the original URI or the temporary URI
            fileContents = await FileSystem.readAsStringAsync(tempUri, {
              encoding: FileSystem.EncodingType.Base64,
            });

            const buffer = Buffer.from(fileContents, "base64");
            const params = {
              Bucket: "edba-dev-bucket",
              Key: `Assignments/${document.name}`,
              Body: buffer,
              ContentType: document.mimeType,
            };

            const uploadedDocument = await s3.upload(params).promise();

            console.log(
              "Document uploaded successfully:",
              uploadedDocument.Key
            );

            return {
              key: uploadedDocument.Key,
              url: uploadedDocument.Location,
              label: document.name,
            };
          });

          const uploadedDocuments = await Promise.all(uploadTasks);
          return uploadedDocuments;
        } catch (error) {
          setIsloading(false);
          console.error("Error uploading documents:", error);
          Alert.alert("Upload Failed", "Error uploading documents");
          throw error; // Throw the error to handle it further if needed
        } finally {
          setIsloading(false);
        }
      };

      const docs = await UploadDocumentTos3();
      console.log(`docs`, docs);
      console.log(`updatedDocs`, updatedDocs);
      console.log(`combine Docs`, [...docs, updatedDocs]);

      try {
        const postData = {
          id: Assignmentdata?.id,
          ...data,
          submissionDate: submissionDate,
          documents: [...docs, ...updatedDocs],
        };
        console.log(`Submitted Assignment data`, postData);

        const response = await post("assignments/update", postData);
        if (response?.errCode == -1) {
          Alert.alert("Assignment Updated Successfully");
          navigation.navigate("Assignments");
        } else {
          Alert.alert(
            response?.errMsg
              ? JSON.stringify(response?.errMsg)
              : "Error creating assignment"
          );
        }
      } catch (error) {
        console.log(error);
        setIsloading(false);
      } finally {
        setIsloading(false);
      }

      // Alert.alert(JSON.stringify(data));

      // const UploadDocumentTos3 = async (document) => {
      //   try {
      //     const fileContents = await FileSystem.readAsStringAsync(
      //       document?.uri,
      //       {
      //         encoding: FileSystem.EncodingType.Base64,
      //       }
      //     );

      //     const buffer = Buffer.from(fileContents, "base64");

      //     const params = {
      //       Bucket: "edba-dev-bucket",
      //       Key: `Assignments/${document?.name}`,
      //       Body: buffer,
      //       ContentType: document?.mimeType,
      //     };

      //     var uploadedDocument = await s3.upload(params).promise(); // Wait for the upload to complete
      //     return {
      //       key: uploadedDocument.Key,
      //       url: uploadedDocument.Location,
      //       label: document.name,
      //     };

      //     console.log("Document uploaded successfully:", Document.Key);

      //     // Alert.alert("Upload Successful", `Document URL: ${Document.Location}`);

      //     // Optionally, send the document link to your API
      //     // await axios.post('http://your-api-url/receive-document-link', {
      //     //   fileUrl: data.Location,
      //     // });

      //     // return data.Location;
      //   } catch (error) {
      //     console.error("Error uploading document:", error);
      //     Alert.alert("Upload Failed", "Error uploading document");
      //     throw error; // Throw the error to handle it further if needed
      //   }
      // };

      // };

      // try {
      //   const postData = {
      //     ...data,
      //     teacher: TeacherId,
      //     submissionDate: submissionDate,
      //     documents: [
      //       {
      //         key: Document?.Key,
      //         url: Document?.Location,
      //         label: fileName,
      //       },
      //     ],
      //   };
      //   console.log(`Submitted Assignment data`, postData);

      //   const response = await post("assignments/create", postData);
      //   if (response?.errCode == -1) {
      //     Alert.alert("Assignment Created Successfully");
      //     navigation.navigate("Assignments");
      //   } else {
      //     Alert.alert(
      //       response?.errMsg
      //         ? JSON.stringify(response?.errMsg)
      //         : "Error creating assignment"
      //     );
      //   }
      // } catch (error) {
      //   console.log(error);
      // }

      // formData.append("file", {
      //   uri: fileUri,
      //   type: fileType,
      //   name: fileName,
      // });
      // formData.append("className", data.className);
      // formData.append("subject", data.subject);
      // formData.append("topic", data.topic);
      // formData.append("instructions", data.instructions);
      // formData.append("resources", data.resources);
      // formData.append("teacherId", "66717b8653d55c5bfda2e99f");
      // console.log(`FormmmDaatatata`, formData);

      // const postData = { ...data, teacherId: "66717b8653d55c5bfda2e99f" };
      // const response = await post("assignments", formData);

      // const formDataObject = {};
      // for (let pair of formData._parts) {
      //   const key = pair[0];
      //   const value = pair[1];
      //   formDataObject[key] = value;
      // }

      // console.log("FormDataObject:", formDataObject);

      // api calling
      // try {
      //   const postData = {
      //     ...data,
      //     teacher: TeacherId,
      //     submissionDate: submissionDate,
      //   };
      //   console.log(`data`, post);

      //   const response = await post("assignments/create", postData);
      //   if (response?.errCode == -1) {
      //     Alert.alert("Assignment Created Successfully");
      //     navigation.navigate("Assignments");
      //   } else {
      //     Alert.alert(
      //       response?.errMsg
      //         ? JSON.stringify(response?.errMsg)
      //         : "Error creating assignment"
      //     );
      //   }
      // } catch (error) {
      //   console.log(error);
      // }

      // if (response.success == true) {
      //   Alert.alert("Success", "Assignment submitted successfully!");
      // } else {
      //   Alert.alert("Error", " There was an error submitting the assignment.");
      // }
    } catch (error) {
      console.error(`catched error`, error);
      Alert.alert("Error", "There was an error submitting the assignment.");
    }

    // const response = await post("assignments/update", {
    //   id: Assignmentdata?.id,
    //   ...data,
    //   submissionDate: submissionDate,
    // });
    // if (response?.errCode == -1) {
    //   Alert.alert("Assignment Updated successfullt");
    //   //   navigation.navigate("Assignments");
    //   navigation.goBack();
    // } else {
    //   Alert.alert("Error While Updating Assignment");
    // }
    // console.log(`Updated Response `, response);
  };

  const removeUpdatedFile = (index) => {
    setUpdatedDocs((prevDocs) => prevDocs.filter((_, i) => i !== index));
  };
  const removeFile = (index) => {
    setDocuments((prevDocs) => prevDocs.filter((_, i) => i !== index));
  };
  const pickFile = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: "*/*", // all files
        copyToCacheDirectory: false,
      });

      if (result.type !== "cancel") {
        const { uri, mimeType, name } = result.assets[0];
        setUpdatedDocs((prevDocs) => [...prevDocs, { uri, mimeType, name }]);
      } else {
        console.log("User cancelled the picker");
      }
    } catch (error) {
      console.log("Error picking file", error);
      Alert.alert("Error", "Could not pick the document");
    }
  };

  // const pickFile = async () => {
  //   try {
  //     const result = await DocumentPicker.getDocumentAsync({
  //       type: "*/*", // all files
  //       copyToCacheDirectory: false,
  //     });

  //     console.log(`result`, result);

  //     if (result.type !== "cancel") {
  //       // Check if user didn't cancel
  //       console.log("Result:", result);

  //       const { uri, mimeType, name } = result.assets[0];

  //       // const fileInfo = await FileSystem.getInfoAsync(uri);
  //       // console.log(`fileInfo.uri`, fileInfo);
  //       // console.log(`URLIMage`, URLIMage);
  //       console.log("URI:", uri);
  //       console.log("Type:", mimeType);
  //       console.log("Name:", name);

  //       setFileUri(uri);
  //       setFileType(mimeType);
  //       setFileName(name);
  //     } else {
  //       console.log("User cancelled the picker");
  //     }
  //   } catch (error) {
  //     console.log("Error picking file", error);
  //   }
  // };
  const {
    fields: instructionFields,
    append: appendInstruction,
    remove: removeInstruction,
  } = useFieldArray({
    control,
    name: "instructions",
  });

  const {
    fields: resourceFields,
    append: appendResource,
    remove: removeResource,
  } = useFieldArray({
    control,
    name: "resources",
  });

  const hideDatePicker = () => {
    setIsDatePickerVisible(false);
  };

  const handleDateConfirm = (date) => {
    setSubmissionDate(moment(date).format("YYYY-MM-DD"));
    setIsDatePickerVisible(false);
  };

  return (
    <SafeAreaView
      style={{
        width: "100%",
        height: "100%",
        backgroundColor: theme.backgroundColor,
      }}
    >
      <ScrollView>
        <View style={{ margin: 20 }}>
          <View>
            <Text
              style={{
                paddingTop: 10,
                marginBottom: 5,
                fontSize: 14,
                fontWeight: "600",
                color: theme.primaryTextColor,
              }}
            >
              Assignment Topic
            </Text>
            <Controller
              control={control}
              rules={{ required: true }}
              render={({ field: { onChange, value } }) => (
                <TextInput
                  style={[
                    {
                      borderBottomWidth: 1,
                      borderColor: `${theme.secondaryTextColor}80`,
                    },
                    errors.name && {
                      borderColor: "red",
                    },
                  ]}
                  onChangeText={onChange}
                  value={value}
                  placeholder="Enter Assignment topic here"
                  placeholderTextColor={`${theme.secondaryTextColor}`}
                />
              )}
              name="name"
              defaultValue=""
            />
            {errors.name && (
              <Text
                style={{
                  color: "red",
                  marginBottom: 10,
                }}
              >
                This field is required
              </Text>
            )}

            <Text
              style={{
                paddingTop: 10,
                marginBottom: 5,
                fontSize: 14,
                fontWeight: "600",
                color: theme.primaryTextColor,
              }}
            >
              Instructions :
            </Text>
            {instructionFields.map((field, index) => (
              <View
                key={field.id}
                style={{ flexDirection: "row", alignItems: "center" }}
              >
                <Controller
                  control={control}
                  rules={{ required: true }}
                  render={({ field: { onChange, value } }) => (
                    <TextInput
                      style={[
                        {
                          borderBottomWidth: 1,
                          borderColor: `${theme.secondaryTextColor}80`,
                          flex: 1,
                        },
                        errors.instructions && {
                          borderColor: "red",
                        },
                      ]}
                      onChangeText={onChange}
                      value={value}
                      placeholder="Enter instruction here"
                      placeholderTextColor={`${theme.secondaryTextColor}`}
                    />
                  )}
                  name={`instructions.${index}`}
                />
                <TouchableOpacity onPress={() => removeInstruction(index)}>
                  <Ionicons
                    name="remove-circle-outline"
                    size={24}
                    color="red"
                  />
                </TouchableOpacity>
              </View>
            ))}
            <TouchableOpacity onPress={() => appendInstruction("")}>
              <Text style={{ color: theme.primarycolor }}>Add Instruction</Text>
            </TouchableOpacity>
            {errors.instructions && (
              <Text
                style={{
                  color: "red",
                  marginBottom: 10,
                }}
              >
                This field is required
              </Text>
            )}
            {/* <Controller
              control={control}
              rules={{ required: true }}
              render={({ field: { onChange, value } }) => (
                <TextInput
                  style={[
                    {
                      borderBottomWidth: 1,
                      borderColor: `${theme.secondaryTextColor}80`,
                    },
                    errors.name && {
                      borderColor: "red",
                    },
                  ]}
                  onChangeText={onChange}
                  value={value}
                  placeholder="Enter Assignment topic here"
                  placeholderTextColor={`${theme.secondaryTextColor}`}
                />
                // <CustomTextArea
                //   value={value}
                //   onChangeText={onChange}
                //   placeholder="Enter resources here"
                //   numberOfLines={3}
                // />
              )}
              name="instructions"
              defaultValue=""
            />
            {errors.instructions && (
              <Text
                style={{
                  color: "red",
                  marginBottom: 10,
                }}
              >
                This field is required
              </Text>
            )} */}

            <Text
              style={{
                paddingTop: 10,
                marginBottom: 5,
                fontSize: 14,
                fontWeight: "600",
                color: theme.primaryTextColor,
              }}
            >
              Resources :
            </Text>
            {resourceFields.map((field, index) => (
              <View
                key={field.id}
                style={{ flexDirection: "row", alignItems: "center" }}
              >
                <Controller
                  control={control}
                  rules={{ required: true }}
                  render={({ field: { onChange, value } }) => (
                    <TextInput
                      style={[
                        {
                          borderBottomWidth: 1,
                          borderColor: `${theme.secondaryTextColor}80`,
                          flex: 1,
                        },
                        errors.resources && {
                          borderColor: "red",
                        },
                      ]}
                      onChangeText={onChange}
                      value={value}
                      placeholder="Enter resource here"
                      placeholderTextColor={`${theme.secondaryTextColor}`}
                    />
                  )}
                  name={`resources.${index}`}
                />
                <TouchableOpacity onPress={() => removeResource(index)}>
                  <Ionicons
                    name="remove-circle-outline"
                    size={24}
                    color="red"
                  />
                </TouchableOpacity>
              </View>
            ))}
            <TouchableOpacity onPress={() => appendResource("")}>
              <Text style={{ color: theme.primarycolor }}>Add Resource</Text>
            </TouchableOpacity>
            {errors.resources && (
              <Text
                style={{
                  color: "red",
                  marginBottom: 10,
                }}
              >
                This field is required
              </Text>
            )}
          </View>
          <View
            style={{
              marginRight: 10,
              marginTop: 10,
            }}
          >
            <ScrollView style={{ marginTop: 20 }}>
              {documents.length > 0 &&
                documents.map((file, index) => (
                  <View
                    key={index}
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      justifyContent: "space-between",
                      alignItems: "center",
                      backgroundColor: "#EAF1FA",
                      padding: 10,
                      borderRadius: 5,
                      marginBottom: 10,
                    }}
                  >
                    <Text style={{ color: "#666666", flex: 1 }}>
                      {file.label ? file?.label : file?.name}
                    </Text>
                    <TouchableOpacity onPress={() => removeFile(index)}>
                      <FontAwesome name="trash" size={16} color="red" />
                    </TouchableOpacity>
                  </View>
                ))}
              {updatedDocs.length > 0 &&
                updatedDocs.map((file, index) => (
                  <View
                    key={index}
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      justifyContent: "space-between",
                      alignItems: "center",
                      backgroundColor: "#EAF1FA",
                      padding: 10,
                      borderRadius: 5,
                      marginBottom: 10,
                    }}
                  >
                    <Text style={{ color: "#666666", flex: 1 }}>
                      {file.label ? file?.label : file?.name}
                    </Text>
                    <TouchableOpacity onPress={() => removeUpdatedFile(index)}>
                      <FontAwesome name="trash" size={16} color="red" />
                    </TouchableOpacity>
                  </View>
                ))}
            </ScrollView>
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "flex-end",
                marginRight: 10,
                marginTop: 10,
              }}
            >
              <TouchableOpacity
                onPress={pickFile}
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "center",
                  alignItems: "center",
                  backgroundColor: "#EAF1FA",
                  width: "50%",
                  height: 40,
                  borderRadius: 5,
                  gap: 4,
                }}
              >
                <FontAwesome name="upload" size={16} color="#666666" />
                <Text style={{ color: theme.primaryTextColor }}>
                  Add Document
                </Text>
              </TouchableOpacity>
            </View>
          </View>

          <View>
            <Text>Submission Date</Text>
          </View>
          <View
            style={{
              flexDirection: "row",
              // alignItems: "flex-end",
              // justifyContent: "flex-end",
              width: "100%",
            }}
          >
            <TouchableOpacity
              onPress={() => setIsDatePickerVisible(true)}
              style={{
                borderWidth: 1,
                borderColor: theme.secondaryTextColor,
                borderRadius: 5,
                marginBottom: 30,
                marginTop: 16,
              }}
            >
              <View
                style={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                  width: "100%",
                  height: 36,
                  paddingHorizontal: 10,
                }}
              >
                <Text
                  style={{
                    fontSize: 12,
                    color: theme.primaryTextColor,
                    marginRight: 8,
                  }}
                >
                  {moment(submissionDate).format("D MMM YYYY")}
                </Text>
                <AntDesign
                  name="calendar"
                  size={18}
                  color={theme.primaryTextColor}
                />
              </View>
            </TouchableOpacity>
          </View>
          <View
            style={{
              marginTop: 10,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {/* <Button title="Submit" onPress={handleSubmit(onSubmit)} /> */}
            <TouchableOpacity
              style={{
                width: "90%",
                height: 40,
                backgroundColor: theme.primarycolor,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                borderRadius: 7,
              }}
              onPress={handleSubmit(onSubmit)}
            >
              <Text style={{ color: "#FFFFFF" }}>
                {isLoading ? <ActivityIndicator size={"large"} /> : "UPDATE"}
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        <DateTimePickerModal
          isVisible={isDatePickerVisible}
          mode="date"
          textColor={colors.text}
          minimumDate={new Date()}
          date={submissionDate ? new Date(submissionDate) : new Date()}
          onConfirm={handleDateConfirm}
          onCancel={hideDatePicker}
        />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({});
