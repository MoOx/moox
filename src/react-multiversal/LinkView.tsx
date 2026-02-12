import LinkText, { LinkTextProps } from "@/react-multiversal/LinkText";
import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  linkView: {
    display: "flex",
    flexDirection: "column",
  },
});

export default function LinkView({
  style,
  containerStyle,
  ...props
}: LinkTextProps) {
  return (
    <LinkText
      containerStyle={[styles.linkView, containerStyle]}
      style={[styles.linkView, style]}
      {...props}
    />
  );
}
