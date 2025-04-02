import { StyleSheet, Text, TextProps } from "react-native";

const styles = StyleSheet.create({
  readerOnly: {
    // If you have position absolute
    // Safari Reader Mode will ignore text with opacity 0
    // So we need to set a very small opacity
    opacity: 0.000001,
    height: 0,
    width: 0,
    overflow: "hidden",
    position: "absolute",
    top: 0,
    left: 0,
  },
});
export default function TextForReader({ ...props }: TextProps) {
  return <Text {...props} style={styles.readerOnly} />;
}
