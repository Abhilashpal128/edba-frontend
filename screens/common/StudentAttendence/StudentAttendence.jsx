import { useState, useEffect } from "react";
import { LineChart } from "react-native-gifted-charts";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Dimensions,
} from "react-native";
import { useTheme } from "react-native-paper";
import { Entypo, AntDesign } from "react-native-vector-icons";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import moment from "moment";
import { useIsFocused, useNavigation } from "@react-navigation/native";
import StudentAttendenceShimmer from "./StudentAttendenceShimmer";
import { useThemeContext } from "../../../hooks/useTheme";
import { post } from "../../../utils/apis/TeacherApis/login";
import { useSelector } from "react-redux";
// import { theme } from "../../../theming";

export default function TodayAttendance({ GraphData }) {
  const { theme } = useThemeContext();
  const TodaysDate = new Date();
  const [date, setDate] = useState(TodaysDate);
  const [isDatePickerVisible, setIsDatePickerVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const navigation = useNavigation();
  const user = useSelector((state) => state?.login?.user);
  console.log(`userDatat`, user);
  const TeacherId = user?.teacherId;
  const isFocused = useIsFocused();
  const [ptData, setPtData] = useState([{ value: 0, label: "12B" }]);
  // const ptData = GraphData;

  const screenWidth = Dimensions.get("window").width;
  const classData = [
    {
      classId: "Class-52024-e2a093f5-7ad4-433b-b8f2-cf04d279ba2c",
      className: "Biology",
      presentCount: 3,
      absentCount: 2,
      lateCount: 0,
      excusedCount: 0,
    },
    {
      classId: "Class-52024-c8e6fc20-0b77-4d50-a883-932851355be4",
      className: "Chemistry",
      presentCount: 10,
      absentCount: 2,
      lateCount: 0,
      excusedCount: 0,
    },
  ];

  const sortedClassData = classData.sort(
    (a, b) => b.presentCount - a.presentCount
  );
  // const ptData = sortedClassData.map((item) => ({
  //   value: item.presentCount,
  //   label: item.className,
  // }));

  const chartConfig = {
    backgroundColor: "#ffffff",
    backgroundGradientFrom: "#ffffff",
    backgroundGradientTo: "#ffffff",
    color: (opacity = 1) => theme.primarycolor, // Set primary color for the line
    labelColor: (opacity = 1) => theme.primaryTextColor, // Set text color for labels
    style: {
      borderRadius: 16,
    },

    fillShadowGradient: theme.primarycolor, // Set primary color for the fill gradient
    fillShadowGradientOpacity: 0.5, // Adjust opacity for the fill
  };
  const chartWidth = Math.max(
    screenWidth,
    (screenWidth / 2) * sortedClassData.length
  );
  // const initialSpacing = screenWidth / sortedClassData.length / 2;

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  }, []);

  const fetchAttendenceData = async (fetchdate) => {
    const formatedDate = moment(fetchdate).format("YYYY-MM-DD");
    const response = await post("attendences/count", {
      teacherId: TeacherId,
      date: formatedDate,
    });
    if (response?.errCode == -1) {
      // const sortedClassData = response?.data?.sort(
      //   (a, b) => b.presentCount - a.presentCount
      // );
      // if (sortedClassData) {
      //   const Graphdata = sortedClassData.map((item) => ({
      //     value: item?.presentCount,
      //     label: item.className,
      //   }));
      //   setPtData(Graphdata);
      // }
      if (response?.data.length > 0) {
        // const graphData = {
        //   labels: response?.data?.map((item) => item.className), // X-axis labels
        //   datasets: [
        //     {
        //       data: response?.data?.map((item) => item.presentCount), // Y-axis data
        //       color: () => "#FF0000", // Custom color function
        //     },
        //   ],
        // };
        // console.log(`graphData`, graphData);
        // setPtData(graphData);
        const convertToGraphData = (data) => {
          return data.map((item) => ({
            value: item.presentCount, // Use the presentCount as the value
            label: `${item?.className}-${item?.divisionName}`, // Use the className as the label
          }));
        };
        const graphData = convertToGraphData(response?.data);
        setPtData(graphData);
        console.log(`graphData`, graphData);
      } else {
        setPtData([{ value: 0, label: "" }]);
      }
    }
  };

  useEffect(() => {
    fetchAttendenceData(date);
  }, [isFocused]);

  const hexToRgba = (hex, opacity) => {
    hex = hex.replace("#", "");
    let r = parseInt(hex.substring(0, 2), 16);
    let g = parseInt(hex.substring(2, 4), 16);
    let b = parseInt(hex.substring(4, 6), 16);

    return `rgba(${r}, ${g}, ${b}, ${opacity})`;
  };

  const { colors } = useTheme();

  const hideStartDatePicker = () => {
    setIsDatePickerVisible(false);
  };

  const handleStartDateConfirm = (date) => {
    setDate(moment(date).format("YYYY-MM-DD"));
    setIsDatePickerVisible(false);
    fetchAttendenceData(date);
  };

  return isLoading == true ? (
    <View>
      <StudentAttendenceShimmer />
    </View>
  ) : (
    <View
      style={{
        marginHorizontal: 10,
        width: "90%",
      }}
    >
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Text
          style={{
            fontSize: 14,
            fontWeight: "bold",
            color: theme.primaryTextColor,
          }}
        >
          Student’s Attendance
        </Text>
        {/* <TouchableOpacity
          onPress={() => {
            navigation.navigate("Attendence");
          }}
        >
          <Text
            style={{
              fontSize: 12,
              textDecorationLine: "underline",
              color: theme.primarycolor,
            }}
          >
            Take Attendance
          </Text>
        </TouchableOpacity> */}
      </View>
      <View
        style={{
          flexDirection: "row",
          alignItems: "flex-end",
          justifyContent: "flex-end",
        }}
      >
        {ptData.length > 0 && (
          <TouchableOpacity
            onPress={() => setIsDatePickerVisible(true)}
            style={{
              borderWidth: 1,
              borderColor: theme.primarycolor,
              padding: 6,
              borderRadius: 8,
              marginBottom: 30,
              marginTop: 16,
            }}
          >
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                gap: 2,
              }}
            >
              <Text
                style={{
                  fontSize: 12,
                  color: theme.primaryTextColor,
                  marginRight: 8,
                }}
              >
                {moment(date).format("D MMM YYYY")}
              </Text>
              <AntDesign
                name="calendar"
                size={18}
                color={theme.primaryTextColor}
              />
            </View>
          </TouchableOpacity>
        )}
      </View>
      <ScrollView horizontal={true}>
        {/* <LineChart
          areaChart
          curved
          data={ptData}
          hideDataPoints
          color1={theme.primarycolor}
          startFillColor1={theme.primarycolor}
          endFillColor1="#DADEFF"
          startOpacity={0.9}
          endOpacity={0.1}
          yAxisColor={theme.primaryTextColor}
          yAxisThickness={0}
          initialSpacing={5}
          yAxisTextStyle={{ color: theme.primaryTextColor }}
          noOfSections={3}
          yAxisLabelSuffix=""
          xAxisColor={theme.primaryTextColor}
          xAxisLabelTextStyle={{ color: theme.primaryTextColor }}
          pointerConfig={{
            pointerStripUptoDataPoint: true,
            pointerStripColor: theme.primaryTextColor,
            pointerStripWidth: 2,
            strokeDashArray: [2, 5],
            pointerColor: "transparent",
            radius: 4,
            pointerLabelWidth: 100,
            pointerLabelHeight: 120,
            pointerLabelComponent: (items) => {
              return (
                <View
                  style={{
                    borderWidth: 1,
                    borderColor: theme.primarycolor,
                    borderRadius: 8,
                  }}
                >
                  <View
                    style={{
                      padding: 8,
                      backgroundColor: hexToRgba(theme.primarycolor, 0.05),
                    }}
                  >
                    <Text
                      style={{
                        textAlign: "center",
                        color: theme.primaryTextColor,
                        fontSize: 14,
                      }}
                    >
                      2 May 2024
                    </Text>
                  </View>
                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      justifyContent: "center",
                      padding: 8,
                    }}
                  >
                    <Text
                      style={{
                        textAlign: "center",
                        color: theme.primaryTextColor,
                        fontSize: 14,
                      }}
                    >
                      {items[0]["value"]} Present
                    </Text>
                  </View>
                </View>
              );
            },
          }}
        /> */}
        {/* {ptData.length > 0 ? (
          <LineChart
            areaChart
            curved
            data={ptData}
            width={chartWidth}
            height={220}
            chartConfig={{
              backgroundGradientFrom: "#ffffff",
              backgroundGradientTo: "#ffffff",
              color: (opacity = 1) => theme.primarycolor,
              labelColor: (opacity = 1) => theme.primaryTextColor,
              style: {
                borderRadius: 16,
              },
              propsForDots: {
                r: "6",
                strokeWidth: "2",
                stroke: "#ffa726",
              },
            }}
            color1={theme.primarycolor}
            startFillColor1={theme.primarycolor}
            endFillColor1="#DADEFF"
            startOpacity={0.9}
            endOpacity={0.1}
            yAxisColor={theme.primaryTextColor}
            yAxisThickness={0}
            yAxisMinValue={0}
            initialSpacing={25} // Dynamically adjust spacing
            yAxisTextStyle={{ color: theme.primaryTextColor }}
            noOfSections={3}
            yAxisLabelSuffix=""
            xAxisColor={theme.primaryTextColor}
            xAxisLabelTextStyle={{
              color: theme.primaryTextColor,
              fontSize: 12,
              rotation: 0,
            }} // Adjust as needed
            pointerConfig={{
              pointerStripUptoDataPoint: true,
              pointerStripColor: theme.primaryTextColor,
              pointerStripWidth: 2,
              strokeDashArray: [2, 5],
              pointerColor: "transparent",
              radius: 4,
              pointerLabelWidth: 100,
              pointerLabelHeight: 120,
              pointerLabelComponent: (items) => {
                return (
                  <View
                    style={{
                      borderWidth: 1,
                      borderColor: theme.primarycolor,
                      borderRadius: 8,
                    }}
                  >
                    <View
                      style={{
                        padding: 8,
                        backgroundColor: hexToRgba(theme.primarycolor, 0.05),
                      }}
                    >
                      <Text
                        style={{
                          textAlign: "center",
                          color: theme.primaryTextColor,
                          fontSize: 14,
                        }}
                      >
                        {moment(date).format("DD MMMM YYYY")}
                      </Text>
                    </View>
                    <View
                      style={{
                        flexDirection: "row",
                        alignItems: "center",
                        justifyContent: "center",
                        padding: 8,
                      }}
                    >
                      <Text
                        style={{
                          textAlign: "center",
                          color: theme.primaryTextColor,
                          fontSize: 14,
                        }}
                      >
                        {items ? parseInt(items[0]["value"]) : 0} Present
                      </Text>
                    </View>
                  </View>
                );
              },
            }}
          />
        ) : (
          <View
            style={{
              width: "100%",
              height: "100%",
              display: "flex",
              alignItems: "center",
              backgroundColor: "red",
            }}
          >
            <Text style={{ textAlign: "center" }}>No Record found</Text>
          </View>
        )} */}
        <LineChart
          areaChart
          curved
          data={ptData}
          width={screenWidth}
          height={220}
          chartConfig={chartConfig}
          color1={theme.primarycolor}
          startFillColor1={theme.primarycolor}
          endFillColor1="#DADEFF"
          startOpacity={0.9}
          endOpacity={0.1}
          yAxisColor={theme.primaryTextColor}
          yAxisThickness={0}
          yAxisMinValue={0}
          initialSpacing={25}
          yAxisTextStyle={{ color: theme.primaryTextColor }}
          noOfSections={3}
          xAxisColor={theme.primaryTextColor}
          xAxisLabelTextStyle={{
            color: theme.primaryTextColor,
            fontSize: 12,
            rotation: 0,
          }} // Adjust as needed
          pointerConfig={{
            pointerStripUptoDataPoint: true,
            pointerStripColor: theme.primaryTextColor,
            pointerStripWidth: 2,
            strokeDashArray: [2, 5],
            pointerColor: "transparent",
            radius: 4,
            pointerLabelWidth: 100,
            pointerLabelHeight: 120,
            pointerLabelComponent: (items) => {
              return (
                <View
                  style={{
                    borderWidth: 1,
                    borderColor: theme.primarycolor,
                    borderRadius: 8,
                  }}
                >
                  <View
                    style={{
                      padding: 8,
                      backgroundColor: hexToRgba("#2B78CA", 0.05),
                    }}
                  >
                    <Text
                      style={{
                        textAlign: "center",
                        color: theme.primaryTextColor,
                        fontSize: 14,
                      }}
                    >
                      {moment(date).format("DD MMMM YYYY")}
                    </Text>
                  </View>
                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      justifyContent: "center",
                      padding: 8,
                    }}
                  >
                    <Text
                      style={{
                        textAlign: "center",
                        color: theme.primaryTextColor,
                        fontSize: 14,
                      }}
                    >
                      {items ? items[0]["label"] : 0}
                    </Text>
                  </View>
                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      justifyContent: "center",
                      padding: 8,
                    }}
                  >
                    <Text
                      style={{
                        textAlign: "center",
                        color: theme.primaryTextColor,
                        fontSize: 14,
                      }}
                    >
                      {items ? parseInt(items[0]["value"]) : 0} Present
                    </Text>
                  </View>
                </View>
              );
            },
          }}
        />

        {/* <View style={{ marginBottom: 40 }} />
        <DateTimePickerModal
          isVisible={isDatePickerVisible}
          mode="date"
          textColor={colors.text}
          minimumDate={new Date()}
          date={date ? new Date(date) : new Date()}
          onConfirm={handleStartDateConfirm}
          onCancel={hideStartDatePicker}
        /> */}
        <View style={{ marginBottom: 40 }} />
        <DateTimePickerModal
          isVisible={isDatePickerVisible}
          mode="date"
          textColor={colors.text}
          maximumDate={new Date()}
          date={date ? new Date(date) : new Date()}
          onConfirm={handleStartDateConfirm}
          onCancel={hideStartDatePicker}
        />
      </ScrollView>
    </View>
  );
}
