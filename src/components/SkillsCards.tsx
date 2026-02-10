import Image from "next/image";
import * as React from "react";
import { StyleSheet, Text, View, ViewStyle } from "react-native";

import { themeDark } from "@/app/styles";
import { size } from "@/react-multiversal";
import { fontStyles } from "@/react-multiversal/font";
import { boxShadowGlass } from "@/react-multiversal/GlassView";
import GradientLinear from "@/react-multiversal/GradientLinear";
import LinkText from "@/react-multiversal/LinkText";
import LinkView from "@/react-multiversal/LinkView";
import SpacedView from "@/react-multiversal/SpacedView";
import Spacer from "@/react-multiversal/Spacer";
import SVGGraphql from "@/svgs/components/SVGGraphql";
import SVGJavaScript from "@/svgs/components/SVGJavaScript";
import SVGReact from "@/svgs/components/SVGReact";
import SVGSocialGithub from "@/svgs/components/SVGSocialGithub";
import SVGTypescript from "@/svgs/components/SVGTypescript";

const styles = StyleSheet.create({
  bgIcon: {
    position: "absolute",
    right: -20,
    bottom: -20,
    opacity: 0.05,
    transform: [{ perspective: 800 }, { rotate: "6deg" }],
  } as ViewStyle,
});

type SkillItem = {
  title: string;
  color: string;
  bg: string;
  bg2: string;
  icon?: React.ReactNode;
  child: React.ReactNode;
};

type SkillsCardsMode = "mini" | "default";

type SkillsCardsProps = {
  mode?: SkillsCardsMode;
};

const borderRadius = size("s");

