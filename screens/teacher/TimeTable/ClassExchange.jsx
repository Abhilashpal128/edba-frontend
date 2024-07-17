import {
  Alert,
  FlatList,
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import { Checkbox, useTheme } from "react-native-paper";
import { AntDesign, EvilIcons } from "react-native-vector-icons";
import moment from "moment";
import RNPickerSelect from "react-native-picker-select";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { useThemeContext } from "../../../hooks/useTheme";
import { post } from "../../../utils/apis/TeacherApis/login";
import { useSelector } from "react-redux";
import { useIsFocused, useNavigation } from "@react-navigation/native";
import axios from "axios";
// import { theme } from "../../../theming";

// const TeacherClasses = [
//   { time: "09:00 AM", class: " 12A", room: "411" },
//   { time: "10:45 AM", class: " 11B", room: "320" },
//   { time: "12:32 PM", class: " 11D", room: "315" },
//   { time: "02:00 PM", break: "Break" },
//   { time: "02:45 PM", class: " 11C", room: "314" },
//   { time: "04:00 PM", class: " 11A", room: "312" },
// ];

const TeacherListData = [
  {
    label: "Abhishek",
    value: "ExponentPushToken[ynurrWHQ27_vhT9mS1NVp4]",
  },
  { label: "Abhilash", value: "ExponentPushToken[Amz3nKAOk6ffg70kSeuLjS]" },
  { label: "Rahul", value: "ExponentPushToken[BSSl68PMOL3hrqzfiNWwmf]" },
];

export default function ClassExchange({
  classDetail,
  classDate,
  classDay,
  setClassDetailTab,
}) {
  const { theme } = useThemeContext();
  const [isChecked, setIsChecked] = useState(false);
  const [isDatePickerVisible, setIsDatePickerVisible] = useState(false);
  const [date, setDate] = useState(classDate);
  const [Lecturesdata, setLectureData] = useState([]);
  const [TeacherList, setTeacherList] = useState(TeacherListData);
  const [selectedTeacher, setSelectedTeacher] = useState();
  const [selectedclassforExchange, setSelectedClassForExchange] = useState();
  const [isClassSelected, setIsClassSelected] = useState(false);
  const [requestStatus, setRequestStatus] = useState(null);
  const [exchangeRequestId, setExchangeRequestId] = useState(null);
  const [selectedNotificationForTeacher, setSelectedNotificationForTeacher] =
    useState("");
  const navigation = useNavigation();

  const user = useSelector((state) => state?.login?.user);
  const isFocused = useIsFocused();

  const { colors } = useTheme();

  const hideStartDatePicker = () => {
    setIsDatePickerVisible(false);
  };

  const handleStartDateConfirm = (date) => {
    setDate(moment(date).format("YYYY-MM-DD"));
    setIsDatePickerVisible(false);
  };

  console.log(`classDetaildatatatat`, classDetail);
  console.log(`classDay`, classDay);

  const hendleSelectTeacher = async (value) => {
    try {
      console.log(`value`, value);
      setSelectedTeacher(value);
      const response = await post("timetable/search", {
        teacherId: value,
        date: date,
      });
      // console.log(`classExchange response`, response);
      if (response?.errCode == -1) {
        console.log(`classExchange response`, response);
        setLectureData(response?.data);
      } else {
        Alert.alert(response?.errMsg);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const renderItem = ({ item }) => (
    <View
      style={{
        width: 100,
        height: 80,
        backgroundColor: "#F8F3FC",
        display: "flex",
        flexDirection: "column",
        gap: 5,
        padding: 10,
      }}
    >
      <View>
        <Text style={{ color: theme.primaryTextColor }}>{item?.startTime}</Text>
      </View>
    </View>
  );

  const fetchTeacherList = async () => {
    const response = await post("classes/teacher", {
      classId: classDetail?.class?.id,
    });

    if (response?.errCode == -1) {
      const Tecaherlists = response?.data
        ?.filter((item) => item?.id !== user?.teacherId)
        .map((item) => ({
          label: item?.name,
          value: item?.id,
        }));
      setTeacherList(Tecaherlists);
    }
  };

  const checkExchangeRequest = async () => {
    console.log(classDetail?.id);
    const response = await post("timetable/status-exchange", {
      id: classDetail?.id,
    });
    console.log(`response?.data[0]?.status)`, response?.data);
    if (response?.errCode == -1) {
      console.log(`response?.data[0]?.status)`, response?.data[0]?.status);
      setRequestStatus(response?.data[0]?.status);
      setExchangeRequestId(response?.data[0]?.id);
    } else {
      setRequestStatus(null);
    }
  };

  useEffect(() => {
    fetchTeacherList();
    checkExchangeRequest();
  }, [isFocused]);

  const handleExchangeRequest = async () => {
    const fromTimeId = classDetail?.id;
    const toTimeId = selectedclassforExchange?.id;
    const fromTeacherId = user?.teacherId;
    const toTeacherId = selectedTeacher;
    const postData = { fromTeacherId, toTeacherId, fromTimeId, toTimeId };
    try {
      const response = await post("timetable/request-exchange", postData);
      if (response?.errCode == -1) {
        Alert.alert("Exchange request sent");
        setClassDetailTab(false);
      } else {
        Alert.alert(
          response?.errMsg ? response.errMsg : "error while sending request"
        );
      }
    } catch (error) {
      console.log(error);
    }

    // const requesterId = "112233";
    // const receiverId = "Abhi23";
    // // const receiversExpoToken = "ExponentPushToken[Amz3nKAOk6ffg70kSeuLjS]";

    // try {
    //   const response = await axios.post(
    //     `http://192.168.1.167:3000/exchange/request`,
    //     {
    //       requesterId,
    //       receiverId,
    //       receiversExpoToken: selectedNotificationForTeacher,
    //     }
    //   );
    //   console.log("Request sent successfully:", response.data);
    //   return response.data; // Handle response as needed
    // } catch (error) {
    //   console.error("Error requesting class exchange:", error);
    //   throw error; // Handle error appropriately
    // }
  };

  // if (requestStatus) {
  //   return (

  //   );
  // }

  const cancelPendingRequest = async () => {
    try {
      const response = await post(`timetable/cancel-exchange`, {
        id: exchangeRequestId,
      });
      if (response?.errCode == -1) {
        Alert.alert("request cancelled successfully");
      } else if (response?.errCode == 1) {
        Alert.alert(response?.errMsg);
      } else {
        setExchangeRequestId(null);
      }
      setClassDetailTab(false);
    } catch (error) {
      console.log(error);
    }
  };

  return requestStatus == "pending" ? (
    <View>
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text style={styles.modalText}>
            This lecture's Exchange Request is already pending.
          </Text>
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={[styles.button, { backgroundColor: "#007BFF" }]}
              onPress={() => setClassDetailTab(false)}
            >
              <Text style={styles.buttonText}>Close</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.button, { backgroundColor: "red" }]}
              onPress={() => cancelPendingRequest()}
            >
              <Text style={styles.buttonText}>Cancel Request</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  ) : (
    <ScrollView>
      <View
        style={{
          height: 37,
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          marginHorizontal: 20,
          marginVertical: 10,
          gap: 5,
        }}
      >
        <Text
          style={{
            fontSize: 14,
            color: theme.primaryTextColor,
            fontWeight: "bold",
          }}
        >
          {moment(classDate).format("DD MMMM YYYY")}
        </Text>
        <Text
          style={{
            fontSize: 14,
            color: theme.secondaryTextColor,
            fontWeight: "semibold",
          }}
        >
          {classDetail.time}
        </Text>
      </View>
      <View style={{ height: 37 }}>
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            marginHorizontal: 20,
          }}
        >
          <View
            style={{
              display: "flex",
              flexDirection: "row",
            }}
          >
            <Text
              style={{
                fontSize: 14,
                color: theme.primaryTextColor,
                fontWeight: "500",
              }}
            >
              Class:
            </Text>
            <Text style={{ color: theme.secondaryTextColor }}>
              {classDetail?.class?.name}
            </Text>
          </View>
          <View
            style={{
              display: "flex",
              flexDirection: "row",
            }}
          >
            <Text
              style={{
                fontSize: 14,
                color: theme.primaryTextColor,
                fontWeight: "500",
              }}
            >
              Room No:
            </Text>
            <Text style={{ color: theme.secondaryTextColor }}>
              {classDetail?.room}
            </Text>
          </View>
        </View>
      </View>
      <View style={{ marginHorizontal: 20 }}>
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <Checkbox
            status={isChecked ? "checked" : "unchecked"}
            onPress={() => {
              setIsChecked(!isChecked);
            }}
            color={theme.primarycolor}
          />
          <Text
            style={{
              fontWeight: "500",
              fontSize: 14,
              color: theme.primaryTextColor,
            }}
          >
            Class Exchange
          </Text>
        </View>
      </View>
      {isChecked && (
        <View style={{ marginHorizontal: 20, marginVertical: 10 }}>
          <View>
            <Text
              style={{
                fontSize: 14,
                fontWeight: "600",
                color: theme.primaryTextColor,
              }}
            >
              Select Teacher Name
            </Text>
          </View>
          <View style={{ marginVertical: 10 }}>
            <RNPickerSelect
              onValueChange={(value) => {
                hendleSelectTeacher(value);
              }}
              items={TeacherList}
              placeholder={{ label: "Select Teacher", value: "" }}
              style={{
                inputIOS: [
                  {
                    borderWidth: 1,
                    borderColor: "#ccc",
                    paddingHorizontal: 10,
                    borderRadius: 5,
                    height: 36,
                    color: theme.primaryTextColor,
                  },
                ],
                inputAndroid: [
                  {
                    borderWidth: 1,
                    borderColor: "#ccc",
                    paddingHorizontal: 10,
                    borderRadius: 5,
                    height: 36,
                    color: theme.primaryTextColor,
                  },
                ],
                iconContainer: {
                  top: 10,
                  right: 14,
                },
              }}
              Icon={() => (
                <AntDesign
                  name="caretdown"
                  size={12}
                  color={`${theme.secondaryTextColor}`}
                />
              )}
              value={selectedTeacher} // Make sure selectedTeacher matches one of the value in items
              useNativeAndroidPickerStyle={false}
            />
          </View>
          {/* <RNPickerSelect
      onValueChange={(value) => {
        setSelectedNotificationForTeacher(value);
      }}
      items={TeacherListData}
      placeholder={{ label: "Select Teacher", value: "" }}
      style={{
        inputIOS: [
          {
            borderWidth: 1,
            borderColor: "#ccc",
            paddingHorizontal: 10,
            borderRadius: 5,
            height: 36,
            color: theme.primaryTextColor,
          },
        ],
        inputAndroid: [
          {
            borderWidth: 1,
            borderColor: "#ccc",
            paddingHorizontal: 10,
            borderRadius: 5,
            height: 36,
            color: theme.primaryTextColor,
          },
        ],
        iconContainer: {
          top: 10,
          right: 14,
        },
      }}
      Icon={() => (
        <AntDesign
          name="caretdown"
          size={12}
          color={`${theme.secondaryTextColor}`}
        />
      )}
      value={selectedTeacher} // Make sure selectedTeacher matches one of the value in items
      useNativeAndroidPickerStyle={false}
    /> */}
          {/* <View style={{ marginVertical: 10 }}>
      <View
        style={{
          height: 36,
          width: "100%",
          borderWidth: 2,
          borderColor: "#B7B7B7",
          borderRadius: 5,
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Text style={{ paddingLeft: 10 }}>select Teacher</Text>
        <AntDesign
          name="caretdown"
          size={12}
          color="#777777"
          style={{ padding: 10 }}
        />
      </View>
    </View> */}
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <View
              style={{
                height: 37,
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                marginVertical: 10,
                gap: 5,
              }}
            >
              <Text
                style={{
                  fontSize: 14,
                  color: theme.primaryTextColor,
                  fontWeight: "bold",
                }}
              >
                {moment(date).format("D MMM YYYY")}
              </Text>
              <Text
                style={{
                  fontSize: 12,
                  color: theme.secondaryTextColor,
                  fontWeight: "semibold",
                }}
              >
                {moment(date).format("dddd")}
              </Text>
            </View>
            <View>
              <TouchableOpacity
                style={{ marginRight: 10 }}
                onPress={() => {
                  setIsDatePickerVisible(true);
                }}
              >
                <EvilIcons
                  name="calendar"
                  size={32}
                  color={theme.primaryTextColor}
                />
              </TouchableOpacity>
            </View>
          </View>
          <View>
            {Lecturesdata.length > 0 ? (
              <ScrollView>
                <View
                  style={{
                    width: "100%",
                    display: "flex",
                    flexDirection: "row",
                    flexWrap: "wrap",
                    gap: 10,
                  }}
                >
                  {Lecturesdata.map((item, index) => (
                    <TouchableOpacity
                      key={index}
                      style={{
                        width: 100,
                        height: 80,
                        backgroundColor: theme.DrawerTabBackgroundColor,
                        display: "flex",
                        flexDirection: "column",
                        gap: 5,
                        padding: 10,
                        borderRadius: 5,
                        borderWidth:
                          selectedclassforExchange?.id == item?.id ? 2 : 0,
                        borderColor:
                          selectedclassforExchange?.id == item?.id
                            ? "black"
                            : "",
                      }}
                      onPress={() => {
                        setSelectedClassForExchange(item);
                        setIsClassSelected(true);
                      }}
                    >
                      <View>
                        <Text>{item?.startTime}</Text>
                        {item?.break == "Break" ? (
                          <View>
                            <Text>Break</Text>
                          </View>
                        ) : (
                          <View>
                            <View
                              style={{ display: "flex", flexDirection: "row" }}
                            >
                              <Text style={{ fontSize: 12 }}>Class:</Text>
                              <Text style={{ fontSize: 12 }}>
                                {item?.class?.name}
                              </Text>
                            </View>
                            <View
                              style={{ display: "flex", flexDirection: "row" }}
                            >
                              <Text style={{ fontSize: 12 }}>Room No:</Text>
                              <Text style={{ fontSize: 12 }}>{item?.room}</Text>
                            </View>
                          </View>
                        )}
                      </View>
                    </TouchableOpacity>
                  ))}
                </View>
              </ScrollView>
            ) : (
              <View>
                <Text>No lecture Found</Text>
              </View>
            )}
          </View>
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
              alignContent: "center",
              marginVertical: 20,
            }}
          >
            {isClassSelected && (
              <TouchableOpacity
                style={{
                  height: 38,
                  width: "90%",
                  backgroundColor: theme.primarycolor,
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  borderRadius: 5,
                }}
                onPress={() => {
                  handleExchangeRequest();
                }}
              >
                <Text
                  style={{
                    color: "#ffffff",
                    fontSize: 12,
                  }}
                >
                  EXCHANGE REQUEST
                </Text>
              </TouchableOpacity>
            )}
          </View>
        </View>
      )}

      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="date"
        textColor={colors.text}
        minimumDate={new Date()}
        date={date ? new Date(date) : new Date()}
        onConfirm={handleStartDateConfirm}
        onCancel={hideStartDatePicker}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  modalContainer: {
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
  },
  modalContent: {
    backgroundColor: "white",
    width: "100%",
    height: 200,
    borderRadius: 10,
    padding: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  modalText: {
    fontSize: 18,
    marginBottom: 20,
    textAlign: "center",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
  },
  button: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    textAlign: "center",
  },
});
