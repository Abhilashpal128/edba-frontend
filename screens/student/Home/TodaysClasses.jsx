import { SafeAreaView, ScrollView, StyleSheet, Text, View } from "react-native";
import React from "react";
import { useThemeContext } from "../../../hooks/useTheme";
import { Divider } from "react-native-paper";

export default function StudentsTodaysClasses({ todaysClassesData }) {
  function getRandomHexColor() {
    // Generate random color components with a minimum value to avoid too light colors
    const min = 0x33; // Minimum value to avoid very light colors
    const max = 0xff;

    // Helper function to generate a random integer between min and max
    function getRandomInt(min, max) {
      return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    // Generate random values for red, green, and blue components
    const red = getRandomInt(min, max);
    const green = getRandomInt(min, max);
    const blue = getRandomInt(min, max);

    // Convert to hexadecimal and ensure two digits for each component
    const redHex = red.toString(16).padStart(2, "0");
    const greenHex = green.toString(16).padStart(2, "0");
    const blueHex = blue.toString(16).padStart(2, "0");

    // Combine the components into a hex color string
    const hexColor = `#${redHex}${greenHex}${blueHex}`;

    return hexColor;
  }

  const { theme } = useThemeContext();
  return (
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
                        gap: 5,
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
                        {item?.subject}
                      </Text>

                      <Text
                        style={{
                          fontSize: 12,
                          flexWrap: "wrap",
                          color: theme.primaryTextColor,
                          fontFamily: "Poppins_500Medium",
                        }}
                      >
                        {item?.time}
                      </Text>
                    </View>
                    <Divider
                      style={{
                        width: 2,
                        height: 80,
                        backgroundColor: getRandomHexColor(),
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
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({});
