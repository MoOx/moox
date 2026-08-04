import { StyleProp, Text, TextStyle } from "react-native";
import tinycolor from "tinycolor2";

export type GradientStop = { offset: number; color: string }; // offset in 0..1

/** Solid color interpolated at position t (0..1) along the stops. */
const colorAt = (stops: GradientStop[], t: number): string => {
  const first = stops[0];
  const last = stops[stops.length - 1];
  if (!first || !last) return "#000000";
  if (t <= first.offset) return first.color;
  if (t >= last.offset) return last.color;
  for (let i = 0; i < stops.length - 1; i++) {
    const a = stops[i];
    const b = stops[i + 1];
    if (a && b && t >= a.offset && t <= b.offset) {
      const span = b.offset - a.offset;
      const local = span === 0 ? 0 : (t - a.offset) / span;
      return tinycolor.mix(a.color, b.color, local * 100).toHexString();
    }
  }
  return last.color;
};

/**
 * Gradient text that survives PDF export, reliably, everywhere.
 *
 * Instead of `background-clip: text` (blank in Safari print / macOS Preview) or
 * SVG text (unreliable in Chrome's page.pdf), it renders each character as a
 * plain solid-colored <Text>, with the color interpolated pro-rata along the
 * gradient. Plain solid text → renders in every engine, wraps naturally, and
 * stays selectable/extractable.
 *
 * The gradient is quantized per character (not continuous within a glyph),
 * which is imperceptible for headings.
 */
export default function GradientText({
  children,
  stops,
  style,
}: {
  children: string;
  stops: GradientStop[];
  style?: StyleProp<TextStyle>;
}) {
  const chars = Array.from(children);
  const denom = Math.max(1, chars.length - 1);
  return (
    <Text style={style}>
      {chars.map((c, i) => (
        <Text key={`${i}-${c}`} style={{ color: colorAt(stops, i / denom) }}>
          {c}
        </Text>
      ))}
    </Text>
  );
}
