import {
  Dimensions,
  Image,
  ImageBackground,
  RefreshControl,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import { calculateDuration } from "../../../Helper/helper";
import { useThemeContext } from "../../../hooks/useTheme";
import { FontAwesome } from "react-native-vector-icons";
import { Feather, Ionicons, Entypo } from "react-native-vector-icons";
import Icon from "react-native-vector-icons/Ionicons";
import moment from "moment";
import RBSheet from "react-native-raw-bottom-sheet";
import { Linking } from "react-native";

export default function SingleNoticeEvent({ navigation, route }) {
  const { theme } = useThemeContext();
  const EventNotice = route?.params?.item;
  const [details, setDetails] = useState();
  const [selectedDocument, setselectedDocument] = useState([]);
  const [fileType, setFileType] = useState(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  console.log(`EventNotice`, EventNotice);
  const refRBSheet = useRef();

  useEffect(() => {
    setDetails(EventNotice);
  }, []);

  function getRandomHexColor() {
    const min = 0x33; // Minimum value to avoid very light colors
    const max = 0xff;

    // Helper function to generate a random integer between min and max
    function getRandomInt(min, max) {
      return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    // Generate random values for red, green, and blue components
    const red = getRandomInt(min, max);
    const green = getRandomInt(min, max);
    const blue = getRandomInt(min, max);

    // Convert to hexadecimal and ensure two digits for each component
    const redHex = red.toString(16).padStart(2, "0");
    const greenHex = green.toString(16).padStart(2, "0");
    const blueHex = blue.toString(16).padStart(2, "0");

    // Combine the components into a hex color string
    const hexColor = `#${redHex}${greenHex}${blueHex}`;

    return hexColor;
  }

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
            Notice & Events
          </Text>
        </View>
      ),

      headerRight: () => (
        <View style={{ marginRight: 10 }}>
          <TouchableOpacity
            onPress={() => {
              navigation.goBack();
            }}
          >
            <Entypo name="cross" size={20} color={theme.secondaryTextColor} />
          </TouchableOpacity>
        </View>
      ),
      headerStyle: {
        backgroundColor: theme.backgroundColor,
      },
      headerTitleAlign: "center",
      headerTintColor: theme.backgroundColor,
    });
  }, [navigation, theme]);

  const checkFileType = async (url) => {
    try {
      const response = await fetch(url, {
        method: "HEAD", // Fetch only headers
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const contentType = response.headers.get("content-type");

      if (contentType && contentType.startsWith("image/")) {
        return "image";
      } else if (contentType === "application/pdf") {
        return "pdf";
      } else {
        throw new Error("Unknown content type");
      }
    } catch (error) {
      console.error("Error checking file type:", error);
      throw error; // Handle or rethrow the error as needed
    }
  };

  const fetchFileType = async (url) => {
    try {
      setLoading(true);
      const type = await checkFileType(url);
      setFileType(type);
    } catch (error) {
      console.error("Error fetching file type:", error);
    } finally {
      setLoading(false);
    }
  };

  const onRefresh = useCallback(() => {}, []);

  useEffect(() => {
    // fetchFileType(item?.url);
    let FileTypeArray = [];
    EventNotice?.documents?.map((item) => {
      fetchFileType(item?.url);
    });
  }, []);

  // const handleSelectedDetail = (item) => {};

  return (
    <SafeAreaView
      style={{
        width: "100%",
        height: "100%",
        backgroundColor: theme.backgroundColor,
      }}
    >
      <ScrollView
        style={{ width: "100%" }}
        refreshControl={
          <RefreshControl onRefresh={onRefresh} refreshing={refreshing} />
        }
      >
        <View style={{ marginHorizontal: "auto", width: "90%" }}>
          <View
            style={[
              {
                display: "flex",
                flexDirection: "column",
                gap: 10,
                padding: 10,
                width: "100%",
              },
            ]}
          >
            <View>
              <Text
                style={{
                  fontSize: 16,
                  fontWeight: "bold",
                  color: theme.primaryTextColor,
                }}
              >
                {details?.title}
              </Text>
            </View>
            <View style={{ display: "flex", flexDirection: "row" }}>
              <Text
                style={{
                  fontSize: 12,
                  fontWeight: "bold",
                  color: theme.primaryTextColor,
                }}
              >
                Venue:{" "}
              </Text>
              <Text
                style={{
                  fontSize: 12,
                  fontWeight: "bold",
                  color: theme.secondaryTextColor,
                }}
              >
                {details?.venue}
              </Text>
            </View>
            <View
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                flexDirection: "row",
                marginBottom: 20,
              }}
            >
              <View
                style={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  gap: 5,
                }}
              >
                <FontAwesome
                  name="table"
                  size={20}
                  color={theme.primarycolor}
                />
                <Text style={{ color: theme.primaryTextColor }}>
                  {moment(details?.date).format("Do MMMM YYYY")}
                </Text>
              </View>
              <View
                style={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  gap: 5,
                }}
              >
                <FontAwesome
                  name="clock-o"
                  size={20}
                  color={theme.primarycolor}
                />
                <Text style={{ color: theme.primaryTextColor }}>
                  {calculateDuration(details?.startTime, details?.endTime)}
                </Text>
              </View>
            </View>
          </View>
        </View>
        <View style={{ margin: 20, gap: 20 }}>
          <Text
            style={{
              color: theme.primaryTextColor,
              fontSize: 14,
              fontWeight: "500",
            }}
          >
            Details :
          </Text>
          <View>
            <Text
              style={{
                color: theme?.secondaryTextColor,
                fontSize: 12,
                fontFamily: "Poppins_500Medium",
              }}
            >
              {details?.details}
            </Text>
          </View>
        </View>
        {details?.documents?.length > 0 && (
          <View style={{ marginTop: 10, gap: 10 }}>
            <Text>Attatchments :</Text>
            {details?.documents.map((item, index) => (
              <View key={index}>
                {fileType == "image" && (
                  <View style={{}}>
                    <View style={{ marginHorizontal: 20, marginTop: 10 }}>
                      <Text
                        style={{
                          color: theme.primaryTextColor,
                          fontFamily: "Poppins_600SemiBold",
                          fontSize: 14,
                        }}
                      >
                        Description :{" "}
                      </Text>
                      <Text
                        style={{
                          color: theme.secondaryTextColor,
                          fontFamily: "Poppins_500Medium",
                          fontSize: 12,
                        }}
                      >
                        {item?.description}
                      </Text>
                    </View>
                    <Image
                      source={{
                        uri: `http://d7y6l36yifl1o.cloudfront.net/${item?.key}`,
                        // uri: `https://unsplash.com/photos/aerial-view-photography-of-mountains-VO1EisKqdEE`,
                      }}
                      style={{
                        width: "80%",
                        height: 250,
                        borderRadius: 10,
                        marginHorizontal: "auto",
                      }}
                    />
                  </View>
                )}
                {fileType == "pdf" && (
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
                )}
                {fileType == null && (
                  <View>{/* <Text>Unknown file</Text> */}</View>
                )}
              </View>
            ))}
          </View>
        )}
        {/* {details?.documents?.length > 0 && (
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              flexWrap: "wrap",
              justifyContent: "space-around",
            }}
          >
            {details?.documents.map((item) => (
              <ImageBackground source={{ uri: item?.url }}>
                <TouchableOpacity
                  style={{
                    width: 150,
                    height: 100,
                    backgroundColor: "rgba(0, 0, 0, 0.5)",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                  onPress={() => {
                    handleSelectedDetail(item);
                  }}
                >
                  <Text style={{ color: "#ffffff" }}>View Detail</Text>
                </TouchableOpacity>
              </ImageBackground>
            ))}
          </View>
        )} */}
      </ScrollView>

      {/* <RBSheet
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
        <View style={{ marginHorizontal: 20 }}>
          {fileType == "image" && (
            <View style={{ gap: 20 }}>
              <Image
                source={{ uri: selectedDocument?.url }}
                style={{
                  width: "80%",
                  height: 250,
                  borderRadius: 10,
                  marginHorizontal: "auto",
                }}
              />
              <View>
                <Text
                  style={{
                    color: theme.primaryTextColor,
                    fontFamily: "Poppins_600SemiBold",
                    fontSize: 14,
                  }}
                >
                  Description :{" "}
                </Text>
                <Text
                  style={{
                    color: theme.secondaryTextColor,
                    fontFamily: "Poppins_500Medium",
                    fontSize: 12,
                  }}
                >
                  {selectedDocument?.description}
                </Text>
              </View>
            </View>
          )}
          {fileType == "pdf" && (
            <View>
              <Text>PDF</Text>
            </View>
          )}
          {fileType == null && (
            <View>
              <Text>Unknown file</Text>
            </View>
          )}
        </View>
      </RBSheet> */}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({});
