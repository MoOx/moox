import { differenceInCalendarMonths } from "date-fns";
import Image from "next/image";
import React from "react";
import { StyleSheet, Text, View } from "react-native";

import { ResumeItem } from "@/api";
import { boxShadows, useTheme } from "@/app/styles";
import { size, Size } from "@/react-multiversal";
import { fontStyles } from "@/react-multiversal/font";
import { boxShadowGlass } from "@/react-multiversal/GlassView";
import LinkText from "@/react-multiversal/LinkText";
import SpacedView from "@/react-multiversal/SpacedView";
import Spacer from "@/react-multiversal/Spacer";
import SVGExternalLink from "@/svgs/components/SVGExternalLink";

const borderRadius = size("s");

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    flexShrink: 1,
  },
  imageWrapper: {
    overflow: "hidden",
    borderTopLeftRadius: borderRadius,
    borderTopRightRadius: borderRadius,
  },
  company: {
    textAlign: "right",
    fontStyle: "italic",
  },
  description: {
    flexShrink: 1,
    overflow: "hidden",
  },
  links: {
    flex: 1,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "flex-end",
    alignItems: "center",
  },
  link: {
    display: "flex",
    justifyContent: "center",
    alignItems: "flex-end",
  },
  tags: {
    // flex: 1,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "flex-end",
  },
});

const getDurationText = (startDate: string, endDate: Date) => {
  const durationInMonths = Math.floor(
    differenceInCalendarMonths(endDate, new Date(startDate))
  );
  const durationYears = Math.floor(durationInMonths / 12);
  const durationMonths = durationInMonths % 12;

  const yearText =
    durationYears === 0
      ? ""
      : durationYears === 1
        ? "1 year"
        : `${durationYears} years`;

  const monthText =
    durationMonths === 0
      ? ""
      : durationMonths === 1
        ? "1 month"
        : `${durationMonths} months`;

  return yearText ? yearText + " " + monthText : monthText;
};

export const ResumeTimelineEntry = ({
  item,
  horizontal = "l",
  vertical = "l",
  showDetails = true,
  disableLinks = false,
}: {
  item: ResumeItem;
  horizontal?: Size;
  vertical?: Size;
  showDetails?: boolean;
  disableLinks?: boolean;
}) => {
  const theme = useTheme();

  return (
    <View
      style={[
        theme.styles.backOnAlt,
        {
          borderRadius,
          flexShrink: 1,
          flexBasis: 480,
          boxShadow: boxShadows.default,
        },
      ]}
    >
      {disableLinks ? null : (
        <a id={item.slug} style={{ position: "relative", top: "-100px" }} />
      )}
      {item.image && (
        <View style={styles.imageWrapper}>
          <Image
            src={item.image}
            style={{
              width: "100%",
              height: "auto",
            }}
            width={2160}
            height={3840}
            priority={true}
            alt={""}
          />
        </View>
      )}
      <View
        style={[
          StyleSheet.absoluteFill,
          { borderRadius, boxShadow: boxShadowGlass() },
        ]}
      />
      <SpacedView
        style={{ flexGrow: 1 }}
        horizontal={horizontal}
        vertical={vertical}
      >
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            // alignItems: "flex-start",
          }}
        >
          <Text style={[fontStyles.iosEm.subhead, theme.styles.textLight2]}>
            {item.title.toUpperCase()}
          </Text>
          {item.url && !disableLinks ? (
            <LinkText
              underlineOnFocus={true}
              href={item.url}
              style={[styles.company, theme.styles.textLight1]}
            >
              {item.company ?? ""}
            </LinkText>
          ) : (
            <Text style={[styles.company, theme.styles.textLight1]}>
              {item.company ?? ""}
            </Text>
          )}
        </View>
        <Text
          style={[
            styles.description,
            fontStyles.iosEm.title2,
            theme.styles.text,
          ]}
        >
          {item.description ?? null}
        </Text>
        {item.dateEnd ? (
          <>
            <Text style={[fontStyles.ios.footnote, theme.styles.textLight2]}>
              {getDurationText(item.dateStart, new Date(item.dateEnd))}
            </Text>
          </>
        ) : (
          <>
            <Spacer size="xxs" />
            <Text style={[fontStyles.ios.footnote, theme.styles.textLight2]}>
              {item.wip
                ? "Work in Progress"
                : `${getDurationText(item.dateStart, new Date())} and counting`}
            </Text>
          </>
        )}
        {!showDetails ? null : (
          <>
            <Spacer size="l" />
            <View style={styles.tags}>
              {item.hashtags.map((tag) => (
                <Text
                  key={tag}
                  style={[fontStyles.ios.footnote, theme.styles.textLight1]}
                >{` #${tag.replace(/[^a-zA-Z0-9]/g, "")}`}</Text>
              ))}
            </View>
            {!disableLinks && item.links && item.links.length > 0 && (
              <>
                <Spacer size="xxs" />
                <SpacedView gap="xxs" style={styles.links}>
                  <SVGExternalLink
                    width={12}
                    height={12}
                    fill={theme.dynamicColors.textMain}
                  />
                  {item.links.map((link) => (
                    <LinkText
                      key={link.title}
                      underline={true}
                      href={link.url}
                      style={[
                        styles.link,
                        fontStyles.ios.footnote,
                        theme.styles.textMain,
                      ]}
                    >
                      {link.title}
                    </LinkText>
                  ))}
                </SpacedView>
              </>
            )}
          </>
        )}
      </SpacedView>
    </View>
  );
};
