import * as Notifications from "expo-notifications";
import { Alert } from "react-native";
export const registerForPushNotificationsAsync = async () => {
  try {
    const { status } = await Notifications.requestPermissionsAsync();
    if (status !== "granted") {
      throw new Error("Permission to receive push notifications denied");
    }
    const expoPushToken = (await Notifications.getExpoPushTokenAsync()).data;
    console.log("expoPushToken", expoPushToken);
    return expoPushToken;
  } catch (error) {
    console.error("Error getting Expo push token:", error);
    Alert.alert("Error", "Failed to get push notification permissions");
    return null;
  }
};
