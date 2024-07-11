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
import { useNavigation } from "@react-navigation/native";
import Icon from "react-native-vector-icons/Ionicons";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { Controller, useForm } from "react-hook-form";
import { useThemeContext } from "../../hooks/useTheme";
import { post } from "../../utils/apis/TeacherApis/login";
// import { theme } from "../../theming";

export default function VerifyCode() {
  const { theme } = useThemeContext();
  const [isCodeVisible, setIsCodeVisible] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const toggleCodeVisibility = () => {
    setIsCodeVisible(!isCodeVisible);
  };

  const navigation = useNavigation();

  const onsubmit = async (data) => {
    const response = await post("user/verify-otp", data);
    console.log(response);
    if (response?.errCode == -1) {
      Alert.alert("OTP verified");
      navigation.navigate("CreatePassword", { data });
    } else {
      Alert.alert(response?.errMsg);
    }
    // navigation.navigate("CreatePassword");
  };

  return (
    <SafeAreaView style={{ backgroundColor: theme.backgroundColor }}>
      <KeyboardAwareScrollView
        contentContainerStyle={
          Platform.OS == "ios" ? styles.containerIos : styles.containerAndroid
        }
        bounce={false}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        <View style={{ height: "100%" }}>
          <View
            style={{
              marginTop: 50,
              width: 73,
              height: 26,
              marginHorizontal: 10,
            }}
          >
            <Image
              source={require("../../assets/logo.png")}
              resizeMode="stretch"
              style={{ width: 73, height: 26 }}
            />
          </View>
          <View style={styles.container}>
            <Image
              source={require("../../assets/VerifyCode.png")}
              style={styles.logo}
            />
            <Text
              style={{
                fontSize: 20,
                fontWeight: "600",
                color: theme.primaryTextColor,
              }}
            >
              Verify Code
            </Text>
            <Text
              style={{
                fontSize: 12,
                fontWeight: "400",
                color: theme.secondaryTextColor,
                marginTop: 10,
              }}
            >
              An authentication code has been sent to your email.
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
                Enter Code
              </Text>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                  borderBottomWidth: 1,
                  borderColor: "#ccc",
                  padding: 10,
                  borderRadius: 5,
                  marginBottom: 10,
                  width: "100%",
                }}
              >
                <Controller
                  control={control}
                  rules={{
                    required: "This Feild is required",
                  }}
                  render={({ field: { onChange, onBlur, value } }) => (
                    <TextInput
                      style={{
                        paddingTop: 10,
                        width: "100%",
                      }}
                      keyboardType="numeric"
                      placeholder="Enter your Code"
                      onChangeText={onChange}
                      onBlur={onBlur}
                      value={value}
                      secureTextEntry={!isCodeVisible}
                      placeholderTextColor={theme.secondaryTextColor}
                      color={theme.primaryTextColor}
                    />
                  )}
                  name="otp"
                />
                {errors.email && (
                  <Text style={styles.errorText}>{errors.email.message}</Text>
                )}
                {/* <TextInput
                  style={{
                    paddingTop: 10,
                    width: "100%",
                  }}
                  keyboardType="numeric"
                  placeholder="Enter your Code"
                  onChangeText={(opt) => {
                    SetOtp(opt);
                  }}
                  secureTextEntry={!isCodeVisible}
                /> */}
                <TouchableOpacity
                  style={{ paddingTop: 10 }}
                  onPress={toggleCodeVisibility}
                >
                  <Icon
                    name={isCodeVisible ? "eye-off" : "eye"}
                    size={20}
                    color={theme.primaryTextColor}
                  />
                </TouchableOpacity>
              </View>
            </View>
            <View style={{ flexDirection: "row" }}>
              <Text style={{ color: theme.primaryTextColor }}>
                Didn’t receive a code
              </Text>
              <TouchableOpacity>
                <Text style={{ color: theme.primarycolor }}>? Resend</Text>
              </TouchableOpacity>
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
              onPress={handleSubmit(onsubmit)}
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
  errorText: {
    color: "red",
    marginBottom: 10,
  },
});
