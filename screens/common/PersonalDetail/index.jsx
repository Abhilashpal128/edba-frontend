import React, { useEffect, useLayoutEffect, useState } from "react";
import {
  useWindowDimensions,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  ScrollView,
} from "react-native";
import { TabView, SceneMap, TabBar } from "react-native-tab-view";
import BasicDetails from "./BasicDetails";
import WorkLocationDetails from "./WorkLocationDetails";
import PersonalDetails from "./PersonalDetails";
import { Ionicons, Entypo, AntDesign } from "react-native-vector-icons";
import Icon from "react-native-vector-icons/Ionicons";
import EditPersonalDetail from "./EditPersonalDetail";
import { SafeAreaView } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { useThemeContext } from "../../../hooks/useTheme";
import { get } from "../../../utils/apis/TeacherApis/login";
import { useSelector } from "react-redux";
import WorkExperienceDetails from "./WorkExperienceDetails";
import EducationalDetails from "./EducationalDetails";
import { useIsFocused } from "@react-navigation/native";
import DateTimePickerModal from "react-native-modal-datetime-picker";

import moment from "moment";
import { useTheme } from "react-native-paper";

const data = [
  { label: "Date Of Joining", value: "01/05/24" },
  { label: "Full name", value: "Maithili Fernandez" },
  { label: "Work Email id", value: "abhilashpal128@gmail.com" },
  { label: "department", value: "Science" },
  { label: "Designation", value: "Teacher" },
  { label: "Timing", value: "09:00 to 05:00" },
  { label: "ClassList", value: "01/05/24" },
];

