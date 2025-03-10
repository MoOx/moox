import Image from "next/image";
import * as React from "react";
import { StyleSheet, Text, View, ViewStyle } from "react-native";

import { themeDark } from "@/app/styles";
import ViewWithGradient from "@/components/ViewWithGradient";
import { fontStyles } from "@/react-multiversal/font";
import LinkText from "@/react-multiversal/LinkText";
import LinkView from "@/react-multiversal/LinkView";
import SpacedView from "@/react-multiversal/SpacedView";
import Spacer from "@/react-multiversal/Spacer";
import SVGDevTypescript from "@/svgs/components/SVGDevTypescript";
import SVGGraphql from "@/svgs/components/SVGGraphql";
import SVGJavaScript from "@/svgs/components/SVGJavaScript";
import SVGReact from "@/svgs/components/SVGReact";
import SVGSocialGithub from "@/svgs/components/SVGSocialGithub";

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

export default function SkillsCards() {
  const skills: SkillItem[] = React.useMemo(
    () => [
      {
        title: "JavaScript",
        color: "#FFFFFF",
        bg: "#0D0837",
        bg2: "#3178C6",
        icon: (
          <SVGJavaScript width={24} height={24} style={{ borderRadius: 4 }} />
        ),
        child: (
          <>
            <View style={styles.bgIcon}>
              <SVGDevTypescript width={160} height={160} fill="#FFFFFF" />
            </View>
            <Text style={[fontStyles.ios.subhead, themeDark.styles.textLight1]}>
              {
                "I coded in JS in almost every browsers, with all engines, from SpiderMonkey to v8.\nI started with ES1 and I am now using TypeScript, since type safety feels like a requirement to offer a high level of condience."
              }
            </Text>
            <Spacer size="xxl" style={{ flexGrow: 1 }} />
            <Text style={[fontStyles.iosEm.subhead, themeDark.styles.text]}>
              {["TypeScript", "Node.js", "HTML", "CSS"].join("\n")}
            </Text>
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
              width: 24,
              height: 24,
            }}
          >
            <SVGReact width={22} height={22} fill="rgb(8, 126, 164)" />
          </View>
        ),
        child: (
          <>
            <View style={{ ...styles.bgIcon, right: -40, bottom: -40 }}>
              <SVGReact width={160} height={160} fill="#FFFFFF" />
            </View>
            <Text style={[fontStyles.ios.subhead, themeDark.styles.textLight1]}>
              {
                "I started using React in 2014 and followed all of its evolutions.\nTo this day, I strongly believe that React & React Native are currently the best tools to produce fast & maintainable user-interfaces."
              }
            </Text>
            <Spacer size="xxl" style={{ flexGrow: 1 }} />
            <Text style={[fontStyles.iosEm.subhead, themeDark.styles.text]}>
              {["Web & Native", "Crossplatform", "Next.js", "Expo"].join("\n")}
            </Text>
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
              width: 24,
              height: 24,
            }}
          >
            <SVGGraphql width={22} height={22} fill="#E10098" />
          </View>
        ),
        child: (
          <>
            <View style={{ ...styles.bgIcon, right: -30, bottom: -30 }}>
              <SVGGraphql width={160} height={160} fill="#FFFFFF" />
            </View>
            <Text style={[fontStyles.ios.subhead, themeDark.styles.textLight1]}>
              {
                "As a Front-End Developer, my job is to allow users to interact with various kind of data.\nThis means I must master all possible type of Back-end."
              }
            </Text>
            <Spacer size="xxl" style={{ flexGrow: 1 }} />
            <Text style={[fontStyles.iosEm.subhead, themeDark.styles.text]}>
              {["REST", "GraphQL", "Apollo"].join("\n")}
            </Text>
          </>
        ),
      },

      {
        title: "Open Source",
        color: "#FFFFFF",
        bg: "#010244",
        bg2: "#0F7CB7",
        icon: (
          <Image
            src="/github-arctic-code-vault-contributor.png"
            width={224 / 10}
            height={254 / 10}
            alt="GitHub Arctic Code Vault Contributor"
          />
        ),
        child: (
          <>
            <View style={styles.bgIcon}>
              <SVGSocialGithub width={160} height={160} fill="#FFFFFF" />
            </View>
            <SpacedView gap="xs">
              <Text
                style={[fontStyles.ios.subhead, themeDark.styles.textLight1]}
              >
                {
                  "Since I discovered Open Source, I have been contributing to a wide variety of projects and even created some libraries that got billions of downloads. "
                }
                <LinkText
                  href="https://github.com/MoOx?achievement=arctic-code-vault-contributor&tab=achievements"
                  style={[fontStyles.ios.subhead, themeDark.styles.text]}
                >
                  {
                    "I am proud to be part of GitHub Arctic Code Vault Contributor project."
                  }
                </LinkText>
              </Text>
            </SpacedView>
            <Spacer size="xxl" style={{ flexGrow: 1 }} />
            <SpacedView gap="xxs">
              <LinkView href="https://github.com/search?q=repo%3Afacebook%2Freact-native+author%3Amoox&type=commits">
                <Text
                  style={[fontStyles.iosEm.caption1, themeDark.styles.text]}
                >
                  {"react-native"}
                </Text>
                <Text
                  style={[fontStyles.ios.caption2, themeDark.styles.textLight1]}
                >
                  {"Various minor contributions."}
                </Text>
              </LinkView>
              <LinkView href="https://github.com/search?q=org%3Apostcss+author%3Amoox&type=commits&s=committer-date&o=desc">
                <Text
                  style={[fontStyles.iosEm.caption1, themeDark.styles.text]}
                >
                  {"PostCSS"}
                </Text>
                <Text
                  style={[fontStyles.ios.caption2, themeDark.styles.textLight1]}
                >
                  {"Creator of the PostCSS organization +500 commits"}
                </Text>
              </LinkView>
              <LinkView href="https://cssnext.github.io">
                <Text
                  style={[fontStyles.iosEm.caption1, themeDark.styles.text]}
                >
                  {"cssnext +5k ☆"}
                </Text>
                <Text
                  style={[fontStyles.ios.caption2, themeDark.styles.textLight1]}
                >
                  {"The father of postcss-preset-env. +6M downloads/week."}
                </Text>
              </LinkView>
              <LinkView href="https://github.com/MoOx/phenomic">
                <Text
                  style={[fontStyles.iosEm.caption1, themeDark.styles.text]}
                >
                  {"phenomic +3k ☆"}
                </Text>
                <Text
                  style={[fontStyles.ios.caption2, themeDark.styles.textLight1]}
                >
                  {"Precursor of Next.js static rendering."}
                </Text>
              </LinkView>
              <LinkView href="https://github.com/stylelint/stylelint/issues?q=is%3Aissue+author%3Amoox+is%3Aclosed+sort%3Acreated-asc">
                <Text
                  style={[fontStyles.iosEm.caption1, themeDark.styles.text]}
                >
                  {"stylelint"}
                </Text>
                <Text
                  style={[fontStyles.ios.caption2, themeDark.styles.textLight1]}
                >
                  {"Creator of the project. +5M downloads/week."}
                </Text>
              </LinkView>
            </SpacedView>
          </>
        ),
      },
    ],
    []
  );

  return (
    <SpacedView
      gap="m"
      style={{
        flex: 1,
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "center",
      }}
    >
      {skills.map((item) => (
        <ViewWithGradient
          key={item.title}
          color={item.bg}
          color2={item.bg2}
          style={{ flexGrow: 1, flexBasis: 240, minWidth: 240 }}
        >
          <SpacedView
            horizontal="xl"
            vertical="xl"
            style={{
              flexGrow: 1,
              // flexBasis: 240,
            }}
          >
            <SpacedView
              gap="s"
              style={{
                flexDirection: "row",
                flexWrap: "wrap",
                alignItems: "center",
              }}
            >
              {item.icon}
              <Text
                style={[fontStyles.iosEm.title2, themeDark.styles.textOnMain]}
              >
                {item.title}
              </Text>
            </SpacedView>
            <Spacer size="s" />
            {item.child}
          </SpacedView>
        </ViewWithGradient>
      ))}
    </SpacedView>
  );
}
