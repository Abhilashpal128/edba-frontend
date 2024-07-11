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

export default function Pending({ navigation, route }) {
  const { colors } = useTheme();
  const { theme } = useThemeContext();

  const [feeDetails, setFeeDetails] = useState([
    {
      label: "School  Fee for Grade 2 (2nd Installment)",
      value: "5000",
      formatted_value: "₹ 5,000",
      due_date: "24th June 2024",
      status: "Pending",
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
            <View style={{ width: "80%" }}>
              <Text
                style={{
                  fontFamily: "Poppins_600SemiBold",
                  color: theme.primaryTextColor,
                  fontWeight: "500",
                  fontSize: 14,
                  width: "100%",
                }}
              >
                {item.label}
              </Text>
            </View>
            <View style={{ width: "20%" }}>
              <Text
                style={{
                  color: "#2B78CA",
                  fontSize: 14,
                  fontWeight: "bold",
                  textAlign: "right",
                  fontFamily: "Poppins_600SemiBold",
                }}
              >
                {item.formatted_value}
              </Text>
            </View>
          </View>
          <Text
            style={{
              color: theme.secondaryTextColor,
              fontSize: 12,
              marginTop: 4,
              fontFamily: "Poppins_600SemiBold",
            }}
          >
            Due Date: {item.due_date}
          </Text>
          <View style={{ marginTop: 10 }}>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <TouchableOpacity
                onPress={() => console.log("Pay Now")}
                style={{ width: "49%" }}
              >
                <View
                  style={{
                    backgroundColor: hexToRgba("#2B78CA", 0.15),
                    height: 50,
                    alignItems: "center",
                    justifyContent: "center",
                    borderRadius: 8,
                    height: 40,
                  }}
                >
                  <Text
                    style={{
                      fontFamily: "Poppins_600SemiBold",
                      color: "#2B78CA",
                      fontSize: 12,
                    }}
                  >
                    Pay Now
                  </Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() =>
                  displayIndex != null
                    ? setDisplayIndex(null)
                    : setDisplayIndex(index)
                }
                style={{ width: "49%" }}
              >
                <View
                  style={{
                    backgroundColor: hexToRgba("#2B78CA", 0.15),
                    height: 50,
                    alignItems: "center",
                    justifyContent: "center",
                    borderRadius: 8,
                    height: 40,
                  }}
                >
                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <Text
                      style={{
                        color: "#2B78CA",
                        fontFamily: "Poppins_600SemiBold",
                        fontSize: 12,
                        marginRight: 10,
                      }}
                    >
                      View Details
                    </Text>
                    <Entypo
                      name={
                        index == displayIndex ? "chevron-down" : "chevron-right"
                      }
                      size={16}
                      color="#2B78CA"
                    />
                  </View>
                </View>
              </TouchableOpacity>
            </View>
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
                      fontSize: 14,
                      fontWeight: "500",
                      fontFamily: "Poppins_600SemiBold",
                    }}
                  >
                    {item.label}
                  </Text>
                  <Text
                    style={{
                      color: theme.secondaryTextColor,
                      fontSize: 12,
                      marginTop: 4,
                      fontFamily: "Poppins_600SemiBold",
                    }}
                  >
                    Due date : {item.due_date}
                  </Text>
                  <Text
                    style={{
                      color: theme.primaryTextColor,
                      fontFamily: "Poppins_600SemiBold",
                      fontSize: 14,
                      marginTop: 8,
                      marginBottom: 4,
                      fontWeight: "600",
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
                              fontSize: 12,
                              fontFamily: "Poppins_600SemiBold",
                            }}
                          >
                            {fee.label}
                          </Text>
                        </View>
                        <View style={{ width: "30%" }}>
                          <Text
                            style={{
                              color: theme.primaryTextColor,
                              fontSize: 14,
                              textAlign: "right",
                              fontWeight: "500",
                              fontFamily: "Poppins_600SemiBold",
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
                  <View style={{ marginTop: 10 }}>
                    <View
                      style={{
                        flexDirection: "row",
                        alignItems: "center",
                        justifyContent: "space-between",
                      }}
                    >
                      <TouchableOpacity
                        onPress={() => console.log("Pay Now")}
                        style={{ width: "49%" }}
                      >
                        <View
                          style={{
                            backgroundColor: hexToRgba("#2B78CA", 0.15),
                            height: 50,
                            alignItems: "center",
                            justifyContent: "center",
                            borderRadius: 8,
                            height: 40,
                          }}
                        >
                          <Text
                            style={{
                              color: "#2B78CA",
                              fontFamily: "Poppins_600SemiBold",
                              fontSize: 12,
                            }}
                          >
                            Pay Now
                          </Text>
                        </View>
                      </TouchableOpacity>
                      <TouchableOpacity
                        onPress={() => setDisplayIndex(null)}
                        style={{ width: "49%" }}
                      >
                        <View
                          style={{
                            backgroundColor: hexToRgba("#2B78CA", 0.15),
                            height: 50,
                            alignItems: "center",
                            justifyContent: "center",
                            borderRadius: 8,
                            height: 40,
                          }}
                        >
                          <View
                            style={{
                              flexDirection: "row",
                              alignItems: "center",
                              justifyContent: "center",
                            }}
                          >
                            <Text
                              style={{
                                color: "#2B78CA",
                                fontFamily: "Poppins_600SemiBold",
                                fontSize: 12,
                                marginRight: 10,
                              }}
                            >
                              View Details
                            </Text>
                            <Entypo
                              name={
                                index == displayIndex
                                  ? "chevron-up"
                                  : "chevron-right"
                              }
                              size={18}
                              color="#2B78CA"
                            />
                          </View>
                        </View>
                      </TouchableOpacity>
                    </View>
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
    <SafeAreaView style={{ flex: 1 }}>
      <View
        style={{ padding: 20, flex: 1, backgroundColor: theme.backgroundColor }}
      >
        <FlatList
          data={feeDetails}
          renderItem={renderItem}
          keyExtractor={(item, index) => index}
        />
      </View>
    </SafeAreaView>
  );
}
