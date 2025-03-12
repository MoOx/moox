"use client";
import * as React from "react";
import {
  MatrixTransform,
  MaximumOneOf,
  PerspectiveTransform,
  Platform,
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

export type PercentageValue = number | `${number}%`;

const parsePercentageValue = (
  value: PercentageValue
): { value: number; isPercentage: boolean } => {
  if (typeof value === "string") {
    return { value: parseFloat(value), isPercentage: true };
  }
  return { value, isPercentage: false };
};

type TranslateX = { translateX: PercentageValue };
type TranslateY = { translateY: PercentageValue };
type Scale = { scale: number };
type ScaleX = { scaleX: number };
type ScaleY = { scaleY: number };
type Rotate = { rotate: DegreeValue };
type RotateX = { rotateX: DegreeValue };
type RotateY = { rotateY: DegreeValue };
type SkewX = { skewX: DegreeValue };
type SkewY = { skewY: DegreeValue };
type Perspective = { perspective: number };

export type ParallaxTransform = MaximumOneOf<
  TranslateX &
    TranslateY &
    Scale &
    ScaleX &
    ScaleY &
    Rotate &
    RotateX &
    RotateY &
    SkewX &
    SkewY &
    Perspective
>;

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
  transform:
    | TranslateX
    | TranslateY
    | Scale
    | ScaleX
    | ScaleY
    | Rotate
    | RotateX
    | RotateY
    | SkewX
    | SkewY
    | Perspective,
  createInterpolation: (value: number, ratio?: number) => number,
  layout?: ElementLayout
): TransformStyle => {
  return match(transform)
    .with({ translateX: P.select() }, (value) => {
      const { value: parsedValue, isPercentage } = parsePercentageValue(value);
      const translationValue =
        isPercentage && layout
          ? createInterpolation((parsedValue * layout.width) / 100)
          : createInterpolation(parsedValue);
      return { translateX: translationValue };
    })
    .with({ translateY: P.select() }, (value) => {
      const { value: parsedValue, isPercentage } = parsePercentageValue(value);
      const translationValue =
        isPercentage && layout
          ? createInterpolation((parsedValue * layout.height) / 100)
          : createInterpolation(parsedValue);
      return { translateY: translationValue };
    })
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

function ParallaxDebugOverlay({
  layout,
  getScrollViewHeight,
}: {
  layout: ElementLayout;
  getScrollViewHeight: () => number;
}) {
  const id = React.useId();
  const windowDimensions = useWindowDimensions();
  const [start, end, maxScrollPosition] = layoutToRange({
    layout,
    windowDimensions,
    getScrollViewHeight,
  });
  const maxScroll = calculateMaxScrollPosition(
    windowDimensions,
    getScrollViewHeight
  );
  const isInTopViewport = layout.y < windowDimensions.height;
  const isInBottomViewport = layout.y + layout.height > maxScrollPosition;

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
              {JSON.stringify(
                {
                  start,
                  end,
                  maxScrollPosition,
                  isInTopViewport,
                  isInBottomViewport,
                  maxScroll,
                  scrollViewHeight: getScrollViewHeight(),
                },
                null,
                2
              )}
            </Animated.Text>
          </Animated.View>
        </Animated.View>
      </View>
    </Portal>
  );
}

/**
 * Calculates the maximum possible scroll position for the page
 * This is the document height minus the window height
 */
const calculateMaxScrollPosition = (
  windowDimensions: ScaledSize,
  getScrollViewHeight: () => number
): number => {
  return Math.max(0, getScrollViewHeight() - windowDimensions.height);
};

const layoutToRange = ({
  layout,
  windowDimensions,
  getScrollViewHeight,
}: {
  layout: ElementLayout;
  windowDimensions: ScaledSize;
  getScrollViewHeight: () => number;
}): [number, number, number] => {
  // Calculate the maximum possible scroll position
  const maxScrollPosition = calculateMaxScrollPosition(
    windowDimensions,
    getScrollViewHeight
  );

  // Check if element is in the top viewport (initially visible without scrolling)
  const isInTopViewport = layout.y < windowDimensions.height;

  // Check if element is in the bottom viewport (visible at max scroll)
  const isInBottomViewport = layout.y + layout.height > maxScrollPosition;

  // For elements in the top viewport, start at 0
  // For other elements, start when they're about to enter the viewport
  const start = Math.max(
    0,
    isInTopViewport ? 0 : layout.y - windowDimensions.height
  );

  // For elements in the bottom viewport, ensure they complete their animation
  // by setting the end to the max scroll position
  // For other elements, use their natural end position
  const end = isInBottomViewport
    ? maxScrollPosition
    : Math.max(start + 1, layout.y + layout.height);

  return [start, end, maxScrollPosition];
};

