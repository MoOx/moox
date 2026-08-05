import { isLocalizedPath, Lang, langs, localizedHref, useLang } from "@/i18n";
import { size } from "@/react-multiversal";
import { fontStyles } from "@/react-multiversal/font";
import LinkView from "@/react-multiversal/LinkView";
import { alpha, colors, useTheme } from "@/styles";
import { useRouterState } from "@tanstack/react-router";
import { Text, View } from "react-native";

/** What each language calls itself - never the visitor's current language. */
const languageNames: Record<Lang, string> = {
  en: "English",
  fr: "Français",
};

const shortNames: Record<Lang, string> = {
  en: "EN",
  fr: "FR",
};

/**
 * Switches between the language versions of the page being read - no automatic
 * redirection anywhere on the site, so a URL always serves the same language
 * (decision: WEB-REWORK.md phase 5). Renders nothing on the English-only
 * sections (`/blog`, `/talks`), where there is no counterpart to switch to.
 */
export default function LanguageSwitcher() {
  const theme = useTheme();
  const lang = useLang();
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  if (!isLocalizedPath(pathname)) return null;

  return (
    <View style={{ flexDirection: "row", alignItems: "center", gap: size("xxs") }}>
      {langs.map((alternate) => {
        const current = alternate === lang;
        return (
          <LinkView
            key={alternate}
            href={localizedHref(pathname, alternate)}
            // The name of the target language, in that language: a French
            // visitor looking for French must not have to read English first.
            aria-label={languageNames[alternate]}
            aria-current={current ? "page" : undefined}
            style={{
              paddingHorizontal: size("xxs"),
              paddingVertical: 2,
              borderRadius: 6,
              backgroundColor: current ? alpha(colors.black, 0.08) : "transparent",
            }}
          >
            <Text
              style={[
                fontStyles.ios.caption1,
                current ? theme.styles.text : theme.styles.textLight1,
              ]}
            >
              {shortNames[alternate]}
            </Text>
          </LinkView>
        );
      })}
    </View>
  );
}
