import TextUnderlined, {
  TextUnderlinedProps,
} from "@/react-multiversal/TextUnderlined";
import { Link, useRouterState } from "@tanstack/react-router";
import { MouseEvent, Ref, useCallback, useMemo } from "react";
import {
  GestureResponderEvent,
  Linking,
  StyleProp,
  StyleSheet,
  Text,
  TextStyle,
} from "react-native";

export type LinkTextProps = TextUnderlinedProps & {
  href: string;
  style?: StyleProp<TextStyle>;
  activeStyle?: StyleProp<TextStyle>;
  containerStyle?: StyleProp<TextStyle>;
  containerActiveStyle?: StyleProp<TextStyle>;
  isActive?: (s: string, pathname: string) => boolean;
  onPress?: (
    event: GestureResponderEvent | MouseEvent<HTMLAnchorElement>,
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
  ref,
  role = "link",
  style,
  activeStyle,
  containerStyle,
  containerActiveStyle,
  href,
  isActive = defaultIsActive,
  onPress,
  ...props
}: LinkTextProps) {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const active = isActive(href, pathname);
  const textStyles = useMemo(
    () => [style, active ? activeStyle : undefined],
    [style, activeStyle, active],
  );
  const containerStyles = useMemo(
    () =>
      StyleSheet.flatten([
        resetLinkStyle,
        containerStyle,
        active ? containerActiveStyle : undefined,
      ]),
    [containerStyle, containerActiveStyle, active],
  );

  const handleLinkPress = useCallback(
    (event: MouseEvent<HTMLAnchorElement>) => {
      if (onPress !== undefined) {
        onPress(event);
      }
    },
    [onPress],
  );
  const handleTextPress = useCallback(
    (event: GestureResponderEvent) => {
      if (onPress !== undefined) {
        onPress(event);
      }
      Linking.openURL(href).catch(console.error);
      event.preventDefault();
    },
    [href, onPress],
  );
  return isInternalLink(href) ? (
    <Link
      ref={ref as Ref<HTMLAnchorElement>}
      to={href}
      role={role}
      style={containerStyles as any}
      onClick={handleLinkPress}
    >
      <TextUnderlined ref={ref} style={textStyles} {...props} />
    </Link>
  ) : (
    <Text
      ref={ref}
      href={href}
      role={role}
      style={containerStyles}
      onPress={handleTextPress}
    >
      <TextUnderlined style={textStyles} {...props} />
    </Text>
  );
}
