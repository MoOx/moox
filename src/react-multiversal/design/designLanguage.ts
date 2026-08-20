import { Platform } from "react-native";

/**
 * The visual vocabulary a surface speaks, not the platform it runs on.
 *
 * `apple` separates a floating surface by making it translucent (the material
 * refracts what is behind it); `material` separates it by lifting it (a tonal
 * fill plus a shadow). They are two answers to the same question, not one
 * answer and one degraded fallback - which is why an Android build gets the
 * Material treatment rather than a glass-shaped approximation of it.
 */
export type DesignLanguage = "apple" | "material";

/**
 * A device already has a language to respect, and ignoring it is what makes an
 * app read as foreign, so the OS decides. The web has no native language to
 * respect: it is a place, not a platform, so somebody has to choose, and that
 * choice belongs to whoever ships the site rather than to whatever phone the
 * visitor happens to hold.
 *
 * Deliberately never derived from the user agent: this runs under SSR, where
 * the server cannot know, a per-UA render would vary the cache and diverge at
 * hydration, and iPadOS lies anyway. Capability questions ("can this browser
 * blur a backdrop?") are a different axis entirely and are answered where they
 * belong, in `@supports` and in `isLiquidGlassAvailable()`.
 */
let webLanguage: DesignLanguage = "apple";

/**
 * Set on native only to override the OS. Respecting the platform is the right
 * default, not a law: a brand that ships one identical identity everywhere
 * (Spotify, Duolingo) is making a legitimate choice, and the kit should not
 * lock it out.
 */
let nativeLanguage: DesignLanguage | undefined = undefined;

/**
 * Module state rather than a context, on purpose: it is read during the very
 * first render, including on the server, and it never changes afterwards.
 * `colorScheme.ts` holds its user preference the same way.
 */
export const configureDesignLanguage = (config: {
  web?: DesignLanguage;
  native?: DesignLanguage;
}) => {
  if (config.web !== undefined) webLanguage = config.web;
  if (config.native !== undefined) nativeLanguage = config.native;
};

export const designLanguage = (): DesignLanguage =>
  Platform.select<DesignLanguage>({
    ios: nativeLanguage ?? "apple",
    android: nativeLanguage ?? "material",
    default: webLanguage,
  }) ?? webLanguage;
