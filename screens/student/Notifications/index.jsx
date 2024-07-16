import {
  Dimensions,
  FlatList,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useRef, useState } from "react";
import Notification from "../../common/Notifications";
import { useSelector } from "react-redux";
import { post } from "../../../utils/apis/StudentApis";
import { useIsFocused, useNavigation } from "@react-navigation/native";
import { useThemeContext } from "../../../hooks/useTheme";
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

export default function StudentNotification() {
  const [notifications, setNotifications] = useState([]);
  const userData = useSelector((state) => state?.login?.user);
  const userId = userData?.id;
  const navigation = useNavigation();
  const [selectedNotification, setSelectedNotification] = useState();
  const [isNotificationSelected, setIsNotificationSeleted] = useState(false);
  const refRBSheet = useRef();
  const isFocused = useIsFocused();
  const { theme } = useThemeContext();

  useEffect(() => {
    if (selectedNotification) {
      refRBSheet?.current?.open();
    }
  }, [selectedNotification]);

  const fetchAllNotifications = async () => {
    try {
      // setRefreshing(true);
      // setIsLoading(true);
      const response = await post("notiifcation/get", {
        id: userId,
      });
      if (response?.errCode == -1) {
        setNotifications(response?.data);
        console.log(`Notifications`, response?.data);
        // setRefreshing(false);
        // setIsLoading(false);
      } else {
        setNotifications([]);
        // setRefreshing(false);
        // setIsLoading(false);
      }
    } catch (error) {
      console.log(`error while fetching Notifications`, error);
      // setRefreshing(false);
      // setIsLoading(false);
    } finally {
      // setRefreshing(false);
      // setIsLoading(false);
    }
  };

  useEffect(() => {
    // setNotifications(notificationData);
    fetchAllNotifications();
  }, []);

  const ReadNotification = async (item) => {
    console.log(`Notification selected`, item);
    try {
      console.log(`Notification selected`, item);
      // setExchangeRequestId(item?.exchangeRequestId);
      setSelectedNotification(item);
      setIsNotificationSeleted(true);
      refRBSheet?.current?.open();
      const updatedNotifications = notifications.map((notification) => {
        if (notification?.id === item?.id) {
          return { ...notification, seen: true };
        }
        return notification;
      });
      console.log(`UpdatedNotifications`, updatedNotifications);
      setNotifications(updatedNotifications);
      const Notificationseen = notifications.find(
        (notification) => notification.id == item?.id
      );
      const response = await post("notiifcation/seen", {
        notificationId: Notificationseen?.id,
        userId: userId,
      });
      console.log(response);
    } catch (error) {
      console.error("Failed to mark notification as seen:", item);
    }
  };

  const renderNotifications = ({ item }) => {
    const formattedTime = moment(item?.sentAt).format("h:mm A");
    return (
      <TouchableOpacity
        style={{ gap: 2 }}
        onPress={() => {
          ReadNotification(item);
        }}
        // key={index}
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
              {item?.title}
            </Text>
            <Text
              style={{
                color: theme.secondaryTextColor,
                fontSize: 12,
              }}
            >
              {item?.body}
            </Text>
          </View>
          <View
            style={{
              width: "20%",
              display: "flex",
              alignItems: "center",
            }}
          >
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
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View>
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
                renderItem={renderNotifications}
                keyExtractor={(item, index) => index.toString()}
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
        {isNotificationSelected && (
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
                  {moment(selectedNotification?.sentAt).format("h:mm A")}
                </Text>
              </View>
              <View style={{ marginTop: 10, marginHorizontal: 10, gap: 10 }}>
                <Text style={{ color: theme.primaryTextColor, fontSize: 12 }}>
                  Message:
                </Text>
                <Text style={{ color: theme?.primaryTextColor, fontSize: 12 }}>
                  {selectedNotification?.body}
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
        )}
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({});
{
  /* <Notification Notifications={notifications} /> */
}
