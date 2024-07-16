import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import { FontAwesome } from "react-native-vector-icons";
import NoticesEventsShimmer from "./NoticesEventsShimmer";
import moment from "moment";
// import { theme } from "../../../theming";
import { useNavigation } from "@react-navigation/native";
import { useThemeContext } from "../../../hooks/useTheme";
import { calculateDuration } from "../../../Helper/helper";

const EventsData = [
  {
    title: "Biology Practical Exhebition",
    venue: "School/College Biology Laboratory",
    date: "15 may 2024",
    time: "1 Hour",
  },
  {
    title: "Biology Practical Exhebition",
    venue: "School/College Biology Laboratory",
    date: "15 may 2024",
    time: "1 Hour",
  },
  {
    name: "Biology Practical Exhebition",
    place: "School/College Biology Laboratory",
    date: "15 may 2024",
    duration: "1 Hour",
  },
];

export default function NoticesEvents({ Events, isLoading }) {
  // const [isLoading, setIsLoading] = useState(true);
  const { theme } = useThemeContext();

  const navigation = useNavigation();

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

  console.log(`NOOOOOOOOtoiccccedddddd`, Events);

  // useEffect(() => {
  //   setTimeout(() => {
  //     setIsLoading(false);
  //   }, 1000);
  // }, []);

  return isLoading == true ? (
    <View>
      <NoticesEventsShimmer />
    </View>
  ) : (
    <SafeAreaView>
      <View
        style={{
          margin: 10,
        }}
      >
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            width: "100%",
          }}
        >
          <Text
            style={{
              fontSize: 14,
              fontFamily: "Poppins_700Bold",
              color: theme.primaryTextColor,
            }}
          >
            Notice & Events
          </Text>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("NoticesEvents", {
                Events,
              });
            }}
          >
            <Text
              style={{
                color: theme.primarycolor,
                textDecorationLine: "underline",
                fontFamily: "Poppins_700Bold",
              }}
            >
              See all
            </Text>
          </TouchableOpacity>
        </View>
        <ScrollView horizontal={true}>
          {Events.length > 0 ? (
            Events.slice(0, 5).map((item, index) => (
              <TouchableOpacity
                key={index}
                style={[
                  {
                    display: "flex",
                    flexDirection: "column",
                    gap: 8,
                    padding: 10,
                    borderWidth: 2,
                    borderRadius: 10,
                    margin: 10,
                    width: 280,
                  },
                  { borderColor: `${getRandomHexColor()}` },
                ]}
                onPress={() => {
                  navigation.navigate("singleNotice", {
                    item,
                  });
                }}
              >
                <View>
                  <Text
                    style={{
                      fontSize: 12,
                      fontFamily: "Poppins_700Bold",
                      color: theme.primaryTextColor,
                    }}
                  >
                    {item?.title}
                  </Text>
                </View>
                <View style={{ display: "flex", flexDirection: "row" }}>
                  <Text
                    style={{
                      fontSize: 12,
                      fontFamily: "Poppins_500Medium",
                      color: theme.primaryTextColor,
                    }}
                  >
                    Venue:{" "}
                  </Text>
                  <Text
                    style={{
                      fontSize: 12,
                      fontFamily: "Poppins_500Medium",
                      color: theme.secondaryTextColor,
                    }}
                  >
                    {item?.venue}
                  </Text>
                </View>
                <View
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    gap: 5,
                  }}
                >
                  <FontAwesome
                    name="table"
                    size={20}
                    color={theme.primarycolor}
                  />
                  <Text
                    style={{
                      color: theme.primaryTextColor,
                      fontFamily: "Poppins_500Medium",
                    }}
                  >
                    {moment(item?.date).format("Do MMMM YYYY")}
                  </Text>
                </View>
                <View
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    gap: 5,
                  }}
                >
                  <FontAwesome
                    name="clock-o"
                    size={20}
                    color={theme.primarycolor}
                  />
                  <Text
                    style={{
                      color: theme.primaryTextColor,
                      fontFamily: "Poppins_500Medium",
                    }}
                  >
                    {calculateDuration(item?.startTime, item?.endTime)}
                  </Text>
                </View>
              </TouchableOpacity>
            ))
          ) : (
            <View
              style={{
                width: 300,
                height: 100,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Text
                style={{
                  textAlign: "center",
                  fontStyle: "italic",
                  fontSize: 20,
                  fontFamily: "Poppins_700Bold_Italic",
                  color: theme.secondaryTextColor,
                }}
              >
                No Notices and Events
              </Text>
            </View>
          )}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({});
