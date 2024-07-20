import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useState } from "react";
import {
  useNavigation,
  useNavigationState,
  useRoute,
} from "@react-navigation/native";
import {
  Foundation,
  SimpleLineIcons,
  MaterialCommunityIcons,
  Entypo,
} from "react-native-vector-icons";
import { useThemeContext } from "../../../hooks/useTheme";
import { useDispatch, useSelector } from "react-redux";
import { setActiveTab } from "../../../Redux/slices/ActiveTabSlice";
// import { theme } from "../../../theming";

const getFocusedRouteNameFromState = (state) => {
  if (!state || typeof state.index !== "number") {
    return null;
  }

  const route = state.routes[state.index];

  if (route.state) {
    return getFocusedRouteNameFromState(route.state);
  }

  return route.name;
};

export default function DrawerRoutingcontent() {
  const { theme } = useThemeContext();
  const navigation = useNavigation();
  // const routes = useNavigationState((state) => state.routes);
  const userData = useSelector((state) => state.login.user);
  // const activeTab = useSelector((state) => state.activeTab.activeTab);
  const routeState = useNavigationState((state) => state);
  const dispatch = useDispatch();
  const routeIndex = useNavigationState((state) => state.index);

  let activeTab = getFocusedRouteNameFromState(routeState) || "Home";
  console.log(
    `const activeTab = getFocusedRouteNameFromState(routeState);`,
    activeTab
  );
  if (
    !activeTab ||
    activeTab == "TeacherStack" ||
    activeTab == "StudentStack"
  ) {
    activeTab = "Home";
  }

  // const currentRouteName = routes[routeIndex].name;
  // console.log(`routeeeeeeeeeeeee`, routeIndex);
  // console.log(`routeeeeeeeeeeeee`, routes);
  // console.log(`routeeeeeeeeeeeee namecurrentRouteName`, currentRouteName);

  // const [activeTab1, setActiveTab1] = useState("Home");
  const [isSubScreenOpend, setSubScreenOpend] = useState(false);
  console.log(activeTab);
  let sideMenu = [];

  userData &&
    (userData?.role == "student"
      ? (sideMenu = [
          { name: "Home", icon: "home-outline", screen: "Home" },
          {
            name: "Assingment/Homework",
            icon: "clipboard-text-outline",
            subScreens: [
              { name: "List of Assignments", screen: "Assignments" },
              { name: "Grade", screen: "Grade" },
            ],
          },
          { name: "TimeTable", icon: "table-large", screen: "TimeTable" },
          {
            name: "Attendence",
            icon: "calendar-month-outline",
            screen: "Attendence",
          },
          {
            name: "Take Leave",
            icon: "airplane-takeoff",
            screen: "Leave",
          },
          {
            name: "Fees",
            icon: "cash-multiple",
            screen: "Fees",
          },
          // { name: "Inbox", icon: "email-outline", screen: "inbox" },
        ])
      : (sideMenu = [
          { name: "Home", icon: "home-outline", screen: "Home" },
          { name: "TimeTable", icon: "table-large", screen: "TimeTable" },
          {
            name: "Assingment/Homework",
            icon: "clipboard-text-outline",
            screen: "Assignments",
          },
          {
            name: "Attendence",
            icon: "calendar-month-outline",
            screen: "Attendence",
          },
          // { name: "Inbox", icon: "email-outline" },
        ]));

  // sideMenu = [
  //   { name: "Home", icon: "home-outline", screen: "Home" },
  //   { name: "TimeTable", icon: "table-large", screen: "TimeTable" },
  //   {
  //     name: "Assingment/Homework",
  //     icon: "clipboard-text-outline",
  //     screen: "Assignments",
  //   },
  //   {
  //     name: "Attendence",
  //     icon: "calendar-month-outline",
  //     screen: "Attendence",
  //   },
  //   { name: "Inbox", icon: "email-outline" },
  // ];

  const handleDrawerNavigationClick = (item) => {
    if (item.subScreens) {
      setSubScreenOpend((prev) => !prev);
    } else {
      // setActiveTab(item.screen);
      // dispatch(setActiveTab(item.screen));
      navigation.navigate(item?.screen);
    }
  };

  return (
    <View
      style={{
        backgroundColor: theme.backgroundColor,
        paddingVertical: 20,
        borderRadius: 10,
      }}
    >
      {sideMenu.length > 0 ? (
        <View
          style={{
            display: "flex",
            gap: 20,
            alignItems: "center",
            marginHorizontal: 10,
            width: "100%",
          }}
        >
          {sideMenu.map((item, index) => (
            <View style={{ width: "100%" }}>
              <TouchableOpacity
                onPress={() => {
                  handleDrawerNavigationClick(item);
                }}
                key={index}
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "center",
                }}
              >
                <View
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    gap: 10,
                    width: "90%",
                    alignItems: "center",
                  }}
                >
                  <View style={{ width: "10%" }}>
                    <MaterialCommunityIcons
                      name={item?.icon}
                      size={24}
                      style={[
                        {
                          color: theme.ternaryTextColor,
                          fontWeight: "500",
                        },
                        activeTab === item.screen && {
                          color: theme.primarycolor,
                        },
                      ]}
                    />
                  </View>
                  <Text
                    style={[
                      {
                        fontSize: 16,
                        fontFamily: "Poppins_500Medium",
                        color: theme.primaryTextColor,
                        width: "70%",
                      },
                      activeTab === item.screen && {
                        color: theme.primarycolor,
                      },
                    ]}
                  >
                    {item?.name}
                  </Text>
                  {item.subScreens && (
                    <Entypo
                      name={isSubScreenOpend ? "chevron-down" : "chevron-right"}
                      size={24}
                      color={theme.secondaryTextColor}
                    />
                  )}
                </View>
              </TouchableOpacity>
              {isSubScreenOpend && (
                <View style={{ display: "flex", gap: 20, marginTop: 8 }}>
                  {item.subScreens &&
                    item.subScreens.map((subscreen, index) => (
                      <TouchableOpacity
                        key={index}
                        style={{
                          width: "90%",
                          display: "flex",
                          flexDirection: "row",
                          gap: 20,
                        }}
                        onPress={() => {
                          handleDrawerNavigationClick(subscreen);
                        }}
                      >
                        <View style={{ width: "10%" }} />
                        <Text
                          style={[
                            {
                              color: theme.secondaryTextColor,
                              fontSize: 14,
                              fontFamily: "Poppins_500Medium",
                            },
                            activeTab === subscreen.screen && {
                              color: theme.primarycolor,
                            },
                          ]}
                        >
                          {subscreen?.name}
                        </Text>
                      </TouchableOpacity>
                    ))}
                </View>
              )}
            </View>
          ))}
        </View>
      ) : (
        <View>
          <Text>Something wrong in navigation</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({});
