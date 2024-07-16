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
  FlatList,
  RefreshControl,
} from "react-native";
import { Svg, Circle, Text as SvgText } from "react-native-svg";
import { useTheme, Avatar, Divider } from "react-native-paper";
import { Calendar, LocaleConfig } from "react-native-calendars";
import { FontAwesome6 } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { Entypo } from "react-native-vector-icons";
import { Subjects } from "../../../svg/subjects";
import moment from "moment";
import { useThemeContext } from "../../../hooks/useTheme";
import { post } from "../../../utils/apis/StudentApis";
import { useSelector } from "react-redux";
import { useIsFocused } from "@react-navigation/native";
import SvgRenderer from "./SvgRenderer";
import {
  AssignmentShimmerEffect,
  SubjectShimmerEffect,
} from "./AssignmentShimmerEffect";

export default function Pending({ navigation, route }) {
  const { theme } = useThemeContext();
  const userData = useSelector((state) => state?.login?.user);
  console.log(`userdata`, userData);
  const StudentId = userData?.studentId;
  const { colors } = useTheme();
  const subjectData = route?.params?.item;
  console.log(subjectData);
  console.log(`subjectData != undefined`, subjectData != undefined);
  const [subjectSelectedRedirect, setSubjectSelectedRedirect] = useState(
    subjectData != undefined
  );
  const [isSubjectLoading, setIsSubjectLoading] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const isFocused = useIsFocused();

  const OldsubjectList = [
    {
      label: "English",
      slug: "english",
      color: "#FE9001",
    },
    {
      label: "Hindi",
      slug: "hindi",
      color: "#D500DA",
    },
    {
      label: "Marathi",
      slug: "marathi",
      color: "#930303",
    },
    {
      label: "Geography",
      slug: "geography",
      color: "#02AF9B",
    },
    {
      label: "Science",
      slug: "science",
      color: "#007EB0",
    },
    {
      label: "Mathematics",
      slug: "maths",
      color: "#6F0FBA",
    },
    {
      label: "History",
      slug: "history",
      color: "#3E48D0",
    },
  ];

  const [subjects, setSubjects] = useState([]);

  const [assignment, setAssignments] = useState([]);

  const [activeTab, setActiveTab] = useState(0);
  const [refreshing, setRefreshing] = useState(false);

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

  const fetchPendingAssignments = async () => {
    try {
      setLoading(true);
      const response = await post("assignments/pending-student", {
        studentId: StudentId,
      });
      console.log(`pending Assignments`, response);
      if (response?.errCode == -1) {
        setAssignments(response?.data);

        setLoading(false);
      } else {
        setAssignments([]);

        setLoading(false);
      }
    } catch (error) {
      console.log(error);

      setLoading(false);
    } finally {
      setRefreshing(false);

      setLoading(false);
    }
  };

  const fetchSubjectList = async () => {
    try {
      setIsSubjectLoading(true);

      const response = await post("classes/student-subject", {
        studentId: StudentId,
      });
      if (response?.errCode == -1) {
        setSubjects(response?.data);
        setIsSubjectLoading(false);
      } else {
        setSubjects([]);
        setIsSubjectLoading(false);
      }
    } catch (error) {
      console.log(`error while fetching subjectList`, error);
      setIsSubjectLoading(false);
    } finally {
      setRefreshing(false);
      setIsSubjectLoading(false);
    }
  };

  useEffect(() => {
    if (subjectSelectedRedirect) {
      console.log(`subjectDatata`, subjectData);
      console.log(`subjectData?.id`, subjectData?.id);
      handleSubjectSelect(subjectData?.id);
    }
  }, [subjectSelectedRedirect, subjectData, isFocused]); // Add dependencies to run when these values change

  // Effect that runs when subjectSelectedRedirect is false
  useEffect(() => {
    if (!subjectSelectedRedirect) {
      fetchPendingAssignments();
    }
  }, [subjectSelectedRedirect]);

  useEffect(() => {
    fetchSubjectList();
  }, []);

  const handleSubjectSelect = async (subjectId) => {
    try {
      setActiveTab(subjectId);
      const response = await post(`assignments/pending-student`, {
        studentId: StudentId,
        subjectId: subjectId,
      });

      console.log(`subject wise Assignment`, response);
      if (response?.errCode == -1) {
        setAssignments(response?.data);
      } else {
        setAssignments([]);
      }
    } catch (error) {
      console.log(`error from handleSubjectSelect`, error);
    }
  };

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    fetchPendingAssignments();
    fetchSubjectList();
  }, []);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: theme.backgroundColor }}>
      <ScrollView
        style={{ marginTop: 10 }}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <View>
          {isSubjectLoading == true ? (
            <ScrollView
              showsHorizontalScrollIndicator={false}
              horizontal={true}
            >
              <SubjectShimmerEffect />
            </ScrollView>
          ) : (
            subjects?.length > 0 && (
              <ScrollView
                showsHorizontalScrollIndicator={false}
                horizontal={true}
              >
                {subjects?.map((item, index) => {
                  return (
                    <TouchableOpacity
                      onPress={() => handleSubjectSelect(item?.id)}
                      key={index}
                      style={{
                        width: 100,
                        height: 75,
                        backgroundColor: hexToRgba(item?.colorCode, 0.15),
                        marginRight: 10,
                        borderRadius: 8,
                        alignItems: "center",
                        justifyContent: "center",
                        borderColor: item.color,
                        borderWidth: item?.id == activeTab ? 1 : 0,
                      }}
                    >
                      {/* {(() => {
                        if (Subjects[item?.slug]) {
                          return <View>{Subjects[item?.slug]()}</View>;
                        }
                      })()} */}
                      {item?.svg != null && (
                        <SvgRenderer svgContent={`${item.svg}`} />
                      )}
                      <Text
                        numberOfLines={1}
                        style={{
                          fontSize: 14,
                          marginTop: 6,
                        }}
                      >
                        {item?.subjectName}
                      </Text>
                    </TouchableOpacity>
                  );
                })}
              </ScrollView>
            )
          )}
        </View>
        <View style={{ marginVertical: 20 }}>
          {isLoading == true ? (
            <View>
              <AssignmentShimmerEffect />
            </View>
          ) : (
            <View>
              <Text
                numberOfLines={1}
                style={{
                  fontSize: 16,
                  fontWeight: "bold",
                  marginTop: 6,
                  color: theme.primaryTextColor,
                  marginVertical: 20,
                }}
              >
                List of Assignments
              </Text>
              <ScrollView
                style={{ marginTop: 10 }}
                showsVerticalScrollIndicator={true}
              >
                {assignment?.map((item, index) => {
                  return (
                    <View key={index} style={{ marginVertical: 10 }}>
                      <TouchableOpacity
                        onPress={() =>
                          navigation.navigate("AssignmentDisplay", {
                            subject: subjects[activeTab],
                            assignment: item,
                          })
                        }
                        style={{
                          flexDirection: "row",
                          justifyContent: "space-between",
                          width: "90%",
                        }}
                      >
                        <Text
                          style={{
                            fontSize: 12,
                            fontWeight: "semibold",
                            width: "90%",
                            color: theme.primarycolor,
                          }}
                        >
                          {item?.name}
                        </Text>
                        <Entypo
                          name="chevron-right"
                          size={20}
                          color={theme.primarycolor}
                        />
                      </TouchableOpacity>
                      <Divider style={{ marginTop: 10, marginBottom: 10 }} />
                    </View>
                  );
                })}
              </ScrollView>
            </View>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
