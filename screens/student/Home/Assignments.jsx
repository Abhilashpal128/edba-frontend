import {
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import { useThemeContext } from "../../../hooks/useTheme";

export default function Assignments({ assignments }) {
  const { theme } = useThemeContext();

  const subjectImages = {
    English: require("../../../assets/English.png"),
    Hindi: require("../../../assets/Hindi.png"),
    Marathi: require("../../../assets/Marathi.png"),
    Geography: require("../../../assets/Geography.png"),
    Science: require("../../../assets/Science.png"),
    Math: require("../../../assets/Maths.png"),
    History: require("../../../assets/History.png"),
  };
  return (
    <SafeAreaView
      style={{
        backgroundColor: theme.backgroundColor,
      }}
    >
      <View style={{ marginHorizontal: 20 }}>
        <View>
          <Text
            style={{
              fontSize: 14,
              color: theme.primaryTextColor,
              fontFamily: "Poppins_700Bold",
            }}
          >
            Assignments
          </Text>
        </View>
        <View>
          {assignments.length > 0 ? (
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                flexWrap: "wrap",
                alignItems: "center",
                marginTop: 20,
              }}
            >
              {assignments.map((item, index) => (
                <TouchableOpacity
                  key={index}
                  style={{
                    width: "25%",
                    height: 80,
                    display: "flex",

                    flexWrap: "wrap",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Image
                    source={subjectImages[item?.subject]}
                    resizeMode="contain"
                    style={{ height: 24, width: 24 }}
                  />
                  <Text
                    style={{
                      fontSize: 14,
                      fontFamily: "Poppins_600SemiBold",
                      color: theme.primaryTextColor,
                    }}
                  >
                    {item.subject}
                  </Text>
                </TouchableOpacity>
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
                No Assignments found
              </Text>
            </View>
          )}
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({});
