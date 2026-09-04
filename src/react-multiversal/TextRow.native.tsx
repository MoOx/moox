import { ReactNode } from "react";
import { StyleProp, View, ViewStyle } from "react-native";

export type TextRowProps = {
  children?: ReactNode;
  style?: StyleProp<ViewStyle>;
};

// Yoga has no `display: flex` for a `Text`, so the web markup (a flexed <span>)
// would collapse back into a single run of text on a device. A `View` is the
// native equivalent, and it is also what lets a child be a view at all: this is
// where a `GradientText` gets to mask through one without sitting inside a
// `Text`.
//
// `alignItems: "baseline"` is what keeps the parts sitting on the same line as
// they do in a text run on web.
export default function TextRow({ children, style }: TextRowProps) {
  return (
    <View style={[{ flexDirection: "row", alignItems: "baseline", flexWrap: "wrap" }, style]}>
      {children}
    </View>
  );
}
