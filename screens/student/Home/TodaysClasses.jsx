import { SafeAreaView, ScrollView, StyleSheet, Text, View } from "react-native";
import React from "react";
import { useThemeContext } from "../../../hooks/useTheme";
import { Divider } from "react-native-paper";
import { TodaysClassesShimmer } from "./HomeShimmerEffect";

export default function StudentsTodaysClasses({
  todaysClassesData,
  classesLoading,
}) {
  const { theme } = useThemeContext();
  return (
    <SafeAreaView style={{ marginVertical: 10 }}>
      <ScrollView>
        {classesLoading == true ? (
          <View style={{ marginHorizontal: 20 }}>
            <TodaysClassesShimmer />
          </View>
        ) : (
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
                  fontFamily: "Poppins_700Bold",
                  color: theme.primaryTextColor,
                }}
              >
                Today's Classes
              </Text>
            </View>
            <View>
              {todaysClassesData.length > 0 ? (
                <View
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "center",
                    gap: 10,
                    flexWrap: "wrap",
                  }}
                >
                  {todaysClassesData.map((item, index) => (
                    <>
                      <View
                        key={index}
                        style={{
                          Height: 80,
                          display: "flex",
                          flexDirection: "column",
                          justifyContent: "center",

                          padding: 10,
                          width: "27%",
                        }}
                      >
                        <Text
                          style={[
                            {
                              fontSize: 12,
                              flexWrap: "wrap",
                              color: theme.primaryTextColor,
                              fontFamily: "Poppins_600SemiBold",
                            },
                          ]}
                        >
                          {item?.subject?.name}
                        </Text>

                        <Text
                          style={{
                            fontSize: 12,
                            flexWrap: "wrap",
                            color: theme.primaryTextColor,
                            fontFamily: "Poppins_500Medium",
                          }}
                        >
                          {item?.startTime}
                        </Text>
                        <Text
                          style={{
                            fontSize: 12,
                            flexWrap: "wrap",
                            color: theme.primaryTextColor,
                            fontFamily: "Poppins_500Medium",
                          }}
                        >
                          {item?.endTime}
                        </Text>
                      </View>
                      <Divider
                        style={{
                          width: 2,
                          height: 80,
                          backgroundColor: item?.subject?.color,
                        }}
                      />
                    </>
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
                      fontSize: 20,
                      fontFamily: "Poppins_700Bold_Italic",
                      color: theme.secondaryTextColor,
                    }}
                  >
                    No Lecture Found
                  </Text>
                </View>
              )}
            </View>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({});
