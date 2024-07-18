import {
  Alert,
  Button,
  Dimensions,
  RefreshControl,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
// import { theme } from "../../../theming";
import { FlatList } from "react-native";
import { useIsFocused, useNavigation } from "@react-navigation/native";
import { Feather, Ionicons, Entypo } from "react-native-vector-icons";
import { useThemeContext } from "../../../hooks/useTheme";
import Notification from "../../common/Notifications";
import AsyncStorage from "@react-native-async-storage/async-storage";
import moment from "moment";
import RBSheet from "react-native-raw-bottom-sheet";
import { post } from "../../../utils/apis/TeacherApis/login";
import { useSelector } from "react-redux";

export default function TeacherNotification() {
  const isFocused = useIsFocused();
  const { theme } = useThemeContext();
  const navigation = useNavigation();
  const [notifications, setNotifications] = useState([]);
  const [selectedNotification, setSelectedNotification] = useState();
  const [isNotificationSelected, setIsNotificationSeleted] = useState(false);
  const [exchangeRequestId, setExchangeRequestId] = useState(null);
  const [refreshing, setRefreshing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const userData = useSelector((state) => state?.login?.user);
  const userId = userData?.id;

  console.log(`userDatta in Notification`, userData?.id);

  const refRBSheet = useRef();

  // useEffect(() => {
  //   setNotifications(notificationData);
  // }, []);

  // const fetchNotifications = async () => {
  //   try {
  //     setRefreshing(true);
  //     setIsLoading(true);
  //     const storedNotifications = await AsyncStorage.getItem("notifications");
  //     console.log(`Notifications`, storedNotifications);

  //     if (storedNotifications) {
  //       const NotificationsArray = JSON.parse(storedNotifications);
  //       const notificationSort = NotificationsArray?.reverse();
  //       setNotifications(notificationSort);
  //       console.log(`Notifications`, storedNotifications);
  //       setRefreshing(false);
  //       setIsLoading(false);
  //     }
  //   } catch (error) {
  //     console.error("Failed to fetch notifications", error);
  //     setRefreshing(false);
  //     setIsLoading(false);
  //   } finally {
  //     setRefreshing(false);
  //     setIsLoading(false);
  //   }
  // };

  const onRefresh = useCallback(() => {
    fetchAllNotifications();
  }, []);

  useEffect(() => {
    // fetchNotifications();
    fetchAllNotifications();
  }, [isFocused]);

  const fetchAllNotifications = async () => {
    try {
      setRefreshing(true);
      setIsLoading(true);
      const response = await post("notiifcation/get", {
        id: userId,
      });
      if (response?.errCode == -1) {
        // const latestNotification = response?.data?.reverse();
        setNotifications(response?.data);
        setRefreshing(false);
        setIsLoading(false);
      } else {
        setNotifications([]);
        setRefreshing(false);
        setIsLoading(false);
      }
    } catch (error) {
      console.log(`error while fetching Notifications`, error);
      setRefreshing(false);
      setIsLoading(false);
    } finally {
      setRefreshing(false);
      setIsLoading(false);
    }
  };

  const ReadNotification = async (item) => {
    console.log(`Notification selected`, item);
    try {
      console.log(`Notification selected`, item?.data?.exchangeRequestId);
      setExchangeRequestId(item?.data?.exchangeRequestId);
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

  const handlerejectRequest = async () => {
    try {
      const response = await post("timetable/reject-exchange", {
        id: exchangeRequestId,
      });
      if (response?.errCode == -1) {
        Alert.alert("Request Rejected Successfully");
        refRBSheet?.current?.close();
      } else if (response?.errCode == 1) {
        Alert.alert(response?.errMsg);
        refRBSheet?.current?.close();
      } else {
        console.log("error");
      }
    } catch (error) {
      console.log(`error form handlerejectRequest`, error);
    }
  };
  const handleApproveRequest = async () => {
    console.log(`handleApproveRequest`, exchangeRequestId);
    try {
      const response = await post("timetable/approve-exchange", {
        id: exchangeRequestId,
      });
      if (response?.errCode == -1) {
        Alert.alert("Request Approved Successfully");
        refRBSheet?.current?.close();
      } else if (response?.errCode == 1) {
        Alert.alert(response?.errMsg);
        refRBSheet?.current?.close();
      } else {
        console.log("error");
      }
    } catch (error) {
      console.log(`error form handlerejectRequest`, error);
    }
  };

  const renderItem = ({ item }) => {
    const formattedTime = moment(item?.sentAt).format("h:mm A");
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
    <SafeAreaView
      style={{
        backgroundColor: theme.backgroundColor,
        width: "100%",
        height: "100%",
      }}
    >
      <ScrollView
        style={{
          marginHorizontal: 20,
          marginTop: 10,
          height: "100%",
          width: "90%",
        }}
        ItemSeparatorComponent={() => <View style={{ height: 10 }} />}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        {notifications.length > 0 ? (
          <View>
            {notifications.map((item, index) => {
              const formattedTime = moment(item?.sentAt).format("h:mm A");
              return (
                <TouchableOpacity
                  style={{ gap: 2 }}
                  onPress={() => {
                    ReadNotification(item);
                  }}
                  key={index}
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
            })}
            {/* <FlatList
              data={notifications}
              renderItem={renderItem}
              keyExtractor={(item, index) => index}
              ListEmptyComponent={() => (
                <View style={styles.emptyContainer}>
                  <Text style={styles.emptyText}>No Notifications</Text>
                </View>
              )}
              ItemSeparatorComponent={() => <View style={{ height: 10 }} />}
              refreshControl={
                <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
              }
            /> */}
          </View>
        ) : (
          <View>
            <Text
              style={{
                fontSize: 20,
                fontFamily: "Poppins_700Bold_Italic",
                textAlign: "center",
              }}
            >
              No Notifications
            </Text>
          </View>
        )}
      </ScrollView>
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
              {selectedNotification?.body}
            </Text>
          </View>
          {selectedNotification?.title == "Timetable Exchange Request" &&
            selectedNotification?.Exchangestatus == "pending" && (
              <View style={{ gap: 20, marginTop: 20 }}>
                <View style={{ marginHorizontal: 20 }}>
                  {/* <Text style={{ color: theme?.primaryTextColor }}>
                  {selectedNotification?.teacher} wants to Exchange{" "}
                  {selectedNotification?.Subject} lecture of{" "}
                  {selectedNotification?.class}, Romm No:{" "}
                  {selectedNotification?.roomNo}
                </Text> */}
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
