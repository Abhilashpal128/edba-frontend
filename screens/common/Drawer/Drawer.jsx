import {
  Dimensions,
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React, { useRef } from "react";
import { TouchableOpacity } from "react-native";
import { Entypo, AntDesign } from "react-native-vector-icons";
import DrawerRoutingcontent from "./DrawerRoutingcontent";
import { useThemeContext } from "../../../hooks/useTheme";
import RBSheet from "react-native-raw-bottom-sheet";
import Logout from "../../teacher/Logout/Logout";
import { useSelector } from "react-redux";
import { Avatar } from "react-native-paper";
// import { theme } from "../../../theming";

export default function CustomDrawer({ navigation }) {
  const { theme } = useThemeContext();
  const userData = useSelector((state) => state.login.user);
  console.log(`userData`, userData);

  const refRBSheet = useRef();

  const navigateToScreen = (screenName) => {
    navigation.navigate(screenName);
  };

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: theme.DrawerTabBackgroundColor,
      }}
    >
      <View
        style={{
          padding: 20,
          flex: 1,
        }}
      >
        <TouchableOpacity
          onPress={() => navigation.closeDrawer()}
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginVertical: 30,
          }}
        >
          <Entypo
            name="chevron-left"
            size={32}
            color={theme.ternaryTextColor}
          />
          <Image
            source={require("../../../assets/logo.png")}
            style={{ width: 100 }}
            resizeMode={"contain"}
          />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("Profile");
          }}
          style={{
            borderRadius: 8,
            padding: 6,
            marginBottom: 10,
            backgroundColor: theme.backgroundColor,
          }}
        >
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              width: "100%",
              height: 63,
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            {userData?.profileImage != null ? (
              <View
                style={{
                  height: 40,
                  width: "20%",
                  borderRadius: 20,
                  justifyContent: "center",
                  alignItems: "center",
                  backgroundColor: "#000000",
                }}
              >
                {/* <FontAwesome name="institution" size={20} color="#fff" /> */}
                <Image
                  source={{ uri: userData?.profileImage }}
                  resizeMode="contain"
                  style={{
                    width: 40,
                    height: 40,
                    borderRadius: 20,
                  }}
                />
              </View>
            ) : (
              <View>
                <Avatar.Text
                  size={40}
                  label={`${userData?.firstName?.slice(
                    0,
                    1
                  )}${userData?.lastName?.slice(0, 1)} `}
                  theme={{ colors: { primary: "#007EB0" } }}
                />
              </View>
            )}
            <View style={{ width: "60%" }}>
              <Text
                style={{
                  fontSize: 12,
                  color: theme.primaryTextColor,
                }}
              >
                {userData?.firstName} {userData?.lastName}
              </Text>
              <Text
                style={{
                  fontSize: 12,
                  color: theme.primaryTextColor,
                }}
              >
                {userData?.mobileNumber}
              </Text>
            </View>
            <View>
              <TouchableOpacity>
                <Entypo
                  name="chevron-right"
                  size={32}
                  color={theme.ternaryTextColor}
                />
              </TouchableOpacity>
            </View>
          </View>
        </TouchableOpacity>
        <View>
          <DrawerRoutingcontent />
        </View>
      </View>
      {userData != null && userData?.role != "student" && (
        <View style={{ paddingLeft: 20, paddingRight: 20, marginBottom: 20 }}>
          <View
            style={{ backgroundColor: theme.backgroundColor, borderRadius: 8 }}
          >
            <TouchableOpacity
              onPress={() => {
                navigation.navigate("Profile");
              }}
              style={{
                borderRadius: 10,
                padding: 6,
                marginBottom: 10,
              }}
            >
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <AntDesign
                  name="user"
                  size={24}
                  color={theme.ternaryTextColor}
                  style={{ fontWeight: "500" }}
                />
                <Text
                  style={{
                    fontSize: 18,
                    marginLeft: 10,
                    fontFamily: "Poppins_500Medium",
                    color: theme.primaryTextColor,
                  }}
                >
                  Profile
                </Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                borderRadius: 10,
                padding: 6,
                marginBottom: 10,
              }}
            >
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate("Settings");
                }}
                style={{ flexDirection: "row", alignItems: "center" }}
              >
                <AntDesign
                  name="setting"
                  size={24}
                  color={theme.ternaryTextColor}
                  style={{ fontWeight: "500" }}
                />

                <Text
                  style={{
                    fontSize: 18,
                    marginLeft: 10,
                    fontFamily: "Poppins_500Medium",
                    color: theme.primaryTextColor,
                  }}
                >
                  Settings
                </Text>
              </TouchableOpacity>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                refRBSheet.current.open();
              }}
              style={{
                borderRadius: 10,
                padding: 6,
                marginBottom: 10,
              }}
            >
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <Entypo
                  name="log-out"
                  size={24}
                  color={theme.ternaryTextColor}
                />
                <Text
                  style={{
                    fontSize: 18,
                    marginLeft: 10,

                    color: theme.primaryTextColor,
                    fontFamily: "Poppins_500Medium",
                  }}
                >
                  Logout
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      )}

      {
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
          <Logout bottomSheetRef={refRBSheet} />
        </RBSheet>
      }
    </View>
  );
}

const styles = StyleSheet.create({});
