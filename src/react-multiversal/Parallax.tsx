import * as React from "react";
import {
  MatrixTransform,
  MaximumOneOf,
  PerspectiveTransform,
  RotateTransform,
  RotateXTransform,
  RotateYTransform,
  RotateZTransform,
  ScaledSize,
  ScaleTransform,
  ScaleXTransform,
  ScaleYTransform,
  SkewXTransform,
  SkewYTransform,
  StyleProp,
  StyleSheet,
  TranslateXTransform,
  TranslateYTransform,
  useWindowDimensions,
  View,
  ViewStyle,
} from "react-native";
import Animated, {
  interpolate,
  useAnimatedStyle,
} from "react-native-reanimated";
import { SpringConfig } from "react-native-reanimated/lib/typescript/animation/springUtils";
import { match } from "ts-pattern";
import { P } from "ts-pattern";

import { useScrollWindowOffset } from "@/react-multiversal/animate.utils";
import { Portal } from "@/react-multiversal/Portal";
import { ElementLayout } from "@/react-multiversal/positions.utils";

export type DegreeValue = number | `${number}deg`;

const parseDegreeValue = (value: DegreeValue): number => {
  if (typeof value === "string") {
    return parseFloat(value);
  }
  return value;
};

export type ParallaxTransform =
  | { translateX: number }
  | { translateY: number }
  | { scale: number }
  | { scaleX: number }
  | { scaleY: number }
  | { rotate: DegreeValue }
  | { rotateX: DegreeValue }
  | { rotateY: DegreeValue }
  | { skewX: DegreeValue }
  | { skewY: DegreeValue }
  | { perspective: number };

type TransformStyle = MaximumOneOf<
  PerspectiveTransform &
    RotateTransform &
    RotateXTransform &
    RotateYTransform &
    RotateZTransform &
    ScaleTransform &
    ScaleXTransform &
    ScaleYTransform &
    TranslateXTransform &
    TranslateYTransform &
    SkewXTransform &
    SkewYTransform &
    MatrixTransform
>;

const getTransformValue = (
  transform: ParallaxTransform,
  createInterpolation: (value: number, ratio?: number) => number
): TransformStyle => {
  return match(transform)
    .with({ translateX: P.select() }, (value) => ({
      translateX: createInterpolation(value),
    }))
    .with({ translateY: P.select() }, (value) => ({
      translateY: createInterpolation(value),
    }))
    .with({ scale: P.select() }, (value) => ({
      scale: 1 + createInterpolation(value),
    }))
    .with({ scaleX: P.select() }, (value) => ({
      scaleX: 1 + createInterpolation(value),
    }))
    .with({ scaleY: P.select() }, (value) => ({
      scaleY: 1 + createInterpolation(value),
    }))
    .with({ rotate: P.select() }, (value) => ({
      rotate: `${createInterpolation(parseDegreeValue(value))}deg`,
    }))
    .with({ rotateX: P.select() }, (value) => ({
      rotateX: `${createInterpolation(parseDegreeValue(value))}deg`,
    }))
    .with({ rotateY: P.select() }, (value) => ({
      rotateY: `${createInterpolation(parseDegreeValue(value))}deg`,
    }))
    .with({ skewX: P.select() }, (value) => ({
      skewX: `${createInterpolation(parseDegreeValue(value))}deg`,
    }))
    .with({ skewY: P.select() }, (value) => ({
      skewY: `${createInterpolation(parseDegreeValue(value))}deg`,
    }))
    .with({ perspective: P.select() }, (value) => ({
      perspective: createInterpolation(value),
    }))
    .exhaustive();
};

