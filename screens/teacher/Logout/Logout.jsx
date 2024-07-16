import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native";
// import { theme } from "../../../theming";
import { useDispatch } from "react-redux";
import { logout } from "../../../Redux/slices/LoginSlice";
import { useThemeContext } from "../../../hooks/useTheme";
import { cleardatafromStorage } from "../../../Storage/storage";

export default function Logout({ navigation, bottomSheetRef }) {
  const { theme } = useThemeContext();
  const dispatch = useDispatch();

  const handleLogOut = async () => {
    dispatch(logout());
    bottomSheetRef.current.close();
    await cleardatafromStorage();
  };

  return (
    <SafeAreaView
      style={{
        backgroundColor: theme.backgroundColor,
        height: "100%",
        width: "100%",
        gap: 20,
        display: "flex",
        justifyContent: "center",
      }}
    >
      <View
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Image
          source={require("../../../assets/logout.png")}
          resizeMode="contain"
          style={{ width: 250, height: 250 }}
        />
      </View>
      <View
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: 10,
        }}
      >
        <View style={{ width: "80%" }}>
          <Text
            style={{
              fontSize: 16,
              fontWeight: "600",
              textAlign: "center",
              color: theme.primaryTextColor,
            }}
          >
            Are you sure you want to Log Out?
          </Text>
          <Text
            style={{
              color: theme.secondaryTextColor,
              fontSize: 10,
              fontWeight: "400",
              textAlign: "center",
            }}
          >
            By logging out, you will be ending your current session and will no
            longer have access to your account.
          </Text>
        </View>

        <TouchableOpacity
          style={{
            width: "70%",
            backgroundColor: theme.primarycolor,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            borderRadius: 50,
          }}
          onPress={() => {
            handleLogOut();
          }}
        >
          <Text
            style={{
              peddingHorizontal: 50,
              paddingVertical: 10,
              fontSize: 14,
              fontWeight: "700",
              color: "#FFFFFF",
            }}
          >
            Logout
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            bottomSheetRef.current.close();
          }}
        >
          <Text
            style={{
              fontSize: 14,
              fontWeight: "500",
              color: theme.primarycolor,
            }}
          >
            Cancel
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({});
