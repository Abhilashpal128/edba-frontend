import { ScrollView, StyleSheet, Text, TextInput, View } from "react-native";
import React from "react";
import { useThemeContext } from "../../../hooks/useTheme";

export default function EducationalDetails({ educationalDetails }) {
  const { theme } = useThemeContext();
  console.log(`educationalDetails`, educationalDetails);
  return (
    <ScrollView
      style={{
        backgroundColor: theme.backgroundColor,
        marginHorizontal: 10,
        marginVertical: 20,
      }}
    >
      {/* <FlatList
        data={data}
        renderItem={renderItem}
        style={{
          display: "flex",
          flexDirection: "column",
        }}
      /> */}
      {educationalDetails?.details !== undefined &&
        Object.entries(educationalDetails?.details).map(([key, value]) => (
          <View
            key={key}
            style={{
              display: "flex",
              flexDirection: "column",
              marginHorizontal: 10,
              marginTop: 10,
            }}
          >
            <View style={{ marginTop: 5 }}>
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
              {/* {Array.isArray(value.details) ? (
                value.details.map((item, index) => (
                  <View key={index}>
                    <Text>{item?.name}, </Text>
                  </View>
                ))
              ) : (
                <TextInput
                  editable={false}
                  value={
                    value?.label == "Year of Graduation"
                      ? JSON.stringify(value?.details)
                      : value?.details
                  }
                  style={{
                    height: 40,
                    borderBottomWidth: 2,
                    borderColor: "#E8E8E8",
                    color: theme.secondaryTextColor,
                  }}
                  color={theme.primaryTextColor}
                  placeholderTextColor={theme.secondaryTextColor}
                />
              )} */}
              {Array.isArray(value.details) ? (
                <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
                  {value.details.map((item, index) => (
                    <View key={index}>
                      <Text>{item?.name}, </Text>
                    </View>
                  ))}
                </View>
              ) : (
                <TextInput
                  editable={false}
                  value={
                    value?.label === "Year of Graduation"
                      ? JSON.stringify(value?.details)
                      : value?.details
                  }
                  style={{
                    borderBottomWidth: 2,
                    borderColor: "#E8E8E8",
                    color: theme.secondaryTextColor,
                    // Allow TextInput to expand to next line if needed
                  }}
                  color={theme.primaryTextColor}
                  placeholderTextColor={theme.secondaryTextColor}
                  multiline={true}
                />
              )}
            </View>
          </View>
        ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({});
