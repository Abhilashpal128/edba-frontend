import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import { useThemeContext } from "../../../hooks/useTheme";
import AllNoticesEvents from "../../common/NoticesEvents/AllNoticesEvents";

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

export default function StudentNoticesAndEvennts() {
  const { theme } = useThemeContext();
  const [eventsNotices, setEventsNotices] = useState([]);

  useState(() => {
    setEventsNotices(Events);
  }, []);
  return (
    <SafeAreaView style={{ backgroundColor: theme.backgroundColor }}>
      <View style={{ marginTop: 20 }}>
        <AllNoticesEvents allNoticesAndEvents={eventsNotices} />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({});