export default function PersonalDetail({ navigation }) {
  const userData = useSelector((state) => state.login.user);
  const TeacherId = userData?.teacherId;
  const { theme } = useThemeContext();

  const layout = useWindowDimensions();
  const [index, setIndex] = React.useState(0);
  const [ProfileData, setProfileData] = useState([]);
  const [isPersonalTabActive, setIsPersonalTabActive] = useState(false);
  const [isOpendPersonalTab, setIsOpenPersonalTab] = useState(false);
  const [TeacherPersonalDetailData, setTeacherPersonalDetailData] = useState(
    []
  );
  const [isDatePickerVisible, setIsDatePickerVisible] = useState(false);
  const TodaysDate = new Date();
  const [DateOfbirth, setDateodBirth] = useState(TodaysDate);
  const [age, setAge] = useState();

  const [routes, setRoutes] = useState([
    { key: "basic", title: "Basic Detail" },
    { key: "work", title: "Work Location Details" },
    { key: "personal", title: "Personal Detail" },
    { key: "experience", title: "Work Experience" },
    { key: "education", title: "Educational Detail" },
  ]);

  const isFocused = useIsFocused();

  console.log(`TeacherPer`, TeacherPersonalDetailData);

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
            Profile
          </Text>
        </View>
      ),

      headerRight: () => (
        <View style={{ marginRight: 10 }}>
          {isPersonalTabActive && (
            <TouchableOpacity
              onPress={() => {
                setIsOpenPersonalTab(true);
                setIsPersonalTabActive(false);
              }}
            >
              <Text>
                <AntDesign
                  name="edit"
                  size={24}
                  color={theme.secondaryTextColor}
                />
              </Text>
            </TouchableOpacity>
          )}
          {isOpendPersonalTab && (
            <TouchableOpacity
              onPress={() => {
                setIsOpenPersonalTab(false);
                setIsPersonalTabActive(true);
              }}
            >
              <Entypo name="cross" size={24} color="#ccc" />
            </TouchableOpacity>
          )}
        </View>
      ),
      headerStyle: {
        backgroundColor: theme.backgroundColor,
      },
      headerTitleAlign: "center", // Adjust alignment for header title (if needed)
      headerTintColor: "#000000", // Text color for back button and header title
    });

    // navigation.setOptions({
    //   header: () => {
    //     return (
    //       <View
    //         style={{
    //           flexDirection: "row",
    //           alignItems: "center",
    //           justifyContent: "space-between",
    //           backgroundColor: "#FFFFFF",
    //           paddingLeft: 20,
    //           paddingRight: 20,
    //           paddingTop: 20,
    //           paddingBottom: 10,
    //         }}
    //       >
    //         <TouchableOpacity
    //           onPress={() => navigation.openDrawer()}
    //           style={{
    //             flexDirection: "row",
    //             alignItems: "center",
    //             width: "20%",
    //           }}
    //         >
    //           <Icon
    //             name="menu"
    //             size={25}
    //             color="#000000"
    //             style={{ marginLeft: 10 }}
    //           />
    //         </TouchableOpacity>

    //         <Text
    //           numberOfLines={1}
    //           style={{
    //             fontSize: 16,
    //             fontWeight: "600",
    //             width: "60%",
    //             textAlign: "center",
    //           }}
    //         >
    //           Profile
    //         </Text>
    //         <View
    //           style={{
    //             flexDirection: "row",
    //             alignItems: "center",
    //             width: "20%",
    //             justifyContent: "flex-end",
    //           }}
    //         >
    //           <View>
    //             {isPersonalTabActive && (
    //               <TouchableOpacity
    //                 onPress={() => {
    //                   setIsOpenPersonalTab(true);
    //                   setIsPersonalTabActive(false);
    //                 }}
    //               >
    //                 <Text>
    //                   <AntDesign name="edit" size={24} color="#777777" />
    //                 </Text>
    //               </TouchableOpacity>
    //             )}
    //             {isOpendPersonalTab && (
    //               <TouchableOpacity
    //                 onPress={() => {
    //                   setIsOpenPersonalTab(false);
    //                   setIsPersonalTabActive(true);
    //                 }}
    //               >
    //                 <Entypo name="cross" size={24} color="#777777" />
    //               </TouchableOpacity>
    //             )}
    //           </View>
    //         </View>
    //       </View>
    //     );
    //   },
    // });
  }, [navigation, isPersonalTabActive, isOpendPersonalTab, theme]);

  useEffect(() => {
    fetchUserDetails();
  }, [isFocused]);

  const fetchUserDetails = async () => {
    try {
      const response = await get(`teacher/${TeacherId}`);
      if (response.errCode == -1) {
        console.log(`ProfileResponse`, response);
        setProfileData(response?.data);
        let TabRoutes = [];
        response?.data?.steps?.map((item) => {
          TabRoutes.push({
            key: item?.number,
            title: item?.label,
            data: response?.data[`step_${item?.number}`],
          });
        });

        console.log(`TabRoutes`, TabRoutes);
        setRoutes(TabRoutes);
      } else {
        console.log(`no data found for ${TeacherId}`);
        setProfileData([]);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleIndexChange = (newIndex) => {
    console.log(`newIndex`, newIndex);
    setIndex(newIndex);
    console.log(`datatatattatatatatatatat`, routes[newIndex]);
    if (routes[newIndex]?.title === "Personal Details") {
      console.log(`matched`);
      setIsPersonalTabActive(true);
      setTeacherPersonalDetailData(routes[newIndex]?.data?.sections);
    } else {
      setIsPersonalTabActive(false);
    }
  };

  const withProps = (Component, props) => {
    return () => <Component {...props} />;
  };

  // const renderScene = SceneMap({
  //   basic: BasicDetails,
  //   work: WorkLocationDetails,
  //   personal: PersonalDetails,
  //   experience: ExperienceDetails,
  // });

  // const renderScene = ({ route }) => {
  //   console.log(`route`, route);
  //   switch (route.key) {
  //     case "basic":
  //       return withProps(BasicDetails, {
  //         basicDetail: ProfileData?.basicDetails,
  //       })();
  //     case "work":
  //       return withProps(WorkLocationDetails, {
  //         workLocationDetails: ProfileData?.workLocationDetails,
  //       })();
  //     case "personal":
  //       return withProps(PersonalDetails, {
  //         personalDetails: ProfileData?.personalDetails,
  //       })();
  //     case "experience":
  //       return withProps(WorkExperienceDetails, {
  //         workExperienceDetails: ProfileData?.workExperienceDetails,
  //       })();
  //     case "education":
  //       return withProps(EducationalDetails, {
  //         educationalDetails: ProfileData?.educationalDetails,
  //       })();
  //     default:
  //       return null;
  //   }
  // };

  const handleInputChange = (sectionindex, index, text) => {
    const updatedDetails = [...TeacherPersonalDetailData];
    updatedDetails[sectionindex].fields[index].value = text;
    setTeacherPersonalDetailData(updatedDetails);

    console.log(`updatedDetails`, updatedDetails);
  };

  const hideDatePicker = () => {
    setIsDatePickerVisible(false);
  };

  const handleDateConfirm = (date) => {
    setDateodBirth(moment(date).format("YYYY-MM-DD"));
    setIsDatePickerVisible(false);
  };

  const renderScene = ({ route }) => {
    // console.log(`route`, route);
    const { title, data, key } = route;

    console.log(`title`, title);
    console.log(`key`, key);
    console.log(`data`, data);
    return (
      <View>
        <ScrollView style={{ marginHorizontal: 10 }}>
          {data?.sections?.length > 0 && (
            <View>
              {data?.sections?.map((section, index) => {
                return (
                  <View key={index}>
                    {section?.fields?.length > 0 && (
                      <View>
                        {section?.fields?.map((field, index) => {
                          return (
                            <View
                              key={index}
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
                                  {field?.label}
                                </Text>
                              </View>
                              <View
                                key={index}
                                style={{
                                  display: "flex",
                                  flexDirection: "row",
                                  height: 40,
                                  borderBottomWidth: 1,
                                  borderColor: "#E8E8E8EE",
                                  color: theme.secondaryTextColor,
                                }}
                              >
                                {Array.isArray(field?.value) ? (
                                  field?.value.map((item, index) => (
                                    <View key={index}>
                                      <Text>{item?.name}, </Text>
                                    </View>
                                  ))
                                ) : (
                                  <TextInput
                                    editable={false}
                                    value={
                                      field?.label == "Date of Joining" ||
                                      field?.label == "Date Of Birth"
                                        ? moment(field?.value).format(
                                            "Do MMMM YYYY"
                                          )
                                        : field?.value
                                    }
                                    style={{
                                      height: 40,
                                      borderBottomWidth: 1,
                                      borderColor: "#E8E8E8EE",
                                      color: theme.secondaryTextColor,
                                    }}
                                    color={theme.primaryTextColor}
                                    placeholderTextColor={
                                      theme.secondaryTextColor
                                    }
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
        </ScrollView>
      </View>
    );
  };

  const renderTabBar = (props) => (
    <TabBar
      {...props}
      scrollEnabled
      indicatorStyle={{
        backgroundColor: theme.backgroundColor,
        height: 2,
      }}
      style={{
        backgroundColor: theme.backgroundColor,
        borderWidth: 0,
      }}
      renderLabel={({ route, focused }) => (
        <Text
          style={[
            {
              fontSize: 12,
              paddingVertical: 10,
              borderRadius: 25,
              fontWeight: "600",
            },
            focused
              ? {
                  color: "#ffffff",
                  backgroundColor: theme.primarycolor,
                  paddingHorizontal: 20,
                }
              : {
                  color: theme.oppositeTheme,
                  backgroundColor: theme.backgroundColor,
                  paddingHorizontal: 20,
                },
          ]}
        >
          {route.title}
        </Text>
      )}
      tabStyle={{ width: "auto" }}
    />
  );

  return (
    <SafeAreaView
      style={{
        backgroundColor: theme.backgroundColor,
        width: "100%",
        height: "100%",
      }}
    >
      {isOpendPersonalTab ? (
        <View style={{ backgroundColor: theme.backgroundColor }}>
          <KeyboardAwareScrollView>
            <EditPersonalDetail
              TeacherPersonalDetailData={TeacherPersonalDetailData}
              setIsOpenPersonalTab={setIsOpenPersonalTab}
            />

            {/* <ScrollView style={{ width: "100%", height: "100%" }}>
              <View style={{ marginVertical: 10 }}>
                {TeacherPersonalDetailData?.length > 0 && (
                  <View>
                    {TeacherPersonalDetailData.map((item, sectionindex) => {
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
                                          onPress={() =>
                                            setIsDatePickerVisible(true)
                                          }
                                          style={{
                                            borderWidth: 1,
                                            borderColor:
                                              theme.secondaryTextColor,
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
                                      ) : (
                                        <TextInput
                                          editable={
                                            field?.label === "Age"
                                              ? false
                                              : true
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
            /> */}
          </KeyboardAwareScrollView>
        </View>
      ) : (
        <TabView
          navigationState={{ index, routes }}
          renderScene={renderScene}
          onIndexChange={handleIndexChange}
          initialLayout={{ width: layout.width }}
          renderTabBar={renderTabBar}
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({});
