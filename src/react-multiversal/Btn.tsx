import { size } from "@/react-multiversal";
import { designLanguage } from "@/react-multiversal/design/designLanguage";
import { Elevation } from "@/react-multiversal/design/elevation";
import type { GlassMaterial } from "@/react-multiversal/design/glass.types";
import ElevatedSurface from "@/react-multiversal/ElevatedSurface";
import { fontStyles } from "@/react-multiversal/font";
import GradientLinear from "@/react-multiversal/GradientLinear";
// The one import in this kit that reaches back into the site. `useTheme` does
// come from here (`theme/index.tsx`), but the hook the site re-exports is typed
// against *its* colour map, and this button reads five of those names
// (`backMain`, `textOnMain`, `backElevated`, `backOnAlt`, `backAlpha85`,
// `ultraLight`). Turning
// that into a colour contract this kit owns is the next step, not this move.
// See TODO.md.
import { useTheme } from "@/styles";
import { cloneElement, isValidElement, ReactElement, ReactNode } from "react";
import {
  ActivityIndicator,
  Pressable,
  PressableProps,
  StyleProp,
  StyleSheet,
  Text,
  TextStyle,
  View,
  ViewStyle,
} from "react-native";

/**
 * A button is a design object, so it has named styles rather than an axis to
 * cross with another one.
 *
 * `elevation` and `material` are the right shape one floor down, in
 * `ElevatedSurface`, where they describe a surface and serve cards as much as
 * buttons. Up here they overlapped: at `floating` the fill comes from the
 * material, so `variant` no longer said what the button was made of, and the
 * most ordinary style of all - a plain pane of glass - had to be spelled as a
 * negation plus a height (`plain` + `floating`). Nine cells, four of them ever
 * written.
 *
 * Adding a style is a line in the table below, which is read and reviewed,
 * rather than a combination nobody ever looks at.
 */
export type BtnVariant =
  | "solid"
  | "outline"
  | "plain"
  | "raised"
  | "glass"
  | "glassOutline"
  | "glassTinted";
export type BtnStatus = "idle" | "loading" | "success";

type VariantSpec = {
  elevation: Elevation;
  /** `accent` is the brand fill, `surface` the one a lifted pane sits on. */
  /**
   * `surface` is an opaque pane, the way a card is. `glassFallback` is the
   * translucent one the material degrades to, which is a different thing: it is
   * meant to be seen through, and `raised` used to borrow it by accident, which
   * made a raised button a veil rather than a surface.
   */
  fill: "accent" | "surface" | "glassFallback" | "none";
  border: boolean;
  /** Only glass can be tinted, and tinting is what keeps its label readable. */
  tinted?: boolean;
};

const variants: Record<BtnVariant, VariantSpec> = {
  solid: { elevation: "flat", fill: "accent", border: false },
  outline: { elevation: "flat", fill: "none", border: true },
  plain: { elevation: "flat", fill: "none", border: false },
  raised: { elevation: "raised", fill: "surface", border: false },
  // The `surface` fill is what the glass degrades to: an old browser, an
  // Android build, an iPhone below 26. There is always a rung underneath.
  glass: { elevation: "floating", fill: "glassFallback", border: false },
  glassOutline: { elevation: "floating", fill: "glassFallback", border: true },
  glassTinted: {
    elevation: "floating",
    fill: "accent",
    border: false,
    tinted: true,
  },
};

export type BtnProps = {
  "aria-label"?: string;
  /**
   * The colour scheme of whatever is *behind* the button, when it is not the
   * page's. A block that stays dark in both themes, a photo, a gradient: the
   * button is standing on something with its own light, and only the call site
   * knows that.
   *
   * It resolves the *whole* button against that scheme rather than just
   * recolouring the label, because a label is never the only thing that has to
   * change: the painted fill, the outline, the spinner and the icons all follow
   * from the same question. On iOS it is also what the glass is told, which is
   * how Apple's own material behaves over dark media.
   *
   * This is the answer to "my background is dark, I need light text". Reach for
   * `textStyle` only to set a colour the theme does not have.
   */
  backdrop?: "light" | "dark";
  children?: ReactNode;
  disabled?: boolean;
  /** An extra layer, not a mode: it composes with every variant. */
  gradient?: readonly [string, string];
  icon?: ReactNode;
  iconAfter?: ReactNode;
  /**
   * Which glass, on the `glass*` variants and ignored by the others. `clear`
   * lets the background through and stops guaranteeing that the label stays
   * readable, so it is for buttons sitting on a background you own.
   */
  material?: GlassMaterial;
  onPress?: PressableProps["onPress"];
  /**
   * The element to render as the root, cloned with the button's styles and
   * children. This is how a button becomes a link without the kit ever
   * importing a router: `render={<LinkView href="/cv" />}`, `render={<a />}`,
   * `render={<Link to="/cv" />}`. Keeping the surface on the caller's element
   * rather than on a wrapper is also what keeps focus ring, hover and hit area
   * on a single node.
   */
  render?: ReactElement;
  size?: BtnSize;
  /**
   * How much room the button takes, when that should not follow its label's
   * size: a hero call to action with a lot of space around a 16pt label is
   * `size="m" density="roomy"`. Left alone it follows `size`.
   */
  density?: BtnDensity;
  /** Pushes `iconAfter` to the far edge instead of grouping it with the label. */
  spread?: boolean;
  status?: BtnStatus;
  style?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
  variant?: BtnVariant;
};

