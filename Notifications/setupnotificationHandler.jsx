// import { AppState, StyleSheet, Text, View } from "react-native";
// import React, { useEffect, useRef } from "react";
// import * as Notifications from "expo-notifications";

// export const setUpNotificationHandler = () => {
//   const appState = useRef(AppState.currentState);

//   useEffect(() => {
//     const foregroundSubscription =
//       Notifications.addNotificationReceivedListener((notification) => {
//         console.log(
//           "Notification received while app is in foreground:",
//           notification
//         );
//         Alert.alert("New Notification", "You have a new notification");
//       });

//     const backgrounSubscription =
//       Notifications.addNotificationResponseReceivedListener((response) => {
//         console.log("Notification response received:", response);
//       });

//     Notifications.setNotificationHandler({
//       handleNotification: (async = () => ({
//         shouldShowAlert: true,
//         shouldPlaySound: true,
//         shouldSetBadge: false,
//       })),
//     });

//     AppState.addEventListener("change", handleAppStateChange);

//     return () => {
//       foregroundSubscription.remove();
//       backgrounSubscription.remove();
//       AppState.removeEventListener("change", handleAppStateChange);
//     };
//   }, []);
// };

// const handleAppStateChange = (nextAppState) => {
//   // Example logic to handle app state change
//   if (nextAppState === "background") {
//     sendBackgroundNotification();
//   }
// };

// const sendBackgroundNotification = async () => {
//   // Example notification payload
//   const notificationContent = {
//     title: "New Message",
//     body: "You have a new message!",
//     // You can add more fields here as needed
//   };

//   await Notifications.scheduleNotificationAsync({
//     content: notificationContent,
//     trigger: null, // Immediately show the notification
//   });
// };

import { useEffect, useRef } from "react";
import { AppState, Alert } from "react-native";
import * as Notifications from "expo-notifications";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const setUpNotificationHandler = () => {
  const appState = useRef(AppState.currentState);

  const saveNotification = async (notification) => {
    try {
      console.log(`Notifications`, notification);
      const storedNotifications = await AsyncStorage.getItem("notifications");
      const notifications = storedNotifications
        ? JSON.parse(storedNotifications)
        : [];
      notifications.push(notification);
      await AsyncStorage.setItem(
        "notifications",
        JSON.stringify(notifications)
      );
      console.log("Notification saved successfully:", notification);
    } catch (error) {
      console.error("Failed to save notification", error);
    }
  };

  useEffect(() => {
    const foregroundSubscription =
      Notifications.addNotificationReceivedListener((notification) => {
        console.log(
          "Notification received while app is in foreground:",
          notification
        );
        Alert.alert("New Notification", "You have a new notification");
        saveNotification(notification);
      });

    const backgroundSubscription =
      Notifications.addNotificationResponseReceivedListener((response) => {
        console.log("Notification response received:", response);
        saveNotification(response?.notification);
      });

    Notifications.setNotificationHandler({
      handleNotification: async () => ({
        shouldShowAlert: true,
        shouldPlaySound: true,
        shouldSetBadge: false,
      }),
    });
    appState.addEventListener("change", handleAppStateChange);

    return () => {
      foregroundSubscription.remove();
      backgroundSubscription.remove();
      appState.removeEventListener("change", handleAppStateChange);
    };
  }, []);
};

const handleAppStateChange = (nextAppState) => {
  if (nextAppState === "background") {
    sendBackgroundNotification();
  }
};

const sendBackgroundNotification = async () => {
  const notificationContent = {
    title: "New Message",
    body: "You have a new message!",
  };

  await Notifications.scheduleNotificationAsync({
    content: notificationContent,
    trigger: null,
  });
};