const layoutToInputRange = ({
  layout,
  windowDimensions,
  getScrollViewHeight,
}: {
  layout: ElementLayout;
  windowDimensions: ScaledSize;
  getScrollViewHeight: () => number;
}): [number, number, number] => {
  const [start, end] = layoutToRange({
    layout,
    windowDimensions,
    getScrollViewHeight,
  });

  // Adjust the input range to account for the maximum scroll position
  return [
    // First value: when element is about to enter viewport
    Math.min(start - windowDimensions.height, start - 1),
    // Middle value: when element starts to be visible
    start,
    // Last value: when element is fully visible
    end,
  ];
};

export default function Parallax({
  style,
  contentStyle,
  staticTransforms = [],
  transforms = [{ scale: 1.2 }],
  children,
  disabled = false,
  debug = false,
  springOptions,
  reverse = false,
  getScrollViewHeight = () => {
    if (Platform.OS === "web" && typeof document !== "undefined") {
      // For web, use the actual document height
      return Math.max(
        document.body.scrollHeight,
        document.documentElement.scrollHeight,
        document.body.offsetHeight,
        document.documentElement.offsetHeight,
        document.body.clientHeight,
        document.documentElement.clientHeight
      );
    }
    throw new Error(
      "Parallax: getScrollViewHeight() should be provided for this platform." +
        "You should probably listen to <ScrollView> 'onContentSizeChange' prop and retrieve 'event.nativeEvent.layout.height' in a state."
    );
  },
}: {
  style?: StyleProp<ViewStyle>;
  contentStyle?: StyleProp<ViewStyle>;
  staticTransforms?: TransformStyle[];
  transforms?: ParallaxTransform[];
  children?: React.ReactNode;
  disabled?: boolean;
  debug?: boolean;
  springOptions?: SpringConfig;
  reverse?: boolean;
  getScrollViewHeight?: () => number;
}) {
  const [scrollOffsetAnimValue, getOffset] =
    useScrollWindowOffset(springOptions);
  const targetRef = React.useRef<View>(null);
  const windowDimensions = useWindowDimensions();
  const [layoutInWindow, setLayoutInWindow] =
    React.useState<ElementLayout | null>(null);
  const observerRef = React.useRef<IntersectionObserver | null>(null);

  const updateLayout = React.useCallback(() => {
    return requestAnimationFrame(() => {
      targetRef.current?.measureInWindow((x, y, width, height) => {
        if (x === 0 && y === 0 && width === 0 && height === 0) {
          return;
        }
        setLayoutInWindow({
          x,
          y: y + getOffset(),
          width,
          height,
        });
      });
    });
  }, [getOffset]);

  React.useEffect(() => {
    if (Platform.OS === "web") {
      const animationFrames: number[] = [];
      const targetElement = targetRef.current as unknown as HTMLElement;
      if (targetElement && window.IntersectionObserver) {
        observerRef.current = new IntersectionObserver((entries) => {
          if (entries.some((entry) => entry.isIntersecting)) {
            animationFrames.push(updateLayout());
          }
        });
        observerRef.current.observe(targetElement);
      }

      return () => {
        observerRef.current?.disconnect();
        animationFrames.forEach((af) => cancelAnimationFrame(af));
      };
    } else {
      const animationFrame = updateLayout();
      return () => {
        cancelAnimationFrame(animationFrame);
      };
    }
  }, [updateLayout, windowDimensions]);

  const animatedStyles = useAnimatedStyle(() => {
    if (!layoutInWindow) {
      return { transform: staticTransforms };
    }

    const inputRange = layoutToInputRange({
      layout: layoutInWindow,
      windowDimensions,
      getScrollViewHeight,
    });

    const createInterpolation = (value: number, ratio: number = 1) => {
      if (ratio === 0) ratio = 0.001; // Avoid division by zero

      const outputRange = [-value / ratio, 0, value / ratio];
      if (reverse) outputRange.reverse();

      return interpolate(
        scrollOffsetAnimValue.get(),
        inputRange,
        outputRange,
        "clamp"
      );
    };

    return {
      transform: [
        ...staticTransforms,
        ...transforms.map((transform) =>
          getTransformValue(transform, createInterpolation, layoutInWindow)
        ),
      ],
    };
  }, [
    layoutInWindow,
    windowDimensions,
    staticTransforms,
    transforms,
    reverse,
    scrollOffsetAnimValue,
    getScrollViewHeight,
  ]);

  return (
    <View ref={targetRef} style={style}>
      <Animated.View
        style={[
          contentStyle,
          disabled ? { transform: staticTransforms } : animatedStyles,
        ]}
      >
        {children}
      </Animated.View>
      {debug && layoutInWindow ? (
        <ParallaxDebugOverlay
          layout={layoutInWindow}
          getScrollViewHeight={getScrollViewHeight}
        />
      ) : null}
    </View>
  );
}
