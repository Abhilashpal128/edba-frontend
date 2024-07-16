import React, {
  useCallback,
  useEffect,
  useLayoutEffect,
  useState,
} from "react";
import {
  useWindowDimensions,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  ScrollView,
  ActivityIndicator,
  RefreshControl,
} from "react-native";
import { TabView, SceneMap, TabBar } from "react-native-tab-view";
// import BasicDetails from "./BasicDetails";
// import WorkLocationDetails from "./WorkLocationDetails";
// import PersonalDetails from "./PersonalDetails";
import { Ionicons, Entypo, AntDesign } from "react-native-vector-icons";
import Icon from "react-native-vector-icons/Ionicons";
import EditPersonalDetail from "./EditPersonalDetail";
import { SafeAreaView } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { useThemeContext } from "../../../hooks/useTheme";
import { get } from "../../../utils/apis/TeacherApis/login";
import { useSelector } from "react-redux";
// import WorkExperienceDetails from "./WorkExperienceDetails";
// import EducationalDetails from "./EducationalDetails";
import { useIsFocused } from "@react-navigation/native";
// import DateTimePickerModal from "react-native-modal-datetime-picker";

import moment from "moment";
import { useTheme } from "react-native-paper";
import { post } from "../../../utils/apis/StudentApis";

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
  const studentId = userData?.studentId;
  const { theme } = useThemeContext();

  const layout = useWindowDimensions();
  const [index, setIndex] = React.useState(0);
  const [ProfileData, setProfileData] = useState([]);
  const [isPersonalTabActive, setIsPersonalTabActive] = useState(false);
  const [isOpendPersonalTab, setIsOpenPersonalTab] = useState(false);
  const [TeacherPersonalDetailData, setTeacherPersonalDetailData] = useState(
    []
  );
  const [refreshing, setRefreshing] = useState(false);
  const TodaysDate = new Date();
  const [DateOfbirth, setDateodBirth] = useState(TodaysDate);
  const [age, setAge] = useState();
  const [isLoading, setIsLoading] = useState(false);

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
      setIsLoading(true);
      const response = await post(`student/getOne-profile`, {
        id: studentId,
      });
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
        setIsLoading(false);
      } else {
        console.log(`no data found for ${studentId}`);
        setProfileData([]);
        setIsLoading(false);
      }
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    } finally {
      setIsLoading(false);
      setRefreshing(false);
    }
  };

  const onRefresh = useCallback(() => {
    setRefreshing(true);

    fetchUserDetails();
  }, []);

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

  // const handleInputChange = (sectionindex, index, text) => {
  //   const updatedDetails = [...TeacherPersonalDetailData];
  //   updatedDetails[sectionindex].fields[index].value = text;
  //   setTeacherPersonalDetailData(updatedDetails);

  //   console.log(`updatedDetails`, updatedDetails);
  // };

  const renderScene = ({ route }) => {
    // console.log(`route`, route);
    const { title, data, key } = route;

    console.log(`title`, title);
    console.log(`key`, key);
    console.log(`data`, data);

    if (isLoading) {
      return (
        <View
          style={{
            width: "100%",
            height: "100%",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <ActivityIndicator size="large" />
        </View>
      );
    }

    return (
      <View>
        <ScrollView
          style={{ marginHorizontal: 10 }}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        >
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
