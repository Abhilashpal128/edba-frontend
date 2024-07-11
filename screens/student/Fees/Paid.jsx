import { useEffect, useRef, useLayoutEffect, useState, useMemo } from "react";
import {
  SafeAreaView,
  View,
  Text,
  Image,
  Dimensions,
  ScrollView,
  TouchableOpacity,
  FlatList,
} from "react-native";
import { Svg, Circle, Text as SvgText } from "react-native-svg";
import { useTheme, Avatar } from "react-native-paper";
import { Calendar, LocaleConfig } from "react-native-calendars";
import { FontAwesome6 } from "react-native-vector-icons";
import { Feather } from "react-native-vector-icons";
import { Ionicons } from "react-native-vector-icons";
import { Entypo } from "react-native-vector-icons";
import moment from "moment";
import { useThemeContext } from "../../../hooks/useTheme";

export default function Paid({ navigation, route }) {
  const { colors } = useTheme();
  const { theme } = useThemeContext();

  const [feeDetails, setFeeDetails] = useState([
    {
      label: "School  Fee for Grade 2 (1st Installment)",
      value: "5000",
      formatted_value: "₹ 5,000",
      due_date: "24th June 2024",
      payment_date: "5th May 2024",
      status: "Paid",
      details: [
        {
          label: "Cast Fee",
          value: "1000",
          formatted_value: "₹ 1,000",
        },
        {
          label: "Tution Fee",
          value: "500",
          formatted_value: "₹ 500",
        },
        {
          label: "Skill - Oriented Fee",
          value: "500",
          formatted_value: "₹ 500",
        },
        {
          label: "Administration Fee",
          value: "1000",
          formatted_value: "₹ 1,000",
        },
        {
          label: "Other Fee",
          value: "1000",
          formatted_value: "₹ 1,000",
        },
        {
          label: "E-Campus Fee",
          value: "1000",
          formatted_value: "₹ 1,000",
        },
      ],
    },
  ]);

  const hexToRgba = (hex, opacity) => {
    hex = hex.replace("#", "");
    let r = parseInt(hex.substring(0, 2), 16);
    let g = parseInt(hex.substring(2, 4), 16);
    let b = parseInt(hex.substring(4, 6), 16);

    return `rgba(${r}, ${g}, ${b}, ${opacity})`;
  };

  const [displayIndex, setDisplayIndex] = useState(0);

  const renderItem = ({ item, index }) => {
    return (
      <View style={{ marginBottom: 10 }}>
        <View
          style={{
            padding: 10,
            borderRadius: 8,
            borderColor: "#B7B7B7",
            borderWidth: 1,
          }}
        >
          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <View style={{ width: "70%" }}>
              <Text
                style={{
                  color: theme.primaryTextColor,
                  fontFamily: "Poppins_600SemiBold",
                  fontSize: 14,
                  width: "100%",
                }}
              >
                {item.label}
              </Text>
            </View>
            <View style={{ width: "30%" }}>
              <Text
                style={{
                  color: theme.secondaryTextColor,
                  fontFamily: "Poppins_600SemiBold",
                  fontSize: 12,
                  textAlign: "right",
                }}
              >
                {item.payment_date}
              </Text>
            </View>
          </View>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Text
                style={{
                  color: theme.secondaryTextColor,
                  fontFamily: "Poppins_600SemiBold",
                  fontSize: 14,
                  marginTop: 4,
                }}
              >
                {item.formatted_value}
              </Text>
              <View style={{ marginLeft: 10 }}>
                <View
                  style={{
                    backgroundColor: hexToRgba("#30A81D", 0.15),
                    height: 24,
                    width: 60,
                    borderRadius: 8,
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Text
                    style={{
                      color: "#30A81D",
                      fontFamily: "Poppins_600SemiBold",
                      fontSize: 12,
                    }}
                  >
                    Paid
                  </Text>
                </View>
              </View>
            </View>
            <TouchableOpacity
              onPress={() => {
                if (index == displayIndex) {
                  setDisplayIndex(null);
                } else {
                  setDisplayIndex(index);
                }
              }}
            >
              <Entypo
                name={index == displayIndex ? "chevron-down" : "chevron-right"}
                size={18}
                color={theme.secondaryTextColor}
              />
            </TouchableOpacity>
          </View>
        </View>
        {(() => {
          if (index == displayIndex) {
            return (
              <View style={{ marginTop: 20 }}>
                <View
                  style={{
                    padding: 10,
                    borderRadius: 8,
                    borderColor: "#B7B7B7",
                    borderWidth: 1,
                  }}
                >
                  <Text
                    style={{
                      color: theme.primaryTextColor,
                      fontFamily: "Poppins_600SemiBold",
                      fontSize: 14,
                    }}
                  >
                    {item.label}
                  </Text>
                  <Text
                    style={{
                      color: theme.secondaryTextColor,
                      fontFamily: "Poppins_600SemiBold",
                      fontSize: 12,
                      marginTop: 4,
                    }}
                  >
                    Due date : {item.due_date}
                  </Text>
                  <Text
                    style={{
                      color: theme.secondaryTextColor,
                      fontFamily: "Poppins_600SemiBold",
                      fontSize: 12,
                      marginTop: 4,
                    }}
                  >
                    Payment date : {item.payment_date}
                  </Text>
                  <Text
                    style={{
                      color: theme.primaryTextColor,
                      fontFamily: "Poppins_600SemiBold",
                      fontSize: 14,
                      marginTop: 8,
                      marginBottom: 4,
                    }}
                  >
                    Fee Type :
                  </Text>
                  {item.details.map((fee, loop) => {
                    return (
                      <View
                        key={loop}
                        style={{
                          flexDirection: "row",
                          alignItems: "center",
                          justifyContent: "space-between",
                          marginTop: 4,
                          marginBottom: 4,
                        }}
                      >
                        <View style={{ width: "70%" }}>
                          <Text
                            style={{
                              color: theme.secondaryTextColor,
                              fontFamily: "Poppins_600SemiBold",
                              fontSize: 12,
                            }}
                          >
                            {fee.label}
                          </Text>
                        </View>
                        <View style={{ width: "30%" }}>
                          <Text
                            style={{
                              color: theme.primaryTextColor,
                              fontFamily: "Poppins_600SemiBold",
                              fontSize: 12,
                              textAlign: "right",
                            }}
                          >
                            {fee.formatted_value}
                          </Text>
                        </View>
                      </View>
                    );
                  })}
                  <View
                    style={{
                      marginTop: 10,
                      flexDirection: "row",
                      alignItems: "center",
                      justifyContent: "space-between",
                    }}
                  >
                    <Text
                      style={{
                        color: "#FF9000",
                        fontFamily: "Poppins_600SemiBold",
                        fontSize: 14,
                        marginTop: 8,
                        marginBottom: 4,
                      }}
                    >
                      Total Fee :
                    </Text>
                    <Text
                      style={{
                        color: "#FF9000",
                        fontFamily: "Poppins_600SemiBold",
                        fontSize: 14,
                        marginTop: 8,
                        marginBottom: 4,
                      }}
                    >
                      {item.formatted_value}
                    </Text>
                  </View>
                </View>
              </View>
            );
          }
        })()}
      </View>
    );
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: theme.backgroundColor }}>
      <View style={{ padding: 20, flex: 1 }}>
        <FlatList
          data={feeDetails}
          renderItem={renderItem}
          keyExtractor={(item, index) => index}
        />
      </View>
    </SafeAreaView>
  );
}
