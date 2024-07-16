import {
  useEffect,
  useRef,
  useLayoutEffect,
  useState,
  useMemo,
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
  StyleSheet,
  FlatList,
  RefreshControl,
  ActivityIndicator,
} from "react-native";
import { Svg, Circle, Text as SvgText } from "react-native-svg";
import { useTheme, Divider, Avatar } from "react-native-paper";
import { Calendar, LocaleConfig } from "react-native-calendars";
import { FontAwesome6 } from "react-native-vector-icons";
import { Feather } from "react-native-vector-icons";
import { Ionicons } from "react-native-vector-icons";
import { Entypo } from "react-native-vector-icons";
import { AntDesign } from "react-native-vector-icons";
import { useDispatch, useSelector } from "react-redux";
// import { post, get } from "@/utils/apis";
import moment from "moment";
import { DrawerActions, useIsFocused } from "@react-navigation/native";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import Timetable from "react-native-calendar-timetable";
import { useThemeContext } from "../../../hooks/useTheme";
import { post } from "../../../utils/apis/StudentApis";

const daysOfWeek = ["SUN", "MON", "TUE", "WED", "THURS", "FRI", "SAT"];

function getDaysInMonth(month, year) {
  return new Date(year, month, 0).getDate();
}

function getDayName(year, month, day) {
  const date = new Date(year, month - 1, day);
  return daysOfWeek[date.getDay()];
}

function generateDateArrayForMonthAndYear(year, month) {
  const daysInMonth = getDaysInMonth(month, year);
  const datesWithDayNames = [];

  for (let day = 1; day <= daysInMonth; day++) {
    const dayName = getDayName(year, month, day);
    datesWithDayNames.push({
      date: day.toString().padStart(2, "0"),
      day: dayName,
    });
  }

  return datesWithDayNames;
}

const LecturesListData = [
  {
    StartTime: "09:00 AM",
    EndTime: "09:30 AM",
    subjectName: "English",
    TeacherDetails: {
      TeacherName: "Celia Dsouza",
      profile:
        "https://buffer.com/library/content/images/size/w1200/2023/10/free-images.jpg",
    },
  },
  {
    StartTime: "09:45 AM",
    EndTime: "10:15 AM",
    subjectName: "Hindi",
    TeacherDetails: {
      TeacherName: "Celia Dsouza",
      profile:
        "https://buffer.com/library/content/images/size/w1200/2023/10/free-images.jpg",
    },
  },
  {
    StartTime: "10:30 AM",
    EndTime: "11:00 AM",
    subjectName: "Marathi",
    TeacherDetails: {
      TeacherName: "Celia Dsouza",
      profile:
        "https://buffer.com/library/content/images/size/w1200/2023/10/free-images.jpg",
    },
  },
  {
    StartTime: "11:00 AM",
    EndTime: "12:00 AM",
    subjectName: "Geography",
    TeacherDetails: {
      TeacherName: "Celia Dsouza",
      profile:
        "https://buffer.com/library/content/images/size/w1200/2023/10/free-images.jpg",
    },
  },
  {
    StartTime: "12:00 AM",
    EndTime: "12:30 AM",
    break: true,
  },
  {
    StartTime: "12:45 AM",
    EndTime: "01:15 AM",
    subjectName: "History",
    TeacherDetails: {
      TeacherName: "Celia Dsouza",
      profile:
        "https://buffer.com/library/content/images/size/w1200/2023/10/free-images.jpg",
    },
  },
  {
    StartTime: "01:45 AM",
    EndTime: "02:15 AM",
    subjectName: "Science",
    TeacherDetails: {
      TeacherName: "Celia Dsouza",
      profile:
        "https://buffer.com/library/content/images/size/w1200/2023/10/free-images.jpg",
    },
  },
];

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

