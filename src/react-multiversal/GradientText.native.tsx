import GradientLinear from "@/react-multiversal/GradientLinear";
import GradientTextByLetter from "@/react-multiversal/GradientTextByLetter";
import { GradientTextProps } from "@/react-multiversal/GradientText.types";
import MaskedView from "@react-native-masked-view/masked-view";
import { StyleSheet, Text, View } from "react-native";

/**
 * Paints the glyphs with a gradient instead of a flat color.
 *
 * There is no `background-clip: text` on a device, so the text is used as a
 * mask over a gradient. Note the direction: the whole `<Text>` goes *inside*
 * `maskElement`, rather than a `<MaskedView>` being dropped inside the text.
 * That is what keeps line breaking, ellipsizing and font metrics entirely
 * native.
 *
 * Two rules the types cannot enforce, both of which follow from this being a
 * `<View>`:
 *
 * - It cannot sit inside a plain `<Text>`: a view in a text flow needs an
 *   explicit size, aligns on its box rather than the baseline, and cannot break
 *   across two lines. Give it its own `TextRow` instead.
 * - Two gradients on one line are two siblings in that `TextRow`, never one
 *   nested in the other. A gradient is painted over the box of the node that
 *   carries it, so a nested segment would be handed a ramp stretched across the
 *   whole line and show only the slice sitting behind its own word - which is
 *   not what `background-clip: text` does on web, where every node paints over
 *   its own box.
 */

/** Opaque ink: MaskedView keeps the pixels the mask paints, by alpha. */
const ink = "#000000";

/**
 * `angle` is stated in CSS degrees, because the web half hands it straight to
 * `linear-gradient()`. `GradientLinear` measures from the other quarter turn:
 * its own 0 runs left to right, where CSS' 0 runs bottom to top. Skip this and
 * every gradient lands 90 degrees off the one the site paints.
 */
const cssAngleToSvg = (angle: number) => angle - 90;

export default function GradientText(props: GradientTextProps) {
  const { stops, angle = 90, style, letter, children, ...rest } = props;

  if (letter) {
    return (
      <GradientTextByLetter stops={stops} style={style} {...rest}>
        {children}
      </GradientTextByLetter>
    );
  }

  return (
    <View style={{ alignSelf: "flex-start" }}>
      {/* Sizes the box, and is the copy screen readers see. */}
      <Text style={[style, { opacity: 0 }]} {...rest}>
        {children}
      </Text>
      <MaskedView
        style={StyleSheet.absoluteFill}
        maskElement={<Text style={[style, { color: ink }]}>{children}</Text>}
      >
        <GradientLinear stops={stops} angle={cssAngleToSvg(angle)} />
      </MaskedView>
    </View>
  );
}
