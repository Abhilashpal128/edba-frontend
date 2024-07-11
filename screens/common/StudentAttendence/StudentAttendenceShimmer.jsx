import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { createShimmerPlaceholder } from "react-native-shimmer-placeholder";
import { LinearGradient } from "expo-linear-gradient";

export default function StudentAttendenceShimmer() {
  const ShimmerPlaceholder = createShimmerPlaceholder(LinearGradient);
  return (
    <View style={{ gap: 10 }}>
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          marginHorizontal: 10,
        }}
      >
        <ShimmerPlaceholder style={{ width: 100, borderRadius: 10 }} />
        <ShimmerPlaceholder style={{ width: 100, borderRadius: 10 }} />
      </View>
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "flex-end",
          marginHorizontal: 10,
        }}
      >
        <ShimmerPlaceholder
          style={{ width: 100, borderRadius: 10, height: 30 }}
        />
      </View>
      <View>
        <ShimmerPlaceholder style={{ width: "90%", height: 200,marginHorizontal:'auto',borderRadius:10 }} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({});
