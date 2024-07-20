import {
  BackHandler,
  FlatList,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, {
  useCallback,
  useEffect,
  useLayoutEffect,
  useState,
} from "react";
import { Ionicons, Entypo, AntDesign } from "react-native-vector-icons";
import Icon from "react-native-vector-icons/Ionicons";
import RNPickerSelect from "react-native-picker-select";
import AssignGrade from "./AssignGrade";
// import { theme } from "../../../theming";
import { useFocusEffect } from "@react-navigation/native";
import { useThemeContext } from "../../../hooks/useTheme";
import { post } from "../../../utils/apis/TeacherApis/login";

const statusData = [
  { label: "Completed", value: "Completed" },
  { label: "Pending", value: "Pending" },
];

const studentData = [
  {
    rollNo: "01",
    name: "Emily Johnson",
    completeStatus: true,
    assignment:
      "https://conasems-ava-prod.s3.sa-east-1.amazonaws.com/aulas/ava/dummy-1641923583.pdf",
    pdfNmae: "Microscopic Techniques",
    grade: "",
    feedback: "",
  },
  {
    rollNo: "02",
    name: "Emily Johnson",
    completeStatus: true,
    assignment:
      "https://conasems-ava-prod.s3.sa-east-1.amazonaws.com/aulas/ava/dummy-1641923583.pdf",
    pdfNmae: "Microscopic Techniques",
    grade: "",
    feedback: "",
  },
  {
    rollNo: "03",
    name: "Emily Johnson",
    completeStatus: true,
    assignment:
      "https://conasems-ava-prod.s3.sa-east-1.amazonaws.com/aulas/ava/dummy-1641923583.pdf",
    pdfNmae: "Microscopic Techniques",
    grade: "",
    feedback: "",
  },
  {
    rollNo: "04",
    name: "Emily Johnson",
    completeStatus: false,
    assignment:
      "https://conasems-ava-prod.s3.sa-east-1.amazonaws.com/aulas/ava/dummy-1641923583.pdf",
    pdfNmae: "Microscopic Techniques",
    grade: "",
    feedback: "",
  },
  {
    rollNo: "05",
    name: "Emily Johnson",
    completeStatus: true,
    assignment:
      "https://conasems-ava-prod.s3.sa-east-1.amazonaws.com/aulas/ava/dummy-1641923583.pdf",
    pdfNmae: "Microscopic Techniques",
    grade: "",
    feedback: "",
  },
  {
    rollNo: "06",
    name: "Emily Johnson",
    completeStatus: true,
    assignment:
      "https://conasems-ava-prod.s3.sa-east-1.amazonaws.com/aulas/ava/dummy-1641923583.pdf",
    pdfNmae: "Microscopic Techniques",
    grade: "",
    feedback: "",
  },
  {
    rollNo: "07",
    name: "Emily Johnson",
    completeStatus: true,
    assignment:
      "https://conasems-ava-prod.s3.sa-east-1.amazonaws.com/aulas/ava/dummy-1641923583.pdf",
    pdfNmae: "Microscopic Techniques",
    grade: "",
    feedback: "",
  },
  {
    rollNo: "08",
    name: "Emily Johnson",
    completeStatus: true,
    assignment:
      "https://conasems-ava-prod.s3.sa-east-1.amazonaws.com/aulas/ava/dummy-1641923583.pdf",
    pdfNmae: "Microscopic Techniques",
    grade: "",
    feedback: "",
  },
  {
    rollNo: "09",
    name: "Emily Johnson",
    completeStatus: true,
    assignment:
      "https://conasems-ava-prod.s3.sa-east-1.amazonaws.com/aulas/ava/dummy-1641923583.pdf",
    pdfNmae: "Microscopic Techniques",
    grade: "",
    feedback: "",
  },
  {
    rollNo: "10",
    name: "Emily Johnson",
    completeStatus: true,
    assignment:
      "https://conasems-ava-prod.s3.sa-east-1.amazonaws.com/aulas/ava/dummy-1641923583.pdf",
    pdfNmae: "Microscopic Techniques",
    grade: "",
    feedback: "",
  },
  {
    rollNo: "11",
    name: "Emily Johnson",
    completeStatus: true,
    assignment:
      "https://conasems-ava-prod.s3.sa-east-1.amazonaws.com/aulas/ava/dummy-1641923583.pdf",
    pdfNmae: "Microscopic Techniques",
    grade: "",
    feedback: "",
  },
  {
    rollNo: "12",
    name: "Emily Johnson",
    completeStatus: true,
    assignment:
      "https://conasems-ava-prod.s3.sa-east-1.amazonaws.com/aulas/ava/dummy-1641923583.pdf",
    pdfNmae: "Microscopic Techniques",
    grade: "",
    feedback: "",
  },
  {
    rollNo: "13",
    name: "Emily Johnson",
    completeStatus: true,
    assignment:
      "https://conasems-ava-prod.s3.sa-east-1.amazonaws.com/aulas/ava/dummy-1641923583.pdf",
    pdfNmae: "Microscopic Techniques",
    grade: "",
    feedback: "",
  },
  {
    rollNo: "14",
    name: "Emily Johnson",
    completeStatus: true,
    assignment:
      "https://conasems-ava-prod.s3.sa-east-1.amazonaws.com/aulas/ava/dummy-1641923583.pdf",
    pdfNmae: "Microscopic Techniques",
    grade: "",
    feedback: "",
  },
];

export default function Grade({ navigation, route }) {
  const { theme } = useThemeContext();
  const [assignmentStatus, setAssignmentStatus] = useState(statusData);
  const [selectedStatus, setSelectedStatus] = useState();
  const [allStudents, setAllStudents] = useState();
  const [StudentList, setStudentList] = useState([]);
  const [isOpenassignGradeTab, setIsOpenAssignGradeTab] = useState(false);
  const [selectedStudentassignGrade, setSelectedStudentassignGrade] =
    useState(null);

  const Assignment = route?.params?.AssignmentData;
  const [assignmentdata, setAssignmentData] = useState(Assignment);
  console.log(`Assignment`, Assignment);

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
            Grade
          </Text>
        </View>
      ),

      headerRight: () => (
        <View style={{ marginRight: 10 }}>
          <TouchableOpacity
            onPress={() => {
              if (selectedStudentassignGrade) {
                setIsOpenAssignGradeTab(false);
                setSelectedStudentassignGrade(null);
              } else {
                navigation.navigate("Assignments");
              }
            }}
          >
            <Entypo name="cross" size={24} color={theme.secondaryTextColor} />
          </TouchableOpacity>
        </View>
      ),
      headerStyle: {
        backgroundColor: theme.backgroundColor,
      },
      headerTitleAlign: "center", // Adjust alignment for header title (if needed)
      headerTintColor: "#000000", // Text color for back button and header title
    });

    // navigation.setOptions({
    //   header: () => {
    //     return (
    //       <View
    //         style={{
    //           backgroundColor: "#FFFFFF",
    //           paddingLeft: 10,
    //           paddingRight: 20,
    //           paddingTop: 20,
    //           paddingBottom: 10,
    //         }}
    //       >
    //         <View
    //           style={{
    //             display: "flex",
    //             flexDirection: "row",
    //             alignItems: "center",
    //             justifyContent: "space-between",
    //             marginTop: 10,
    //           }}
    //         >
    //           <TouchableOpacity onPress={() => navigation.openDrawer()}>
    //             <Icon
    //               name="menu"
    //               size={25}
    //               color="#000000"
    //               style={{ marginLeft: 10 }}
    //             />
    //           </TouchableOpacity>
    //           <Text
    //             numberOfLines={1}
    //             style={{
    //               fontSize: 20,
    //               width: "60%",
    //               textAlign: "center",
    //             }}
    //           >
    //             Grade
    //           </Text>
    //           <View
    //             style={{
    //               flexDirection: "row",
    //               alignItems: "center",
    //               width: "20%",
    //               justifyContent: "flex-end",
    //             }}
    //           >
    //             <View>
    //               <TouchableOpacity
    //                 onPress={() => {
    //                   if (selectedStudentassignGrade) {
    //                     setIsOpenAssignGradeTab(false);
    //                     setSelectedStudentassignGrade(null);
    //                   } else {
    //                     navigation.navigate("Assignments");
    //                   }
    //                 }}
    //               >
    //                 <Entypo name="cross" size={24} color="#777777" />
    //               </TouchableOpacity>
    //             </View>
    //           </View>
    //         </View>
    //       </View>
    //     );
    //   },
    // });
  }, [navigation, selectedStudentassignGrade, theme]);

  const handleStudentsAssignmentGrade = (data) => {
    setIsOpenAssignGradeTab(true);
    setSelectedStudentassignGrade(data);
  };

  const fetchStudents = async () => {
    const response = await post("assignments/student", {
      assignmentId: Assignment?.assignment,
    });
    if (response?.errCode == -1) {
      // const allStudents = [
      //   ...data.completedStudents.map(student => ({ ...student, status: 'Completed' })),
      //   ...data.pendingStudents.map(student => ({ ...student, status: 'Pending' }))
      // ];
      setAllStudents(response?.data);
      setStudentList(response?.data?.allStudents);
      console.log(`response studentList`, response?.data);
    }
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  useFocusEffect(
    useCallback(() => {
      const onBackPress = () => {
        setIsOpenAssignGradeTab(false);
        if (isOpenassignGradeTab == true) {
          setIsOpenAssignGradeTab(false);
          console.log(`back button pressed`);
          return true;
        }
        console.log(`back button not pressed`);
        return false;
      };

      const subscription = navigation.addListener("beforeRemove", (e) => {
        if (onBackPress()) {
          e.preventDefault();
          console.log(`back button pressed from subscription`);
        }
      });
      const backhandler = BackHandler.addEventListener(
        "hardwareBackPress",
        onBackPress
      );
      return () => {
        subscription();
        backhandler.remove();
      };
    }, [isOpenassignGradeTab])
  );

  const handleStatusChange = (value) => {
    setSelectedStatus(value);
    if (value == "Completed") {
      setStudentList(allStudents?.completedStudents);
    } else if (value == "Pending") {
      setStudentList(allStudents?.pendingStudents);
    } else {
      setStudentList(allStudents?.allStudents);
    }
  };

  //   const renderItem = ({ item }) => (
  //     <View style={styles.tableRow}>
  //       <View style={styles.tableColumn}>
  //         <Text style={[styles.rowText, { color: "#222222" }]}>
  //           {item?.rollNo}
  //         </Text>
  //       </View>
  //       <View style={styles.tableColumn}>
  //         <TouchableOpacity>
  //           <Text style={[styles.rowText, { color: "#2B78CA" }]}>
  //             {item?.name}
  //           </Text>
  //         </TouchableOpacity>
  //       </View>
  //       <View style={styles.tableColumn}>
  //         <Text>
  //           {item?.completeStatus ? (
  //             <Ionicons name="checkmark" size={20} color={"#222222"} />
  //           ) : (
  //             ""
  //           )}
  //         </Text>
  //       </View>
  //     </View>
  //   );

  return (
    <SafeAreaView style={{ backgroundColor: theme.backgroundColor }}>
      {isOpenassignGradeTab ? (
        <View>
          <AssignGrade
            selectedStudentassignGrade={selectedStudentassignGrade}
            assignmentId={Assignment?.assignment}
            setIsOpenAssignGradeTab={setIsOpenAssignGradeTab}
          />
        </View>
      ) : (
        <ScrollView
          style={{ marginHorizontal: 20, marginVertical: 10 }}
          showsVerticalScrollIndicator={false}
        >
          <View style={{ marginVertical: 10, gap: 5 }}>
            <View
              style={{
                display: "flex",
                flexDirection: "row",
              }}
            >
              <Text
                style={{
                  fontSize: 16,
                  fontWeight: "600",
                  color: theme.primaryTextColor,
                }}
              >
                Assignment:{" "}
              </Text>
              <Text style={{ fontSize: 16, color: theme.secondaryTextColor }}>
                {assignmentdata?.name}
              </Text>
            </View>
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <Text style={{ fontSize: 16, color: theme.secondaryTextColor }}>
                Class:{" "}
              </Text>
              <Text
                style={{
                  fontSize: 16,
                  fontWeight: "600",
                  color: theme.primaryTextColor,
                }}
              >
                {assignmentdata?.class?.name}-{assignmentdata?.division?.name}
              </Text>
            </View>
          </View>
          <View style={{ marginTop: 5, gap: 5 }}>
            <Text
              style={{
                fontSize: 14,
                fontWeight: "500",
                color: theme.primaryTextColor,
              }}
            >
              Student Status
            </Text>
            <RNPickerSelect
              onValueChange={(value) => {
                handleStatusChange(value);
              }}
              items={assignmentStatus}
              placeholder={{ label: "All Students", value: "allStudents" }}
              style={{
                inputIOS: {
                  borderWidth: 1,
                  borderColor: "#ccc",
                  borderRadius: 5,
                  paddingHorizontal: 10,
                  paddingVertical: 12,
                  height: 36,
                  marginBottom: 10,
                  backgroundColor: "white",
                  fontSize: 16,
                  color: "#000",
                },
                inputAndroid: [
                  {
                    borderWidth: 1,
                    height: 36,
                    borderColor: "#ccc",
                    padding: 10,
                    borderRadius: 5,
                    marginBottom: 10,
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
              value={selectedStatus}
              useNativeAndroidPickerStyle={false}
            />
          </View>
          <View style={{ marginTop: 20 }}>
            {StudentList?.length > 0 && (
              <View>
                {/* Table Header */}
                <View
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    paddingVertical: 8,
                    marginBottom: 8,
                    backgroundColor: theme.DrawerTabBackgroundColor,
                  }}
                >
                  <View
                    style={{
                      width: "33%",
                      display: "flex",
                      flexDirection: "row",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <Text
                      style={{
                        fontSize: 16,
                        fontWeight: "600",
                        color: theme.primaryTextColor,
                      }}
                    >
                      Roll No
                    </Text>
                  </View>
                  <View
                    style={{
                      width: "33%",
                      display: "flex",
                      flexDirection: "row",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <Text
                      style={{
                        fontSize: 16,
                        fontWeight: "600",
                        color: theme.primaryTextColor,
                        textAlign: "center",
                      }}
                    >
                      {" "}
                      Student Name
                    </Text>
                  </View>
                  <View
                    style={{
                      width: "33%",
                      display: "flex",
                      flexDirection: "row",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <Text
                      style={{
                        fontSize: 16,
                        fontWeight: "600",
                        color: theme.primaryTextColor,
                      }}
                    >
                      Completed
                    </Text>
                  </View>
                </View>
                {/* <View style={{ display: "flex" }}>
                 <FlatList
                   data={StudentList}
                   renderItem={renderItem}
                   keyExtractor={(item) => item?.rollNo}
                   contentContainerStyle={{ flexGrow: 1 }}
                 />
               </View> */}

                {StudentList.map((data, index) => (
                  <TouchableOpacity
                    onPress={() => {
                      handleStudentsAssignmentGrade(data);
                    }}
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      marginBottom: 8,
                      paddingVertical: 10,
                      borderBottomWidth: 1,
                      borderBottomColor: `${theme.secondaryTextColor}80`,
                    }}
                    key={index}
                  >
                    <View
                      style={{
                        width: "33%",
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <Text
                        style={{ color: theme.primaryTextColor, fontSize: 12 }}
                      >
                        {data?.rollNo}
                      </Text>
                    </View>
                    <View
                      style={{
                        width: "33%",
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <View>
                        <Text
                          style={{
                            color: theme.primarycolor,
                            fontSize: 12,
                            fontFamily: "Poppins_500Medium",
                          }}
                        >
                          {data?.name}
                        </Text>
                      </View>
                    </View>
                    <View
                      style={{
                        width: "33%",
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <Text>
                        {data?.status == "completed" ? (
                          <Ionicons
                            name="checkmark"
                            size={20}
                            color={theme.primaryTextColor}
                          />
                        ) : (
                          ""
                        )}
                      </Text>
                    </View>
                  </TouchableOpacity>
                ))}
              </View>
            )}
          </View>
        </ScrollView>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({});
