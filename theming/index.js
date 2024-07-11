// import { useTheme } from "../hooks/useTheme";

import AsyncStorage from "@react-native-async-storage/async-storage";

// import { useSelector } from "react-redux";

export const lightTheme = {
  backgroundColor: "#FFFFFF",
  primaryTextColor: "#222222",
  secondaryTextColor: "#6A6A6A",
  ternaryTextColor: "#777777",
  primarycolor: "#2B78CA",
  BoxColor: "#F8F3FC",
  DrawerTabBackgroundColor: "#F4F8FC",
  oppositeTheme: "#1F1F1F",
  cardBackground: "#6F0FBA0D",
};

export const darkTheme = {
  backgroundColor: "#1F1F1F",
  primaryTextColor: "#D3D3D3",
  secondaryTextColor: "#71778E",
  ternaryTextColor: "#71778E",
  primarycolor: "#2B78CA",
  oppositeTheme: "#FFFFFF",
  DrawerTabBackgroundColor: "#333333",
  cardBackground: "#6F0FBA88",
};

// export let theme = lightTheme;

export const getTheme = async () => {
  try {
    const themeName = await AsyncStorage.getItem("theme");
    if (themeName !== null) {
      console.log("Theme retrieved successfully:", themeName);
      return themeName;
    } else {
      console.log("No theme found");
    }
  } catch (error) {
    console.error("Error retrieving theme", error);
  }
  return null;
};

export const setTheme = async (themeName) => {
  try {
    await AsyncStorage.setItem("theme", themeName);
    console.log("Theme saved successfully");
  } catch (error) {
    console.error("Error saving theme", error);
  }
};
