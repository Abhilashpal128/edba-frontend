import {
  createStackNavigator,
  TransitionPresets,
} from "@react-navigation/stack";
import React from "react";
import { View } from "react-native";
import Login from "../screens/auth/Login";
import SignUp from "../screens/auth/SignUp";
import ForgetPassword from "../screens/auth/ForgetPassword";
import VerifyCode from "../screens/auth/VerifyCode";
import CreatePassword from "../screens/auth/CreatePassword";

const Stack = createStackNavigator();

const AuthNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        ...TransitionPresets.SlideFromRightIOS,
      }}
    >
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Signup" component={SignUp} />
      <Stack.Screen name="ForgetPassword" component={ForgetPassword} />
      <Stack.Screen name="VerifyCode" component={VerifyCode} />
      <Stack.Screen name="CreatePassword" component={CreatePassword} />
    </Stack.Navigator>
  );
};

export default AuthNavigator;
