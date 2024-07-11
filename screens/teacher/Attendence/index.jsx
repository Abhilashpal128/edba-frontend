import React, { useEffect, useLayoutEffect, useState } from "react";
import {
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  ScrollView,
  Modal,
  Alert,
} from "react-native";
import RNPickerSelect from "react-native-picker-select";
import { Calendar } from "react-native-calendars";
import moment from "moment";
import {
  EvilIcons,
  Ionicons,
  MaterialCommunityIcons,
} from "react-native-vector-icons";
import Icon from "react-native-vector-icons/Ionicons";
import { useIsFocused, useNavigation } from "@react-navigation/native";
import { useThemeContext } from "../../../hooks/useTheme";
import { useSelector } from "react-redux";
import { post } from "../../../utils/apis/TeacherApis/login";
// import { theme } from "../../../theming";

const data = {
  classes: [
    { label: "FYJC- 11A", value: "90123" },
    { label: "FYJC- 11B", value: "90124" },
    // add more classes as needed
  ],
  attendance: [
    { rollNo: "01", name: "Emily Johnson", status: "P" },
    { rollNo: "02", name: "Alex Smith", status: "P" },
    { rollNo: "03", name: "Sarah Brown", status: "P" },
    { rollNo: "04", name: "Michael Davis", status: "P" },
    { rollNo: "05", name: "Jessica Wilson", status: "A" },
    { rollNo: "06", name: "Ryan Martinez", status: "P" },
    { rollNo: "07", name: "Olivia Taylor", status: "P" },
    { rollNo: "08", name: "Ethan Anderson", status: "P" },
    { rollNo: "09", name: "Emma Garcia", status: "A" },
    { rollNo: "10", name: "Emma Garcia", status: "P" },
    { rollNo: "11", name: "Emma Garcia", status: "P" },
    { rollNo: "12", name: "Emma Garcia", status: "P" },
    { rollNo: "13", name: "Emma Garcia", status: "P" },
    { rollNo: "14", name: "Emma Garcia", status: "P" },
    { rollNo: "15", name: "Emma Garcia", status: "P" },
    { rollNo: "17", name: "Emma Garcia", status: "P" },
    { rollNo: "18", name: "Emma Garcia", status: "P" },
    { rollNo: "19", name: "Emma Garcia", status: "P" },
    // add more records as needed
  ],
};

