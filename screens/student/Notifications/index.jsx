// import {
//   Dimensions,
//   FlatList,
//   SafeAreaView,
//   StyleSheet,
//   Text,
//   TouchableOpacity,
//   View,
// } from "react-native";
// import React, { useEffect, useRef, useState } from "react";
// import Notification from "../../common/Notifications";
// import { useSelector } from "react-redux";
// import { post } from "../../../utils/apis/StudentApis";
// import { useIsFocused, useNavigation } from "@react-navigation/native";
// import { useThemeContext } from "../../../hooks/useTheme";
// import moment from "moment";
// import RBSheet from "react-native-raw-bottom-sheet";

// const notificationData = [
//   {
//     title: "Attendance Marked",
//     time: "08:15AM",
//     message: "Todays attendance marked by Ms,Shayli",
//   },
//   {
//     title: "Attendance Marked",
//     time: "08:15AM",
//     message: "Todays attendance marked by Ms,Shayli",
//   },
// ];

// export default function StudentNotification() {
//   const [notifications, setNotifications] = useState([]);
//   const userData = useSelector((state) => state?.login?.user);
//   const userId = userData?.id;
//   const navigation = useNavigation();
//   const [selectedNotification, setSelectedNotification] = useState();
//   const [isNotificationSelected, setIsNotificationSeleted] = useState(false);
//   const refRBSheet = useRef();
//   const isFocused = useIsFocused();
//   const { theme } = useThemeContext();

//   useEffect(() => {
//     if (selectedNotification) {
//       refRBSheet?.current?.open();
//     }
//   }, [selectedNotification]);

//   const fetchAllNotifications = async () => {
//     try {
//       // setRefreshing(true);
//       // setIsLoading(true);
//       const response = await post("notiifcation/get", {
//         id: userId,
//       });
//       if (response?.errCode == -1) {
//         setNotifications(response?.data);
//         console.log(`Notifications`, response?.data);
//         // setRefreshing(false);
//         // setIsLoading(false);
//       } else {
//         setNotifications([]);
//         // setRefreshing(false);
//         // setIsLoading(false);
//       }
//     } catch (error) {
//       console.log(`error while fetching Notifications`, error);
//       // setRefreshing(false);
//       // setIsLoading(false);
//     } finally {
//       // setRefreshing(false);
//       // setIsLoading(false);
//     }
//   };

//   useEffect(() => {
//     // setNotifications(notificationData);
//     fetchAllNotifications();
//   }, []);

//   const ReadNotification = async (item) => {
//     console.log(`Notification selected`, item);
//     try {
//       console.log(`Notification selected`, item);
//       // setExchangeRequestId(item?.exchangeRequestId);
//       setSelectedNotification(item);
//       setIsNotificationSeleted(true);
//       refRBSheet?.current?.open();
//       const updatedNotifications = notifications.map((notification) => {
//         if (notification?.id === item?.id) {
//           return { ...notification, seen: true };
//         }
//         return notification;
//       });
//       console.log(`UpdatedNotifications`, updatedNotifications);
//       setNotifications(updatedNotifications);
//       const Notificationseen = notifications.find(
//         (notification) => notification.id == item?.id
//       );
//       const response = await post("notiifcation/seen", {
//         notificationId: Notificationseen?.id,
//         userId: userId,
//       });
//       console.log(response);
//     } catch (error) {
//       console.error("Failed to mark notification as seen:", item);
//     }
//   };

