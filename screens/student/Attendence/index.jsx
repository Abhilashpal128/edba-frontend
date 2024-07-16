import {
  useEffect,
  useRef,
  useLayoutEffect,
  useState,
  useCallback,
} from "react";
import {
  SafeAreaView,
  View,
  Text,
  Image,
  Dimensions,
  ScrollView,
  TouchableOpacity,
  RefreshControl,
  ActivityIndicator,
} from "react-native";
import { Svg, Circle, Text as SvgText } from "react-native-svg";
import { useTheme, Avatar } from "react-native-paper";
import { Calendar, LocaleConfig } from "react-native-calendars";
import { FontAwesome6 } from "react-native-vector-icons";
import { Ionicons, Feather } from "react-native-vector-icons";
import moment from "moment";
import { DrawerActions, useIsFocused } from "@react-navigation/native";
import { useThemeContext } from "../../../hooks/useTheme";
import { post } from "../../../utils/apis/StudentApis";
import { useSelector } from "react-redux";

export default function StudentAttendence({ navigation, native }) {
  const user = useSelector((state) => state?.login?.user);
  const studentId = user?.studentId;
  const { theme } = useThemeContext();
  const [classdetail, setClassDetail] = useState();
  const [attemdenceData, setAttendenceData] = useState();
  const [refreshing, setRefreshing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const isFocused = useIsFocused();

  const hexToRgba = (hex, opacity) => {
    hex = hex.replace("#", "");
    let r = parseInt(hex.substring(0, 2), 16);
    let g = parseInt(hex.substring(2, 4), 16);
    let b = parseInt(hex.substring(4, 6), 16);

    return `rgba(${r}, ${g}, ${b}, ${opacity})`;
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <TouchableOpacity
          onPress={() => navigation.openDrawer()}
          style={{ marginLeft: 20 }}
        >
          <Ionicons name="menu" size={25} color={theme.secondaryTextColor} />
        </TouchableOpacity>
      ),

      headerTitle: () => (
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Text
            numberOfLines={1}
            style={{
              fontSize: 16,
              marginLeft: 10,
              color: theme.primaryTextColor,
              fontWeight: "bold",
              fontFamily: "Poppins_600SemiBold",
            }}
          >
            Attendence
          </Text>
        </View>
      ),

      headerRight: () => (
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            width: "20%",
            justifyContent: "flex-end",
            marginRight: 20,
          }}
        >
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("Notification");
            }}
          >
            <Feather name="bell" size={20} color={theme.secondaryTextColor} />
          </TouchableOpacity>
        </View>
      ),
      headerStyle: {
        backgroundColor: theme.backgroundColor,
      },
      headerTitleAlign: "center", // Adjust alignment for header title (if needed)
      headerTintColor: "#000000", // Text color for back button and header title
    });
  }, [navigation, theme]);

  const { colors } = useTheme();
  const radius = 36.5;
  const strokeWidth = radius / 2;
  const circumference = 2 * Math.PI * radius;
  const Today = moment();
  const [month, setMonth] = useState(Today);

  const [markedDates, setMarkedDates] = useState();

  const fetchClassId = async () => {
    try {
      setIsLoading(true);
      const response = await post("classes/getClass", {
        studentId: studentId,
      });
      if (response?.errCode == -1) {
        console.log(`response?.data?.id`, response?.data[0]?.id);
        const monthTofetch = moment(month).format("YYYY-MM");
        fetchAttendenceLog(monthTofetch, response?.data[0]?.id);
        const startDateOfmonth = moment(month)
          .startOf("month")
          .format("YYYY-MM-DD");
        fetchDataInpercent(startDateOfmonth, response?.data[0]?.id);
        setClassDetail(response?.data);
        setIsLoading(false);
      } else {
        setClassDetail(null);
        setIsLoading(false);
      }
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    } finally {
      setRefreshing(false);
      setIsLoading(false);
    }
  };

  const circleProgressBar = (percentage) => {
    const strokeDashoffset = circumference - (circumference * percentage) / 100;
    console.log(`strokeDashoffset`, strokeDashoffset);
    return strokeDashoffset;
  };

  const processAttendanceData = (data) => {
    const processedData = {};

    for (const [date, details] of Object.entries(data)) {
      // Ensure the status is either "Present" or "Absent" before processing
      if (details.status === "Present" || details.status === "Absent") {
        processedData[date] = {
          dots: [
            {
              key: details.status,
              color: details.status === "Present" ? "#039303" : "#930303",
            },
          ],
        };
      }
    }

    return processedData;
  };

  const fetchDataInpercent = async (monthToFetch, classId) => {
    try {
      const response = await post("attendences/month", {
        classId: classId,
        startDate: monthToFetch,
        studentId: studentId,
      });
      if (response?.errCode == -1) {
        setAttendenceData(response?.data[0]);
      } else {
        setAttendenceData(null);
      }
    } catch (error) {
      console.log(`error from fetchDataInpercent`, error);
    }
    console.log("attendences/month", response);
  };

  const fetchAttendenceLog = async (monthToFetch, classId) => {
    const response = await post("attendences/monthly", {
      classId: classId,
      month: monthToFetch,
      studentId: studentId,
    });

    if (response?.errCode == -1) {
      const processedData = processAttendanceData(response?.data);
      setMarkedDates(processedData);
    } else {
      setMarkedDates({});
    }

    console.log(`response`, response);
  };

  useEffect(() => {
    // fetchAttendenceLog(month, classId);
    fetchClassId();
  }, [isFocused]);

  const handleDayPress = () => {
    return true;
  };

  const handleMonthChange = (date) => {
    const selectedMonth = moment(date.dateString).format("YYYY-MM");
    fetchAttendenceLog(selectedMonth, classdetail[0]?.id);
    const startDate = moment(date.dateString)
      .startOf("month")
      .format("YYYY-MM-DD");
    fetchDataInpercent(startDate, classdetail[0]?.id);
    setMonth(date);
  };
  const onRefresh = useCallback(() => {
    setRefreshing(true);
    fetchClassId();
  }, []);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: theme.backgroundColor }}>
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <View style={{ margin: 20, flex: 1 }}>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("AttendenceDisplay", {
                class: classdetail,
                studentId: studentId,
                startDate: month,
              });
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
                      strokeDashoffset={circleProgressBar(
                        attemdenceData != null ? attemdenceData?.percentage : 0
                      )}
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
                      {attemdenceData != null ? attemdenceData?.percentage : 0}
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
                    {attemdenceData != null ? attemdenceData?.totalPresent : 0}
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
                    {attemdenceData != null ? attemdenceData?.totalAbsent : 0}
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
                    {attemdenceData != null
                      ? parseInt(attemdenceData?.totalDays) -
                        (parseInt(attemdenceData?.totalPresent) +
                          parseInt(attemdenceData?.totalAbsent))
                      : 0}
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
                {isLoading == true ? (
                  <View style={{ marginTop: 40 }}>
                    <ActivityIndicator size={"large"} />
                  </View>
                ) : (
                  <Calendar
                    enableSwipeMonths={false}
                    markingType={"multi-dot"}
                    current={moment(month).format("YYYY-MM")}
                    markedDates={markedDates}
                    onDayPress={handleDayPress}
                    onMonthChange={handleMonthChange}
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
                )}
              </View>
            </ScrollView>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
