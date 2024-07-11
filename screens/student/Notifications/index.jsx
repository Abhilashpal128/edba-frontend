import { StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import Notification from "../../common/Notifications";

const notificationData = [
  {
    title: "Attendance Marked",
    time: "08:15AM",
    message: "Todays attendance marked by Ms,Shayli",
  },
  {
    title: "Attendance Marked",
    time: "08:15AM",
    message: "Todays attendance marked by Ms,Shayli",
  },
];

export default function StudentNotification() {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    setNotifications(notificationData);
  }, []);
  return (
    <View>
      <Notification Notifications={notifications} />
    </View>
  );
}

const styles = StyleSheet.create({});
