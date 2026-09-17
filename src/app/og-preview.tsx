import { FORMATS } from "@/app/{-$lang}.og";
import { langs } from "@/i18n";
import { fontStyles } from "@/react-multiversal/font";
import { useTheme } from "@/styles";
import { createFileRoute, Link } from "@tanstack/react-router";
import { Text, View } from "react-native";

/**
 * Contact sheet of every social-preview image the site exports: each format
 * in each language, rendered live by the `/og` route in an iframe. Edit the
 * route, the sheet updates through HMR - no need to re-run `npm run og` to
 * see a change. `?scale=` shrinks the frames to fit the screen; 1 is the
 * exact pixel size the export captures. Not linked, not indexed, dev only in
 * spirit.
 */
const SCALES = [1, 0.75, 0.5, 0.35] as const;

export const Route = createFileRoute("/og-preview")({
  validateSearch: (search: Record<string, unknown>): { scale: number } => {
    const scale = Number(search.scale);
    return { scale: SCALES.includes(scale as (typeof SCALES)[number]) ? scale : 0.5 };
  },
  head: () => ({
    meta: [{ title: "Social previews" }, { name: "robots", content: "noindex, nofollow" }],
  }),
  component: PageOgPreview,
});

const ogPath = (lang: string, format: keyof typeof FORMATS) =>
  `${lang === "en" ? "" : `/${lang}`}/og${format === "social" ? "" : `?format=${format}`}`;

function PageOgPreview() {
  const theme = useTheme();
  const { scale } = Route.useSearch();
  const formats = Object.keys(FORMATS) as (keyof typeof FORMATS)[];
  return (
    <View style={[theme.styles.back, { minHeight: "100vh", padding: 24, gap: 24 }]}>
      <View style={{ flexDirection: "row", alignItems: "center", gap: 16, flexWrap: "wrap" }}>
        <Text style={[fontStyles.iosEm.title2, theme.styles.text]}>Social previews</Text>
        <Text style={[fontStyles.ios.subhead, theme.styles.textLight1]}>scale</Text>
        {SCALES.map((s) => (
          <Link key={s} to="/og-preview" search={{ scale: s }}>
            <Text
              style={[
                fontStyles.ios.subhead,
                s === scale ? theme.styles.text : theme.styles.textLight1,
                { fontWeight: s === scale ? "700" : "400" },
              ]}
            >
              {`${s}`}
            </Text>
          </Link>
        ))}
      </View>
      {formats.map((format) =>
        langs.map((lang) => {
          const { width, height } = FORMATS[format];
          const path = ogPath(lang, format);
          return (
            <View key={`${format}-${lang}`} style={{ gap: 8 }}>
              <Text style={[fontStyles.ios.footnote, theme.styles.textLight1]}>
                {`${format} · ${lang} · ${width}×${height} · `}
                <Link to={path}>
                  <Text style={theme.styles.text}>{path}</Text>
                </Link>
              </Text>
              {/* The wrapper takes the scaled size so the sheet flows; the
                  iframe keeps the real size and is scaled down visually. */}
              <View
                style={{
                  width: width * scale,
                  height: height * scale,
                  overflow: "hidden",
                  boxShadow: "0 2px 12px rgba(0,0,0,0.15)",
                }}
              >
                {/* Our own route, same origin, and it needs its scripts (HMR
                    is the point): a sandbox would have to allow both, which
                    is no sandbox at all. */}
                {/* oxlint-disable-next-line react/iframe-missing-sandbox */}
                <iframe
                  title={`${format} ${lang}`}
                  src={path}
                  width={width}
                  height={height}
                  // The wrapper is a flex column, so the iframe would shrink
                  // to it like any flex child and crop the render.
                  style={{
                    width,
                    height,
                    flexShrink: 0,
                    border: 0,
                    transform: `scale(${scale})`,
                    transformOrigin: "top left",
                  }}
                />
              </View>
            </View>
          );
        }),
      )}
    </View>
  );
}
