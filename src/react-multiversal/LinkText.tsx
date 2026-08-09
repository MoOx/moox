import { useLinkProps, useRouterState } from "@tanstack/react-router";
import { MouseEvent, Ref, useCallback, useMemo } from "react";
import {
  GestureResponderEvent,
  Linking,
  StyleProp,
  StyleSheet,
  Text,
  TextProps,
  TextStyle,
} from "react-native";

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

const defaultIsActive = (href: string, pathname: string) =>
  pathname === href || pathname + "/" === href;

const isInternalLink = (href: string) => href.startsWith("/") || href.startsWith("#");

const styles = StyleSheet.create({
  // The anchor carries the text styles now, so it must not also inherit the
  // browser's link colour and underline.
  reset: { color: "inherit", textDecorationLine: "none" },
  underline: { textDecorationLine: "underline" },
});

/**
 * A link that is **one element**. It used to be an `<a>` wrapping a `<Text>`,
 * because the router's `<Link>` is a DOM anchor and cannot take React Native
 * styles - passing them straight through would misread `lineHeight: 26` as a
 * ratio rather than pixels. `useLinkProps` gives the same href and click
 * handling as `<Link>` as plain props, which react-native-web's `<Text href>`
 * renders as an anchor with the styles compiled to classNames.
 *
 * On /resume that removed 182 nodes: 182 of the page's 198 anchors existed
 * only to hold a text node.
 */
function useLinkStyles({
  style,
  activeStyle,
  containerStyle,
  containerActiveStyle,
  underline,
  active,
}: Pick<
  LinkTextProps,
  "style" | "activeStyle" | "containerStyle" | "containerActiveStyle" | "underline"
> & { active: boolean }) {
  return useMemo(
    () => [
      styles.reset,
      underline ? styles.underline : null,
      containerStyle,
      active ? containerActiveStyle : null,
      style,
      active ? activeStyle : null,
    ],
    [style, activeStyle, containerStyle, containerActiveStyle, underline, active],
  );
}

function InternalLinkText({
  ref,
  role = "link",
  href,
  style,
  activeStyle,
  containerStyle,
  containerActiveStyle,
  isActive = defaultIsActive,
  underline = false,
  underlineOnFocus = false,
  onPress,
  ...props
}: LinkTextProps) {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const active = isActive(href, pathname);
  const linkStyles = useLinkStyles({
    style,
    activeStyle,
    containerStyle,
    containerActiveStyle,
    underline,
    active,
  });
  const linkProps = useLinkProps({ to: href });
  const routerClick = linkProps.onClick;

  const handleClick = useCallback(
    (event: MouseEvent<HTMLAnchorElement>) => {
      onPress?.(event);
      // `onPress` may cancel the navigation - that is how the résumé cards open
      // a modal while keeping a real, crawlable href.
      if (!event.defaultPrevented) {
        routerClick?.(event as never);
      }
    },
    [onPress, routerClick],
  );

  return (
    <Text
      {...props}
      ref={ref}
      role={role}
      href={linkProps.href ?? href}
      onClick={handleClick}
      // Router preloading is driven by these on `<Link>`; they are plain DOM
      // handlers, which react-native-web forwards to the anchor.
      onMouseEnter={linkProps.onMouseEnter}
      onFocus={linkProps.onFocus}
      onTouchStart={linkProps.onTouchStart}
      dataSet={underlineOnFocus ? { underlineOnFocus: "true" } : undefined}
      style={linkStyles}
    />
  );
}

function ExternalLinkText({
  ref,
  role = "link",
  href,
  style,
  activeStyle,
  containerStyle,
  containerActiveStyle,
  underline = false,
  underlineOnFocus = false,
  onPress,
  ...props
}: LinkTextProps) {
  const linkStyles = useLinkStyles({
    style,
    activeStyle,
    containerStyle,
    containerActiveStyle,
    underline,
    active: false,
  });

  const handlePress = useCallback(
    (event: GestureResponderEvent) => {
      onPress?.(event);
      // Native has no anchor to follow the href for it.
      Linking.openURL(href).catch(console.error);
      event.preventDefault();
    },
    [href, onPress],
  );

  return (
    <Text
      {...props}
      ref={ref}
      role={role}
      href={href}
      onPress={handlePress}
      dataSet={underlineOnFocus ? { underlineOnFocus: "true" } : undefined}
      style={linkStyles}
    />
  );
}

export default function LinkText(props: LinkTextProps) {
  return isInternalLink(props.href) ? (
    <InternalLinkText {...props} />
  ) : (
    <ExternalLinkText {...props} />
  );
}
