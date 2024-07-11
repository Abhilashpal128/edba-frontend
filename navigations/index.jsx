import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
import React, { useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { ThemeProvider } from "../hooks/useTheme";
import AppNavigator from "./AppNavigator";
import store from "../Redux/store";
import {
  useFonts,
  Poppins_100Thin,
  Poppins_100Thin_Italic,
  Poppins_200ExtraLight,
  Poppins_200ExtraLight_Italic,
  Poppins_300Light,
  Poppins_300Light_Italic,
  Poppins_400Regular,
  Poppins_400Regular_Italic,
  Poppins_500Medium,
  Poppins_500Medium_Italic,
  Poppins_600SemiBold,
  Poppins_600SemiBold_Italic,
  Poppins_700Bold,
  Poppins_700Bold_Italic,
  Poppins_800ExtraBold,
  Poppins_800ExtraBold_Italic,
  Poppins_900Black,
  Poppins_900Black_Italic,
} from "@expo-google-fonts/poppins";
import { Provider } from "react-redux";
import Toast from "react-native-toast-message";
// import { setUpNotificationHandler } from "../Notifications/setupnotificationHandler";
// import { registerForPushNotificationsAsync } from "../Notifications/registerForPushNotificationsAsync";
// import NotificationService from "../Notifications/NotificationService";

export default function Navigation() {
  // useEffect(() => {
  //   const setupNotifications = async () => {
  //     const expoPushToken = await registerForPushNotificationsAsync();
  //     if (expoPushToken) {
  //       setUpNotificationHandler();
  //     }
  //   };

  //   setupNotifications();
  // }, []);

  let [fontsLoaded] = useFonts({
    Poppins_100Thin,
    Poppins_100Thin_Italic,
    Poppins_200ExtraLight,
    Poppins_200ExtraLight_Italic,
    Poppins_300Light,
    Poppins_300Light_Italic,
    Poppins_400Regular,
    Poppins_400Regular_Italic,
    Poppins_500Medium,
    Poppins_500Medium_Italic,
    Poppins_600SemiBold,
    Poppins_600SemiBold_Italic,
    Poppins_700Bold,
    Poppins_700Bold_Italic,
    Poppins_800ExtraBold,
    Poppins_800ExtraBold_Italic,
    Poppins_900Black,
    Poppins_900Black_Italic,
  });

  if (fontsLoaded) {
    return (
      <Provider store={store}>
        <NavigationContainer>
          <ThemeProvider>
            <Toast />
            <AppNavigator />
          </ThemeProvider>
        </NavigationContainer>
      </Provider>
    );
  } else {
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <ActivityIndicator />
      </View>
    );
  }
}

const styles = StyleSheet.create({});
