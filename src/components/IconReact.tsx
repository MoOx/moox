import SVGReact from "@/svgs/components/SVGReact";
import { View } from "react-native";
import { SvgProps } from "react-native-svg";

export default function IconReact({
  width = 24,
  height = 24,
  ...props
}: SvgProps) {
  return (
    <View
      style={{
        backgroundColor: "#fff",
        borderRadius: 8,
        justifyContent: "center",
        alignItems: "center",
        width: width,
        height: height,
      }}
    >
      <SVGReact
        {...props}
        width={parseFloat(width.toString()) * 0.8}
        height={parseFloat(height.toString()) * 0.8}
        fill="rgb(8, 126, 164)"
      />
    </View>
  );
}
