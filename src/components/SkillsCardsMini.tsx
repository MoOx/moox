import Image from "next/image";
import * as React from "react";
import { StyleSheet, Text, View, ViewStyle } from "react-native";

import { themeDark } from "@/app/styles";
import { size } from "@/react-multiversal";
import { fontStyles } from "@/react-multiversal/font";
import { boxShadowGlass } from "@/react-multiversal/GlassView";
import GradientLinear from "@/react-multiversal/GradientLinear";
import LinkText from "@/react-multiversal/LinkText";
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

const borderRadius = size("s");

export default function SkillsCardsMini() {
  const skills: SkillItem[] = React.useMemo(
    () => [
      {
        title: "JavaScript",
        color: "#FFFFFF",
        bg: "#0D0837",
        bg2: "#3178C6",
        icon: (
          <SVGJavaScript width={20} height={20} style={{ borderRadius: 4 }} />
        ),
        child: (
          <>
            <View style={styles.bgIcon}>
              <SVGDevTypescript width={160} height={160} fill="#FFFFFF" />
            </View>
            <Text
              style={[fontStyles.ios.footnote, themeDark.styles.textLight1]}
            >
              {["TypeScript", "Front-end", "Node.js", "HTML", "CSS"].join("\n")}
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
              width: 20,
              height: 20,
            }}
          >
            <SVGReact width={18} height={18} fill="rgb(8, 126, 164)" />
          </View>
        ),
        child: (
          <>
            <View style={{ ...styles.bgIcon, right: -40, bottom: -40 }}>
              <SVGReact width={160} height={160} fill="#FFFFFF" />
            </View>
            <Text
              style={[fontStyles.ios.footnote, themeDark.styles.textLight1]}
            >
              {["Cross-platform", "Web & Native", "Next.js", "Expo"].join("\n")}
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
            <Text
              style={[fontStyles.ios.footnote, themeDark.styles.textLight1]}
            >
              {["GraphQL", "Apollo", "REST"].join("\n")}
            </Text>
          </>
        ),
      },

      {
        title: "OpenSource",
        color: "#FFFFFF",
        bg: "#010244",
        bg2: "#0F7CB7",
        icon: (
          <Image
            src="/github-arctic-code-vault-contributor.png"
            width={224 / 11}
            height={254 / 11}
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
                style={[fontStyles.ios.footnote, themeDark.styles.textLight1]}
              >
                <LinkText
                  href="https://github.com/MoOx?achievement=arctic-code-vault-contributor&tab=achievements"
                  style={[fontStyles.ios.footnote, themeDark.styles.text]}
                >
                  {"Arctic Code Vault Contributor"}
                </LinkText>
              </Text>
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
        justifyContent: "flex-end",
        alignItems: "flex-end",
      }}
    >
      {skills.map((item) => (
        <View
          key={item.title}
          style={{
            flexGrow: 1,
            flexBasis: 180,
            minWidth: 180,
            overflow: "hidden",
            borderRadius,
          }}
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
          <SpacedView horizontal="m" vertical="m" style={{ flexGrow: 1 }}>
            <SpacedView
              gap="xs"
              style={{
                flexDirection: "row",
                flexWrap: "wrap",
                alignItems: "center",
              }}
            >
              {item.icon}
              <Text
                style={[fontStyles.iosEm.title3, themeDark.styles.textOnMain]}
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
