// import {
//   Modal,
//   SafeAreaView,
//   StyleSheet,
//   Switch,
//   Text,
//   TouchableOpacity,
//   View,
//   TouchableWithoutFeedback,
//   Alert,
// } from "react-native";
// import React, { useEffect, useState } from "react";
// // import { theme } from "../../../theming";
// import { Feather, Ionicons } from "react-native-vector-icons";
// import CustomSwitch from "../../common/CustomResources/CustomSwitch";
// import { useThemeContext } from "../../../hooks/useTheme";
// import * as Notifications from "expo-notifications";

// export default function NotificationSetting({ toggleNotificationModal }) {
//   const { theme } = useThemeContext();
//   const [isNotificationModalOpen, setIsNotificationModalOpen] = useState(false);
//   const [isNotificationEnabled, setIsNotificationEnabled] = useState();
//   const [isInboxNotificationEnabled, setIsInboxNotificationEnabled] =
//     useState();

//   const toggleNotification = () =>
//     setIsNotificationEnabled((previousState) => !previousState);
//   const toggleInboxNotification = () =>
//     setIsInboxNotificationEnabled((previousState) => !previousState);

//   handleNotificationtoggle = () => {
//     toggleNotificationModal();
//   };
//   // const checkNotificationPermissions = async () => {
//   //   try {
//   //     const settings = await Notifications.getPermissionsAsync();
//   //     console.log(settings.granted);
//   //     if (settings.granted == true) {
//   //       setIsNotificationEnabled(true);
//   //     } else {
//   //       setIsNotificationEnabled(false);
//   //       console.log(`false permissions`);
//   //     }
//   //   } catch (error) {
//   //     console.error("Error checking notification permissions:", error);
//   //   }
//   // };

//   const handleNotificationSwitchToggle = (newValue) => {
//     console.log(`newValue`, newValue);
//     if (newValue == "false") {
//       checkAndRequestPermission();
//       return;
//     } else {
//       Alert.alert(
//         "Disable Notifications",
//         "To disable notifications, please go to your phone settings and revoke notification permissions for this app."
//       );
//       setIsNotificationEnabled(true);
//     }
//     // setIsNotificationEnabled(newValue);
//     // checkAndRequestPermission();

//     // setIsNotificationEnabled(newValue);
//   };

//   const checkPermissionStatus = async () => {
//     console.log(`checkPermissionStatus claaed`);
//     const { status } = await Notifications.getPermissionsAsync();
//     console.log(`status`, status);
//     if (status == "granted") {
//       setIsNotificationEnabled(true);
//     } else {
//       setIsNotificationEnabled(false);
//     }
//   };

//   useEffect(() => {
//     checkPermissionStatus();
//   }, []);

//   const checkAndRequestPermission = async () => {
//     console.log(`checkAndRequestPermission called`);

//     if (!Constants.isDevice) {
//       Alert.alert("Must use physical device for Push Notifications");
//       return;
//     }

//     const { status: existingStatus } =
//       await Notifications.getPermissionsAsync();
//     let finalStatus = existingStatus;
//     if (existingStatus !== "granted") {
//       const { status } = await Notifications.requestPermissionsAsync();
//       finalStatus = status;
//     }
//     console.log(`finalStatus`, finalStatus);
//     if (finalStatus !== "granted") {
//       Alert.alert("Failed to get push token for push notification!");
//       setIsNotificationEnabled(false);
//       return;
//     }

//     setIsNotificationEnabled(true);
//     Alert.alert("Push notification permission granted");
//   };

//   useEffect(() => {
//     checkAndRequestPermission();
//   }, []);

//   // useEffect(() => {
//   //   // checkNotificationPermissions();
//   // }, []);

//   return (
//     <TouchableWithoutFeedback>
//       <View
//         style={{
//           width: "90%",
//           height: 258,
//           backgroundColor: theme.backgroundColor,
//           borderRadius: 10,
//           padding: 20,
//         }}
//       >
//         <Text
//           style={{
//             fontSize: 18,
//             fontWeight: "bold",
//             marginBottom: 20,
//             color: theme.primaryTextColor,
//           }}
//         >
//           Notification Setting
//         </Text>

