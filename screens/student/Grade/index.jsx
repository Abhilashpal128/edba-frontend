import {
  useEffect,
  useRef,
  useLayoutEffect,
  useState,
  useMemo,
  useContext,
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
  FlatList,
  RefreshControl,
} from "react-native";
import { Svg, Circle, Text as SvgText } from "react-native-svg";
import { useTheme, Avatar } from "react-native-paper";
import { Calendar, LocaleConfig } from "react-native-calendars";
import { FontAwesome6 } from "react-native-vector-icons";

import { Ionicons, Feather } from "react-native-vector-icons";
import { DrawerActions, useIsFocused } from "@react-navigation/native";
import { Subjects } from "../../../svg/subjects";
import { useThemeContext } from "../../../hooks/useTheme";
import { post } from "../../../utils/apis/StudentApis";
import { useSelector } from "react-redux";
import SvgRenderer from "../Assignments/SvgRenderer";
import { GradeShimmerEffect } from "./GradeShimmerEffect";

export default function StudentGrade({ navigation, route }) {
  //   const user = useSelector((state) => state.user.userDetails);
  const { theme } = useThemeContext();
  const userData = useSelector((state) => state?.login?.user);
  const studentId = userData?.studentId;
  const isFocused = useIsFocused();

  const [grades, setGrades] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // {
  //   label: "Science",
  //   slug: "science",
  //   assignment: "Assignment on Substance Pressure.",
  //   grade: "A+",
  //   remark: "Good work keep it up!",
  //   color: "#007EB0",
  // },
  // {
  //   label: "English",
  //   slug: "english",
  //   assignment: "Assignment on Substance Pressure.",
  //   grade: "A+",
  //   remark: "Good work keep it up!",
  //   color: "#FE9001",
  // },

  // let grades=[];

  useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <TouchableOpacity
          onPress={() => navigation.openDrawer()}
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginLeft: 20,
          }}
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
              width: "60%",
              textAlign: "center",
              color: theme.primaryTextColor,
              fontWeight: "bold",
            }}
          >
            Grades
          </Text>
        </View>
      ),

      headerRight: () => (
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
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
    let blendAmount = 0.5;

    r = blendWithWhite(r, blendAmount);
    g = blendWithWhite(g, blendAmount);
    b = blendWithWhite(b, blendAmount);

    return `rgba(${r}, ${g}, ${b}, ${opacity})`;
  };

  const fetchStudentGrades = async () => {
    try {
      setIsLoading(true);
      const response = await post("student/get-grade", {
        studentId: studentId,
      });

      if (response?.errCode == -1) {
        console.log(`response?.data fetchStudentGrades`, response?.data);
        setGrades(response?.data);
        setIsLoading(false);
      } else {
        setGrades([]);
        setIsLoading(false);
      }
    } catch (error) {
      console.log(`error in Fetch student Grade`, error);
      setIsLoading(false);
    } finally {
      setRefreshing(false);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchStudentGrades();
  }, []);

  const renderItem = ({ item, index }) => {
    return (
      <View style={{ marginBottom: 20 }}>
        <View
          style={{
            backgroundColor: hexToRgba(`${item?.subject?.color}`, 0.15),
            borderRadius: 8,
            padding: 10,
          }}
        >
          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <View
              style={{
                width: "25%",
                flexDirection: "row",
                justifyContent: "center",
              }}
            >
              {/* {(() => {
                if (Subjects[item.slug]) {
                  return <View>{Subjects[item.slug](40, 40)}</View>;
                }
              })()} */}
              {item?.subject?.svg != null && (
                <SvgRenderer svgContent={`${item?.subject?.svg}`} />
              )}
            </View>
            <View style={{ width: "75%" }}>
              <Text
                style={{
                  fontSize: 14,
                  fontWeight: "bold",
                  color: theme.primaryTextColor,
                }}
              >
                {item.label}
              </Text>
              <Text
                style={{
                  fontSize: 12,
                  color: item.color,
                  marginTop: 4,
                }}
              >
                {item.assignment}
              </Text>
              <Text
                style={{
                  fontSize: 12,
                  color: theme.secondaryTextColor,
                  marginTop: 4,
                }}
              >
                Grade:{" "}
                <Text
                  style={{
                    color: theme.primaryTextColor,
                    fontSize: 12,
                    fontWeight: "bold",
                  }}
                >
                  {item?.grade}
                </Text>
              </Text>
              <Text
                style={{
                  fontSize: 12,
                  color: theme.secondaryTextColor,
                  marginTop: 4,
                }}
              >
                Feedback:{" "}
                <Text
                  style={{ color: theme.primaryTextColor, fontWeight: "bold" }}
                >
                  {item?.feedback}
                </Text>
              </Text>
            </View>
          </View>
        </View>
      </View>
    );
  };

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    fetchStudentGrades();
  }, []);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: theme?.backgroundColor }}>
      <View style={{ padding: 20, flex: 1 }}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        >
          {isLoading ? (
            <View>
              <GradeShimmerEffect />
            </View>
          ) : grades?.length > 0 ? (
            <View>
              {grades?.map((item, index) => (
                <View key={index} style={{ marginBottom: 20 }}>
                  <View
                    style={{
                      backgroundColor: hexToRgba(
                        `${item?.subject?.color}`,
                        0.15
                      ),
                      borderRadius: 8,
                      padding: 10,
                    }}
                  >
                    <View
                      style={{
                        flexDirection: "row",
                        justifyContent: "space-between",
                      }}
                    >
                      <View
                        style={{
                          width: "25%",
                          flexDirection: "row",
                          justifyContent: "center",
                        }}
                      >
                        {/* {(() => {
                             if (Subjects[item.slug]) {
                               return <View>{Subjects[item.slug](40, 40)}</View>;
                             }
                           })()} */}
                        {item?.subject?.svg != null && (
                          <SvgRenderer svgContent={`${item?.subject?.svg}`} />
                        )}
                      </View>
                      <View style={{ width: "75%" }}>
                        <Text
                          style={{
                            fontSize: 14,
                            fontWeight: "bold",
                            color: theme.primaryTextColor,
                          }}
                        >
                          {item?.subject?.name}
                        </Text>
                        <Text
                          style={{
                            fontSize: 12,
                            color: item?.subject?.color,
                            marginTop: 4,
                          }}
                        >
                          {item?.assignment?.name}
                        </Text>
                        <Text
                          style={{
                            fontSize: 12,
                            color: theme.secondaryTextColor,
                            marginTop: 4,
                          }}
                        >
                          Grade:{" "}
                          <Text
                            style={{
                              color: theme.primaryTextColor,
                              fontSize: 12,
                              fontWeight: "bold",
                            }}
                          >
                            {item?.grade}
                          </Text>
                        </Text>
                        <Text
                          style={{
                            fontSize: 12,
                            color: theme.secondaryTextColor,
                            marginTop: 4,
                          }}
                        >
                          Feedback:{" "}
                          <Text
                            style={{
                              color: theme.primaryTextColor,
                              fontWeight: "bold",
                            }}
                          >
                            {item?.feedback}
                          </Text>
                        </Text>
                      </View>
                    </View>
                  </View>
                </View>
              ))}
            </View>
          ) : (
            <View>
              <Text>No Assignment found</Text>
            </View>
          )}
        </ScrollView>
        {/* <FlatList
          data={grades}
          renderItem={renderItem}
          keyExtractor={(item, index) => index}
          showsVerticalScrollIndicator={false}
        /> */}
      </View>
    </SafeAreaView>
  );
}
