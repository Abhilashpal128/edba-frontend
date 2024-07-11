import {
  Alert,
  Button,
  Linking,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import { Link, useIsFocused, useNavigation } from "@react-navigation/native";
import { MaterialCommunityIcons } from "react-native-vector-icons";
import PdfViewer from "../../common/PdfViewer/PdfViewer";
import { useThemeContext } from "../../../hooks/useTheme";
import { post } from "../../../utils/apis/TeacherApis/login";
// import Pdf from "react-native-pdf";
// import { theme } from "../../../theming";
// import { PDFView } from "react-native-view-pdf";

export default function AssignGrade({
  selectedStudentassignGrade,
  assignmentId,
  setIsOpenAssignGradeTab,
}) {
  const navigation = useNavigation();
  const { theme } = useThemeContext();
  const [grade, setGrade] = useState(0);
  const [feedback, setFeedback] = useState(null);
  const [isFileOpend, setIsFileOpend] = useState(null);
  const [gradeError, setGradeError] = useState("");
  const [studentData, setStudentdata] = useState();
  const isFocused = useIsFocused();

  console.log(`selectedStudentassignGrade`, selectedStudentassignGrade);

  const openAssignmentLink = (link) => {
    Linking.openURL(link);
  };

  const openPdf = (link) => {
    Linking.openURL(link);

    // setIsFileOpend(link);
    console.log(`pdfUrl`, link);
  };

  const handleChangeText = (text) => {
    const numericValue = text.replace(/[^0-9.]/g, "");
    setGrade(numericValue);
    if (parseFloat(numericValue) > parseFloat(studentData?.totalMarks)) {
      setGradeError(
        `Greade should be less then ${
          studentData?.totalMarks ? studentData?.totalMarks : "100"
        }`
      );
    } else {
      setGradeError("");
    }
  };

  const fetchStudentAssignment = async () => {
    try {
      const response = await post("assignments/assign-grade", {
        assignmentId: assignmentId,
        studentId: selectedStudentassignGrade?.id,
      });
      console.log(`fetchStudentAssignment`, response);
      if (response?.errCode == -1) {
        setStudentdata(response?.data);
        if (response?.data?.grade != null) {
          setGrade(JSON.stringify(response?.data?.grade));
        } else {
          setGrade(null);
        }
        if (response?.data?.feedback != null) {
          setFeedback(response?.data?.feedback);
        } else {
          setFeedback(null);
        }
        console.log(`studentDatatat`, response?.data);
      } else {
        Alert.alert(response?.errMsg);
      }
    } catch (error) {
      console.log(`Assignm grade catch error `, error);
    }
  };

  useEffect(() => {
    fetchStudentAssignment();
  }, [isFocused]);

  const handleSubmit = async () => {
    try {
      if (gradeError != "") {
        return true;
      }
      const response = await post("assignments/assign-grade", {
        assignmentId: assignmentId,
        studentId: studentData?.studentId,
        grade: grade,
        feedback: feedback,
      });
      console.log(`hiiiii`, response);
      if (response?.errCode == -1) {
        Alert.alert("Assignment Submitted Successfully");
        // navigation.navigate("Assignments");
        setIsOpenAssignGradeTab(false);
      } else {
        if (response?.errMsg) {
          console.log(`response?.errMsg`, response?.errMsg);
          Alert.alert(response?.errMsg);
        } else {
          Alert.alert("error while assigning grade");
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <SafeAreaView>
      <ScrollView style={{ width: "100%", height: "100%" }}>
        {isFileOpend ? (
          // <PdfViewer uri={isFileOpend} />

          <View style={{ width: "100%", height: "100%" }}>
            <PdfViewer uri={isFileOpend} />
          </View>
        ) : (
          // <View>
          //   <PDFView
          //     style={styles.pdf}
          //     resource={isFileOpend}
          //     resourceType="url"
          //     onLoad={() => console.log("PDF rendered from url")}
          //     onError={(error) => console.log("Cannot render PDF", error)}
          //   />
          //   <Pdf source={{ uri: isFileOpend, cache: true }} />
          // </View>
          // <View>
          //   <Text>pdf Viewer</Text>
          // </View>
          <View style={{ marginHorizontal: 20, height: "100%" }}>
            <View
              style={{
                height: 40,
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Text
                style={{
                  fontSize: 14,
                  color: theme.primaryTextColor,
                  fontWeight: "500",
                }}
              >
                {selectedStudentassignGrade?.name}
              </Text>

              <Text
                style={{
                  color: theme.secondaryTextColor,
                  fontSize: 14,
                  fontWeight: "600",
                }}
              >
                Roll No:
                {selectedStudentassignGrade?.rollNo}
              </Text>
            </View>
            <View style={{ gap: 10, marginVertical: 10 }}>
              <Text
                style={{
                  fontSize: 14,
                  color: theme.primaryTextColor,
                  fontWeight: "500",
                }}
              >
                File attatchment
              </Text>
              {studentData?.documentLink != null ? (
                <View
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "flex-start",
                  }}
                >
                  <TouchableOpacity
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: 5,
                      padding: 10,
                      borderWidth: 1,
                      borderColor: "#B7B7B7",
                      borderRadius: 8,
                    }}
                    onPress={() => openPdf(studentData?.documentLink)}
                  >
                    <MaterialCommunityIcons
                      name="file-document-outline"
                      color={theme.primarycolor}
                      size={20}
                    />
                    <Text style={{ color: theme.primarycolor }}>
                      {studentData?.documentLink}
                    </Text>
                  </TouchableOpacity>
                </View>
              ) : (
                <View>
                  <Text>Assignment Not submitted</Text>
                </View>
              )}
            </View>
            <View>
              <View style={{ marginVertical: 10, gap: 10 }}>
                <Text
                  style={{
                    fontSize: 14,
                    color: theme.primaryTextColor,
                    fontWeight: "500",
                  }}
                >
                  Grade
                </Text>
                <TextInput
                  style={{
                    height: 34,
                    borderWidth: 1,
                    width: "50%",
                    borderRadius: 5,
                    borderColor: "#B7B7B7",
                    paddingLeft: 10,
                  }}
                  value={grade}
                  onChangeText={handleChangeText}
                  keyboardType="numeric"
                  placeholder="00.00"
                  placeholderTextColor={theme.secondaryTextColor}
                  color={theme.primaryTextColor}
                />
                {gradeError ? (
                  <View>
                    <Text style={{ color: "red", marginTop: 5 }}>
                      {gradeError}
                    </Text>
                  </View>
                ) : null}
              </View>
            </View>
            <View>
              <View style={{ marginVertical: 10, gap: 10 }}>
                <Text
                  style={{
                    fontSize: 14,
                    color: theme.primaryTextColor,
                    fontWeight: "500",
                  }}
                >
                  Feedback
                </Text>
                <TextInput
                  style={{
                    borderWidth: 1,
                    borderRadius: 5,
                    borderColor: "#B7B7B7",
                    paddingLeft: 10,
                    textAlignVertical: "top",
                    paddingTop: 10,
                  }}
                  value={feedback}
                  onChangeText={(value) => {
                    setFeedback(value);
                  }}
                  placeholder="Good Work"
                  multiline={true}
                  numberOfLines={4}
                  placeholderTextColor={theme.secondaryTextColor}
                  color={theme.primaryTextColor}
                />
              </View>
            </View>
            <View style={{ marginTop: 30 }}>
              <TouchableOpacity
                style={{
                  height: 40,
                  margin: 10,
                  borderRadius: 5,
                }}
              >
                <Button
                  title="Submit"
                  onPress={() => {
                    handleSubmit();
                  }}
                />
              </TouchableOpacity>
            </View>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({});