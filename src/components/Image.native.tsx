import { website } from "@/consts";
import { ImgHTMLAttributes } from "react";
import { Image as RNImage, StyleSheet } from "react-native";
import { SvgUri } from "react-native-svg";

/**
 * Native half of `Image.tsx`. Same props, because every call site is shared:
 * they pass the web `<img>` attributes (`src`, `width`, `height`, `alt`), and
 * translating them here is what keeps those call sites from growing a platform
 * branch each.
 *
 * Two things differ from the browser and both are load-bearing:
 *
 *   - `src` is root-relative (`/_/landscape-tree.svg`). There is no document to
 *     resolve that against, so it is resolved against the deployed site - the
 *     same origin `src/api.tsx` reads the content JSON from.
 *   - React Native's `<Image>` decodes bitmaps only; handed an SVG it renders
 *     nothing, silently. Roughly half the site's images are SVG (the landscape,
 *     the footer, the open-source cards), so those go through react-native-svg's
 *     `SvgUri` instead. No new dependency: both are already installed for the
 *     web build.
 */
export default function Image({
  alt,
  src,
  width,
  height,
  style,
}: ImgHTMLAttributes<HTMLImageElement> & { priority?: boolean }) {
  // Only the props above cross over. The rest of `ImgHTMLAttributes` is DOM
  // (`loading`, `fetchPriority`, `className`, every `on*` handler) and
  // forwarding it wholesale would not even typecheck: `aria-busy` is
  // `Booleanish` on an element and `boolean` on an `<Image>`.
  const uri = !src ? undefined : src.startsWith("/") ? website + src : src;
  if (!uri) return null;

  const size = {
    width: typeof width === "string" ? Number(width) : width,
    height: typeof height === "string" ? Number(height) : height,
  };

  if (uri.split("?")[0]?.endsWith(".svg")) {
    return <SvgUri uri={uri} width={size.width} height={size.height} />;
  }

  return (
    <RNImage
      accessibilityLabel={alt}
      // An empty alt marks a decorative image on the web; the native
      // equivalent is to keep the node out of the accessibility tree.
      accessibilityElementsHidden={!alt}
      importantForAccessibility={alt ? "auto" : "no-hide-descendants"}
      source={{ uri }}
      // `<img width height>` sizes the box and lets the intrinsic ratio fill
      // it; `resizeMode: contain` is the closest native equivalent.
      resizeMode="contain"
      style={StyleSheet.flatten([size, style as object])}
    />
  );
}
