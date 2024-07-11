import { useEffect, useRef, useLayoutEffect, useState } from "react";
import {
  SafeAreaView,
  View,
  Text,
  Image,
  Dimensions,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { Svg, Circle, Text as SvgText } from "react-native-svg";
import { useTheme, Avatar } from "react-native-paper";
import { Calendar, LocaleConfig } from "react-native-calendars";
import { FontAwesome6 } from "react-native-vector-icons";
import { Ionicons, Feather } from "react-native-vector-icons";
import moment from "moment";
import { DrawerActions } from "@react-navigation/native";
import { useThemeContext } from "../../../hooks/useTheme";

export default function StudentAttendence({ navigation, native }) {
  // const user = useSelector((state) => state.user.userDetails);
  const { theme } = useThemeContext();

  const hexToRgba = (hex, opacity) => {
    hex = hex.replace("#", "");
    let r = parseInt(hex.substring(0, 2), 16);
    let g = parseInt(hex.substring(2, 4), 16);
    let b = parseInt(hex.substring(4, 6), 16);

    return `rgba(${r}, ${g}, ${b}, ${opacity})`;
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      header: () => {
        return (
          <View
            style={{
              paddingLeft: 20,
              paddingRight: 20,
              paddingBottom: 10,
              backgroundColor: theme.backgroundColor,
            }}
          >
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                marginTop: 40,
              }}
            >
              <TouchableOpacity
                onPress={() => navigation.openDrawer()}
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  width: "20%",
                }}
              >
                <Ionicons
                  name="menu"
                  size={25}
                  color={theme.secondaryTextColor}
                />
              </TouchableOpacity>
              <Text
                numberOfLines={1}
                style={{
                  fontSize: 16,
                  width: "60%",
                  textAlign: "center",
                  color: theme.primaryTextColor,
                  fontWeight: "bold",
                }}
              >
                Attendence
              </Text>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  width: "20%",
                  justifyContent: "flex-end",
                }}
              >
                <TouchableOpacity
                  onPress={() => {
                    navigation.navigate("Notification");
                  }}
                >
                  <Feather
                    name="bell"
                    size={20}
                    color={theme.secondaryTextColor}
                  />
                </TouchableOpacity>
              </View>
            </View>
          </View>
        );
      },
    });
  }, [navigation,theme]);

  const { colors } = useTheme();
  const radius = 36.5;
  const strokeWidth = radius / 2;
  const circumference = 2 * Math.PI * radius;

  const [month, setMonth] = useState(moment().format("YYYY-MM"));

  const [markedDates, setMarkedDates] = useState({
    "2024-05-01": { dots: [{ key: "holiday", color: "#930303" }] },
    "2024-05-02": { dots: [{ key: "holiday", color: "#930303" }] },
    "2024-05-03": { dots: [{ key: "holiday", color: "#930303" }] },
    "2024-05-04": { dots: [{ key: "holiday", color: "#930303" }] },
    "2024-05-05": { dots: [{ key: "holiday", color: "#930303" }] },
    "2024-05-06": { dots: [{ key: "holiday", color: "#930303" }] },
    "2024-05-07": { dots: [{ key: "holiday", color: "#930303" }] },
  });

  const circleProgressBar = (percentage) => {
    const strokeDashoffset = circumference - (circumference * percentage) / 100;
    console.log(`strokeDashoffset`, strokeDashoffset);
    return strokeDashoffset;
  };

  const handleDayPress = () => {
    return true;
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: theme.backgroundColor }}>
      <View style={{ margin: 20, flex: 1 }}>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("AttendenceDisplay");
          }}
          style={{ backgroundColor: "#2B78CA", height: 90, borderRadius: 8 }}
        >
          <View
            style={{
              height: 90,
              flex: 1,
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                width: "100%",
              }}
            >
              <View style={{ padding: 20 }}>
                <Text
                  numberOfLines={1}
                  style={{
                    fontFamily: "Poppins_600SemiBold",
                    fontSize: 16,
                    color: "#fff",
                  }}
                >
                  Overall Attendance
                </Text>
              </View>

              <View style={{ width: 100 }}>
                <Svg height="90" width="90">
                  <Circle
                    cx="45"
                    cy="45"
                    r="40"
                    stroke="black"
                    strokeWidth="0"
                    fill="#fff"
                  />
                  <Circle
                    cx="45"
                    cy="45"
                    r="36.5"
                    stroke="#2B78CA"
                    strokeWidth={3}
                    strokeDasharray={`${circumference} ${circumference}`}
                    strokeDashoffset={circleProgressBar(50)}
                    fill="#fff"
                  />
                  <Circle
                    cx="45"
                    cy="45"
                    r="33"
                    stroke="black"
                    strokeWidth="0"
                    fill="#2B78CA"
                  />
                  <SvgText
                    x="45"
                    y="50"
                    textAnchor="middle"
                    dominantBaseline="middle"
                    fontSize="14"
                    fontWeight="bold"
                    fill="#fff"
                    fontFamily="Poppins_500Medium"
                  >
                    50 %
                  </SvgText>
                </Svg>
              </View>
            </View>
          </View>
        </TouchableOpacity>
        <View style={{ marginTop: 20, flex: 1 }}>
          <ScrollView showsVerticalScrollIndicator={false}>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <View
                style={{
                  width: "32.5%",
                  height: 60,
                  backgroundColor: theme.backgroundColor,
                  borderRadius: 8,
                  borderLeftWidth: 3,
                  borderColor: "#30A81D",
                  justifyContent: "space-between",
                  padding: 8,
                }}
              >
                <Text
                  numberOfLines={1}
                  style={{
                    fontFamily: "Poppins_600SemiBold",
                    fontSize: 14,
                    color: colors.text,
                  }}
                >
                  Present
                </Text>
                <Text
                  numberOfLines={1}
                  style={{
                    fontFamily: "Poppins_600SemiBold",
                    fontSize: 16,
                    color: colors.text,
                  }}
                >
                  10
                </Text>
              </View>
              <View
                style={{
                  width: "32.5%",
                  height: 60,
                  backgroundColor: theme.backgroundColor,
                  borderLeftWidth: 3,
                  borderColor: "#930303",
                  borderRadius: 8,
                  justifyContent: "space-between",
                  padding: 8,
                }}
              >
                <Text
                  numberOfLines={1}
                  style={{
                    fontFamily: "Poppins_600SemiBold",
                    fontSize: 14,
                    color: colors.text,
                  }}
                >
                  Absent
                </Text>
                <Text
                  numberOfLines={1}
                  style={{
                    fontFamily: "Poppins_600SemiBold",
                    fontSize: 16,
                    color: colors.text,
                  }}
                >
                  2
                </Text>
              </View>
              <View
                style={{
                  width: "32.5%",
                  height: 60,
                  backgroundColor: theme.backgroundColor,
                  borderLeftWidth: 3,
                  borderColor: "#D500DA",
                  borderRadius: 8,
                  justifyContent: "space-between",
                  padding: 8,
                }}
              >
                <Text
                  numberOfLines={1}
                  style={{
                    fontFamily: "Poppins_600SemiBold",
                    fontSize: 14,
                    color: colors.text,
                  }}
                >
                  Holiday
                </Text>
                <Text
                  numberOfLines={1}
                  style={{
                    fontFamily: "Poppins_600SemiBold",
                    fontSize: 16,
                    color: colors.text,
                  }}
                >
                  1
                </Text>
              </View>
            </View>
            <View
              style={{
                backgroundColor: "#FFFFFF",
                borderRadius: 8,
                marginTop: 20,
                padding: 10,
              }}
            >
              <Calendar
                enableSwipeMonths={false}
                markingType={"multi-dot"}
                current={month}
                markedDates={markedDates}
                onDayPress={handleDayPress}
                theme={{
                  calendarBackground: "#FFFFFF",
                  backgroundColor: "#FFFFFF",
                  textSectionTitleColor: "#000",
                  textDisabledColor: "#636c72",
                  dayTextColor: "#000",
                  arrowColor: "#000",
                  monthTextColor: "#000",
                  borderColor: "#FFFFFF",
                }}
              />
            </View>
          </ScrollView>
        </View>
      </View>
    </SafeAreaView>
  );
}