const radius = 9999;

const styles = StyleSheet.create({
  root: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: radius,
  },
  /**
   * The content sits in its own box, and that box is what keeps it above the
   * surface. On the web, an absolutely positioned child paints after every
   * non-positioned sibling, and an `<svg>` is not positioned: an icon rendered
   * as a direct child went *under* the layer, invisible on a solid fill and
   * washed out on a translucent one. react-native-web gives a `View` its own
   * `position: relative`, so one wrapper fixes it for any content, including
   * whatever a caller passes as children.
   */
  content: { flexDirection: "row", alignItems: "center", flexShrink: 1 },
  contentSpread: { flexGrow: 1, justifyContent: "space-between" },
  // Registered rather than built inline: `StyleSheet.create` is what puts these
  // in react-native-web's static map, so they ship as one atomic class instead
  // of being serialised into a `style` attribute on every button on the page.
  // See the note above `registered` in `./index.ts`.
  tight: { paddingInline: size("s"), paddingBlock: size("xxs") },
  regular: { paddingInline: size("m"), paddingBlock: size("xs") },
  roomy: { paddingInline: size("l"), paddingBlock: size("s") },
  tightGap: { gap: size("xxs") },
  regularGap: { gap: size("xs") },
  roomyGap: { gap: size("xs") },
  // Without this, a long label overflows the pill on a device rather than
  // wrapping: a `Text` in a row does not shrink on its own.
  label: { flexShrink: 1, textAlign: "center" },
  labelSpread: { flexGrow: 1, textAlign: "left" },
  gradient: { borderRadius: radius, overflow: "hidden" },
  indicator: { alignItems: "center", justifyContent: "center" },
  // The content keeps its box while the indicator shows, so the button never
  // changes width mid-press. It is a sibling of the surface, never its parent,
  // which is what keeps `opacity: 0` from killing the glass on iOS.
  hidden: { opacity: 0 },
  pressed: { opacity: 0.8 },
  disabled: { opacity: 0.5 },
});

/**
 * Two questions, not one. How big is the label, and how much room does the
 * button take. They agree most of the time, which is why one prop felt like
 * enough, but they are not the same question: a hero call to action is a lot of
 * space around a label that stays at 16, and a toolbar pill is very little
 * space around a label at 13. One axis could only express the diagonal.
 *
 * `button` is the type role the design system already named for this
 * (`sizes.ios.button`, Apple's callout at semibold); the small button drops to
 * `footnote` and the large one steps up to `body`.
 */
export type BtnSize = "s" | "m" | "l";
export type BtnDensity = "tight" | "regular" | "roomy";

const sizes: Record<BtnSize, { text: TextStyle; icon: number }> = {
  s: { text: fontStyles.iosEm.footnote, icon: 14 },
  m: { text: fontStyles.iosEm.button, icon: 18 },
  l: { text: fontStyles.iosEm.body, icon: 22 },
};

const densities: Record<BtnDensity, { box: ViewStyle; gap: ViewStyle }> = {
  tight: { box: styles.tight, gap: styles.tightGap },
  regular: { box: styles.regular, gap: styles.regularGap },
  roomy: { box: styles.roomy, gap: styles.roomyGap },
};

/**
 * The density a size implies, so the second axis is only ever written when the
 * point *is* to break the correlation.
 *
 * The values are deliberately not `s`/`m`/`l` as well: two props sharing one
 * vocabulary can be swapped without the compiler noticing, and `size="m"
 * density="l"` reads as a puzzle. A name that cannot belong to the other prop
 * is what makes the mistake a type error, and what lets anyone (or anything)
 * writing a call site get it right without reading this file.
 */
const densityOf: Record<BtnSize, BtnDensity> = {
  s: "tight",
  m: "regular",
  l: "roomy",
};

/**
 * Tints the icons the caller handed us, so `icon` and `iconAfter` follow the
 * label without every call site restating the colour.
 *
 * Both props, because `svgs/` holds two families: the sources that paint with
 * `currentColor`, which `color` reaches, and the ones whose paths declare no
 * fill at all, which inherit the `<Svg>`'s and would otherwise come out black
 * (`SVGDownload` is one of those, and did). Neither overrides a path that
 * declares its own colour, so a multicoloured mark is untouched, and an
 * explicit `color`/`fill` from the call site still wins.
 */
