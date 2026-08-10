import { ResumeItem } from "@/api";
import AvailabilityBadge from "@/components/AvailabilityBadge";
import ButtonView from "@/components/ButtonView";
import DeviceiPhoneDynamicIsland from "@/components/DeviceIphoneDynamicIsland";
import LinkButton from "@/components/LinkButton";
import { ResumeTimelineEntry } from "@/components/ResumeTimelineEntry";
import {
  WebsiteMobileMenuLinks,
  WebsiteMobileMenuLinksContainer,
} from "@/components/WebsiteMobileMenu";
import {
  sendStringAsMailString,
  socialLinks,
  socialLinks2,
  socials,
} from "@/consts";
import { useHref, useT } from "@/i18n";
import { jobTitle } from "@/profile";
import Avatar from "@/react-multiversal/Avatar";
import { setClipboardString } from "@/react-multiversal/clipboard";
import { fontStyles } from "@/react-multiversal/font";
import LinkView from "@/react-multiversal/LinkView";
import SpacedView from "@/react-multiversal/SpacedView";
import Spacer from "@/react-multiversal/Spacer";
import { boxShadows, useTheme } from "@/styles";
import SVGChevronRight from "@/svgs/components/SVGChevronRight";
import SVGEnvelopeFill from "@/svgs/components/SVGEnvelopeFill";
import { useEffect, useState } from "react";
import {
  Pressable,
  StyleProp,
  StyleSheet,
  Text,
  View,
  ViewStyle,
} from "react-native";
import Animated from "react-native-reanimated";

const useCurrentTime = () => {
  const [time, setTime] = useState<string>(
    new Date().toLocaleTimeString("en-US", {
      hour12: false,
      hour: "2-digit",
      minute: "2-digit",
    }),
  );

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(
        new Date().toLocaleTimeString("en-US", {
          hour12: false,
          hour: "2-digit",
          minute: "2-digit",
        }),
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
  const t = useT();
  const localizeHref = useHref();
  const time = useCurrentTime();
  const [copied, setCopied] = useState(false);
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
              boxShadow: boxShadows.default,
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
                {t({ en: "Developer", fr: "Développeur" })}
              </Text>
            </View>
            <AvailabilityBadge showText={true} />
          </SpacedView>
          <Spacer size="m" />
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
            }}
            role="heading"
            aria-level={2}
          >
            <View style={{ flex: 1 }}>
              <Text style={[fontStyles.iosEm.title2, theme.styles.text]}>
                {"@MoOx"}
              </Text>
              <Text style={[fontStyles.ios.footnote, theme.styles.textLight1]}>
                {t({
                  en: `${jobTitle} for web & mobile apps.`,
                  fr: `${jobTitle} pour applications web & mobiles.`,
                })}
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
            <LinkButton
              href={localizeHref("/contact/")}
              spaceHorizontal="s"
              spaceVertical="xxs"
              spaceGap={"xxs"}
              effect="subtle"
            >
              {(textStyles) => (
                <>
                  <SVGChevronRight
                    width={12}
                    height={12}
                    fill={textStyles.color}
                    style={{ opacity: 0.4 }}
                  />
                  <Text style={[textStyles, fontStyles.iosEm.caption1]}>
                    {t({ en: "Hire Me", fr: "Me contacter" })}
                  </Text>
                </>
              )}
            </LinkButton>
            <Spacer size="s" />
            <Pressable
              onPress={async () => {
                // Only confirm what actually happened: the address is nowhere
                // else in this block, so a "Copied" over an empty clipboard
                // would leave nothing to paste and no way to know.
                if (
                  !(await setClipboardString(
                    sendStringAsMailString(socials.send.value),
                  ))
                )
                  return;
                setCopied(true);
                setTimeout(() => {
                  setCopied(false);
                }, 1500);
              }}
            >
              <ButtonView
                spaceHorizontal="s"
                spaceVertical="xxs"
                spaceGap={6}
                mode="outline"
                effect="subtle"
              >
                {(textStyles) => (
                  <>
                    <SVGEnvelopeFill
                      width={14}
                      height={14}
                      fill={textStyles.color}
                      style={{ opacity: 0.2 }}
                    />
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
                        {t({ en: "Copy Email", fr: "Copier l'e-mail" })}
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
                        {t({ en: "Copied !", fr: "Copié !" })}
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
              {t({ en: "Follow me", fr: "Me suivre" })}
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
                    spaceHorizontal="xs"
                    spaceVertical="xs"
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
              {t({
                en: "Latest Crazy Project",
                fr: "Dernier projet un peu fou",
              })}
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
        horizontal="xxs"
        vertical="xs"
        style={{
          zIndex: 1,
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
        }}
      >
        <WebsiteMobileMenuLinksContainer>
          <WebsiteMobileMenuLinks />
        </WebsiteMobileMenuLinksContainer>
      </SpacedView>
    </DeviceiPhoneDynamicIsland>
  );
}
