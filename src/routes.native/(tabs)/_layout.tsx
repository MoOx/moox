import { useT } from "@/i18n";
import { useTheme } from "@/styles";
import { NativeTabs } from "expo-router/unstable-native-tabs";

// The pieces of a trigger hang off `NativeTabs.Trigger` rather than being
// exported on their own.
const { Icon, Label } = NativeTabs.Trigger;

/**
 * The tab bar - and the reason this port happened.
 *
 * `WebsiteMobileMenu` on the site is a pill of `<a>` elements in a fixed box,
 * with the glass painted by `backdrop-filter`. It is a good imitation, and it
 * is an imitation: it cannot minimize as the page scrolls, it does not sit in
 * the system's own layer, and there is one navigation history behind it.
 *
 * `NativeTabs` renders a real `UITabBarController` on iOS and a
 * `BottomNavigationView` on Android, so the liquid glass, the scroll-edge
 * effect and the SF Symbols are the platform's rather than ours. Each trigger
 * also owns a stack (see the `_layout.tsx` files below it), which is the part
 * a single memory history could not offer at all: tapping Blog, opening a
 * post, switching to Resume and coming back leaves the post where it was.
 *
 * `unstable-native-tabs` is the published import path: the API is not frozen
 * yet, and the whole point of this app is to show what the platform gives.
 */
export default function TabsLayout() {
  const t = useT();
  const theme = useTheme();
  return (
    <NativeTabs
      // Follows the site's own light/dark toggle rather than the OS, the same
      // reason `ElevatedSurface.ios.tsx` passes an explicit `colorScheme`.
      blurEffect={theme.mode === "dark" ? "systemChromeMaterialDark" : "systemChromeMaterial"}
      // iOS 26: the bar shrinks to a pill as the content scrolls up.
      minimizeBehavior="onScrollDown"
      tintColor={theme.dynamicColors.textMain}
    >
      <NativeTabs.Trigger name="index">
        <Label>{t({ en: "Home", fr: "Accueil" })}</Label>
        <Icon sf={{ default: "house", selected: "house.fill" }} md="home" />
      </NativeTabs.Trigger>
      <NativeTabs.Trigger name="resume">
        <Label>{t({ en: "Resume", fr: "CV" })}</Label>
        <Icon sf={{ default: "doc.text", selected: "doc.text.fill" }} md="description" />
      </NativeTabs.Trigger>
      <NativeTabs.Trigger name="contact">
        <Label>{t({ en: "Contact", fr: "Contact" })}</Label>
        <Icon
          sf={{
            default: "bubble.left.and.bubble.right",
            selected: "bubble.left.and.bubble.right.fill",
          }}
          md="chat"
        />
      </NativeTabs.Trigger>
      <NativeTabs.Trigger name="blog">
        <Label>{"Blog"}</Label>
        <Icon sf={{ default: "newspaper", selected: "newspaper.fill" }} md="article" />
      </NativeTabs.Trigger>
      <NativeTabs.Trigger name="talks">
        <Label>{t({ en: "Talks", fr: "Conférences" })}</Label>
        <Icon sf={{ default: "mic", selected: "mic.fill" }} md="mic" />
      </NativeTabs.Trigger>
    </NativeTabs>
  );
}