//   const renderNotifications = ({ item }) => {
//     const formattedTime = moment(item?.sentAt).format("h:mm A");
//     return (
//       <TouchableOpacity
//         style={{ gap: 2 }}
//         onPress={() => {
//           ReadNotification(item);
//         }}
//         // key={index}
//       >
//         <View
//           style={{
//             display: "flex",
//             flexDirection: "row",
//             justifyContent: "space-between",
//             alignItems: "center",
//           }}
//         >
//           <View style={{ width: "80%" }}>
//             <Text
//               style={{
//                 color: theme.primaryTextColor,
//                 fontWeight: "bold",
//                 fontSize: 14,
//               }}
//             >
//               {item?.title}
//             </Text>
//             <Text
//               style={{
//                 color: theme.secondaryTextColor,
//                 fontSize: 12,
//               }}
//             >
//               {item?.body}
//             </Text>
//           </View>
//           <View
//             style={{
//               width: "20%",
//               display: "flex",
//               alignItems: "center",
//             }}
//           >
//             {!item?.seen && (
//               <View
//                 style={{
//                   backgroundColor: theme.primarycolor,
//                   borderRadius: 10,
//                   width: 20,
//                   height: 20,
//                   justifyContent: "center",
//                   alignItems: "center",
//                 }}
//               >
//                 <Text
//                   style={{
//                     color: "white",
//                     fontSize: 12,
//                     fontWeight: "bold",
//                   }}
//                 >
//                   1
//                 </Text>
//               </View>
//             )}
//             <Text
//               style={{
//                 color: theme.primarycolor,
//                 fontWeight: "bold",
//                 fontSize: 12,
//               }}
//             >
//               {formattedTime}
//             </Text>
//           </View>
//         </View>
//       </TouchableOpacity>
//     );
//   };

//   return (
//     <View>
//       <SafeAreaView
//         style={{
//           backgroundColor: theme.backgroundColor,
//           width: "100%",
//           height: "100%",
//         }}
//       >
//         <View style={{ marginHorizontal: 20, marginTop: 10 }}>
//           {notifications.length > 0 ? (
//             <View>
//               <FlatList
//                 data={notifications}
//                 renderItem={renderNotifications}
//                 keyExtractor={(item, index) => index.toString()}
//                 ListEmptyComponent={() => (
//                   <View style={styles.emptyContainer}>
//                     <Text style={styles.emptyText}>No Notifications</Text>
//                   </View>
//                 )}
//                 ItemSeparatorComponent={() => <View style={{ height: 10 }} />}
//               />
//             </View>
//           ) : (
//             <View>
//               <Text>No Notifications</Text>
//             </View>
//           )}
//         </View>
//         {isNotificationSelected && (
//           <RBSheet
//             ref={refRBSheet}
//             height={Dimensions.get("screen").height - 250}
//             openDuration={400}
//             closeDuration={400}
//             closeOnPressMask={true}
//             draggable={true}
//             customStyles={{
//               wrapper: {
//                 backgroundColor: "rgba(0,0,0,0.5)",
//               },
//               draggableIcon: {
//                 backgroundColor: theme.primaryTextColor,
//               },
//               container: {
//                 borderTopRightRadius: 12,
//                 borderTopLeftRadius: 12,
//                 backgroundColor: theme.backgroundColor,
//               },
//             }}
//           >
//             <View>
//               <View
//                 style={{
//                   display: "flex",
//                   flexDirection: "row",
//                   justifyContent: "space-between",
//                   marginHorizontal: 20,
//                   alignItems: "center",
//                 }}
//               >
//                 <Text style={{ color: theme?.primaryTextColor, fontSize: 16 }}>
//                   {selectedNotification?.title}
//                 </Text>
//                 <Text style={{ color: theme?.primarycolor }}>
//                   {moment(selectedNotification?.sentAt).format("h:mm A")}
//                 </Text>
//               </View>
//               <View style={{ marginTop: 10, marginHorizontal: 10, gap: 10 }}>
//                 <Text style={{ color: theme.primaryTextColor, fontSize: 12 }}>
//                   Message:
//                 </Text>
//                 <Text style={{ color: theme?.primaryTextColor, fontSize: 12 }}>
//                   {selectedNotification?.body}
//                 </Text>
//               </View>
//               {selectedNotification?.type == "exchange" && (
//                 <View style={{ gap: 20, marginTop: 20 }}>
//                   <View style={{ marginHorizontal: 20 }}>
//                     <Text style={{ color: theme?.primaryTextColor }}>
//                       {selectedNotification?.teacher} wants to Exchange{" "}
//                       {selectedNotification?.Subject} lecture of{" "}
//                       {selectedNotification?.class}, Romm No:{" "}
//                       {selectedNotification?.roomNo}
//                     </Text>
//                   </View>
//                   <View
//                     style={{
//                       width: "60%",
//                       marginHorizontal: "auto",
//                       display: "flex",
//                       flexDirection: "row",
//                       justifyContent: "space-between",
//                       alignItems: "center",
//                     }}
//                   >
//                     <Button title="Approve" onPress={handleApproveRequest} />
//                     <Button
//                       title="Reject"
//                       color="red"
//                       onPress={handlerejectRequest}
//                     />
//                   </View>
//                 </View>
//               )}
//             </View>
//           </RBSheet>
//         )}
//       </SafeAreaView>
//     </View>
//   );
// }

