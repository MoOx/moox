import AvailabilityBadge from "@/components/AvailabilityBadge";
import JobTitleHeading from "@/components/JobTitleHeading";
import Me from "@/components/Me";
import WebsiteWrapper from "@/components/WebsiteWrapper";
import { assertLangParam, useLang, useT } from "@/i18n";
import { freelanceSince, fullName, workLocation } from "@/profile";
import { fontStyles, weight } from "@/react-multiversal/font";
import GradientLinear from "@/react-multiversal/GradientLinear";
import { getColorScheme, setUserColorScheme } from "@/react-multiversal/theme/colorScheme";
import { gradientFlashyStops, gradientTextFlashyStyles, useTheme } from "@/styles";
import { createFileRoute } from "@tanstack/react-router";
import { useEffect } from "react";
import { Text, View } from "react-native";

/**
 * The social-preview image, as a page: `scripts/generate-og-images.mjs`
 * screenshots the `[data-og-frame]` element into `public/preview-1200x630*.jpg`
 * (Open Graph card) and `github.jpg` (the README banner). It reuses the home
 * hero's components, so the image always shows the wording the site shows -
 * the previous JPEGs were hand-made and kept advertising a retired title.
 *
 * Not linked from anywhere and `noindex`: it exists for the export only.
 */
export const FORMATS = {
  /** Open Graph / Twitter card - the size every network recommends. */
  social: { width: 1200, height: 630 },
  /** The README banner, GitHub's profile-card proportions. */
  github: { width: 1692, height: 424 },
} as const;
export type Format = keyof typeof FORMATS;

export const Route = createFileRoute("/{-$lang}/og")({
  beforeLoad: ({ params }) => assertLangParam(params.lang),
  validateSearch: (search: Record<string, unknown>): { format: Format } => ({
    format: search.format === "github" ? "github" : "social",
  }),
  head: () => ({
    meta: [{ title: "Social preview" }, { name: "robots", content: "noindex, nofollow" }],
  }),
  component: PageOg,
});

function PageOg() {
  const theme = useTheme();
  const t = useT();
  const lang = useLang();
  const { format } = Route.useSearch();
  const { width, height } = FORMATS[format];
  const banner = format === "github";
  const freelanceLine = `${lang === "fr" ? "Freelance depuis" : "Freelance since"} ${freelanceSince} · ${t(workLocation)}`;

  // Always rendered light, like the CV: the card is seen on a white feed.
  useEffect(() => {
    const previous = getColorScheme();
    void setUserColorScheme("light");
    return () => {
      void setUserColorScheme(previous);
    };
  }, []);

  // Two slanted bands of the site's flashy gradient, the header band's
  // treatment applied to both edges of the frame. Negative skew: the band is
  // thick on the left at the top and thick on the right at the bottom, so the
  // two frame the content diagonally instead of boxing it.
  const bandHeight = banner ? 90 : 130;
  const band = (edge: "top" | "bottom") => (
    <GradientLinear
      style={{
        position: "absolute",
        left: -20,
        right: -20,
        height: bandHeight,
        width: "110%",
        [edge]: -bandHeight / 2,
        transform: [{ skewY: banner ? "-1.5deg" : "-3deg" }],
      }}
      stops={gradientFlashyStops(theme)}
      angle={-80}
    />
  );

  const photoWidth = banner ? 380 : 470;
  return (
    <WebsiteWrapper bare={true}>
      <View
        dataSet={{ ogFrame: format }}
        style={[theme.styles.back, { width, height, overflow: "hidden", position: "relative" }]}
      >
        {band("top")}
        {band("bottom")}
        {/* The photo: `Me` draws its own halo circles. Anchored to the bottom
            edge so the cut of the picture sits on the frame, as on the site. */}
        <View
          style={{
            position: "absolute",
            bottom: -40,
            right: banner ? 40 : 20,
            width: photoWidth,
          }}
        >
          <Me width={photoWidth} />
        </View>
        <View
          style={{
            position: "absolute",
            top: 0,
            bottom: 0,
            left: banner ? 70 : 150,
            // The card's column may run under the photo's halo, never the
            // photo itself: the freelance line is one line, as on the site.
            right: banner ? photoWidth + 60 : photoWidth - 60,
            justifyContent: "center",
            flexDirection: banner ? "row" : "column",
            alignItems: banner ? "center" : "flex-start",
            gap: banner ? 80 : 36,
          }}
        >
          <Text role="paragraph" style={{ display: "flex", flexDirection: "column" }}>
            <Text style={[fontStyles.ios.headline, theme.styles.textLight1, { fontSize: 26 }]}>
              {t({ en: "Hey,", fr: "Hey," })}
            </Text>
            <Text
              style={[
                fontStyles.iosEm.largeTitle,
                theme.styles.text,
                { fontSize: banner ? 56 : 44, lineHeight: banner ? 64 : 52 },
              ]}
            >
              {t({ en: "I'm ", fr: "Moi c'est " })}
              <Text style={gradientTextFlashyStyles(theme, -16)}>{"Max."}</Text>
            </Text>
          </Text>
          <View>
            <View style={{ flexDirection: "row", alignItems: "flex-end", gap: 16 }}>
              <JobTitleHeading
                headingLevel={1}
                titleSize={{ fontSize: banner ? 62 : 56, lineHeight: banner ? 72 : 64 }}
                prefixStyle={{ fontSize: banner ? 30 : 26 }}
                subtitleStyle={{ fontSize: banner ? 26 : 22 }}
              />
              <View style={{ position: "absolute", bottom: 0, right: 36, transform: "scale(2)" }}>
                <AvailabilityBadge showText={false} link={false} style={{ marginBottom: 44 }} />
              </View>
            </View>
            {banner ? null : (
              <Text
                style={[
                  fontStyles.ios.subhead,
                  theme.styles.textLight1,
                  {
                    marginTop: 48,
                    fontSize: 18,
                    fontWeight: weight.medium,
                    letterSpacing: 1.4,
                    textTransform: "uppercase",
                  },
                ]}
              >
                {freelanceLine}
              </Text>
            )}
          </View>
        </View>
        <Text style={{ position: "absolute", opacity: 0, fontSize: 1 }}>{fullName}</Text>
      </View>
    </WebsiteWrapper>
  );
}
