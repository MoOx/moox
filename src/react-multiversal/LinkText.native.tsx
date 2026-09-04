import { useExternalLinkPress, useInternalLinkPress } from "@/react-multiversal/LinkPress";
import { defaultIsActive, isInternalLink, LinkTextProps } from "@/react-multiversal/LinkText.types";
import { usePathname } from "@/routing";
import { useMemo } from "react";
import { StyleSheet, Text } from "react-native";

export type { LinkTextProps };
export { isInternalLink };

const styles = StyleSheet.create({
  underline: { textDecorationLine: "underline" },
});

/**
 * Native half of `LinkText.tsx`. Same props, and about a third of the code,
 * because most of the web half is anchor plumbing that has no counterpart
 * here: no `href` attribute to render, no click to intercept, no router
 * preloading to wire to `onMouseEnter` / `onFocus` / `onTouchStart`, and no
 * `color: inherit` reset because nothing painted it blue in the first place.
 *
 * What is left is the part that was never about the web: a piece of text you
 * can press, and a navigation.
 *
 * `href` is still passed down. The view ignores it, but it is what says where
 * this text goes - to `navigation.test.tsx`, which finds links by href, as
 * much as to anyone reading the tree.
 */
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
  // Web-only: both are `:hover` / `:focus` styling, and a fingertip has
  // neither. Absorbed here so they never reach a `Text`.
  underlineOnFocus: _underlineOnFocus,
  onPress,
  ...props
}: LinkTextProps) {
  const pathname = usePathname();
  const active = isActive(href, pathname);
  const handlePress = useInternalLinkPress(href, onPress);
  const linkStyles = useMemo(
    () => [
      underline ? styles.underline : null,
      containerStyle,
      active ? containerActiveStyle : null,
      style,
      active ? activeStyle : null,
    ],
    [style, activeStyle, containerStyle, containerActiveStyle, underline, active],
  );
  return (
    <Text {...props} ref={ref} role={role} href={href} onPress={handlePress} style={linkStyles} />
  );
}

function ExternalLinkText({
  ref,
  role = "link",
  href,
  style,
  activeStyle: _activeStyle,
  containerStyle,
  containerActiveStyle: _containerActiveStyle,
  underline = false,
  underlineOnFocus: _underlineOnFocus,
  onPress,
  ...props
}: LinkTextProps) {
  const handlePress = useExternalLinkPress(href, onPress);
  const linkStyles = useMemo(
    () => [underline ? styles.underline : null, containerStyle, style],
    [style, containerStyle, underline],
  );
  return (
    <Text {...props} ref={ref} role={role} href={href} onPress={handlePress} style={linkStyles} />
  );
}

export default function LinkText(props: LinkTextProps) {
  // Two components rather than one branch: the internal half subscribes to the
  // router and the external half must not.
  return isInternalLink(props.href) ? (
    <InternalLinkText {...props} />
  ) : (
    <ExternalLinkText {...props} />
  );
}
