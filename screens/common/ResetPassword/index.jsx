import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import React, { useLayoutEffect, useState } from "react";
import { Ionicons, Entypo, AntDesign } from "react-native-vector-icons";
import Icon from "react-native-vector-icons/Ionicons";
import { Image } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { Controller, useForm } from "react-hook-form";
import { TextInput } from "react-native";
import { TouchableOpacity } from "react-native";
import { Alert } from "react-native";
import { useThemeContext } from "../../../hooks/useTheme";
import { post } from "../../../utils/apis/TeacherApis/login";
import { useSelector } from "react-redux";
import { ActivityIndicator } from "react-native";

export default function ResetPassword({ navigation }) {
  const { theme } = useThemeContext();
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isNewPasswordVisible, setIsNewPasswordVisible] = useState(false);
  const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] =
    useState(false);
  const [passwordMismatchError, setPasswordMismatchError] = useState(false);
  const [passwordCriteriaError, setPasswordCriteriaError] = useState(false);
  const [passwordLengthError, setPasswordLengthError] = useState(false);
  const [Loading, setLoading] = useState(false);

  const userData = useSelector((state) => state?.login?.user);
  const userId = userData?.id;

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };
  const toggleNewPasswordVisibility = () => {
    setIsNewPasswordVisible(!isNewPasswordVisible);
  };

  const onsubmit = async (data) => {
    const specialCharRegex = /[!@#$%^&*(),.?":{}|<>]/;
    const numericRegex = /[0-9]/;

    if (data?.NewPassword != data?.confirmPassword) {
      setPasswordMismatchError(true);
      return true;
    }

    if (
      !specialCharRegex.test(data?.NewPassword) ||
      !numericRegex.test(data?.NewPassword)
    ) {
      setPasswordCriteriaError(true);
      return true;
    }
    if (data?.NewPassword.length < 5) {
      setPasswordLengthError(true);
      return true;
    }

    try {
      setLoading(true);
      const response = await post("user/reset-password", {
        userId: userId,
        currentPassword: data?.currentPassword,
        newPassword: data?.NewPassword,
        confirmPassword: data?.confirmPassword,
      });
      if (response?.errCode == -1) {
        Alert.alert("Password reset successful");
        navigation.navigate("Home");
        setLoading(false);
      } else if (response?.errMsg) {
        Alert.alert(response?.errMsg);
        setLoading(false);
      } else {
        console.log(`Error while reseting password`);
        setLoading(false);
      }
    } catch (error) {
      console.log(`error in Reset password`, error);
      setLoading(false);
    }

    // Alert.alert(JSON.stringify(data));
  };

  return (
    <KeyboardAwareScrollView
      style={{
        width: "100%",
        height: "100%",
        backgroundColor: theme.backgroundColor,
      }}
    >
      <View
        style={{
          display: "flex",
          height: "100%",
          marginTop: 40,
          gap: 30,
          marginHorizontal: 20,
        }}
      >
        <TouchableOpacity
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            gap: 10,
          }}
          onPress={() => {
            navigation.goBack();
          }}
        >
          <AntDesign name="left" size={18} color={theme.primaryTextColor} />
          <Image
            source={require("../../../assets/logo.png")}
            style={{ width: 73, height: 36 }}
            resizeMode="contain"
          />
        </TouchableOpacity>
        <View
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Image
            source={require("../../../assets/CreatePassword.png")}
            style={{ height: 152, width: 150 }}
            resizeMode="contain"
          />
        </View>
        <View style={{ display: "flex", gap: 20, marginTop: 10 }}>
          <Text
            style={{
              color: theme.primaryTextColor,
              fontWeight: "600",
              fontSize: 20,
            }}
          >
            Reset your password
          </Text>
          <View>
            <Text style={{ color: theme.primaryTextColor }}>
              Current Password
            </Text>
            <View
              style={{
                width: "100%",
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                borderBottomWidth: 1,
                borderBottomColor: "#E8E8E8EE",
                marginTop: 10,
              }}
            >
              <Controller
                control={control}
                rules={{
                  required: "This field is required",
                }}
                render={({ field: { onChange, onBlur, value } }) => (
                  <TextInput
                    onChangeText={onChange}
                    placeholder="Enter Current Password"
                    onBlur={onBlur}
                    value={value}
                    secureTextEntry={!isPasswordVisible}
                    color={theme.primaryTextColor}
                    placeholderTextColor={theme.secondaryTextColor}
                  />
                )}
                name="currentPassword"
              />
              <TouchableOpacity onPress={togglePasswordVisibility}>
                <Icon
                  name={isPasswordVisible ? "eye-off" : "eye"}
                  size={20}
                  color="gray"
                />
              </TouchableOpacity>
            </View>
            {errors.currentPassword && (
              <Text
                style={{
                  color: "red",
                  marginBottom: 10,
                }}
              >
                {errors.currentPassword.message}
              </Text>
            )}
          </View>
          <View>
            <Text style={{ color: theme.primaryTextColor }}>New Password</Text>
            <View
              style={{
                width: "100%",
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                borderBottomWidth: 1,
                borderBottomColor: "#E8E8E8EE",
                marginTop: 10,
              }}
            >
              <Controller
                control={control}
                rules={{
                  required: "This field is required",
                }}
                render={({ field: { onChange, onBlur, value } }) => (
                  <TextInput
                    onChangeText={(text) => {
                      onChange(text);
                      setPasswordMismatchError(false);
                      setPasswordCriteriaError(false);
                      setPasswordLengthError(false);
                    }}
                    placeholder="Enter Current Password"
                    onBlur={onBlur}
                    value={value}
                    secureTextEntry={!isNewPasswordVisible}
                    color={theme.primaryTextColor}
                    placeholderTextColor={theme.secondaryTextColor}
                  />
                )}
                name="NewPassword"
              />
              <TouchableOpacity onPress={toggleNewPasswordVisibility}>
                <Icon
                  name={isNewPasswordVisible ? "eye-off" : "eye"}
                  size={20}
                  color="gray"
                />
              </TouchableOpacity>
            </View>
            {errors.NewPassword && (
              <Text
                style={{
                  color: "red",
                  marginBottom: 10,
                }}
              >
                {errors.NewPassword.message}
              </Text>
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
            <Text style={{ color: theme.primaryTextColor }}>
              Confirm Password
            </Text>
            <View
              style={{
                width: "100%",
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                borderBottomWidth: 1,
                borderBottomColor: "#E8E8E8EE",
                marginTop: 10,
              }}
            >
              <Controller
                control={control}
                rules={{
                  required: "This field is required",
                }}
                render={({ field: { onChange, onBlur, value } }) => (
                  <TextInput
                    placeholder="Enter Confirm Password"
                    onChangeText={(text) => {
                      onChange(text);
                      setPasswordMismatchError(false);
                      setPasswordCriteriaError(false);
                      setPasswordLengthError(false);
                    }}
                    onBlur={onBlur}
                    value={value}
                    secureTextEntry={!isConfirmPasswordVisible}
                    color={theme.primaryTextColor}
                    placeholderTextColor={theme.secondaryTextColor}
                  />
                )}
                name="confirmPassword"
              />
              <TouchableOpacity
                onPress={() => {
                  setIsConfirmPasswordVisible(!isConfirmPasswordVisible);
                }}
              >
                <Icon
                  name={isConfirmPasswordVisible ? "eye-off" : "eye"}
                  size={20}
                  color="gray"
                />
              </TouchableOpacity>
            </View>
            {errors.confirmPassword && (
              <Text
                style={{
                  color: "red",
                  marginBottom: 10,
                }}
              >
                {errors.confirmPassword?.message}
              </Text>
            )}
            {passwordMismatchError && (
              <View>
                <Text
                  style={{
                    color: "red",
                    marginBottom: 10,
                  }}
                >
                  Passwords not matching
                </Text>
              </View>
            )}
            {passwordCriteriaError && (
              <Text style={{ color: "red" }}>
                Password must contain at least one special character and one
                number
              </Text>
            )}
          </View>
        </View>
        <TouchableOpacity
          style={{
            width: "90%",
            height: 40,
            backgroundColor: theme.primarycolor,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            marginHorizontal: "auto",
            borderRadius: 5,
          }}
          onPress={handleSubmit((data) => {
            if (Loading) {
              return null;
            }
            onsubmit(data); // Call the form submission handler
          })}
        >
          <Text style={{ fontSize: 14, fontWeight: "700", color: "#FFFFFF" }}>
            {Loading ? <ActivityIndicator size={"large"} /> : "RESET PASSWORD"}
          </Text>
        </TouchableOpacity> 
      </View>
    </KeyboardAwareScrollView>
  );
}

const styles = StyleSheet.create({});
