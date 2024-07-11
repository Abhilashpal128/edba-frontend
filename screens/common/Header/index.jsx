import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { useThemeContext } from "../../../hooks/useTheme";
// import { theme } from "../../../theming";

const Header = ({ navigation, route }) => {
  const { theme } = useThemeContext();
  return {
    headerLeft: () => (
      <TouchableOpacity onPress={() => navigation.openDrawer()}>
        <Icon
          name="menu"
          size={25}
          color="#000000"
          style={{ marginLeft: 10 }}
        />
      </TouchableOpacity>
    ),
    headerTitle: () => (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text
          style={{
            color: "#000000",
            fontSize: 18,
            fontWeight: "bold",
            textAlign: "center",
          }}
        >
          {route.name}
        </Text>
      </View>
    ),
    headerRight: () => (
      <TouchableOpacity onPress={() => alert("Bell icon pressed")}>
        <Icon
          name="notifications"
          size={25}
          color="#000000"
          style={{ marginRight: 10 }}
        />
      </TouchableOpacity>
    ),
    headerStyle: {
      backgroundColor: theme.backgroundColor,
    },
    headerTitleAlign: "center", // Adjust alignment for header title (if needed)
    headerTintColor: "#000000", // Text color for back button and header title
  };
};

const styles = StyleSheet.create({});

export default Header;
