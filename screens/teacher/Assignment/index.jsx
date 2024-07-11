import {
  ActivityIndicator,
  Alert,
  RefreshControl,
  SafeAreaView,
  SectionList,
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
import { MaterialIcons } from "react-native-vector-icons";
import Icon from "react-native-vector-icons/Ionicons";
import AssignmentShimmer from "./AssignmentShimmer";
import { useThemeContext } from "../../../hooks/useTheme";
import { get, post } from "../../../utils/apis/TeacherApis/login";
import { useSelector } from "react-redux";
import { useIsFocused } from "@react-navigation/native";
import RNPickerSelect from "react-native-picker-select";
import { Ionicons, Entypo, AntDesign } from "react-native-vector-icons";
import CustomRefreshControl from "../../common/CustomResources/CustomRefreshControl";

// import { theme } from "../../../theming";

const AssignmentData = [
  {
    subject: "Biology",
    details: [
      {
        class: "FYJC- 11A",
        title: "Microscopy Techniques",
        description:
          "Prepare a report on different types of microscopes and their uses in biology.",
        completed: 40,
        pending: 10,
        dueDate: "22 may 2024",
      },
      {
        class: "FYJC- 11A",
        title: "Microscopy Techniques",
        description:
          "Prepare a report on different types of microscopes and their uses in biology.",
        completed: 40,
        pending: 10,
        dueDate: "22 may 2024",
      },
      {
        class: "FYJC- 11A",
        title: "Microscopy Techniques",
        description:
          "Prepare a report on different types of microscopes and their uses in biology.",
        completed: 40,
        pending: 10,
        dueDate: "22 may 2024",
      },
    ],
  },
  {
    subject: "Chemistry",
    details: [
      {
        class: "FYJC- 11A",
        title: "Microscopy Techniques",
        description:
          "Prepare a report on different types of microscopes and their uses in biology.",
        completed: 40,
        pending: 10,
        dueDate: "22 may 2024",
      },
      {
        class: "FYJC- 11A",
        title: "Microscopy Techniques",
        description:
          "Prepare a report on different types of microscopes and their uses in biology.",
        completed: 40,
        pending: 10,
        dueDate: "22 may 2024",
      },
      {
        class: "FYJC- 11A",
        title: "Microscopy Techniques",
        description:
          "Prepare a report on different types of microscopes and their uses in biology.",
        completed: 40,
        pending: 10,
        dueDate: "22 may 2024",
      },
    ],
  },
];

const statusData = [
  { label: "Completed", value: "Completed" },
  { label: "Pending", value: "Pending" },
];

export default function TeacherAssignment({ navigation }) {
  const { theme } = useThemeContext();
  const [isLoading, setIsLoading] = useState(true);
  const [assignments, setAssignments] = useState([]);
  const [subjectList, setSubjectList] = useState([]);
  const [selectedSubject, setselectedSubject] = useState([]);
  const user = useSelector((state) => state.login.user);
  const TeacherId = user?.teacherId;
  const isFocused = useIsFocused();
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    const fetchassignmentData = async () => {
      try {
        setIsLoading(true);
        const response = await get(`assignments/group/${TeacherId}`);
        if (response?.errCode == -1) {
          setAssignments(response.data);
          setIsLoading(false);
          console.log(`Assignments Response`, response.data);
        }
      } catch (error) {
        console.log(error);
        setIsLoading(false);
      } finally {
        setIsLoading(false);
        setRefreshing(false);
      }
    };

    fetchassignmentData();
  }, []);

  const CustomRefreshControl = () => (
    <RefreshControl
      refreshing={refreshing}
      onRefresh={onRefresh}
      colors={["#0000ff"]}
      tintColor={"#0000ff"}
      title={"Refreshing..."}
      titleColor={"#0000ff"}
    />
  );

  const getSubjectList = async () => {
    const response = await post("teacher/subject", { teacherId: TeacherId });
    console.log(`classList`, response);
    if (response?.errCode == -1) {
      setSubjectList(
        response?.data.map((item) => ({ label: item?.name, value: item?.id }))
      );
    } else {
      setSubjectList([]);
    }
  };

  useEffect(() => {
    getSubjectList();
    // getAssignmentonSubject();
  }, [isFocused]);

  const getAssignmentonSubject = async () => {};

  const handleStatusChange = async (value) => {
    setselectedSubject(value);
    try {
      const response = await post("assignments/subject", {
        subjectId: value,
        teacherId: TeacherId,
      });
      console.log(`getAssignmentonSubject`, response);
      if (response?.errCode == -1) {
        setAssignments(response?.data);
      } else {
        console.log("Something went wrong");
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
            Assignments
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
      headerTitleAlign: "center", // Adjust alignment for header title (if needed)
      headerTintColor: "#000000", // Text color for back button and header title
    });
  }, [navigation, theme]);

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={{
        display: "flex",
        flexDirection: "column",
        columnGap: 30,
        paddingVertical: 8,
      }}
      onPress={() => {
        navigation.navigate("ShowAssignment", {
          item,
        });
      }}
    >
      <View
        style={{
          backgroundColor: theme.cardBackground,
          display: "flex",
          flexDirection: "column",
          gap: 10,
          borderRadius: 8,
          paddingVertical: 8,
          paddingHorizontal: 16,
        }}
      >
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Text
            style={{
              fontSize: 12,
              fontWeight: 600,
              color: theme.primaryTextColor,
            }}
          >
            {item?.class?.name}
          </Text>
          <View
            style={{
              display: "flex",
              flexDirection: "row",
            }}
          >
            <Text style={{ color: theme.primaryTextColor, fontSize: 12 }}>
              Due date:{" "}
            </Text>
            <Text style={{ color: theme.primaryTextColor, fontSize: 12 }}>
              {item.dueDate}
            </Text>
          </View>
        </View>
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Text
            style={{
              fontSize: 12,
              fontWeight: 600,
              color: theme.primaryTextColor,
            }}
          >
            {item?.name}
          </Text>

          <View>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate("Grade", {
                  AssignmentData: item,
                });
              }}
            >
              <Text
                style={{
                  color: theme.primarycolor,
                  fontSize: 14,
                  fontWeight: 500,
                  textDecorationLine: "underline",
                }}
              >
                Grade
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        <View>
          <Text
            style={{
              fontSize: 10,
              fontWeight: 400,
              color: theme.secondaryTextColor,
            }}
          >
            {item.description}
          </Text>
        </View>
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <View
            style={{
              display: "flex",
              flexDirection: "row",
            }}
          >
            <Text
              style={{
                fontSize: 12,
                fontWeight: 600,
                color: theme.primaryTextColor,
              }}
            >
              Completed :{" "}
            </Text>
            <Text
              style={{
                fontSize: 12,
                fontWeight: 500,
                color: "#30A81D",
              }}
            >
              {item.completed}
            </Text>
          </View>
          <View
            style={{
              display: "flex",
              flexDirection: "row",
            }}
          >
            <Text
              style={{
                fontSize: 12,
                fontWeight: 600,
                color: theme.primaryTextColor,
              }}
            >
              Pending :{" "}
            </Text>
            <Text
              style={{
                fontSize: 12,
                fontWeight: 500,
                color: "#E01414",
              }}
            >
              {" "}
              {item.pending}
            </Text>
          </View>
        </View>
      </View>

      {/* <Text style={styles.textColor}>Class: {item.class}</Text>
      <Text style={styles.textColor}>Title: {item.title}</Text>
      <Text style={styles.textColor}>Description: {item.description}</Text>
      <Text style={styles.textColor}>Completed: {item.completed}</Text>
      <Text style={styles.textColor}>Pending: {item.pending}</Text> */}
    </TouchableOpacity>
  );
  const renderSectionHeader = ({ section: { subject } }) => (
    <View style={{ paddingLeft: 10 }}>
      <Text
        style={{
          fontSize: 18,
          fontWeight: "bold",
          marginVertical: 10,
          color: theme.primaryTextColor,
        }}
      >
        {subject}
      </Text>
    </View>
  );

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  }, []);

  useEffect(() => {
    fetchAssignments();
    // setAssignments(AssignmentData);
  }, [isFocused]);

  const fetchAssignments = async () => {
    try {
      const response = await get(`assignments/group/${TeacherId}`);
      if (response?.errCode == -1) {
        setAssignments(response.data);
        setIsLoading(false);
        console.log(`Assignments Response`, response.data);
      }
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    } finally {
      setIsLoading(false);
      setRefreshing(false);
    }
  };

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <AssignmentShimmer />
      </View>
    );
  }

  return (
    <SafeAreaView
      style={{
        width: "100%",
        height: "100%",
        backgroundColor: theme.backgroundColor,
      }}
    >
      <View
        style={{ backgroundColor: theme.backgroundColor, marginBottom: 40 }}
      >
        {/* {AssignmentData &&
      AssignmentData.map((assignmentData, index) => (
        <View key={index}>
          <Text style={styles.subjectHeader}>
            {assignmentData.subject}
          </Text>
          <FlatList
            data={assignmentData.details}
            renderItem={renderItem}
            keyExtractor={(item, index) => index.toString()}
          />
        </View>
      ))} */}
        <View style={{ marginHorizontal: 20 }}>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("AddAssignment");
            }}
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "flex-end",
              alignItems: "center",
              marginTop: 10,
            }}
          >
            <MaterialIcons
              name="add-circle-outline"
              size={20}
              color={theme.primarycolor}
            />
            <Text
              style={{
                color: theme.primarycolor,
                fontSize: 12,
                fontWeight: "500",
              }}
            >
              Assignment
            </Text>
          </TouchableOpacity>
        </View>
        <View style={{ marginHorizontal: 20, marginTop: 10 }}>
          <RNPickerSelect
            onValueChange={(value) => {
              handleStatusChange(value);
            }}
            items={subjectList}
            placeholder={{ label: " Select class", value: "" }}
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
            value={selectedSubject}
            useNativeAndroidPickerStyle={false}
          />
        </View>
        {assignments.length > 0 ? (
          <View style={{ marginHorizontal: 20 }}>
            <CustomRefreshControl refreshing={refreshing} />
            <SectionList
              sections={assignments.map(({ subject, details }) => ({
                subject,
                data: details,
              }))}
              keyExtractor={(item, index) => index}
              renderItem={renderItem}
              renderSectionHeader={renderSectionHeader}
              refreshControl={
                <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
              }
            />
          </View>
        ) : (
          <View
            style={{
              height: "100%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Text
              style={{
                // fontStyle: "italic",
                fontSize: 24,
                // color:'#2B78CA'
                fontFamily: "Poppins_600SemiBold_Italic",
                color: theme.primaryTextColor,
              }}
            >
              {" "}
              No Assignments Found
            </Text>
          </View>
        )}

        {/* {data &&
    Object.keys(data).map((item: any) => (
      <View>
        <Text style={styles.textColor}>{JSON.stringify(item[0])}</Text>
      </View>
    ))} */}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({});
