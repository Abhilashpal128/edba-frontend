import {
  Alert,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useLayoutEffect, useState } from "react";
import { Controller, useFieldArray, useForm } from "react-hook-form";
import { useThemeContext } from "../../../hooks/useTheme";
import CustomTextArea from "../../common/CustomResources/CustomTextArea";
import {
  Ionicons,
  Entypo,
  AntDesign,
  FontAwesome,
} from "react-native-vector-icons";
import moment from "moment";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { useTheme } from "react-native-paper";
import { post } from "../../../utils/apis/TeacherApis/login";

export default function EditAssignment({ navigation, route }) {
  const Assignmentdata = route?.params?.Assignment;

  const { colors } = useTheme();
  const { theme } = useThemeContext();
  const [fileName, setFileName] = useState(Assignmentdata?.documents[0]?.label);
  const TodaysDate = new Date();
  const [submissionDate, setSubmissionDate] = useState(TodaysDate);
  const [isDatePickerVisible, setIsDatePickerVisible] = useState(false);
  console.log(`Assignmentdata Update`, Assignmentdata);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Entypo
            name="chevron-thin-left"
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
            Edit Assignment
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
      headerTitleAlign: "center",
      headerTintColor: theme.backgroundColor,
    });
  }, [navigation,theme]);

  //   const {
  //     control,
  //     handleSubmit,
  //     formState: { errors },
  //   } = useForm();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: Assignmentdata?.name,
      name: Assignmentdata?.name || "",
      instructions: Assignmentdata?.instructions || [""],
      resources: Assignmentdata?.resources || [""],
    },
  });

  const onSubmit = async (data) => {
    console.log(`submittedData`, data);
    const response = await post("assignments/update", {
      id: Assignmentdata?.id,
      ...data,
      submissionDate: submissionDate,
    });
    if (response?.errCode == -1) {
      Alert.alert("Assignment Updated successfullt");
      //   navigation.navigate("Assignments");
      navigation.goBack();
    } else {
      Alert.alert("Error While Updating Assignment");
    }
    console.log(`Updated Response `, response);
  };

  const pickFile = async () => {
    // DocumentPicker;
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: "*/*", // all files
        copyToCacheDirectory: false,
      });

      console.log(`result`, result);

      if (result.type !== "cancel") {
        // Check if user didn't cancel
        console.log("Result:", result);

        const { uri, mimeType, name } = result.assets[0];

        // const fileInfo = await FileSystem.getInfoAsync(uri);
        // console.log(`fileInfo.uri`, fileInfo);
        // console.log(`URLIMage`, URLIMage);
        console.log("URI:", uri);
        console.log("Type:", mimeType);
        console.log("Name:", name);

        setFileUri(uri);
        setFileType(mimeType);
        setFileName(name);
      } else {
        console.log("User cancelled the picker");
      }
    } catch (error) {
      console.log("Error picking file", error);
    }
  };
  const {
    fields: instructionFields,
    append: appendInstruction,
    remove: removeInstruction,
  } = useFieldArray({
    control,
    name: "instructions",
  });

  const {
    fields: resourceFields,
    append: appendResource,
    remove: removeResource,
  } = useFieldArray({
    control,
    name: "resources",
  });

  const hideDatePicker = () => {
    setIsDatePickerVisible(false);
  };

  const handleDateConfirm = (date) => {
    setSubmissionDate(moment(date).format("YYYY-MM-DD"));
    setIsDatePickerVisible(false);
  };

  return (
    <SafeAreaView
      style={{
        width: "100%",
        height: "100%",
        backgroundColor: theme.backgroundColor,
      }}
    >
      <ScrollView>
        <View style={{ margin: 20 }}>
          <View>
            <Text
              style={{
                paddingTop: 10,
                marginBottom: 5,
                fontSize: 14,
                fontWeight: "600",
                color: theme.primaryTextColor,
              }}
            >
              Assignment Topic
            </Text>
            <Controller
              control={control}
              rules={{ required: true }}
              render={({ field: { onChange, value } }) => (
                <TextInput
                  style={[
                    {
                      borderBottomWidth: 1,
                      borderColor: `${theme.secondaryTextColor}80`,
                    },
                    errors.name && {
                      borderColor: "red",
                    },
                  ]}
                  onChangeText={onChange}
                  value={value}
                  placeholder="Enter Assignment topic here"
                  placeholderTextColor={`${theme.secondaryTextColor}`}
                />
              )}
              name="name"
              defaultValue=""
            />
            {errors.name && (
              <Text
                style={{
                  color: "red",
                  marginBottom: 10,
                }}
              >
                This field is required
              </Text>
            )}

            <Text
              style={{
                paddingTop: 10,
                marginBottom: 5,
                fontSize: 14,
                fontWeight: "600",
                color: theme.primaryTextColor,
              }}
            >
              Instructions :
            </Text>
            {instructionFields.map((field, index) => (
              <View
                key={field.id}
                style={{ flexDirection: "row", alignItems: "center" }}
              >
                <Controller
                  control={control}
                  rules={{ required: true }}
                  render={({ field: { onChange, value } }) => (
                    <TextInput
                      style={[
                        {
                          borderBottomWidth: 1,
                          borderColor: `${theme.secondaryTextColor}80`,
                          flex: 1,
                        },
                        errors.instructions && {
                          borderColor: "red",
                        },
                      ]}
                      onChangeText={onChange}
                      value={value}
                      placeholder="Enter instruction here"
                      placeholderTextColor={`${theme.secondaryTextColor}`}
                    />
                  )}
                  name={`instructions.${index}`}
                />
                <TouchableOpacity onPress={() => removeInstruction(index)}>
                  <Ionicons
                    name="remove-circle-outline"
                    size={24}
                    color="red"
                  />
                </TouchableOpacity>
              </View>
            ))}
            <TouchableOpacity onPress={() => appendInstruction("")}>
              <Text style={{ color: theme.primarycolor }}>Add Instruction</Text>
            </TouchableOpacity>
            {errors.instructions && (
              <Text
                style={{
                  color: "red",
                  marginBottom: 10,
                }}
              >
                This field is required
              </Text>
            )}
            {/* <Controller
              control={control}
              rules={{ required: true }}
              render={({ field: { onChange, value } }) => (
                <TextInput
                  style={[
                    {
                      borderBottomWidth: 1,
                      borderColor: `${theme.secondaryTextColor}80`,
                    },
                    errors.name && {
                      borderColor: "red",
                    },
                  ]}
                  onChangeText={onChange}
                  value={value}
                  placeholder="Enter Assignment topic here"
                  placeholderTextColor={`${theme.secondaryTextColor}`}
                />
                // <CustomTextArea
                //   value={value}
                //   onChangeText={onChange}
                //   placeholder="Enter resources here"
                //   numberOfLines={3}
                // />
              )}
              name="instructions"
              defaultValue=""
            />
            {errors.instructions && (
              <Text
                style={{
                  color: "red",
                  marginBottom: 10,
                }}
              >
                This field is required
              </Text>
            )} */}

            <Text
              style={{
                paddingTop: 10,
                marginBottom: 5,
                fontSize: 14,
                fontWeight: "600",
                color: theme.primaryTextColor,
              }}
            >
              Resources :
            </Text>
            {resourceFields.map((field, index) => (
              <View
                key={field.id}
                style={{ flexDirection: "row", alignItems: "center" }}
              >
                <Controller
                  control={control}
                  rules={{ required: true }}
                  render={({ field: { onChange, value } }) => (
                    <TextInput
                      style={[
                        {
                          borderBottomWidth: 1,
                          borderColor: `${theme.secondaryTextColor}80`,
                          flex: 1,
                        },
                        errors.resources && {
                          borderColor: "red",
                        },
                      ]}
                      onChangeText={onChange}
                      value={value}
                      placeholder="Enter resource here"
                      placeholderTextColor={`${theme.secondaryTextColor}`}
                    />
                  )}
                  name={`resources.${index}`}
                />
                <TouchableOpacity onPress={() => removeResource(index)}>
                  <Ionicons
                    name="remove-circle-outline"
                    size={24}
                    color="red"
                  />
                </TouchableOpacity>
              </View>
            ))}
            <TouchableOpacity onPress={() => appendResource("")}>
              <Text style={{ color: theme.primarycolor }}>Add Resource</Text>
            </TouchableOpacity>
            {errors.resources && (
              <Text
                style={{
                  color: "red",
                  marginBottom: 10,
                }}
              >
                This field is required
              </Text>
            )}
          </View>
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "flex-end",
              marginRight: 10,
              marginTop: 10,
            }}
          >
            <TouchableOpacity
              onPress={pickFile}
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: "#EAF1FA",
                width: "50%",
                height: 40,
                borderRadius: 5,
                gap: 4,
              }}
            >
              <FontAwesome name="upload" size={16} color="#666666" />
              <Text style={{ color: theme.primaryTextColor }}>
                {fileName == null ? "Upload Document" : "Change Document"}
              </Text>
            </TouchableOpacity>
          </View>
          {fileName == null ? (
            ""
          ) : (
            <Text
              style={{
                textAlign: "right",
                marginRight: 10,
                color: theme.primaryTextColor,
              }}
            >
              {fileName}
            </Text>
          )}
          <View>
            <Text>Submission Date</Text>
          </View>
          <View
            style={{
              flexDirection: "row",
              // alignItems: "flex-end",
              // justifyContent: "flex-end",
              width: "100%",
            }}
          >
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
                  {moment(submissionDate).format("D MMM YYYY")}
                </Text>
                <AntDesign
                  name="calendar"
                  size={18}
                  color={theme.primaryTextColor}
                />
              </View>
            </TouchableOpacity>
          </View>
          <View
            style={{
              marginTop: 10,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {/* <Button title="Submit" onPress={handleSubmit(onSubmit)} /> */}
            <TouchableOpacity
              style={{
                width: "90%",
                height: 40,
                backgroundColor: theme.primarycolor,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                borderRadius: 7,
              }}
              onPress={handleSubmit(onSubmit)}
            >
              <Text style={{ color: "#FFFFFF" }}>UPDATE</Text>
            </TouchableOpacity>
          </View>
        </View>

        <DateTimePickerModal
          isVisible={isDatePickerVisible}
          mode="date"
          textColor={colors.text}
          minimumDate={new Date()}
          date={submissionDate ? new Date(submissionDate) : new Date()}
          onConfirm={handleDateConfirm}
          onCancel={hideDatePicker}
        />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({});
