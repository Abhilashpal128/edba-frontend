import { Animated, ScrollView, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import { useThemeContext } from "../../../hooks/useTheme";
import StudentsTodaysClasses from "./TodaysClasses";
import Assignments from "./Assignments";
import NoticesEvents from "../../common/NoticesEvents";
import { useNavigation } from "@react-navigation/native";
import { HomeHeader } from "../../common/Header/HomeHeader";

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
  const [Notices, setNotices] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigation = useNavigation();
  const screenName = "Home";

  const slideAnim = useRef(new Animated.Value(1000)).current;
  useEffect(() => {
    Animated.timing(slideAnim, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
    }).start();
  }, [slideAnim]);

  useEffect(() => {
    setAssignments(AssignmentsData);
    setTodaysClassesData(TodaysClassesData);
    setNotices(Events);
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
      <ScrollView style={{ backgroundColor: theme.backgroundColor }}>
        <View style={{ width: "100%", height: "100%", gap: 10 }}>
          {/* <TodaysClasses TodaysClassesData={todaysClassesData} /> */}
          <StudentsTodaysClasses todaysClassesData={todaysClassesData} />
          <Assignments assignments={assignments} />
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
