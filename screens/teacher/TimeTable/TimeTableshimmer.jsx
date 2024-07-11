import { ScrollView, StyleSheet, Text, View } from "react-native";
import React from "react";
import { createShimmerPlaceholder } from "react-native-shimmer-placeholder";
import { LinearGradient } from "expo-linear-gradient";

export default function TimeTableshimmer() {
  const ShimmerPlaceholder = createShimmerPlaceholder(LinearGradient);

  return (
    <View>
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",

          height: 50,
          marginHorizontal: 20,
        }}
      >
        <ShimmerPlaceholder style={{ width: 100, borderRadius: 10 }} />
        <ShimmerPlaceholder
          style={{ width: 100, height: 30, borderRadius: 10 }}
        />
      </View>
      <ScrollView horizontal={true}>
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            gap: 10,
            marginHorizontal: 20,
          }}
        >
          <ShimmerPlaceholder
            style={{ width: 90, height: 40, borderRadius: 40 }}
          />
          <ShimmerPlaceholder
            style={{ width: 90, height: 40, borderRadius: 40 }}
          />
          <ShimmerPlaceholder
            style={{ width: 90, height: 40, borderRadius: 40 }}
          />
          <ShimmerPlaceholder
            style={{ width: 90, height: 40, borderRadius: 40 }}
          />
        </View>
      </ScrollView>
      <ScrollView>
        <View
          style={{
            width: "100%",
            height: "100%",
            display: "flex",
            flexDirection: "row",
            marginTop: 50,
            gap: 10,
            marginHorizontal: 10,
          }}
        >
          <ShimmerPlaceholder style={{ width: 80, height: "100%" }} />
          <View
            style={{
              height: "100%",
              gap: 10,
              marginTop: 100,
            }}
          >
            <ShimmerPlaceholder style={{ width: 100, height: 80 }} />
            <ShimmerPlaceholder style={{ width: 100, height: 80 }} />
            <ShimmerPlaceholder style={{ width: 100, height: 80 }} />
            <ShimmerPlaceholder style={{ width: 100, height: 80 }} />
            <ShimmerPlaceholder style={{ width: 100, height: 80 }} />
          </View>
          <View
            style={{
              height: "100%",
              gap: 10,
              marginTop: 100,
            }}
          >
            <ShimmerPlaceholder style={{ width: 100, height: 80 }} />
            <ShimmerPlaceholder style={{ width: 100, height: 80 }} />
            <ShimmerPlaceholder style={{ width: 100, height: 80 }} />
            <ShimmerPlaceholder style={{ width: 100, height: 80 }} />
            <ShimmerPlaceholder style={{ width: 100, height: 80 }} />
          </View>
          <View
            style={{
              height: "100%",
              gap: 10,
              marginTop: 100,
            }}
          >
            <ShimmerPlaceholder style={{ width: 100, height: 80 }} />
            <ShimmerPlaceholder style={{ width: 100, height: 80 }} />
            <ShimmerPlaceholder style={{ width: 100, height: 80 }} />
            <ShimmerPlaceholder style={{ width: 100, height: 80 }} />
            <ShimmerPlaceholder style={{ width: 100, height: 80 }} />
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({});
