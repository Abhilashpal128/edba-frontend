import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  TouchableOpacity,
  Image,
  Alert,
  Dimensions,
  Platform,
} from "react-native";
import { useForm, Controller } from "react-hook-form";
import { SafeAreaView } from "react-native-safe-area-context";
import { CheckBox } from "react-native-web";
import { Checkbox } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import Icon from "react-native-vector-icons/Ionicons";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { useThemeContext } from "../../hooks/useTheme";
// import { theme } from "../../theming";

export default function SignUp() {
  const { theme } = useThemeContext();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isChecked, setIsChecked] = useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const navigation = useNavigation();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  const onSubmit = (data) => {
    console.log(data);
    Alert.alert("Form Data", JSON.stringify(data));
    // const response = RegisterUser(data);
    // console.log(`responseresponse`, response);
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
            <Text
              style={{
                fontSize: 24,
                fontWeight: "600",
                color: theme.primaryTextColor,
              }}
            >
              Register
            </Text>
            <Text
              style={{
                fontSize: 14,
                marginBottom: 20,
                color: theme.secondaryTextColor,
              }}
            >
              Stay signed in with your account to make easier
            </Text>

            <Text
              style={[
                {
                  fontSize: 14,
                  marginBottom: 5,
                  color: theme.primaryTextColor,
                  fontWeight: "600",
                },
                { marginTop: 20 },
              ]}
            >
              Full Name
            </Text>
            <Controller
              control={control}
              rules={{
                required: "This field is required",
              }}
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  style={styles.input}
                  placeholder="Enter your Full name"
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  color={theme.primaryTextColor}
                  placeholderTextColor={theme.secondaryTextColor}
                />
              )}
              name="fullname"
            />
            {errors.fullname && (
              <Text style={styles.errorText}>{errors.fullname.message}</Text>
            )}
            <Text
              style={{
                fontSize: 14,
                marginBottom: 5,
                color: theme.primaryTextColor,
                fontWeight: "600",
              }}
            >
              Email{" "}
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
                  style={styles.input}
                  placeholder="Enter your email"
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  color={theme.primaryTextColor}
                  placeholderTextColor={theme.secondaryTextColor}
                />
              )}
              name="email"
            />
            {errors.email && (
              <Text style={styles.errorText}>{errors.email.message}</Text>
            )}

            <Text
              style={{
                fontSize: 14,
                marginBottom: 5,
                color: theme.primaryTextColor,
                fontWeight: "600",
              }}
            >
              Mobile number
            </Text>
            <Controller
              control={control}
              rules={{
                required: "This field is required",
                maxLength: {
                  value: 10,
                  message: "Mobile number cannot exceed 10 digits",
                },
                pattern: {
                  value: /^[0-9]+$/,
                  message: "Invalid mobile number",
                },
              }}
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  style={styles.input}
                  placeholder="Enter your Mobile Number"
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  keyboardType="numeric"
                  color={theme.primaryTextColor}
                  placeholderTextColor={theme.secondaryTextColor}
                />
              )}
              name="mobile"
            />
            {errors.mobile && (
              <Text style={styles.errorText}>{errors.mobile.message}</Text>
            )}

            <Text
              style={{
                fontSize: 14,
                marginBottom: 5,
                color: theme.primaryTextColor,
                fontWeight: "600",
              }}
            >
              Password
            </Text>
            <Controller
              control={control}
              rules={{
                required: "This field is required",
              }}
              render={({ field: { onChange, onBlur, value } }) => (
                <View style={styles.inputContainer}>
                  <TextInput
                    placeholder="Enter your password"
                    onBlur={onBlur}
                    onChangeText={onChange}
                    value={value}
                    secureTextEntry={!isPasswordVisible}
                    color={theme.primaryTextColor}
                    placeholderTextColor={theme.secondaryTextColor}
                  />
                  <TouchableOpacity onPress={togglePasswordVisibility}>
                    <Icon
                      name={isPasswordVisible ? "eye-off" : "eye"}
                      size={20}
                      color={theme.primaryTextColor}
                    />
                  </TouchableOpacity>
                </View>
              )}
              name="password"
            />
            {errors.password && (
              <Text style={styles.errorText}>{errors.password.message}</Text>
            )}

            {/* <View style={styles.rememberForgotContainer}>
            <View style={styles.rememberMe}>
              <Checkbox
                status={isChecked ? "checked" : "unchecked"}
                onPress={() => {
                  setIsChecked(!isChecked);
                }}
              />
              <Text>Remember me</Text>
            </View>
            <TouchableOpacity>
              <Text style={styles.forgotPassword}>Forgot password?</Text>
            </TouchableOpacity>
          </View> */}

            {/* <Button title="Submit" onPress={handleSubmit(onSubmit)} /> */}
            <TouchableOpacity
              style={{
                width: "100%",
                height: 40,
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

            <View style={styles.registerContainer}>
              <Text style={{ color: theme.primaryTextColor }}>
                Alredy Have an account?
              </Text>
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate("Login");
                }}
              >
                <Text
                  style={{
                    color: theme.primarycolor,
                  }}
                >
                  Log in
                </Text>
              </TouchableOpacity>
            </View>
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
    marginTop: 20,
  },
  logo: {
    width: 125,
    height: 120,
    alignSelf: "center",
    marginBottom: 20,
  },

  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderBottomWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
    width: "100%",
  },

  input: {
    borderBottomWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
    width: "100%",
  },
  errorText: {
    color: "red",
    marginBottom: 10,
  },
  rememberForgotContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  rememberMe: {
    flexDirection: "row",
    alignItems: "center",
  },

  registerContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 20,
  },

  containerAndroid: {
    height: Dimensions.get("screen").height,
  },
  containerIos: {
    flex: 1,
  },
});
