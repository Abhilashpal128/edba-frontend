import React, { useEffect, useState } from "react";
import {
  ScrollView,
  Text,
  TextInput,
  View,
  Button,
  Alert,
  TouchableOpacity,
} from "react-native";
import { useThemeContext } from "../../../hooks/useTheme";
import moment from "moment";
import { Ionicons, Entypo, AntDesign } from "react-native-vector-icons";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { useTheme } from "react-native-paper";
import { post } from "../../../utils/apis/TeacherApis/login";
import { useSelector } from "react-redux";

export default function EditPersonalDetail({
  TeacherPersonalDetailData,
  setIsOpenPersonalTab,
}) {
  const { theme } = useThemeContext();
  const { colors } = useTheme();
  const [TeacherupdatedDetails, setTeacherUpdatedDetails] = useState(
    TeacherPersonalDetailData
  );
  const userData = useSelector((state) => state?.login?.user);
  const studentId = userData?.studentId;
  const TodaysDate = new Date();
  const [DateOfbirth, setDateodBirth] = useState(TodaysDate);
  const [isDatePickerVisible, setIsDatePickerVisible] = useState(false);

  // const handleInputChange = (key, value) => {
  //   setUpdatedDetails((prevState) => ({
  //     ...prevState,
  //     [`personalDetails.${key}`]: value,
  //   }));
  // };

  // const handleAddressChange = (parentKey, key, value) => {
  //   setUpdatedDetails((prevState) => ({
  //     ...prevState,
  //     [parentKey]: {
  //       ...prevState[parentKey],
  //       [key]: value,
  //     },
  //   }));
  // };

  const handleSubmitUpdateDetails = async () => {
    const Updateddata = TeacherupdatedDetails.reduce((acc, section) => {
      section.fields.forEach((field) => {
        if (field?.value !== field?.defaultValue) {
          acc[`${field?.name}`] = field?.value;
        }
      });
      return acc;
    }, {});

    console.log(`Updateddata`, Updateddata);
    const profile = { personalDetails: Updateddata };

    const postData = { profile };

    console.log(`postData`, postData);
    const response = await post(`student/update/${studentId}`, postData);

    if (response?.errCode == -1) {
      Alert.alert("Profile Updated successfully");
      setIsOpenPersonalTab(false);
    }
    console.log(`response response`, response);
  };

  useEffect(() => {
    const dobfeild = TeacherupdatedDetails[0]?.fields?.find(
      (field) => field?.label == "Date Of Birth"
    );

    if (dobfeild) {
      console.log(`dobfeild?.value`, dobfeild?.value);
      setDateodBirth(dobfeild?.value);
    }
  }, []);

  const handleInputChange = (sectionindex, index, text) => {
    const updatedDetails = [...TeacherPersonalDetailData];
    updatedDetails[sectionindex].fields[index].value = text;
    setTeacherUpdatedDetails(updatedDetails);

    console.log(`updatedDetails`, updatedDetails);
  };

  const hideDatePicker = () => {
    setIsDatePickerVisible(false);
  };

  const handleDateConfirm = (date) => {
    setDateodBirth(moment(date).format("YYYY-MM-DD"));
    setIsDatePickerVisible(false);
  };

  return (
    <ScrollView
      style={{
        backgroundColor: theme.backgroundColor,
        marginHorizontal: 10,
        marginVertical: 20,
      }}
    >
      {/* {TeacherPersonalDetailData?.details !== undefined &&
        Object.entries(TeacherPersonalDetailData?.details).map(
          ([key, value]) => (
            <View key={key}>
              {value?.label !== "Address" && (
                <View
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    marginHorizontal: 10,
                  }}
                >
                  <View style={{ marginTop: 10 }}>
                    <Text
                      style={{
                        fontSize: 14,
                        fontWeight: "bold",
                        color: theme.primaryTextColor,
                      }}
                    >
                      {value?.label}
                    </Text>
                  </View>

                  <View
                    key={key}
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      height: 40,
                      borderBottomWidth: 1,
                      borderColor: "#E8E8E8EE",
                      color: theme.secondaryTextColor,
                    }}
                  >
                    <TextInput
                      editable={true}
                      value={
                        value?.label === "Age"
                          ? JSON.stringify(
                              updatedDetails[`personalDetails.${key}`] ||
                                value.details
                            )
                          : updatedDetails[`personalDetails.${key}`] ||
                            value.details
                      }
                      onChangeText={(text) => handleInputChange(key, text)}
                      style={{
                        height: 40,
                        borderBottomWidth: 1,
                        borderColor: "#E8E8E8EE",
                        color: theme.secondaryTextColor,
                        width: "100%",
                      }}
                      color={theme.primaryTextColor}
                      placeholderTextColor={theme.secondaryTextColor}
                    />
                  </View>
                </View>
              )}
              {value?.label === "Address" &&
                Object.entries(value?.details).map(([addrKey, addrValue]) => (
                  <View
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      marginHorizontal: 10,
                    }}
                    key={addrKey}
                  >
                    <View style={{ marginTop: 10 }}>
                      <Text
                        style={{
                          fontSize: 14,
                          fontWeight: "bold",
                          color: theme.primaryTextColor,
                        }}
                      >
                        {addrValue?.label}
                      </Text>
                    </View>

                    <View
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        height: 40,
                        borderBottomWidth: 1,
                        borderColor: "#E8E8E8EE",
                        color: theme.secondaryTextColor,
                      }}
                    >
                      <TextInput
                        editable={true}
                        value={
                          addrValue?.label === "Age"
                            ? JSON.stringify(
                                (updatedDetails.Address &&
                                  updatedDetails.Address[addrKey]) ||
                                  addrValue?.details
                              )
                            : (updatedDetails.Address &&
                                updatedDetails.Address[addrKey]) ||
                              addrValue?.details
                        }
                        onChangeText={(text) =>
                          handleAddressChange("Address", addrKey, text)
                        }
                        style={{
                          height: 40,
                          borderBottomWidth: 1,
                          borderColor: "#E8E8E8EE",
                          color: theme.secondaryTextColor,
                          width: "100%",
                        }}
                        color={theme.primaryTextColor}
                        placeholderTextColor={theme.secondaryTextColor}
                      />
                    </View>
                  </View>
                ))}
            </View>
          )
        )}
      <Button title="Update" onPress={handleSubmit} /> */}

      <ScrollView style={{ width: "100%", height: "100%" }}>
        <View style={{ marginVertical: 10 }}>
          {TeacherupdatedDetails?.length > 0 && (
            <View>
              {TeacherupdatedDetails.map((item, sectionindex) => {
                return (
                  <View key={sectionindex}>
                    {item?.fields?.length > 0 && (
                      <View>
                        {item?.fields.map((field, index) => {
                          return (
                            <View
                              key={index}
                              style={{
                                display: "flex",
                                flexDirection: "column",
                                marginHorizontal: 10,
                                marginTop: 10,
                              }}
                            >
                              <View style={{ marginTop: 5 }}>
                                <Text
                                  style={{
                                    fontSize: 14,
                                    fontWeight: "bold",
                                    color: theme.primaryTextColor,
                                  }}
                                >
                                  {field?.label}
                                </Text>
                              </View>
                              <View
                                style={{
                                  display: "flex",
                                  flexDirection: "row",

                                  borderBottomWidth: 1,
                                  borderColor: "#E8E8E8EE",
                                  color: theme.secondaryTextColor,
                                }}
                              >
                                {Array.isArray(field?.value) ? (
                                  <View
                                    style={{
                                      flexDirection: "row",
                                      flexWrap: "wrap",
                                    }}
                                  >
                                    {field?.value?.map((item, index) => (
                                      <View key={`${index}${item?.name}`}>
                                        <Text>{item?.name}, </Text>
                                      </View>
                                    ))}
                                  </View>
                                ) : field?.label == "Date Of Birth" ? (
                                  <TouchableOpacity
                                    onPress={() => setIsDatePickerVisible(true)}
                                    style={{
                                      borderWidth: 1,
                                      borderColor: theme.secondaryTextColor,
                                      borderRadius: 5,
                                      marginBottom: 30,
                                      marginTop: 16,
                                    }}
                                  >
                                    <View
                                      style={{
                                        display: "flex",
                                        flexDirection: "row",
                                        alignItems: "center",
                                        justifyContent: "space-between",
                                        width: "100%",
                                        height: 36,
                                        paddingHorizontal: 10,
                                      }}
                                    >
                                      <Text
                                        style={{
                                          fontSize: 12,
                                          color: theme.primaryTextColor,
                                          marginRight: 8,
                                        }}
                                      >
                                        {moment(DateOfbirth).format(
                                          "D MMM YYYY"
                                        )}
                                      </Text>
                                      <AntDesign
                                        name="calendar"
                                        size={18}
                                        color={theme.primaryTextColor}
                                      />
                                    </View>
                                  </TouchableOpacity>
                                ) : field?.label == "Contact Number" ||
                                  field?.label == "Aadhar Card Number" ||
                                  field?.label == "Pin Code" ? (
                                  <View style={{ width: "100%" }}>
                                    <TextInput
                                      editable={true}
                                      value={field?.value}
                                      style={{
                                        borderBottomWidth: 2,
                                        borderColor: "#E8E8E8",
                                        color: theme.secondaryTextColor,
                                        width: "100%",
                                        // Allow TextInput to expand to next line if needed
                                      }}
                                      color={theme.primaryTextColor}
                                      placeholderTextColor={
                                        theme.secondaryTextColor
                                      }
                                      keyboardType="numeric"
                                      onChangeText={(text) => {
                                        handleInputChange(
                                          sectionindex,
                                          index,
                                          text
                                        );
                                      }}
                                      maxLength={
                                        field?.label == "Aadhar Card Number"
                                          ? 12
                                          : 10
                                      }
                                    />
                                  </View>
                                ) : (
                                  <TextInput
                                    editable={
                                      field?.label === "Age" ? false : true
                                    }
                                    value={
                                      field?.label === "Age"
                                        ? JSON.stringify(field?.value)
                                        : field?.value
                                    }
                                    style={{
                                      borderBottomWidth: 2,
                                      borderColor: "#E8E8E8",
                                      color: theme.secondaryTextColor,
                                      width: "100%",
                                      // Allow TextInput to expand to next line if needed
                                    }}
                                    color={theme.primaryTextColor}
                                    placeholderTextColor={
                                      theme.secondaryTextColor
                                    }
                                    onChangeText={(text) => {
                                      handleInputChange(
                                        sectionindex,
                                        index,
                                        text
                                      );
                                    }}
                                    multiline={true}
                                  />
                                )}
                              </View>
                            </View>
                          );
                        })}
                      </View>
                    )}
                  </View>
                );
              })}
            </View>
          )}
        </View>
        <View>
          <TouchableOpacity
            style={{
              width: "90%",
              marginHorizontal: "auto",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: 40,
              backgroundColor: theme.primarycolor,
              marginVertical: 20,
              borderRadius: 5,
            }}
            onPress={handleSubmitUpdateDetails}
          >
            <Text
              style={{
                color: "#FFFFFF",
                fontFamily: "Poppins_500Medium",
              }}
            >
              UPDATE
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="date"
        textColor={colors.text}
        maximumDate={new Date()}
        date={DateOfbirth ? new Date(DateOfbirth) : new Date()}
        onConfirm={handleDateConfirm}
        onCancel={hideDatePicker}
      />
    </ScrollView>
  );
}
