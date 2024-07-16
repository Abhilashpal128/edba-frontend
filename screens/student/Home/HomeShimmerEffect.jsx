import { LinearGradient } from "expo-linear-gradient";
import { View } from "react-native";
import { createShimmerPlaceholder } from "react-native-shimmer-placeholder";

export const TodaysClassesShimmer = () => {
  const ShimmerPlaceholder = createShimmerPlaceholder(LinearGradient);
  return (
    <View style={{ gap: 20 }}>
      <View>
        <ShimmerPlaceholder
          style={{ height: 20, width: 150, borderRadius: 10 }}
        />
      </View>
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          flexWrap: "wrap",
          gap: 10,
          marginHorizontal: "auto",
        }}
      >
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
        <ShimmerPlaceholder
          style={{ width: 100, height: 80, borderRadius: 10 }}
        />
        <ShimmerPlaceholder
          style={{ width: 100, height: 80, borderRadius: 10 }}
        />
      </View>
    </View>
  );
};

export const SubjectAssignmentShimmer = () => {
  const ShimmerPlaceholder = createShimmerPlaceholder(LinearGradient);
  return (
    <View style={{ gap: 20 }}>
      <View>
        <ShimmerPlaceholder
          style={{ height: 20, width: 150, borderRadius: 10 }}
        />
      </View>
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          flexWrap: "wrap",
          gap: 10,
          marginHorizontal: "auto",
        }}
      >
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
        <ShimmerPlaceholder
          style={{ width: 100, height: 80, borderRadius: 10 }}
        />
        <ShimmerPlaceholder
          style={{ width: 100, height: 80, borderRadius: 10 }}
        />
      </View>
    </View>
  );
};
