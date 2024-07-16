import * as Notifications from "expo-notifications";
import { Alert } from "react-native";
import Constants from "expo-constants";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useDispatch } from "react-redux";
import { setToken } from "../Redux/slices/Tokenslice";

const createNotificationCategory = async () => {
  try {
    await Notifications.setNotificationCategoryAsync("important-messages", {
      categoryId: "important-messages",
      actions: [
        {
          actionId: "reply",
          buttonTitle: "Reply",
          isAuthenticationRequired: false,
          isDestructive: false,
        },
      ],
      intentIdentifiers: [],
      options: {
        showInForeground: true,
        allowAnnouncement: true,
        criticalAlert: true,
      },
    });

    console.log("Notification category created or updated successfully.");
  } catch (error) {
    console.error("Failed to create or update notification category:", error);
  }
};

// const storeTokenInStorage = async (token) => {
//   try {
//     const data = JSON.stringify(token);
//     await AsyncStorage.setItem(`expoToken`, data);
//   } catch (error) {
//     console.log(`error while storing token in Async Storage: ${error}`);
//   }
// };

export const registerForPushNotificationsAsync = async () => {
  const dispatch = useDispatch();
  let token;
  if (Constants.isDevice) {
    const { status: existingStatus } =
      await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== "granted") {
      const { status } = await Notifications.requestPermissionsAsync();
      console.log(`Notification Permission from Starting of App`, status);
      finalStatus = status;
    }
    if (finalStatus != "granted") {
      Alert.alert("Failed to get push token for push notification!");
      return;
    }
    token = (await Notifications.getExpoPushTokenAsync()).data;
    console.log("Expo Push Token in registerForPushNotificationsAsync:", token);
    // storeTokenInStorage(token);
    dispatch(setToken(token));
  } else {
    Alert.alert("Must use physical device for Push Notifications");
  }
  await createNotificationCategory();
  if (Platform.OS === "android") {
    Notifications.setNotificationChannelAsync("default", {
      name: "default",
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: "#FF231F7C",
    });
  }

  return token;
};

export const sendExchangeRequest = async (
  requesterId,
  receiverId,
  receiversExpoToken
) => {
  try {
    const response = await axios.post(
      `http://localhost:3000/exchange/request`,
      {
        requesterId,
        receiverId,
        receiversExpoToken,
      }
    );
    console.log("Request sent successfully:", response.data);
  } catch (error) {
    console.error("Error requesting class exchange:", error);
  }
};
