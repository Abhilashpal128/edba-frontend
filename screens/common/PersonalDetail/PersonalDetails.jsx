import {
  FlatList,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import React from "react";
// import { theme } from "../../../theming";
import { useThemeContext } from "../../../hooks/useTheme";

export default function PersonalDetails({ personalDetails }) {
  const { theme } = useThemeContext();
  console.log(`basic detail`, personalDetails);
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
        backgroundColor: theme.backgroundColor,
        marginVertical: 10,
        marginHorizontal: 10,
      }}
    >
      <View>
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
            borderBottomWidth: 2,
            borderColor: "#E8E8E8",
            color: theme.secondaryTextColor,
          }}
          color={theme.primaryTextColor}
          placeholderTextColor={theme.secondaryTextColor}
        />
      </View>
    </View>
  );

  return (
    // <View
    //   style={{
    //     backgroundColor: theme.backgroundColor,
    //     marginHorizontal: 10,
    //     marginVertical: 20,
    //   }}
    // >
    //   <FlatList data={data} renderItem={renderItem} />
    // </View>
    
    <ScrollView
      style={{
        backgroundColor: theme.backgroundColor,
        marginHorizontal: 10,
        marginVertical: 20,
      }}
    >
      
      {personalDetails?.details !== undefined &&
        Object.entries(personalDetails?.details).map(([key, value]) => (
          <View key={key}>
            {value?.label != "Address" && (
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
                        value?.label == "Age"
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
            )}
            {value?.label == "Address" &&
              Object.entries(value?.details).map(([key, data]) => (
                <View
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    marginHorizontal: 10,
                  }}
                  key={key}
                >
                  <View style={{ marginTop: 10 }}>
                    <Text
                      style={{
                        fontSize: 14,
                        fontWeight: "bold",
                        color: theme.primaryTextColor,
                      }}
                    >
                      {data?.label}
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
                    {Array.isArray(data.details) ? (
                      data.details.map((item, index) => (
                        <View key={index}>
                          <Text>{item?.name}, </Text>
                        </View>
                      ))
                    ) : (
                      <TextInput
                        editable={false}
                        value={
                          data?.label == "Age"
                            ? JSON.stringify(data?.details)
                            : data?.details
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
          </View>
        ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({});
