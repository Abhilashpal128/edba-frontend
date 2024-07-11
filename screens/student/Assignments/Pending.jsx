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
import { useTheme, Avatar, Divider } from "react-native-paper";
import { Calendar, LocaleConfig } from "react-native-calendars";
import { FontAwesome6 } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { Entypo } from "react-native-vector-icons";
import { Subjects } from "../../../svg/subjects";
import moment from "moment";
import { useThemeContext } from "../../../hooks/useTheme";

export default function Pending({ navigation, route }) {
  const { theme } = useThemeContext();

  const [subjects, setSubjects] = useState([
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
  ]);

  const [assignment, setAssignments] = useState([
    {
      question: "Make a assignment on substance pressure.",
      instructions: [
        {
          description:
            " 1 Research and create a presentation on the structure and functions of plant and animal cells",
        },
        {
          description:
            " 2. Include labeled diagrams and explanations of organelles.",
        },
        {
          description:
            " 3. Submit your presentation through the app by [insertdeadline].",
        },
      ],
      resources: [
        {
          description: "Text Book",
          link: "https://www.google.com/",
        },
        {
          description: "Text Book",
          link: "https://www.google.com/",
        },
        {
          description: "Text Book",
          link: "https://www.google.com/",
        },
      ],
    },
    {
      question: "Solve your questions and answers on page 26.",
      instructions: [
        {
          description:
            " 1 Research and create a presentation on the structure and functions of plant and animal cells",
        },
        {
          description:
            " 2. Include labeled diagrams and explanations of organelles.",
        },
        {
          description:
            " 3. Submit your presentation through the app by [insertdeadline].",
        },
      ],
      resources: [
        {
          description: "Text Book",
          link: "https://www.google.com/",
        },
        {
          description: "Text Book",
          link: "https://www.google.com/",
        },
        {
          description: "Text Book",
          link: "https://www.google.com/",
        },
      ],
    },
    {
      question: "Assignment on page 43",
      instructions: [
        {
          description:
            " 1 Research and create a presentation on the structure and functions of plant and animal cells",
        },
        {
          description:
            " 2. Include labeled diagrams and explanations of organelles.",
        },
        {
          description:
            " 3. Submit your presentation through the app by [insertdeadline].",
        },
      ],
      resources: [
        {
          description: "Text Book",
          link: "https://www.google.com/",
        },
        {
          description: "Text Book",
          link: "https://www.google.com/",
        },
        {
          description: "Text Book",
          link: "https://www.google.com/",
        },
      ],
    },
  ]);

  const [activeTab, setActiveTab] = useState(0);

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

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: theme.backgroundColor }}>
      <View style={{ marginTop: 10 }}>
        <ScrollView showsHorizontalScrollIndicator={false} horizontal={true}>
          {subjects.map((item, index) => {
            return (
              <TouchableOpacity
                onPress={() => setActiveTab(index)}
                key={index}
                style={{
                  width: 100,
                  height: 75,
                  backgroundColor: hexToRgba(item.color, 0.15),
                  marginRight: 10,
                  borderRadius: 8,
                  alignItems: "center",
                  justifyContent: "center",
                  borderColor: item.color,
                  borderWidth: index == activeTab ? 1 : 0,
                }}
              >
                {(() => {
                  if (Subjects[item.slug]) {
                    return <View>{Subjects[item.slug]()}</View>;
                  }
                })()}
                <Text
                  numberOfLines={1}
                  style={{
                    fontSize: 14,
                    marginTop: 6,
                  }}
                >
                  {item.label}
                </Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>
        <View style={{ marginVertical: 20 }}>
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
            {assignment.map((item, index) => {
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
                      {item.question}
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
      </View>
    </SafeAreaView>
  );
}
