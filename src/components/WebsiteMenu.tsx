import { glassDataSet } from "@/components/GlassFallbackStyles";
import { allInternalLinks, footerAnchor, menuBarLinks, socialLinks, socialLinks2 } from "@/consts";
import { isLocalizedPath, Lang, langs, localizedHref, useHref, useLang, useT } from "@/i18n";
import { size } from "@/react-multiversal";
import { defaultSvgPaths } from "@/react-multiversal/ColorSchemeToggle";
import { fontStyles } from "@/react-multiversal/font";
import { exitDuration } from "@/react-multiversal/InPlaceOrModal";
import InPlaceOrModalMenu, { InPlaceOrModalMenuItem } from "@/react-multiversal/InPlaceOrModalMenu";
import LinkView from "@/react-multiversal/LinkView";
import { PositionName } from "@/react-multiversal/positions.utils";
import { UserColorScheme, userColorSchemeStorageKey } from "@/react-multiversal/theme/colorScheme";
import { useUserColorScheme } from "@/react-multiversal/theme/useUserColorScheme";
import SVGTranslate from "@/svgs/components/SVGTranslate";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouterState } from "@tanstack/react-router";
import { MouseEvent, ReactNode, useCallback, useEffect, useMemo, useRef, useState } from "react";
import { GestureResponderEvent, Text, View } from "react-native";
import Svg, { Path } from "react-native-svg";

/** What each language calls itself - never the visitor's current language. */
const languageNames: Record<Lang, string> = {
  en: "English",
  fr: "Français",
};

const colorSchemes: UserColorScheme[] = ["light", "auto", "dark"];

/** Everything the menu bar already shows - this menu does not repeat it. */
const menuBarHrefs = new Set(Object.values(menuBarLinks).map((link) => link.href));

/** Icon size of every menu entry - also the gutter kept by the ones without. */
const iconSize = 18;

const label = (icon: ReactNode, text: string, color: string) => (
  <>
    {icon ?? <View style={{ width: iconSize }} />}
    <Text style={[fontStyles.ios.body, { color }]}>{text}</Text>
  </>
);

const colorSchemeIcon = (scheme: UserColorScheme, color: string) => (
  <Svg width={iconSize} height={iconSize} viewBox="0 0 28 28">
    <Path fill={color} d={defaultSvgPaths[scheme]} />
  </Svg>
);

/**
 * Under the trigger, aligned on its left edge: the menu is wider than the
 * entry it hangs from, and the header has more room to its right than to its
 * left. Falls back above it when opened from the bottom menu bar.
 */
const preferredPositions: PositionName[] = ["bottom-left", "top-left", "bottom-auto", "top-auto"];

/**
 * The site menu, opened from the "More" entry of the menu bar. It gathers the
 * settings (color scheme, language) and everything the footer links to, so the
 * header no longer has to carry a switch per setting.
 *
 * The trigger stays the link to the footer it has always been: without the
 * menu, `#links` still lands on the same links in plain markup, which is also
 * what search engines follow - the menu itself is not meant to be crawled.
 */
