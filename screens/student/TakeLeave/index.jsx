import {
  Alert,
  RefreshControl,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useCallback, useLayoutEffect, useState } from "react";
import { useThemeContext } from "../../../hooks/useTheme";
import moment from "moment/moment";
import { useNavigation } from "@react-navigation/native";
import { FontAwesome6, Feather, Ionicons } from "react-native-vector-icons";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { useTheme } from "react-native-paper";
import { post } from "../../../utils/apis/StudentApis";
import { useSelector } from "react-redux";

export default function StudentTakeLeave() {
  const navigation = useNavigation();
  const { theme } = useThemeContext();
  const Today = moment().format("YYYY-MM-DD");
  console.log(Today);
  console.log(`ttoddayyy`, new Date());
  const [startDate, setStartdate] = useState(Today);
  const [EndDate, setEndDate] = useState(Today);
  const [isStartDatePickerVisible, setIsStartDatePickerVisible] =
    useState(false);
  const [isEndDatePickerVisible, setIsEndDatePickerVisible] = useState(false);
  const [minimumEndDate, setMinimumEndDate] = useState(null);
  const [refreshing, setRefreshing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [reason, setReason] = useState(null);
  const [reasonError, setreasonError] = useState(false);
  const { colors } = useTheme();
  const userData = useSelector((state) => state?.login?.user);
  const studentId = userData?.studentId;

  useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <TouchableOpacity
          onPress={() => navigation.openDrawer()}
          style={{ marginLeft: 20 }}
        >
          <Ionicons name="menu" size={25} color={theme.secondaryTextColor} />
        </TouchableOpacity>
      ),

      headerTitle: () => (
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Text
            numberOfLines={1}
            style={{
              fontSize: 16,
              marginLeft: 10,
              color: theme.primaryTextColor,
              fontWeight: "bold",
              fontFamily: "Poppins_600SemiBold",
            }}
          >
            Take Leave
          </Text>
        </View>
      ),

      headerRight: () => (
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            width: "20%",
            justifyContent: "flex-end",
            marginRight: 20,
          }}
        >
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("Notification");
            }}
          >
            <Feather name="bell" size={20} color={theme.secondaryTextColor} />
          </TouchableOpacity>
        </View>
      ),
      headerStyle: {
        backgroundColor: theme.backgroundColor,
      },
      headerTitleAlign: "center", // Adjust alignment for header title (if needed)
      headerTintColor: "#000000", // Text color for back button and header title
    });
  }, [navigation, theme]);

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

  const hideStartDatePicker = () => {
    setIsStartDatePickerVisible(false);
  };

  const handleEndDatePicker = () => {
    setIsEndDatePickerVisible(false);
  };

  const handleStartDateConfirm = (date) => {
    setStartdate(moment(date).format("YYYY-MM-DD"));
    console.log(`datttett`, date);
    setMinimumEndDate(date);
    setIsStartDatePickerVisible(false);
  };

  const handleEndDateConfirm = (date) => {
    setEndDate(moment(date).format("YYYY-MM-DD"));
    setIsEndDatePickerVisible(false);
  };

  const handleSubmitLeave = async () => {
    try {
      if (reason == null) {
        setreasonError(true);
        return;
      }

      const response = await post("leave/create", {
        studentId: studentId,
        startDate: startDate,
        endDate: EndDate,
        reason: reason,
      });

      if (response?.errCode == -1) {
        Alert.alert("Leave Approved successfully");
        navigation.navigate("StudentHome");
      } else {
        Alert.alert("error while Approving Leave");
      }
      console.log(`response from Leave `, response);
    } catch (error) {
      console.log(`error from handleSubmitLeave`, error);
    }
  };

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setStartdate(Today);
    setEndDate(Today);
    setReason(null);
    setTimeout(() => {
      setRefreshing(false);
    }, 500);
  }, []);

  return (
    <SafeAreaView
      style={{ backgroundColor: theme.backgroundColor, height: "100%" }}
    >
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        style={{ height: "100%" }}
      >
        <View
          style={{
            marginHorizontal: 20,
            display: "flex",
            justifyContent: "space-between",
            height: "90%",
          }}
        >
          <View>
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-evenly",
                alignItems: "center",
                gap: 20,
                marginVertical: 20,
                width: "100%",
              }}
            >
              <TouchableOpacity
                style={{
                  height: 70,
                  borderColor: theme.primarycolor,
                  borderWidth: 1,
                  width: "30%",
                  borderRadius: 8,
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  backgroundColor: hexToRgba(theme.primarycolor, 0.15),
                }}
                onPress={() => {
                  setStartdate(Today);
                  setEndDate(Today);
                }}
              >
                <Text
                  style={{
                    color: theme.primaryTextColor,
                    fontSize: 14,
                    fontWeight: "500",
                  }}
                >
                  Today
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  height: 70,
                  borderColor: theme.primarycolor,
                  borderWidth: 1,
                  width: "30%",
                  borderRadius: 8,
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  backgroundColor: hexToRgba(theme.primarycolor, 0.15),
                }}
                onPress={() => {
                  const Tommorow = moment(Today)
                    .add(1, "days")
                    .format("YYYY-MM-DD");

                  setStartdate(Tommorow);
                  setEndDate(Tommorow);
                }}
              >
                <Text
                  style={{
                    color: theme.primaryTextColor,
                    fontSize: 14,
                    fontWeight: "500",
                  }}
                >
                  Tommorow
                </Text>
              </TouchableOpacity>
              <View
                style={{
                  height: 70,
                  borderColor: theme.primarycolor,
                  borderWidth: 1,
                  width: "30%",
                  borderRadius: 8,
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  backgroundColor: hexToRgba(theme.primarycolor, 0.15),
                }}
              >
                <Text
                  style={{
                    color: theme.primaryTextColor,
                    fontSize: 14,
                    fontWeight: "500",
                  }}
                >
                  Select dates
                </Text>
              </View>
            </View>
            <View
              style={{
                height: 70,
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <TouchableOpacity
                style={{
                  width: "40%",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "flex-start",
                  paddingLeft: 5,
                }}
                onPress={() => {
                  setIsStartDatePickerVisible(true);
                }}
              >
                <Text
                  style={{
                    color: theme.primaryTextColor,
                    fontWeight: "bold",
                    fontSize: 14,
                  }}
                >
                  start Date
                </Text>
                <Text
                  style={{
                    color: theme.primarycolor,
                    fontWeight: "semibold",
                    fontSize: 12,
                  }}
                  x
                >
                  {moment(startDate).format("DD MMMM")}
                </Text>
              </TouchableOpacity>
              <View style={{ width: "20%" }}>
                <Text
                  style={{
                    color: theme.primarycolor,
                    fontWeight: "semibold",
                    fontSize: 12,
                  }}
                >
                  {moment(EndDate).diff(moment(startDate), "days") > 0
                    ? `${moment(EndDate).diff(moment(startDate), "days")} days`
                    : `1 day`}
                </Text>
              </View>
              <TouchableOpacity
                style={{
                  width: "40%",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "flex-end",
                  paddingRight: 5,
                }}
                onPress={() => {
                  setIsEndDatePickerVisible(true);
                }}
              >
                <Text
                  style={{
                    color: theme.primaryTextColor,
                    fontWeight: "bold",
                    fontSize: 14,
                  }}
                >
                  End Date
                </Text>
                <Text
                  style={{
                    color: theme.primarycolor,
                    fontWeight: "semibold",
                    fontSize: 12,
                  }}
                >
                  {moment(EndDate).format("DD MMMM")}
                </Text>
              </TouchableOpacity>
            </View>
            <View style={{ borderBottomWidth: 1, borderBottomColor: "#ccc" }}>
              <Text
                style={{ color: theme.primaryTextColor, paddingVertical: 10 }}
              >
                Reason for Leave{" "}
              </Text>
            </View>
            <TextInput
              numberOfLines={4}
              multiline={true}
              value={reason}
              style={{
                borderBottomWidth: 1,
                borderBottomColor: "#ccc",
                minHeight: 100,
                textAlignVertical: "top",
                paddingTop: 10,
              }}
              onChangeText={(text) => {
                setReason(text);
                setreasonError(false);
              }}
              placeholder="Ex: Need to attend family function."
              placeholderTextColor={theme?.secondaryTextColor}
            />
            {reasonError && (
              <Text style={{ color: "red", fontSize: 14 }}>
                This feild is required
              </Text>
            )}
          </View>
          <View>
            <TouchableOpacity
              style={{
                marginTop: 40,
                height: 40,
                backgroundColor: theme.primarycolor,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                borderRadius: 5,
              }}
              onPress={() => {
                handleSubmitLeave();
              }}
            >
              <Text
                style={{
                  color: "#FFFFFF",
                  fontSize: 14,
                  fontWeight: "semibold",
                }}
              >
                TAKE LEAVE
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>

      <DateTimePickerModal
        isVisible={isStartDatePickerVisible}
        mode="date"
        textColor={colors.text}
        minimumDate={new Date()}
        date={startDate ? new Date(startDate) : new Date()}
        onConfirm={handleStartDateConfirm}
        onCancel={hideStartDatePicker}
      />
      <DateTimePickerModal
        isVisible={isEndDatePickerVisible}
        mode="date"
        textColor={colors.text}
        minimumDate={minimumEndDate ? minimumEndDate : new Date()}
        date={EndDate ? new Date(EndDate) : new Date()}
        onConfirm={handleEndDateConfirm}
        onCancel={handleEndDatePicker}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({});
