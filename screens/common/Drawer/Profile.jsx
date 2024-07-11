import { Image, StyleSheet, Text, View } from "react-native";
import React from "react";
import { useThemeContext } from "../../../hooks/useTheme";

export default function Profile(props) {
  const { theme } = useThemeContext();
  const { imageUrl, firstname, lastname, className } = props;
  return (
    <View
      style={{
        display: "flex",
        flexDirection: "row",
        gap: 10,
        backgroundColor: theme.backgroundColor,
      }}
    >
      <View>
        <Image source={{ uri: { imageUrl } }} />
      </View>
      <View>
        <Text>
          Mr. {firstname} {lastname}
        </Text>
        <Text>{className}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({});
