// import {
//   Alert,
//   Dimensions,
//   Image,
//   Platform,
//   SafeAreaView,
//   StyleSheet,
//   Text,
//   View,
// } from "react-native";
// import React, { useState } from "react";
// import { TextInput } from "react-native";
// import { TouchableOpacity } from "react-native";
// import { useNavigation } from "@react-navigation/native";
// import Icon from "react-native-vector-icons/Ionicons";
// import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
// import { useThemeContext } from "../../hooks/useTheme";
// import { post } from "../../utils/apis/TeacherApis/login";

// export default function CreatePassword({ navigation, route }) {
//   const { theme } = useThemeContext();
//   const otp = route?.params?.data?.otp;
//   console.log(`route.params`, route?.params?.data?.otp);
//   console.log(`OTProute.params`, otp);
//   const [newPassword, setNewPassword] = useState("");
//   const [reTypedPassword, setRetypedPassword] = useState("");
//   const [isNewPasswordVisible, setIsNewPasswordVisible] = useState(false);
//   const [isReTypePasswordVisible, setIsReTypePasswordVisible] = useState(false);
//   const [newPasswordError, setNewPasswordError] = useState(false);
//   const [retypedPasswordError, setRetypedPasswordError] = useState(false);
//   const [passwordMismatchError, setPasswordMismatchError] = useState(false);
//   const [passwordLengthError, setPasswordLengthError] = useState(false);
//   const [passwordSpecialCharError, setPasswordSpecialCharError] =
//     useState(false);

//   const toggleNewPasswordVisibility = () => {
//     setIsNewPasswordVisible(!isNewPasswordVisible);
//   };

//   const toggleReTypePasswordVisibility = () => {
//     setIsReTypePasswordVisible(!isReTypePasswordVisible);
//   };

//   const handleSubmit = async () => {
//     // Reset all error states
//     setNewPasswordError(false);
//     setRetypedPasswordError(false);
//     setPasswordMismatchError(false);
//     setPasswordLengthError(false);
//     setPasswordSpecialCharError(false);

//     // Regular expressions for validations
//     const specialCharRegex = /[!@#$%^&*(),.?":{}|<>]/;

//     // Validate each condition
//     if (newPassword === "") {
//       setNewPasswordError(true);
//     }
//     if (reTypedPassword === "") {
//       setRetypedPasswordError(true);
//     }
//     if (newPassword !== reTypedPassword) {
//       setPasswordMismatchError(true);
//     }
//     if (newPassword.length < 5) {
//       setPasswordLengthError(true);
//     }
//     if (!specialCharRegex.test(newPassword)) {
//       setPasswordSpecialCharError(true);
//     }

//     // Check if all validations pass
//     if (
//       newPassword !== "" &&
//       reTypedPassword !== "" &&
//       newPassword === reTypedPassword &&
//       newPassword.length >= 5 &&
//       specialCharRegex.test(newPassword)
//     ) {
//       try {
//         // Call your API here
//         const response = await post("user/change-password", {
//           new_password: newPassword,
//           otp,
//         });
//         console.log("API Response:", response);
//         if (response?.errCode == -1) {
//           Alert.alert("Success", "Password Updated Successfully");
//           navigation.navigate("login");
//         }
//       } catch (error) {
//         console.error("API Error:", error); // Log the API error for debugging
//         Alert.alert("Error", "An error occurred while updating the password");
//       }
//     }
//   };

