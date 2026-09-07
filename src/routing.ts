import { useRouter, useRouterState } from "@tanstack/react-router";
import { useCallback } from "react";

/**
 * The two questions every shared component asks a router: where am I, and take
 * me there. Nothing else, and deliberately nothing router-shaped: no route
 * objects, no params, no search. A component that needs more than these two is
 * a component that will not survive the platform split.
 *
 * This is the web half, on TanStack Router. `routing.native.ts` is the same
 * contract on Expo Router. Split by extension rather than by a `Platform.OS`
 * branch because Metro resolves imports statically: a branch would still pull
 * `expo-router` into the web graph and `@tanstack/react-router` into the app's.
 *
 * That the two routers answer these in four lines each is the point of the
 * exercise: the 34 files that render a link never learn which one they are
 * talking to.
 */

/** The current path, language prefix included: `/fr/resume`. */
export const usePathname = (): string => useRouterState({ select: (s) => s.location.pathname });

/**
 * Navigates to an internal href, hash included. `resetScroll: false` because
 * the site scrolls the document itself and the router would fight it.
 */
export const useNavigateToHref = () => {
  const router = useRouter();
  return useCallback(
    (href: string) => {
      const [path, hash] = href.split("#");
      void router.navigate({ to: path || ".", hash, resetScroll: false });
    },
    [router],
  );
};
