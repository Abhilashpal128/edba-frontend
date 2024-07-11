// import React, { useState } from "react";
// import { View, TouchableOpacity, Animated, StyleSheet } from "react-native";
// import Icon from "react-native-vector-icons/FontAwesome";

// const CustomSwitch = ({ value, onValueChange }) => {
//   const [switchAnim] = useState(new Animated.Value(value ? 1 : 0));

//   const toggleSwitch = () => {
//     const newValue = !value;

//     Animated.timing(switchAnim, {
//       toValue: newValue ? 1 : 0,
//       duration: 200,
//       useNativeDriver: false,
//     }).start();

//     onValueChange(newValue);
//   };

//   const backgroundColor = switchAnim.interpolate({
//     inputRange: [0, 1],
//     outputRange: ["#767577", "#81b0ff"],
//   });

//   const translateX = switchAnim.interpolate({
//     inputRange: [0, 1],
//     outputRange: [0, 20], // Adjust translation as needed
//   });

//   return (
//     <TouchableOpacity onPress={toggleSwitch} style={styles.switchContainer}>
//       <Animated.View style={[styles.switch, { backgroundColor }]}>
//         <Animated.View style={[styles.thumb, { transform: [{ translateX }] }]}>
//           {value && <Icon name="check" size={12} color="#777777" />}
//         </Animated.View>
//       </Animated.View>
//     </TouchableOpacity>
//   );
// };

// const styles = StyleSheet.create({
//   switchContainer: {
//     width: 40,
//     height: 20,
//     justifyContent: "center",
//   },
//   switch: {
//     width: "100%",
//     height: "100%",
//     borderRadius: 10,
//     padding: 2,
//   },
//   thumb: {
//     width: 16,
//     height: 16,
//     borderRadius: 8,
//     backgroundColor: "#FFFFFF",
//     justifyContent: "center",
//     alignItems: "center",
//   },
// });

// export default CustomSwitch;

// import React, { useState, useEffect } from "react";
// import {
//   View,
//   TouchableOpacity,
//   Animated,
//   StyleSheet,
//   PermissionsAndroid,
//   PushNotificationIOS,
//   Alert,
//   Platform,
// } from "react-native";
// import Icon from "react-native-vector-icons/FontAwesome";

// const CustomSwitch = ({ value, onValueChange }) => {
//   const [switchAnim] = useState(new Animated.Value(value ? 1 : 0));

//   useEffect(() => {
//     Animated.timing(switchAnim, {
//       toValue: value ? 1 : 0,
//       duration: 200,
//       useNativeDriver: false,
//     }).start();
//   }, [value]);

//   const requestPermission = async () => {
//     if (Platform.OS === "android") {
//       const granted = await PermissionsAndroid.request(
//         PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS,
//         {
//           title: "Notification Permission",
//           message: "App needs access to notifications",
//           buttonNeutral: "Ask Me Later",
//           buttonNegative: "Cancel",
//           buttonPositive: "OK",
//         }
//       );
//       return granted === PermissionsAndroid.RESULTS.GRANTED;
//     } else if (Platform.OS === "ios") {
//       const authStatus = await PushNotificationIOS.requestPermissions();
//       return authStatus.alert === true;
//     }
//     return false;
//   };

//   // const toggleSwitch = () => {
//   //   const newValue = !value;

//   //   Animated.timing(switchAnim, {
//   //     toValue: newValue ? 1 : 0,
//   //     duration: 200,
//   //     useNativeDriver: false,
//   //   }).start();

//   //   onValueChange(newValue);
//   // };

//   const toggleSwitch = async () => {
//     const newValue = !value;

//     if (newValue) {
//       const permissionGranted = await requestPermission();
//       if (permissionGranted) {
//         Animated.timing(switchAnim, {
//           toValue: 1,
//           duration: 200,
//           useNativeDriver: false,
//         }).start();
//         onValueChange(true);
//       } else {
//         Alert.alert(
//           "Permission Denied",
//           "You need to enable notifications in settings."
//         );
//         onValueChange(false);
//       }
//     } else {
//       Alert.alert(
//         "Disable Notifications",
//         "Please disable notifications in your phone's settings.",
//         [{ text: "OK" }]
//       );
//       onValueChange(true);
//       Animated.timing(switchAnim, {
//         toValue: 0,
//         duration: 200,
//         useNativeDriver: false,
//       }).start();
//       onValueChange(false);
//     }
//   };

//   const backgroundColor = switchAnim.interpolate({
//     inputRange: [0, 1],
//     outputRange: ["#767577", "#81b0ff"],
//   });

//   const translateX = switchAnim.interpolate({
//     inputRange: [0, 1],
//     outputRange: [0, 20],
//   });

//   return (
//     <TouchableOpacity onPress={toggleSwitch} style={styles.switchContainer}>
//       <Animated.View style={[styles.switch, { backgroundColor }]}>
//         <Animated.View style={[styles.thumb, { transform: [{ translateX }] }]}>
//           {value && <Icon name="check" size={12} color="#777777" />}
//         </Animated.View>
//       </Animated.View>
//     </TouchableOpacity>
//   );
// };

// const styles = StyleSheet.create({
//   switchContainer: {
//     width: 40,
//     height: 20,
//     justifyContent: "center",
//   },
//   switch: {
//     width: "100%",
//     height: "100%",
//     borderRadius: 10,
//     padding: 2,
//   },
//   thumb: {
//     width: 16,
//     height: 16,
//     borderRadius: 8,
//     backgroundColor: "#FFFFFF",
//     justifyContent: "center",
//     alignItems: "center",
//   },
// });

// export default CustomSwitch;