export default function StudentTimeTable({ navigation, route }) {
  // const user = useSelector((state) => state.user.userDetails);
  // const account = useSelector((state) => state.account.account);
  const { theme } = useThemeContext();
  const [dateDayList, setDateDayList] = useState([]);
  const [date, setDate] = useState(
    new Date().getDate().toString().padStart(2, "0")
  );
  const [classData, setClassData] = useState();
  const [day, setDay] = useState();
  const [month, setMonth] = useState(moment().format("MM"));
  const [year, setYear] = useState(moment().format("YYYY"));
  const [lectureList, setLectureList] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const isFocused = useIsFocused();
  const userdata = useSelector((state) => state?.login?.user);
  const studentId = userdata?.studentId;

  console.log(`datedatedate`, date);
  console.log(`Class-52024-e2a093f5-7ad4-433b-b8f2-cf04d279ba2c`, month);
  console.log(`year`, year);

  const fetchClassData = async () => {
    try {
      setIsLoading(true);
      const response = await post("classes/getClass", {
        studentId: studentId,
      });
      if (response?.errCode == -1) {
        console.log(`response?.data?.id`, response?.data[0]?.id);
        setClassData(response?.data[0]);
        const classId = response?.data[0]?.id;
        fetchLectures(classId);
        setIsLoading(false);
        console.log(`classId`, classId);
      } else {
        console.log(`error while fetching class Data`);
        setIsLoading(false);
      }
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    } finally {
      setIsLoading(false);
      setRefreshing(false);
    }
  };

  const fetchLectures = async (classId) => {
    try {
      const response = await post("timetable/student", {
        classId: classId,
        date: `${year}-${month}-${date}`,
      });
      console.log(`response`, response);
      if (response?.errCode == -1) {
        setLectureList(response?.data);
      } else {
        setLectureList([]);
      }
    } catch (error) {
      console.log(`error from fetchLectures in timetable`, error);
    }
  };

  useEffect(() => {
    // setLectureList(LecturesListData);
    fetchClassData();
  }, [isFocused]);

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
            TimeTable
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

  useEffect(() => {
    getDateDayList(parseInt(year), parseInt(month));
    // getTodaysLectures(year + "-" + month + "-" + date);
    setTimeout(function (u) {
      scrollToStart(new Date().getDate() - 2);
    }, 100);
  }, [isFocused]);

  const getDateDayList = (year, month) => {
    const dateArray = generateDateArrayForMonthAndYear(year, month);
    setDateDayList(dateArray);
  };

  const getTodaysLectureOnDayChange = async (date) => {
    try {
      setIsLoading(true);
      const response = await post("timetable/student", {
        classId: classData?.id,
        date: date,
      });
      console.log(`response`, response);
      if (response?.errCode == -1) {
        setLectureList(response?.data);
        setIsLoading(false);
      } else {
        setLectureList([]);
        setIsLoading(false);
      }
    } catch (error) {
      console.log(`error from fetchLectures in timetable`, error);
      setIsLoading(false);
    }
  };

  const scrollToStart = (date) => {
    if (scrollViewRef.current) {
      scrollViewRef.current.scrollTo({
        x: date * 60,
        y: 0,
        animated: true,
      });
    }
  };

  const scrollViewRef = useRef();

  const scrollRef = useRef();

  const { colors } = useTheme();

  const [schedule, setSchedule] = useState([]);

  const hexToRgba = (hex, opacity) => {
    hex = hex.replace("#", "");
    let r = parseInt(hex.substring(0, 2), 16);
    let g = parseInt(hex.substring(2, 4), 16);
    let b = parseInt(hex.substring(4, 6), 16);

    return `rgba(${r}, ${g}, ${b}, ${opacity})`;
  };

  // const getTodaysLectures = (date) => {
  //   // const data = {
  //   //   batch: account.id,
  //   //   division: account.id,
  //   //   institute_id: user.employee.id,
  //   //   day: daysOfWeek[new Date(date).getDay()],
  //   //   startDate: moment(new Date(date))
  //   //     .startOf("day")
  //   //     .format("YYYY-MM-DDTHH:mm:ss.SSSZ"),
  //   //   endDate: moment(new Date(date))
  //   //     .endOf("day")
  //   //     .format("YYYY-MM-DDTHH:mm:ss.SSSZ"),
  //   // };
  //   // setRange({
  //   //   from: moment(new Date(date)).startOf("day").format("YYYY-MM-DD"),
  //   //   to: moment(new Date(date)).endOf("day").format("YYYY-MM-DD"),
  //   // });
  //   const tempArray = [];
  //   // post("/user/lectures", data)
  //   //   .then((response) => {
  //   //     if (response.data.errCode == -1) {
  //   //       const dataset = response.data.data;
  //   //       for (var i = 0; i < dataset.length; i++) {
  //   //         const start =
  //   //           moment(new Date(date)).format("YYYY-MM-DD") +
  //   //           " " +
  //   //           moment(dataset[i]["startTime"], "HHmm").format("HH:mm");
  //   //         const end =
  //   //           moment(new Date(date)).format("YYYY-MM-DD") +
  //   //           " " +
  //   //           moment(dataset[i]["endTime"], "HHmm").format("HH:mm");
  //   //         const temp = {
  //   //           index: i + 1,
  //   //           subject: dataset[i]["subject"]["name"],
  //   //           class: dataset[i]["class"]["alias"],
  //   //           color: dataset[i]["subject"]["color"] || getRandomHexColor(),
  //   //           room: dataset[i]["division"],
  //   //           startDate: moment(start).toDate(),
  //   //           endDate: moment(end).toDate(),
  //   //         };
  //   //         tempArray.push(temp);
  //   //       }
  //   //       setSchedule(tempArray);
  //   //     } else {
  //   //       setSchedule([]);
  //   //     }
  //   //   })
  //   //   .catch((err) => {
  //   //     console.log(err);
  //   //   });
  // };

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    // fetchStudentGrades();
    fetchClassData();
  }, []);

  const renderItem = ({ item }) => (
    <View
      style={{
        backgroundColor: item?.break ? "#F8E4F9" : theme.backgroundColor,
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        borderRadius: 5,
      }}
    >
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          height: 65,
          gap: 5,
          paddingHorizontal: 10,
        }}
      >
        <View style={{ display: "flex", justifyContent: "center", gap: 5 }}>
          <Text
            style={{
              color: theme.primaryTextColor,
              fontFamily: "Poppins_500Medium",
              fontSize: 14,
            }}
          >
            {item?.startTime}
          </Text>
          <Text
            style={{
              color: theme.secondaryTextColor,
              fontFamily: "Poppins_500Medium",
              fontSize: 14,
            }}
          >
            {item?.endTime}
          </Text>
        </View>
        <Divider
          style={{
            backgroundColor: item?.subject?.color,
            width: 2,
            height: "90%",
          }}
        />
        <View style={{ paddingTop: 5 }}>
          {item?.break ? (
            <Text
              style={{
                fontSize: 14,
                fontFamily: "Poppins_600SemiBold",
                color: theme.primaryTextColor,
                textAlignVertical: "center",
              }}
            >
              Break
            </Text>
          ) : (
            <Text
              style={{
                fontSize: 14,
                fontFamily: "Poppins_600SemiBold",
                color: theme.primaryTextColor,
              }}
            >
              {item?.subject?.name}
            </Text>
          )}
        </View>
      </View>
      {item?.break ? (
        ""
      ) : (
        <View>
          <View>
            {item?.TeacherDetails?.profile ? (
              <Image
                source={{ uri: item?.TeacherDetails?.profile }}
                onError={(e) =>
                  console.error("Image Load Error:", e.nativeEvent.error)
                }
                style={{ width: 24, height: 24, borderRadius: 12 }}
              />
            ) : (
              // <Avatar>
              //   <AvatarText>{item?.TeacherDetails?.TeacherName}</AvatarText>
              // </Avatar>
              <View>
                <Avatar.Text
                  size={24}
                  label={item?.teacher?.name?.slice(0, 1)}
                  theme={{ colors: { primary: "#007EB0" } }}
                />
              </View>
            )}
          </View>
          <Text
            style={{
              color: theme.secondaryTextColor,
              fontSize: 12,
              fontFamily: "Poppins_500Medium",
            }}
          >
            {item?.teacher?.name}
          </Text>
        </View>
      )}
    </View>
  );

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: theme.backgroundColor }}>
      <View style={{ flex: 1, marginHorizontal: 10 }}>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            paddingLeft: 20,
            paddingRight: 20,
            paddingTop: 10,
          }}
        >
          <TouchableOpacity
            onPress={() => {
              const newDate = moment(year + "-" + month).subtract(1, "month");
              setMonth(newDate.format("MM"));
              setYear(newDate.format("YYYY"));
              const dateArray = generateDateArrayForMonthAndYear(
                newDate.format("YYYY"),
                newDate.format("MM")
              );
              setDateDayList(dateArray);
              if (newDate.format("YYYY-MM") == moment().format("YYYY-MM")) {
                setDate(newDate.format("DD"));
                scrollToStart(parseInt(newDate.format("DD")) - 2);
                // getTodaysLectures(newDate);
                getTodaysLectureOnDayChange(newDate);
              } else {
                setDate("01");
                scrollToStart(parseInt("01") - 2);
                getTodaysLectureOnDayChange(newDate.format("YYYY-MM-01"));
              }
            }}
          >
            <FontAwesome6
              name="angle-left"
              size={18}
              color={theme.secondaryTextColor}
            />
          </TouchableOpacity>
          <Text
            style={{
              color: theme.primaryTextColor,
              fontSize: 14,
              fontFamily: "Poppins_500Medium",
              textAlign: "center",
            }}
          >
            {moment(year + "-" + month).format("MMMM'YY")}
          </Text>
          <TouchableOpacity
            onPress={() => {
              const newDate = moment(year + "-" + month).add(1, "month");
              setMonth(newDate.format("MM"));
              setYear(newDate.format("YYYY"));
              const dateArray = generateDateArrayForMonthAndYear(
                newDate.format("YYYY"),
                newDate.format("MM")
              );
              setDateDayList(dateArray);
              if (newDate.format("YYYY-MM") == moment().format("YYYY-MM")) {
                setDate(newDate.format("DD"));
                scrollToStart(parseInt(newDate.format("DD")) - 2);
                // getTodaysLectures(newDate);
                getTodaysLectureOnDayChange(newDate);
              } else {
                setDate("01");
                scrollToStart(parseInt("01") - 2);
                // getTodaysLectures(newDate.format("YYYY-MM-01"));
                getTodaysLectureOnDayChange(newDate.format("YYYY-MM-01"));
              }
            }}
          >
            <FontAwesome6
              name="angle-right"
              size={18}
              color={theme.secondaryTextColor}
            />
          </TouchableOpacity>
        </View>
        <View style={{ padding: 20, flex: 1 }}>
          <View>
            <ScrollView
              ref={scrollViewRef}
              horizontal={true}
              showsHorizontalScrollIndicator={false}
            >
              <View style={{ flexDirection: "row" }}>
                {dateDayList.map((item, index) => {
                  return (
                    <TouchableOpacity
                      onPress={() => {
                        setDate(item.date);
                        scrollToStart(parseInt(item.date) - 2);
                        // getTodaysLectures(year + "-" + month + "-" + item.date);
                        getTodaysLectureOnDayChange(
                          year + "-" + month + "-" + item.date
                        );
                      }}
                      style={{
                        marginRight: 4,
                        borderRadius: 8,
                        width: 60,
                      }}
                      key={index}
                    >
                      <Text
                        style={{
                          fontFamily: "Poppins_500Medium",
                          fontSize: 14,
                          marginTop: 0,
                          color:
                            date == item.date
                              ? "#2B78CA"
                              : theme.secondaryTextColor,
                          textAlign: "center",
                        }}
                      >
                        {item.day}
                      </Text>
                      <View
                        style={{
                          marginTop: 8,
                          paddingRight: 4,
                          paddingLeft: 4,
                          paddingTop: 4,
                          paddingBottom: 4,
                          backgroundColor:
                            date == item.date ? "#2B78CA" : "transparent",
                          borderRadius: 4,
                          color: date == item.date ? "#fff" : colors.text,
                          textAlign: "center",
                        }}
                      >
                        <Text
                          style={{
                            fontFamily: "Poppins_500Medium",
                            fontSize: 16,
                            color:
                              date == item.date
                                ? "#fff"
                                : theme.secondaryTextColor,
                            textAlign: "center",
                          }}
                        >
                          {item.date}
                        </Text>
                      </View>
                    </TouchableOpacity>
                  );
                })}
              </View>
            </ScrollView>
          </View>
          <View />

          <View>
            {isLoading == true ? (
              <View style={{ marginTop: 40 }}>
                <ActivityIndicator size={"large"} />
              </View>
            ) : (
              <FlatList
                data={lectureList}
                renderItem={renderItem}
                keyExtractor={(item, index) => {
                  index;
                }}
                ItemSeparatorComponent={() => (
                  <View style={{ height: 10 }}></View>
                )}
                style={{ marginVertical: 30 }}
                showsVerticalScrollIndicator={false}
                ListEmptyComponent={() => (
                  <View
                    style={{
                      justifyContent: "center",
                      alignItems: "center",
                      padding: 20,
                    }}
                  >
                    <Text>No lectures available</Text>
                  </View>
                )}
                refreshControl={
                  <RefreshControl
                    refreshing={refreshing}
                    onRefresh={onRefresh}
                  />
                }
              />
            )}
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}
