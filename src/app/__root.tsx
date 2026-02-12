import WebsiteError from "@/components/WebsiteError";
import { WebsiteMobileMenuBackdropStyles } from "@/components/WebsiteMobileMenu";
import { cssRules } from "@/react-multiversal/IfWindowWidthIs";
import baseCss from "@/react-multiversal/react-native/base.css?url";
import ReactNativeProviders from "@/react-multiversal/react-native/ReactNativeProviders";
import {
  getUserColorSchemeWebHtmlClass,
  loadSavedColorScheme,
  standaloneUpdateHtmlClass,
  UserColorScheme,
  userColorSchemeStorageKey,
} from "@/react-multiversal/theme/colorScheme";
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
      { name: "theme-color", content: "#480D9B" },
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

  useEffect(() => {
    if (window.localStorage) {
      void loadSavedColorScheme(
        window.localStorage.getItem(userColorSchemeStorageKey),
      );
    }
  }, []);

  return (
    <html
      lang="en"
      className={[
        getUserColorSchemeWebHtmlClass(userColorScheme),
        getWebHtmlClass(),
      ].join(" ")}
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
        <style
          id="react-multiversal--IfWindowWidthIs"
          dangerouslySetInnerHTML={{
            __html: cssRules.join("\n"),
          }}
        />
        {getWebStyleSheet()}
        <WebsiteMobileMenuBackdropStyles />
        <ReactNativeStyleSheet />
      </head>
      <body>
        <ReactNativeProviders>{children}</ReactNativeProviders>
        <Scripts />
      </body>
    </html>
  );
}

function ReactNativeStyleSheet() {
  // @ts-expect-error getSheet is a react-native-web internal API
  const sheet = StyleSheet.getSheet();
  return (
    <style
      id={sheet.id}
      dangerouslySetInnerHTML={{ __html: sheet.textContent }}
      suppressHydrationWarning
    />
  );
}
