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

export default function ResetPassword({ navigation }) {
  const { theme } = useThemeContext();
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isNewPasswordVisible, setIsNewPasswordVisible] = useState(false);
  const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] =
    useState(false);

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

  const onsubmit = (data) => {
    Alert.alert(JSON.stringify(data));
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
                    onChangeText={onChange}
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
                    onChangeText={onChange}
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
                {errors.confirmPassword.message}
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
          onPress={handleSubmit(onsubmit)}
        >
          <Text style={{ fontSize: 14, fontWeight: "700", color: "#FFFFFF" }}>
            RESET PASSWORD
          </Text>
        </TouchableOpacity>
      </View>
    </KeyboardAwareScrollView>
  );
}

const styles = StyleSheet.create({});
