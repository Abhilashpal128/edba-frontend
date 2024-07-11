import React, { useCallback, useEffect, useRef, useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Animated,
  BackHandler,
} from "react-native";
import { useLayoutEffect } from "react";
import { Ionicons, Entypo, AntDesign } from "react-native-vector-icons";
import Icon from "react-native-vector-icons/Ionicons";
import moment from "moment";
import ClassExchange from "./ClassExchange";
import { MonthTeacherTimeTable } from "../../../DummyArrays/DummyArray";
import RNPickerSelect from "react-native-picker-select";
import TimeTableshimmer from "./TimeTableshimmer";
import { get, post } from "../../../utils/apis/TeacherApis/login";
import { useThemeContext } from "../../../hooks/useTheme";
import { useFocusEffect } from "@react-navigation/native";
import { useSelector } from "react-redux";

const timetableDataArray = [
  {
    day: "Monday",
    date: "10 june 2024",
    classes: [
      { time: "09:00 AM", class: " 12A", room: "411" },
      { time: "10:45 AM", class: " 11B", room: "320" },
      { time: "12:32 PM", class: " 11D", room: "315" },
      { time: "02:00 PM", class: "Break" },
      { time: "02:45 PM", class: " 11C", room: "314" },
      { time: "04:00 PM", class: " 11A", room: "312" },
      { time: "04:00 PM", class: " 11A", room: "312" },
    ],
  },
  {
    day: "Tuesday",
    date: "11 june 2024",
    classes: [
      { time: "09:00 AM", class: " 12A", room: "411" },
      { time: "10:45 AM", class: " 11B", room: "320" },
      { time: "12:32 PM", class: " 11D", room: "315" },
      { time: "02:00 PM", class: "Break" },
      { time: "02:45 PM", class: " 11C", room: "314" },
      { time: "04:00 PM", class: " 11A", room: "312" },
      { time: "04:00 PM", class: " 11A", room: "312" },
    ],
  },
  {
    day: "Wedenesday",
    date: "12 june 2024",
    classes: [
      { time: "09:00 AM", class: " shishukala-12A", room: " 411" },
      { time: "10:45 AM", class: " 11B", room: " 320" },
      { time: "12:32 PM", class: " 11D", room: " 315" },
      { time: "02:00 PM", class: "Break" },
      { time: "02:45 PM", class: " 11C", room: " 314" },
      { time: "04:00 PM", class: " 11A", room: " 312" },
      { time: "04:00 PM", class: " 11A", room: " 312" },
    ],
  },
];

const getWeekDates = (startOfWeek) => {
  let dates = [];
  for (let i = 0; i < 7; i++) {
    dates.push(moment(startOfWeek).add(i, "days").format("D MMM"));
  }
  return dates;
};

