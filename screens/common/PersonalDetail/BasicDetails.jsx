import {
  FlatList,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import React from "react";
import { useThemeContext } from "../../../hooks/useTheme";
import moment from "moment";
// import { theme } from "../../../theming";

export default function BasicDetails({ basicDetail }) {
  const { theme } = useThemeContext();
  console.log(`BasicDetails`, basicDetail?.details);
  const data = [
    { label: "Date Of Joining", value: "01/05/24" },
    { label: "Full name", value: "Maithili Fernandez" },
    { label: "Work Email id", value: "abhilashpal128@gmail.com" },
    { label: "department", value: "Science" },
    { label: "Designation", value: "Teacher" },
    { label: "Timing", value: "09:00 to 05:00" },
    { label: "ClassList", value: "01/05/24" },
  ];

  const renderItem = ({ item }) => (
    <View
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
          {item?.label}
        </Text>
      </View>
      <View>
        <TextInput
          editable={false}
          value={item?.value}
          style={{
            height: 40,
            borderBottomWidth: 1,
            borderColor: "#E8E8E8EE",
            color: theme.secondaryTextColor,
          }}
          color={theme.primaryTextColor}
          placeholderTextColor={theme.secondaryTextColor}
        />
      </View>
    </View>
  );

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
      {basicDetail?.details !== undefined &&
        Object.entries(basicDetail?.details).map(([key, value]) => (
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
                    value?.label == "Date of Joining"
                      ? moment(value?.details).format("Do MMMM YYYY")
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
