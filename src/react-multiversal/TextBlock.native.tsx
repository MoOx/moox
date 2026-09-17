import { ReactNode } from "react";
import { StyleProp, View, ViewStyle } from "react-native";

export type TextBlockProps = {
  children?: ReactNode;
  style?: StyleProp<ViewStyle>;
};

// React Native lays a `Text` out as inline text and Yoga has no `display: flex`
// for it, so the web markup (a flexed <p>) collapses to a single run of text on
// a device. A `View` is the native equivalent: its `Text` children are real
// flex items again, and each one gets back the box-level styles (`textAlign`,
// `position`, margins) a nested `Text` ignores.
//
// `accessible` restores what the <p> gave for free on web: the children are
// announced as one paragraph instead of one focus stop per line.
export default function TextBlock({ children, style }: TextBlockProps) {
  return (
    <View accessible role="paragraph" style={style}>
      {children}
    </View>
  );
}
