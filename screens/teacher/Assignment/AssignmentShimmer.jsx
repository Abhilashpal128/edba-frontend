import { FlatList, StyleSheet, Text, View } from "react-native";
import React from "react";
import { createShimmerPlaceholder } from "react-native-shimmer-placeholder";
import { LinearGradient } from "expo-linear-gradient";

export default function AssignmentShimmer() {
  const ShimmerPlaceholder = createShimmerPlaceholder(LinearGradient);

  const renderItemShimmer = ({ item }) => (
    <View
      style={{
        display: "flex",
        flexDirection: "column",
        gap: 10,
        paddingVertical: 8,
      }}
    >
      <ShimmerPlaceholder style={styles.HeaderShimmer} />
      <ShimmerPlaceholder style={styles.shimmerCard} />
    </View>
    // <View style={{ width: "100%", height: 100, flexDirection: "row" }}>
    //   {[1, 2, 3, 4].map((_, index) => (
    //     <View key={index} style={{ flex: 1, marginHorizontal: 5 }}>
    //       <ShimmerPlaceholder visible={isLoading} style={styles.HeaderShimmer} />
    //       <ShimmerPlaceholder visible={isLoading} style={styles.shimmerCard} />
    //     </View>
    //   ))}
    // </View>
  );
  return (
    <View
      style={{
        width: "100%",
        height: "100%",
        paddingTop: 20,
        alignItems: "center",
      }}
    >
      <FlatList
        data={[1, 2, 3, 4]}
        keyExtractor={(item, index) => `${item}${index}`}
        renderItem={renderItemShimmer}
      />
      {/* <ShimmerPlaceholder
            style={styles.shimmer}
            visible={isLoading}
            shimmerColors={["#a9a9a9", "#d3d3d3", "#a9a9a9"]}
          /> */}
    </View>
  );
}

const styles = StyleSheet.create({
  HeaderShimmer: {
    width: 100,
    height: 15,
    borderRadius: 10,
  },

  shimmerCard: {
    width: 320,
    height: 150,
    borderRadius: 10,
  },
});
