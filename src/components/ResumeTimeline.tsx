"use client";

import React from "react";
import { StyleSheet, Text, View } from "react-native";

import { ResumeItem } from "@/api";
import { alpha, colors, useTheme } from "@/app/styles";
import { ResumeTimelineEntry } from "@/components/ResumeTimelineEntry";
import { fontStyles } from "@/react-multiversal/font";
import Spacer from "@/react-multiversal/Spacer";

const styles = StyleSheet.create({
  item: {
    flexGrow: 1,
    flexShrink: 1,
    flexDirection: "row",
  },
});

export const ResumeTimeline = ({ items }: { items: ResumeItem[] }) => {
  const theme = useTheme();
  const todayDateOnlyAsISOString = new Date().toISOString().slice(0, 10);

  items.sort((a, b) => {
    const aDate = (a.dateEnd || todayDateOnlyAsISOString).slice(0, 10);
    const bDate = (b.dateEnd || todayDateOnlyAsISOString).slice(0, 10);

    if (aDate < bDate) {
      return 1;
    } else if (aDate > bDate) {
      return -1;
    }
    return 0;
  });

  const latestYear = React.useRef(String(new Date().getFullYear() + 1));

  return (
    <>
      <View
        style={{
          position: "absolute",
          top: 140,
          bottom: 80,
          width: 2,
          left: "50%",
          backgroundColor: alpha(colors.black, 0.05),
        }}
      />
      {items.map((item, i) => {
        const year = (item.dateEnd || todayDateOnlyAsISOString).slice(0, 4);
        const newYear = year !== latestYear.current;
        latestYear.current = year;

        return (
          <React.Fragment key={item.slug}>
            {newYear ? (
              <View role="heading" aria-level={3}>
                <Text style={[fontStyles.iosEm.title1, theme.styles.text]}>
                  {year}
                </Text>
                <Spacer size="l" />
              </View>
            ) : null}
            <View
              style={[
                styles.item,
                { justifyContent: i % 2 === 0 ? "flex-start" : "flex-end" },
              ]}
            >
              {i % 2 === 1 ? <Spacer size="xl" /> : null}
              <ResumeTimelineEntry item={item} />
              {i % 2 === 0 ? <Spacer size="xl" /> : null}
            </View>
            <Spacer size="l" />
          </React.Fragment>
        );
      })}
    </>
  );
};