// const styles = StyleSheet.create({});
// {
//   /* <Notification Notifications={notifications} /> */
// }
import {
  ActivityIndicator,
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
import Icon from "react-native-vector-icons/Ionicons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import moment from "moment";
import RBSheet from "react-native-raw-bottom-sheet";
import { post } from "../../../utils/apis/TeacherApis/login";
import { useSelector } from "react-redux";
import { MaterialIcons } from "@expo/vector-icons";

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
  const [selectedIds, setSelectedIds] = useState([]);
  const [loadingMore, setLoadingMore] = useState(false);
  const [hasMoreData, setHasMoreData] = useState(true);
  const [page, setPage] = useState(1); // Track the current page
  const [perPage] = useState(10); // Number of items to fetch per page

  const handleLoadMore = async () => {
    if (loadingMore || !hasMoreData) return;

    setLoadingMore(true);

    try {
      const newNotifications = await loadMoreNotifications(page, perPage);

      if (newNotifications.length > 0) {
        setNotifications((prevData) => [...prevData, ...newNotifications]);
        setPage((prevPage) => prevPage + 1); // Increment page number for the next call
      } else {
        setHasMoreData(false); // No more data available
      }
    } catch (error) {
      console.error("Error loading more notifications:", error);
    } finally {
      setLoadingMore(false);
    }
  };

  const loadMoreNotifications = async (page, perPage) => {
    try {
      const response = await post("notiifcation/get", {
        id: userId,
        page: page,
        size: perPage,
      });
      if (response?.errCode == -1) {
        const data = response.data;
        return data;
      } else {
        console.log(response?.errMsg);
        return [];
      }
    } catch (error) {
      console.log(error);
    } // Adjust according to your API response
  };

  const handleLongPress = (id) => {
    if (!selectedIds.includes(id)) {
      setSelectedIds((prevSelectedIds) => [...prevSelectedIds, id]);
    }
  };

  const handleTap = (id) => {
    setSelectedIds((prevSelectedIds) =>
      prevSelectedIds.includes(id)
        ? prevSelectedIds.filter((selectedId) => selectedId !== id)
        : [...prevSelectedIds, id]
    );
  };

  const isSelected = (id) => selectedIds.includes(id);

  console.log(`userDatta in Notification`, userData?.id);

  const refRBSheet = useRef();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Entypo
            name="chevron-thin-left"
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
            Settings
          </Text>
        </View>
      ),

      headerRight: () => (
        <View style={{ marginRight: 20 }}>
          {selectedIds.length > 0 && (
            <TouchableOpacity
              onPress={() => {
                handleDeleteNotifications();
              }}
            >
              <Feather name="trash-2" size={20} color={"red"} />
            </TouchableOpacity>
          )}
        </View>
      ),
      headerStyle: {
        backgroundColor: theme.backgroundColor,
      },
      headerTitleAlign: "center",
      headerTintColor: theme.backgroundColor,
    });
  }, [navigation, theme]);

  const onRefresh = useCallback(() => {
    // fetchAllNotifications();
  }, []);

  useEffect(() => {
    handleLoadMore();
  }, [isFocused]);

  const renderNotification = ({ item }) => {
    let formattedDate = "";
    const NotificationDate = moment(item?.sentAt);
    const today = moment().startOf("day");

    if (NotificationDate.isSame(today, "day")) {
      formattedDate = moment(item?.sentAt).format("h:mm A");
    } else {
      formattedDate = NotificationDate.format("MMM DD");
    }

    return (
      <TouchableOpacity
        style={{
          gap: 2,
          backgroundColor: theme.unselectedBackgroundColor,
          borderRadius: 8,
          padding: 10,
          flexDirection: "row",
          alignItems: "center",
          borderBottomWidth: 1,
          borderBottomColor: "#ccc",
          borderBottomColor: theme.borderColor,
          height: 60, // Fixed height for all notifications
          width: "95%",
          marginHorizontal: "auto",
        }}
        onPress={() => ReadNotification(item)}
      >
        <View style={{ flex: 1 }}>
          <Text
            style={{
              color: theme.primaryTextColor,
              fontWeight: "bold",
              fontSize: 14,
              marginBottom: 4,
            }}
            numberOfLines={1}
            ellipsizeMode="tail"
          >
            {item?.title}
          </Text>
          <Text
            style={{
              color: theme.secondaryTextColor,
              fontSize: 12,
              marginBottom: 4,
            }}
            numberOfLines={1}
            ellipsizeMode="tail"
          >
            {item?.body}
          </Text>
        </View>
        <View
          style={{
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
              marginTop: 4,
            }}
          >
            {formattedDate}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };

  const handleDeleteNotifications = async () => {
    try {
      const response = await post("notiifcation/delete", {
        notificationIds: selectedIds,
      });
      if (response?.errCode == -1) {
        Alert.alert("Notification deleted successfully");
        // fetchAllNotifications();
        setSelectedIds([]);
      } else {
        console.log(response?.errMsg);
      }
    } catch (error) {
      console.log(`error in handleDeleteNotifications `, error);
    }
  };

  // const fetchAllNotifications = async () => {
  //   try {
  //     setRefreshing(true);
  //     setIsLoading(true);
  //     const response = await post("notiifcation/get", {
  //       id: userId,
  //     });
  //     if (response?.errCode == -1) {
  //       // const latestNotification = response?.data?.reverse();
  //       setNotifications(response?.data);
  //       setRefreshing(false);
  //       setIsLoading(false);
  //     } else {
  //       setNotifications([]);
  //       setRefreshing(false);
  //       setIsLoading(false);
  //     }
  //   } catch (error) {
  //     console.log(`error while fetching Notifications`, error);
  //     setRefreshing(false);
  //     setIsLoading(false);
  //   } finally {
  //     setRefreshing(false);
  //     setIsLoading(false);
  //   }
  // };

  const ReadNotification = async (item) => {
    console.log(`Notification selected`, item);
    try {
      console.log(`Notification selected`, item?.data?.exchangeRequestId);
      setExchangeRequestId(item?.data?.exchangeRequestId);
      setSelectedNotification(item);
      setIsNotificationSeleted(true);
      refRBSheet?.current?.open();
      console.log(
        ` if (notification?.id === item?.id) {
          return { ...notification, seen: true };
        }`,
        notifications
      );

      setNotifications((prevData) =>
        prevData.map((notification) =>
          notification.id === item.id
            ? { ...notification, seen: true }
            : notification
        )
      );
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
        // fetchAllNotifications();
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

  const renderEmptyComponent = () => (
    <View
      style={{
        justifyContent: "center",
        alignItems: "center",
        height: "100%",
      }}
    >
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
  );

  return (
    <SafeAreaView
      style={{
        backgroundColor: theme.backgroundColor,
        flex: 1,
      }}
    >
      <View style={{ flex: 1, marginBottom: 30 }}>
        <FlatList
          data={notifications}
          renderItem={renderNotification}
          keyExtractor={(item, index) => index.toString()}
          ItemSeparatorComponent={() => <View style={{ height: 10 }} />}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
          onEndReached={handleLoadMore}
          onEndReachedThreshold={0.5}
          ListFooterComponent={() =>
            loadingMore && (
              <ActivityIndicator size="large" color={theme.primarycolor} />
            )
          }
          ListEmptyComponent={renderEmptyComponent}
        />
      </View>

      {/* Delete Notification */}
      {/* <ScrollView
        style={{
          marginTop: 10,
          height: "100%",
          width: "95%",
          marginHorizontal: "auto",
        }}
        ItemSeparatorComponent={() => <View style={{ height: 10 }} />}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        {notifications.length > 0 ? (
          <View>
            {notifications.map((item, index) => {
              let formattedDate = "";
              const NotificationDate = moment(item?.sentAt);
              const today = moment().startOf("day");

              if (NotificationDate.isSame(today, "day")) {
                formattedDate = moment(item?.sentAt).format("h:mm A");
              } else {
                formattedDate = NotificationDate.format("MMM DD");
              }

              return (
                <TouchableOpacity
                  key={index}
                  style={{
                    gap: 2,
                    backgroundColor: isSelected(item.id)
                      ? theme.selectedBackgroundColor
                      : theme.unselectedBackgroundColor,

                    padding: 10,
                    flexDirection: "row",
                    alignItems: "center",
                    marginTop: 2,
                    borderBottomColor: theme.borderColor,
                    height: 60,
                    borderBottomWidth: 1,
                    borderBottomColor: "#ccc",
                  }}
                  onLongPress={() => handleLongPress(item.id)}
                  onPress={() => {
                    if (selectedIds.length > 0) {
                      handleTap(item.id);
                    } else {
                      ReadNotification(item);
                    }
                  }}
                >
                  {isSelected(item.id) && (
                    <MaterialIcons
                      name="check-circle"
                      size={24}
                      color={theme.primarycolor}
                      style={{ marginRight: 10 }}
                    />
                  )}
                  <View style={{ flex: 1 }}>
                    <Text
                      style={{
                        color: theme.primaryTextColor,
                        fontWeight: "bold",
                        fontSize: 14,
                        marginBottom: 4,
                      }}
                      numberOfLines={1}
                      ellipsizeMode="tail"
                    >
                      {item?.title}
                    </Text>
                    <Text
                      style={{
                        color: theme.secondaryTextColor,
                        fontSize: 12,
                        marginBottom: 4,
                      }}
                      numberOfLines={1}
                      ellipsizeMode="tail"
                    >
                      {item?.body}
                    </Text>
                  </View>
                  <View
                    style={{
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
                        marginTop: 4,
                      }}
                    >
                      {formattedDate}
                    </Text>
                  </View>
                </TouchableOpacity>
              );
            })}
          </View>
        ) : (
          <View
            style={{
              justifyContent: "center",
              alignItems: "center",
              height: "100%",
            }}
          >
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
      </ScrollView> */}
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
        <ScrollView>
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
          {selectedNotification?.title == "Timetable Exchange Request" &&
            selectedNotification?.data?.Exchangestatus == "pending" && (
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
                    width: "90%",
                    marginHorizontal: "auto",
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  {/* <Button title="Approve" onPress={handleApproveRequest} /> */}
                  <TouchableOpacity
                    style={{
                      height: 38,
                      width: "45%",
                      backgroundColor: theme.primarycolor,
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      borderRadius: 5,
                    }}
                    onPress={() => {
                      handleApproveRequest();
                    }}
                  >
                    <Text
                      style={{
                        color: "#ffffff",
                        fontSize: 12,
                      }}
                    >
                      Approve
                    </Text>
                  </TouchableOpacity>
                  {/* <Button
                    title="Reject"
                    color="red"
                    onPress={() => {
                      handlerejectRequest();
                    }}
                  /> */}
                  <TouchableOpacity
                    style={{
                      height: 38,
                      width: "45%",
                      backgroundColor: "red",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      borderRadius: 5,
                    }}
                    onPress={() => {
                      handlerejectRequest();
                    }}
                  >
                    <Text
                      style={{
                        color: "#ffffff",
                        fontSize: 12,
                      }}
                    >
                      Reject
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            )}
        </ScrollView>
      </RBSheet>
    </SafeAreaView>
  );
}
