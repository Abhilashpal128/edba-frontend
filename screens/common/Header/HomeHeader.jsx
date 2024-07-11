import React from "react";
import { TouchableOpacity, View, Text, Image } from "react-native";
import { Ionicons } from "@expo/vector-icons"; // Assuming you are using Expo
import { useThemeContext } from "../../../hooks/useTheme";

export const HomeHeader = ({ navigation, theme }) => {
  const userProfileImage = "../../../assets/logo.png";

  return {
    headerLeft: () => (
      <TouchableOpacity onPress={() => navigation.openDrawer()}>
        <Ionicons
          name="menu"
          size={25}
          color={theme.secondaryTextColor}
          style={{ marginLeft: 10 }}
        />
      </TouchableOpacity>
    ),
    headerTitle: () => (
      <View>
        <Text
          style={{
            color: theme.primaryTextColor,
            fontSize: 18,
            fontWeight: "bold",
          }}
        >
          Home
        </Text>
      </View>
    ),
    headerRight: () => (
      <View
        style={{
          marginRight: 10,
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          gap: 10,
        }}
      >
        <TouchableOpacity onPress={() => navigation.navigate("Notification")}>
          <Ionicons
            name="notifications"
            size={24}
            color={theme.secondaryTextColor}
          />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate("Profile")}
          style={{ marginRight: 10 }}
        >
          <Image
            source={require(userProfileImage)}
            resizeMode="contain"
            style={{
              width: 40,
              height: 40,
              borderRadius: 20,
              backgroundColor: "black",
            }}
          />
        </TouchableOpacity>
      </View>
    ),
    headerStyle: {
      backgroundColor: theme.backgroundColor,
    },
    headerTintColor: "#000000",
  };
};
