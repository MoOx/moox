"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import * as React from "react";
import {
  GestureResponderEvent,
  Linking,
  StyleProp,
  StyleSheet,
  Text,
  TextStyle,
} from "react-native";

import TextUnderlined, {
  TextUnderlinedProps,
} from "@/react-multiversal/TextUnderlined";

export type LinkTextProps = TextUnderlinedProps & {
  href: string;
  style?: StyleProp<TextStyle>;
  activeStyle?: StyleProp<TextStyle>;
  containerStyle?: StyleProp<TextStyle>;
  containerActiveStyle?: StyleProp<TextStyle>;
  isActive?: (s: string, pathname: string) => boolean;
  onPress?: (
    event: GestureResponderEvent | React.MouseEvent<HTMLAnchorElement>
  ) => void;
};

const defaultIsActive = (href: string, pathname: string) =>
  pathname === href || pathname + "/" === href;

const isInternalLink = (href: string) =>
  href.startsWith("/") || href.startsWith("#");

const resetLinkStyle = {
  color: "inherit",
  textDecoration: "inherit",
};

export default function LinkText({
  role = "link",
  style,
  activeStyle,
  containerStyle = resetLinkStyle,
  containerActiveStyle,
  href,
  isActive = defaultIsActive,
  onPress,
  ...props
}: LinkTextProps) {
  const pathname = usePathname();
  const active = isActive(href, pathname!);
  const textStyles = React.useMemo(
    () => [style, active ? activeStyle : undefined],
    [style, activeStyle, active]
  );
  const containerStyles = React.useMemo(
    () =>
      StyleSheet.flatten([
        containerStyle,
        active ? containerActiveStyle : undefined,
      ]),
    [containerStyle, containerActiveStyle, active]
  );

  const handleLinkPress = React.useCallback(
    (event: React.MouseEvent<HTMLAnchorElement>) => {
      if (onPress !== undefined) {
        onPress(event);
      }
    },
    [onPress]
  );
  const handleTextPress = React.useCallback(
    (event: GestureResponderEvent) => {
      if (onPress !== undefined) {
        onPress(event);
      }
      Linking.openURL(href).catch(console.error);
      event.preventDefault();
    },
    [href, onPress]
  );
  return isInternalLink(href) ? (
    <Link
      href={href}
      role={role}
      style={containerStyles as any}
      onClick={handleLinkPress}
    >
      <TextUnderlined style={textStyles} {...props} />
    </Link>
  ) : (
    <Text
      href={href}
      role={role}
      style={containerStyles}
      onPress={handleTextPress}
    >
      <TextUnderlined style={textStyles} {...props} />
    </Text>
  );
}
