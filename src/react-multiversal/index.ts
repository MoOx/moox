import { match } from "ts-pattern";

const baseSpace = 16;
const space = baseSpace;

export type AbsoluteSize =
  | number
  | "xxxl"
  | "xxl"
  | "xl"
  | "l"
  | "m"
  | "s"
  | "xs"
  | "xxs"
  | "xxxs";

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

export const squareStyle = (s?: AbsoluteSize) => {
  const v = typeof s !== "number" ? size(s) : s;
  return { width: v, height: v };
};
export const spaceHorizontalStyle = (s?: Size) => {
  const v = typeof s !== "number" ? size(s) : s;
  return v > 0 ? { paddingHorizontal: v } : { marginHorizontal: v };
};
export const spaceVerticalStyle = (s?: Size) => {
  const v = typeof s !== "number" ? size(s) : s;
  return v > 0 ? { paddingVertical: v } : { marginVertical: v };
};
export const gapSpaceStyle = (s?: Size) => {
  const v = typeof s !== "number" ? size(s) : s;
  return { gap: v };
};

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
