import React, { useContext, useLayoutEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  StyleSheet,
  Appearance,
  useColorScheme,
} from "react-native";
import RadioButton from "./RadioButton";
// import { setTheme, theme } from "../../../theming";
import { useNavigation } from "@react-navigation/native";
import { useThemeContext } from "../../../hooks/useTheme";
import { getTheme } from "../../../theming";

const ThemeSetting = ({ toggleThemeModelOpen }) => {
  const { theme } = useThemeContext();

  const [selectedOption, setSelectedOption] = useState();
  const navigation = useNavigation();
  const { ChangeTheme } = useThemeContext();

  const options = [
    { id: "1", label: "Light Mode", value: "light" },
    { id: "2", label: "Dark Mode", value: "dark" },
    { id: "3", label: "System Default", value: "default" },
  ];

  useLayoutEffect(() => {
    getCurrentTheme();
  }, []);

  const getCurrentTheme = async () => {
    const currentTheme = await getTheme();
    setSelectedOption(currentTheme.toLowerCase());
  };

  const handleChangeTheme = async () => {
    console.log(selectedOption);
    // setTheme(JSON.stringify(selectedOption));
    // console.log(`changeTheme`, ChangeTheme());
    await ChangeTheme(selectedOption);
    toggleThemeModelOpen();
    navigation.navigate("Home");
  };

  return (
    <TouchableWithoutFeedback>
      <View
        style={{
          width: "90%",
          backgroundColor: "#fff",
          borderRadius: 10,
          padding: 20,
        }}
      >
        <Text
          style={{
            fontSize: 16,
            fontWeight: "semibold",
            marginBottom: 20,
            color: theme.primaryTextColor,
          }}
        >
          Theme
        </Text>
        <View style={{ gap: 10 }}>
          {options.map((option) => (
            <RadioButton
              key={option.id}
              label={option.label}
              selected={selectedOption === option.value}
              onPress={() => setSelectedOption(option.value)}
            />
          ))}
        </View>

        <View
          style={{
            flexDirection: "row",
            justifyContent: "flex-end",
            marginTop: 20,
            gap: 20,
          }}
        >
          <TouchableOpacity
            onPress={() => {
              toggleThemeModelOpen();
            }}
          >
            <Text
              style={{
                fontSize: 14,
                color: theme.primarycolor,
              }}
            >
              Cancel
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              handleChangeTheme();
            }}
          >
            <Text
              style={{
                fontSize: 14,
                color: theme.primarycolor,
              }}
            >
              Save
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({});

export default ThemeSetting;
