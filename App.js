// import { NavigationContainer } from "@react-navigation/native";
// import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
// import AppNavigator from "./navigations/AppNavigator";
// import { Provider } from "react-redux";
// import store from "./Redux/store";
// import { ThemeProvider } from "./hooks/useTheme";
import { Text } from "react-native";
import Main from "./navigations/index";
import { useEffect } from "react";
// import { registerForPushNotificationsAsync } from "./Notifications/NotificationService";
import * as Notifications from "expo-notifications";
import { registerForPushNotificationsAsync } from "./Notifications/NotificationService";
import AsyncStorage from "@react-native-async-storage/async-storage";
// import { useDispatch } from "react-redux";
import { setToken } from "./Redux/slices/Tokenslice";
// import { setUpNotificationHandler } from "./Notifications/setupnotificationHandler";

Text.defaultProps = Text.defaultProps || {};
Text.defaultProps.allowFontScaling = false;

export default function App() {
  // const dispatch = useDispatch();
  // useEffect(() => {
  //   const setupNotifications = async () => {
  //     const expoPushToken = await registerForPushNotificationsAsync();
  //     if (expoPushToken) {
  //       console.log("Expo push token:", expoPushToken);
  //       // You can save the expoPushToken to your server or use it directly to send notifications
  //     }
  //   };

  //   setupNotifications();

  //   Notifications.setNotificationHandler({
  //     handleNotification: async () => ({
  //       shouldShowAlert: true,
  //       shouldPlaySound: true,
  //       shouldSetBadge: false,
  //     }),
  //   });
  //   // const saveNotification = async (notification) => {
  //   //   try {
  //   //     const storedNotifications = await AsyncStorage.getItem("notifications");
  //   //     console.log("Stored notifications:", storedNotifications);

  //   //     const notifications = storedNotifications
  //   //       ? JSON.parse(storedNotifications)
  //   //       : [];
  //   //     notifications.push(notification);

  //   //     await AsyncStorage.setItem(
  //   //       "notifications",
  //   //       JSON.stringify(notifications)
  //   //     );
  //   //     console.log("Notification saved successfully:", notification);
  //   //   } catch (error) {
  //   //     console.error("Failed to save notification", error);
  //   //   }
  //   // };

  //   const notificationListener = Notifications.addNotificationReceivedListener(
  //     (notification) => {
  //       console.log("Notification received in App.js:", notification);
  //       // saveNotification(notification);
  //       Alert.alert("New Notification", "You have a new notification");
  //     }
  //   );

  //   const responseListener =
  //     Notifications.addNotificationResponseReceivedListener((response) => {
  //       console.log("Notification response received:", response);
  //       // saveNotification(response.notification);
  //     });

  //   return () => {
  //     notificationListener.remove();
  //     responseListener.remove();
  //   };
  // }, []);

  // useEffect(() => {
  //   const setupNotifications = async () => {
  //     try {
  //       const expoPushToken = await registerForPushNotificationsAsync();
  //       if (expoPushToken) {
  //         console.log("Expo push token:", expoPushToken);
  //         // You can save the expoPushToken to your server or use it directly to send notifications
  //       }
  //     } catch (error) {
  //       console.error("Failed to register for push notifications:", error);
  //     }
  //   };

  //   const registerForPushNotificationsAsync = async () => {
  //     let token;
  //     try {
  //       const { status } = await Notifications.requestPermissionsAsync();
  //       if (status !== "granted") {
  //         throw new Error("Permission to receive notifications was denied");
  //       }
  //       const response = await Notifications.getExpoPushTokenAsync();
  //       token = response.data;
  //     } catch (error) {
  //       console.error("Failed to get push token:", error);
  //     }
  //     return token;
  //   };

  //   const saveNotification = async (notification) => {
  //     try {
  //       const storedNotifications = await AsyncStorage.getItem("notifications");
  //       const notifications = storedNotifications
  //         ? JSON.parse(storedNotifications)
  //         : [];
  //       notifications.push(notification);
  //       await AsyncStorage.setItem(
  //         "notifications",
  //         JSON.stringify(notifications)
  //       );
  //       console.log("Notification saved successfully:", notification);
  //     } catch (error) {
  //       console.error("Failed to save notification", error);
  //     }
  //   };
  //   Notifications.setNotificationHandler({
  //     handleNotification: async (notification) => {
  //       console.log("Notification received:", notification);
  //       saveNotification(notification);
  //       return {
  //         shouldShowAlert: true,
  //         shouldPlaySound: true,
  //         shouldSetBadge: false,
  //       };
  //     },
  //   });

  //   const notificationListener = Notifications.addNotificationReceivedListener(
  //     (notification) => {
  //       console.log("Notification received in App.js:", notification);
  //       saveNotification(notification);
  //       Alert.alert("New Notification", "You have a new notification");
  //     }
  //   );

  //   const responseListener =
  //     Notifications.addNotificationResponseReceivedListener((response) => {
  //       console.log("Notification response received:", response);
  //       saveNotification(response.notification);
  //     });

  //   return () => {
  //     notificationListener.remove();
  //     responseListener.remove();
  //   };
  //   setupNotifications();
  //   setupNotificationListeners();

  //   return () => {};
  // }, []);

  // useEffect(() => {
  //   const setupNotifications = async () => {
  //     try {
  //       const expoPushToken = await registerForPushNotificationsAsync();
  //       if (expoPushToken) {
  //         console.log("Expo push token: inn app .js", expoPushToken);
  //         // dispatch(setToken());
  //         // You can save the expoPushToken to your server or use it directly to send notifications
  //       }
  //     } catch (error) {
  //       console.error("Failed to register for push notifications:", error);
  //     }
  //   };

  //   const registerForPushNotificationsAsync = async () => {
  //     let token;
  //     try {
  //       const { status } = await Notifications.getPermissionsAsync();
  //       if (status !== "granted") {
  //         const { status: newStatus } =
  //           await Notifications.requestPermissionsAsync();
  //         console.log(`permisssions from start of the application`, newStatus);
  //         if (newStatus !== "granted") {
  //           console.log("Permission to receive notifications was denied");
  //           return null;
  //         }
  //       }
  //       token = (await Notifications.getExpoPushTokenAsync()).data;
  //     } catch (error) {
  //       console.error("Error getting push token:", error);
  //     }
  //     return token;
  //   };

  //   const saveNotification = async (notification) => {
  //     try {
  //       const storedNotifications = await AsyncStorage.getItem("notifications");
  //       const notifications = storedNotifications
  //         ? JSON.parse(storedNotifications)
  //         : [];
  //       notifications.push(notification);
  //       await AsyncStorage.setItem(
  //         "notifications",
  //         JSON.stringify(notifications)
  //       );
  //       console.log("Notification saved successfully:", notification);
  //     } catch (error) {
  //       console.error("Failed to save notification", error);
  //     }
  //   };

  //   const handleNotification = async (notification) => {
  //     console.log("Notification received in App.js:", notification);
  //     saveNotification(notification);
  //     Alert.alert("New Notification", "You have a new notification");
  //   };

  //   const handleNotificationResponse = async (response) => {
  //     console.log("Notification response received:", response);
  //     saveNotification(response.notification);
  //   };

  //   const setupNotificationListeners = () => {
  //     Notifications.setNotificationHandler({
  //       handleNotification: async () => ({
  //         shouldShowAlert: true,
  //         shouldPlaySound: true,
  //         shouldSetBadge: false,
  //       }),
  //     });

  //     const notificationListener =
  //       Notifications.addNotificationReceivedListener(handleNotification);
  //     const responseListener =
  //       Notifications.addNotificationResponseReceivedListener(
  //         handleNotificationResponse
  //       );

  //     return () => {
  //       notificationListener.remove();
  //       responseListener.remove();
  //     };
  //   };

  //   setupNotifications();
  //   setupNotificationListeners();

  //   return () => {};
  // }, []);

  return <Main />;
}

// export default registerRootComponent(App);
