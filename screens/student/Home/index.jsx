import {
  Animated,
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React, {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import { useThemeContext } from "../../../hooks/useTheme";
import StudentsTodaysClasses from "./TodaysClasses";
import Assignments from "./Assignments";
import NoticesEvents from "../../common/NoticesEvents";
import { useIsFocused, useNavigation } from "@react-navigation/native";
import { HomeHeader } from "../../common/Header/HomeHeader";
import { get, post } from "../../../utils/apis/StudentApis";
import { useSelector } from "react-redux";
import moment from "moment";

const TodaysClassesData = [
  { id: "01", subject: "Computer Science", time: "09:00AM" },
  { id: "02", subject: "Hindi", time: "09:00AM" },
  { id: "03", subject: "Marathi", time: "09:00AM" },
  { id: "04", subject: "Geography", time: "09:00AM" },
  { id: "05", subject: "Science", time: "09:00AM" },
  { id: "06", subject: "Maths", time: "09:00AM" },
  { id: "07", subject: "history", time: "09:00AM" },
];

const AssignmentsData = [
  { subject: "English", AssignmentsNo: "2" },
  { subject: "Hindi", AssignmentsNo: "2" },
  { subject: "Marathi", AssignmentsNo: "2" },
  { subject: "Geography", AssignmentsNo: "2" },
  { subject: "Science", AssignmentsNo: "2" },
  { subject: "Math", AssignmentsNo: "2" },
  { subject: "History", AssignmentsNo: "2" },
];

const Events = [
  {
    title: "Biology Practical Exhebition",
    venue: "School/College Biology Laboratory",
    date: "2024-04-15",
    time: "1 Hour",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam hendrerit nisi sed sollicitudin pellentesque. Nunc posuere purus rhoncus pulvinar aliquam.",
  },
  {
    title: "Physics Practical Exhebition",
    venue: "School/College Biology Laboratory",
    date: "2024-04-16",
    time: "1 Hour",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam hendrerit nisi sed sollicitudin pellentesque. Nunc posuere purus rhoncus pulvinar aliquam.",
  },
  {
    title: "Chemistry Practical Exhebition",
    venue: "School/College Biology Laboratory",
    date: "2024-04-17",
    time: "1 Hour",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam hendrerit nisi sed sollicitudin pellentesque. Nunc posuere purus rhoncus pulvinar aliquam.",
  },
  {
    title: "Maths Practical Exhebition",
    venue: "School/College Biology Laboratory",
    date: "2024-04-18",
    time: "1 Hour",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam hendrerit nisi sed sollicitudin pellentesque. Nunc posuere purus rhoncus pulvinar aliquam.",
  },
  {
    title: "Maths Practical Exhebition",
    venue: "School/College Biology Laboratory",
    date: "2024-04-18",
    time: "1 Hour",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam hendrerit nisi sed sollicitudin pellentesque. Nunc posuere purus rhoncus pulvinar aliquam.",
  },
  {
    title: "Maths Practical Exhebition",
    venue: "School/College Biology Laboratory",
    date: "2024-04-18",
    time: "1 Hour",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam hendrerit nisi sed sollicitudin pellentesque. Nunc posuere purus rhoncus pulvinar aliquam.",
  },
];

export default function StudentHome() {
  const { theme } = useThemeContext();
  const [todaysClassesData, setTodaysClassesData] = useState([]);
  const [assignments, setAssignments] = useState([]);
  const [subjectList, setsubjectList] = useState([]);
  const [Notices, setNotices] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigation = useNavigation();
  const screenName = "Home";
  const isFocused = useIsFocused();
  const userdata = useSelector((state) => state?.login?.user);
  const studentId = userdata?.studentId;
  const Today = moment().format("YYYY-MM-DD");
  const [classData, setclassData] = useState();
  const [refreshing, setRefreshing] = useState(false);
  const [classesLoading, setClassedLoading] = useState(true);
  const [assignmentLoading, setAssignmentLoading] = useState(true);

  const slideAnim = useRef(new Animated.Value(1000)).current;
  useEffect(() => {
    Animated.timing(slideAnim, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
    }).start();
  }, [slideAnim]);

  const fetchNoticesAndEvents = async () => {
    try {
      setIsLoading(true);
      const response = await post("event-notices/class-events", {
        classId: "Class-52024-e2a093f5-7ad4-433b-b8f2-cf04d279ba2c",
      });
      console.log(`response`, response);

      if (response?.errCode == -1) {
        console.log(`response.data`, response?.data);
        setNotices(response?.data);
        setIsLoading(false);
      } else {
        setIsLoading(false);
        setNotices([]);
      }
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    } finally {
      setRefreshing(false);
      setIsLoading(false);
    }
  };

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    fetchNoticesAndEvents();
    fetchSubjectList();
    fetchClassData();
  }, []);

  const fetchSubjectList = async () => {
    try {
      setAssignmentLoading(true);
      const response = await post("classes/student-subject", {
        studentId: studentId,
      });
      if (response?.errCode == -1) {
        setsubjectList(response?.data);
        setAssignmentLoading(false);
      } else {
        setsubjectList([]);
        setAssignmentLoading(false);
      }
    } catch (error) {
      console.log(`error from fetchSubjectList`, error);
      setAssignmentLoading(false);
    } finally {
      setRefreshing(false);
      setAssignmentLoading(false);
    }
  };

  const fetchClassData = async () => {
    try {
      setClassedLoading(true);
      const response = await post("classes/getClass", {
        studentId: studentId,
      });
      console.log(`fetchClassData`, response);
      if (response?.errCode == -1) {
        setclassData(response?.data[0]);
        fetchTodaysClassesdata(response?.data[0]?.id);
        setClassedLoading(false);
      }
    } catch (error) {
      console.log(`error from fetchClassData`, error);
      setClassedLoading(false);
    } finally {
      setRefreshing(false);
      setClassedLoading(false);
    }
  };

  const fetchTodaysClassesdata = async (classId) => {
    const response = await post("timetable/student", {
      classId: classId,
      date: Today,
    });
    console.log(`fetchTodaysClassesdata`, response);
    if (response?.errCode == -1) {
      setTodaysClassesData(response?.data);
    }
  };

  useEffect(() => {
    // setAssignments(AssignmentsData);
    fetchSubjectList();
    // setTodaysClassesData(TodaysClassesData);
    // setNotices(Events);
    fetchNoticesAndEvents();
    fetchClassData();
  }, []);

  useLayoutEffect(() => {
    navigation.setOptions(HomeHeader({ navigation, theme }));
  }, [navigation, theme]);

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
      <ScrollView
        style={{ backgroundColor: theme.backgroundColor }}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <View style={{ width: "100%", height: "100%", gap: 10 }}>
          <StudentsTodaysClasses
            todaysClassesData={todaysClassesData}
            setClassedLoading={setClassedLoading}
            classesLoading={classesLoading}
          />
          <Assignments
            subjectList={subjectList}
            setAssignmentLoading={setAssignmentLoading}
            assignmentLoading={assignmentLoading}
          />
          <NoticesEvents
            Events={Notices}
            isLoading={isLoading}
            setIsLoading={setIsLoading}
          />
        </View>
      </ScrollView>
    </Animated.View>
  );
}

const styles = StyleSheet.create({});