function ParallaxDebugOverlay({ layout: layout }: { layout: ElementLayout }) {
  const id = React.useId();
  const windowDimensions = useWindowDimensions();
  const [start, end] = layoutToRange(layout, windowDimensions);

  const rangeAnimatedStyle = useAnimatedStyle(() => {
    return {
      position: "absolute",
      top: start,
      height: end - start,
      left: 0,
      right: 0,
      backgroundColor: "rgba(255, 0, 255, 0.1)",
      borderTopWidth: 2,
      borderTopColor: "rgba(255, 0, 0, 0.5)",
      borderBottomWidth: 2,
      borderBottomColor: "rgba(0, 255, 0, 0.5)",
    };
  }, [start, end]);

  const layoutAnimatedStyle = useAnimatedStyle(() => {
    return {
      position: "absolute",
      top: layout.y,
      left: layout.x,
      width: layout.width,
      height: layout.height,
      backgroundColor: "rgba(0, 0, 255, 0.5)",
    };
  }, [layout]);

  const infoBoxAnimatedStyle = useAnimatedStyle(() => {
    return {
      position: "absolute",
      left: 0,
      top: 0,
      backgroundColor: "rgba(0, 0, 0, 0.7)",
      padding: 10,
      borderRadius: 5,
      zIndex: 9999,
    };
  }, []);

  return (
    <Portal id={id}>
      <View style={[StyleSheet.absoluteFill, { pointerEvents: "none" }]}>
        <Animated.View style={rangeAnimatedStyle} />
        <Animated.View style={layoutAnimatedStyle}>
          <Animated.View style={infoBoxAnimatedStyle}>
            <Animated.Text style={{ color: "white", fontSize: 10 }}>
              {"Initial Layout: "}
              {JSON.stringify(layout, null, 2)}
            </Animated.Text>
            <Animated.Text style={{ color: "white", fontSize: 10 }}>
              {"Calculation Data: "}
              {JSON.stringify({ start, end }, null, 2)}
            </Animated.Text>
          </Animated.View>
        </Animated.View>
      </View>
    </Portal>
  );
}

const layoutToRange = (layout: ElementLayout, windowDimensions: ScaledSize) => {
  const wasInitiallyVisible = layout.y < windowDimensions.height;
  const start = Math.max(
    0,
    wasInitiallyVisible ? 0 : layout.y - windowDimensions.height
  );
  return [start, Math.max(start + 1, layout.y + layout.height)];
};
const layoutToInputRange = (
  layout: ElementLayout,
  windowDimensions: ScaledSize
) => {
  const [start, end] = layoutToRange(layout, windowDimensions);
  return [
    Math.min(start - windowDimensions.height, start - 1),
    start,
    Math.max(end, start + 1),
  ];
};

export default function Parallax({
  style,
  staticTransforms = [],
  transforms = [{ scale: 1.2 }],
  children,
  disabled = false,
  debug = false,
  springOptions,
}: {
  style?: StyleProp<ViewStyle>;
  staticTransforms?: TransformStyle[];
  transforms?: ParallaxTransform[];
  children: React.ReactNode;
  disabled?: boolean;
  debug?: boolean;
  springOptions?: SpringConfig;
}) {
  const scrollY = useScrollWindowOffset(springOptions);
  const targetRef = React.useRef<View>(null);
  const windowDimensions = useWindowDimensions();
  const [layoutInWindow, setLayoutInWindow] =
    React.useState<ElementLayout | null>(null);

  const updateLayout = React.useCallback(() => {
    targetRef.current?.measureInWindow((x, y, width, height) => {
      if (x === 0 && y === 0 && width === 0 && height === 0) {
        return;
      }
      setLayoutInWindow({
        x,
        y: y + scrollY.get(),
        width,
        height,
      });
    });
  }, [scrollY]);

  React.useLayoutEffect(() => {
    updateLayout();
  }, [updateLayout, windowDimensions]);

  const animatedStyles = useAnimatedStyle(() => {
    if (!layoutInWindow) {
      return { transform: staticTransforms };
    }

    const inputRange = layoutToInputRange(layoutInWindow, windowDimensions);
    const createInterpolation = (value: number, ratio: number = 1) => {
      if (ratio === 0) ratio = 0.001; // Avoid division by zero

      return interpolate(
        scrollY.get(),
        inputRange,
        [-value / ratio, 0, value / ratio],
        { extrapolateRight: "clamp", extrapolateLeft: "clamp" }
      );
    };

    return {
      transform: [
        ...staticTransforms,
        ...transforms.map((transform) =>
          getTransformValue(transform, createInterpolation)
        ),
      ],
    };
  }, [scrollY, layoutInWindow, windowDimensions, staticTransforms, transforms]);

  return (
    <>
      <Animated.View
        ref={targetRef}
        style={[
          style,
          disabled ? { transform: staticTransforms } : animatedStyles,
        ]}
      >
        {children}
      </Animated.View>
      {debug && layoutInWindow ? (
        <ParallaxDebugOverlay layout={layoutInWindow} />
      ) : null}
    </>
  );
}
