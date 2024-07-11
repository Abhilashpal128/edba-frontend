import {
  Alert,
  Animated,
  Image,
  RefreshControl,
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
  useRef,
  useState,
} from "react";
import TodaysClasses from "../../common/TodaysClasses";
import NoticesEvents from "../../common/NoticesEvents";
// import StudentAttendence from "../../common/StudentAttendence/StudentAttendence";
import TodayAttendance from "../../common/StudentAttendence/StudentAttendence";
import Icon from "react-native-vector-icons/Ionicons";
import { Ionicons, Entypo } from "react-native-vector-icons";
import { get, post } from "../../../utils/apis/TeacherApis/login";
import moment from "moment";
import { useIsFocused, useNavigation } from "@react-navigation/native";
// import { theme } from "../../../theming";
import { useThemeContext } from "../../../hooks/useTheme";
import { useSelector } from "react-redux";
import Toast from "react-native-toast-message";
import AsyncStorage from "@react-native-async-storage/async-storage";

const exchangeRequest = [
  { teacherName: "Abhilash", exchangeRequestId: "122233" },
  { teacherName: "Abhishek", exchangeRequestId: "12233" },
  { teacherName: "Rahul", exchangeRequestId: "133" },
];

export default function TeacherHome() {
  const { theme } = useThemeContext();
  const [NoticesData, setNoticesData] = useState([]);
  const [todaysClassesData, setTodaysClassesData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [exchangeRequests, setExchangeRequests] = useState([]);
  const [unseenCount, setUnseenCount] = useState(0);
  const today = moment(new Date()).format("YYYY-MM-DD").toString();
  console.log(`today`, today);
  const navigation = useNavigation();
  const user = useSelector((state) => state?.login?.user);
  const TeacherId = user?.teacherId;
  const userProfileImage = "../../../assets/logo.png"; //will be taken from  redux
  const isFocused = useIsFocused();
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    fetchNotices();
    fetchTodaysClasses();
  }, []);

  const fetchTodaysClasses = async () => {
    try {
      // const response = await get(
      //   `timetables/teacher/${TeacherId}?date=${today}`
      //   // "timetables/teacher/666aba882b44b74d48c92c64?date=2024-07-18"
      // );
      // console.log(`responsewTodaysClasses`, response);
      // if (response.success == true) {
      //   setTodaysClassesData(response.data);
      // } else {
      //   setTodaysClassesData([]);
      // }
      setIsLoading(true);
      const response = await post("timetable/search", {
        teacher: TeacherId,
        date: today,
      });
      console.log(`TodaysClassesData response`, response);
      if (response.errCode == -1) {
        setTodaysClassesData(response?.data);
        setIsLoading(false);
      } else {
        setTodaysClassesData([]);
      }
    } catch (error) {
      console.log(error.message);
    } finally {
      setIsLoading(false);
      setRefreshing(false);
    }
  };

  const fetchNotices = async () => {
    try {
      setIsLoading(true);
      const response = await get("event-notices/get");
      console.log(`response`, response);

      if (response?.errCode == -1) {
        console.log(`response.data`, response?.data);
        setNoticesData(response?.data);
        setIsLoading(false);
      } else {
        setIsLoading(false);
        setNoticesData([]);
      }
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    } finally {
      setIsLoading(false);
      setRefreshing(false);
    }

    // const response = await get("events");
    // console.log(`response.data `, response.data);
    // setNoticesData(response.data);
    // setIsLoading(false);
  };

  const Events = [
    {
      title: "Biology Practical Exhebition",
      venue: "School/College Biology Laboratory",
      date: "15 may 2024",
      time: "1 Hour",
    },
    {
      title: "Biology Practical Exhebition",
      venue: "School/College Biology Laboratory",
      date: "15 may 2024",
      time: "1 Hour",
    },
    {
      name: "Biology Practical Exhebition",
      place: "School/College Biology Laboratory",
      date: "15 may 2024",
      duration: "1 Hour",
    },
  ];

  const GraphData = [
    { value: 50, label: "11A" },
    { value: 36, label: "11B" },
    { value: 50, label: "11C" },
    { value: 30, label: "11D" },
    { value: 18, label: "11E" },
    { value: 18, label: "12A" },
    { value: 18, label: "12B" },
  ];
  const classData = [
    {
      classId: "Class-52024-e2a093f5-7ad4-433b-b8f2-cf04d279ba2c",
      className: "Biology",
      presentCount: 3,
      absentCount: 2,
      lateCount: 0,
      excusedCount: 0,
    },
    {
      classId: "Class-52024-c8e6fc20-0b77-4d50-a883-932851355be4",
      className: "Chemistry",
      presentCount: 3,
      absentCount: 2,
      lateCount: 0,
      excusedCount: 0,
    },
  ];
  const ptData = {
    labels: classData.map((item) => item.className), // X-axis labels
    datasets: [
      {
        data: classData.map((item) => item.presentCount),
        color: () => theme.primarycolor,
      },
    ],
  };
  const showToast = () => {
    Toast.show({
      type: "success",
      text1: `You have ${unseenCount}  class Exchange request`,
      // text2: exchangeRequest.map((item) => `${item?.teacherName}, `),
      // onPress: () => {
      //   navigation.navigate("Notification");
      // },
      visibilityTime: 2000,
    });
  };

  const fetchNotifications = async () => {
    try {
      const storedNotifications = await AsyncStorage.getItem("notifications");
      console.log(`Notifications`, storedNotifications);

      if (storedNotifications) {
        // setNotifications(JSON.parse(storedNotifications));
        const NotificationData = JSON.parse(storedNotifications);
        const unseenNotifications = NotificationData.filter(
          (notification) => !notification.seen
        );
        setUnseenCount(unseenNotifications.length);
        console.log(`unseenNotifications.length`, unseenNotifications.length);
        console.log(`Notifications Home page`, storedNotifications);
      }
    } catch (error) {
      console.error("Failed to fetch notifications", error);
    }
  };

  useEffect(() => {
    // showToast();
    // setExchangeRequests(exchangeRequest);
    // if (exchangeRequest.length > 0) {
    //   showToast(exchangeRequest);
    // }
    showToast();

    fetchNotifications();
  }, [isFocused]);

  // useEffect(() => {
  //   const fetchNotifications = async () => {
  //     try {
  //       const storedNotifications = await AsyncStorage.getItem("notifications");
  //       console.log(`Notifications`, storedNotifications);

  //       if (storedNotifications) {
  //         setNotifications(JSON.parse(storedNotifications));
  //         console.log(`Notifications`, storedNotifications);
  //       }
  //     } catch (error) {
  //       console.error("Failed to fetch notifications", error);
  //     }
  //   };

  //   fetchNotifications();
  // }, [isFocused]);

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
        // style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <Text
            style={{
              color: theme.primaryTextColor,
              fontSize: 18,
              fontWeight: "bold",
              // textAlign: "center",
            }}
          >
            {/* {classDetailTab ? "Class details" : "TimeTable"} */}
            Home
          </Text>
        </View>
      ),

      headerRight: () => (
        <View
          style={{
            marginRight: 10,
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            gap: 10,
            marginRight: 10,
          }}
        >
          <TouchableOpacity
            style={{ position: "relative" }}
            onPress={() => navigation.navigate("Notification")}
          >
            {unseenCount > 0 && (
              <View
                style={{
                  position: "absolute",
                  right: -3,
                  top: -3,
                  backgroundColor: "#FF9000",
                  borderRadius: 5,
                  width: 10,
                  height: 10,
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Text
                  style={{
                    color: "white",
                    fontSize: 12,
                    fontWeight: "bold",
                  }}
                ></Text>
              </View>
            )}
            <Ionicons
              name="notifications"
              size={24}
              color={theme.secondaryTextColor}
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("Profile");
            }}
            style={{ marginRight: 10 }}
          >
            <Image
              source={require(userProfileImage)}
              resizeMode="contain"
              style={{
                width: 40,
                height: 40,
                borderRadius: 20,
                backgroungColor: "black",
              }}
            />
          </TouchableOpacity>
        </View>
      ),
      headerStyle: {
        backgroundColor: theme.backgroundColor,
      },
      // headerTitleAlign: "center",
      headerTintColor: "#000000",
    });
  }, [navigation, theme, unseenCount]);

  const slideAnim = useRef(new Animated.Value(1000)).current;
  useEffect(() => {
    Animated.timing(slideAnim, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
    }).start();
  }, [slideAnim]);

  // const studentAttendence = [
  //   { className: "11A", presentStudents: "39" },
  //   { className: "11B", presentStudents: "41" },
  //   { className: "11B", presentStudents: "44" },
  //   { className: "11C", presentStudents: "41" },
  //   { className: "11D", presentStudents: "47" },
  //   { className: "12A", presentStudents: "42" },
  //   { className: "12B", presentStudents: "50" },
  // ];

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    fetchNotices();
    fetchTodaysClasses();
    // fetchAssignments();
  }, []);

  return (
    <Animated.View
      style={[
        {
          bottom: 0,
          width: "100%",
          height: "100%",
          backgroundColor: theme.backgroundColor,
          justifyContent: "center",
          alignItems: "center",
        },
        { transform: [{ translateY: slideAnim }] },
      ]}
    >
      <View>
        <ScrollView
          style={{ backgroundColor: theme.backgroundColor }}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        >
          <View style={{}}>
            <TodaysClasses
              TodaysClassesData={todaysClassesData}
              isLoading={isLoading}
              setIsLoading={setIsLoading}
            />
            <NoticesEvents
              Events={NoticesData}
              isLoading={isLoading}
              setIsLoading={setIsLoading}
            />
            <TodayAttendance
              GraphData={ptData}
              isLoading={isLoading}
              setIsLoading={setIsLoading}
            />
          </View>
          {unseenCount > 0 && <Toast />}
        </ScrollView>
      </View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({});
