import WebsiteError from "@/components/WebsiteError";
import { cssRulesStyleId, cssRulesTextContent } from "@/react-multiversal/cssRules";
import { configureGlass } from "@/react-multiversal/design/glass";
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
import { dynamicColors, getWebHtmlClass, getWebStyleSheet } from "@/styles";
import appCss from "@/styles.css?url";
import { createRootRoute, HeadContent, Scripts } from "@tanstack/react-router";
import { ReactNode, useEffect } from "react";
import { StyleSheet } from "react-native";

// At module scope, and pointing at variables rather than at values: the theme
// already switches these between light and dark, so the material follows
// without the glass rule knowing that a colour scheme exists.
configureGlass({
  regular: {
    fill: dynamicColors.glassFill,
    border: dynamicColors.glassBorder,
    bezel: dynamicColors.glassBezel,
    filter: dynamicColors.glassFilter,
  },
  clear: {
    fill: dynamicColors.glassClearFill,
    border: dynamicColors.glassClearBorder,
    bezel: dynamicColors.glassClearBezel,
    filter: dynamicColors.glassClearFilter,
  },
});

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
 * As a resource React omits the `id`, which is what `adoptStyleSheet` below puts
 * back: without it the client builds a *second* sheet, and that is a layout bug
 * rather than a separation of concerns.
 */
function ReactNativeStyleSheet() {
  // @ts-expect-error getSheet is a react-native-web internal API
  const sheet = StyleSheet.getSheet() as { id: string; textContent: string };
  return (
    <>
      <style
        href={sheet.id}
        precedence="react-native-web"
        dangerouslySetInnerHTML={{ __html: sheet.textContent }}
        suppressHydrationWarning
      />
      <script
        suppressHydrationWarning
        dangerouslySetInnerHTML={{
          __html: `(${adoptStyleSheet.toString()})(${JSON.stringify(sheet.id)});`,
        }}
      />
    </>
  );
}

/**
 * Hands the served sheet back the `id` react-native-web looks for, before the
 * library runs.
 *
 * `createCSSStyleSheet` adopts `document.getElementById("react-native-stylesheet")`
 * when it finds one, and otherwise creates its own element **at
 * `head.firstChild`** - in front of everything, the served sheet included. Two
 * sheets then hold the same atomic classes, and the cascade between them is
 * decided by document order rather than by react-native-web's groups: the
 * `.css-view-*` reset, which declares `padding: 0` and `margin: 0` and sits in
 * the *server's* sheet, wins over every atomic class that only exists in the
 * client's. Any rule the client registers after the served HTML - which is
 * every rule a route pulls in on a client-side navigation - is silently
 * cancelled, and a page reached by clicking a link loses the padding the same
 * page loaded directly has.
 *
 * In dev it only shows on a **cold** server, because the registry is a module
 * global: once it has served a few routes it holds nearly every rule, so the
 * served sheet is complete and there is nothing left for the client to add.
 * That is the same warm-registry blind spot as the ordering rule above. The
 * prerendered build has no such reprieve - every page carries its own rules and
 * nothing else - so there the padding was lost on every client-side navigation.
 * `npm run audit:ssr-css` cannot see any of it: it checks the served HTML,
 * where the class does have a rule, and it is the client that overrides it.
 *
 * Rendered as a plain inline script, so it runs while the document is still
 * parsing, ahead of the deferred module that pulls react-native-web in. React
 * keeps the `href` as `data-href` on a hoisted style resource, which is what
 * this looks the element up by.
 */
const adoptStyleSheet = (id: string) => {
  // `~=`, not `=`: React merges every <style> sharing a `precedence` into one
  // tag whose `data-href` is the space-separated list of their hrefs, and it
  // looks its own resources up the same way.
  const el = document.querySelector('style[data-href~="' + id + '"]');
  if (el && !el.id) el.id = id;
};
