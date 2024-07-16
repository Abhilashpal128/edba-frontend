import { LinearGradient } from "expo-linear-gradient";
import { View } from "react-native";
import { createShimmerPlaceholder } from "react-native-shimmer-placeholder";

export const GradeShimmerEffect = () => {
  const ShimmerPlaceholder = createShimmerPlaceholder(LinearGradient);
  return (
    <View style={{ gap: 20 }}>
      <ShimmerPlaceholder
        style={{
          width: 320,
          height: 150,
          borderRadius: 10,
        }}
      />
      <ShimmerPlaceholder
        style={{
          width: 320,
          height: 150,
          borderRadius: 10,
        }}
      />
      <ShimmerPlaceholder
        style={{
          width: 320,
          height: 150,
          borderRadius: 10,
        }}
      />
    </View>
  );
};
