import { useNavigateToHref } from "@/routing";
import type { LinkTextProps } from "@/react-multiversal/LinkText.types";
import { useCallback } from "react";
import { GestureResponderEvent, Linking } from "react-native";

/**
 * What pressing a link does when there is no anchor to follow it - which is
 * every link on a device, and every link the web renders as something other
 * than an `<a>`.
 *
 * An `onPress` may cancel the navigation: that is how the résumé cards open a
 * modal while keeping a real, crawlable href. A touch event is not a DOM event
 * though, so `defaultPrevented` is not part of `GestureResponderEvent`. A call
 * site that opts out sets it on the object it was handed, through
 * `preventDefault?.()`, and it is simply absent otherwise.
 *
 * The router is reached through `@/routing`, so this file is the same on both
 * platforms while the navigation underneath is not.
 */
export function useInternalLinkPress(href: string, onPress: LinkTextProps["onPress"]) {
  const navigate = useNavigateToHref();
  return useCallback(
    (event: GestureResponderEvent) => {
      onPress?.(event);
      if ((event as { defaultPrevented?: boolean })?.defaultPrevented) return;
      navigate(href);
    },
    [href, onPress, navigate],
  );
}

/** Same, for an href no router owns: native has no anchor to open it either. */
export function useExternalLinkPress(href: string, onPress: LinkTextProps["onPress"]) {
  return useCallback(
    (event: GestureResponderEvent) => {
      onPress?.(event);
      Linking.openURL(href).catch(console.error);
      event.preventDefault();
    },
    [href, onPress],
  );
}
