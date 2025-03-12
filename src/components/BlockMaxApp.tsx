"use client";

import Clipboard from "@react-native-clipboard/clipboard";
import * as React from "react";
import {
  Pressable,
  StyleProp,
  StyleSheet,
  Text,
  View,
  ViewStyle,
} from "react-native";
import Animated from "react-native-reanimated";

import { ResumeItem } from "@/api";
import { alpha, boxShadow, colors, useTheme } from "@/app/styles";
import AvailabilityBadge from "@/components/AvailabilityBadge";
import ButtonView from "@/components/ButtonView";
import DeviceiPhoneDynamicIsland from "@/components/DeviceIphoneDynamicIsland";
import LinkButton from "@/components/LinkButton";
import { ResumeTimelineEntry } from "@/components/ResumeTimelineEntry";
import { WebsiteMobileMenuLinks } from "@/components/WebsiteMobileMenu";
import {
  sendStringAsMailString,
  socialLinks,
  socialLinks2,
  socials,
} from "@/consts";
import Avatar from "@/react-multiversal/Avatar";
import { fontStyles } from "@/react-multiversal/font";
import LinkView from "@/react-multiversal/LinkView";
import SpacedView from "@/react-multiversal/SpacedView";
import Spacer from "@/react-multiversal/Spacer";
import SVGChevronRight from "@/svgs/components/SVGChevronRight";
import SVGEmail from "@/svgs/components/SVGEmail";

