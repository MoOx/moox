"use client";

import React, { useEffect } from "react";
import { StyleSheet, View } from "react-native";
import Animated, {
  cancelAnimation,
  Easing,
  SharedValue,
  useAnimatedProps,
  useSharedValue,
  withRepeat,
  withTiming,
} from "react-native-reanimated";
import Svg, {
  Defs,
  LinearGradient,
  Mask,
  Path,
  Rect,
  Stop,
} from "react-native-svg";

const AnimatedPath = Animated.createAnimatedComponent(Path);

type CircleConfig = {
  colors: [string, string];
  radiusRatio?: number;
  deformationRatio?: number;
  borderWidth?: number;
  opacity?: number;
  duration?: number;
  hollow?: boolean;
};

type AIPromptCircleProps = {
  size?: number;
  circles?: CircleConfig[];
};

type Point = {
  x: number;
  y: number;
};

// Individual morphing circle component
const MorphingCircle = ({
  radius,
  centerX,
  centerY,
  deformations,
  rotation,
  gradientId,
  deformationRatio = 0.4,
  opacity = 0.8,
  mask,
  fill,
}: {
  radius: number;
  centerX: number;
  centerY: number;
  deformations: SharedValue<number>[];
  rotation: SharedValue<number>;
  gradientId: string;
  deformationRatio?: number;
  opacity?: number;
  mask?: string;
  fill?: string;
}) => {
  // Animated props for SVG path
  const animatedProps = useAnimatedProps(() => {
    // Calculate 8 points of the circle with deformation
    const points: Point[] = [];

    for (let i = 0; i < 8; i++) {
      const angle = (i / 8) * Math.PI * 2 + rotation.value;

      // Select deformation value based on index
      const deformValue = deformations[i]?.value ?? 0;

      // Calculate radius with deformation
      const radiusOffset = radius * deformationRatio * deformValue;
      const r = radius + radiusOffset;

      // Calculate point position
      const x = centerX + r * Math.cos(angle);
      const y = centerY + r * Math.sin(angle);

      points.push({ x, y });
    }

    // If not enough points, return a simple circle
    if (points.length < 2) {
      return {
        d: `M ${centerX} ${centerY - radius} A ${radius} ${radius} 0 1 1 ${centerX - 0.1} ${centerY - radius} Z`,
      };
    }

    // Create SVG path using quadratic curves
    const pathData: string[] = [];

    // Start at the middle between the last and first point
    const lastPoint = points[points.length - 1];
    const firstPoint = points[0];

    if (lastPoint && firstPoint) {
      pathData.push(
        `M ${(lastPoint.x + firstPoint.x) / 2} ${(lastPoint.y + firstPoint.y) / 2}`
      );

      // Draw quadratic curves between each point
      for (let i = 0; i < points.length; i++) {
        const currentPoint = points[i];
        const nextIdx = (i + 1) % points.length;
        const nextPoint = points[nextIdx];

        if (currentPoint && nextPoint) {
          pathData.push(
            `Q ${currentPoint.x} ${currentPoint.y} ${(currentPoint.x + nextPoint.x) / 2} ${(currentPoint.y + nextPoint.y) / 2}`
          );
        }
      }
    }

    pathData.push("Z");
    return { d: pathData.join(" ") };
  }, [rotation, deformations, radius, centerX, centerY, deformationRatio]);

  return (
    <AnimatedPath
      animatedProps={animatedProps}
      fill={fill || `url(#${gradientId})`}
      fillOpacity={opacity}
      mask={mask}
    />
  );
};

const defaultCircleConfig: CircleConfig = {
  colors: ["#96fbc4", "#86dcf9"],
  radiusRatio: 0.3,
  deformationRatio: 0.25,
  borderWidth: 8,
  opacity: 0.8,
  duration: 3000,
  hollow: true,
};

