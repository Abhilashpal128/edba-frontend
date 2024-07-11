import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useThemeContext } from "../../../hooks/useTheme";
// import { theme } from "../../../theming";

const CustomTabs = ({ tabs, children }) => {
  const { theme } = useThemeContext();
  const [activeTab, setActiveTab] = useState(0);

  return (
    <View style={{ flex: 1 }}>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-around",
          backgroundColor: theme.backgroundColor,
          borderBottomWidth: 1,
          borderBottomColor: "#ccc",
        }}
      >
        {tabs.map((tab, index) => (
          <TouchableOpacity
            key={index}
            style={[
              {
                paddingVertical: 10,
                paddingHorizontal: 20,
              },
              activeTab === index && {
                borderBottomWidth: 2,
                borderBottomColor: "blue",
              },
            ]}
            onPress={() => setActiveTab(index)}
          >
            <Text
              style={[
                {
                  fontSize: 16,
                  color: "gray",
                },
                activeTab === index && {
                  color: "blue",
                },
                ,
              ]}
            >
              {tab}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
      <View
        style={{
          flex: 1,
          padding: 10,
        }}
      >
        {children[activeTab]}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({});

export default CustomTabs;
