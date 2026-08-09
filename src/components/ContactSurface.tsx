import { contactHoverableDataSet, contactHoverDataSet } from "@/components/ContactPageStyles";
import { glassDataSet } from "@/components/GlassFallbackStyles";
import { alpha, useTheme } from "@/styles";
import { ReactNode } from "react";
import { StyleProp, View, ViewStyle } from "react-native";

/**
 * An overlay covering the *border box* of its parent, not its padding box -
 * `inset: 0` would land inside the parent's 1px border and draw a second one
 * next to it.
 */
const overlayFill = {
  position: "absolute",
  top: -1,
  right: -1,
  bottom: -1,
  left: -1,
  pointerEvents: "none",
} as const;

/**
 * The card material of /contact: the site's glass, plus the channel colour.
 *
 * The glass rule paints `background-color`, `border-color` and `box-shadow`
 * with `!important` (it has to: it keys off the colour-scheme class on `<html>`,
 * which an inline style cannot read). So the channel colour is never a
 * background *of* the surface - it is painted as its own layer inside it. Which
 * turns out to be what the hover wants anyway: one node whose opacity animates,
 * rather than two colours cross-fading.
 *
 * The inline background and border below are the fallback for browsers without
 * `backdrop-filter`, where the glass rule never applies.
 */
export default function ContactSurface({
  color,
  borderRadius,
  resting = false,
  style,
  children,
}: {
  /** Channel colour, used for the resting tint (if any) and for the hover. */
  color: string;
  borderRadius: number;
  /** Tint the surface at rest, the way the vCard and LinkedIn cards do. */
  resting?: boolean;
  style?: StyleProp<ViewStyle>;
  children: ReactNode;
}) {
  const theme = useTheme();
  return (
    <View
      dataSet={{ ...glassDataSet, ...contactHoverableDataSet }}
      style={[
        {
          position: "relative",
          borderRadius,
          borderWidth: 1,
          borderColor: theme.dynamicColors.ultraLight,
          backgroundColor: theme.dynamicColors.backOnAlt,
        },
        style,
      ]}
    >
      {!resting ? null : (
        <View
          style={[
            overlayFill,
            {
              borderRadius,
              borderWidth: 1,
              borderColor: alpha(color, 0.32),
              backgroundColor: alpha(color, 0.07),
            },
          ]}
        />
      )}
      <View
        dataSet={contactHoverDataSet}
        style={[
          overlayFill,
          {
            borderRadius,
            borderWidth: 1,
            borderColor: alpha(color, 0.5),
            backgroundColor: alpha(color, 0.12),
          },
        ]}
      />
      {children}
    </View>
  );
}
