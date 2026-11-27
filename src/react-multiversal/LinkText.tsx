import { useInternalLinkPress, useExternalLinkPress } from "@/react-multiversal/LinkPress";
import { defaultIsActive, isInternalLink, LinkTextProps } from "@/react-multiversal/LinkText.types";
import { usePathname } from "@/routing";
import { useLinkProps } from "@tanstack/react-router";
import { MouseEvent, useCallback, useMemo } from "react";
import { Platform, StyleSheet, Text } from "react-native";

export type { LinkTextProps };
export { isInternalLink };

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
 *
 * `LinkText.native.tsx` is the other half. The split is not cosmetic: this
 * file is built on an anchor and a click, and a device has neither. It is also
 * what keeps `useLinkProps` - and the whole of TanStack Router - out of the app
 * bundle.
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
  const pathname = usePathname();
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

  // react-native-web still renders this component under a native test renderer
  // and in the PDF export, where there is no click.
  const handlePress = useInternalLinkPress(href, onPress);

  return (
    <Text
      {...props}
      ref={ref}
      role={role}
      href={linkProps.href ?? href}
      {...(Platform.OS === "web" ? { onClick: handleClick } : { onPress: handlePress })}
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

  const handlePress = useExternalLinkPress(href, onPress);

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
