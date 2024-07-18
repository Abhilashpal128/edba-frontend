import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  TouchableOpacity,
  Image,
  Alert,
  Platform,
  Dimensions,
  ActivityIndicator,
} from "react-native";
import { useForm, Controller } from "react-hook-form";
import { SafeAreaView } from "react-native-safe-area-context";
import { CheckBox } from "react-native-web";
import { Checkbox } from "react-native-paper";
import { useIsFocused, useNavigation } from "@react-navigation/native";
import Icon from "react-native-vector-icons/Ionicons";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { EventsAndNotices, post } from "../../utils/apis/TeacherApis/login";
// import { theme } from "../../theming";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../Redux/slices/LoginSlice";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useThemeContext } from "../../hooks/useTheme";
import * as Notifications from "expo-notifications";
import { storeDataInStorage } from "../../Storage/storage";

const LoginScreen = () => {
  const { theme } = useThemeContext();
  const [isChecked, setIsChecked] = useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [token, setToken] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const isFocused = useIsFocused();
  const Token = useSelector((state) => state?.token?.token);
  console.log(`Token In Login component `, Token);

  const user = useSelector((state) => state?.login?.user);
  const navigation = useNavigation();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };
  // const getExpoToken = async () => {
  //   console.log(`hii from login`);
  //   token = (await Notifications.getExpoPushTokenAsync()).data;
  //   console.log("Expo Push Token: in Login ", token);
  //   setToken(token);
  // };

  // useEffect(() => {
  //   console.log(`hii from login`);

  //   getExpoToken();
  // }, [isFocused]);

  const onSubmit = async (data) => {
    // const userData = {
    //   username,
    //   role: username === "teacher" ? "teacher" : "student",
    // };
    // login(userData);
    // console.log(data);
    // const response = await EventsAndNotices();
    // console.log(`responseDatatta `, response);
    // Alert.alert("Form Data", JSON.stringify(data));
    // console.log(data, Token);

    try {
      setIsLoading(true);
      const response = await post("user/login", { ...data, fcm_token: Token });
      if (response?.errCode == -1) {
        dispatch(login(response?.data));
        setIsLoading(false);
        await storeDataInStorage("userData", response?.data);
        console.log(response);
      } else {
        setIsLoading(false);
        Alert.alert(JSON.stringify(response?.errMsg));
      }
    } catch (error) {
      setIsLoading(false);
      Alert.alert(JSON.stringify(error));
    }
    // Alert.alert(JSON.stringify(Token));

    // dispatch(login(data));

    // dispatch(login(data));
    // console.log(`user`, user);
    // try {
    //   await AsyncStorage.setItem("theme", "Light");
    //   console.log("Data successfully stored");
    // } catch (e) {
    //   console.error("Error storing data:", e);
    // }
  };

  return (
    <SafeAreaView
      style={{ height: "100%", backgroundColor: theme.backgroundColor }}
    >
      {isLoading == true ? (
        <View
          style={{
            width: "100%",
            height: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <ActivityIndicator size="large" />
        </View>
      ) : (
        <View>
          <View style={{ height: "100%", marginHorizontal: 20 }}>
            <View
              style={{
                marginTop: 20,
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
            <KeyboardAwareScrollView
              contentContainerStyle={
                Platform.OS == "ios"
                  ? {
                      flex: 1,
                    }
                  : {
                      height: Dimensions.get("screen").height,
                    }
              }
              bounce={false}
              showsVerticalScrollIndicator={false}
              keyboardShouldPersistTaps="handled"
              style={{ marginTop: 20 }}
            >
              <View style={{ marginTop: 20 }}>
                <Image
                  source={require("../../assets/login.png")}
                  style={{
                    width: 125,
                    height: 120,
                    alignSelf: "center",
                    marginBottom: 20,
                  }}
                />
                <Text
                  style={{
                    fontSize: 24,
                    fontWeight: "600",
                    color: theme.primaryTextColor,
                  }}
                >
                  Welcome Back !
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
                  style={{
                    fontSize: 14,
                    marginBottom: 5,
                    color: theme.primaryTextColor,
                    fontWeight: "600",
                  }}
                >
                  Email ID
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
                      style={[
                        {
                          borderBottomWidth: 1,
                          padding: 10,
                          borderRadius: 5,
                          marginBottom: 10,
                          width: "100%",
                        },
                        { borderBottomColor: errors.email ? "red" : "#ccc" },
                      ]}
                      color={theme.primaryTextColor}
                      placeholder="Enter your email"
                      onBlur={onBlur}
                      onChangeText={onChange}
                      value={value}
                      placeholderTextColor={theme.secondaryTextColor}
                    />
                  )}
                  name="email"
                />
                {errors.email && (
                  <Text
                    style={{
                      color: "red",
                      marginBottom: 10,
                    }}
                  >
                    {errors.email.message}
                  </Text>
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
                    <View
                      style={[
                        {
                          flexDirection: "row",
                          alignItems: "center",
                          justifyContent: "space-between",
                          borderBottomWidth: 1,

                          padding: 10,
                          borderRadius: 5,
                          marginBottom: 10,
                          width: "100%",
                        },
                        { borderBottomColor: errors.password ? "red" : "#ccc" },
                      ]}
                    >
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
                  <Text
                    style={{
                      color: "red",
                      marginBottom: 10,
                    }}
                  >
                    {errors.password.message}
                  </Text>
                )}

                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginBottom: 20,
                  }}
                >
                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                    }}
                  >
                    {/*<Checkbox
                      status={isChecked ? "checked" : "unchecked"}
                      onPress={() => {
                        setIsChecked(!isChecked);
                      }}
                      color={theme.primarycolor}
                    />
                    <Text style={{ color: theme.primaryTextColor }}>
                      Remember me
                    </Text> */}
                  </View>
                  <TouchableOpacity
                    onPress={() => {
                      navigation.navigate("ForgetPassword");
                    }}
                  >
                    <Text
                      style={{
                        color: theme.primarycolor,
                      }}
                    >
                      Forgot password?
                    </Text>
                  </TouchableOpacity>
                </View>

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

                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "center",
                    marginTop: 20,
                  }}
                >
                  <Text style={{ color: theme.primaryTextColor }}>
                    You don't Have an account?{" "}
                  </Text>
                  <TouchableOpacity
                    onPress={() => {
                      navigation.navigate("Signup");
                    }}
                  >
                    <Text
                      style={{
                        color: theme.primarycolor,
                      }}
                    >
                      Register
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </KeyboardAwareScrollView>
          </View>
        </View>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({});

export default LoginScreen;

// <View style={styles.container}>
//   <Text style={styles.title}>Login</Text>
//   <TextInput
//     style={styles.input}
//     placeholder="Username"
//     value={username}
//     onChangeText={setUsername}
//   />
//   <TextInput
//     style={styles.input}
//     placeholder="Password"
//     value={password}
//     onChangeText={setPassword}
//     secureTextEntry
//   />
//   <Button title="Login" onPress={handleLogin} />
// </View>
