import {
  useEffect,
  useRef,
  useLayoutEffect,
  useState,
  useMemo,
  useContext,
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
} from "react-native";
import { Svg, Circle, Text as SvgText } from "react-native-svg";
import { useTheme, Avatar } from "react-native-paper";
import { Calendar, LocaleConfig } from "react-native-calendars";
import { FontAwesome6 } from "react-native-vector-icons";

import { Ionicons, Feather } from "react-native-vector-icons";
import { DrawerActions } from "@react-navigation/native";
import { Subjects } from "../../../svg/subjects";
import { useThemeContext } from "../../../hooks/useTheme";

export default function StudentGrade({ navigation, route }) {
  //   const user = useSelector((state) => state.user.userDetails);
  const { theme } = useThemeContext();

  const [grades, setGrades] = useState([
    {
      label: "Science",
      slug: "science",
      assignment: "Assignment on Substance Pressure.",
      grade: "A+",
      remark: "Good work keep it up!",
      color: "#007EB0",
    },
    {
      label: "English",
      slug: "english",
      assignment: "Assignment on Substance Pressure.",
      grade: "A+",
      remark: "Good work keep it up!",
      color: "#FE9001",
    },
  ]);

  useLayoutEffect(() => {
    navigation.setOptions({
      header: () => {
        return (
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              marginTop: 40,
              paddingLeft: 20,
              paddingRight: 20,
              paddingTop: 20,
              paddingBottom: 10,
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
              Grades
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
        );
      },
    });
  }, [navigation,theme]);

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

  const renderItem = ({ item, index }) => {
    return (
      <View style={{ marginBottom: 20 }}>
        <View
          style={{
            backgroundColor: hexToRgba(item.color, 0.15),
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
              {(() => {
                if (Subjects[item.slug]) {
                  return <View>{Subjects[item.slug](40, 40)}</View>;
                }
              })()}
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
                  {item.grade}
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
                  {item.remark}
                </Text>
              </Text>
            </View>
          </View>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ padding: 20, flex: 1 }}>
        <FlatList
          data={grades}
          renderItem={renderItem}
          keyExtractor={(item, index) => index}
          showsVerticalScrollIndicator={false}
        />
      </View>
    </SafeAreaView>
  );
}
