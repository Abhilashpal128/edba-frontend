import {
  ActivityIndicator,
  BackHandler,
  RefreshControl,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useCallback, useLayoutEffect, useState } from "react";
// import { theme } from "../../../theming";
import moment from "moment";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { FontAwesome } from "react-native-vector-icons";
import { Feather, Ionicons, Entypo } from "react-native-vector-icons";
import Icon from "react-native-vector-icons/Ionicons";
import { useThemeContext } from "../../../hooks/useTheme";
import { calculateDuration } from "../../../Helper/helper";
import { get } from "../../../utils/apis/TeacherApis/login";

export default function AllNoticesEvents({ allNoticesAndEvents }) {
  const { theme } = useThemeContext();

  const [details, setDetails] = useState();
  const [isDetailTabopen, setIsDetailTabOpen] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [NoticesEvents, setNoticesEvents] = useState(allNoticesAndEvents);
  const [isLoading, setIsLoading] = useState(false);

  const navigation = useNavigation();

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
            Notice & Events
          </Text>
        </View>
      ),

      headerRight: () => (
        <View style={{ marginRight: 10 }}>
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
        </View>
      ),
      headerStyle: {
        backgroundColor: theme.backgroundColor,
      },
      headerTitleAlign: "center",
      headerTintColor: theme.backgroundColor,
    });
  }, [navigation, isDetailTabopen, theme]);

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

  const fetchNotices = async () => {
    try {
      setRefreshing(true);
      setIsLoading(true);
      const response = await get("event-notices/get");
      console.log(`response`, response);

      if (response?.errCode == -1) {
        console.log(`response.data`, response?.data);
        setNoticesEvents(response?.data);
        setIsLoading(false);
      } else {
        setIsLoading(false);
        setNoticesEvents([]);
      }
    } catch (error) {
      console.log(error);
      setIsLoading(false);
      setRefreshing(false);
    } finally {
      setIsLoading(false);
      setRefreshing(false);
    }

    // const response = await get("events");
    // console.log(`response.data `, response.data);
    // setNoticesData(response.data);
    // setIsLoading(false);
  };

  const onRefresh = useCallback(() => {
    // handleClassSelect(selectedClass?.value);
    fetchNotices();
  }, []);

  if (isLoading) {
    return (
      <View style={{ width: "100%", height: "100%" }}>
        <ActivityIndicator size={"large"} />
      </View>
    );
  }

  return (
    <SafeAreaView
      style={{
        width: "100%",
        height: "100%",
        backgroundColor: theme.backgroundColor,
      }}
    >
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <View
          style={{
            display: "flex",
            alignItems: "center",
            marginHorizontal: 20,
          }}
        >
          {NoticesEvents?.length > 0 ? (
            NoticesEvents?.map((item, index) => (
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
                    width: "100%",
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
                      fontWeight: "bold",
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
                      fontWeight: "bold",
                      color: theme.primaryTextColor,
                    }}
                  >
                    Venue:{" "}
                  </Text>
                  <Text
                    style={{
                      fontSize: 12,
                      fontWeight: "bold",
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
                  <Text style={{ color: theme.primaryTextColor }}>
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
                  <Text style={{ color: theme.primaryTextColor }}>
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
                  fontWeight: "bold",
                  color: theme.secondaryTextColor,
                }}
              >
                No Notices and Events
              </Text>
            </View>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({});
