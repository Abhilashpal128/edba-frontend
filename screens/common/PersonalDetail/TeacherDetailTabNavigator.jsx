import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import BasicDetails from "./BasicDetails";
import PersonalDetails from "./PersonalDetails";
import WorkLocationDetails from "./WorkLocationDetails";
// import { theme } from "../../../theming";
import { useThemeContext } from "../../../hooks/useTheme";

const Tab = createBottomTabNavigator();
const CustomTabBarLabel = ({ focused, label }) => {
  const { theme } = useThemeContext();
  return (
    <Text
      style={[
        {
          fontSize: 14,
          textAlign: "center",
          paddingVertical: 10,
          marginHorizontal: 20,
        },
        focused
          ? {
              color: "#FFFFFF",
              padding: 10,
              backgroundColor: theme.primarycolor,
              borderRadius: 25,
            }
          : null,
      ]}
    >
      {label}
    </Text>
  );
};
export default function TeacherDetailTabNavigator() {
  const { theme } = useThemeContext();
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarLabel: ({ focused }) => (
          <CustomTabBarLabel focused={focused} label={route.name} />
        ),
        tabBarStyle: {
          backgroundColor: theme.backgroundColor,

          paddingVertical: 10,
          height: 60,
        },
        tabBarActiveTintColor: "blue",
        tabBarInactiveTintColor: "gray",
      })}
    >
      <Tab.Screen name="basic Detail" component={BasicDetails} />
      <Tab.Screen name="Personal Detail" component={PersonalDetails} />
      <Tab.Screen name="Work location Detail" component={WorkLocationDetails} />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({});
