import { size } from "@/react-multiversal";
import { designLanguage } from "@/react-multiversal/design/designLanguage";
import { Elevation } from "@/react-multiversal/design/elevation";
import type { GlassMaterial } from "@/react-multiversal/design/glass.types";
import ElevatedSurface from "@/react-multiversal/ElevatedSurface";
import GradientLinear from "@/react-multiversal/GradientLinear";
// The one import in this kit that reaches back into the site. `useTheme` does
// come from here (`theme/index.tsx`), but the hook the site re-exports is typed
// against *its* colour map, and this button reads five of those names
// (`backMain`, `textOnMain`, `backOnAlt`, `backAlpha85`, `ultraLight`). Turning
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

/** What the button is made of. Orthogonal to how high it sits. */
export type BtnVariant = "solid" | "outline" | "plain";
export type BtnStatus = "idle" | "loading" | "success";

export type BtnProps = {
  "aria-label"?: string;
  children?: ReactNode;
  disabled?: boolean;
  elevation?: Elevation;
  /** An extra layer, not a mode: it composes with any variant and elevation. */
  gradient?: readonly [string, string];
  icon?: ReactNode;
  iconAfter?: ReactNode;
  /**
   * Which glass, at `elevation="floating"`. `clear` lets the background
   * through and stops guaranteeing that the label stays readable, so it is for
   * buttons sitting on a background you own.
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
  size?: "s" | "m";
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
  s: { paddingInline: size("s"), paddingBlock: size("xxs") },
  m: { paddingInline: size("m"), paddingBlock: size("s") },
  sGap: { gap: size("xs") },
  mGap: { gap: size("s") },
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
const tinted = (node: ReactNode, color: string) =>
  isValidElement<{ color?: string; fill?: string }>(node)
    ? cloneElement(node, {
        color: node.props.color ?? color,
        fill: node.props.fill ?? color,
      })
    : node;

const Btn = ({
  "aria-label": ariaLabel,
  children,
  disabled = false,
  elevation = "raised",
  gradient,
  icon,
  iconAfter,
  material = "regular",
  onPress,
  render,
  size: sizeName = "m",
  spread = false,
  status = "idle",
  style,
  textStyle,
  variant = "solid",
}: BtnProps) => {
  const theme = useTheme();
  const language = designLanguage();
  const solid = variant === "solid";
  const textColor = solid
    ? theme.dynamicColors.textOnMain
    : theme.dynamicColors.text;
  const background = solid
    ? theme.dynamicColors.backMain
    : elevation === "flat"
      ? undefined
      : language === "material"
        ? // Material lifts with an opaque tonal surface; the theme already has
          // the rung above the page background.
          theme.dynamicColors.backOnAlt
        : // Apple lifts with translucency, and that is also the fill the glass
          // degrades to when the platform cannot render the material.
          theme.dynamicColors.backAlpha85;

  const content = (
    <>
      <ElevatedSurface
        background={background}
        borderColor={
          variant === "outline" ? theme.dynamicColors.ultraLight : undefined
        }
        colorScheme={theme.mode}
        elevation={elevation}
        language={language}
        material={material}
        radius={radius}
        tint={solid ? theme.dynamicColors.backMain : undefined}
      />
      {gradient === undefined ? null : (
        <View aria-hidden style={[StyleSheet.absoluteFill, styles.gradient]}>
          <GradientLinear
            height="100%"
            stops={[
              { offset: 0, stopColor: gradient[0] },
              { offset: 100, stopColor: gradient[1] },
            ]}
            width="100%"
          />
        </View>
      )}
      {status === "idle" ? null : (
        <View aria-hidden style={[StyleSheet.absoluteFill, styles.indicator]}>
          {status === "loading" ? (
            <ActivityIndicator color={textColor} size={size("xs") + 2} />
          ) : (
            <Text style={{ color: textColor, fontSize: size("xs") + 2 }}>
              {"✔"}
            </Text>
          )}
        </View>
      )}
      <View
        style={[
          styles.content,
          sizeName === "s" ? styles.sGap : styles.mGap,
          spread && styles.contentSpread,
          status !== "idle" && styles.hidden,
        ]}
      >
        {tinted(icon, textColor)}
        {typeof children === "string" || typeof children === "number" ? (
          <Text
            style={[
              styles.label,
              spread && styles.labelSpread,
              { color: textColor },
              textStyle,
            ]}
          >
            {children}
          </Text>
        ) : (
          children
        )}
        {tinted(iconAfter, textColor)}
      </View>
    </>
  );

  const rootStyle = [
    styles.root,
    styles[sizeName],
    disabled && styles.disabled,
    style,
  ];

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
