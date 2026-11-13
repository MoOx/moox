import { insertCssRule } from "@/react-multiversal/cssRules";
import type { GlassMaterial, GlassTokens } from "@/react-multiversal/design/glass.types";

export type { GlassMaterial, GlassTokens };

/** The `dataSet` that opts an element into the glass material. */
export const glassDataSet = (material: GlassMaterial = "regular") => ({ glass: material });

/**
 * `--rm-glass[-<scheme>][-<material>]-<token>`. The scheme-less names are the
 * live ones, the pair the rule actually reads; the scheme-qualified ones are
 * frozen copies, there for a surface that has to ignore the page.
 */
const variable = (token: keyof GlassTokens, material: GlassMaterial, scheme?: GlassScheme) =>
  ["--rm-glass", scheme, material === "regular" ? undefined : material, token]
    .filter((part) => part !== undefined)
    .join("-");

export type GlassScheme = "light" | "dark";

/**
 * Pins the material to one scheme, as inline custom properties.
 *
 * A button standing on a background it owns resolves against that background's
 * scheme, not the page's - and until this existed, that was true of everything
 * except the glass itself, which kept reading the variables on `:root`. A white
 * label on a white pane, over a dark gradient, in light mode.
 *
 * It overrides the *variables*, never the declarations, so it wins over both
 * the rule's `!important` and the `clear` remap without fighting either.
 */
export const pinnedGlassVars = (material: GlassMaterial, scheme: GlassScheme) =>
  Object.fromEntries(
    (["fill", "border", "bezel", "filter"] as const).map((token) => [
      `--rm-glass-${token}`,
      `var(${variable(token, material, scheme)})`,
    ]),
  );

/**
 * Two things about glass cannot be expressed as a React Native style, and they
 * are the only two reasons a rule is written by hand here.
 *
 * `@supports`, because it is what makes the degradation free: the caller's own
 * painted style stays underneath, so a browser that cannot blur a backdrop
 * simply keeps a raised surface. Asking the same question in JS would mean
 * asking it on the client, which the server cannot answer and hydration would
 * then contradict.
 *
 * And `-webkit-backdrop-filter`, which react-native-web does not emit: Safari
 * only dropped the prefix in 18.
 *
 * Everything else is a value, and every value is a custom property, so the
 * material is configured rather than edited. `!important` stays for the same
 * reason it was there before: react-native-web serialises a style it has not
 * registered into an inline `style` attribute, and no selector outranks that.
 *
 * The variants remap variables rather than restate declarations, which is what
 * makes them order-independent: a custom property set on the element itself
 * always beats the one it would otherwise inherit from `:root`, whatever the
 * specificity. Same mechanism for a one-off override, which is why an escape
 * hatch is one inline `--rm-glass-fill` away and needs no API of its own.
 */
insertCssRule(
  `@supports (backdrop-filter: none) or (-webkit-backdrop-filter: none) {
  [data-glass] {
    background-color: var(--rm-glass-fill) !important;
    -webkit-backdrop-filter: var(--rm-glass-filter);
    backdrop-filter: var(--rm-glass-filter);
    border-color: var(--rm-glass-border) !important;
    box-shadow: var(--rm-glass-bezel) !important;
  }
  [data-glass="clear"] {
    --rm-glass-fill: var(--rm-glass-clear-fill);
    --rm-glass-filter: var(--rm-glass-clear-filter);
    --rm-glass-border: var(--rm-glass-clear-border);
    --rm-glass-bezel: var(--rm-glass-clear-bezel);
  }
}`,
);

/**
 * Points the material at an app's own values. Each one can be a plain colour or
 * a `var(…)` pointing at a theme token, which is what keeps light/dark out of
 * here: the indirection is resolved at use time, so a theme that switches its
 * variables switches the glass with them.
 *
 * Call it at module scope. The rules are collected as an import-time side
 * effect and written into one <style> by the shell, so a call made while
 * rendering would arrive after the sheet was serialised.
 */
export type GlassMaterials = Partial<Record<GlassMaterial, Partial<GlassTokens>>>;

export type GlassConfig = {
  /** Follows the page. Point these at theme variables. */
  materials: GlassMaterials;
  /**
   * The same values, frozen per scheme, for surfaces that pin themselves to a
   * background rather than to the page. Point these at literal colours.
   */
  schemes?: Partial<Record<GlassScheme, GlassMaterials>>;
};

const declare = (materials: GlassMaterials, scheme?: GlassScheme) =>
  Object.entries(materials).flatMap(([material, tokens]) =>
    Object.entries(tokens ?? {})
      .filter(([, value]) => value !== undefined)
      .map(
        ([token, value]) =>
          `  ${variable(token as keyof GlassTokens, material as GlassMaterial, scheme)}: ${value};`,
      ),
  );

export const configureGlass = ({ materials, schemes }: GlassConfig) => {
  const declarations = [
    ...declare(materials),
    ...Object.entries(schemes ?? {}).flatMap(([scheme, byMaterial]) =>
      declare(byMaterial ?? {}, scheme as GlassScheme),
    ),
  ].join("\n");
  if (declarations !== "") insertCssRule(`:root {\n${declarations}\n}`);
};
