import { ReactNode } from "react";
import { StyleProp, StyleSheet, Text, TextStyle, ViewStyle } from "react-native";

export type TextRowProps = {
  children?: ReactNode;
  style?: StyleProp<ViewStyle>;
};

const styles = StyleSheet.create({
  row: {
    display: "flex",
    flexDirection: "row",
    alignItems: "baseline",
    flexWrap: "wrap",
  },
});

// One line of text whose parts are laid out as boxes rather than as a text run.
//
// The inline counterpart of `TextBlock`, and it exists for the same reason: on
// web the node has to be a `Text`, which renders a <span>, because a <div>
// inside a <p> closes the paragraph and breaks hydration. Flexing that span
// turns its `Text` children into flex items without ever leaving the text flow.
//
// What it is for: a segment that cannot be inline on a device, such as a
// `GradientText`, which masks through a view there. See TextRow.native.tsx.
export default function TextRow({ children, style }: TextRowProps) {
  return (
    // `ViewStyle` because that is what the native half takes.
    <Text style={[styles.row, style as StyleProp<TextStyle>]}>{children}</Text>
  );
}
