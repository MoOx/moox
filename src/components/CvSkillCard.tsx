import { size } from "@/react-multiversal";
import { fontStyles, weight } from "@/react-multiversal/font";
import GradientLinear from "@/react-multiversal/GradientLinear";
import SpacedView from "@/react-multiversal/SpacedView";
import { alpha, colors } from "@/styles";
import { ComponentType } from "react";
import { StyleProp, StyleSheet, Text, View, ViewStyle } from "react-native";

export type CvSkillCardIcon = ComponentType<{
  width?: number;
  height?: number;
  fill?: string;
}>;

/**
 * Dark gradient card of the CV skills mosaic: title, optional lead-in, then the
 * domain items. The tech logo sits behind as a faded watermark.
 */
export default function CvSkillCard({
  title,
  subtitle,
  items,
  Icon,
  gradient,
  big = false,
  style,
}: {
  title: string;
  subtitle?: string;
  items: string[];
  Icon?: CvSkillCardIcon;
  /** [from, to] - dark brand colors, angled like the site's cards. */
  gradient: [string, string];
  /** Hero card of the mosaic: bigger title, items on their own lines. */
  big?: boolean;
  style?: StyleProp<ViewStyle>;
}) {
  return (
    <View
      style={[
        {
          borderRadius: size("s"),
          overflow: "hidden",
          flexGrow: 1,
          flexShrink: 1,
        },
        style,
      ]}
    >
      <GradientLinear
        angle={60}
        stops={[
          { offset: 10, stopColor: gradient[0] },
          { offset: 100, stopColor: gradient[1] },
        ]}
        style={StyleSheet.absoluteFill}
      />

      {Icon ? (
        // The small cards carry brand logos - round, symmetrical, they read
        // fine bled off the corner. The feature card carries a composition
        // glyph whose meaning *is* the arrangement of its three shapes, so it
        // has to stay whole: barely any bleed, and bigger to compensate.
        <View
          style={{
            position: "absolute",
            right: -22,
            bottom: -22,
            opacity: 0.1,
          }}
        >
          <Icon
            width={big ? 190 : 100}
            height={big ? 190 : 100}
            fill={colors.white}
          />
        </View>
      ) : null}

      <SpacedView
        horizontal={big ? "l" : "m"}
        vertical={big ? "l" : "m"}
        gap={big ? "l" : "xs"}
      >
        <View>
          {/* The whole feature card moves up one step together: its items are
              a `callout` where the small cards use `footnote`, so title and
              lead-in follow. Bumping the items alone flattened the hierarchy -
              the lead-in ended up four points under the list it introduces. */}
          <Text
            style={[
              big ? fontStyles.iosEm.title2 : fontStyles.iosEm.subhead,
              { color: colors.white, fontWeight: weight.bold },
            ]}
          >
            {title}
          </Text>
          {subtitle ? (
            <Text
              style={[
                big ? fontStyles.iosEm.subhead : fontStyles.ios.caption1,
                { color: alpha(colors.white, 0.62) },
              ]}
            >
              {subtitle}
            </Text>
          ) : null}
        </View>
        <Text
          style={[
            big ? fontStyles.ios.callout : fontStyles.ios.footnote,
            { color: alpha(colors.white, 0.85) },
          ]}
        >
          {items.join(big ? "\n" : " · ")}
        </Text>
      </SpacedView>
    </View>
  );
}
