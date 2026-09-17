import { useT } from "@/i18n";
import { jobSubtitle, jobTitleParts } from "@/profile";
import { fontStyles, weight } from "@/react-multiversal/font";
import { gradientTextFlashyStyles, gradientTextStyles, useTheme } from "@/styles";
import { StyleProp, Text, TextStyle, View } from "react-native";

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
  titleSize = fluidTitleSize,
  prefixStyle,
  subtitleStyle,
  viewTransitionName,
  headingLevel = 1,
}: {
  /** Fluid by default (the page); a fixed size for a fixed frame (the image). */
  titleSize?: { fontSize: number; lineHeight: number };
  prefixStyle?: StyleProp<TextStyle>;
  subtitleStyle?: StyleProp<TextStyle>;
  viewTransitionName?: string;
  headingLevel?: number;
}) {
  const theme = useTheme();
  const t = useT();
  const [prefix, highlight, rest] = t(jobTitleParts);
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
            search for, so it is the one the eye should catch. */}
        <Text
          style={[
            fontStyles.iosEm.largeTitle,
            theme.styles.text,
            gradientTextStyles(theme, 176),
            {
              fontWeight: weight.black,
              ...(viewTransitionName ? { viewTransitionName } : {}),
              ...titleSize,
            },
          ]}
        >
          <Text style={[theme.styles.text, gradientTextFlashyStyles(theme, 176)]}>
            {highlight}
          </Text>
          {rest ? ` ${rest}.` : "."}
        </Text>
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
