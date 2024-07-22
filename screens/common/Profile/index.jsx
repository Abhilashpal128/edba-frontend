import React, { useLayoutEffect } from "react";
import { useEffect, useState, useRef } from "react";
import {
  Ionicons,
  Entypo,
  MaterialIcons,
  FontAwesome,
} from "react-native-vector-icons";
import Icon from "react-native-vector-icons/Ionicons";
import {
  SafeAreaView,
  View,
  Image,
  StyleSheet,
  TouchableWithoutFeedback,
  TextInput,
  Keyboard,
  Platform,
  Dimensions,
  TouchableOpacity,
  Text,
  Alert,
  ImageBackground,
  ScrollView,
  Modal,
  Pressable,
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { useTheme, Button, Avatar } from "react-native-paper";
import { Feather } from "react-native-vector-icons";
import { FontAwesome6 } from "react-native-vector-icons";
import { AntDesign } from "react-native-vector-icons";
import { MaterialCommunityIcons } from "react-native-vector-icons";
import * as ImagePicker from "expo-image-picker";
import { StatusBar } from "expo-status-bar";
import { useNavigation } from "@react-navigation/native";
import RBSheet from "react-native-raw-bottom-sheet";

import { useThemeContext } from "../../../hooks/useTheme";
import Logout from "../../teacher/Logout/Logout";
import { useSelector } from "react-redux";
// import { theme } from "../../../theming";

export default function Profile() {
  const [editProfileModal, setEditProfileModal] = useState(true);
  const [profileImage, setProfileImage] = useState(null);

  const { theme } = useThemeContext();
  const navigation = useNavigation();
  const refRBSheet = useRef();
  const user = useSelector((state) => state.login.user);

  console.log(`user user user`, user);

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
        <TouchableOpacity
          style={{ marginRight: 10 }}
          onPress={() => {
            navigation.navigate("Notification");
          }}
        >
          <FontAwesome
            name="bell-o"
            size={20}
            color={theme.secondaryTextColor}
          />
        </TouchableOpacity>
      ),
      headerStyle: {
        backgroundColor: theme.backgroundColor,
      },
      headerTitleAlign: "center", // Adjust alignment for header title (if needed)
      headerTintColor: "#000000", // Text color for back button and header title
    });
  }, [navigation, theme]);

  const CameraImage = async (mode) => {
    try {
      let result = {};
      if (mode == "gallery") {
        await ImagePicker.requestMediaLibraryPermissionsAsync();
        result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.Images,
          allowsEditing: true,
          aspect: [1, 1],
          quality: 1,
        });
      } else {
        await ImagePicker.requestCameraPermissionsAsync();
        result = await ImagePicker.launchCameraAsync({
          cameraType: ImagePicker.CameraType.front,
          allowsEditing: true,
          aspect: [1, 1],
          quality: 1,
        });
      }

      if (!result?.canceled) {
        //save Image
        await SaveImage(result?.assets[0]?.uri);
      }
    } catch (error) {}
  };

  const SaveImage = async (image) => {
    try {
      setProfileImage(image);
      setEditProfileModal(false);
    } catch (error) {
      console.log(`error ftom SaveImage`, error);
    }
  };

  return (
    <SafeAreaView style={{ backgroundColor: theme.backgroundColor, flex: 1 }}>
      <ScrollView bounces={false} showsVerticalScrollIndicator={false}>
        <View style={{ height: 150 }}>
          <View style={{ marginTop: 50 }}>
            <View
              style={{
                flexDirection: "row",
                alignItems: "flex-end",
                justifyContent: "flex-end",
                marginRight: 20,
              }}
            >
              {/* <TouchableOpacity onPress={() => navigation.goBack()}>
                <Entypo name="home" size={24} color="#fff" />
              </TouchableOpacity> */}
            </View>
          </View>
          <View
            style={{
              width: "100%",
              height: "100%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {/* {user?.profileImage != null ? ( */}
            {profileImage != null ? (
              <>
                <View
                  style={{
                    display: "flex",
                    justifyContent: "flex-end",
                    alignItems: "flex-end",
                  }}
                >
                  <Image
                    source={{ uri: profileImage }}
                    resizeMode="contain"
                    style={{
                      height: 70,
                      width: 70,
                      borderRadius: 35,
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  />
                  {/* <Text
                style={{
                  fontSize: 52,
                  color: "#fff",
                }}
              >
                
                AP
              </Text> */}
                  <TouchableOpacity
                    style={{
                      backgroundColor: "#FFFFFF",
                      position: "absolute",
                      zIndex: 1,
                      borderRadius: 20,
                      padding: 3,
                    }}
                    onPress={() => {
                      setEditProfileModal(true);
                    }}
                  >
                    <Entypo name="camera" size={20} color={"#FF9800"} />
                  </TouchableOpacity>
                </View>
              </>
            ) : (
              <View
                style={{
                  // borderWidth: 2,
                  // // borderRadius: "50%",
                  // height: 80,
                  // width: 80,
                  // borderRadius: 40,
                  display: "flex",
                  justifyContent: "flex-end",
                  alignItems: "flex-end",
                }}
              >
                <Avatar.Text
                  size={70}
                  label={`${user?.firstName?.slice(
                    0,
                    1
                  )}${user?.lastName?.slice(0, 1)}`}
                />
                <TouchableOpacity
                  style={{
                    backgroundColor: "#FFFFFF",
                    position: "absolute",
                    zIndex: 1,
                    borderRadius: 20,
                    padding: 3,
                  }}
                  onPress={() => {
                    setEditProfileModal(true);
                  }}
                >
                  <Entypo name="camera" size={20} color={"#FF9800"} />
                </TouchableOpacity>
              </View>
            )}
          </View>
        </View>
        <Text
          style={{
            fontSize: 16,
            fontWeight: "bold",
            color: theme.primaryTextColor,
            textAlign: "center",
            marginTop: 10,
          }}
        >
          {/* {user?.employee?.fullName} */}
          {/* Abhilash Pal */}
          {user?.firstName} {user?.lastName}
        </Text>
        <Text
          style={{
            fontSize: 14,
            color: theme.secondaryTextColor,
            textAlign: "center",
          }}
        >
          {/* {user?.employee?.employeeId ? user?.employee?.employeeId : "-"} */}

          {user?.mobileNumber}
        </Text>
        <View
          style={{
            marginVertical: 10,
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            width: "100%",
          }}
        >
          <Text
            style={{
              fontSize: 14,
              color: theme.primarycolor,
              textAlign: "center",
              paddingHorizontal: 20,
              paddingVertical: 10,
              backgroundColor: `${theme.primarycolor}26`,
              borderRadius: 40,
            }}
          >
            {/* abhilashpal128@gmail.com */}
            {user?.email}
          </Text>
        </View>
        <View
          style={{
            padding: 20,
            display: "flex",
            justifyContent: "center",
            marginHorizontal: 20,
          }}
        >
          <View style={{ marginBottom: 20 }} />
          <TouchableOpacity
            onPress={() => navigation.navigate("PersonalDetail")}
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <AntDesign
                name={"edit"}
                size={20}
                color={theme.ternaryTextColor}
              />
              <Text
                style={{
                  fontSize: 12,
                  color: theme.primaryTextColor,
                  marginLeft: 10,
                }}
              >
                Personal Details
              </Text>
            </View>
            <FontAwesome6
              name={"angle-right"}
              size={12}
              color={theme.ternaryTextColor}
            />
          </TouchableOpacity>
          <View
            style={{
              borderBottomWidth: StyleSheet.hairlineWidth,
              borderColor: "#F3F3F3",
              marginTop: 16,
              marginBottom: 16,
            }}
          />
          {user?.role == "student" && (
            <>
              <TouchableOpacity
                onPress={() => navigation.navigate("DigitalId")}
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <MaterialCommunityIcons
                    name={"badge-account-horizontal-outline"}
                    size={20}
                    color={theme.ternaryTextColor}
                  />
                  <Text
                    style={{
                      fontSize: 12,
                      color: theme.primaryTextColor,
                      marginLeft: 10,
                    }}
                  >
                    Degital Id
                  </Text>
                </View>
                <FontAwesome6
                  name={"angle-right"}
                  size={12}
                  color={theme.ternaryTextColor}
                />
              </TouchableOpacity>
              <View
                style={{
                  borderBottomWidth: StyleSheet.hairlineWidth,
                  borderColor: "#F3F3F3",
                  marginTop: 16,
                  marginBottom: 16,
                }}
              />
            </>
          )}
          <TouchableOpacity
            onPress={() => navigation.navigate("Settings")}
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Feather
                name="settings"
                size={20}
                color={theme.ternaryTextColor}
              />
              <Text
                style={{
                  fontSize: 12,
                  color: theme.primaryTextColor,
                  marginLeft: 10,
                }}
              >
                Settings
              </Text>
            </View>
            <FontAwesome6
              name={"angle-right"}
              size={12}
              color={theme.ternaryTextColor}
            />
          </TouchableOpacity>
          <View
            style={{
              borderBottomWidth: StyleSheet.hairlineWidth,
              borderColor: "#F3F3F3",
              marginTop: 16,
              marginBottom: 16,
            }}
          />
          <TouchableOpacity
            // onPress={() => navigation.navigate("EducationalDetails")}
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
            }}
            onPress={() => {
              navigation.navigate("ResetPassword");
            }}
          >
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Ionicons
                name="key-outline"
                size={20}
                color={theme.ternaryTextColor}
              />
              <Text
                style={{
                  fontSize: 12,
                  color: theme.primaryTextColor,
                  marginLeft: 10,
                }}
              >
                Reset password
              </Text>
            </View>
            <FontAwesome6
              name={"angle-right"}
              size={12}
              color={theme.ternaryTextColor}
            />
          </TouchableOpacity>
          <View
            style={{
              borderBottomWidth: StyleSheet.hairlineWidth,
              borderColor: "#F3F3F3",
              marginTop: 16,
              marginBottom: 16,
            }}
          />
          <TouchableOpacity
            onPress={() => navigation.navigate("HelpAndsupport")}
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Feather
                name="headphones"
                size={20}
                color={theme.ternaryTextColor}
              />
              <Text
                style={{
                  fontSize: 12,
                  color: theme.primaryTextColor,
                  marginLeft: 10,
                }}
              >
                Help and Support
              </Text>
            </View>
            <FontAwesome6
              name={"angle-right"}
              size={12}
              color={theme.ternaryTextColor}
            />
          </TouchableOpacity>
          <View
            style={{
              borderBottomWidth: StyleSheet.hairlineWidth,
              borderColor: "#F3F3F3",
              marginTop: 16,
              marginBottom: 16,
            }}
          />
          <TouchableOpacity
            // onPress={() => navigation.navigate("OtherDetails")}
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
            }}
            onPress={() => {
              refRBSheet.current.open();
            }}
          >
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <MaterialCommunityIcons
                name="logout"
                size={20}
                color={theme.ternaryTextColor}
              />
              <Text
                style={{
                  fontSize: 12,
                  color: theme.primaryTextColor,
                  marginLeft: 10,
                }}
              >
                Logout
              </Text>
            </View>
            <FontAwesome6
              name={"angle-right"}
              size={12}
              color={theme.ternaryTextColor}
            />
          </TouchableOpacity>
        </View>
        <StatusBar style="light" />
      </ScrollView>
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

      <Modal
        animationType="slide"
        transparent={true}
        visible={editProfileModal}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
          setEditProfileModal(!editProfileModal);
        }}
      >
        <TouchableWithoutFeedback onPress={() => setEditProfileModal(false)}>
          <View style={styles.centeredView}>
            <TouchableWithoutFeedback>
              <View
                style={{
                  margin: 20,
                  backgroundColor: "white",
                  borderRadius: 20,
                  padding: 35,
                  width: "80%",
                  alignItems: "center",
                  justifyContent: "space-between",
                  shadowColor: "#000",
                  shadowOffset: {
                    width: 0,
                    height: 2,
                  },
                  shadowOpacity: 0.25,
                  shadowRadius: 4,
                  elevation: 5,
                  gap: 10,
                }}
              >
                <View>
                  <Text style={{ fontSize: 20, fontWeight: "bold" }}>
                    Profile Photo
                  </Text>
                </View>
                <View
                  style={{
                    width: "100%",
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <View style={{ width: "30%" }}>
                    <TouchableOpacity
                      style={{ backgroundColor: "#D3D3D3", borderRadius: 5 }}
                      onPress={() => {
                        CameraImage("camera");
                      }}
                    >
                      <View
                        style={{
                          marginHorizontal: 10,
                          marginVertical: 8,
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                          gap: 5,
                        }}
                      >
                        <Entypo name="camera" size={20} color={"#FF9800"} />
                        <Text style={{ fontSize: 12 }}>Camera</Text>
                      </View>
                    </TouchableOpacity>
                  </View>
                  <View>
                    <TouchableOpacity
                      style={{ backgroundColor: "#d3d3d3", borderRadius: 5 }}
                      onPress={() => {
                        CameraImage("gallery");
                      }}
                    >
                      <View
                        style={{
                          marginHorizontal: 10,
                          marginVertical: 8,
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                          gap: 5,
                        }}
                      >
                        <MaterialIcons
                          name="photo-size-select-actual"
                          size={20}
                          color={"#FF9800"}
                        />
                        <Text style={{ fontSize: 12 }}>Gallery</Text>
                      </View>
                    </TouchableOpacity>
                  </View>
                  <View>
                    <TouchableOpacity
                      style={{ backgroundColor: "#D3D3D3", borderRadius: 5 }}
                      onPress={() => {
                        setProfileImage(null);
                        setEditProfileModal(false);
                      }}
                    >
                      <View
                        style={{
                          marginHorizontal: 10,
                          marginVertical: 8,
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                          gap: 5,
                        }}
                      >
                        <Feather name="trash-2" size={20} color={"#FF9800"} />
                        <Text style={{ fontSize: 12 }}>Remove</Text>
                      </View>
                    </TouchableOpacity>
                  </View>
                </View>
                {/* <Pressable
                  style={[styles.button, styles.buttonClose]}
                  onPress={() => setEditProfileModal(!editProfileModal)}
                >
                  <Text style={styles.textStyle}>Hide Modal</Text>
                </Pressable> */}
              </View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </SafeAreaView>
  );
}

// const styles = StyleSheet.create({});
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
    backgroundColor: "rgba(0, 0, 0, 0.77)", // Black color with 87% opacity
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    width: "80%",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
});