const tinted = (node: ReactNode, color: string, iconSize: number) =>
  isValidElement<{
    color?: string;
    fill?: string;
    width?: number;
    height?: number;
  }>(node)
    ? cloneElement(node, {
        color: node.props.color ?? color,
        fill: node.props.fill ?? color,
        // Same rule as the colour: the button provides it, the call site can
        // still override it, and an icon can no longer drift from the size of
        // the button it sits in.
        width: node.props.width ?? iconSize,
        height: node.props.height ?? iconSize,
      })
    : node;

const Btn = ({
  "aria-label": ariaLabel,
  backdrop,
  children,
  disabled = false,
  gradient,
  icon,
  iconAfter,
  material = "regular",
  onPress,
  render,
  density,
  size: sizeName = "m",
  spread = false,
  status = "idle",
  style,
  textStyle,
  variant = "solid",
}: BtnProps) => {
  // `undefined` means "auto", which is the page's own scheme: passing a
  // backdrop pins every colour below to that one instead.
  const theme = useTheme(backdrop);
  const language = designLanguage();
  const spec = variants[variant];
  const sizeSpec = sizes[sizeName];
  const densitySpec = densities[density ?? densityOf[sizeName]];
  const onAccent = spec.fill === "accent";
  // A colour set through `textStyle` reaches the icons and the indicator too.
  // It used to reach the label only, which left an explicitly coloured button
  // with icons still painted from the theme.
  const textColor =
    (StyleSheet.flatten(textStyle)?.color as string | undefined) ??
    (onAccent ? theme.dynamicColors.textOnMain : theme.dynamicColors.text);
  const background =
    spec.fill === "accent"
      ? theme.dynamicColors.backMain
      : spec.fill === "none"
        ? undefined
        : spec.fill === "surface"
          ? // A veil, not a colour: it lifts whatever is behind it, so the same
            // button reads as raised on the page, on a photo and on a gradient.
            theme.dynamicColors.backElevated
          : language === "material"
            ? theme.dynamicColors.backOnAlt
            : // What the glass degrades to when the platform cannot render it,
              // so it has to be translucent like the material it stands in for.
              theme.dynamicColors.backAlpha85;

  const content = (
    <>
      <ElevatedSurface
        backdrop={backdrop}
        background={background}
        borderColor={spec.border ? theme.dynamicColors.ultraLight : undefined}
        colorScheme={theme.mode}
        elevation={spec.elevation}
        language={language}
        material={material}
        radius={radius}
        tint={spec.tinted === true ? theme.dynamicColors.backMain : undefined}
      />
      {gradient === undefined ? null : (
        <View aria-hidden style={[StyleSheet.absoluteFill, styles.gradient]}>
          <GradientLinear
            height="100%"
            stops={[
              { offset: 0, color: gradient[0] },
              { offset: 100, color: gradient[1] },
            ]}
            width="100%"
          />
        </View>
      )}
      {status === "idle" ? null : (
        <View aria-hidden style={[StyleSheet.absoluteFill, styles.indicator]}>
          {status === "loading" ? (
            <ActivityIndicator color={textColor} size={sizeSpec.icon} />
          ) : (
            <Text style={{ color: textColor, fontSize: sizeSpec.icon }}>{"✔"}</Text>
          )}
        </View>
      )}
      <View
        style={[
          styles.content,
          densitySpec.gap,
          spread && styles.contentSpread,
          status !== "idle" && styles.hidden,
        ]}
      >
        {tinted(icon, textColor, sizeSpec.icon)}
        {typeof children === "string" || typeof children === "number" ? (
          <Text
            style={[
              styles.label,
              spread && styles.labelSpread,
              sizeSpec.text,
              textStyle,
              { color: textColor },
            ]}
          >
            {children}
          </Text>
        ) : (
          children
        )}
        {tinted(iconAfter, textColor, sizeSpec.icon)}
      </View>
    </>
  );

  const rootStyle = [styles.root, densitySpec.box, disabled && styles.disabled, style];

  // `aria-busy` rather than a hidden live region: the label is still in the
  // tree (it is only transparent), so what a screen reader needs to know is
  // that the control is working, not what it says.
  const a11y = { "aria-busy": status === "loading", "aria-label": ariaLabel };

  if (render !== undefined) {
    const props = render.props as { style?: StyleProp<ViewStyle> };
    return cloneElement(
      render as ReactElement<Record<string, unknown>>,
      { ...a11y, style: [rootStyle, props.style] },
      content,
    );
  }

  if (onPress !== undefined) {
    return (
      <Pressable
        {...a11y}
        aria-disabled={disabled}
        disabled={disabled || status !== "idle"}
        onPress={onPress}
        role="button"
        style={({ pressed }) => [rootStyle, pressed && styles.pressed]}
      >
        {content}
      </Pressable>
    );
  }

  // No handler and no root to render into: this is decoration, so it gets no
  // role. A `role="button"` on a view nobody can focus or activate is a
  // promise the tree cannot keep, and nested in a link it makes a screen
  // reader announce two controls where there is one.
  return <View style={rootStyle}>{content}</View>;
};

export default Btn;
