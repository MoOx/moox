import { MouseEvent, Ref } from "react";
import { GestureResponderEvent, StyleProp, Text, TextProps, TextStyle } from "react-native";

/**
 * The link contract, in a file that imports no router and no platform.
 *
 * It sits on its own because four things need it and they must not need each
 * other: the web `LinkText` (an anchor), the native one (a `Text` with an
 * `onPress`), `LinkView` and its native twin. Before this split, the native
 * `LinkView` imported the web `LinkText` just to reach a type, which dragged
 * `@tanstack/react-router` into the app bundle.
 */
export type LinkTextProps = TextProps & {
  ref?: Ref<Text>;
  href: string;
  style?: StyleProp<TextStyle>;
  activeStyle?: StyleProp<TextStyle>;
  /**
   * Kept for call sites that styled the `<a>` separately from the text inside
   * it. There is only one node now, so this is merged before `style` rather
   * than applied to a different element.
   */
  containerStyle?: StyleProp<TextStyle>;
  containerActiveStyle?: StyleProp<TextStyle>;
  isActive?: (s: string, pathname: string) => boolean;
  underline?: boolean;
  /** Underline on hover or keyboard focus. CSS on web, no JS, no listeners. */
  underlineOnFocus?: boolean;
  onPress?: (event: GestureResponderEvent | MouseEvent<HTMLAnchorElement>) => void;
};

export const defaultIsActive = (href: string, pathname: string) =>
  pathname === href || pathname + "/" === href;

export const isInternalLink = (href: string) => href.startsWith("/") || href.startsWith("#");
