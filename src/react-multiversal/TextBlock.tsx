import { ReactNode } from "react";
import { StyleProp, StyleSheet, Text, TextStyle, ViewStyle } from "react-native";

export type TextBlockProps = {
  children?: ReactNode;
  style?: StyleProp<ViewStyle>;
};

const styles = StyleSheet.create({
  block: { display: "flex", flexDirection: "column" },
});

// A stack of text lines that stays one paragraph for a screen reader.
//
// On web the outer node has to be a `Text` with `role="paragraph"`: it renders
// a <p> whose `Text` children render as <span>, which is the only nesting the
// HTML parser accepts (a <div> inside a <p> closes the paragraph). Flipping
// that <p> to `display: flex` blockifies the spans, so they stack like the
// views they would have been.
//
// See TextBlock.native.tsx for the other half: `display` does not exist in
// Yoga, so this very markup lays out inline on a device.
export default function TextBlock({ children, style }: TextBlockProps) {
  return (
    // The prop is a `ViewStyle` because that is what the native half takes, and
    // because a text style on this node would not reach the children there.
    <Text role="paragraph" style={[styles.block, style as StyleProp<TextStyle>]}>
      {children}
    </Text>
  );
}
