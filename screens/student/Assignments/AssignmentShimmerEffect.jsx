import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { createShimmerPlaceholder } from "react-native-shimmer-placeholder";
import { LinearGradient } from "expo-linear-gradient";

export function AssignmentShimmerEffect() {
  const ShimmerPlaceholder = createShimmerPlaceholder(LinearGradient);
  return (
    <View>
      <View style={{ marginTop: 20 }}>
        <ShimmerPlaceholder
          style={{ height: 20, width: 200, borderRadius: 5 }}
        />
      </View>
      <View style={{ display: "flex", gap: 10, marginTop: 40 }}>
        <ShimmerPlaceholder
          style={{ height: 45, width: "90%", borderRadius: 10 }}
        />
        <ShimmerPlaceholder
          style={{ height: 45, width: "90%", borderRadius: 10 }}
        />
        <ShimmerPlaceholder
          style={{ height: 45, width: "90%", borderRadius: 10 }}
        />
        <ShimmerPlaceholder
          style={{ height: 45, width: "90%", borderRadius: 10 }}
        />
        <ShimmerPlaceholder
          style={{ height: 45, width: "90%", borderRadius: 10 }}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({});

export const SubjectShimmerEffect = () => {
  const ShimmerPlaceholder = createShimmerPlaceholder(LinearGradient);
  return (
    <View style={{ display: "flex", flexDirection: "row", gap: 10 }}>
      <ShimmerPlaceholder
        style={{ width: 100, height: 80, borderRadius: 10 }}
      />
      <ShimmerPlaceholder
        style={{ width: 100, height: 80, borderRadius: 10 }}
      />
      <ShimmerPlaceholder
        style={{ width: 100, height: 80, borderRadius: 10 }}
      />
      <ShimmerPlaceholder
        style={{ width: 100, height: 80, borderRadius: 10 }}
      />
    </View>
  );
};
