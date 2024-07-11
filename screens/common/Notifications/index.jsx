import {
  Button,
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
import RBSheet from "react-native-raw-bottom-sheet";
import { Subjects } from "../../../svg/subjects";

const notificationData = [
  {
    title: "Attendance Marked",
    time: "08:15AM",
    message: "Todays attendance marked by Ms,Shayli",
    type: "exchange",
    teacher: "Abhilash pal",
    class: "FYJC",
    roomNo: "201",
    Subject: "Biology",
  },
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
  {
    title: "Attendance Marked",
    time: "08:15AM",
    message: "Todays attendance marked by Ms,Shayli",
    type: "exchange",
    teacher: "Abhilash pal",
    class: "FYJC",
    roomNo: "201",
    Subject: "Biology",
  },
];

export default function Notification() {
  const { theme } = useThemeContext();
  const navigation = useNavigation();
  const [notifications, setNotifications] = useState([]);
  const [selectedNotification, setSelectedNotification] = useState();
  const [isNotificationSelected, setIsNotificationSeletd] = useState(false);

  const refRBSheet = useRef();
  const isFocused = useIsFocused();

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
            Notification
          </Text>
        </View>
      ),

      headerRight: () => (
        <TouchableOpacity style={{ marginRight: 10 }}>
          <TouchableOpacity
            onPress={() => {
              navigation.goBack();
            }}
          >
            <Entypo name="cross" size={20} color={theme.secondaryTextColor} />
          </TouchableOpacity>
        </TouchableOpacity>
      ),
      headerStyle: {
        backgroundColor: theme.backgroundColor,
      },
      headerTitleAlign: "center",
      headerTintColor: theme.backgroundColor,
    });
  }, [navigation, theme]);

  useEffect(() => {
    setNotifications(notificationData);
  }, [isFocused]);

  useEffect(() => {
    if (selectedNotification) {
      refRBSheet?.current?.open();
    }
  }, [selectedNotification]);

  const handleApproveRequest = () => {};

  const handlerejectRequest = () => {};

  const renderNotifications = ({ item }) => {
    return (
      <TouchableOpacity
        style={{ gap: 2 }}
        onPress={() => {
          setSelectedNotification(item);
          setIsNotificationSeletd(true);
          refRBSheet?.current?.open();
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
          <Text
            style={{
              color: theme.primaryTextColor,
              fontWeight: "bold",
              fontSize: 14,
            }}
          >
            {item.title}
          </Text>
          <Text
            style={{
              color: theme.primarycolor,
              fontWeight: "bold",
              fontSize: 12,
            }}
          >
            {item.time}
          </Text>
        </View>
        <Text
          style={{
            color: theme.secondaryTextColor,
            fontSize: 12,
          }}
        >
          {item.message}
        </Text>
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
      <View style={{ marginHorizontal: 20 , marginTop:10 }}>
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
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({});
