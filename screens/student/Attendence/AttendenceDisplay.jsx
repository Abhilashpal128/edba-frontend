import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useLayoutEffect, useState } from "react";
import { FontAwesome6 } from "react-native-vector-icons";
import { Ionicons, Feather } from "react-native-vector-icons";
import { useThemeContext } from "../../../hooks/useTheme";
import { post } from "../../../utils/apis/StudentApis";
import moment from "moment";

const AttendenceData = [];

export default function AttendenceDisplay({ navigation, route }) {
  const [attendence, setAttendence] = useState([]);
  const [totalLectures, setTotalLectures] = useState(0);
  const [attendedLecture, setAttendedLectures] = useState(0);
  const data = route?.params;
  console.log(`route?.params`, data);
  const startDate = moment(data?.startDate)
    .startOf("month")
    .format("YYYY-MM-DD");
  const { theme } = useThemeContext();

  useEffect(() => {
    setAttendence(AttendenceData);
    fetchAttendenceData();
  }, []);

  const fetchAttendenceData = async () => {
    try {
      const response = await post("attendences/month-all-subject", {
        classId: data?.class[0]?.id,
        startDate: startDate,
        studentId: data?.studentId,
      });
      if (response?.errCode == -1) {
        setAttendence(response?.data);
        let totalDaysSum = 0;
        let attended = 0;
        response?.data?.filter((item) => {
          totalDaysSum += parseInt(item?.totalDays);
          attended += parseInt(item?.totalPresent);
        });
        setTotalLectures(totalDaysSum);
        setAttendedLectures(attended);
      } else {
        setAttendence([]);
      }
    } catch (error) {
      console.log(`error from fetchAttendenceData`, error);
    }
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      header: () => {
        return (
          <View
            style={{
              paddingLeft: 20,
              paddingRight: 20,
              paddingTop: 20,
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
                onPress={() => {
                  navigation.goBack();
                }}
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  width: "20%",
                }}
              >
                <FontAwesome6
                  name="chevron-left"
                  size={20}
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
  }, [navigation, theme]);

  return (
    <SafeAreaView
      style={{
        backgroundColor: theme.backgroundColor,
        height: "100%",
        width: "100%",
      }}
    >
      <View style={{ marginHorizontal: 20 }}>
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            borderBottomWidth: 1,
            borderBottomColor: "#ccc",
          }}
        >
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              marginVertical: 10,
              gap: 10,
            }}
          >
            <Text>Overall : </Text>
            <Text>
              {Math.round(
                (parseInt(attendedLecture) / parseInt(totalLectures)) * 100
              )}
              %
            </Text>
            <Text>
              {totalLectures}/{attendedLecture}
            </Text>
          </View>
        </View>
        <View style={{ width: "100%", display: "flex", flexDirection: "row" }}>
          <View style={{ width: "50%" }}>
            <Text
              style={{
                fontWeight: "bold",
                fontSize: 12,
                color: theme.primaryTextColor,
              }}
            >
              Subject
            </Text>
          </View>

          <View style={{ width: "25%" }}>
            <Text
              style={{
                fontWeight: "bold",
                fontSize: 12,
                color: theme.primaryTextColor,
                textAlign: "center",
              }}
            >
              Percentage
            </Text>
          </View>
          <View style={{ width: "25%" }}>
            <Text
              style={{
                fontWeight: "bold",
                fontSize: 12,
                color: theme.primaryTextColor,
                flexWrap: "wrap",
                textAlign: "center",
              }}
            >
              Lectures Attended
            </Text>
          </View>
        </View>
        <View>
          {attendence.length > 0 && (
            <View
              style={{
                gap: 20,
                marginTop: 20,
              }}
            >
              {attendence.map((item, index) => (
                <View
                  style={{
                    width: "100%",
                    display: "flex",
                    flexDirection: "row",
                    height: 36,
                    backgroundColor: "white", // Background color of the box
                    shadowColor: theme.primaryTextColor, // Shadow color
                    shadowOffset: { width: 0, height: 1 }, // Offset in {width, height}
                    shadowOpacity: 0.3,
                    shadowRadius: 4,
                    elevation: 2,
                  }}
                >
                  <View
                    style={{
                      width: "50%",
                      backgroundColor: theme.primarycolor,
                      display: "flex",
                      flexDirection: "row",
                      alignItems: "center",
                      borderRadius: 5,
                    }}
                  >
                    <Text
                      style={{
                        fontWeight: "bold",
                        fontSize: 12,
                        color: theme.primaryTextColor,
                        paddingLeft: 20,
                        color: "#FFFFFF",
                      }}
                    >
                      {item?.subjectName}
                    </Text>
                  </View>

                  <View
                    style={{
                      width: "25%",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <Text
                      style={{
                        fontWeight: "bold",
                        fontSize: 12,
                        color: theme.primaryTextColor,
                        textAlign: "center",
                      }}
                    >
                      {Math.round(
                        (parseInt(item?.totalPresent) /
                          parseInt(item?.totalDays)) *
                          100
                      )}
                      %
                    </Text>
                  </View>
                  <View style={{ width: "25%" }}>
                    <Text
                      style={{
                        fontWeight: "bold",
                        fontSize: 12,
                        color: theme.primaryTextColor,
                        flexWrap: "wrap",
                        textAlign: "center",
                      }}
                    >
                      {item?.totalPresent}/{item?.totalDays}
                    </Text>
                  </View>
                </View>
              ))}
            </View>
          )}
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({});
