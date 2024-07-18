import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useLayoutEffect } from "react";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import Pending from "./Pending";
import Completed from "./Completed";
import { ThemeProvider, useThemeContext } from "../../../hooks/useTheme";
import { useIsFocused, useNavigation } from "@react-navigation/native";
import Icon from "react-native-vector-icons/Ionicons";
import { FontAwesome6 } from "react-native-vector-icons";
import { Ionicons, Feather } from "react-native-vector-icons";

export default function StudentsAssignments({ navigation, route }) {
  const { theme } = useThemeContext();
  const isFocused = useIsFocused();
  useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <TouchableOpacity onPress={() => navigation.openDrawer()}>
          <Icon
            name="menu"
            size={25}
            color={theme.secondaryTextColor}
            style={{ marginLeft: 10 }}
          />
        </TouchableOpacity>
      ),

      headerTitle: () => (
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Text
            numberOfLines={1}
            style={{
              fontSize: 16,
              marginLeft: 10,
              color: theme.primaryTextColor,
              fontWeight: "bold",
            }}
          >
            List Of Assignments
          </Text>
        </View>
      ),

      headerRight: () => (
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            width: "20%",
            justifyContent: "flex-end",
            marginRight: 20,
          }}
        >
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("Notification");
            }}
          >
            <Feather name="bell" size={20} color={theme.secondaryTextColor} />
          </TouchableOpacity>
        </View>
      ),
      headerStyle: {
        backgroundColor: theme.backgroundColor,
      },
      headerTitleAlign: "center", // Adjust alignment for header title (if needed)
      headerTintColor: "#000000", // Text color for back button and header title
    });
  }, [navigation, theme]);
  const { params } = route;

  const Tab = createMaterialTopTabNavigator();

  return (
    <ThemeProvider>
      <Tab.Navigator
        screenOptions={{
          tabBarActiveTintColor: "#2B78CA",
          tabBarInactiveTintColor: theme.primaryTextColor,
          tabBarIndicatorStyle: { backgroundColor: theme.primarycolor },
          tabBarStyle: {
            elevation: 0,
            shadowOpacity: 0, // for iOS
            shadowOffset: { height: 0, width: 0 }, // for iOS
            shadowRadius: 0, // for iOS
            backgroundColor: theme.backgroundColor,
          },
          tabBarLabelStyle: {
            textTransform: "none",
            fontSize: 12,
            fontWeight: "bold",
          },
        }}
        style={{
          paddingHorizontal: 20,
          backgroundColor: theme.backgroundColor,
        }}
      >
        <Tab.Screen
          name="Pending"
          component={Pending}
          initialParams={params != undefined ? params : undefined}
        />
        <Tab.Screen
          name="Completed"
          component={Completed}
          initialParams={params != undefined ? params : undefined}
        />
      </Tab.Navigator>
    </ThemeProvider>
  );
}

const styles = StyleSheet.create({});
