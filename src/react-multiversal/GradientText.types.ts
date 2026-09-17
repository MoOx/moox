import { GradientStop } from "@/react-multiversal/gradient";
import { ReactNode } from "react";
import { StyleProp, TextProps, TextStyle } from "react-native";

type GradientTextBase = Omit<TextProps, "children" | "style"> & {
  stops: GradientStop[];
  style?: StyleProp<TextStyle>;
};

/**
 * `letter` rules out both of the other props, and that is the point of the
 * union: it renders one solid color per character, so there is nothing to do
 * with an element child, and no angle to follow either - the interpolation runs
 * along the string, in one dimension. It exists for the PDF export and nothing
 * else; see `GradientTextByLetter`.
 */
export type GradientTextProps = GradientTextBase &
  (
    | { letter: true; children: string; angle?: never }
    | {
        letter?: false;
        children: ReactNode;
        /**
         * Degrees, CSS convention: 0 paints bottom to top, 90 left to right,
         * 180 top to bottom. Note that `GradientLinear` counts from a
         * different quarter turn; the native half converts.
         */
        angle?: number;
      }
  );
