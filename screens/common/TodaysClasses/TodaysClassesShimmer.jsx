import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { createShimmerPlaceholder } from "react-native-shimmer-placeholder";
import { LinearGradient } from "expo-linear-gradient";

export default function TodaysClassesShimmer() {
  const ShimmerPlaceholder = createShimmerPlaceholder(LinearGradient);

  return (
    <View style={{ marginHorizontal: 10, gap: 10 }}>
      <ShimmerPlaceholder
        style={{ width: 100, height: 10, borderRadius: 10 }}
      />
      <View
        style={{
          width: "100%",
          display: "flex",
          flexDirection: "row",
          flexWrap: "wrap",
          justifyContent: "center",
          gap: 10,
        }}
      >
        <ShimmerPlaceholder
          style={{ width: "45%", height: 80, borderRadius: 10 }}
        />
        <ShimmerPlaceholder
          style={{ width: "45%", height: 80, borderRadius: 10 }}
        />
        <ShimmerPlaceholder
          style={{ width: "45%", height: 80, borderRadius: 10 }}
        />
        <ShimmerPlaceholder
          style={{ width: "45%", height: 80, borderRadius: 10 }}
        />
        {/* <ShimmerPlaceholder
          style={{ width: "45%", height: 80, borderRadius: 10 }}
        />
        <ShimmerPlaceholder
          style={{ width: "45%", height: 80, borderRadius: 10 }}
        /> */}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({});
