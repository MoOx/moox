"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import * as React from "react";
import {
  GestureResponderEvent,
  Linking,
  StyleProp,
  Text,
  TextProps,
  TextStyle,
} from "react-native";

import TextUnderlined from "@/react-multiversal/TextUnderlined";

export type LinkTextProps = TextProps & {
  ref?: React.MutableRefObject<Text | null>;
  activeStyle?: StyleProp<TextStyle>;
  children: React.ReactNode;
  href: string;
  isActive?: (s: string, pathname: string) => boolean;
  numberOfLines?: number;
  style?: StyleProp<TextStyle>;
  onPress?: (event: GestureResponderEvent) => void;
  underline?: boolean;
  underlineOnFocus?: boolean;
};

const defaultIsActive = (href: string, pathname: string) =>
  pathname === href || pathname + "/" === href;

const isInternalLink = (href: string) =>
  href.startsWith("/") || href.startsWith("#");

export default function LinkText({
  ref,
  activeStyle,
  href,
  isActive = defaultIsActive,
  role = "link",
  style,
  onPress,
  ...props
}: LinkTextProps) {
  const pathname = usePathname();
  const styles = [style, isActive(href, pathname!) ? activeStyle : undefined];
  return isInternalLink(href) ? (
    <Link href={href} legacyBehavior>
      <TextUnderlined
        ref={ref}
        role={role}
        href={href}
        style={styles}
        onPress={onPress}
        {...props}
      />
    </Link>
  ) : (
    <TextUnderlined
      ref={ref}
      href={href}
      role={role}
      style={styles}
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
