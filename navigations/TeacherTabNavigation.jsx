import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import React from "react";
import TeacherHome from "../screens/teacher/Home";
// import TeacherProfile from "../screens/teacher/profile";
import TeacherTimeTable from "../screens/teacher/TimeTable";
import TeacherAttendence from "../screens/teacher/Attendence";
import TeacherAssignment from "../screens/teacher/Assignment";
import { MaterialCommunityIcons } from "react-native-vector-icons";
import { Text } from "react-native";
// import { theme } from "../theming";
import NoticesAndEvents from "../screens/teacher/NoticeEvents";
import { useThemeContext } from "../hooks/useTheme";

const Tab = createBottomTabNavigator();

function TeacherTabNavigation() {
  const { theme } = useThemeContext();
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarStyle: {
          paddingVertical: 10,
          height: 60,
          backgroundColor: theme.DrawerTabBackgroundColor,
        },
      }}
    >
      <Tab.Screen
        options={{
          tabBarIcon: ({ focused, color, size }) => (
            <MaterialCommunityIcons
              name="home-outline"
              size={size}
              color={focused ? theme.primarycolor : theme.ternaryTextColor}
            />
          ),
          tabBarLabel: ({ focused }) => (
            <Text
              style={{
                marginBottom: 10,
                fontSize: 12,
                color: focused ? theme.primarycolor : theme.ternaryTextColor,
              }}
            >
              Home
            </Text>
          ),
        }}
        name="Home"
        component={TeacherHome}
      />
      <Tab.Screen
        options={{
          tabBarIcon: ({ focused, color, size }) => (
            <MaterialCommunityIcons
              name="calendar-month-outline"
              size={size}
              color={focused ? theme.primarycolor : theme.ternaryTextColor}
            />
          ),
          tabBarLabel: ({ focused }) => (
            <Text
              style={{
                marginBottom: 10,
                fontSize: 12,
                color: focused ? theme.primarycolor : theme.ternaryTextColor,
              }}
            >
              Attendence
            </Text>
          ),
        }}
        name="Attendence"
        component={TeacherAttendence}
      />
      <Tab.Screen
        options={{
          tabBarIcon: ({ focused, color, size }) => (
            <MaterialCommunityIcons
              name="clipboard-text-outline"
              size={size}
              color={focused ? theme.primarycolor : theme.ternaryTextColor}
            />
          ),
          tabBarLabel: ({ focused }) => (
            <Text
              style={{
                marginBottom: 10,
                fontSize: 12,
                color: focused ? theme.primarycolor : theme.ternaryTextColor,
              }}
            >
              Assignments
            </Text>
          ),
        }}
        name="Assignments"
        component={TeacherAssignment}
      />
      <Tab.Screen
        name="TimeTable"
        component={TeacherTimeTable}
        options={{
          tabBarButton: () => null, // Hide the tab bar button
          tabBarVisible: false, // Hide the tab bar
        }}
      />
      <Tab.Screen
        name="NoticesEvents"
        component={NoticesAndEvents}
        options={{
          tabBarButton: () => null,
          tabBarVisible: false,
        }}
      />
    </Tab.Navigator>
  );
}

export default TeacherTabNavigation;
