import React, { useEffect, useLayoutEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Button,
  StyleSheet,
  Alert,
  ScrollView,
} from "react-native";
import { useForm, Controller, useFieldArray } from "react-hook-form";
import axios from "axios";
import {
  Ionicons,
  Entypo,
  AntDesign,
  FontAwesome,
} from "react-native-vector-icons";
import Icon from "react-native-vector-icons/Ionicons";
import RNPickerSelect from "react-native-picker-select";
import CustomTextArea from "../../common/CustomResources/CustomTextArea";
import { post } from "../../../utils/apis/TeacherApis/login";
// import { getDocumentAsync } from "expo-document-picker";
import * as DocumentPicker from "expo-document-picker";
// import * as FileSystem from "expo-file-system";
// import { theme } from "../../../theming";
import { useIsFocused, useNavigation } from "@react-navigation/native";
import { useThemeContext } from "../../../hooks/useTheme";
import { S3 } from "aws-sdk";
import * as FileSystem from "expo-file-system";
import { useSelector } from "react-redux";
import moment from "moment";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { useTheme } from "react-native-paper";
import { Buffer } from "buffer";
// import RNFetchBlob from "rn-fetch-blob";

// import { Picker } from "@react-native-picker/picker";
const classesData = [
  { label: "FYJC-11A", value: "FYJC-11A" },
  { label: "FYJC-11B", value: "FYJC-11B" },
];
const subjectsOfTeacher = [
  { label: "Biology", value: "Biology" },
  { label: "Calculus", value: "Calculus" },
  { label: "Chemistry", value: "Chemistry" },
  { label: "Algebra", value: "Algebra" },
];

