import "@/__DEV__";
import "@/app/styles.css";
import "@/react-multiversal/react-native/Next.css";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Viewport } from "next";

import { getWebHtmlClass, getWebStyleSheet } from "@/app/styles";
import { WebsiteMobileMenuBackdropStyles } from "@/components/WebsiteMobileMenu";
import { Next_IfWindowWidthIs } from "@/react-multiversal/IfWindowWidthIs";
import { NextStyleSheetProvider } from "@/react-multiversal/react-native/NextStyleSheetProvider";
import ReactNativeProviders from "@/react-multiversal/react-native/ReactNativeProviders";
import {
  getUserColorSchemeWebHtmlClass,
  UserColorScheme,
} from "@/react-multiversal/theme/colorScheme";
import Next_UserColorSchemeInit from "@/react-multiversal/theme/Next_UserColorSchemeInit";

export const viewport: Viewport = {
  viewportFit: "cover",
};

export default /*async*/ function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Enable cookie for user's color scheme / theme will switch to dynamic rendering,
  // This will disable SSG (can make sense for some websites tho)
  // Instead for SSG (auto) + forced client side user color scheme, a bootsplash screen can be used
  // const cookieStore = await cookies();
  // const userColorScheme = (cookieStore.get("userColorScheme")?.value ??
  //   "auto") as UserColorScheme;
  // if (userColorScheme) {
  //   setUserColorScheme(userColorScheme);
  // }
  // SSG default userColorScheme, will be used & enough for 99% of users not using the toggle
  const userColorScheme = "auto" as UserColorScheme;

  return (
    <html
      lang="en"
      className={[
        getUserColorSchemeWebHtmlClass(userColorScheme),
        getWebHtmlClass(),
      ].join(" ")}
      // NextUserColorSchemeInit might force update html class
      suppressHydrationWarning
    >
      <head>
        <meta charSet="utf-8" />

        {/* analytics */}
        <link rel="dns-prefetch" href="https://a.moox.fr" />
        <link rel="preconnect" href="https://a.moox.fr" />

        {/* favicons & friends */}
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />
        <link rel="manifest" href="/site.webmanifest" />
        {/* <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#000f2b" /> */}
        <meta name="msapplication-TileColor" content="#01093C" />
        <meta name="theme-color" content={"#480D9B"} />

        <Next_UserColorSchemeInit colorScheme={userColorScheme} />
        <Next_IfWindowWidthIs />
        {getWebStyleSheet()}
        <WebsiteMobileMenuBackdropStyles />
      </head>
      <body>
        <NextStyleSheetProvider>
          <ReactNativeProviders>{children}</ReactNativeProviders>
        </NextStyleSheetProvider>
        <SpeedInsights />
      </body>
    </html>
  );
}
