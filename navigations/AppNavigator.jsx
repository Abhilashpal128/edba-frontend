import {
  createStackNavigator,
  TransitionPresets,
} from "@react-navigation/stack";
import React, { useState, useEffect } from "react";
import { View } from "react-native";
import StudentNavigator from "./StudentNavigator";
import TeacherNavigator from "./TeacherNavigator";
import AuthNavigator from "./AuthNavigator";
import TeacherDetailTabNavigator from "../screens/common/PersonalDetail/TeacherDetailTabNavigator";
import { useDispatch, useSelector } from "react-redux";
import * as Notifications from "expo-notifications";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { setToken } from "../Redux/slices/Tokenslice";
import { getDataFromStorage, storeDataInStorage } from "../Storage/storage";
import { login } from "../Redux/slices/LoginSlice";
import { useIsFocused, useNavigation } from "@react-navigation/native";

const AppNavigator = () => {
  let userData = useSelector((state) => state.login.user);
  // const [userData, setUserData] = useState(user);
  const IsFocused = useIsFocused();

  const Stack = createStackNavigator();
  console.log(`userData in AppNavigator`, userData);
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const UserLoginCheck = async () => {
    const userDataFromStorage = await getDataFromStorage("userData");
    console.log(`userDataFromStorage`, userDataFromStorage);
    if (userDataFromStorage != null) {
      console.log(`userDataFromStorage`, userDataFromStorage);
      // setUserData(userDataFromStorage);
      userData = userDataFromStorage;
      dispatch(login(userDataFromStorage));
    } else {
      // setUserData(null);
    }
  };
  useEffect(() => {
    UserLoginCheck();
  }, []);

  useEffect(() => {
    const setupNotifications = async () => {
      try {
        const expoPushToken = await registerForPushNotificationsAsync();
        if (expoPushToken) {
          console.log("Expo push token: AppNavigator.js", expoPushToken);

          dispatch(setToken(expoPushToken));
          // You can save the expoPushToken to your server or use it directly to send notifications
        }
      } catch (error) {
        console.error("Failed to register for push notifications:", error);
      }
    };

    const registerForPushNotificationsAsync = async () => {
      let token;
      try {
        const { status } = await Notifications.getPermissionsAsync();
        if (status !== "granted") {
          const { status: newStatus } =
            await Notifications.requestPermissionsAsync();
          console.log(`permisssions from start of the application`, newStatus);
          if (newStatus !== "granted") {
            console.log("Permission to receive notifications was denied");
            return null;
          }
        }
        token = (await Notifications.getExpoPushTokenAsync()).data;
      } catch (error) {
        console.error("Error getting push token:", error);
      }
      return token;
    };

    const handleNotification = async (notification) => {
      console.log("Notification received in :", notification);
      Alert.alert("New Notification", "You have a new notification");
    };

    const handleNotificationResponse = async (response) => {
      console.log(
        "Notification response received: in Appnavigator",
        response?.notification
      );
      navigation.navigate("Notification");
    };

    const setupNotificationListeners = () => {
      Notifications.setNotificationHandler({
        handleNotification: async () => ({
          shouldShowAlert: true,
          shouldPlaySound: true,
          shouldSetBadge: false,
        }),
      });

      const notificationListener =
        Notifications.addNotificationReceivedListener(handleNotification);
      const responseListener =
        Notifications.addNotificationResponseReceivedListener(
          handleNotificationResponse
        );

      return () => {
        notificationListener.remove();
        responseListener.remove();
      };
    };

    setupNotifications();
    setupNotificationListeners();

    return () => {};
  }, []);

  // UserLoginCheck();

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        ...TransitionPresets.SlideFromRightIOS,
      }}
    >
      {userData != null ? (
        userData.role == "student" ? (
          <Stack.Screen name="Student" component={StudentNavigator} />
        ) : userData.role == "teacher" ? (
          <>
            <Stack.Screen name="Teacher" component={TeacherNavigator} />
            <Stack.Screen
              name="ProfileTeacher"
              component={TeacherDetailTabNavigator}
            />
          </>
        ) : (
          <Stack.Screen name="Auth" component={AuthNavigator} />
        )
      ) : (
        <Stack.Screen name="Auth" component={AuthNavigator} />
      )}
      {/* {userData != null ? (
        userData.password === "student" ? (
          <Stack.Screen name="Student" component={StudentNavigator} />
        ) : userData.password === "teacher" ? (
          <>
            <Stack.Screen name="Teacher" component={TeacherNavigator} />
            <Stack.Screen
              name="ProfileTeacher"
              component={TeacherDetailTabNavigator}
            />
          </>
        ) : (
          <Stack.Screen name="Auth" component={AuthNavigator} />
        )
      ) : (
        <Stack.Screen name="Auth" component={AuthNavigator} />
      )} */}
    </Stack.Navigator>
  );
};

export default AppNavigator;