export default function TeacherAttendence() {
  const { theme } = useThemeContext();
  const [studentAttendenceData, setStudentAttendenceData] = useState(data);
  const [selectedClass, setSelectedClass] = useState(null);
  const [classes, setClasses] = useState([]);
  const today = moment();
  const [selectedDate, setSelectedDate] = useState(today);
  const [isCalendarVisible, setCalendarVisible] = useState(false);
  const [presentModal, setPresentModal] = useState(0);
  const [studentList, setStudentList] = useState();
  const [absentList, setAbsentList] = useState([]);
  const [classError, setClassError] = useState(false);
  const isFocused = useIsFocused();
  const user = useSelector((state) => state.login.user);
  const TeacherId = user?.teacherId;

  const navigation = useNavigation();

  const handlePresentyModal = (studentId) => {
    setPresentModal(studentId);
  };

  const handleAbsentOrPresent = (studentId, status) => {
    setPresentModal(0);
    // if (status === "A") {
    //   const updatedAttendance = studentAttendenceData.attendance.map(
    //     (student) =>
    //       student.rollNo == rollNo ? { ...student, status: "A" } : student
    //   );

    //   setStudentAttendenceData({
    //     ...studentAttendenceData,
    //     attendance: updatedAttendance,
    //   });

    //   console.log(`datatata Updated Attendence`, {
    //     ...studentAttendenceData,
    //     attendance: updatedAttendance,
    //   });

    //   //   const AttendanceData = data.attendance.find((item: any) => {
    //   //     return item.rollNo == rollNo;
    //   //   });

    //   //   console.log(`AttendanceData`, AttendanceData);

    //   //   const UpdatedAttendence = { ...data.attendance, status: "A" };
    //   //   console.log(`UpdatedAttendence`, UpdatedAttendence);
    // } else {
    //   const updatedAttendance = studentAttendenceData.attendance.map(
    //     (student) =>
    //       student.rollNo == rollNo ? { ...student, status: "P" } : student
    //   );

    //   setStudentAttendenceData({
    //     ...studentAttendenceData,
    //     attendance: updatedAttendance,
    //   });

    //   console.log(`datatata Updated Attendence`, {
    //     ...studentAttendenceData,
    //     attendance: updatedAttendance,
    //   });
    // }

    if (status == "A") {
      setAbsentList((prevIds) => {
        if (!prevIds.includes(studentId)) {
          return [...prevIds, studentId];
        }
        return prevIds;
      });
    } else {
      setAbsentList((prevIds) =>
        prevIds.filter((existingId) => existingId !== studentId)
      );
    }

    // Absenties.push(studentId);
    // absentList.push(studentId);
    // Alert.alert(JSON.stringify(absentList));

    // Alert.alert(JSON.stringify(status));

    // setAbsentList(Absenties);
  };

  const handleClassSelect = async (value) => {
    try {
      setClassError(false);
      const date = moment(selectedDate).format("YYYY-MM-DD");
      const selectedClassData = classes.find((cls) => cls?.value == value);
      setSelectedClass(selectedClassData);
      console.log(`selectedClassData`, selectedClassData);

      const response = await post("attendences/get", {
        classId: value,
        date: date,
        tecaherId: TeacherId,
      });
      console.log(`attendence StudentList `, response);
      if (response.errCode == -1) {
        setStudentList(response?.data);
        // Alert.alert("Attendence Marked Successfully");
        const absentStudents = response?.data
          ?.filter((item) => item?.status == "Absent")
          .map((data) => data?.id);
        console.log(`absentStudents`, absentStudents);
        setAbsentList(absentStudents);
      } else {
        console.log(response?.errMsg);
      }
    } catch (error) {
      console.log(error);
    }
  };

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
            Today's Attendence
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
            size={24}
            color={theme.secondaryTextColor}
          />
        </TouchableOpacity>
      ),

      headerStyle: {
        backgroundColor: theme.backgroundColor,
      },
      headerTitleAlign: "center", // Adjust alignment for header title (if needed)
      headerTintColor: "#000000", // Text color for back button and header title
    });
  }, [navigation, theme]);

  const renderItem = ({ item }) => (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "space-between",
        paddingVertical: 10,
        borderBottomWidth: 1,
        borderBottomColor: "#ccc",
      }}
    >
      <Text
        style={[
          {
            flex: 1,
            fontSize: 12,
            fontWeight: "semibold",
            textAlign: "center",
          },
          { color: theme.primaryTextColor },
        ]}
      >
        {item?.rollNo}
      </Text>
      <Text
        style={[
          {
            flex: 1,
            fontSize: 12,
            fontWeight: "semibold",
            textAlign: "center",
          },
          { color: theme.primaryTextColor },
        ]}
      >
        {item.name}
      </Text>
      {presentModal == item?.id ? (
        <View
          style={{
            flex: 1,
            fontSize: 12,
            fontWeight: "semibold",
            textAlign: "center",
          }}
        >
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              gap: 1,
              justifyContent: "center",
              alignItems: "center",
              width: "100%",
            }}
          >
            <TouchableOpacity
              onPress={() => {
                handleAbsentOrPresent(item?.id, "P");
              }}
            >
              <Text
                style={{
                  color: "green",
                  fontWeight: "bold",
                }}
              >
                <MaterialCommunityIcons
                  name="alpha-p-circle-outline"
                  size={32}
                />
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                handleAbsentOrPresent(item.id, "A");
              }}
            >
              <Text
                style={{
                  color: "red",
                  fontWeight: "bold",
                }}
              >
                <MaterialCommunityIcons
                  name="alpha-a-circle-outline"
                  size={32}
                />
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      ) : (
        <View
          style={{
            flex: 1,
            fontSize: 12,
            fontWeight: "semibold",
            textAlign: "center",
            justifyContent: "center",
            alignItems: "center",
            width: "100%",
          }}
        >
          <TouchableOpacity
            onPress={() => {
              handlePresentyModal(item?.id);
            }}
          >
            <Text
              style={[
                absentList.includes(item?.id)
                  ? {
                      color: "red",
                      fontWeight: "bold",
                    }
                  : {
                      color: "green",
                      fontWeight: "bold",
                    },
                styles.cell,
              ]}
            >
              {absentList.includes(item?.id) ? (
                <MaterialCommunityIcons
                  name="alpha-a-circle-outline"
                  size={32}
                />
              ) : (
                <MaterialCommunityIcons
                  name="alpha-p-circle-outline"
                  size={32}
                />
              )}
            </Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
  const handleDateChange = async (days) => {
    console.log(moment().isSame(selectedDate, "day"));
    console.log(`hii`);
    const newDate = selectedDate.clone().add(days, "days");
    const date = moment(newDate).format("YYYY-MM-DD");
    if (selectedClass != null) {
      const response = await post("attendences/get", {
        classId: selectedClass?.value,
        date: date,
        teacherId: TeacherId,
      });
      console.log(`attendence StudentList `, response);
      if (response?.errCode == -1) {
        setStudentList(response?.data);
        const absentStudents = response?.data
          ?.filter((item) => item?.status == "Absent")
          .map((data) => data?.id);
        console.log(`absentStudents`, absentStudents);
        setAbsentList(absentStudents);
      } else {
        // Alert.alert(response?.errMsg);
        setStudentList([]);
      }
    }

    setSelectedDate(newDate);
  };

  const handlesubmitAssignment = async () => {
    try {
      if (selectedClass == null) {
        setClassError(true);
        return true;
      }
      const classId = selectedClass?.value;
      const date = moment(selectedDate).format("YYYY-MM-DD");
      const absentees = absentList.map((absent) => ({
        id: absent,
        status: "Absent",
      }));
      const postData = {
        classId: classId,
        date,
        absentees,
        teacherId: TeacherId,
      };
      const response = await post("attendences/mark", postData);
      console.log(`AttendenceResponse`, response?.data);
      if (response?.errCode == -1) {
        Alert.alert("Attendence marked successfully");
        setStudentList(response?.data?.attendance);

        const absentStudents = response?.data?.attendance
          .filter((item) => item?.status == "Absent")
          .map((data) => data?.id);
        console.log(`absentStudents`, absentStudents);
        setAbsentList(absentStudents);
      } else if (response?.errCode == 1) {
        Alert.alert(response?.errMsg);
      } else {
        console.log("Attendence error");
      }
      console.log(response);
    } catch (error) {
      console.log(error);
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

  return (
    <SafeAreaView
      style={{
        backgroundColor: theme.backgroundColor,
        width: "100%",
        height: "100%",
      }}
    >
      <View style={{ marginHorizontal: 20 }}>
        <View>
          <Text
            style={{
              fontSize: 14,
              fontWeight: "500",
              color: theme.primaryTextColor,
            }}
          >
            Select Class
          </Text>
          <View
            style={{
              marginBottom: 20,
              borderWidth: 1,
              borderColor: "gray",
              borderRadius: 4,
              height: 36,
              justifyContent: "center",
            }}
          >
            <RNPickerSelect
              onValueChange={handleClassSelect}
              items={classes}
              value={selectedClass !== null ? selectedClass?.value : ""}
              style={{
                inputIOS: {
                  fontSize: 16,
                  paddingVertical: 12,
                  paddingHorizontal: 10,
                  borderWidth: 1,
                  borderColor: "gray",
                  borderRadius: 4,
                  color: theme.primaryTextColor,
                  paddingRight: 30, // to ensure the text is never behind the icon
                },
                inputAndroid: {
                  fontSize: 16,
                  paddingHorizontal: 10,
                  paddingVertical: 8,
                  borderWidth: 0.5,
                  borderColor: "purple",
                  borderRadius: 8,
                  color: theme.primaryTextColor,
                  paddingRight: 30, // to ensure the text is never behind the icon
                },
              }}
              placeholder={{ label: "Select Class", value: null }}
              color={theme.primaryTextColor}
            />
          </View>
          {classError && (
            <Text style={{ color: "red" }}>select Class first</Text>
          )}
        </View>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: 20,
          }}
        >
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              gap: 2,
            }}
          >
            <Text
              style={{
                fontSize: 16,
                fontWeight: "bold",
                color: theme.secondaryTextColor,
              }}
            >
              Class:
            </Text>
            <Text
              style={{
                color: theme.primaryTextColor,
                fontWeight: "bold",
              }}
            >
              {selectedClass?.label}
            </Text>
          </View>
        </View>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: 20,
          }}
        >
          <TouchableOpacity onPress={() => handleDateChange(-1)}>
            {/* <Text style={styles.arrow}>{"<"}</Text> */}
            <EvilIcons
              name="chevron-left"
              size={32}
              color={theme.secondaryTextColor}
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setCalendarVisible(true)}>
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                gap: 8,
              }}
            >
              <Text
                style={{
                  fontSize: 12,
                  fontWeight: "bold",
                  color: theme.primaryTextColor,
                }}
              >
                {selectedDate.format("DD MMM YYYY")}{" "}
              </Text>
              <Text
                style={{
                  fontSize: 12,
                  fontWeight: "bold",
                  color: theme.primaryTextColor,
                }}
              >
                {selectedDate.format("dddd")}
              </Text>
            </View>
          </TouchableOpacity>
          {moment().isSame(selectedDate, "day") == true ? (
            <View></View>
          ) : (
            <TouchableOpacity onPress={() => handleDateChange(1)}>
              {/* <Text style={styles.arrow}>{">"}</Text> */}
              <EvilIcons
                name="chevron-right"
                size={32}
                color={theme.primaryTextColor}
                // color={theme.secondaryTextColor}
              />
            </TouchableOpacity>
          )}
        </View>

        <View>
          <View>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                paddingVertical: 10,
                borderBottomWidth: 1,
                borderBottomColor: "#ccc",
                backgroundColor: theme.DrawerTabBackgroundColor,
              }}
            >
              <Text
                style={{
                  flex: 1,
                  fontSize: 12,
                  fontWeight: "bold",
                  textAlign: "center",
                }}
              >
                Roll No.
              </Text>
              <Text
                style={{
                  flex: 1,
                  fontSize: 12,
                  fontWeight: "bold",
                  textAlign: "center",
                }}
              >
                Student Name
              </Text>
              <Text
                style={{
                  flex: 1,
                  fontSize: 12,
                  fontWeight: "bold",
                  textAlign: "center",
                }}
              >
                Attendance
              </Text>
            </View>
            <View style={{ height: 370 }}>
              <FlatList
                data={studentList}
                renderItem={renderItem}
                keyExtractor={(item, index) => index}
                style={{ marginTop: 20 }}
              />
            </View>
          </View>
        </View>
        <View style={{ marginVertical: 20 }}>
          <TouchableOpacity
            style={{
              width: "90%",
              height: 40,
              marginHorizontal: "auto",
              backgroundColor: theme.primarycolor,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              borderRadius: 5,
            }}
            onPress={() => {
              handlesubmitAssignment();
            }}
          >
            <Text style={{ color: "#FFFFFF", fontSize: 12, fontWeight: "600" }}>
              UPDATE
            </Text>
          </TouchableOpacity>
        </View>
        <Modal
          visible={isCalendarVisible}
          transparent={true}
          animationType="slide"
        >
          <View
            style={{
              flex: 1,
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: "rgba(0, 0, 0, 0.5)",
            }}
          >
            <View
              style={{
                width: "90%",
                backgroundColor: "white",
                borderRadius: 10,
                padding: 20,
              }}
            >
              <Calendar
                current={selectedDate.format("YYYY-MM-DD")}
                onDayPress={(day) => {
                  setSelectedDate(moment(day.dateString));
                  setCalendarVisible(false);
                }}
                markedDates={{
                  [selectedDate.format("YYYY-MM-DD")]: {
                    selected: true,
                    marked: true,
                    selectedColor: "blue",
                  },
                }}
                minDate={"2000-01-01"}
                maxDate={today.format("YYYY-MM-DD")}
                disableAllTouchEventsForDisabledDays={true}
                theme={{
                  todayTextColor: "#008000",
                  dayTextColor: "#000000",
                  textDisabledColor: "#D3D3D3",
                }}
              />
              <TouchableOpacity
                style={{
                  marginTop: 10,
                  padding: 10,
                  backgroundColor: "#007bff",
                  borderRadius: 5,
                  alignItems: "center",
                }}
                onPress={() => setCalendarVisible(false)}
              >
                <Text
                  style={{
                    color: "white",
                    fontSize: 16,
                  }}
                >
                  Close
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({});
