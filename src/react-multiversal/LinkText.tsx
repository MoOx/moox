"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import * as React from "react";
import {
  GestureResponderEvent,
  Linking,
  StyleProp,
  StyleSheet,
  TextStyle,
} from "react-native";

import TextUnderlined, {
  TextUnderlinedProps,
} from "@/react-multiversal/TextUnderlined";

export type LinkTextProps = TextUnderlinedProps & {
  href: string;
  activeStyle?: StyleProp<TextStyle>;
  children: React.ReactNode;
  isActive?: (s: string, pathname: string) => boolean;
};

const defaultIsActive = (href: string, pathname: string) =>
  pathname === href || pathname + "/" === href;

const isInternalLink = (href: string) =>
  href.startsWith("/") || href.startsWith("#");

const styles = StyleSheet.create({
  nextLink: {
    display: "contents",
  },
});

export default function LinkText({
  activeStyle,
  href,
  isActive = defaultIsActive,
  role = "link",
  style,
  onPress,
  ...props
}: LinkTextProps) {
  const pathname = usePathname();
  const textStyles = [
    style,
    isActive(href, pathname!) ? activeStyle : undefined,
  ];
  return isInternalLink(href) ? (
    <Link href={href} role={role} style={styles.nextLink}>
      <TextUnderlined style={textStyles} onPress={onPress} {...props} />
    </Link>
  ) : (
    <TextUnderlined
      href={href}
      role={role}
      style={textStyles}
      onPress={(event: GestureResponderEvent) => {
        if (onPress !== undefined) {
          onPress(event);
        }
        Linking.openURL(href).catch(console.error);
        event.preventDefault();
      }}
      {...props}
    />
  );
}
