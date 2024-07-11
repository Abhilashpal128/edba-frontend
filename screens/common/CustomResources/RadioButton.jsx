import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
// import { theme } from "../../../theming";
import { Fontisto } from "react-native-vector-icons";
import { useThemeContext } from "../../../hooks/useTheme";

const RadioButton = ({ label, selected, onPress }) => {
  const { theme } = useThemeContext();
  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 10,
      }}
    >
      <View
        style={{
          marginRight: 10,
        }}
      >
        {selected ? (
          <Fontisto
            name="radio-btn-active"
            size={20}
            color={theme.primarycolor}
          />
        ) : (
          <Fontisto
            name="radio-btn-passive"
            size={20}
            color={theme.secondaryTextColor}
          />
        )}
      </View>
      <Text
        style={{
          fontSize: 12,
          fontWeight: "semibold",
          color: theme.secondaryTextColor,
        }}
      >
        {label}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({});

export default RadioButton;
