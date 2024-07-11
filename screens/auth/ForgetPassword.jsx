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
import React from "react";
import { TextInput } from "react-native";
import { TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { Controller, useForm } from "react-hook-form";
import { useThemeContext } from "../../hooks/useTheme";
import { post } from "../../utils/apis/TeacherApis/login";
// import { theme } from "../../theming";

export default function ForgetPassword() {
  const navigation = useNavigation();
  const { theme } = useThemeContext();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    const response = await post("user/forgot-password", data);
    console.log(`response`, response);
    if (response?.errCode == -1) {
      Alert.alert(`OTP sent on ${JSON.stringify(data.email)}`);
      navigation.navigate("VerifyCode");
    } else {
      Alert.alert(JSON.stringify(response?.errMsg));
    }

    console.log(data);
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
              source={require("../../assets/forgetPass.png")}
              style={styles.logo}
            />
            <Text
              style={{
                fontSize: 20,
                fontWeight: "600",
                color: theme.primaryTextColor,
              }}
            >
              Forgot your password?
            </Text>
            <Text
              style={{
                fontSize: 12,
                fontWeight: "400",
                color: theme.secondaryTextColor,
                marginTop: 10,
              }}
            >
              Don’t worry, happens to all of us. Enter your email below to
              recover your password
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
                Email
              </Text>
              <Controller
                control={control}
                rules={{
                  required: "This field is required",
                  pattern: {
                    value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                    message: "Invalid email address",
                  },
                }}
                render={({ field: { onChange, onBlur, value } }) => (
                  <TextInput
                    style={{
                      borderBottomWidth: 1,
                      borderColor: errors.email ? "red" : "#ccc",
                      paddingTop: 10,
                      borderRadius: 5,
                      marginBottom: 10,
                      width: "100%",
                      color: theme.secondaryTextColor,
                    }}
                    placeholder="Enter your email"
                    onChangeText={onChange}
                    onBlur={onBlur}
                    value={value}
                    placeholderTextColor={theme.secondaryTextColor}
                  />
                )}
                name="email"
              />
              {errors.email && (
                <Text style={styles.errorText}>{errors.email.message}</Text>
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
              onPress={handleSubmit(onSubmit)}
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
    marginTop: 100,
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
  errorText: {
    color: "red",
    marginBottom: 10,
  },
});
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
// import React from "react";
// import { TextInput } from "react-native";
// import { TouchableOpacity } from "react-native";
// import { useNavigation } from "@react-navigation/native";
// import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
// import { Controller, useForm } from "react-hook-form";
// import { useThemeContext } from "../../hooks/useTheme";
// import { post } from "../../utils/apis/TeacherApis/login";

// export default function ForgetPassword() {
//   const navigation = useNavigation();
//   const { theme } = useThemeContext();

//   const {
//     control,
//     handleSubmit,
//     formState: { errors },
//     watch,
//   } = useForm();

//   const onSubmit = async (data) => {
//     // const response = await post('user/change-password', { ...data });
//     Alert.alert("Form Data", JSON.stringify(data));
//     navigation.navigate("VerifyCode");
//     // console.log(data);
//   };

//   // Watch the password field to validate confirm password
//   const password = watch("password");

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
//               source={require("../../assets/forgetPass.png")}
//               style={styles.logo}
//             />
//             <Text
//               style={{
//                 fontSize: 20,
//                 fontWeight: "600",
//                 color: theme.primaryTextColor,
//               }}
//             >
//               Forgot your password?
//             </Text>
//             <Text
//               style={{
//                 fontSize: 12,
//                 fontWeight: "400",
//                 color: theme.secondaryTextColor,
//                 marginTop: 10,
//               }}
//             >
//               Don’t worry, happens to all of us. Enter your email below to
//               recover your password
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
//                 Email
//               </Text>
//               <Controller
//                 control={control}
//                 rules={{
//                   required: "This field is required",
//                   pattern: {
//                     value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
//                     message: "Invalid email address",
//                   },
//                 }}
//                 render={({ field: { onChange, onBlur, value } }) => (
//                   <TextInput
//                     style={{
//                       borderBottomWidth: 1,
//                       borderColor: errors.email ? "red" : "#ccc",
//                       paddingTop: 10,
//                       borderRadius: 5,
//                       marginBottom: 10,
//                       width: "100%",
//                       color: theme.secondaryTextColor,
//                     }}
//                     placeholder="Enter your email"
//                     onChangeText={onChange}
//                     onBlur={onBlur}
//                     value={value}
//                     placeholderTextColor={theme.secondaryTextColor}
//                   />
//                 )}
//                 name="email"
//               />
//               {errors.email && (
//                 <Text style={styles.errorText}>{errors.email.message}</Text>
//               )}
//             </View>
//             <View>
//               <Text
//                 style={{
//                   fontSize: 14,
//                   fontWeight: "400",
//                   color: theme.primaryTextColor,
//                   marginTop: 30,
//                 }}
//               >
//                 New Password
//               </Text>
//               <Controller
//                 control={control}
//                 rules={{
//                   required: "This field is required",
//                   // minLength: {
//                   //   value: 6,
//                   //   message: "Password must be at least 6 characters long",
//                   // },
//                 }}
//                 render={({ field: { onChange, onBlur, value } }) => (
//                   <TextInput
//                     secureTextEntry
//                     style={{
//                       borderBottomWidth: 1,
//                       borderColor: errors.password ? "red" : "#ccc",
//                       paddingTop: 10,
//                       borderRadius: 5,
//                       marginBottom: 10,
//                       width: "100%",
//                       color: theme.secondaryTextColor,
//                     }}
//                     placeholder="Enter new password"
//                     onChangeText={onChange}
//                     onBlur={onBlur}
//                     value={value}
//                     placeholderTextColor={theme.secondaryTextColor}
//                   />
//                 )}
//                 name="password"
//               />
//               {errors.password && (
//                 <Text style={styles.errorText}>{errors.password.message}</Text>
//               )}
//             </View>
//             <View>
//               <Text
//                 style={{
//                   fontSize: 14,
//                   fontWeight: "400",
//                   color: theme.primaryTextColor,
//                   marginTop: 30,
//                 }}
//               >
//                 Confirm Password
//               </Text>
//               <Controller
//                 control={control}
//                 rules={{
//                   required: "This field is required",
//                   validate: (value) =>
//                     value === password || "Passwords do not match",
//                 }}
//                 render={({ field: { onChange, onBlur, value } }) => (
//                   <TextInput
//                     secureTextEntry
//                     style={{
//                       borderBottomWidth: 1,
//                       borderColor: errors.confirmPassword ? "red" : "#ccc",
//                       paddingTop: 10,
//                       borderRadius: 5,
//                       marginBottom: 10,
//                       width: "100%",
//                       color: theme.secondaryTextColor,
//                     }}
//                     placeholder="Confirm new password"
//                     onChangeText={onChange}
//                     onBlur={onBlur}
//                     value={value}
//                     placeholderTextColor={theme.secondaryTextColor}
//                   />
//                 )}
//                 name="confirmPassword"
//               />
//               {errors.confirmPassword && (
//                 <Text style={styles.errorText}>
//                   {errors.confirmPassword.message}
//                 </Text>
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
//               onPress={handleSubmit(onSubmit)}
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
//     marginTop: 100,
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
//   errorText: {
//     color: "red",
//     marginBottom: 10,
//   },
// });