//   return (
//     <SafeAreaView style={{ backgroundColor: theme.backgroundColor }}>
//       <KeyboardAwareScrollView
//         contentContainerStyle={
//           Platform.OS === "ios" ? styles.containerIos : styles.containerAndroid
//         }
//         bounce={false}
//         showsVerticalScrollIndicator={false}
//         keyboardShouldPersistTaps="handled"
//       >
//         <View style={{ height: "100%", marginHorizontal: 10 }}>
//           <View style={{ marginTop: 50, width: 73, height: 26 }}>
//             <Image
//               source={require("../../assets/logo.png")}
//               resizeMode="stretch"
//               style={{ width: 73, height: 26 }}
//             />
//           </View>
//           <View style={styles.container}>
//             <Image
//               source={require("../../assets/CreatePassword.png")}
//               style={styles.logo}
//             />
//             <Text
//               style={{
//                 fontSize: 20,
//                 fontWeight: "600",
//                 color: theme.primaryTextColor,
//               }}
//             >
//               Set a password
//             </Text>
//             <Text
//               style={{
//                 fontSize: 12,
//                 fontWeight: "400",
//                 color: theme.secondaryTextColor,
//                 marginTop: 10,
//               }}
//             >
//               Your previous password has been reset. Please set a new password
//               for your account.
//             </Text>
//             <View>
//               <Text
//                 style={{
//                   fontSize: 14,
//                   fontWeight: "400",
//                   color: theme.primaryTextColor,
//                   marginTop: 30,
//                 }}
//               >
//                 Create Password
//               </Text>
//               <View
//                 style={{
//                   flexDirection: "row",
//                   alignItems: "center",
//                   justifyContent: "space-between",
//                   borderBottomWidth: 1,
//                   borderColor:
//                     newPasswordError ||
//                     passwordLengthError ||
//                     passwordSpecialCharError
//                       ? "red"
//                       : "#ccc",
//                   padding: 10,
//                   borderRadius: 5,
//                   marginBottom: 10,
//                   width: "100%",
//                 }}
//               >
//                 <TextInput
//                   style={{
//                     width: "100%",
//                   }}
//                   placeholder="Enter New Password"
//                   onChangeText={(text) => setNewPassword(text)}
//                   secureTextEntry={!isNewPasswordVisible}
//                   value={newPassword}
//                   color={theme.primaryTextColor}
//                   placeholderTextColor={theme.secondaryTextColor}
//                 />
//                 <TouchableOpacity
//                   style={{ paddingTop: 10 }}
//                   onPress={toggleNewPasswordVisibility}
//                 >
//                   <Icon
//                     name={isNewPasswordVisible ? "eye-off" : "eye"}
//                     size={20}
//                     color="gray"
//                   />
//                 </TouchableOpacity>
//               </View>
//               {newPasswordError && (
//                 <Text style={{ color: "red" }}>This field is required</Text>
//               )}
//               {passwordLengthError && (
//                 <Text style={{ color: "red" }}>
//                   Password must be at least 5 characters long
//                 </Text>
//               )}
//               {passwordSpecialCharError && (
//                 <Text style={{ color: "red" }}>
//                   Password must contain at least one special character
//                 </Text>
//               )}
//             </View>
//             <View>
//               <Text
//                 style={{
//                   fontSize: 14,
//                   fontWeight: "400",
//                   color: theme.primaryTextColor,
//                   marginTop: 20,
//                 }}
//               >
//                 Re-enter Password
//               </Text>
//               <View
//                 style={{
//                   flexDirection: "row",
//                   alignItems: "center",
//                   justifyContent: "space-between",
//                   borderBottomWidth: 1,
//                   borderColor: retypedPasswordError ? "red" : "#ccc",
//                   padding: 10,
//                   borderRadius: 5,
//                   marginBottom: 10,
//                   width: "100%",
//                 }}
//               >
//                 <TextInput
//                   style={{
//                     width: "100%",
//                   }}
//                   placeholder="Re-enter Password"
//                   onChangeText={(text) => setRetypedPassword(text)}
//                   secureTextEntry={!isReTypePasswordVisible}
//                   value={reTypedPassword}
//                   color={theme.primaryTextColor}
//                   placeholderTextColor={theme.secondaryTextColor}
//                 />
//                 <TouchableOpacity
//                   style={{ paddingTop: 10 }}
//                   onPress={toggleReTypePasswordVisibility}
//                 >
//                   <Icon
//                     name={isReTypePasswordVisible ? "eye-off" : "eye"}
//                     size={20}
//                     color="gray"
//                   />
//                 </TouchableOpacity>
//               </View>
//               {retypedPasswordError && (
//                 <Text style={{ color: "red" }}>This field is required</Text>
//               )}
//               {passwordMismatchError && (
//                 <Text style={{ color: "red" }}>Passwords do not match</Text>
//               )}
//             </View>

