import { ScrollView, StyleSheet, Text, TextInput, View } from "react-native";
import React from "react";
import { useThemeContext } from "../../../hooks/useTheme";

export default function WorkExperienceDetails({ workExperienceDetails }) {
  const { theme } = useThemeContext();
  console.log(`const { theme } = useThemeContext();`, workExperienceDetails);
  return (
    <ScrollView
      style={{
        backgroundColor: theme.backgroundColor,
        marginHorizontal: 10,
        marginVertical: 20,
      }}
    >
      {workExperienceDetails?.details !== undefined &&
        Object.entries(workExperienceDetails?.details).map(([key, value]) => (
          <View
            key={key}
            style={{
              display: "flex",
              flexDirection: "column",
              marginHorizontal: 10,
            }}
          >
            <View style={{ marginTop: 10 }}>
              <Text
                style={{
                  fontSize: 14,
                  fontWeight: "bold",
                  color: theme.primaryTextColor,
                }}
              >
                {value?.label}
              </Text>
            </View>
            <View
              key={key}
              style={{
                display: "flex",
                flexDirection: "row",
                height: 40,
                borderBottomWidth: 1,
                borderColor: "#E8E8E8EE",
                color: theme.secondaryTextColor,
              }}
            >
              {Array.isArray(value.details) ? (
                value.details.map((item, index) => (
                  <View key={index}>
                    <Text>{item?.name}, </Text>
                  </View>
                ))
              ) : (
                <TextInput
                  editable={false}
                  value={
                    value?.label == "Number of Years"
                      ? JSON.stringify(value?.details)
                      : value?.details
                  }
                  style={{
                    height: 40,
                    borderBottomWidth: 1,
                    borderColor: "#E8E8E8EE",
                    color: theme.secondaryTextColor,
                  }}
                  color={theme.primaryTextColor}
                  placeholderTextColor={theme.secondaryTextColor}
                />
              )}
            </View>
          </View>
        ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({});