const useCurrentTime = () => {
  const [time, setTime] = React.useState<string>(
    new Date().toLocaleTimeString("en-US", {
      hour12: false,
      hour: "2-digit",
      minute: "2-digit",
    })
  );

  React.useEffect(() => {
    const timer = setInterval(() => {
      setTime(
        new Date().toLocaleTimeString("en-US", {
          hour12: false,
          hour: "2-digit",
          minute: "2-digit",
        })
      );
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return time;
};

export default function BlockMaxApp({
  style,
  resumeEntry,
  width = 360,
}: {
  style?: StyleProp<ViewStyle>;
  resumeEntry?: ResumeItem;
  width?: number;
}) {
  const theme = useTheme();
  const time = useCurrentTime();
  const [copied, setCopied] = React.useState(false);
  return (
    <DeviceiPhoneDynamicIsland
      width={width}
      backgroundColor={theme.dynamicColors.backAlt}
      style={[
        style,
        // { transform: [{ rotate: "-2deg" }] }
      ]}
    >
      <SpacedView
        horizontal="xl"
        vertical="m"
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 1,
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <Text
          style={[fontStyles.iosEm.footnote, theme.styles.text]}
          suppressHydrationWarning={true}
        >
          {time}
        </Text>
        <Text style={[fontStyles.iosEm.footnote, theme.styles.text]}>
          {"Max Pro"}
        </Text>
      </SpacedView>
      <Spacer size="xl" />
      <Spacer size="xxs" />
      <SpacedView horizontal="s" vertical="s">
        <SpacedView
          horizontal="m"
          vertical="m"
          style={[
            theme.styles.backOnAlt,
            {
              boxShadow: boxShadow.default,
              borderRadius: 16,
              borderWidth: 1,
              borderColor: "rgba(0, 0, 0, 0.1)",
            },
          ]}
        >
          <SpacedView
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <View
                style={{
                  width: 6,
                  height: 6,
                  borderRadius: 6,
                  backgroundColor: theme.dynamicColors.textLight2,
                }}
              />
              <Spacer size="xxs" />
              <Text style={[fontStyles.iosEm.body, theme.styles.textLight1]}>
                {"Developer"}
              </Text>
            </View>
            <LinkView href="/contact">
              <AvailabilityBadge showText={true} />
            </LinkView>
          </SpacedView>
          <Spacer size="m" />
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <View style={{ flex: 1 }}>
              <Text style={[fontStyles.iosEm.title2, theme.styles.text]}>
                {"@MoOx"}
              </Text>
              <Text style={[fontStyles.ios.footnote, theme.styles.textLight1]}>
                {"Freelance Front-end Developer for Web and Mobile apps."}
              </Text>
            </View>
            <Avatar
              size={64}
              borderWidth={8}
              borderColor={"rgba(0, 0, 0, 0.05)"}
            />
          </View>
          <Spacer />
          <View style={{ flexDirection: "row" }}>
            <LinkButton href="/contact" horizontalSpace="s" verticalSpace="xxs">
              {(textStyles) => (
                <>
                  <SVGChevronRight
                    width={12}
                    height={12}
                    fill={textStyles.color}
                    style={{ opacity: 0.4 }}
                  />
                  <Spacer size="xxs" />
                  <Text style={[textStyles, fontStyles.iosEm.caption1]}>
                    {"Hire Me"}
                  </Text>
                </>
              )}
            </LinkButton>
            <Spacer size="s" />
            <Pressable
              onPress={() => {
                Clipboard.setString(sendStringAsMailString(socials.send));
                setCopied(true);
                setTimeout(() => {
                  setCopied(false);
                }, 1500);
              }}
            >
              <ButtonView
                horizontalSpace="s"
                verticalSpace="xxs"
                mode="outline"
              >
                {(textStyles) => (
                  <>
                    <SVGEmail
                      width={14}
                      height={14}
                      fill={textStyles.color}
                      style={{ opacity: 0.2 }}
                    />
                    <Spacer size={6} />
                    <View>
                      <Animated.Text
                        style={[
                          textStyles,
                          fontStyles.iosEm.caption1,
                          {
                            transitionDuration: "250ms",
                            transitionTimingFunction: "ease-in-out",
                          },
                          copied
                            ? { opacity: 0, transform: [{ translateX: -6 }] }
                            : {},
                        ]}
                      >
                        {"Copy Email"}
                      </Animated.Text>
                      <Animated.Text
                        style={[
                          StyleSheet.absoluteFill,
                          textStyles,
                          fontStyles.iosEm.caption1,
                          {
                            textAlign: "center",
                            transitionDuration: "250ms",
                            transitionTimingFunction: "ease-in-out",
                          },
                          copied
                            ? { opacity: 0.75 }
                            : { opacity: 0, transform: [{ translateX: 10 }] },
                        ]}
                      >
                        {"Copied !"}
                      </Animated.Text>
                    </View>
                  </>
                )}
              </ButtonView>
            </Pressable>
          </View>
          <Spacer size="m" />
          <SpacedView
            horizontal="s"
            vertical="s"
            gap="s"
            style={[theme.styles.backAlt, { borderRadius: 12 }]}
          >
            <Text style={[fontStyles.iosEm.subhead, theme.styles.text]}>
              {"Follow me"}
            </Text>
            <SpacedView
              style={{
                flexDirection: "row",
                flexWrap: "wrap",
                justifyContent: "space-between",
              }}
            >
              {Object.values(socialLinks)
                .concat(Object.values(socialLinks2))
                .map(({ alt, href, icon }) => (
                  // <TooltipOnFocus
                  //   key={href}
                  //   arrowSize={4}
                  //   tooltip={
                  //     <SpacedView horizontal="xs" vertical="xxs">
                  //       <Text
                  //         style={[fontStyles.iosEm.caption2, themeDark.styles.text]}
                  //       >
                  //         {title}
                  //       </Text>
                  //     </SpacedView>
                  //   }
                  // >
                  <LinkButton
                    key={href}
                    aria-label={alt}
                    mode="outline"
                    horizontalSpace="xs"
                    verticalSpace="xs"
                    href={href}
                    style={theme.styles.back}
                  >
                    {(styles) =>
                      icon({
                        size: 16,
                        color: styles.color,
                      })
                    }
                  </LinkButton>
                  // </TooltipOnFocus>
                ))}
            </SpacedView>
          </SpacedView>
        </SpacedView>
        <Spacer size="s" />
        {!resumeEntry ? null : (
          <LinkView href={"/resume/#" + resumeEntry.slug}>
            <Text style={[fontStyles.iosEm.headline, theme.styles.text]}>
              {"Latest Crazy Project"}
            </Text>
            <Spacer size="s" />
            <View style={{ flexDirection: "row" }}>
              <ResumeTimelineEntry
                item={resumeEntry}
                horizontal="m"
                vertical="m"
                showDetails={false}
                disableLinks={true}
              />
            </View>
          </LinkView>
        )}
      </SpacedView>
      <SpacedView
        dataSet={{ "website-footer-backdrop": "true" }}
        horizontal="m"
        vertical="xxs"
        style={{
          zIndex: 1,
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          borderTopWidth: 0.5,
          borderStyle: "solid",
          borderColor: alpha(colors.black, 0.1),
          backgroundColor: theme.dynamicColors.back,
          boxShadow: boxShadow.default,
        }}
      >
        <SpacedView
          horizontal="m"
          style={{
            flexDirection: "row",
            flexWrap: "wrap",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <WebsiteMobileMenuLinks />
        </SpacedView>
        <Spacer size="m" />
      </SpacedView>
    </DeviceiPhoneDynamicIsland>
  );
}
