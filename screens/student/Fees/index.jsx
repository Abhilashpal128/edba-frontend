import { useEffect, useRef, useLayoutEffect, useState, useMemo } from "react";
import {
  SafeAreaView,
  View,
  Text,
  Image,
  Dimensions,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { Svg, Circle, Text as SvgText } from "react-native-svg";
import { useTheme, Avatar } from "react-native-paper";
import { Calendar, LocaleConfig } from "react-native-calendars";
import { FontAwesome6 } from "react-native-vector-icons";
import { Feather } from "react-native-vector-icons";
import { Ionicons } from "react-native-vector-icons";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import { DrawerActions } from "@react-navigation/native";

import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import Pending from "./Pending";
import Paid from "./Paid";
import { ThemeProvider, useThemeContext } from "../../../hooks/useTheme";

export default function StudentFees({ navigation, route }) {
  const Tab = createMaterialTopTabNavigator();
  const user = useSelector((state) => state.login.user);

  const [index, setIndex] = useState(0);
  const [routes] = useState([
    { key: "pending", title: "Pending" },
    { key: "paid", title: "Paid" },
  ]);
  const { theme } = useThemeContext();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <TouchableOpacity
          onPress={() => {
            navigation.goBack();
          }}
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginLeft: 20,
          }}
        >
          <FontAwesome6
            name="chevron-left"
            size={20}
            color={theme.secondaryTextColor}
          />
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
            Fee
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

  const CustomTabBar = ({ state, descriptors, navigation }) => {
    return (
      <View
        style={{
          paddingLeft: 20,
          paddingRight: 20,
          backgroundColor: theme.backgroundColor,
        }}
      >
        <View
          style={{
            marginTop: 10,
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            backgroundColor: "#F5F5F5",
            borderRadius: 8,
            padding: 6,
            height: 50,
          }}
        >
          {state.routes.map((route, index) => {
            const { options } = descriptors[route.key];
            const label =
              options.tabBarLabel !== undefined
                ? options.tabBarLabel
                : options.title !== undefined
                ? options.title
                : route.name;

            const isFocused = state.index === index;

            const onPress = () => {
              const event = navigation.emit({
                type: "tabPress",
                target: route.key,
                canPreventDefault: true,
              });

              if (!event.defaultPrevented) {
                navigation.navigate(route.name);
              }
            };

            return (
              <TouchableOpacity
                key={route.key}
                onPress={onPress}
                style={[
                  {
                    width: "49%",
                    height: 38,
                    alignItems: "center",
                    justifyContent: "center",
                    borderRadius: 8,
                  },
                  isFocused
                    ? {
                        backgroundColor: "#2B78CA",
                      }
                    : {
                        backgroundColor: "#F5F5F5",
                      },
                ]}
              >
                <Text
                  style={
                    isFocused
                      ? {
                          color: "#fff",
                          fontSize: 14,
                          fontFamily: "Poppins_600SemiBold",
                        }
                      : {
                          color: "#000",
                          fontSize: 14,
                          fontFamily: "Poppins_600SemiBold",
                        }
                  }
                >
                  {label}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>
      </View>
    );
  };

  return (
    <ThemeProvider>
      <Tab.Navigator
        initialRouteName="Pending"
        tabBar={(props) => <CustomTabBar {...props} />}
        style={{}}
      >
        <Tab.Screen name="Pending" component={Pending} />
        <Tab.Screen name="Paid" component={Paid} />
      </Tab.Navigator>
    </ThemeProvider>
  );
}

const styles = StyleSheet.create({
  tabContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#f2f2f2",
    borderRadius: 8,
    padding: 6,
    height: 50,
  },
  tab: {
    width: "49%",
    height: 38,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 8,
  },
  focusedTab: {
    backgroundColor: "#2B78CA",
  },
  defaultTab: {
    backgroundColor: "transparent",
  },
  focusedTabText: {
    color: "#fff",
    fontSize: 14,
    fontFamily: "Poppins_600SemiBold",
  },
  defaultTabText: {
    color: "#000",
    fontSize: 14,
    fontFamily: "Poppins_600SemiBold",
  },
});
