import {
  Modal,
  SafeAreaView,
  StyleSheet,
  Switch,
  Text,
  TouchableOpacity,
  View,
  TouchableWithoutFeedback,
  PermissionsAndroid,
  PushNotificationIOS,
  Platform,
  Linking,
} from "react-native";
import React, { useEffect, useLayoutEffect, useState } from "react";
// import { theme } from "../../../theming";
import { Feather, Ionicons, Entypo } from "react-native-vector-icons";
import CustomSwitch from "../CustomResources/CustomSwitch";
import NotificationSetting from "../CustomResources/NotificationSetting";
import ThemeSetting from "../CustomResources/ThemeSetting";
import { useNavigation } from "@react-navigation/native";
import { useThemeContext } from "../../../hooks/useTheme";
import { Alert } from "react-native";
import * as Notifications from "expo-notifications";

export default function Settings() {
  const { theme } = useThemeContext();

  const navigation = useNavigation();
  const [isNotificationModalOpen, setIsNotificationModalOpen] = useState(false);
  const [isThemeModalOpen, setIsThemeModalOpen] = useState(false);
  const [isNotificationEnabled, setIsNotificationEnabled] = useState(true);

  const [isInboxNotificationEnabled, setIsInboxNotificationEnabled] =
    useState(true);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Entypo
            name="chevron-thin-left"
            size={25}
            color={theme.secondaryTextColor}
            style={{ marginLeft: 10 }}
          />
        </TouchableOpacity>
      ),

      headerTitle: () => (
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <Text
            style={{
              color: theme.primaryTextColor,
              fontSize: 18,
              fontWeight: "bold",
              textAlign: "center",
            }}
          >
            Settings
          </Text>
        </View>
      ),

      headerRight: () => (
        <View style={{ marginRight: 10 }}>
          <TouchableOpacity
            onPress={() => {
              navigation.goBack();
            }}
          >
            <Entypo name="cross" size={20} color={theme.secondaryTextColor} />
          </TouchableOpacity>
        </View>
      ),
      headerStyle: {
        backgroundColor: theme.backgroundColor,
      },
      headerTitleAlign: "center",
      headerTintColor: theme.backgroundColor,
    });
  }, [navigation, theme]);

  const toggleInboxNotification = () =>
    setIsInboxNotificationEnabled((previousState) => !previousState);

  const toggleNotificationModal = () => {
    setIsNotificationModalOpen(!isNotificationModalOpen);
  };

  const toggleThemeModelOpen = () => {
    setIsThemeModalOpen((previousState) => !previousState);
  };

  // const handleNotificationSwitchToggle = async (value) => {
  //   console.log(`newValuee`, value);

  //   setIsNotificationEnabled(value);

  // };

  const checkNotificationPermissions = async () => {
    try {
      const settings = await Notifications.getPermissionsAsync();
      console.log(settings.granted);
      if (settings.granted == true) {
        setIsNotificationEnabled(true);
      } else {
        setIsNotificationEnabled(false);
        console.log(`false permissions`);
      }
    } catch (error) {
      console.error("Error checking notification permissions:", error);
    }
  };

  useEffect(() => {
    const checkPermission = async () => {
      const { status } = await Notifications.getPermissionsAsync();
      if (status === "granted") {
        setIsNotificationEnabled(true);
      } else {
        setIsNotificationEnabled(false);
      }
    };

    checkPermission();
  }, []);

  // const handleNotificationSwitchToggle = async (newValue) => {
  //   console.log(newValue);
  //   if (newValue) {
  //     const permissionGranted = await Notifications.requestPermissionsAsync();
  //     console.log(permissionGranted);
  //     if (permissionGranted.status === "granted") {
  //       setIsNotificationEnabled(true);
  //     } else {
  //       Alert.alert(
  //         "Permission Denied",
  //         "You need to enable notifications in settings."
  //       );
  //       setIsNotificationEnabled(false);
  //     }
  //   } else {
  //     setIsNotificationEnabled(false);
  //   }
  // };

  const openAppSettings = (newValue) => {
    if (Platform.OS === "ios") {
      Linking.openURL("app-settings:");
    } else if (Platform.OS === "android") {
      Linking.openSettings();
    }
    handleNotificationSwitchToggle(newValue);
  };

  const handleNotificationSwitchToggle = async (newValue) => {
    if (newValue) {
      const { status } = await Notifications.requestPermissionsAsync();
      console.log(`Notifications.requestPermissionsAsync()`, status);
      if (status === "granted") {
        setIsNotificationEnabled(true);
      } else {
        Alert.alert(
          "Notifications Disabled",
          "You have disabled notifications for this app. Please enable them in your device settings to receive notifications.",
          [
            { text: "Open Settings", onPress: () => openAppSettings(newValue) },
            {
              text: "Cancel",
              onPress: () => console.log("Cancel Pressed"),
              style: "cancel",
            },
          ],
          { cancelable: false }
        );
      }
    } else {
      if (isNotificationEnabled) {
        Alert.alert(
          "Disable Notifications",
          "You have to disabled notifications for this app. Please enable them in your device settings to receive notifications.",
          [
            { text: "Open Settings", onPress: () => openAppSettings(newValue) },
            {
              text: "Cancel",
              onPress: () => console.log("Cancel Pressed"),
              style: "cancel",
            },
          ],
          { cancelable: false }
        );
        setIsNotificationEnabled(true);
      } else {
        setIsNotificationEnabled(false);
      }
    }
  };

  return (
    <SafeAreaView
      style={{
        backgroundColor: theme.backgroundColor,
        height: "100%",
        width: "100%",
      }}
    >
      <View
        style={{
          marginHorizontal: 20,
          marginVertical: 30,
          gap: 20,
        }}
      >
        <TouchableOpacity
          onPress={() => {
            setIsNotificationModalOpen(true);
          }}
          style={{ display: "flex", gap: 10, flexDirection: "row" }}
        >
          <View>
            <Text style={{ color: theme.primaryTextColor }}>
              <Feather name="bell" size={20} color={theme.primarycolor} />
            </Text>
          </View>
          <View style={{ display: "flex", gap: 5 }}>
            <Text style={{ fontSize: 14, color: theme.primaryTextColor }}>
              Notification
            </Text>
            <Text style={{ fontSize: 12, color: theme.secondaryTextColor }}>
              Message
            </Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            setIsThemeModalOpen(true);
          }}
          style={{ display: "flex", gap: 10, flexDirection: "row" }}
        >
          <View>
            <Text style={{ color: theme.primaryTextColor }}>
              <Ionicons
                name="sunny-outline"
                size={20}
                color={theme.primarycolor}
              />
            </Text>
          </View>
          <View style={{ display: "flex", gap: 5 }}>
            <Text style={{ fontSize: 14, color: theme.primaryTextColor }}>
              Themes
            </Text>
            <Text style={{ fontSize: 12, color: theme.secondaryTextColor }}>
              Dark Mode , Light Mode, System default
            </Text>
          </View>
        </TouchableOpacity>
        <View style={{ display: "flex", gap: 10, flexDirection: "row" }}>
          <View>
            <Text style={{ color: theme.primaryTextColor }}>
              <Feather name="info" size={20} color={theme.primarycolor} />
            </Text>
          </View>
          <View
            style={{
              display: "flex",
              gap: 5,
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              width: 300,
            }}
          >
            <Text style={{ fontSize: 14, color: theme.primaryTextColor }}>
              About Version
            </Text>
            <Text
              style={{
                fontSize: 12,
                color: theme.secondaryTextColor,
                textAlign: "right",
              }}
            >
              0.01
            </Text>
          </View>
        </View>
      </View>

      <Modal
        transparent={true}
        visible={isNotificationModalOpen}
        animationType="slide"
        onRequestClose={toggleNotificationModal}
      >
        <TouchableWithoutFeedback onPress={toggleNotificationModal}>
          <View
            style={{
              flex: 1,
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: "rgba(0, 0, 0, 0.5)",
            }}
          >
            {/* <NotificationSetting
              toggleNotificationModal={toggleNotificationModal}
            /> */}

            <TouchableWithoutFeedback>
              <View
                style={{
                  width: "90%",
                  height: 258,
                  backgroundColor: theme.backgroundColor,
                  borderRadius: 10,
                  padding: 20,
                }}
              >
                <Text
                  style={{
                    fontSize: 18,
                    fontWeight: "bold",
                    marginBottom: 20,
                    color: theme.primaryTextColor,
                  }}
                >
                  Notification Setting
                </Text>

                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginBottom: 20,
                  }}
                >
                  <View>
                    <Text
                      style={{
                        fontSize: 16,
                        color: theme.primaryTextColor,
                      }}
                    >
                      Turn {isNotificationEnabled ? "off" : "on"} Notification
                    </Text>
                    <Text
                      style={{
                        fontSize: 10,
                        color: theme.secondaryTextColor,
                      }}
                    >
                      Turn off Notification For this application
                    </Text>
                  </View>
                  <CustomSwitch
                    value={isNotificationEnabled}
                    onValueChange={handleNotificationSwitchToggle}
                  />
                </View>

                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginBottom: 20,
                  }}
                >
                  <View>
                    <Text
                      style={{
                        fontSize: 16,
                        color: theme.primaryTextColor,
                      }}
                    >
                      Turn {isInboxNotificationEnabled ? "off" : "on"} Inbox
                      Notification
                    </Text>
                    <Text
                      style={{
                        fontSize: 10,
                        color: theme.secondaryTextColor,
                      }}
                    >
                      Turn off Inbox Notification For this application
                    </Text>
                  </View>
                  <CustomSwitch
                    value={isInboxNotificationEnabled}
                    onValueChange={toggleInboxNotification}
                  />
                </View>

                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "flex-end",
                    marginTop: 20,
                    gap: 20,
                  }}
                >
                  <TouchableOpacity
                    style={styles.button}
                    onPress={toggleNotificationModal}
                  >
                    <Text
                      style={{
                        fontSize: 14,
                        color: theme.primarycolor,
                      }}
                    >
                      Save
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => {
                      setIsThemeModalOpen(false);
                    }}
                  >
                    <Text
                      style={{
                        fontSize: 14,
                        color: theme.primarycolor,
                      }}
                    ></Text>
                  </TouchableOpacity>
                </View>
              </View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </Modal>

      {/* <Modal visible={isThemeModalOpen} animationType="slide">
        <View style={styles.modalContainer}>
          <Text>theme Modal</Text>
        </View>
      </Modal> */}
      <Modal
        transparent={true}
        visible={isThemeModalOpen}
        animationType="slide"
        onRequestClose={toggleInboxNotification}
      >
        <TouchableWithoutFeedback onPress={toggleInboxNotification}>
          <View
            style={{
              flex: 1,
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: "rgba(0, 0, 0, 0.5)",
            }}
          >
            <ThemeSetting toggleThemeModelOpen={toggleThemeModelOpen} />
            {/* <NotificationSetting
              toggleNotificationModal={toggleNotificationModal}
            /> */}
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({});
