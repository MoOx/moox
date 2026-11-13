import tinycolor from "tinycolor2";

/**
 * One gradient vocabulary for the whole project: linear, radial, and text.
 *
 * A stop is `{ offset, color }`, and its transparency lives inside `color`.
 * SVG carries `stop-opacity` as a separate property because SVG 1.1 borrows
 * CSS2's color model, which has no alpha channel: `rgba()` only lands with CSS
 * Color Level 3. That stopped being true fifteen years ago, so a stop that
 * needs transparency says so once, in its color, and there is exactly one way
 * to write it.
 */

type Enumerate<N extends number, Acc extends number[] = []> = Acc["length"] extends N
  ? Acc[number]
  : Enumerate<N, [...Acc, Acc["length"]]>;

/**
 * An integer percentage, 0..100.
 *
 * Named rather than inlined: a type error then reads `GradientOffset` instead
 * of unrolling the whole 101-member union.
 */
export type GradientOffset = Enumerate<101>;

export type GradientStop = {
  offset: GradientOffset;
  color: string;
};

/**
 * `100 - offset`. Arithmetic widens back to `number`, so the one cast the
 * range type costs lives here rather than at every call site.
 */
export const invertOffset = (offset: GradientOffset) => (100 - offset) as GradientOffset;

/** The same gradient, read from the other end. */
export const reverseStops = (stops: GradientStop[]): GradientStop[] =>
  stops
    .slice(0)
    .reverse()
    .map((stop) => ({ ...stop, offset: invertOffset(stop.offset) }));

/**
 * Solid color at `offset` (0..100) along the stops.
 *
 * Interpolating happens in JS, so it needs real colors: on web
 * `theme.dynamicColors` are `var(--…)` references that tinycolor cannot read.
 * Those fall back to the nearest stop's color, which paints a coarse staircase
 * instead of the silent black tinycolor would otherwise return.
 */
export const colorAt = (stops: GradientStop[], offset: number): string => {
  const first = stops[0];
  const last = stops[stops.length - 1];
  if (!first || !last) return "#000000";
  if (offset <= first.offset) return first.color;
  if (offset >= last.offset) return last.color;
  for (let i = 0; i < stops.length - 1; i++) {
    const a = stops[i];
    const b = stops[i + 1];
    if (a && b && offset >= a.offset && offset <= b.offset) {
      if (!tinycolor(a.color).isValid() || !tinycolor(b.color).isValid()) return a.color;
      const span = b.offset - a.offset;
      const local = span === 0 ? 0 : (offset - a.offset) / span;
      return tinycolor.mix(a.color, b.color, local * 100).toHexString();
    }
  }
  return last.color;
};
