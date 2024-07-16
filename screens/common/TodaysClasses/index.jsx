import { SafeAreaView, ScrollView, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import TodaysClassesShimmer from "./TodaysClassesShimmer";
import { useThemeContext } from "../../../hooks/useTheme";
// import { theme } from "../../../theming";

export default function TodaysClasses({ TodaysClassesData }) {
  const { theme } = useThemeContext();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  }, []);

  return isLoading == true ? (
    <TodaysClassesShimmer />
  ) : (
    <SafeAreaView style={{ marginVertical: 10 }}>
      <ScrollView>
        <View
          style={{
            width: "100%",
            display: "flex",
            flexDirection: "column",
            gap: 20,
            paddingHorizontal: 10,
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
              Today's Classes
            </Text>
          </View>
          <View>
            {TodaysClassesData.length > 0 ? (
              <View
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "center",
                  gap: 10,
                  flexWrap: "wrap",
                }}
              >
                {TodaysClassesData.map((item, index) => (
                  <View
                    key={index}
                    style={{
                      Height: 80,
                      backgroundColor: "#F8F3FC",
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "center",
                      gap: 5,
                      padding: 10,
                      borderRadius: 5,
                      width: "45%",
                    }}
                  >
                    <Text
                      style={[
                        {
                          fontSize: 12,
                          flexWrap: "wrap",
                          color: theme.primaryTextColor,
                        },
                        { fontWeight: "bold" },
                      ]}
                    >
                      {item?.startTime}
                    </Text>
                    <Text
                      style={{
                        fontSize: 12,
                        flexWrap: "wrap",
                        color: theme.primaryTextColor,
                      }}
                    >
                      Class: {item?.class?.name}
                    </Text>
                    <Text
                      style={{
                        fontSize: 12,
                        flexWrap: "wrap",
                        color: theme.primaryTextColor,
                      }}
                    >
                      Subject: {item?.subject?.name}
                    </Text>
                    <Text
                      style={{
                        fontSize: 12,
                        flexWrap: "wrap",
                        color: theme.primaryTextColor,
                      }}
                    >
                      Room No: {item?.room}
                    </Text>
                  </View>
                ))}
              </View>
            ) : (
              <View
                style={{
                  height: 80,
                  width: "100%",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Text
                  style={{
                    fontStyle: "italic",
                    fontSize: 20,
                    fontWeight: "600",
                    color: theme.secondaryTextColor,
                  }}
                >
                  No Lecture Today
                </Text>
              </View>
            )}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({});
