import { WindowWidth } from "@/react-multiversal";
import { Dimensions, ImageStyle, TextStyle, ViewStyle } from "react-native";

export type AnyStyle = ViewStyle & TextStyle & ImageStyle & Record<string, unknown>;
export type Variants = { base?: AnyStyle } & { [minWidth: number]: AnyStyle };
export type Responsive = { variants: Variants };

/**
 * Native half of `responsiveStyle.ts` — read that file for what this is for.
 *
 * There is no stylesheet to emit here: the variants are kept as they were
 * declared and resolved against the current width. Nothing is duplicated,
 * which is the whole point of the API on both platforms.
 */
export function responsiveStyle<T extends Record<string, Variants>>(
  defs: T,
): { [K in keyof T]: Responsive } {
  const out = {} as { [K in keyof T]: Responsive };
  for (const [name, variants] of Object.entries<Variants>(defs)) {
    out[name as keyof T] = { variants };
  }
  return out;
}

const resolve = ({ variants }: Responsive, width: number): AnyStyle => {
  const { base, ...breakpoints } = variants;
  // Ascending, so the widest matching breakpoint wins - same order as the
  // media queries the web build emits.
  const matched = Object.keys(breakpoints)
    .map(Number)
    .sort((a, b) => a - b)
    .filter((min) => width >= min)
    .map((min) => breakpoints[min]);
  return Object.assign({}, base, ...matched);
};

/**
 * `Dimensions.get`, not `useWindowDimensions`: this has to be callable from the
 * same place as the web version, which is not a hook at all. Rotation is rare
 * enough on the surfaces using this that a re-render is not guaranteed - if a
 * layout is found to need it, swap this one call for the hook.
 */
export const responsiveProps = (r: Responsive) => ({
  style: resolve(r, Dimensions.get("window").width),
});

export const responsiveAttrs = responsiveProps;

export { WindowWidth };