//         <View
//           style={{
//             flexDirection: "row",
//             justifyContent: "space-between",
//             alignItems: "center",
//             marginBottom: 20,
//           }}
//         >
//           <View>
//             <Text
//               style={{
//                 fontSize: 16,
//                 color: theme.primaryTextColor,
//               }}
//             >
//               Turn {isNotificationEnabled ? "off" : "on"} Notification
//             </Text>
//             <Text
//               style={{
//                 fontSize: 10,
//                 color: theme.secondaryTextColor,
//               }}
//             >
//               Turn off Notification For this application
//             </Text>
//           </View>
//           <CustomSwitch
//             value={isNotificationEnabled}
//             onValueChange={handleNotificationSwitchToggle}
//           />
//         </View>

//         <View
//           style={{
//             flexDirection: "row",
//             justifyContent: "space-between",
//             alignItems: "center",
//             marginBottom: 20,
//           }}
//         >
//           <View>
//             <Text
//               style={{
//                 fontSize: 16,
//                 color: theme.primaryTextColor,
//               }}
//             >
//               Turn {isInboxNotificationEnabled ? "off" : "on"} Inbox
//               Notification
//             </Text>
//             <Text
//               style={{
//                 fontSize: 10,
//                 color: theme.secondaryTextColor,
//               }}
//             >
//               Turn off Inbox Notification For this application
//             </Text>
//           </View>
//           <CustomSwitch
//             value={isInboxNotificationEnabled}
//             onValueChange={toggleInboxNotification}
//           />
//         </View>

//         <View
//           style={{
//             flexDirection: "row",
//             justifyContent: "flex-end",
//             marginTop: 20,
//             gap: 20,
//           }}
//         >
//           <TouchableOpacity
//             style={styles.button}
//             onPress={toggleNotificationModal}
//           >
//             <Text
//               style={{
//                 fontSize: 14,
//                 color: theme.primarycolor,
//               }}
//             >
//               Cancel
//             </Text>
//           </TouchableOpacity>
//           <TouchableOpacity onPress={handleNotificationtoggle}>
//             <Text
//               style={{
//                 fontSize: 14,
//                 color: theme.primarycolor,
//               }}
//             >
//               Save
//             </Text>
//           </TouchableOpacity>
//         </View>
//       </View>
//     </TouchableWithoutFeedback>
//   );
// }

// const styles = StyleSheet.create({});

// import React, { useState, useEffect } from "react";
// import {
//   View,
//   Text,
//   Modal,
//   Alert,
//   StyleSheet,
//   TouchableWithoutFeedback,
//   TouchableOpacity,
// } from "react-native";
// import * as Notifications from "expo-notifications";
// import Constants from "expo-constants";
// import CustomSwitch from "./CustomSwitch";
// import { useThemeContext } from "../../../hooks/useTheme";

// const NotificationSettingsModal = ({ visible, onClose, theme }) => {
//   const { theme } = useThemeContext();
//   const [isNotificationEnabled, setIsNotificationEnabled] = useState(false);
//   const [isInboxNotificationEnabled, setIsInboxNotificationEnabled] =
//     useState(false);

//   useEffect(() => {
//     checkPermissionStatus();
//   }, []);

//   const checkPermissionStatus = async () => {
//     const { status } = await Notifications.getPermissionsAsync();
//     if (status === "granted") {
//       setIsNotificationEnabled(true);
//     } else {
//       setIsNotificationEnabled(false);
//     }
//   };

//   const requestPermission = async () => {
//     const { status: existingStatus } =
//       await Notifications.requestPermissionsAsync();
//     if (existingStatus !== "granted") {
//       const { status } = await Notifications.requestPermissionsAsync();
//       if (status !== "granted") {
//         Alert.alert("Failed to get push token for push notification!");
//         return;
//       }
//     }
//     const token = (await Notifications.getExpoPushTokenAsync()).data;
//     console.log("Expo Push Token:", token);
//     setIsNotificationEnabled(true);
//     Alert.alert("Push notification permission granted");
//   };

