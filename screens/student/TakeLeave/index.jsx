import {
  Alert,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useLayoutEffect, useState } from "react";
import { useThemeContext } from "../../../hooks/useTheme";
import moment from "moment/moment";
import { useNavigation } from "@react-navigation/native";
import { FontAwesome6, Feather, Ionicons } from "react-native-vector-icons";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { useTheme } from "react-native-paper";

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
  const { colors } = useTheme();

  useLayoutEffect(() => {
    navigation.setOptions({
      header: () => {
        return (
          <View
            style={{
              paddingLeft: 20,
              paddingRight: 20,
              paddingTop: 20,
              paddingBottom: 10,
              backgroundColor: theme.backgroundColor,
            }}
          >
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                marginTop: 40,
              }}
            >
              <TouchableOpacity onPress={() => navigation.openDrawer()}>
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
                  marginLeft: 10,
                  color: theme.primaryTextColor,
                  fontWeight: "bold",
                  fontFamily: "Poppins_600SemiBold",
                }}
              >
                Take Leave
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

  return (
    <SafeAreaView
      style={{ backgroundColor: theme.backgroundColor, height: "100%" }}
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
            style={{
              borderBottomWidth: 1,
              borderBottomColor: "#ccc",
              minHeight: 100,
              textAlignVertical: "top",
              paddingTop: 10,
            }}
            placeholder="Ex: Need to attend family function."
            placeholderTextColor={theme?.secondaryTextColor}
          />
        </View>
        <View>
          <TouchableOpacity
            style={{
              height: 40,
              backgroundColor: theme.primarycolor,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              borderRadius: 5,
            }}
            onPress={() => {
              Alert.alert(Today);
            }}
          >
            <Text
              style={{ color: "#FFFFFF", fontSize: 14, fontWeight: "semibold" }}
            >
              TAKE LEAVE
            </Text>
          </TouchableOpacity>
        </View>
      </View>

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
