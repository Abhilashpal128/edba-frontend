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
import SvgRenderer from "../Assignments/SvgRenderer";
import { useNavigation } from "@react-navigation/native";
import { SubjectAssignmentShimmer } from "./HomeShimmerEffect";

export default function Assignments({
  subjectList,
  setAssignmentLoading,
  assignmentLoading,
}) {
  const { theme } = useThemeContext();

  const navigation = useNavigation();
  const subjectImages = {
    English: require("../../../assets/English.png"),
    Hindi: require("../../../assets/Hindi.png"),
    Marathi: require("../../../assets/Marathi.png"),
    Geography: require("../../../assets/Geography.png"),
    Science: require("../../../assets/Science.png"),
    Math: require("../../../assets/Maths.png"),
    History: require("../../../assets/History.png"),
  };

  const hexToRgba = (hex, opacity) => {
    hex = hex.replace("#", "");
    let r = parseInt(hex.substring(0, 2), 16);
    let g = parseInt(hex.substring(2, 4), 16);
    let b = parseInt(hex.substring(4, 6), 16);

    // Blend with white color to lighten
    let blendWithWhite = (colorValue, blendAmount) => {
      return Math.round(colorValue + (255 - colorValue) * blendAmount);
    };

    // Adjust blend amount as needed (0 is original color, 1 is fully white)
    let blendAmount = 0.7;

    r = blendWithWhite(r, blendAmount);
    g = blendWithWhite(g, blendAmount);
    b = blendWithWhite(b, blendAmount);

    return `rgba(${r}, ${g}, ${b}, ${opacity})`;
  };
  return (
    <SafeAreaView
      style={{
        backgroundColor: theme.backgroundColor,
      }}
    >
      {assignmentLoading == true ? (
        <View style={{ marginHorizontal: 20 }}>
          <SubjectAssignmentShimmer />
        </View>
      ) : (
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
            {subjectList.length > 0 ? (
              <View
                style={{
                  display: "flex",
                  flexDirection: "row",
                  flexWrap: "wrap",
                  alignItems: "center",
                  marginTop: 20,
                  gap: 10,
                }}
              >
                {subjectList.map((item, index) => (
                  <TouchableOpacity
                    key={index}
                    style={{
                      width: "30%",
                      height: 80,
                      display: "flex",
                      backgroundColor: hexToRgba(`${item?.colorCode}`, 0.15),
                      flexWrap: "wrap",
                      justifyContent: "center",
                      alignItems: "center",
                      borderRadius: 5,
                    }}
                    onPress={() => {
                      navigation.navigate("Assignments", {
                        item,
                      });
                    }}
                  >
                    {item?.svg != null && (
                      <SvgRenderer svgContent={`${item?.svg}`} />
                    )}
                    <Text
                      style={{
                        fontSize: 14,
                        fontFamily: "Poppins_600SemiBold",
                        color: theme.primaryTextColor,
                      }}
                    >
                      {item?.subjectName}
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
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({});