const useCircleAnimations = (numCircles: number) => {
  // Rotations
  const rotation1 = useSharedValue(0);
  const rotation2 = useSharedValue(0);
  const rotation3 = useSharedValue(0);
  const rotation4 = useSharedValue(0);
  const rotation5 = useSharedValue(0);
  const rotations = [
    rotation1,
    rotation2,
    rotation3,
    rotation4,
    rotation5,
  ].slice(0, numCircles);

  // Inner Rotations
  const innerRotation1 = useSharedValue(0);
  const innerRotation2 = useSharedValue(0);
  const innerRotation3 = useSharedValue(0);
  const innerRotation4 = useSharedValue(0);
  const innerRotation5 = useSharedValue(0);
  const innerRotations = [
    innerRotation1,
    innerRotation2,
    innerRotation3,
    innerRotation4,
    innerRotation5,
  ].slice(0, numCircles);

  // Outer Deformations - Circle 1
  const deform1_1 = useSharedValue(0);
  const deform1_2 = useSharedValue(0);
  const deform1_3 = useSharedValue(0);
  const deform1_4 = useSharedValue(0);
  const deform1_5 = useSharedValue(0);
  const deform1_6 = useSharedValue(0);
  const deform1_7 = useSharedValue(0);
  const deform1_8 = useSharedValue(0);
  const deform1 = [
    deform1_1,
    deform1_2,
    deform1_3,
    deform1_4,
    deform1_5,
    deform1_6,
    deform1_7,
    deform1_8,
  ];

  // Outer Deformations - Circle 2
  const deform2_1 = useSharedValue(0);
  const deform2_2 = useSharedValue(0);
  const deform2_3 = useSharedValue(0);
  const deform2_4 = useSharedValue(0);
  const deform2_5 = useSharedValue(0);
  const deform2_6 = useSharedValue(0);
  const deform2_7 = useSharedValue(0);
  const deform2_8 = useSharedValue(0);
  const deform2 = [
    deform2_1,
    deform2_2,
    deform2_3,
    deform2_4,
    deform2_5,
    deform2_6,
    deform2_7,
    deform2_8,
  ];

  // Outer Deformations - Circle 3
  const deform3_1 = useSharedValue(0);
  const deform3_2 = useSharedValue(0);
  const deform3_3 = useSharedValue(0);
  const deform3_4 = useSharedValue(0);
  const deform3_5 = useSharedValue(0);
  const deform3_6 = useSharedValue(0);
  const deform3_7 = useSharedValue(0);
  const deform3_8 = useSharedValue(0);
  const deform3 = [
    deform3_1,
    deform3_2,
    deform3_3,
    deform3_4,
    deform3_5,
    deform3_6,
    deform3_7,
    deform3_8,
  ];

  // Outer Deformations - Circle 4
  const deform4_1 = useSharedValue(0);
  const deform4_2 = useSharedValue(0);
  const deform4_3 = useSharedValue(0);
  const deform4_4 = useSharedValue(0);
  const deform4_5 = useSharedValue(0);
  const deform4_6 = useSharedValue(0);
  const deform4_7 = useSharedValue(0);
  const deform4_8 = useSharedValue(0);
  const deform4 = [
    deform4_1,
    deform4_2,
    deform4_3,
    deform4_4,
    deform4_5,
    deform4_6,
    deform4_7,
    deform4_8,
  ];

  // Outer Deformations - Circle 5
  const deform5_1 = useSharedValue(0);
  const deform5_2 = useSharedValue(0);
  const deform5_3 = useSharedValue(0);
  const deform5_4 = useSharedValue(0);
  const deform5_5 = useSharedValue(0);
  const deform5_6 = useSharedValue(0);
  const deform5_7 = useSharedValue(0);
  const deform5_8 = useSharedValue(0);
  const deform5 = [
    deform5_1,
    deform5_2,
    deform5_3,
    deform5_4,
    deform5_5,
    deform5_6,
    deform5_7,
    deform5_8,
  ];

  const deformations = [deform1, deform2, deform3, deform4, deform5].slice(
    0,
    numCircles
  );

  // Inner Deformations - Circle 1
  const innerDeform1_1 = useSharedValue(0);
  const innerDeform1_2 = useSharedValue(0);
  const innerDeform1_3 = useSharedValue(0);
  const innerDeform1_4 = useSharedValue(0);
  const innerDeform1_5 = useSharedValue(0);
  const innerDeform1_6 = useSharedValue(0);
  const innerDeform1_7 = useSharedValue(0);
  const innerDeform1_8 = useSharedValue(0);
  const innerDeform1 = [
    innerDeform1_1,
    innerDeform1_2,
    innerDeform1_3,
    innerDeform1_4,
    innerDeform1_5,
    innerDeform1_6,
    innerDeform1_7,
    innerDeform1_8,
  ];

  // Inner Deformations - Circle 2
  const innerDeform2_1 = useSharedValue(0);
  const innerDeform2_2 = useSharedValue(0);
  const innerDeform2_3 = useSharedValue(0);
  const innerDeform2_4 = useSharedValue(0);
  const innerDeform2_5 = useSharedValue(0);
  const innerDeform2_6 = useSharedValue(0);
  const innerDeform2_7 = useSharedValue(0);
  const innerDeform2_8 = useSharedValue(0);
  const innerDeform2 = [
    innerDeform2_1,
    innerDeform2_2,
    innerDeform2_3,
    innerDeform2_4,
    innerDeform2_5,
    innerDeform2_6,
    innerDeform2_7,
    innerDeform2_8,
  ];

  // Inner Deformations - Circle 3
  const innerDeform3_1 = useSharedValue(0);
  const innerDeform3_2 = useSharedValue(0);
  const innerDeform3_3 = useSharedValue(0);
  const innerDeform3_4 = useSharedValue(0);
  const innerDeform3_5 = useSharedValue(0);
  const innerDeform3_6 = useSharedValue(0);
  const innerDeform3_7 = useSharedValue(0);
  const innerDeform3_8 = useSharedValue(0);
  const innerDeform3 = [
    innerDeform3_1,
    innerDeform3_2,
    innerDeform3_3,
    innerDeform3_4,
    innerDeform3_5,
    innerDeform3_6,
    innerDeform3_7,
    innerDeform3_8,
  ];

  // Inner Deformations - Circle 4
  const innerDeform4_1 = useSharedValue(0);
  const innerDeform4_2 = useSharedValue(0);
  const innerDeform4_3 = useSharedValue(0);
  const innerDeform4_4 = useSharedValue(0);
  const innerDeform4_5 = useSharedValue(0);
  const innerDeform4_6 = useSharedValue(0);
  const innerDeform4_7 = useSharedValue(0);
  const innerDeform4_8 = useSharedValue(0);
  const innerDeform4 = [
    innerDeform4_1,
    innerDeform4_2,
    innerDeform4_3,
    innerDeform4_4,
    innerDeform4_5,
    innerDeform4_6,
    innerDeform4_7,
    innerDeform4_8,
  ];

  // Inner Deformations - Circle 5
  const innerDeform5_1 = useSharedValue(0);
  const innerDeform5_2 = useSharedValue(0);
  const innerDeform5_3 = useSharedValue(0);
  const innerDeform5_4 = useSharedValue(0);
  const innerDeform5_5 = useSharedValue(0);
  const innerDeform5_6 = useSharedValue(0);
  const innerDeform5_7 = useSharedValue(0);
  const innerDeform5_8 = useSharedValue(0);
  const innerDeform5 = [
    innerDeform5_1,
    innerDeform5_2,
    innerDeform5_3,
    innerDeform5_4,
    innerDeform5_5,
    innerDeform5_6,
    innerDeform5_7,
    innerDeform5_8,
  ];

  const innerDeformations = [
    innerDeform1,
    innerDeform2,
    innerDeform3,
    innerDeform4,
    innerDeform5,
  ].slice(0, numCircles);

  return {
    rotations,
    innerRotations,
    deformations,
    innerDeformations,
  };
};

