import { WindowWidth } from "@/react-multiversal";
import { insertCssRule } from "@/react-multiversal/cssRules";
import { ImageStyle, TextStyle, ViewStyle } from "react-native";

export type AnyStyle = ViewStyle & TextStyle & ImageStyle & Record<string, unknown>;

/**
 * One style, several viewport widths — without putting the same subtree in the
 * document twice.
 *
 * `IfWindowWidthIs` answers a different question: it renders **both** branches
 * and lets a media query hide one, which is the only SSR-safe way to switch
 * *structure* (the server does not know the viewport, so a JS-measured branch
 * either mismatches on hydration or flashes the wrong layout). That is correct
 * for structure and wasteful for styling: on /resume it left 426 nodes and
 * 3 559 characters of duplicated text in the HTML.
 *
 * When only the *styling* differs, this is the tool: one node, and the geometry
 * switches. Web emits real media queries (so it is SSR-safe and needs no JS);
 * native picks the variant at runtime from `useWindowDimensions`, in
 * `responsiveStyle.native.ts`.
 *
 * Declare at module scope, like `StyleSheet.create` — the rules are collected
 * as a side effect and injected once by `__root.tsx`.
 *
 *     const s = responsiveStyle({
 *       image: {
 *         base: { top: 0, left: 0, width: "100%", height: 300 },
 *         [WindowWidth.m]: { top: 0, right: 0, width: "50%", height: "100%" },
 *       },
 *     });
 *     <View {...responsiveProps(s.image)} />
 */
export type Variants = { base?: AnyStyle } & { [minWidth: number]: AnyStyle };
export type Responsive = { id: string };

// React Native numbers are pixels. These are the CSS properties where a bare
// number is *not* a length, so they must not get a unit.
//
// `lineHeight` is deliberately NOT in this list, even though React DOM treats
// it as unitless: in React Native `lineHeight: 26` means 26 pixels, and
// emitting `line-height: 26` would make it a multiple of the font size
// instead. That is the exact ratio-vs-pixels mismatch that stopped the router's
// `<Link>` from taking React Native text styles in the first place.
const unitless = new Set([
  "opacity",
  "zIndex",
  "flex",
  "flexGrow",
  "flexShrink",
  "fontWeight",
  "order",
  "aspectRatio",
]);

/**
 * `paddingTop` → `padding-top`, and a capitalised first letter is a vendor
 * prefix: `WebkitMaskImage` → `-webkit-mask-image`.
 */
const cssProp = (key: string) => {
  const kebab = key.replace(/[A-Z]/g, (c) => "-" + c.toLowerCase());
  return /^[A-Z]/.test(key) ? `-${kebab.slice(1)}` : kebab;
};

const cssValue = (key: string, value: unknown) =>
  typeof value === "number" && !unitless.has(key) ? `${value}px` : String(value);

const declarations = (style: AnyStyle) =>
  Object.entries(style)
    .filter(([, v]) => v != null)
    .map(([k, v]) => `  ${cssProp(k)}: ${cssValue(k, v)};`)
    .join("\n");

/**
 * The selector is doubled on purpose. react-native-web writes one atomic class
 * per declaration — specificity 0-1-0, the same as a single attribute selector
 * — and injects its stylesheet after this one, so a tie is decided by source
 * order and RNW wins. `[data-rs~="x"][data-rs]` is 0-2-0 and wins without
 * `!important`.
 */
const selector = (id: string) => `[data-rs~="${id}"][data-rs]`;

/**
 * The id is derived from the declaration, never from a counter. These are
 * registered as an import-time side effect, and the client's module graph is
 * code-split while the server's is not, so the two evaluate in different
 * orders. A counter would hand the same `rs3` to a different style on each
 * side, and the attribute the server wrote into the HTML would then pick up
 * the client's rule: a silent, layout-shaped mismatch.
 */
const hash = (value: string) => {
  let h = 5381;
  for (let i = 0; i < value.length; i++) {
    h = (Math.imul(h, 33) ^ value.charCodeAt(i)) >>> 0;
  }
  return h.toString(36);
};

/** Two different declarations behind one id would merge silently. */
const byId = new Map<string, string>();

export function responsiveStyle<T extends Record<string, Variants>>(
  defs: T,
): { [K in keyof T]: Responsive } {
  const out = {} as { [K in keyof T]: Responsive };
  for (const [name, variants] of Object.entries<Variants>(defs)) {
    const serialized = JSON.stringify(variants);
    const id = `rs${hash(serialized)}`;
    if (import.meta.env.DEV) {
      const previous = byId.get(id);
      if (previous !== undefined && previous !== serialized) {
        throw new Error(`[responsiveStyle] Hash collision on "${id}" (${name}).`);
      }
      byId.set(id, serialized);
    }
    const { base, ...breakpoints } = variants;
    if (base) {
      insertCssRule(`${selector(id)} {\n${declarations(base)}\n}`);
    }
    // Ascending, so a wider breakpoint overrides a narrower one by source order.
    for (const width of Object.keys(breakpoints)
      .map(Number)
      .sort((a, b) => a - b)) {
      const style = breakpoints[width];
      if (!style) continue;
      insertCssRule(
        `@media (min-width: ${width}px) {\n${selector(id)} {\n${declarations(style)}\n}\n}`,
      );
    }
    out[name as keyof T] = { id };
  }
  return out;
}

/**
 * Props to spread on the element. On web this is only an attribute — the CSS
 * above does the work, with no hook, no measurement and nothing to hydrate.
 * The native build returns a resolved `style` instead.
 */
export const responsiveProps = (r: Responsive) => ({ dataSet: { rs: r.id } });

/** Same, for a plain DOM element (our `Image` renders an `<img>`). */
export const responsiveAttrs = (r: Responsive) => ({ "data-rs": r.id });

export { WindowWidth };
