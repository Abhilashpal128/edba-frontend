import {
  Dimensions,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
// import { theme } from "../../../theming";
import { FlatList } from "react-native";
import { useIsFocused, useNavigation } from "@react-navigation/native";
import { Feather, Ionicons, Entypo } from "react-native-vector-icons";
import { useThemeContext } from "../../../hooks/useTheme";
import Notification from "../../common/Notifications";
import AsyncStorage from "@react-native-async-storage/async-storage";
import moment from "moment";
import RBSheet from "react-native-raw-bottom-sheet";

const notificationData = [
  {
    title: "Attendance Marked",
    time: "08:15AM",
    message: "Todays attendance marked by Ms,Shayli",
  },
  {
    title: "Attendance Marked",
    time: "08:15AM",
    message: "Todays attendance marked by Ms,Shayli",
  },
];

export default function TeacherNotification() {
  const isFocused = useIsFocused();
  const { theme } = useThemeContext();
  const navigation = useNavigation();
  const [notifications, setNotifications] = useState([]);
  const [selectedNotification, setSelectedNotification] = useState();
  const [isNotificationSelected, setIsNotificationSeletd] = useState(false);

  const refRBSheet = useRef();

  // useEffect(() => {
  //   setNotifications(notificationData);
  // }, []);

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const storedNotifications = await AsyncStorage.getItem("notifications");
        console.log(`Notifications`, storedNotifications);

        if (storedNotifications) {
          setNotifications(JSON.parse(storedNotifications));
          console.log(`Notifications`, storedNotifications);
        }
      } catch (error) {
        console.error("Failed to fetch notifications", error);
      }
    };

    fetchNotifications();
  }, [isFocused]);

  const ReadNotification = async (item) => {
    try {
      setSelectedNotification(item);
      setIsNotificationSeletd(true);
      refRBSheet?.current?.open();
      const updatedNotifications = notifications.map((notification) => {
        if (notification?.request?.identifier === item?.request?.identifier) {
          return { ...notification, seen: true };
        }
        return notification;
      });

      setNotifications(updatedNotifications);
      await AsyncStorage.setItem(
        "notifications",
        JSON.stringify(updatedNotifications)
      );
    } catch (error) {
      console.error("Failed to mark notification as seen:", item);
    }
  };

  const renderItem = ({ item }) => {
    const formattedTime = moment(item?.date).format("h:mm A");
    return (
      <TouchableOpacity
        style={{ gap: 2 }}
        onPress={() => {
          ReadNotification(item);
        }}
      >
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <View style={{ width: "80%" }}>
            <Text
              style={{
                color: theme.primaryTextColor,
                fontWeight: "bold",
                fontSize: 14,
              }}
            >
              {item?.request?.content?.title}
            </Text>
            <Text
              style={{
                color: theme.secondaryTextColor,
                fontSize: 12,
              }}
            >
              {item?.request?.content?.body}
            </Text>
          </View>
          <View style={{ width: "20%", display: "flex", alignItems: "center" }}>
            {!item?.seen && (
              <View
                style={{
                  backgroundColor: theme.primarycolor,
                  borderRadius: 10,
                  width: 20,
                  height: 20,
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Text
                  style={{
                    color: "white",
                    fontSize: 12,
                    fontWeight: "bold",
                  }}
                >
                  1
                </Text>
              </View>
            )}
            <Text
              style={{
                color: theme.primarycolor,
                fontWeight: "bold",
                fontSize: 12,
              }}
            >
              {formattedTime}
            </Text>
          </View>
          {/* <Text
            style={{
              color: theme.primaryTextColor,
              fontWeight: "bold",
              fontSize: 14,
            }}
          >
            {item?.request?.content?.title}
          </Text>
          <Text
            style={{
              color: theme.primarycolor,
              fontWeight: "bold",
              fontSize: 12,
            }}
          >
            {formattedTime}
          </Text> */}
        </View>
      </TouchableOpacity>
    );
  };

  return (
    // <View>
    //   <FlatList
    //     data={notifications}
    //     renderItem={renderItem}
    //     keyExtractor={(item) => item.request.identifier}
    //     contentContainerStyle={styles.notificationList}
    //   />
    //   {/* <Notification /> */}
    // </View>
    <SafeAreaView
      style={{
        backgroundColor: theme.backgroundColor,
        width: "100%",
        height: "100%",
      }}
    >
      <View style={{ marginHorizontal: 20, marginTop: 10 }}>
        {notifications.length > 0 ? (
          <View>
            <FlatList
              data={notifications}
              renderItem={renderItem}
              keyExtractor={(item, index) => index}
              ListEmptyComponent={() => (
                <View style={styles.emptyContainer}>
                  <Text style={styles.emptyText}>No Notifications</Text>
                </View>
              )}
              ItemSeparatorComponent={() => <View style={{ height: 10 }} />}
            />
          </View>
        ) : (
          <View>
            <Text>No Notifications</Text>
          </View>
        )}
      </View>
      <RBSheet
        ref={refRBSheet}
        height={Dimensions.get("screen").height - 250}
        openDuration={400}
        closeDuration={400}
        closeOnPressMask={true}
        draggable={true}
        customStyles={{
          wrapper: {
            backgroundColor: "rgba(0,0,0,0.5)",
          },
          draggableIcon: {
            backgroundColor: theme.primaryTextColor,
          },
          container: {
            borderTopRightRadius: 12,
            borderTopLeftRadius: 12,
            backgroundColor: theme.backgroundColor,
          },
        }}
      >
        <View>
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              marginHorizontal: 20,
              alignItems: "center",
            }}
          >
            <Text style={{ color: theme?.primaryTextColor, fontSize: 16 }}>
              {selectedNotification?.title}
            </Text>
            <Text style={{ color: theme?.primarycolor }}>
              {selectedNotification?.time}
            </Text>
          </View>
          <View style={{ marginTop: 10, marginHorizontal: 10, gap: 10 }}>
            <Text style={{ color: theme.primaryTextColor, fontSize: 12 }}>
              Message:
            </Text>
            <Text style={{ color: theme?.primaryTextColor, fontSize: 12 }}>
              {selectedNotification?.message}
            </Text>
          </View>
          {selectedNotification?.type == "exchange" && (
            <View style={{ gap: 20, marginTop: 20 }}>
              <View style={{ marginHorizontal: 20 }}>
                <Text style={{ color: theme?.primaryTextColor }}>
                  {selectedNotification?.teacher} wants to Exchange{" "}
                  {selectedNotification?.Subject} lecture of{" "}
                  {selectedNotification?.class}, Romm No:{" "}
                  {selectedNotification?.roomNo}
                </Text>
              </View>
              <View
                style={{
                  width: "60%",
                  marginHorizontal: "auto",
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <Button title="Approve" onPress={handleApproveRequest} />
                <Button
                  title="Reject"
                  color="red"
                  onPress={handlerejectRequest}
                />
              </View>
            </View>
          )}
        </View>
      </RBSheet>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({});
