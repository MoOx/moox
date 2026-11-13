import { LangProvider } from "@/i18n";
import ReactNativeProviders from "@/react-multiversal/react-native/ReactNativeProviders";
import { QueryClientProvider } from "@tanstack/react-query";
import { Stack } from "expo-router";
import { queryClient } from "@/native/query";

/**
 * The app's root, and the counterpart of `src/routes.web/__root.tsx`.
 *
 * That one renders a *document*: `<html>`, `<head>`, the stylesheet links, the
 * react-native-web style sheet, the JSON-LD. None of it exists here, which is
 * why the native tree could never reuse it and why the port started by
 * swapping exactly this file.
 *
 * What replaces it is three providers and a stack:
 *
 * - `ReactNativeProviders` is shared with the site (gesture handler, portals,
 *   safe area), so it is not part of the diff.
 * - `QueryClientProvider` is: the site has route loaders, the app has a cache.
 *   See `src/query.tsx`.
 * - `LangProvider` is too: on the site the language is a URL segment and needs
 *   no state at all. See `i18n.useLang.native.tsx`.
 *
 * `native-globals.ts` is gone with TanStack Router: it existed to stub the
 * browser `scrollTo` the router called after every navigation. Expo Router is
 * built for this platform and needs no such patch.
 */
export default function RootLayout() {
  return (
    <ReactNativeProviders>
      <QueryClientProvider client={queryClient}>
        <LangProvider>
          {/* The tabs own their own headers; everything pushed above them
              (the CV) gets the platform's. */}
          <Stack screenOptions={{ headerShown: false }} />
        </LangProvider>
      </QueryClientProvider>
    </ReactNativeProviders>
  );
}
