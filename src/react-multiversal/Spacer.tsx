import { AbsoluteSize, styleSquare } from "@/react-multiversal";
import { StyleProp, View, ViewStyle } from "react-native";

const Spacer = ({
  size = "m",
  style,
}: {
  size?: AbsoluteSize;
  style?: StyleProp<ViewStyle>;
}) => <View style={[styleSquare(size), style]} />;

export default Spacer;
