import { colorAt, GradientStop } from "@/react-multiversal/gradient";
import { StyleProp, Text, TextProps, TextStyle } from "react-native";

/**
 * Gradient text that survives PDF export, reliably, everywhere.
 *
 * Instead of `background-clip: text` (blank in Safari print and macOS Preview)
 * or SVG text (unreliable in Chrome's `page.pdf`), it renders each character as
 * a plain solid-colored <Text>, with the color interpolated pro-rata along the
 * gradient. Plain solid text renders in every engine, wraps naturally, and
 * stays selectable and extractable, which is what an ATS reads.
 *
 * The gradient is quantized per character rather than continuous within a
 * glyph, which is imperceptible for headings. Kerning pairs do not apply across
 * element boundaries, so the text sets a hair wider than it would as one run.
 * Line breaking is unaffected: inline elements create no break opportunity.
 */
export default function GradientTextByLetter({
  children,
  stops,
  style,
  ...rest
}: Omit<TextProps, "children" | "style"> & {
  children: string;
  stops: GradientStop[];
  style?: StyleProp<TextStyle>;
}) {
  const chars = Array.from(children);
  const denom = Math.max(1, chars.length - 1);
  return (
    <Text style={style} {...rest}>
      {chars.map((c, i) => (
        <Text key={`${i}-${c}`} style={{ color: colorAt(stops, (i / denom) * 100) }}>
          {c}
        </Text>
      ))}
    </Text>
  );
}