// import React, { useState, useEffect } from "react";
// import {
//   View,
//   TouchableOpacity,
//   Animated,
//   StyleSheet,
//   Alert,
//   Platform,
//   PushNotificationIOS,
// } from "react-native";
// import Icon from "react-native-vector-icons/FontAwesome";
// import { PermissionsAndroid } from "react-native";
// // import PushNotificationIOS from "@react-native-community/push-notification-ios";

// const CustomSwitch = ({ value, onValueChange }) => {
//   const [switchAnim] = useState(new Animated.Value(value ? 1 : 0));

//   useEffect(() => {
//     Animated.timing(switchAnim, {
//       toValue: value ? 1 : 0,
//       duration: 200,
//       useNativeDriver: false,
//     }).start();
//   }, [value]);

//   const requestPermission = async () => {
//     if (Platform.OS === "android") {
//       const granted = await PermissionsAndroid.request(
//         PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS,
//         {
//           title: "Notification Permission",
//           message: "App needs access to notifications",
//           buttonNeutral: "Ask Me Later",
//           buttonNegative: "Cancel",
//           buttonPositive: "OK",
//         }
//       );
//       return granted === PermissionsAndroid.RESULTS.GRANTED;
//     } else if (Platform.OS === "ios") {
//       const authStatus = await PushNotificationIOS.requestPermissions();
//       return authStatus.alert === true;
//     }
//     return false;
//   };

//   const toggleSwitch = async () => {
//     const newValue = !value;

//     if (newValue) {
//       const permissionGranted = await requestPermission();
//       if (permissionGranted) {
//         Animated.timing(switchAnim, {
//           toValue: 1,
//           duration: 200,
//           useNativeDriver: false,
//         }).start();
//         onValueChange(true);
//       } else {
//         Alert.alert(
//           "Permission Denied",
//           "You need to enable notifications in settings."
//         );
//         onValueChange(false);
//       }
//     } else {
//       Alert.alert(
//         "Disable Notifications",
//         "Please disable notifications in your phone's settings.",
//         [{ text: "OK" }]
//       );
//       onValueChange(true); // Ensure the switch remains on
//     }
//   };

//   const backgroundColor = switchAnim.interpolate({
//     inputRange: [0, 1],
//     outputRange: ["#767577", "#81b0ff"],
//   });

//   const translateX = switchAnim.interpolate({
//     inputRange: [0, 1],
//     outputRange: [0, 20],
//   });

//   return (
//     <TouchableOpacity onPress={toggleSwitch} style={styles.switchContainer}>
//       <Animated.View style={[styles.switch, { backgroundColor }]}>
//         <Animated.View style={[styles.thumb, { transform: [{ translateX }] }]}>
//           {value && <Icon name="check" size={12} color="#777777" />}
//         </Animated.View>
//       </Animated.View>
//     </TouchableOpacity>
//   );
// };

// const styles = StyleSheet.create({
//   switchContainer: {
//     width: 40,
//     height: 20,
//     justifyContent: "center",
//   },
//   switch: {
//     width: "100%",
//     height: "100%",
//     borderRadius: 10,
//     padding: 2,
//   },
//   thumb: {
//     width: 16,
//     height: 16,
//     borderRadius: 8,
//     backgroundColor: "#FFFFFF",
//     justifyContent: "center",
//     alignItems: "center",
//   },
// });

// export default CustomSwitch;

import React, { useState, useEffect } from "react";
import {
  View,
  TouchableOpacity,
  Animated,
  StyleSheet,
  Alert,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import * as Notifications from "expo-notifications";

const CustomSwitch = ({ value, onValueChange }) => {
  const [switchAnim] = useState(new Animated.Value(value ? 1 : 0));

  useEffect(() => {
    Animated.timing(switchAnim, {
      toValue: value ? 1 : 0,
      duration: 200,
      useNativeDriver: false,
    }).start();
  }, [value]);

  const requestPermission = async () => {
    const { status } = await Notifications.requestPermissionsAsync();
    return status === "granted";
  };

  // const toggleSwitch = async () => {
  //   const newValue = !value;

  //   if (newValue) {
  //     const permissionGranted = await requestPermission();
  //     if (permissionGranted) {
  //       Animated.timing(switchAnim, {
  //         toValue: 1,
  //         duration: 200,
  //         useNativeDriver: false,
  //       }).start();
  //       onValueChange(true);
  //     } else {
  //       Alert.alert(
  //         "Permission Denied",
  //         "You need to enable notifications in settings."
  //       );
  //       onValueChange(false);
  //     }
  //   } else {
  //     Animated.timing(switchAnim, {
  //       toValue: 0,
  //       duration: 200,
  //       useNativeDriver: false,
  //     }).start();
  //     onValueChange(false);
  //   }
  // };

  const toggleSwitch = () => {
    const newValue = !value;
    onValueChange(newValue);
  };

  const backgroundColor = switchAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ["#767577", "#81b0ff"],
  });

  const translateX = switchAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 20],
  });

  return (
    <TouchableOpacity onPress={toggleSwitch} style={styles.switchContainer}>
      <Animated.View style={[styles.switch, { backgroundColor }]}>
        <Animated.View style={[styles.thumb, { transform: [{ translateX }] }]}>
          {value && <Icon name="check" size={12} color="#777777" />}
        </Animated.View>
      </Animated.View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  switchContainer: {
    width: 40,
    height: 20,
    justifyContent: "center",
  },
  switch: {
    width: "100%",
    height: "100%",
    borderRadius: 10,
    padding: 2,
  },
  thumb: {
    width: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: "#FFFFFF",
    justifyContent: "center",
    alignItems: "center",
  },
});

export default CustomSwitch;
