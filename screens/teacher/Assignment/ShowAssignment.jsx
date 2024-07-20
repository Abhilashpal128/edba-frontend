import {
  Alert,
  Image,
  Modal,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import React, { useEffect, useLayoutEffect, useState } from "react";
import { useThemeContext } from "../../../hooks/useTheme";
import { FontAwesome6 } from "react-native-vector-icons";
import { Ionicons, Feather } from "react-native-vector-icons";
import Icon from "react-native-vector-icons/Ionicons";
import { useTheme, Avatar, Divider, Button } from "react-native-paper";
import { Delete, post } from "../../../utils/apis/TeacherApis/login";
import { useIsFocused } from "@react-navigation/native";
import moment from "moment/moment";
import { Linking } from "react-native";

export default function ShowAssignment({ navigation, route }) {
  const { theme } = useThemeContext();
  const AssignmentData = route?.params?.item;
  const [submitButtonPressed, setisSubmitButtonPressed] = useState(false);
  const [Assignment, setAssignment] = useState();
  const [fileTypes, setFileTypes] = useState({});
  const [deleteAssignmentModal, setDeleteAssignmentModal] = useState(false);

  const isFocused = useIsFocused();

  console.log(`AssignmentData`, AssignmentData);

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
    let blendAmount = 0.3;

    r = blendWithWhite(r, blendAmount);
    g = blendWithWhite(g, blendAmount);
    b = blendWithWhite(b, blendAmount);

    return `rgba(${r}, ${g}, ${b}, ${opacity})`;
  };

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
            width: "20%",
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
            {AssignmentData?.name}
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
          <Ionicons
            name="notifications"
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

  // const fetchFileType = async (url) => {
  //   try {
  //     // setLoading(true);
  //     const type = await checkFileType(url);
  //     return type;
  //   } catch (error) {
  //     console.error("Error fetching file type:", error);
  //   } finally {
  //     // setLoading(false);
  //     console.log("something went wrong");
  //   }
  // };
  // const checkFileType = async (url) => {
  //   try {
  //     const response = await fetch(url, {
  //       method: "HEAD", // Fetch only headers
  //     });

  //     if (!response.ok) {
  //       throw new Error("Network response was not ok");
  //     }

  //     const contentType = response.headers.get("content-type");

  //     if (contentType && contentType.startsWith("image/")) {
  //       return "image";
  //     } else if (contentType === "application/pdf") {
  //       return "pdf";
  //     } else {
  //       throw new Error("Unknown content type");
  //     }
  //   } catch (error) {
  //     console.error("Error checking file type:", error);
  //     throw error; // Handle or rethrow the error as needed
  //   }
  // };
  const checkFileType = async (url) => {
    // Your logic to check file type here
    // For demonstration, we will return 'image' or 'pdf'
    if (url.endsWith(".jpg") || url.endsWith(".png")) {
      return "image";
    } else if (url.endsWith(".pdf")) {
      return "pdf";
    } else {
      return null;
    }
  };

  const fetchAssignment = async () => {
    const response = await post("assignments/getAssignment", {
      assignmentId: AssignmentData?.assignment,
    });
    if (response?.errCode == -1) {
      setAssignment(response?.data);
      console.log(`documents`, response?.data?.documents);
      response?.data?.documents.forEach(async (item) => {
        const type = await checkFileType(item?.url);
        setFileTypes((prevFileTypes) => ({
          ...prevFileTypes,
          [item.url]: type,
        }));
        console.log(`fileTypes`, type);
      });
    } else {
      console.log("error while fetching Assignment");
    }
    // console.log(`single Assignent Response`, response);
  };

  useEffect(() => {
    fetchAssignment();
  }, [isFocused]);

  const handleDeleteAssignment = async () => {
    try {
      const response = await Delete(
        `assignments/${AssignmentData?.assignment}`
      );
      console.log(`DeleteResponse`, response);
      if (response?.errCode == -1) {
        setDeleteAssignmentModal(false);
        Alert.alert("Assignment deleted successfully");
        navigation.navigate("Assignments");
      } else {
        Alert.alert("error while deleting Assignment");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleCloseModal = () => {
    setDeleteAssignmentModal(false);
  };
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: theme.backgroundColor }}>
      <ScrollView>
        <View style={{ padding: 20, flex: 1 }}>
          <ScrollView showsVerticalScrollIndicator={false}>
            <View
              style={{
                flex: 1,
                backgroundColor: theme.cardBackground,
                borderRadius: 8,
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <View style={{ padding: 10 }}>
                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      justifyContent: "space-between",
                      width: "100%",
                    }}
                  >
                    <View
                      style={{
                        borderRadius: 16,
                      }}
                    >
                      <Text
                        style={{
                          color: "#007EB0",
                          padding: 6,
                          fontSize: 12,
                          fontWeight: "semibold",
                        }}
                      >
                        Assignment Details
                      </Text>
                    </View>
                    <TouchableOpacity
                      style={{
                        width: 50,
                        height: 40,
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                      onPress={() => {
                        setDeleteAssignmentModal(true);
                      }}
                    >
                      {/* <Svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/Svg"
                    >
                      <Path
                        d="M22.3738 13.7273L21.0159 12.9436C21.0483 12.6336 21.0647 12.3187 21.0647 12C21.0647 11.6813 21.0483 11.3664 21.0159 11.0564L22.3738 10.2727C23.4039 9.67819 23.7564 8.36133 23.1619 7.33181L21.6239 4.66814C21.0295 3.63862 19.7131 3.28561 18.6835 3.88003L17.3252 4.66425C16.8176 4.2953 16.2705 3.97758 15.6915 3.7192V2.15273C15.6915 0.963844 14.7276 0 13.5387 0H10.4627C9.27381 0 8.30992 0.963844 8.30992 2.15273V3.71925C7.73092 3.97763 7.1838 4.29534 6.67628 4.6643L5.31789 3.88008C4.28833 3.28566 2.97194 3.63862 2.37752 4.66819L0.839502 7.33186C0.245033 8.36137 0.598049 9.67828 1.62756 10.2727L2.98549 11.0565C2.95314 11.3665 2.93674 11.6813 2.93674 12C2.93674 12.3188 2.95314 12.6336 2.98549 12.9436L1.62756 13.7274C0.598049 14.3219 0.245033 15.6387 0.839502 16.6682L2.37752 19.3319C2.97194 20.3614 4.28833 20.7144 5.31789 20.12L6.67628 19.3358C7.1838 19.7048 7.73092 20.0225 8.30992 20.2808V21.8474C8.30992 23.0362 9.27377 24.0001 10.4627 24.0001H13.5387C14.7276 24.0001 15.6915 23.0362 15.6915 21.8474V20.2808C16.2705 20.0225 16.8176 19.7048 17.3252 19.3358L18.6835 20.12C19.7131 20.7145 21.0295 20.3615 21.6239 19.3319L23.1619 16.6682C23.7564 15.6386 23.4038 14.3218 22.3738 13.7273ZM12.0007 18.8306C8.22827 18.8306 5.1701 15.7724 5.1701 12C5.1701 8.22759 8.22831 5.16942 12.0007 5.16942C15.7731 5.16942 18.8312 8.22759 18.8312 12C18.8312 15.7724 15.7731 18.8306 12.0007 18.8306Z"
                        fill={theme.secondaryTextColor}
                      />
                      <Path
                        d="M12.112 9.224C12.6667 9.224 13.112 9.376 13.448 9.68C13.7893 9.97867 13.96 10.392 13.96 10.92C13.96 11.4427 13.792 11.8427 13.456 12.12C13.12 12.392 12.6747 12.528 12.12 12.528L12.088 13.144H11.104L11.064 11.784H11.424C11.888 11.784 12.2453 11.7227 12.496 11.6C12.7467 11.4773 12.872 11.2533 12.872 10.928C12.872 10.6933 12.8027 10.5067 12.664 10.368C12.5307 10.2293 12.3467 10.16 12.112 10.16C11.8667 10.16 11.6747 10.2267 11.536 10.36C11.4027 10.4933 11.336 10.6773 11.336 10.912H10.28C10.2747 10.5867 10.344 10.296 10.488 10.04C10.632 9.784 10.8427 9.584 11.12 9.44C11.4027 9.296 11.7333 9.224 12.112 9.224ZM11.592 15.056C11.3893 15.056 11.2213 14.9947 11.088 14.872C10.96 14.744 10.896 14.5867 10.896 14.4C10.896 14.2133 10.96 14.0587 11.088 13.936C11.2213 13.808 11.3893 13.744 11.592 13.744C11.7893 13.744 11.952 13.808 12.08 13.936C12.208 14.0587 12.272 14.2133 12.272 14.4C12.272 14.5867 12.208 14.744 12.08 14.872C11.952 14.9947 11.7893 15.056 11.592 15.056Z"
                        fill={theme.primaryTextColor}
                      />
                      <Path
                        d="M12.112 9.224C12.6667 9.224 13.112 9.376 13.448 9.68C13.7893 9.97867 13.96 10.392 13.96 10.92C13.96 11.4427 13.792 11.8427 13.456 12.12C13.12 12.392 12.6747 12.528 12.12 12.528L12.088 13.144H11.104L11.064 11.784H11.424C11.888 11.784 12.2453 11.7227 12.496 11.6C12.7467 11.4773 12.872 11.2533 12.872 10.928C12.872 10.6933 12.8027 10.5067 12.664 10.368C12.5307 10.2293 12.3467 10.16 12.112 10.16C11.8667 10.16 11.6747 10.2267 11.536 10.36C11.4027 10.4933 11.336 10.6773 11.336 10.912H10.28C10.2747 10.5867 10.344 10.296 10.488 10.04C10.632 9.784 10.8427 9.584 11.12 9.44C11.4027 9.296 11.7333 9.224 12.112 9.224ZM11.592 15.056C11.3893 15.056 11.2213 14.9947 11.088 14.872C10.96 14.744 10.896 14.5867 10.896 14.4C10.896 14.2133 10.96 14.0587 11.088 13.936C11.2213 13.808 11.3893 13.744 11.592 13.744C11.7893 13.744 11.952 13.808 12.08 13.936C12.208 14.0587 12.272 14.2133 12.272 14.4C12.272 14.5867 12.208 14.744 12.08 14.872C11.952 14.9947 11.7893 15.056 11.592 15.056Z"
                        fill={theme.primaryTextColor}
                        fill-opacity="0.2"
                      />
                      <Path
                        d="M12.112 9.224C12.6667 9.224 13.112 9.376 13.448 9.68C13.7893 9.97867 13.96 10.392 13.96 10.92C13.96 11.4427 13.792 11.8427 13.456 12.12C13.12 12.392 12.6747 12.528 12.12 12.528L12.088 13.144H11.104L11.064 11.784H11.424C11.888 11.784 12.2453 11.7227 12.496 11.6C12.7467 11.4773 12.872 11.2533 12.872 10.928C12.872 10.6933 12.8027 10.5067 12.664 10.368C12.5307 10.2293 12.3467 10.16 12.112 10.16C11.8667 10.16 11.6747 10.2267 11.536 10.36C11.4027 10.4933 11.336 10.6773 11.336 10.912H10.28C10.2747 10.5867 10.344 10.296 10.488 10.04C10.632 9.784 10.8427 9.584 11.12 9.44C11.4027 9.296 11.7333 9.224 12.112 9.224ZM11.592 15.056C11.3893 15.056 11.2213 14.9947 11.088 14.872C10.96 14.744 10.896 14.5867 10.896 14.4C10.896 14.2133 10.96 14.0587 11.088 13.936C11.2213 13.808 11.3893 13.744 11.592 13.744C11.7893 13.744 11.952 13.808 12.08 13.936C12.208 14.0587 12.272 14.2133 12.272 14.4C12.272 14.5867 12.208 14.744 12.08 14.872C11.952 14.9947 11.7893 15.056 11.592 15.056Z"
                        fill={theme.primaryTextColor}
                        fill-opacity="0.2"
                      />
                      <Path
                        d="M12.112 9.224C12.6667 9.224 13.112 9.376 13.448 9.68C13.7893 9.97867 13.96 10.392 13.96 10.92C13.96 11.4427 13.792 11.8427 13.456 12.12C13.12 12.392 12.6747 12.528 12.12 12.528L12.088 13.144H11.104L11.064 11.784H11.424C11.888 11.784 12.2453 11.7227 12.496 11.6C12.7467 11.4773 12.872 11.2533 12.872 10.928C12.872 10.6933 12.8027 10.5067 12.664 10.368C12.5307 10.2293 12.3467 10.16 12.112 10.16C11.8667 10.16 11.6747 10.2267 11.536 10.36C11.4027 10.4933 11.336 10.6773 11.336 10.912H10.28C10.2747 10.5867 10.344 10.296 10.488 10.04C10.632 9.784 10.8427 9.584 11.12 9.44C11.4027 9.296 11.7333 9.224 12.112 9.224ZM11.592 15.056C11.3893 15.056 11.2213 14.9947 11.088 14.872C10.96 14.744 10.896 14.5867 10.896 14.4C10.896 14.2133 10.96 14.0587 11.088 13.936C11.2213 13.808 11.3893 13.744 11.592 13.744C11.7893 13.744 11.952 13.808 12.08 13.936C12.208 14.0587 12.272 14.2133 12.272 14.4C12.272 14.5867 12.208 14.744 12.08 14.872C11.952 14.9947 11.7893 15.056 11.592 15.056Z"
                        fill={theme.primaryTextColor}
                        fill-opacity="0.2"
                      />
                    </Svg> */}
                      <Feather name="trash-2" color="red" size={20} />
                    </TouchableOpacity>
                  </View>
                  <Text
                    style={{
                      marginTop: 10,
                      fontSize: 16,
                      color: theme.primaryTextColor,
                      fontWeight: "bold",
                    }}
                  >
                    {/* {params?.assignment?.question} */}
                    {AssignmentData?.name}
                  </Text>
                  <View style={{ marginTop: 10 }}>
                    <Text
                      style={{
                        marginTop: 10,
                        fontSize: 12,
                        fontWeight: "semibold",
                        color: theme.secondaryTextColor,
                      }}
                    >
                      Due Date
                    </Text>
                    <View
                      style={{
                        flexDirection: "row",
                        alignItems: "center",
                        marginTop: 8,
                      }}
                    >
                      <Text
                        style={{
                          fontSize: 12,
                          color: theme.secondaryTextColor,
                        }}
                      >
                        {" "}
                        {moment(Assignment?.submissionDate).format(
                          "DD MMMM YYYY"
                        )}
                      </Text>
                    </View>
                    <Divider style={{ marginTop: 10, marginBottom: 10 }} />
                    <View style={{ marginBottom: 10 }}>
                      <Text
                        style={{
                          marginTop: 10,
                          fontSize: 14,
                          color: theme.primaryTextColor,
                          fontWeight: "bold",
                        }}
                      >
                        Instructions:
                      </Text>
                      {Assignment?.instructions.length > 0 ? (
                        <View>
                          {Assignment?.instructions.map((item, index) => (
                            <Text
                              style={{
                                marginTop: 10,
                                fontSize: 12,
                                color: theme.secondaryTextColor,
                              }}
                              key={index}
                            >
                              {/* {item.description} */}
                              {item}
                            </Text>
                          ))}
                        </View>
                      ) : (
                        <View>
                          <Text
                            style={{
                              color: theme.secondaryTextColor,
                              textDecorationStyle: "solid",
                              fontStyle: "italic",
                            }}
                          >
                            No Instruction Provided
                          </Text>
                        </View>
                      )}

                      <Text
                        style={{
                          marginTop: 10,
                          fontSize: 14,
                          color: theme.primaryTextColor,
                          fontWeight: "bold",
                        }}
                      >
                        Resources:
                      </Text>
                      {Assignment?.resources?.length > 0 ? (
                        <View style={{ marginTop: 10 }}>
                          {Assignment?.resources.map((item, index) => (
                            <View key={index} style={{ display: "flex" }}>
                              <Text
                                style={{
                                  fontSize: 12,
                                  color: theme.secondaryTextColor,
                                }}
                              >
                                {item}
                              </Text>

                              <Text
                                style={{
                                  fontSize: 12,
                                  color: theme.primarycolor,
                                }}
                              >
                                {item.link}
                              </Text>
                            </View>
                          ))}
                        </View>
                      ) : (
                        <View>
                          <Text
                            style={{
                              color: theme.secondaryTextColor,
                              textDecorationStyle: "solid",
                              fontStyle: "italic",
                            }}
                          >
                            No Resources Provided
                          </Text>
                        </View>
                      )}
                    </View>
                  </View>
                </View>
              </View>
            </View>

            {/* {Assignment?.documents?.length > 0 && (
              <View>
                {Assignment?.documents.map((item) => {
                  console.log(`Asignments.documents`, item);
                  const fileType = fileTypes[item?.url];
                  return (
                    <View>
                      {fileType == "image" && (
                        <View>
                          <Image
                            source={{ uri: item?.url }}
                            style={{
                              width: "80%",
                              height: "auto",
                              borderRadius: 10,
                              marginHorizontal: "auto",
                            }}
                          />
                        </View>
                      )}
                      {fileType == "pdf" && (
                        <View>
                          <Text>PDF</Text>
                        </View>
                      )}
                      {fileType == null && (
                        <View>
                          <Text>{""}</Text>
                        </View>
                      )}
                    </View>
                  );
                })}
              </View>
            )} */}
            {Assignment?.documents?.length > 0 && (
              <View style={{ gap: 10, marginTop: 10 }}>
                {Assignment?.documents?.map((item, index) => {
                  return (
                    <View
                      style={{
                        display: "flex",
                        alignItems: "center",
                      }}
                      key={index}
                    >
                      <TouchableOpacity
                        style={{
                          height: 46,
                          width: "100%",
                          backgroundColor: "#AAAAAA",
                          borderRadius: 5,
                          display: "flex",
                          flexDirection: "row",
                          justifyContent: "center",
                          alignItems: "center",
                          gap: 10,
                        }}
                        onPress={() => {
                          Linking.openURL(
                            `http://d7y6l36yifl1o.cloudfront.net/${item?.key}`
                          );
                        }}
                      >
                        <Ionicons
                          name="document-outline"
                          size={24}
                          color="#FFFFFF"
                        />
                        <Text
                          style={{
                            fontSize: 14,
                            color: "#fff",
                            fontWeight: "semibold",
                            flexWrap: "wrap",
                          }}
                        >
                          {item?.label}
                        </Text>
                      </TouchableOpacity>
                      {/* <Button
                      mode={"contained"}
                      buttonColor="#2B78CA"
                      contentStyle={{ height: 40 }}
                      labelStyle={{
                        fontSize: 14,
                        color: "#fff",
                      }}
                      style={{ borderRadius: 8 }}
                    >
                      Submit Assignment
                    </Button> */}
                    </View>
                  );
                })}
              </View>
            )}
            <View
              style={{ marginTop: 20, display: "flex", alignItems: "center" }}
            >
              <TouchableOpacity
                style={{
                  height: 40,
                  width: "100%",
                  backgroundColor: "#2B78CA",
                  borderRadius: 5,
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
                onPress={() => {
                  navigation.navigate("EditAssignment", {
                    Assignment,
                  });
                }}
              >
                <Text
                  style={{
                    fontSize: 14,
                    color: "#fff",
                    fontWeight: "semibold",
                  }}
                >
                  EDIT
                </Text>
              </TouchableOpacity>
              {/* <Button
            mode={"contained"}
            buttonColor="#2B78CA"
            contentStyle={{ height: 40 }}
            labelStyle={{
              fontSize: 14,
              color: "#fff",
            }}
            style={{ borderRadius: 8 }}
          >
            Submit Assignment
          </Button> */}
            </View>
            <View
              style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Modal
                transparent={true}
                visible={deleteAssignmentModal}
                animationType="slide"
              >
                <TouchableWithoutFeedback onPress={handleCloseModal}>
                  <View
                    style={{
                      flex: 1,
                      justifyContent: "center",
                      alignItems: "center",
                      backgroundColor: "rgba(0, 0, 0, 0.5)",
                      width: "100%",
                    }}
                  >
                    <TouchableWithoutFeedback>
                      <View
                        style={{
                          backgroundColor: "#fff",
                          padding: 20,
                          borderRadius: 10,
                          width: "80%",
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                      >
                        <Text style={{ marginBottom: 20 }}>
                          Do you want to delete?
                        </Text>
                        <View
                          style={{
                            flexDirection: "row",
                            justifyContent: "space-between",
                            width: "100%",
                          }}
                        >
                          <TouchableOpacity
                            style={{
                              backgroundColor: "#ddd",
                              padding: 10,
                              borderRadius: 5,
                              width: "45%",
                              alignItems: "center",
                            }}
                            onPress={handleCloseModal}
                          >
                            <Text>Cancel</Text>
                          </TouchableOpacity>
                          <TouchableOpacity
                            style={{
                              backgroundColor: "#ff0000",
                              padding: 10,
                              borderRadius: 5,
                              width: "45%",
                              alignItems: "center",
                            }}
                            onPress={handleDeleteAssignment}
                          >
                            <Text style={{ color: "#fff" }}>Delete</Text>
                          </TouchableOpacity>
                        </View>
                      </View>
                    </TouchableWithoutFeedback>
                  </View>
                </TouchableWithoutFeedback>
              </Modal>
            </View>
            {/* <Modal
            transparent={true}
            visible={deleteAssignmentModal}
            animationType="slide"
          >
            <TouchableWithoutFeedback
              onPress={() => {
                setDeleteAssignmentModal(false);
              }}
              style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: "rgba(0, 0, 0, 0.5)",
                width: "100%",
                height: "100%",
              }}
            >
              <View style={{ backgroundColor: "#fff" }}>
                <Text>Delete Modal</Text>
              </View>
            </TouchableWithoutFeedback>
          </Modal> */}
          </ScrollView>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({});