//             <TouchableOpacity
//               style={{
//                 width: "100%",
//                 height: 40,
//                 marginTop: 20,
//                 backgroundColor: theme.primarycolor,
//                 borderRadius: 8,
//                 display: "flex",
//                 justifyContent: "center",
//                 alignItems: "center",
//               }}
//               onPress={handleSubmit}
//             >
//               <Text style={{ color: "#FFFFFF", fontWeight: "600" }}>
//                 SUBMIT
//               </Text>
//             </TouchableOpacity>
//           </View>
//         </View>
//       </KeyboardAwareScrollView>
//     </SafeAreaView>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     padding: 20,
//     justifyContent: "center",
//   },
//   logo: {
//     width: 125,
//     height: 120,
//     alignSelf: "center",
//     marginBottom: 20,
//   },
//   containerAndroid: {
//     height: Dimensions.get("screen").height,
//   },
//   containerIos: {
//     flex: 1,
//   },
// });
import {
  Alert,
  Dimensions,
  Image,
  Platform,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React, { useState } from "react";
import { TextInput } from "react-native";
import { TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { useThemeContext } from "../../hooks/useTheme";
import { post } from "../../utils/apis/TeacherApis/login";

export default function CreatePassword({ navigation, route }) {
  const { theme } = useThemeContext();
  const otp = route?.params?.data?.otp;
  const [newPassword, setNewPassword] = useState("");
  const [reTypedPassword, setRetypedPassword] = useState("");
  const [isNewPasswordVisible, setIsNewPasswordVisible] = useState(false);
  const [isReTypePasswordVisible, setIsReTypePasswordVisible] = useState(false);
  const [newPasswordError, setNewPasswordError] = useState(false);
  const [retypedPasswordError, setRetypedPasswordError] = useState(false);
  const [passwordMismatchError, setPasswordMismatchError] = useState(false);
  const [passwordLengthError, setPasswordLengthError] = useState(false);
  const [passwordCriteriaError, setPasswordCriteriaError] = useState(false);

  const toggleNewPasswordVisibility = () => {
    setIsNewPasswordVisible(!isNewPasswordVisible);
  };

  const toggleReTypePasswordVisibility = () => {
    setIsReTypePasswordVisible(!isReTypePasswordVisible);
  };

  const handleSubmit = async () => {
    setNewPasswordError(false);
    setRetypedPasswordError(false);
    setPasswordMismatchError(false);
    setPasswordLengthError(false);
    setPasswordCriteriaError(false);

    const specialCharRegex = /[!@#$%^&*(),.?":{}|<>]/;
    const numericRegex = /[0-9]/;

    if (newPassword === "") {
      setNewPasswordError(true);
    }
    if (reTypedPassword === "") {
      setRetypedPasswordError(true);
    }
    if (newPassword !== reTypedPassword) {
      setPasswordMismatchError(true);
    }
    if (newPassword.length < 5) {
      setPasswordLengthError(true);
    }
    if (
      !specialCharRegex.test(newPassword) ||
      !numericRegex.test(newPassword)
    ) {
      setPasswordCriteriaError(true);
    }

    if (
      newPassword !== "" &&
      reTypedPassword !== "" &&
      newPassword === reTypedPassword &&
      newPassword.length >= 5 &&
      specialCharRegex.test(newPassword) &&
      numericRegex.test(newPassword)
    ) {
      try {
        const response = await post("user/change-password", {
          new_password: newPassword,
          otp,
        });
        if (response?.errCode == -1) {
          
          Alert.alert("Success", "Password Updated Successfully");
          navigation.navigate("Login");
        } else {
          Alert.alert(response?.errMsg);
        }
      } catch (error) {
        console.error("API Error:", error);
        Alert.alert("Error", "An error occurred while updating the password");
      }
    }
  };

  return (
    <SafeAreaView style={{ backgroundColor: theme.backgroundColor }}>
      <KeyboardAwareScrollView
        contentContainerStyle={
          Platform.OS === "ios" ? styles.containerIos : styles.containerAndroid
        }
        bounce={false}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        <View style={{ height: "100%", marginHorizontal: 10 }}>
          <View style={{ marginTop: 50, width: 73, height: 26 }}>
            <Image
              source={require("../../assets/logo.png")}
              resizeMode="stretch"
              style={{ width: 73, height: 26 }}
            />
          </View>
          <View style={styles.container}>
            <Image
              source={require("../../assets/CreatePassword.png")}
              style={styles.logo}
            />
            <Text
              style={{
                fontSize: 20,
                fontWeight: "600",
                color: theme.primaryTextColor,
              }}
            >
              Set a password
            </Text>
            <Text
              style={{
                fontSize: 12,
                fontWeight: "400",
                color: theme.secondaryTextColor,
                marginTop: 10,
              }}
            >
              Your previous password has been reset. Please set a new password
              for your account.
            </Text>
            <View>
              <Text
                style={{
                  fontSize: 14,
                  fontWeight: "400",
                  color: theme.primaryTextColor,
                  marginTop: 30,
                }}
              >
                Create Password
              </Text>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                  borderBottomWidth: 1,
                  borderColor:
                    newPasswordError ||
                    passwordLengthError ||
                    passwordCriteriaError
                      ? "red"
                      : "#ccc",
                  padding: 10,
                  borderRadius: 5,
                  marginBottom: 10,
                  width: "100%",
                }}
              >
                <TextInput
                  style={{
                    width: "100%",
                  }}
                  placeholder="Enter New Password"
                  onChangeText={(text) => setNewPassword(text)}
                  secureTextEntry={!isNewPasswordVisible}
                  value={newPassword}
                  color={theme.primaryTextColor}
                  placeholderTextColor={theme.secondaryTextColor}
                />
                <TouchableOpacity
                  style={{ paddingTop: 10 }}
                  onPress={toggleNewPasswordVisibility}
                >
                  <Icon
                    name={isNewPasswordVisible ? "eye-off" : "eye"}
                    size={20}
                    color="gray"
                  />
                </TouchableOpacity>
              </View>
              {newPasswordError && (
                <Text style={{ color: "red" }}>This field is required</Text>
              )}
              {passwordLengthError && (
                <Text style={{ color: "red" }}>
                  Password must be at least 5 characters long
                </Text>
              )}
              {passwordCriteriaError && (
                <Text style={{ color: "red" }}>
                  Password must contain at least one special character and one
                  number
                </Text>
              )}
            </View>
            <View>
              <Text
                style={{
                  fontSize: 14,
                  fontWeight: "400",
                  color: theme.primaryTextColor,
                  marginTop: 20,
                }}
              >
                Re-enter Password
              </Text>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                  borderBottomWidth: 1,
                  borderColor: retypedPasswordError ? "red" : "#ccc",
                  padding: 10,
                  borderRadius: 5,
                  marginBottom: 10,
                  width: "100%",
                }}
              >
                <TextInput
                  style={{
                    width: "100%",
                  }}
                  placeholder="Re-enter Password"
                  onChangeText={(text) => setRetypedPassword(text)}
                  secureTextEntry={!isReTypePasswordVisible}
                  value={reTypedPassword}
                  color={theme.primaryTextColor}
                  placeholderTextColor={theme.secondaryTextColor}
                />
                <TouchableOpacity
                  style={{ paddingTop: 10 }}
                  onPress={toggleReTypePasswordVisibility}
                >
                  <Icon
                    name={isReTypePasswordVisible ? "eye-off" : "eye"}
                    size={20}
                    color="gray"
                  />
                </TouchableOpacity>
              </View>
              {retypedPasswordError && (
                <Text style={{ color: "red" }}>This field is required</Text>
              )}
              {passwordMismatchError && (
                <Text style={{ color: "red" }}>Passwords do not match</Text>
              )}
            </View>

            <TouchableOpacity
              style={{
                width: "100%",
                height: 40,
                marginTop: 20,
                backgroundColor: theme.primarycolor,
                borderRadius: 8,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
              onPress={handleSubmit}
            >
              <Text style={{ color: "#FFFFFF", fontWeight: "600" }}>
                SUBMIT
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: "center",
  },
  logo: {
    width: 125,
    height: 120,
    alignSelf: "center",
    marginBottom: 20,
  },
  containerAndroid: {
    height: Dimensions.get("screen").height,
  },
  containerIos: {
    flex: 1,
  },
});
