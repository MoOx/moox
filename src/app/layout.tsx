import "@/__DEV__";
import "@/app/styles.css";
import "@/react-multiversal/react-native/Next.css";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Metadata, Viewport } from "next";

import { getWebHtmlClass, getWebStyleSheet } from "@/app/styles";
import AnalyticsMatomo from "@/components/AnalyticsMatomo";
import { WebsiteMobileMenuBackdropStyles } from "@/components/WebsiteMobileMenu";
import { Next_IfWindowWidthIs } from "@/react-multiversal/IfWindowWidthIs";
import { NextStyleSheetProvider } from "@/react-multiversal/react-native/NextStyleSheetProvider";
import ReactNativeProviders from "@/react-multiversal/react-native/ReactNativeProviders";
import {
  getUserColorSchemeWebHtmlClass,
  UserColorScheme,
} from "@/react-multiversal/theme/colorScheme";
import Next_UserColorSchemeInit from "@/react-multiversal/theme/Next_UserColorSchemeInit";

export const metadata: Metadata = {
  applicationName: "MoOx",
  authors: [{ name: "Maxime Thirouin", url: "https://moox.io" }],
  creator: "Maxime Thirouin",
  icons: [
    {
      url: "/apple-touch-icon.png",
      sizes: "180x180",
      type: "image/png",
    },
    {
      url: "/favicon-32x32.png",
      sizes: "32x32",
      type: "image/png",
    },
    {
      url: "/favicon-16x16.png",
      sizes: "16x16",
      type: "image/png",
    },
  ],
  manifest: "/site.webmanifest",
  openGraph: {
    images: ["/preview-1200x630.jpg"],
  },
  // @todo for fun
  // appLinks
};

export const viewport: Viewport = {
  viewportFit: "cover",
  themeColor: "#480D9B",
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
        {/* analytics */}
        <link rel="dns-prefetch" href="https://a.moox.fr" />
        <link rel="preconnect" href="https://a.moox.fr" />

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
        <Analytics />
        <AnalyticsMatomo />
      </body>
    </html>
  );
}
