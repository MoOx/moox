import WebsiteError from "@/components/WebsiteError";
import GlassFallbackStyles from "@/components/GlassFallbackStyles";
import { cssRulesStyleId, cssRulesTextContent } from "@/react-multiversal/cssRules";
import baseCss from "@/react-multiversal/react-native/base.css?url";
import ReactNativeProviders from "@/react-multiversal/react-native/ReactNativeProviders";
import {
  getUserColorSchemeWebHtmlClass,
  loadSavedColorScheme,
  standaloneUpdateHtmlClass,
  UserColorScheme,
  userColorSchemeStorageKey,
} from "@/react-multiversal/theme/colorScheme";
import { useLang } from "@/i18n";
import { getWebHtmlClass, getWebStyleSheet } from "@/styles";
import appCss from "@/styles.css?url";
import { createRootRoute, HeadContent, Scripts } from "@tanstack/react-router";
import { ReactNode, useEffect } from "react";
import { StyleSheet } from "react-native";

export const Route = createRootRoute({
  notFoundComponent: () => <WebsiteError statusCode={404} />,
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      {
        name: "viewport",
        content: "width=device-width, initial-scale=1, viewport-fit=cover",
      },
      // { name: "theme-color", content: "#480D9B" },
      { name: "application-name", content: "MoOx" },
      { name: "author", content: "Maxime Thirouin" },
      { name: "creator", content: "Maxime Thirouin" },
      { property: "og:image", content: "/preview-1200x630.jpg" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "stylesheet", href: baseCss },
      {
        rel: "apple-touch-icon",
        sizes: "180x180",
        href: "/apple-touch-icon.png",
      },
      {
        rel: "icon",
        type: "image/png",
        sizes: "32x32",
        href: "/favicon-32x32.png",
      },
      {
        rel: "icon",
        type: "image/png",
        sizes: "16x16",
        href: "/favicon-16x16.png",
      },
      { rel: "manifest", href: "/site.webmanifest" },
    ],
  }),
  shellComponent: RootShell,
});

function RootShell({ children }: { children: ReactNode }) {
  const userColorScheme = "auto" as UserColorScheme;
  const lang = useLang();

  useEffect(() => {
    if (window.localStorage) {
      void loadSavedColorScheme(window.localStorage.getItem(userColorSchemeStorageKey));
    }
  }, []);

  return (
    <html
      lang={lang}
      className={[getUserColorSchemeWebHtmlClass(userColorScheme), getWebHtmlClass()].join(" ")}
      suppressHydrationWarning
    >
      <head>
        <HeadContent />
        <script
          suppressHydrationWarning
          dangerouslySetInnerHTML={{
            __html: `
              var UserColorSchemeHtmlClassModifier = ${standaloneUpdateHtmlClass.toString()};
              UserColorSchemeHtmlClassModifier(window.localStorage.getItem("${userColorSchemeStorageKey}") || "${userColorScheme}");`,
          }}
        />
        <DesignSystemCssRules />
        {getWebStyleSheet()}
        <GlassFallbackStyles />
      </head>
      <body>
        <ReactNativeProviders>{children}</ReactNativeProviders>
        <ReactNativeStyleSheet />
        <Scripts />
      </body>
    </html>
  );
}

/**
 * The client's set is a subset of the server's, because its module graph is
 * code-split and the server's is not, hence `suppressHydrationWarning`. It
 * catches up on its own: a route chunk registers its rules when it loads,
 * which is before the component using them renders, and the shell re-renders
 * as part of that same navigation.
 */
function DesignSystemCssRules() {
  return (
    <style
      id={cssRulesStyleId}
      dangerouslySetInnerHTML={{ __html: cssRulesTextContent() }}
      suppressHydrationWarning
    />
  );
}

/**
 * Rendered as the last child of <body>, and that position is the whole point.
 *
 * react-native-web compiles a style into an atomic className only once it has
 * registered it, and the rule behind that class exists only from then on. This
 * component serializes the registry, so whatever has not been registered by
 * the time it runs is a class in the HTML with no rule behind it: a page that
 * paints unspaced until hydration puts the rule back. Read from <head> it
 * missed everything the <body> registers while rendering - which is most of
 * the spacing - and it only showed on a cold server, since the registry is a
 * module global the second request finds warm. Last in the tree means last to
 * render, so the registry is complete and nothing has to be pre-registered.
 *
 * `href` + `precedence` is what puts it back in <head> anyway: they make it a
 * React *style resource*, hoisted into the head of the served HTML however
 * late it is rendered. They also keep React out of the element afterwards -
 * React dedupes a resource by `href` and never re-renders it. Without them
 * React rewrites the content every time it re-mounts the shell, which is once
 * per navigation; the browser then discards the element's `CSSStyleSheet` and
 * builds a new one, leaving react-native-web holding a detached sheet, so
 * every style registered from then on lands nowhere and a page reached by
 * clicking a link loses spacing the same page loaded directly has. (That
 * rewrite also drops every vendor-prefixed declaration, which the browser does
 * not return in `cssText`.)
 *
 * As a resource React omits the `id` too, so react-native-web finds nothing to
 * adopt on the client and keeps its own element: this one paints the server's
 * HTML, the library owns everything after hydration.
 */
function ReactNativeStyleSheet() {
  // @ts-expect-error getSheet is a react-native-web internal API
  const sheet = StyleSheet.getSheet() as { id: string; textContent: string };
  return (
    <style
      href={sheet.id}
      precedence="react-native-web"
      dangerouslySetInnerHTML={{ __html: sheet.textContent }}
      suppressHydrationWarning
    />
  );
}