export default function SkillsCards({ mode = "default" }: SkillsCardsProps) {
  const isMini = mode === "mini";
  const iconSize = isMini ? 20 : 24;
  const flexBasis = isMini ? 180 : 240;
  const textStyle = isMini ? fontStyles.ios.footnote : fontStyles.ios.subhead;
  const titleStyle = isMini ? fontStyles.iosEm.title3 : fontStyles.iosEm.title2;
  const spacing = isMini ? "m" : "xl";

  const skills: SkillItem[] = React.useMemo(
    () => [
      {
        title: "JavaScript",
        color: "#FFFFFF",
        bg: "#0D0837",
        bg2: "#3178C6",
        icon: (
          <SVGJavaScript
            width={iconSize}
            height={iconSize}
            style={{ borderRadius: 4 }}
          />
        ),
        child: (
          <>
            <View style={styles.bgIcon}>
              <SVGTypescript width={160} height={160} fill="#FFFFFF" />
            </View>
            {isMini ? (
              <View role="list">
                {["TypeScript", "Front-end", "Node.js", "HTML", "CSS"].map(
                  (l) => (
                    <Text
                      key={l}
                      role="listitem"
                      style={[textStyle, themeDark.styles.textLight1]}
                    >
                      {l}
                    </Text>
                  ),
                )}
              </View>
            ) : (
              <>
                <Text
                  style={[textStyle, themeDark.styles.textLight1]}
                  role="paragraph"
                >
                  {
                    "I coded in JS in almost every browsers, with all engines, from SpiderMonkey to v8.\nI started with ES1 and I am now using TypeScript, since type safety feels like a requirement to offer a high level of condience."
                  }
                </Text>
                <Spacer size="xxl" style={{ flexGrow: 1 }} />
                <View role="list">
                  {["TypeScript", "Node.js", "HTML", "CSS"].map((l) => (
                    <Text
                      key={l}
                      role="listitem"
                      style={[fontStyles.iosEm.subhead, themeDark.styles.text]}
                    >
                      {l}
                    </Text>
                  ))}
                </View>
              </>
            )}
          </>
        ),
      },
      {
        title: "React",
        color: "#FFFFFF",
        bg: "#0D0837",
        bg2: "#087EA4",
        icon: (
          <View
            style={{
              backgroundColor: "#fff",
              borderRadius: 4,
              justifyContent: "center",
              alignItems: "center",
              width: iconSize,
              height: iconSize,
            }}
          >
            <SVGReact
              width={iconSize - 2}
              height={iconSize - 2}
              fill="rgb(8, 126, 164)"
            />
          </View>
        ),
        child: (
          <>
            <View style={{ ...styles.bgIcon, right: -40, bottom: -40 }}>
              <SVGReact width={160} height={160} fill="#FFFFFF" />
            </View>
            {isMini ? (
              <View role="list">
                {[
                  "Cross-platform",
                  "Web & Native",
                  "TanStack Start / Next.js",
                  "Expo",
                ].map((l) => (
                  <Text
                    key={l}
                    role="listitem"
                    style={[textStyle, themeDark.styles.textLight1]}
                  >
                    {l}
                  </Text>
                ))}
              </View>
            ) : (
              <>
                <Text
                  style={[textStyle, themeDark.styles.textLight1]}
                  role="paragraph"
                >
                  {
                    "I started using React in 2014 and followed all of its evolutions.\nTo this day, I strongly believe that React & React Native are currently the best tools to produce fast & maintainable user-interfaces."
                  }
                </Text>
                <Spacer size="xxl" style={{ flexGrow: 1 }} />
                <View role="list">
                  {[
                    "Web & Native",
                    "Crossplatform",
                    "TanStack Start / Next.js",
                    "Expo",
                  ].map((l) => (
                    <Text
                      key={l}
                      role="listitem"
                      style={[fontStyles.iosEm.subhead, themeDark.styles.text]}
                    >
                      {l}
                    </Text>
                  ))}
                </View>
              </>
            )}
          </>
        ),
      },
      {
        title: "APIs",
        color: "#FFFFFF",
        bg: "#0D0837",
        bg2: "#4421A7",
        icon: (
          <View
            style={{
              backgroundColor: "#fafafa",
              borderRadius: 4,
              justifyContent: "center",
              alignItems: "center",
              width: iconSize,
              height: iconSize,
            }}
          >
            <SVGGraphql
              width={iconSize - 2}
              height={iconSize - 2}
              fill="#E10098"
            />
          </View>
        ),
        child: (
          <>
            <View style={{ ...styles.bgIcon, right: -30, bottom: -30 }}>
              <SVGGraphql width={160} height={160} fill="#FFFFFF" />
            </View>
            {isMini ? (
              <View role="list">
                {["GraphQL", "Apollo", "REST"].map((l) => (
                  <Text
                    key={l}
                    role="listitem"
                    style={[textStyle, themeDark.styles.textLight1]}
                  >
                    {l}
                  </Text>
                ))}
              </View>
            ) : (
              <>
                <Text
                  style={[textStyle, themeDark.styles.textLight1]}
                  role="paragraph"
                >
                  {
                    "As a Front-End Developer, my job is to allow users to interact with various kind of data.\nThis means I must master all possible type of Back-end."
                  }
                </Text>
                <Spacer size="xxl" style={{ flexGrow: 1 }} />
                <View role="list">
                  {["REST", "GraphQL", "Apollo"].map((l) => (
                    <Text
                      key={l}
                      role="listitem"
                      style={[fontStyles.iosEm.subhead, themeDark.styles.text]}
                    >
                      {l}
                    </Text>
                  ))}
                </View>
              </>
            )}
          </>
        ),
      },
      {
        title: isMini ? "OpenSource" : "Open Source",
        color: "#FFFFFF",
        bg: "#010244",
        bg2: "#0F7CB7",
        icon: (
          <Image
            src="/github-arctic-code-vault-contributor.png"
            width={224 / (isMini ? 11 : 10)}
            height={254 / (isMini ? 11 : 10)}
            alt="GitHub Arctic Code Vault Contributor"
          />
        ),
        child: (
          <>
            <View style={styles.bgIcon}>
              <SVGSocialGithub width={160} height={160} fill="#FFFFFF" />
            </View>
            {isMini ? (
              <SpacedView gap="xs">
                <Text style={[textStyle, themeDark.styles.textLight1]}>
                  <LinkText
                    href="https://github.com/MoOx?achievement=arctic-code-vault-contributor&tab=achievements"
                    style={[textStyle, themeDark.styles.text]}
                  >
                    {"Arctic Code Vault Contributor"}
                  </LinkText>
                </Text>
              </SpacedView>
            ) : (
              <>
                <SpacedView gap="xs">
                  <Text style={[textStyle, themeDark.styles.textLight1]}>
                    {
                      "Since I discovered Open Source, I have been contributing to a wide variety of projects and even created some libraries that got billions of downloads. "
                    }
                    <LinkText
                      href="https://github.com/MoOx?achievement=arctic-code-vault-contributor&tab=achievements"
                      style={[textStyle, themeDark.styles.text]}
                    >
                      {
                        "I am proud to be part of GitHub Arctic Code Vault Contributor project."
                      }
                    </LinkText>
                  </Text>
                </SpacedView>
                <Spacer size="xxl" style={{ flexGrow: 1 }} />
                <SpacedView gap="xxs" role="list">
                  <LinkView
                    role="listitem"
                    href="https://github.com/search?q=repo%3Afacebook%2Freact-native+author%3Amoox&type=commits"
                  >
                    <Text
                      style={[fontStyles.iosEm.caption1, themeDark.styles.text]}
                    >
                      {"react-native"}
                    </Text>
                    <Text
                      style={[
                        fontStyles.ios.caption2,
                        themeDark.styles.textLight1,
                      ]}
                    >
                      {"Various minor contributions."}
                    </Text>
                  </LinkView>
                  <LinkView
                    role="listitem"
                    href="https://github.com/search?q=org%3Apostcss+author%3Amoox&type=commits&s=committer-date&o=desc"
                  >
                    <Text
                      style={[fontStyles.iosEm.caption1, themeDark.styles.text]}
                    >
                      {"PostCSS"}
                    </Text>
                    <Text
                      style={[
                        fontStyles.ios.caption2,
                        themeDark.styles.textLight1,
                      ]}
                    >
                      {"Creator of the PostCSS organization +500 commits"}
                    </Text>
                  </LinkView>
                  <LinkView role="listitem" href="https://cssnext.github.io">
                    <Text
                      style={[fontStyles.iosEm.caption1, themeDark.styles.text]}
                    >
                      {"cssnext +5k ☆"}
                    </Text>
                    <Text
                      style={[
                        fontStyles.ios.caption2,
                        themeDark.styles.textLight1,
                      ]}
                    >
                      {"The father of postcss-preset-env. +6M downloads/week."}
                    </Text>
                  </LinkView>
                  <LinkView
                    role="listitem"
                    href="https://github.com/MoOx/phenomic"
                  >
                    <Text
                      style={[fontStyles.iosEm.caption1, themeDark.styles.text]}
                    >
                      {"phenomic +3k ☆"}
                    </Text>
                    <Text
                      style={[
                        fontStyles.ios.caption2,
                        themeDark.styles.textLight1,
                      ]}
                    >
                      {"Precursor of Next.js static rendering."}
                    </Text>
                  </LinkView>
                  <LinkView
                    role="listitem"
                    href="https://github.com/stylelint/stylelint/issues?q=is%3Aissue+author%3Amoox+is%3Aclosed+sort%3Acreated-asc"
                  >
                    <Text
                      style={[fontStyles.iosEm.caption1, themeDark.styles.text]}
                    >
                      {"stylelint"}
                    </Text>
                    <Text
                      style={[
                        fontStyles.ios.caption2,
                        themeDark.styles.textLight1,
                      ]}
                    >
                      {"Creator of the project. +5M downloads/week."}
                    </Text>
                  </LinkView>
                </SpacedView>
              </>
            )}
          </>
        ),
      },
    ],
    [isMini, iconSize, textStyle],
  );

  return (
    <SpacedView
      gap="m"
      style={{
        flex: 1,
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: isMini ? "flex-end" : "center",
        alignItems: isMini ? "flex-end" : undefined,
      }}
      role="list"
    >
      {skills.map((item) => (
        <View
          key={item.title}
          style={{
            flexGrow: 1,
            flexBasis,
            minWidth: flexBasis,
            borderRadius,
            overflow: "hidden",
          }}
          role="listitem"
        >
          <SpacedView
            horizontal={spacing}
            vertical={spacing}
            style={{ flexGrow: 1 }}
          >
            <GradientLinear
              angle={60}
              stops={[
                { offset: 10, stopColor: item.bg },
                { offset: 100, stopColor: item.bg2 },
              ]}
              style={StyleSheet.absoluteFill}
            />
            <View
              style={[
                StyleSheet.absoluteFill,
                { borderRadius, boxShadow: boxShadowGlass() },
              ]}
            />
            <SpacedView
              gap={isMini ? "xs" : "s"}
              style={{
                flexDirection: "row",
                flexWrap: "wrap",
                alignItems: "center",
              }}
            >
              {item.icon}
              <Text
                role="heading"
                aria-level={3}
                style={[titleStyle, themeDark.styles.textOnMain]}
              >
                {item.title}
              </Text>
            </SpacedView>
            <Spacer size="s" />
            {item.child}
          </SpacedView>
        </View>
      ))}
    </SpacedView>
  );
}