export default function AddAssignment() {
  const { theme } = useThemeContext();
  const { colors } = useTheme();
  const navigation = useNavigation();
  const [classes, setClasses] = useState([]);
  const [subjectList, setSubjectList] = useState([]);
  const [isDatePickerVisible, setIsDatePickerVisible] = useState(false);
  const TodaysDate = new Date();
  const [submissionDate, setSubmissionDate] = useState(TodaysDate);
  const [fileUri, setFileUri] = useState(null);
  const [fileType, setFileType] = useState(null);
  const [fileName, setFileName] = useState(null);
  const [deductionMarks, setDeductionMarks] = useState(0);
  const user = useSelector((state) => state.login.user);
  const TeacherId = user?.teacherId;
  const isFocused = useIsFocused();

  const bucketName = "edba-dev-bucket";
  const folderName = "Assignments";

  AWS.config.update({
    accessKeyId: "AKIAZQ3DTDYZMSHJC7JR",
    secretAccessKey: "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",
    region: "ap-south-1",
  });

  const s3 = new AWS.S3();

  const acceptableFileTypes = ["application/pdf", "image/*"];

  useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <TouchableOpacity onPress={() => navigation.openDrawer()}>
          <Icon
            name="menu"
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
            Assignments
          </Text>
        </View>
      ),

      headerRight: () => (
        <View style={{ marginRight: 10 }}>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("Assignments");
            }}
          >
            <Entypo name="cross" size={24} color={theme.secondaryTextColor} />
          </TouchableOpacity>
        </View>
      ),
      headerStyle: {
        backgroundColor: theme.backgroundColor,
      },
      headerTitleAlign: "center",
      headerTintColor: "#000000",
    });
  }, [navigation, theme]);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();

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

  const onSubmit = async (data) => {
    try {
      // const formData = new FormData();

      console.log(`Add Assignment Data`, data);
      console.log(`date`, submissionDate);
      // Alert.alert(JSON.stringify(data));

      const UploadDocumentTos3 = async () => {
        // const s3 = new S3({
        //   accessKeyId: "AKIAZQ3DTDYZMSHJC7JR",
        //   secretAccessKey: "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",
        //   region: "ap-south-1",
        // });
        // console.log(`here fetching image blob`);
        // console.log(fileUri);
        // const fileContents = await FileSystem.readAsStringAsync(fileUri, {
        //   encoding: FileSystem.EncodingType.Base64,
        // });
        // Create a Blob from the base64 data
        // const response = await fetch(uri);
        // const blob = await response.blob();
        // console.log(`bolob Reasponse `, blob);
        // Convert the Base64 string to a buffer
        // const buffer = Buffer.from(fileContents, "base64");
        // console.log(`buffer`, buffer);
        // const params = {
        //   Bucket: "edba-dev-bucket",
        //   key: `Assignments/${fileName}`,
        //   body: buffer,
        //   ContentType: fileType,
        // };
        // s3.upload(params, (err, data) => {
        //   if (err) {
        //     console.error("Error uploading document:", err);
        //     Alert.alert("Upload Failed", "Error uploading document");
        //   } else {
        //     console.log("Document uploaded successfully:", data.Location);
        //     Alert.alert("Upload Successful", `Document URL: ${data.Location}`);
        //     // Optionally, send the document link to your API
        //     // await axios.post('http://your-api-url/receive-document-link', {
        //     //   fileUrl: data.Location,
        //     // });
        //   }
        // });
        // new mwthod4

        try {
          if (fileUri) {
            const fileContents = await FileSystem.readAsStringAsync(fileUri, {
              encoding: FileSystem.EncodingType.Base64,
            });

            const buffer = Buffer.from(fileContents, "base64");

            const params = {
              Bucket: "edba-dev-bucket",
              Key: `Assignments/${fileName}`,
              Body: buffer,
              ContentType: fileType,
            };

            var Document = await s3.upload(params).promise(); // Wait for the upload to complete

            console.log("Document uploaded successfully:", Document.Key);
          }

          // Alert.alert("Upload Successful", `Document URL: ${Document.Location}`);
          try {
            const postData = {
              ...data,
              teacher: TeacherId,
              submissionDate: submissionDate,
              documents: [
                {
                  key: Document?.Key,
                  url: Document?.Location,
                  label: fileName,
                },
              ],
            };
            console.log(`data`, postData);

            const response = await post("assignments/create", postData);
            if (response?.errCode == -1) {
              Alert.alert("Assignment Created Successfully");
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
          }

          // Optionally, send the document link to your API
          // await axios.post('http://your-api-url/receive-document-link', {
          //   fileUrl: data.Location,
          // });

          return data.Location; // Return the uploaded document URL
        } catch (error) {
          console.error("Error uploading document:", error);
          Alert.alert("Upload Failed", "Error uploading document");
          throw error; // Throw the error to handle it further if needed
        }
      };

      // };

      UploadDocumentTos3();

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
  };

  const getClassList = async () => {
    const response = await post("teacher/class", { teacherId: TeacherId });
    console.log(`classList`, response);
    if (response?.errCode == -1) {
      setClasses(
        response?.data.map((item) => ({ label: item?.name, value: item?.id }))
      );
    } else {
      setClasses([]);
    }
  };

  useEffect(() => {
    getClassList();
  }, [isFocused]);

  const hideDatePicker = () => {
    setIsDatePickerVisible(false);
  };

  const handleDateConfirm = (date) => {
    setSubmissionDate(moment(date).format("YYYY-MM-DD"));
    setIsDatePickerVisible(false);
  };

  const pickFile = async () => {
    // DocumentPicker;
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: "*/*", // all files
        copyToCacheDirectory: false,
      });

      console.log(`result`, result);

      if (result.type !== "cancel") {
        // Check if user didn't cancel
        console.log("Result:", result);

        const { uri, mimeType, name } = result.assets[0];

        // const fileInfo = await FileSystem.getInfoAsync(uri);
        // console.log(`fileInfo.uri`, fileInfo);
        // console.log(`URLIMage`, URLIMage);
        console.log("URI:", uri);
        console.log("Type:", mimeType);
        console.log("Name:", name);

        // const res = await RNFetchBlob.fs.readFile(file.uri, "base64");
        // const blob = new Blob([Buffer.from(res, "base64")], {
        //   type: file.type,
        // });
        // console.log(`blob blob`, blob);
        setFileUri(uri);
        setFileType(mimeType);
        setFileName(name);

        // Create a Blob from the base64 data

        // const response = await fetch(uri);
        // const blob = await response.blob();
        // console.log(`bolob Reasponse `, blob);

        // Convert the Base64 string to a buffer

        // console.log(`blobb`, blob);
      } else {
        console.log("User cancelled the picker");
      }
    } catch (error) {
      console.log("Error picking file", error);
    }
  };

  const handleClassChange = async (value) => {
    try {
      const response = await post("classes/subject", {
        teacherId: TeacherId,
        classId: value,
      });
      if (response?.errCode == -1) {
        setSubjectList(
          response?.data.map((item) => ({
            label: item?.subjectName,
            value: item?.id,
          }))
        );
      } else {
        setSubjectList([]);
      }
    } catch (error) {}
  };

  return (
    <ScrollView
      style={{ height: "100%", backgroundColor: theme.backgroundColor }}
    >
      <View
        style={{
          padding: 20,
          paddingTop: 20,
          backgroundColor: theme.backgroundColor,
        }}
      >
        <Text
          style={{
            paddingTop: 10,
            marginBottom: 5,
            fontSize: 14,
            fontWeight: "600",
            color: theme.primaryTextColor,
          }}
        >
          Select Class
        </Text>
        <Controller
          style={{ borderWidth: 2, borderColor: "#ccc" }}
          control={control}
          rules={{ required: true }}
          render={({ field: { onChange, value } }) => (
            <RNPickerSelect
              onValueChange={(value) => {
                onChange(value);
                handleClassChange(value);
                console.log(`value`, value);
              }}
              items={classes}
              placeholder={{ label: "Select Class", value: "" }}
              style={{
                inputIOS: [
                  {
                    borderWidth: 1,
                    height: 36,
                    borderColor: "#ccc",
                    padding: 10,
                    borderRadius: 5,
                    marginBottom: 10,
                  },
                  errors.class && {
                    borderColor: "red",
                  },
                ],
                inputAndroid: [
                  {
                    borderWidth: 1,
                    height: 36,
                    borderColor: "#ccc",
                    padding: 10,
                    borderRadius: 5,
                    marginBottom: 10,
                  },
                  errors.class && {
                    borderColor: "red",
                  },
                ],
                iconContainer: {
                  top: 10,
                  right: 14,
                },
              }}
              Icon={() => (
                <AntDesign
                  name="caretdown"
                  size={12}
                  color={`${theme.secondaryTextColor}80`}
                />
              )}
              value={value}
              useNativeAndroidPickerStyle={false}
            />
          )}
          name="class"
          defaultValue=""
        />
        {errors.class && (
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
          Select Subject
        </Text>
        <Controller
          style={{ borderWidth: 2, borderColor: "black" }}
          control={control}
          rules={{ required: true }}
          render={({ field: { onChange, value } }) => (
            <RNPickerSelect
              onValueChange={onChange}
              items={subjectList}
              placeholder={{ label: "Select Subject", value: "" }}
              style={{
                inputIOS: [
                  {
                    borderWidth: 1,
                    height: 36,
                    borderColor: "#ccc",
                    padding: 10,
                    borderRadius: 5,
                    marginBottom: 10,
                  },
                  errors.subject && {
                    borderColor: "red",
                  },
                ],
                inputAndroid: [
                  {
                    borderWidth: 1,
                    height: 36,
                    borderColor: "#ccc",
                    padding: 10,
                    borderRadius: 5,
                    marginBottom: 10,
                  },
                  errors.subject && {
                    borderColor: "red",
                  },
                ],
                iconContainer: {
                  top: 10,
                  right: 14,
                },
              }}
              Icon={() => (
                <AntDesign
                  name="caretdown"
                  size={12}
                  color={`${theme.secondaryTextColor}80`}
                />
              )}
              value={value}
              useNativeAndroidPickerStyle={false}
            />
          )}
          name="subject"
          defaultValue=""
        />
        {errors.subject && (
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
              <Ionicons name="remove-circle-outline" size={24} color="red" />
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
            <CustomTextArea
              value={value}
              onChangeText={onChange}
              placeholder="Enter resources here"
              numberOfLines={3}
            />
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
              <Ionicons name="remove-circle-outline" size={24} color="red" />
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
        {/* <Controller
          control={control}
          rules={{ required: true }}
          render={({ field: { onChange, value } }) => (
            <CustomTextArea
              value={value}
              onChangeText={onChange}
              placeholder="Enter resources here"
              numberOfLines={3}
            />
          )}
          name="resources"
          defaultValue=""
        />
        {errors.resources && (
          <Text
            style={{
              color: "red",
              marginBottom: 10,
            }}
          >
            This field is required
          </Text>
        )} */}
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
              {fileName == null ? "Upload Document" : "Change Document"}
            </Text>
          </TouchableOpacity>
        </View>
        {fileName == null ? (
          ""
        ) : (
          <Text
            style={{
              textAlign: "right",
              marginRight: 10,
              color: theme.primaryTextColor,
            }}
          >
            {fileName}
          </Text>
        )}
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
            display: "flex",
            flexDirection: "row",
            width: "100%",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <View style={{ width: "45%" }}>
            <Text>Assignment Marks</Text>
            <Controller
              style={{ borderWidth: 2, borderColor: "#ccc" }}
              control={control}
              rules={{ required: true }}
              render={({ field: { onChange, value } }) => (
                <TextInput
                  style={{
                    height: 34,
                    borderWidth: 1,
                    width: "100%",
                    borderRadius: 5,
                    borderColor: "#B7B7B7",
                    paddingLeft: 10,
                  }}
                  value={value}
                  onChangeText={onChange}
                  keyboardType="numeric"
                  placeholder="00.00"
                  placeholderTextColor={theme.secondaryTextColor}
                  color={theme.primaryTextColor}
                />
              )}
              name="totalMarks"
              defaultValue=""
            />
            {errors.totalMarks && (
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
          {/* <View style={{ width: "45%" }}>
            <Text>Marks Deduction after dueDate</Text>
            <TextInput
              style={{
                height: 34,
                borderWidth: 1,
                width: "100%",
                borderRadius: 5,
                borderColor: "#B7B7B7",
                paddingLeft: 10,
              }}
              value={deductionMarks}
              onChangeText={handleDeductionMarks}
              keyboardType="numeric"
              placeholder="00.00"
              placeholderTextColor={theme.secondaryTextColor}
              color={theme.primaryTextColor}
            />
          </View> */}
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
              marginTop: 10,
            }}
            onPress={handleSubmit(onSubmit)}
          >
            <Text style={{ color: "#FFFFFF" }}>SUBMIT</Text>
          </TouchableOpacity>
        </View>
        <View></View>
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
  );
}

const styles = StyleSheet.create({});