/**
 * The two glasses, named after Apple's, because that is the vocabulary the
 * platform itself uses: on iOS 26 this maps straight onto `glassEffectStyle`.
 *
 * `regular` guarantees legibility: its fill is opaque enough that any text can
 * sit on it. `clear` gives that guarantee up in exchange for letting the
 * background through, so it belongs over content you control, with the fill
 * acting as the dimming layer. Two named values rather than a set of dials:
 * a material that every call site can tune is not a material any more.
 */
export type GlassMaterial = "regular" | "clear";

export type GlassTokens = {
  /** Translucent fill seen through the blur, and the dimming layer in `clear`. */
  fill: string;
  /** Rim colour. Only paints on an element that already has a border width. */
  border: string;
  /** Complete `box-shadow` value: specular bezel plus ambient shadow. */
  bezel: string;
  /** Complete `backdrop-filter` value. */
  filter: string;
};
