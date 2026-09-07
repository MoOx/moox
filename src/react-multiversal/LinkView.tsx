import LinkText from "@/react-multiversal/LinkText";
import { LinkTextProps } from "@/react-multiversal/LinkText.types";
import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  linkView: {
    display: "flex",
    flexDirection: "column",
  },
});

/**
 * A link shaped like a box: an anchor is the one element that is both a link
 * and able to wrap a layout, so this is `LinkText` (a `Text`, rendered as `<a>`)
 * flipped to `display: flex`, which blockifies it and lets it lay its children
 * out like a `View` would.
 *
 * `LinkView.native.tsx` is the other half: neither `display: flex` on a text
 * node nor a view nested in a text node behaves on a device, so the native link
 * is a `Pressable`.
 */

export default function LinkView({ style, containerStyle, ...props }: LinkTextProps) {
  return (
    <LinkText
      containerStyle={[styles.linkView, containerStyle]}
      style={[styles.linkView, style]}
      {...props}
    />
  );
}
