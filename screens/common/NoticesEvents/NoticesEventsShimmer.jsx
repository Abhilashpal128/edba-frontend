import { ScrollView, StyleSheet, Text, View } from "react-native";
import React from "react";
import { createShimmerPlaceholder } from "react-native-shimmer-placeholder";
import { LinearGradient } from "expo-linear-gradient";

export default function NoticesEventsShimmer() {
  const ShimmerPlaceholder = createShimmerPlaceholder(LinearGradient);
  return (
    <View style={{ marginHorizontal: 10, marginTop: 10 }}>
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
        <ScrollView horizontal={true}>
          <View
            style={{
              height: 150,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "row",
              gap: 10,
              marginHorizontal: 10,
            }}
          >
            <ShimmerPlaceholder
              style={{ height: 120, width: 250, borderRadius: 10 }}
            />
            <ShimmerPlaceholder
              style={{ height: 120, width: 250, borderRadius: 10 }}
            />
          </View>
        </ScrollView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({});
