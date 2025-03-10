import * as React from "react";
import { Image, View } from "react-native";

export default function Avatar({
  size = 48,
  borderWidth = 0.5,
  borderColor = "#000",
  uri = "/avatar.jpg",
}: {
  size?: number;
  borderWidth?: number;
  borderColor?: string;
  uri?: string;
}) {
  const width = size - borderWidth * 2;
  const height = size - borderWidth * 2;
  const source = {
    uri: uri,
    width: width,
    height: height,
  };
  return (
    <View
      style={{
        borderWidth: borderWidth,
        borderColor: borderColor,
        borderRadius: size,
        width: size,
        height: size,
        overflow: "hidden",
      }}
    >
      <Image defaultSource={source} source={source} alt="" />
    </View>
  );
}
