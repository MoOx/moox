import * as React from "react";
import { StyleSheet, TextStyle } from "react-native";

import LinkText, { LinkTextProps } from "@/react-multiversal/LinkText";

const styles = StyleSheet.create({
  linkView: {
    display: "flex",
    flexDirection: "column",
  },
});

export default function LinkView({ style, ...props }: LinkTextProps) {
  return <LinkText style={[styles.linkView as TextStyle, style]} {...props} />;
}
