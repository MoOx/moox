import { StyleSheet } from "react-native";
import { match } from "ts-pattern";

const baseSpace = 16;
const space = baseSpace;

export type AbsoluteSize = number | "xxxl" | "xxl" | "xl" | "l" | "m" | "s" | "xs" | "xxs" | "xxxs";

export type Size =
  | AbsoluteSize
  | "-xxxl"
  | "-xxl"
  | "-xl"
  | "-l"
  | "-m"
  | "-s"
  | "-xs"
  | "-xxs"
  | "-xxxs";

export const size = (s?: Size): number => {
  if (typeof s === "number") {
    return s;
  }
  return match(s)
    .with("xxxl", () => space * 4)
    .with("xxl", () => space * 3)
    .with("xl", () => space * 2)
    .with("l", () => space * 1.5)
    .with("m", () => space * 1)
    .with("s", () => space * 0.75)
    .with("xs", () => space * 0.5)
    .with("xxs", () => space * 0.25)
    .with("xxxs", () => space * 0.125)
    .with("-xxxl", () => -(space * 4))
    .with("-xxl", () => -(space * 3))
    .with("-xl", () => -(space * 2))
    .with("-l", () => -(space * 1.5))
    .with("-m", () => -(space * 1))
    .with("-s", () => -(space * 0.75))
    .with("-xs", () => -(space * 0.5))
    .with("-xxs", () => -(space * 0.25))
    .with("-xxxs", () => -(space * 0.125))
    .with(undefined, () => 0)
    .exhaustive();
};

// Registered once per distinct value: `StyleSheet.create` puts the object in
// react-native-web's static style map, which is what makes it come out as an
// atomic className instead of an inline `style` attribute. A fresh object
// literal per render cannot be cached, so it is serialized into the HTML on
// every node that uses it.
const registered = <T extends object>(build: (v: number) => T) => {
  const store = new Map<number, T>();
  return (v: number): T => {
    let style = store.get(v);
    if (style === undefined) {
      style = StyleSheet.create({ style: build(v) }).style;
      store.set(v, style);
    }
    return style;
  };
};

const squareStyle = registered((v: number) => ({ width: v, height: v }));
const horizontalStyle = registered((v: number) =>
  v > 0 ? { paddingHorizontal: v } : { marginHorizontal: v },
);
const verticalStyle = registered((v: number) =>
  v > 0 ? { paddingVertical: v } : { marginVertical: v },
);
const gapStyle = registered((v: number) => ({ gap: v }));

export const styleSquare = (s?: AbsoluteSize) => squareStyle(size(s));
// `undefined` in, `undefined` out: the zero-valued fallbacks these used to
// return were no-ops that still shipped four `margin: 0px` declarations on
// every node that did not ask for spacing.
export const spaceStyleHorizontal = (s?: Size) =>
  s === undefined ? undefined : horizontalStyle(size(s));
export const spaceStyleVertical = (s?: Size) =>
  s === undefined ? undefined : verticalStyle(size(s));
export const spaceStyleGap = (s?: Size) => (s === undefined ? undefined : gapStyle(size(s)));

export enum WindowWidth {
  xxs = 320,
  xs = 480,
  s = 768,
  m = 1024,
  l = 1280,
  xl = 1440,
  xxl = 1920,
  xxxl = Infinity,
}
