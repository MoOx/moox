import { isLocalizedPath, Lang, langs, localizedHref, useLang } from "@/i18n";
import { size } from "@/react-multiversal";
import { fontStyles } from "@/react-multiversal/font";
import LinkView from "@/react-multiversal/LinkView";
import SpacedView from "@/react-multiversal/SpacedView";
import { useTheme } from "@/styles";
import SVGTranslate from "@/svgs/components/SVGTranslate";
import { useRouterState } from "@tanstack/react-router";
import { Text, View } from "react-native";

/** What each language calls itself - never the visitor's current language. */
const languageNames: Record<Lang, string> = {
  en: "English",
  fr: "Français",
};

/**
 * Switches between the language versions of the page being read - no automatic
 * redirection anywhere on the site, so a URL always serves the same language
 * (decision: CV-REWORK-JOURNAL.md §12). Renders nothing on the English-only
 * sections (`/blog`, `/talks`), where there is no counterpart to switch to.
 *
 * Laid out like the other footer entries, since that is where it lives: the
 * header carries the same choice inside `WebsiteMenu`.
 */
export default function LanguageSwitcher() {
  const theme = useTheme();
  const lang = useLang();
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  if (!isLocalizedPath(pathname)) return null;

  return (
    <View>
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
            style={{ flexDirection: "row", alignItems: "center" }}
          >
            <SVGTranslate
              width={size("m")}
              height={size("m")}
              fill={theme.dynamicColors.text}
              style={{ flexShrink: 0, opacity: current ? 1 : 0.25 }}
            />
            <SpacedView horizontal="xs" vertical="xs">
              <Text
                style={[current ? fontStyles.iosEm.body : fontStyles.ios.body, theme.styles.text]}
              >
                {languageNames[alternate]}
              </Text>
            </SpacedView>
          </LinkView>
        );
      })}
    </View>
  );
}
