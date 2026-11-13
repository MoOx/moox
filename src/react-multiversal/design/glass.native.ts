import type { GlassMaterial, GlassTokens } from "@/react-multiversal/design/glass.types";

export type { GlassMaterial, GlassTokens };

/**
 * Kept so the API is the same shape on both platforms, and ignored: there is no
 * `data-*` attribute on a device.
 */
export const glassDataSet = (material: GlassMaterial = "regular") => ({ glass: material });

/**
 * A no-op, on purpose. The web material is a stylesheet, so it needs to be
 * pointed at values; the native one is a view (`GlassView` above iOS 26) that
 * takes its variant and its tint as props, and `Btn` already hands it both.
 * There is nothing here to configure that is not already passed down.
 */
export type GlassScheme = "light" | "dark";

export const configureGlass = (_config: {
  materials: Partial<Record<GlassMaterial, Partial<GlassTokens>>>;
  schemes?: Partial<Record<GlassScheme, Partial<Record<GlassMaterial, Partial<GlassTokens>>>>>;
}) => {};

/** Web-only: on a device the scheme is a prop on `GlassView`, not a variable. */
export const pinnedGlassVars = (_material: GlassMaterial, _scheme: GlassScheme) => undefined;
