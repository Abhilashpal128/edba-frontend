import {
  createStackNavigator,
  TransitionPresets,
} from "@react-navigation/stack";
import React, { useState } from "react";
import { View } from "react-native";
import StudentNavigator from "./StudentNavigator";
import TeacherNavigator from "./TeacherNavigator";
import AuthNavigator from "./AuthNavigator";
import TeacherDetailTabNavigator from "../screens/common/PersonalDetail/TeacherDetailTabNavigator";
import { useSelector } from "react-redux";

const AppNavigator = () => {
  const userData = useSelector((state) => state.login.user);
  const Stack = createStackNavigator();
  console.log(`userData`, userData);
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        ...TransitionPresets.SlideFromRightIOS,
      }}
    >
      {userData != null ? (
        userData.role === "student" ? (
          <Stack.Screen name="Student" component={StudentNavigator} />
        ) : userData.role === "teacher" ? (
          <>
            <Stack.Screen name="Teacher" component={TeacherNavigator} />
            <Stack.Screen
              name="ProfileTeacher"
              component={TeacherDetailTabNavigator}
            />
          </>
        ) : (
          <Stack.Screen name="Auth" component={AuthNavigator} />
        )
      ) : (
        <Stack.Screen name="Auth" component={AuthNavigator} />
      )}
      {/* {userData != null ? (
        userData.password === "student" ? (
          <Stack.Screen name="Student" component={StudentNavigator} />
        ) : userData.password === "teacher" ? (
          <>
            <Stack.Screen name="Teacher" component={TeacherNavigator} />
            <Stack.Screen
              name="ProfileTeacher"
              component={TeacherDetailTabNavigator}
            />
          </>
        ) : (
          <Stack.Screen name="Auth" component={AuthNavigator} />
        )
      ) : (
        <Stack.Screen name="Auth" component={AuthNavigator} />
      )} */}
    </Stack.Navigator>
  );
};

export default AppNavigator;