//   const handleNotificationSwitchToggle = async (value) => {
//     if (value) {
//       await requestPermission();
//     } else {
//       Alert.alert(
//         "Disable Notifications",
//         "To disable notifications, please go to your phone settings and revoke notification permissions for this app."
//       );
//       setIsNotificationEnabled(false);
//     }
//   };

//   const toggleInboxNotification = (value) => {
//     setIsInboxNotificationEnabled(value);
//   };

//   const handleSave = () => {
//     // Save settings if necessary
//     Alert.alert("Settings saved");
//     onClose();
//   };

//   return (
//     <Modal
//       visible={visible}
//       animationType="slide"
//       onRequestClose={onClose}
//       transparent
//     >
//       <TouchableWithoutFeedback onPress={onClose}>
//         <View style={styles.overlay}>
//           <View style={[styles.modalContainer, { backgroundColor: "#FFFFFF" }]}>
//             <Text style={[styles.title, { color: theme.primaryTextColor }]}>
//               Notification Settings
//             </Text>
//             <View style={styles.switchRow}>
//               <View>
//                 <Text
//                   style={[
//                     styles.switchTitle,
//                     { color: theme.primaryTextColor },
//                   ]}
//                 >
//                   Turn {isNotificationEnabled ? "off" : "on"} Notification
//                 </Text>
//                 <Text
//                   style={[
//                     styles.switchDescription,
//                     { color: theme.secondaryTextColor },
//                   ]}
//                 >
//                   Turn off Notification For this application
//                 </Text>
//               </View>
//               <CustomSwitch
//                 value={isNotificationEnabled}
//                 onValueChange={handleNotificationSwitchToggle}
//               />
//             </View>
//             <View style={styles.switchRow}>
//               <View>
//                 <Text
//                   style={[
//                     styles.switchTitle,
//                     { color: theme.primaryTextColor },
//                   ]}
//                 >
//                   Turn {isInboxNotificationEnabled ? "off" : "on"} Inbox
//                   Notification
//                 </Text>
//                 <Text
//                   style={[
//                     styles.switchDescription,
//                     { color: theme.secondaryTextColor },
//                   ]}
//                 >
//                   Turn off Inbox Notification For this application
//                 </Text>
//               </View>
//               <CustomSwitch
//                 value={isInboxNotificationEnabled}
//                 onValueChange={toggleInboxNotification}
//               />
//             </View>
//             <View style={styles.buttonRow}>
//               <TouchableOpacity style={styles.button} onPress={onClose}>
//                 <Text
//                   style={[styles.buttonText, { color: theme.primaryColor }]}
//                 >
//                   Cancel
//                 </Text>
//               </TouchableOpacity>
//               <TouchableOpacity onPress={handleSave}>
//                 <Text
//                   style={[styles.buttonText, { color: theme.primaryColor }]}
//                 >
//                   Save
//                 </Text>
//               </TouchableOpacity>
//             </View>
//           </View>
//         </View>
//       </TouchableWithoutFeedback>
//     </Modal>
//   );
// };

// const styles = StyleSheet.create({
//   overlay: {
//     flex: 1,
//     justifyContent: "center",
//     alignItems: "center",
//     backgroundColor: "rgba(0, 0, 0, 0.5)",
//   },
//   modalContainer: {
//     width: "90%",
//     height: 258,
//     borderRadius: 10,
//     padding: 20,
//   },
//   title: {
//     fontSize: 18,
//     fontWeight: "bold",
//     marginBottom: 20,
//   },
//   switchRow: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     alignItems: "center",
//     marginBottom: 20,
//   },
//   switchTitle: {
//     fontSize: 16,
//   },
//   switchDescription: {
//     fontSize: 10,
//   },
//   buttonRow: {
//     flexDirection: "row",
//     justifyContent: "flex-end",
//     marginTop: 20,
//     gap: 20,
//   },
//   button: {
//     padding: 10,
//   },
//   buttonText: {
//     fontSize: 14,
//   },
// });

// export default NotificationSettingsModal;
