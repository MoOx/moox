import { useT } from "@/i18n";
import { jobSubtitle, jobTitleParts } from "@/profile";
import { fontStyles, weight } from "@/react-multiversal/font";
import GradientText from "@/react-multiversal/GradientText";
import TextRow from "@/react-multiversal/TextRow";
import { gradientFlashyStops, gradientText, useTheme } from "@/styles";
import { Platform, StyleProp, Text, TextStyle, View } from "react-native";

/**
 * Fluid hero size: 34px on a phone, 48px from ~1440px up, interpolated in
 * between. A CSS function in an inline style, which is what react-native-web
 * writes anyway - so no stylesheet rule, no `!important`, and above all **one
 * node**: the two `IfWindowWidthIs` variants this replaces both sat in the
 * HTML, so the <h1> carried the job title twice.
 */
const fluidTitleSize = {
  fontSize: "clamp(34px, 1.3vw + 29px, 48px)" as unknown as number,
  // Unitless, so it follows the fluid font size; the type says px.
  lineHeight: "1.2" as unknown as number,
};

/**
 * The job title as the site displays it: a muted `prefix` line, then the
 * `highlight` in the flashy gradient and the `rest` in the dark one, with the
 * subtitle right-aligned underneath. One component for the home hero and the
 * social-preview image, so the two cannot show different words or colours.
 */
export default function JobTitleHeading({
  // CSS functions only mean something to a browser: on a device a `clamp()`
  // string is not a font size, so native keeps the type scale's own.
  titleSize = Platform.OS === "web" ? fluidTitleSize : undefined,
  prefixStyle,
  subtitleStyle,
  viewTransitionName,
  headingLevel = 1,
}: {
  /** Fluid by default on the web (the page); a fixed size for a fixed frame (the image). */
  titleSize?: { fontSize: number; lineHeight: number };
  prefixStyle?: StyleProp<TextStyle>;
  subtitleStyle?: StyleProp<TextStyle>;
  viewTransitionName?: string;
  headingLevel?: number;
}) {
  const theme = useTheme();
  const t = useT();
  const [prefix, highlight, rest] = t(jobTitleParts);
  const titleStyle = [
    fontStyles.iosEm.largeTitle,
    theme.styles.text,
    { fontWeight: weight.black },
    titleSize,
  ];
  return (
    <View>
      <View style={{ alignSelf: "flex-start" }} role="heading" aria-level={headingLevel}>
        {/* Trailing space: the parts are stacked blocks, so without it a text
            extractor reads "SeniorSoftware Engineer.". The French title has no
            prefix, so the muted line is not rendered at all rather than left
            as an empty block with a line's height. */}
        {prefix ? (
          <Text style={[fontStyles.ios.title1, theme.styles.textLight1, prefixStyle]}>
            {`${prefix} `}
          </Text>
        ) : null}
        {/* The highlight carries the flashy gradient: it is the term clients
            search for, so it is the one the eye should catch. Two siblings
            rather than one nested inside the other: a gradient is painted over
            the box of the node that carries it, so nesting would stretch the
            flashy ramp across the whole title and only show its first half
            over the word. `TextRow` keeps them on one line on both platforms
            (on a device a `GradientText` masks through a view and cannot sit
            in a text run). */}
        <TextRow>
          {/* The view transition name lives on this half alone: two elements
              may not share one. */}
          <GradientText
            stops={gradientFlashyStops(theme)}
            angle={176}
            style={[
              titleStyle,
              viewTransitionName ? { viewTransitionName } : null,
            ]}
          >
            {highlight}
          </GradientText>
          <GradientText stops={gradientText(theme)} angle={176} style={titleStyle}>
            {rest ? ` ${rest}.` : "."}
          </GradientText>
        </TextRow>
      </View>
      <Text
        style={[
          fontStyles.ios.headline,
          theme.styles.textLight1,
          {
            fontWeight: weight.regular,
            fontStyle: "italic",
            textAlign: "right",
          },
          subtitleStyle,
        ]}
      >
        {t(jobSubtitle)}
      </Text>
    </View>
  );
}
