import React from "react";
import { Text, View } from "react-native";
import { SvgXml } from "react-native-svg";

const SvgRenderer = ({ svgContent }) => {
  console.log(`svgContent`, svgContent);
  if (!svgContent) {
    return (
      <View>
        <Text>SVG content is not available</Text>
      </View>
    );
  }

  return <SvgXml xml={svgContent} width={40} height={40} />;
};

export default SvgRenderer;