export default function TeacherTimeTable({ navigation, route }) {
  const { theme } = useThemeContext();
  const user = useSelector((state) => state?.login?.user);
  const TeacherId = user?.teacherId;

  const Months = Array.from({ length: 12 }, (_, i) => ({
    label: moment().month(i).format("MMMM"),
    value: i,
  }));
  const currentMonth = moment().format("MMMM");
  const Today = moment().format("YYYY-MM-DD");
  console.log(`Todayyy`, Today);

  const [activeWeek, setActiveWeek] = useState("ThisWeek");
  const [TimeTableData, setTimeTableData] = useState([]);
  const [classDetailTab, setClassDetailTab] = useState(false);
  const [selectedClassDetail, setSelectedClassDetail] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [selectedClassDate, setSelectedClassDate] = useState("10 june 2024");
  const [selectedClassDay, setselectedClassDay] = useState("Monday");
  const [selectedMonth, setSelectedMonth] = useState(moment().month());
  const [currentMonthNumber, setCurrentMonthNumber] = useState(
    moment().month() + 1
  );

  const currentYear = moment().year();
  // const currentMonthNumber = moment().month() + 1;

  useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <TouchableOpacity onPress={() => navigation.openDrawer()}>
          <Icon
            name="menu"
            size={25}
            color={theme.secondaryTextColor}
            style={{ marginLeft: 10 }}
          />
        </TouchableOpacity>
      ),

      headerTitle: () => (
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <Text
            style={{
              color: theme.primaryTextColor,
              fontSize: 18,
              fontWeight: "bold",
              textAlign: "center",
            }}
          >
            {classDetailTab ? "Class details" : "TimeTable"}
          </Text>
        </View>
      ),

      headerRight: () => (
        <View style={{ marginRight: 10 }}>
          {classDetailTab ? (
            <TouchableOpacity onPress={() => setClassDetailTab(false)}>
              <Entypo name="cross" size={24} color={theme.secondaryTextColor} />
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              onPress={() => {
                navigation.navigate("Notification");
              }}
            >
              <Ionicons
                name="notifications"
                size={20}
                color={theme.secondaryTextColor}
              />
            </TouchableOpacity>
          )}
        </View>
      ),
      headerStyle: {
        backgroundColor: theme.backgroundColor,
      },
      headerTitleAlign: "center",
      headerTintColor: theme.backgroundColor,
    });
  }, [navigation, classDetailTab, theme]);

  const handleClassExchange = (classData, date, day) => {
    console.log(`classDatatat`, classData);
    console.log(`handleClassExchange date`, date);
    setClassDetailTab(true);
    setSelectedClassDetail(classData);
    setSelectedClassDate(date);
    setselectedClassDay(day);
  };

  // useEffect(() => {
  //   fetchTimetable();
  // }, []);

  useFocusEffect(
    useCallback(() => {
      const onBackPress = () => {
        setClassDetailTab(false);
        if (classDetailTab == true) {
          setClassDetailTab(false);
          console.log(`back button pressed`);
          return true;
        }
        console.log(`back button not pressed`);
        return false;
      };

      const subscription = navigation.addListener("beforeRemove", (e) => {
        if (onBackPress()) {
          e.preventDefault();
          console.log(`back button pressed from subscription`);
        }
      });
      const backhandler = BackHandler.addEventListener(
        "hardwareBackPress",
        onBackPress
      );
      return () => {
        subscription();
        backhandler.remove();
      };
    }, [classDetailTab])
  );

  const formatDate = (isoDate) => {
    return moment(isoDate).format("DD MMMM YYYY");
  };

  const fetchTimetable = async (Todaysdate) => {
    const response = await post("timetable/search", {
      teacherId: TeacherId,
      date: Todaysdate,
    });

    console.log("Requested date:", Todaysdate);
    console.log("Response data:", response.data);

    if (response.errCode == -1) {
      const groupedByDate = response.data.reduce((acc, entry) => {
        const { date } = entry;

        // If date doesn't exist in acc yet, create it
        if (!acc[date]) {
          acc[date] = {
            day: moment(date).format("dddd"),
            date: date,
            classes: [],
          };
        }

        // Add class details to the classes array
        acc[date].classes.push({
          id: entry.id,
          time: moment(entry.startTime, "hh:mm").format("hh:mm A"), // Format time if needed
          class: entry.class,
          room: entry.room,
          subject: entry.subject,
          division: entry.division,
          teacher: entry.teacher,
          details: entry.details,
          startTime: entry.startTime,
          endTime: entry.endTime,
        });

        return acc;
      }, {});

      // Convert groupedByDate object into an array of values
      const transformedData = Object.values(groupedByDate);

      console.log("Transformed Data:", transformedData);
      setTimeTableData(transformedData);
    } else {
      setTimeTableData([]);
    }
  };

  const fetchTimetableOfMonth = async (monthNumber) => {
    // const response = await get(
    //   `timetables/filter/?month=${monthNumber}&year=${currentYear}`
    // );

    console.log(`Montly timetabke called`);
    const response = await post("timetable/monthly", {
      teacherId: TeacherId,
      month: "7",
      year: "2024",
    });
    console.log(`ThisMontResponse`, response?.data);
    if (response?.errCode == -1) {
      response.data.forEach((entry) => {
        console.log("Processing entry date:", entry.date);
      });
      const groupedByDate = response.data.reduce((acc, entry) => {
        const { date } = entry;
        console.log("Current entry:", entry);

        // If date doesn't exist in acc yet, create it
        if (!acc[date]) {
          acc[date] = {
            day: moment(date).format("dddd"),
            date: date,
            classes: [],
          };
        }

        // Add class details to the classes array
        acc[date].classes.push({
          id: entry.id,
          time: moment(entry.startTime, "hh:mm").format("hh:mm A"), // Format time if needed
          class: entry.class,
          room: entry.room,
          subject: entry.subject,
          division: entry.division,
          teacher: entry.teacher,
          details: entry.details,
          startTime: entry.startTime,
          endTime: entry.endTime,
        });

        console.log("Updated acc:", acc);

        return acc;
      }, {});

      // Convert groupedByDate object into an array of values
      const transformedData = Object.values(groupedByDate);

      console.log("Transformed Data:", transformedData);

      setTimeTableData(transformedData);
      setIsLoading(false);
    } else {
      setTimeTableData([]);
      setIsLoading(false);
    }
    // }
  };

  const [selectedWeek, setSelectedWeek] = useState("ThisWeek");
  const startOfWeek = moment().startOf("isoWeek");
  const weekDates = getWeekDates(startOfWeek);

  console.log(`weekDatesweekDates`, weekDates);

  const scrollToStart = (date) => {
    if (scrollViewRef.current) {
      scrollViewRef.current.scrollTo({
        x: date * 60,
        y: 0,
        animated: true,
      });
    }
  };

  // const timeSlots = timetableDataArray[0].classes.map(
  //   (classInfo) => classInfo.time
  // );

  const fetchDataWeekWise = async (startDate) => {
    try {
      const response = await post("timetable/weekly", {
        startDate: startDate,
        teacherId: TeacherId,
      });
      console.log(`response response response`, response);
      if (response?.errCode == -1) {
        const groupedByDate = response?.data.reduce((acc, entry) => {
          const { date } = entry;
          // const formattedDate = formatDate(date);

          // If date doesn't exist in acc yet, create it
          if (!acc[date]) {
            acc[date] = {
              day: moment(date).format("dddd"),
              date: date,
              classes: [],
            };
          }

          // Add class details to the classes array
          acc[date]?.classes.push({
            id: entry?.id,
            time: moment(entry.startTime, "hh:mm").format("hh:mm A"), // Format time if needed
            class: entry.class,
            room: entry.room,
            subject: entry.subject,
            division: entry.division,
            teacher: entry.teacher,
            details: entry.details,
            startTime: entry.startTime,
            endTime: entry.endTime,
          });

          return acc;
        }, {});

        // Convert groupedByDate object into an array of values
        const transformedData = Object.values(groupedByDate);

        console.log(`transformedData`, transformedData);
        setTimeTableData(transformedData);
        setIsLoading(false);
      } else {
        setTimeTableData([]);
        setIsLoading(false);
      }
    } catch (error) {
      setIsLoading(false);
      console.log(error);
    }
  };

  const handleWeekTabPress = (TabName) => {
    setActiveWeek(TabName);
    if (TabName === "Today") {
      // const Today = moment().format("D MMM YYYY");
      // const TodaysDay = moment().format("dddd");
      console.log(`Today`, Today);
      // const TodaysLectureData = [
      //   {
      //     day: TodaysDay,
      //     date: Today,
      //     classes: [
      //       { time: "09:00 AM", class: " Shishukala A", room: "411" },
      //       { time: "10:45 AM", class: " Shishukala-B", room: "320" },
      //       { time: "12:32 PM", class: " ShishukalaD", room: "315" },
      //       { time: "02:00 PM", class: "Break" },
      //       { time: "02:45 PM", class: " ShishukalaC", room: "314" },
      //       { time: "04:00 PM", class: " FyJc Science A", room: "312" },
      //       { time: "04:00 PM", class: " Syjc Science B", room: "312" },
      //     ],
      //   },
      // ];

      fetchTimetable(Today);
      // setTimeTableData(TodaysLectureData);
    } else if (TabName == "ThisWeek") {
      fetchDataWeekWise(moment(Today));
    } else if (TabName == "NextWeek") {
      const nextWeekDate = moment(Today).add(7, "days");

      const startDate = nextWeekDate.format("YYYY-MM-DD");
      fetchDataWeekWise(startDate);
      // setTimeTableData(timetableDataArray);
    } else if (TabName == "ThisMonth") {
      // setTimeTableData(MonthTeacherTimeTable);
      fetchTimetableOfMonth(currentMonthNumber);
    }
  };
  const slideAnim = useRef(new Animated.Value(1000)).current;
  useEffect(() => {
    Animated.timing(slideAnim, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
    }).start();
  }, [slideAnim]);

  useEffect(() => {
    fetchDataWeekWise(moment(Today));
  }, []);

  const dayWithMaxClasses = TimeTableData.reduce((maxDay, currentDay) => {
    return currentDay.classes.length > maxDay.classes.length
      ? currentDay
      : maxDay;
  }, TimeTableData[0]);

  return (
    <Animated.View
      style={[
        {
          bottom: 0,
          width: "100%",
          height: "100%",
          backgroundColor: "#f2f2f2",
          justifyContent: "center",
          alignItems: "center",
        },
        { transform: [{ translateY: slideAnim }] },
      ]}
    >
      <SafeAreaView
        style={{
          backgroundColor: theme.backgroundColor,
          width: "100%",
          height: "100%",
        }}
      >
        {isLoading == true ? (
          <View>
            <TimeTableshimmer />
          </View>
        ) : (
          <SafeAreaView
            style={{
              backgroundColor: theme.backgroundColor,
              width: "100%",
              height: "100%",
            }}
          >
            {classDetailTab ? (
              <View>
                <ClassExchange
                  classDetail={selectedClassDetail}
                  classDate={selectedClassDate}
                  classDay={selectedClassDay}
                  setClassDetailTab={setClassDetailTab}
                />
              </View>
            ) : (
              <ScrollView
                style={{ marginHorizontal: 10 }}
                showsVerticalScrollIndicator={false}
              >
                <View
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginVertical: 10,
                  }}
                >
                  <View>
                    <Text
                      style={{
                        fontSize: 16,
                        fontWeight: "bold",
                        color: theme.primaryTextColor,
                      }}
                    >
                      My class Schedules
                    </Text>
                  </View>
                  <View style={{ width: "40%" }}>
                    <RNPickerSelect
                      onValueChange={(value) => {
                        setSelectedMonth(value);
                        console.log(`typppe`, typeof value);
                      }}
                      items={Months}
                      placeholder={{ label: "Select Month", value: "" }}
                      style={{
                        inputIOS: [
                          {
                            borderWidth: 1,
                            borderColor: "#ccc",
                            paddingHorizontal: 10,
                            borderRadius: 5,
                            marginBottom: 10,
                            color: theme.primaryTextColor,
                          },
                        ],
                        inputAndroid: [
                          {
                            borderWidth: 1,
                            borderColor: "#ccc",
                            paddingHorizontal: 10,
                            borderRadius: 5,
                            marginBottom: 10,
                            color: theme.primaryTextColor,
                          },
                        ],
                        iconContainer: {
                          top: 10,
                          right: 14,
                        },
                      }}
                      Icon={() => (
                        <AntDesign
                          name="caretdown"
                          size={12}
                          color={`${theme.secondaryTextColor}80`}
                        />
                      )}
                      value={selectedMonth}
                      useNativeAndroidPickerStyle={false}
                    />
                  </View>
                </View>
                <ScrollView horizontal={true}>
                  <View
                    style={{
                      height: 58,
                      display: "flex",
                      flexDirection: "row",
                      gap: 10,
                      marginHorizontal: 10,
                    }}
                  >
                    <TouchableOpacity
                      onPress={() => handleWeekTabPress("Today")}
                      style={[
                        {
                          width: 96,
                          height: 34,
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                          borderWidth: 1,
                          borderRadius: 20,
                        },
                        {
                          backgroundColor: `${
                            activeWeek == "Today"
                              ? theme.primarycolor
                              : theme.backgroundColor
                          }`,

                          borderColor: `${
                            activeWeek == "Today"
                              ? theme.primarycolor
                              : theme.secondaryTextColor
                          }`,
                        },
                      ]}
                    >
                      <Text
                        style={[
                          {
                            borderRadius: 20,
                            fontSize: 12,
                          },
                          {
                            color: `${
                              activeWeek == "Today"
                                ? "#FFFFFF"
                                : theme.secondaryTextColor
                            }`,
                          },
                        ]}
                      >
                        Today
                      </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={() => {
                        handleWeekTabPress("ThisWeek");
                      }}
                      style={[
                        {
                          width: 96,
                          height: 34,
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                          borderWidth: 1,
                          borderRadius: 20,
                        },
                        {
                          backgroundColor: `${
                            activeWeek == "ThisWeek"
                              ? theme.primarycolor
                              : theme.backgroundColor
                          }`,
                          borderColor: `${
                            activeWeek == "ThisWeek"
                              ? theme.primarycolor
                              : theme.secondaryTextColor
                          }`,
                        },
                      ]}
                    >
                      <Text
                        style={[
                          {
                            borderRadius: 20,
                            fontSize: 12,
                          },
                          {
                            color: `${
                              activeWeek == "ThisWeek"
                                ? "#FFFFFF"
                                : theme.secondaryTextColor
                            }`,
                          },
                        ]}
                      >
                        This Week
                      </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={() => handleWeekTabPress("NextWeek")}
                      style={[
                        {
                          width: 96,
                          height: 34,
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                          borderWidth: 1,
                          borderRadius: 20,
                        },
                        {
                          backgroundColor: `${
                            activeWeek == "NextWeek"
                              ? theme.primarycolor
                              : theme.backgroundColor
                          }`,

                          borderColor: `${
                            activeWeek == "NextWeek"
                              ? theme.primarycolor
                              : theme.secondaryTextColor
                          }`,
                        },
                      ]}
                    >
                      <Text
                        style={[
                          {
                            borderRadius: 20,
                            fontSize: 12,
                          },
                          {
                            color: `${
                              activeWeek == "NextWeek"
                                ? "#FFFFFF"
                                : theme.secondaryTextColor
                            }`,
                          },
                        ]}
                      >
                        Next Week
                      </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={[
                        {
                          width: 96,
                          height: 34,
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                          borderWidth: 1,
                          borderRadius: 20,
                        },
                        {
                          backgroundColor: `${
                            activeWeek == "ThisMonth"
                              ? theme.primarycolor
                              : theme.backgroundColor
                          }`,

                          borderColor: `${
                            activeWeek == "ThisMonth"
                              ? theme.primarycolor
                              : theme.secondaryTextColor
                          }`,
                        },
                      ]}
                      onPress={() => {
                        handleWeekTabPress("ThisMonth");
                      }}
                    >
                      <Text
                        style={[
                          {
                            borderRadius: 20,
                            fontSize: 12,
                          },
                          {
                            color: `${
                              activeWeek == "ThisMonth"
                                ? "#FFFFFF"
                                : theme.secondaryTextColor
                            }`,
                          },
                        ]}
                      >
                        This Month
                      </Text>
                    </TouchableOpacity>
                  </View>
                </ScrollView>
                <ScrollView>
                  <View
                    style={{
                      display: "flex",
                      flexDirection: "row",
                    }}
                  >
                    <View
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        paddingHorizontal: 10,
                        backgroundColor: `${theme.primarycolor}0D`,
                      }}
                    >
                      <View
                        style={{
                          height: 60,
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                      >
                        <Text
                          style={{
                            fontWeight: "500",
                            fontSize: 16,
                            color: theme.primaryTextColor,
                          }}
                        >
                          Time
                        </Text>
                      </View>

                      {dayWithMaxClasses?.classes?.map((classInfo, index) => (
                        <View
                          key={index}
                          style={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            gap: 10,
                          }}
                        >
                          <View
                            style={{
                              height: 80,
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              marginTop: 10,
                            }}
                          >
                            <Text style={{ color: theme.primaryTextColor }}>
                              {classInfo?.startTime}
                            </Text>
                            <Text>To</Text>
                            <Text style={{ color: theme.primaryTextColor }}>
                              {classInfo?.endTime}
                            </Text>
                          </View>
                        </View>
                      ))}
                    </View>
                    <ScrollView>
                      <ScrollView horizontal={true}>
                        <View
                          style={{
                            display: "flex",
                            flexDirection: "row",
                            gap: 2,
                          }}
                        >
                          {TimeTableData.length > 0 ? (
                            TimeTableData.map((data, index) => (
                              <View key={index}>
                                <View>
                                  <View
                                    style={{
                                      height: 60,
                                      display: "flex",
                                      justifyContent: "center",
                                      alignItems: "center",
                                    }}
                                  >
                                    <Text
                                      style={{ color: theme.primaryTextColor }}
                                    >
                                      {JSON.stringify(data?.day).slice(1, 4)}
                                    </Text>
                                    <Text
                                      style={{ color: theme.primaryTextColor }}
                                    >
                                      {moment(data?.date).format("DD")}
                                    </Text>
                                  </View>

                                  {data?.classes && (
                                    <View
                                      style={{
                                        display: "flex",
                                        flexDirection: "column",
                                        gap: 10,
                                      }}
                                    >
                                      {data?.classes.map((classData, index) => (
                                        <TouchableOpacity
                                          key={index}
                                          style={{
                                            marginLeft: 10,
                                            height: 80,
                                            backgroundColor: theme.BoxColor,
                                            display: "flex",
                                            flexDirection: "column",
                                            justifyContent: "center",
                                            alignItems: "center",
                                            padding: 10,
                                            borderRadius: 5,
                                            width:
                                              activeWeek == "Today"
                                                ? 300
                                                : "auto",
                                          }}
                                          onPress={() => {
                                            handleClassExchange(
                                              classData,
                                              data?.date,
                                              data?.day
                                            );
                                          }}
                                        >
                                          <View
                                            style={{
                                              display: "flex",
                                              flexDirection: "row",
                                              flexWrap: "wrap",
                                            }}
                                          >
                                            <Text
                                              style={{
                                                color:
                                                  activeWeek == "Today"
                                                    ? theme.primaryTextColor
                                                    : theme.secondaryTextColor,
                                                fontSize:
                                                  activeWeek == "Today"
                                                    ? 16
                                                    : 12,
                                              }}
                                            >
                                              Class:
                                            </Text>
                                            <Text
                                              style={{
                                                color:
                                                  activeWeek == "Today"
                                                    ? theme.secondaryTextColor
                                                    : theme.primaryTextColor,
                                                fontSize:
                                                  activeWeek == "Today"
                                                    ? 16
                                                    : 12,
                                                fontWeight: "400",
                                              }}
                                            >
                                              {JSON.stringify(
                                                classData?.class?.name
                                              )}
                                            </Text>
                                          </View>
                                          <View
                                            style={{
                                              display: "flex",
                                              flexDirection: "row",
                                            }}
                                          >
                                            <Text
                                              style={{
                                                color:
                                                  activeWeek == "Today"
                                                    ? theme.primaryTextColor
                                                    : theme.secondaryTextColor,
                                                fontSize:
                                                  activeWeek == "Today"
                                                    ? 16
                                                    : 12,
                                              }}
                                            >
                                              Room No:
                                            </Text>
                                            <Text
                                              style={{
                                                color:
                                                  activeWeek == "Today"
                                                    ? theme.secondaryTextColor
                                                    : theme.primaryTextColor,
                                                fontSize:
                                                  activeWeek == "Today"
                                                    ? 16
                                                    : 12,
                                                fontWeight: "400",
                                              }}
                                            >
                                              {classData?.room}
                                            </Text>
                                          </View>
                                        </TouchableOpacity>
                                      ))}
                                    </View>
                                  )}

                                  {/* <ScrollView>
                {data.classes.map((item) => (
                  <View></View>
                ))}
              </ScrollView> */}
                                </View>
                              </View>
                            ))
                          ) : (
                            <View>
                              <Text style={{ color: theme.primaryTextColor }}>
                                {" "}
                                No Lectures
                              </Text>
                            </View>
                          )}
                        </View>
                      </ScrollView>
                    </ScrollView>
                  </View>
                </ScrollView>
              </ScrollView>
            )}
          </SafeAreaView>
        )}
      </SafeAreaView>
    </Animated.View>
  );
}

const styles = StyleSheet.create({});
