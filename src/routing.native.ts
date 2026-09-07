import { useRouter, usePathname as useRouterPathname } from "expo-router";
import { useCallback } from "react";

/**
 * Native half of `routing.ts`, on Expo Router. Read that file for the contract.
 *
 * Two differences worth seeing side by side, and neither is a shortcoming:
 *
 * A hash means nothing here. On the web it scrolls the document to an anchor;
 * an app has no document and no anchors, so the fragment is dropped rather
 * than passed to a router that would treat it as part of the path.
 *
 * `push` rather than `navigate`, because a stack is not a history. The web
 * replaces what is on screen; the app pushes a screen onto the pile the OS
 * back gesture pops. That is the whole reason a native tab bar can keep one
 * stack per tab and a browser cannot.
 */

/** The current path. Expo Router hands it over directly. */
export const usePathname = (): string => useRouterPathname();

export const useNavigateToHref = () => {
  const router = useRouter();
  return useCallback(
    (href: string) => {
      const [path] = href.split("#");
      // A bare `#anchor` link has nowhere to go on a device: it would resolve
      // to the root and eject the visitor from the screen they are reading.
      if (path === undefined || path === "") return;
      router.push(path);
    },
    [router],
  );
};