const AIPromptCircle = ({
  size = 300,
  circles = [defaultCircleConfig],
}: AIPromptCircleProps) => {
  const centerX = size / 2;
  const centerY = size / 2;
  const containerRef = React.useRef<View>(null);
  const [isVisible, setIsVisible] = React.useState(false);

  // Base animation
  const progress = useSharedValue(0);

  // Create SharedValues for all circles
  const { rotations, innerRotations, deformations, innerDeformations } =
    useCircleAnimations(circles.length);

  // Observe intersection
  React.useEffect(() => {
    if (typeof window === "undefined") return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          setIsVisible(entry.isIntersecting);
        });
      },
      {
        root: null,
        rootMargin: "0px",
        threshold: 0.1, // 10% visibility is enough to start
      }
    );

    const element = containerRef.current;
    if (element) {
      // @ts-ignore - React Native Web renders a div
      observer.observe(element);
    }

    return () => {
      if (element) {
        // @ts-ignore - React Native Web renders a div
        observer.unobserve(element);
      }
    };
  }, []);

  // Animate values
  useEffect(() => {
    const defaultDuration = defaultCircleConfig.duration ?? 3000;

    if (!isVisible) {
      // Stop all animations if not visible
      cancelAnimation(progress);
      rotations.forEach((rotation) => {
        cancelAnimation(rotation);
      });
      innerRotations.forEach((rotation) => {
        cancelAnimation(rotation);
      });
      deformations.forEach((deforms) => {
        deforms.forEach((deform) => {
          cancelAnimation(deform);
        });
      });
      innerDeformations.forEach((deforms) => {
        deforms.forEach((deform) => {
          cancelAnimation(deform);
        });
      });
      return;
    }

    // Smoothly reset all values before restarting animations
    const resetDuration = defaultDuration * 0.2; // 20% of normal duration for reset

    // Reset progress
    progress.value = withTiming(0, {
      duration: resetDuration,
      easing: Easing.inOut(Easing.ease),
    });

    // Reset rotations
    rotations.forEach((rotation) => {
      rotation.value = withTiming(0, {
        duration: resetDuration,
        easing: Easing.inOut(Easing.ease),
      });
    });
    innerRotations.forEach((rotation) => {
      rotation.value = withTiming(0, {
        duration: resetDuration,
        easing: Easing.inOut(Easing.ease),
      });
    });

    // Reset deformations
    deformations.forEach((deforms) => {
      deforms.forEach((deform) => {
        deform.value = withTiming(0, {
          duration: resetDuration,
          easing: Easing.inOut(Easing.ease),
        });
      });
    });
    innerDeformations.forEach((deforms) => {
      deforms.forEach((deform) => {
        deform.value = withTiming(0, {
          duration: resetDuration,
          easing: Easing.inOut(Easing.ease),
        });
      });
    });

    // Start main animations after reset
    const startMainAnimations = setTimeout(() => {
      // Base animation
      progress.value = withRepeat(
        withTiming(1, {
          duration: circles[0]?.duration ?? defaultDuration,
          easing: Easing.linear,
        }),
        -1,
        false
      );

      // Animate each circle
      circles.forEach((circle, i) => {
        const config = circles[i] ?? defaultCircleConfig;
        const duration = config.duration ?? defaultDuration;
        const rotation = rotations[i];
        const innerRotation = innerRotations[i];
        const circleDeformations = deformations[i];
        const circleInnerDeformations = innerDeformations[i];

        if (
          !rotation ||
          !innerRotation ||
          !circleDeformations ||
          !circleInnerDeformations
        ) {
          return;
        }

        // Outer circle rotation
        const direction = i % 2 === 0 ? 1 : -1;
        const speedFactor = 5 + i * 1.5;

        rotation.value = withRepeat(
          withTiming(direction * Math.PI * 2, {
            duration: duration * speedFactor,
            easing: Easing.linear,
          }),
          -1,
          false
        );

        // Inner circle rotation
        const innerDirection = i % 2 === 0 ? -1 : 1;
        const innerSpeedFactor = 4.5 + i * 1.2;

        innerRotation.value = withRepeat(
          withTiming(innerDirection * Math.PI * 2, {
            duration: duration * innerSpeedFactor,
            easing: Easing.linear,
          }),
          -1,
          false
        );

        // Outer circle deformations
        circleDeformations.forEach((deform, j) => {
          const baseSpeed = 1.2 + (i * 0.3 + j * 0.08);
          deform.value = withRepeat(
            withTiming(1, {
              duration: duration * baseSpeed,
              easing: Easing.inOut(Easing.sin),
            }),
            -1,
            true
          );
        });

        // Inner circle deformations
        circleInnerDeformations.forEach((deform, j) => {
          const baseSpeed = 1.4 + (i * 0.2 + j * 0.06);
          deform.value = withRepeat(
            withTiming(1, {
              duration: duration * baseSpeed,
              easing: Easing.inOut(Easing.sin),
            }),
            -1,
            true
          );
        });
      });
    }, resetDuration);

    // Cleanup
    return () => {
      clearTimeout(startMainAnimations);
    };
  }, [
    isVisible,
    progress,
    circles,
    rotations,
    innerRotations,
    deformations,
    innerDeformations,
  ]);

  return (
    <View
      ref={containerRef}
      style={[styles.container, { width: size, height: size }]}
    >
      <Svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
        <Defs>
          {circles.map((circle, i) => (
            <LinearGradient
              key={`gradient${i + 1}`}
              id={`gradient${i + 1}`}
              x1="0%"
              y1="0%"
              x2="100%"
              y2="0%"
            >
              <Stop offset="0%" stopColor={circle.colors[0]} />
              <Stop offset="100%" stopColor={circle.colors[1]} />
            </LinearGradient>
          ))}

          {/* Masks to create border effect for each circle */}
          {circles.map((circle, i) => {
            const circleInnerDeformations = innerDeformations[i];
            const innerRotation = innerRotations[i];
            if (!circleInnerDeformations || !innerRotation || !circle.hollow)
              return null;

            const baseRadius =
              size *
              (circle.radiusRatio ?? defaultCircleConfig.radiusRatio ?? 0.3);
            const borderWidth =
              circle.borderWidth ?? defaultCircleConfig.borderWidth ?? 8;
            const deformationRatio =
              circle.deformationRatio ??
              defaultCircleConfig.deformationRatio ??
              0.25;

            // Calculate inner mask radius with safety margin
            const safetyMargin = Math.max(3, borderWidth * 0.2); // Increased to 20% and minimum 3px
            const rawInnerRadius = baseRadius - borderWidth - safetyMargin;

            // Reduce inner deformation amplitude
            const radiusRatio = rawInnerRadius / baseRadius;
            const innerDeformationRatio =
              deformationRatio * Math.min(0.7, radiusRatio * 0.8);

            // Calculate maximum possible deformations
            const outerMaxDeformation = baseRadius * deformationRatio;
            const innerMaxDeformation = rawInnerRadius * innerDeformationRatio;

            // Adjust inner radius with more conservative margin
            const deformationDiff = Math.abs(
              outerMaxDeformation - innerMaxDeformation
            );
            const safeInnerRadius = rawInnerRadius - deformationDiff * 0.75; // More conservative

            return (
              <Mask key={`mask${i + 1}`} id={`mask${i + 1}`}>
                <Rect x="0" y="0" width={size} height={size} fill="white" />
                <MorphingCircle
                  key={`innerMask${i + 1}`}
                  radius={safeInnerRadius}
                  centerX={centerX}
                  centerY={centerY}
                  deformations={circleInnerDeformations}
                  rotation={innerRotation}
                  gradientId={`gradient${i + 1}`}
                  deformationRatio={innerDeformationRatio}
                  opacity={1}
                  fill="black"
                />
              </Mask>
            );
          })}
        </Defs>

        {/* Morphing circles */}
        {circles.map((circle, i) => {
          const circleDeformations = deformations[i];
          const rotation = rotations[i];
          if (!circleDeformations || !rotation) return null;

          const baseRadius =
            size *
            (circle.radiusRatio ?? defaultCircleConfig.radiusRatio ?? 0.3);
          const deformationRatio =
            circle.deformationRatio ??
            defaultCircleConfig.deformationRatio ??
            0.25;

          return (
            <MorphingCircle
              key={`circle${i + 1}`}
              radius={baseRadius}
              centerX={centerX}
              centerY={centerY}
              deformations={circleDeformations}
              rotation={rotation}
              gradientId={`gradient${i + 1}`}
              deformationRatio={deformationRatio}
              opacity={circle.opacity ?? defaultCircleConfig.opacity ?? 0.8}
              mask={circle.hollow ? `url(#mask${i + 1})` : undefined}
            />
          );
        })}
      </Svg>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
  },
});

export default AIPromptCircle;