export default function WebsiteMenu({ children }: { children: ReactNode }) {
  const t = useT();
  const lang = useLang();
  const localizeHref = useHref();
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const [userColorScheme, setUserColorScheme] = useUserColorScheme();

  const [isOpen, setIsOpen] = useState(false);
  // Closing is staged so the panel can play its exit: every way out - the
  // trigger, a click outside, Escape, a scroll, picking an item - goes through
  // `close`, which is what the trigger used to skip by flipping `isOpen`.
  const [isClosing, setIsClosing] = useState(false);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  useEffect(() => () => clearTimeout(closeTimer.current), []);
  const close = useCallback(() => {
    if (closeTimer.current !== undefined) return;
    setIsClosing(true);
    closeTimer.current = setTimeout(() => {
      closeTimer.current = undefined;
      setIsClosing(false);
      setIsOpen(false);
    }, exitDuration);
  }, []);
  const triggerRef = useRef<HTMLElement | null>(null);
  const setTriggerNode = useCallback((node: Text | null) => {
    const element = node as unknown as HTMLElement | null;
    triggerRef.current = element?.closest?.("a") ?? element;
  }, []);

  const handleTriggerPress = useCallback(
    (event: GestureResponderEvent | MouseEvent) => {
      // The href is the no-JS fallback, not where we want to go from here.
      event.preventDefault();
      if (isOpen) close();
      else setIsOpen(true);
    },
    [isOpen, close],
  );

  const handleColorSchemeChange = useCallback(
    (value: UserColorScheme) => {
      void AsyncStorage.setItem(userColorSchemeStorageKey, value);
      void setUserColorScheme(value);
      // Stay open: picking a theme is something you check, then adjust.
      return false;
    },
    [setUserColorScheme],
  );

  const items: InPlaceOrModalMenuItem[] = useMemo(
    () => [
      {
        id: "appearance",
        // The icon is the scheme in use, so the current value shows without
        // having to open the submenu.
        label: (color: string) =>
          label(
            colorSchemeIcon(userColorScheme, color),
            t({ en: "Appearance", fr: "Apparence" }),
            color,
          ),
        items: colorSchemes.map((scheme) => ({
          id: `color-scheme-${scheme}`,
          label: (color: string) =>
            label(
              colorSchemeIcon(scheme, color),
              t(
                scheme === "light"
                  ? { en: "Light", fr: "Clair" }
                  : scheme === "dark"
                    ? { en: "Dark", fr: "Sombre" }
                    : { en: "Auto", fr: "Auto" },
              ),
              color,
            ),
          onPress: () => handleColorSchemeChange(scheme),
        })),
      },
      // No language entry on the English-only sections (`/blog`, `/talks`):
      // there is no counterpart to switch to.
      ...(!isLocalizedPath(pathname)
        ? []
        : [
            {
              id: "language",
              label: (color: string) =>
                label(
                  <SVGTranslate width={iconSize} height={iconSize} fill={color} />,
                  t({ en: "Language", fr: "Langue" }),
                  color,
                ),
              items: langs.map((alternate) => ({
                id: `language-${alternate}`,
                // Each language names itself, so a French visitor looking for
                // French does not have to read English first.
                label: (color: string) => label(null, languageNames[alternate], color),
                href: localizedHref(pathname, alternate),
              })),
            },
          ]),
      { id: "navigation", heading: true, label: t({ en: "Navigation", fr: "Navigation" }) },
      // Only what the menu bar has no room for: Home, Resume and Contact are
      // one click away already, and its "More" entry is this menu. Derived from
      // the bar rather than listed by hand, so the two cannot drift apart.
      ...Object.entries(allInternalLinks)
        .filter(([, link]) => !menuBarHrefs.has(link.href))
        .map(([text, link]) => ({
          id: `navigation-${link.href}`,
          label: (color: string) =>
            label(link.icon({ size: iconSize, color }), t(link.label) ?? text, color),
          href: localizeHref(link.href),
        })),
      { id: "follow", heading: true, label: t({ en: "Follow Me", fr: "Me suivre" }) },
      ...Object.entries({ ...socialLinks, ...socialLinks2 }).map(([text, link]) => ({
        id: `follow-${link.href}`,
        label: (color: string) => label(link.icon({ size: iconSize, color }), text, color),
        href: link.href,
      })),
    ],
    [t, pathname, localizeHref, handleColorSchemeChange, userColorScheme],
  );

  return (
    <>
      <LinkView
        ref={setTriggerNode}
        href={localizeHref("#" + footerAnchor)}
        aria-expanded={isOpen}
        aria-label={t({ en: "More", fr: "Plus" })}
        onPress={handleTriggerPress}
      >
        {children}
      </LinkView>
      {!isOpen ? null : (
        <InPlaceOrModalMenu
          id="website-menu"
          anchorRef={triggerRef}
          preferredPositions={preferredPositions}
          // The trigger is the pill of the menu bar: the reveal starts with its
          // corners, not with a radius guessed from the clip.
          revealRadius={36}
          dataSet={glassDataSet}
          items={items}
          selectedItemIds={[`color-scheme-${userColorScheme}`, `language-${lang}`]}
          onExit={close}
          isExiting={isClosing}
          menuStyle={{ marginTop: size("xxs") }}
        />
      )}
    </>
  );
}
