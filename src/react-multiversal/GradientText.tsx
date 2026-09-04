import { GradientStop } from "@/react-multiversal/gradient";
import GradientTextByLetter from "@/react-multiversal/GradientTextByLetter";
import { GradientTextProps } from "@/react-multiversal/GradientText.types";
import { Text, TextStyle } from "react-native";

/**
 * Paints the glyphs with a gradient instead of a flat color.
 *
 * On web that is `background-clip: text` over a transparent fill: one paint, no
 * layer, no measurement, and the text stays real text. It needs both the
 * prefixed and the unprefixed property, which together cover every engine
 * caniuse tracks (Safari only dropped the prefix requirement in 15.5).
 *
 * `background-clip: text` is dropped when printing, though, and Safari then
 * paints nothing at all: pass `letter` for anything the PDF export renders.
 */
export const gradientTextStyle = (stops: GradientStop[], angle: number): TextStyle => ({
  alignSelf: "flex-start",
  backgroundClip: "text",
  WebkitBackgroundClip: "text",
  WebkitTextFillColor: "transparent",
  backgroundImage: `linear-gradient(${angle}deg, ${stops
    .map((s) => `${s.color} ${s.offset}%`)
    .join(", ")})`,
  printColorAdjust: "exact",
});

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
    <Text style={[style, gradientTextStyle(stops, angle)]} {...rest}>
      {children}
    </Text>
  );
}
