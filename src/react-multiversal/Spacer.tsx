import { StyleProp, View, ViewStyle } from "react-native";

import { AbsoluteSize, styleSquare } from "@/react-multiversal";

const Spacer = ({
  size = "m",
  style,
}: {
  size?: AbsoluteSize;
  style?: StyleProp<ViewStyle>;
}) => <View style={[styleSquare(size), style]} />;

export default Spacer;
