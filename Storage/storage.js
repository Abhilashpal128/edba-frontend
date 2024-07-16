import AsyncStorage from "@react-native-async-storage/async-storage";

export const storeDataInStorage = async (key, data) => {
  try {
    const jsonValue = JSON.stringify(data);
    await AsyncStorage?.setItem(key, jsonValue);
    console.log(`data stored successfully`);
  } catch (error) {
    console.log(`error while storing data`, error);
  }
};

export const getDataFromStorage = async (key) => {
  try {
    const data = await AsyncStorage?.getItem(key);
    if (data != null) {
      console.log(`data retrieve ksuccessfully`, data);
      return JSON.parse(data);
    }
    return null;
  } catch (error) {
    console.log(`error while getting data`, error);
  }
};

export const cleardatafromStorage = async () => {
  try {
    await AsyncStorage.removeItem("userData");
    console.log("Data cleared successfully");
  } catch (error) {
    console.error("Failed to clear data:", error);
  }
};
