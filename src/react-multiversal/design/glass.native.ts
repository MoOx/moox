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
export const configureGlass = (
  _materials: Partial<Record<GlassMaterial, Partial<GlassTokens>>>,
) => {};
