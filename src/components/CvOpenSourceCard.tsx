import { useT, useLang } from "@/i18n";
import { ResumeItem } from "@/api";
import Image from "@/components/Image";
import {
  compactCount,
  githubFollowers,
  githubSince,
  lowerKeepingAcronyms,
  openSourceCredits,
  openSourceIntro,
  projectName,
  yearRange,
} from "@/profile";
import { size } from "@/react-multiversal";
import { fontStyles, weight } from "@/react-multiversal/font";
import GradientLinear from "@/react-multiversal/GradientLinear";
import LinkView from "@/react-multiversal/LinkView";
import SpacedView from "@/react-multiversal/SpacedView";
import { alpha, colors } from "@/styles";
import SVGSocialGithub from "@/svgs/components/SVGSocialGithub";
import { StyleSheet, Text, View } from "react-native";

/**
 * The Open Source band of the CV: one card per `openSource: true` résumé entry,
 * each with its headline figure - all of it read from the markdown frontmatter.
 */
export default function CvOpenSourceCard({ items }: { items: ResumeItem[] }) {
  const t = useT();
  const lang = useLang();
  return (
    <View style={{ borderRadius: size("s"), overflow: "hidden" }}>
      <GradientLinear
        angle={60}
        stops={[
          { offset: 10, stopColor: "#010244" },
          { offset: 100, stopColor: "#0F7CB7" },
        ]}
        style={StyleSheet.absoluteFill}
      />
      <View
        style={{
          position: "absolute",
          right: -30,
          bottom: -34,
          opacity: 0.08,
        }}
      >
        <SVGSocialGithub width={170} height={170} fill={colors.white} />
      </View>

      <SpacedView horizontal="l" vertical="l" gap="s">
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            flexWrap: "wrap",
            gap: size("s"),
          }}
        >
          <Image
            src="/github-arctic-code-vault-contributor.png"
            width={224 / 8}
            height={254 / 8}
            priority={true}
            alt="GitHub Arctic Code Vault Contributor"
          />
          <Text
            role="heading"
            aria-level={2}
            style={[fontStyles.iosEm.title3, { color: colors.white }]}
          >
            {"Open Source"}
          </Text>
          <View style={{ flex: 1 }} />
          <Text style={[fontStyles.ios.caption1, { color: alpha(colors.white, 0.72) }]}>
            {`${compactCount(githubFollowers)} followers · on GitHub since ${githubSince}`}
          </Text>
        </View>

        <Text style={[fontStyles.ios.footnote, { color: alpha(colors.white, 0.85) }]}>
          {t(openSourceIntro)}
        </Text>

        <View
          style={{
            flexDirection: "row",
            flexWrap: "wrap",
            gap: size("s"),
          }}
        >
          {items.map((item) => {
            const [headline, ...rest] = item.stats ?? [];
            return (
              <View
                key={item.slug}
                style={{
                  flexGrow: 1,
                  flexShrink: 1,
                  // Wide enough that the four entries land on a 2×2 grid.
                  flexBasis: 300,
                  borderRadius: size("xs"),
                  backgroundColor: alpha(colors.white, 0.12),
                  borderWidth: 1,
                  borderColor: alpha(colors.white, 0.18),
                }}
              >
                <SpacedView horizontal="s" vertical="s" gap="xxs">
                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "baseline",
                      flexWrap: "wrap",
                      gap: size("xxs"),
                    }}
                  >
                    <LinkView href={item.url ?? ""} underlineOnFocus={true}>
                      <Text
                        style={[
                          fontStyles.iosEm.subhead,
                          { color: colors.white, fontWeight: weight.bold },
                        ]}
                      >
                        {projectName(item)}
                      </Text>
                    </LinkView>
                    <Text style={[fontStyles.ios.caption1, { color: alpha(colors.white, 0.66) }]}>
                      {`${item.job_title ?? ""} · ${yearRange(item, lang)}`}
                    </Text>
                  </View>

                  {headline ? (
                    <View
                      style={{
                        flexDirection: "row",
                        alignItems: "flex-end",
                        flexWrap: "wrap",
                        gap: size("xs"),
                      }}
                    >
                      <Text>
                        <Text
                          style={{
                            fontSize: 22,
                            lineHeight: 24,
                            fontWeight: weight.black,
                            color: colors.white,
                          }}
                        >
                          {headline.stat}
                        </Text>
                        <Text
                          style={[fontStyles.ios.caption1, { color: alpha(colors.white, 0.8) }]}
                        >
                          {` ${headline.label}`}
                        </Text>
                      </Text>
                      {rest.length > 0 ? (
                        <Text
                          style={[fontStyles.ios.caption2, { color: alpha(colors.white, 0.6) }]}
                        >
                          {rest
                            .map((s) => `${s.stat} ${lowerKeepingAcronyms(s.label)}`)
                            .join(" · ")}
                        </Text>
                      ) : null}
                    </View>
                  ) : null}

                  <Text style={[fontStyles.ios.caption1, { color: alpha(colors.white, 0.82) }]}>
                    {item.title.trim()}
                  </Text>
                </SpacedView>
              </View>
            );
          })}
        </View>

        <Text style={[fontStyles.ios.caption1, { color: alpha(colors.white, 0.72) }]}>
          {"Also: "}
          {openSourceCredits.map((credit, i) => (
            <Text key={credit.label}>
              {i > 0 ? " · " : ""}
              <Text style={{ color: colors.white, fontWeight: weight.semibold }}>
                {credit.label}
              </Text>
              {` ${credit.note}`}
            </Text>
          ))}
        </Text>
      </SpacedView>
    </View>
  );
}
