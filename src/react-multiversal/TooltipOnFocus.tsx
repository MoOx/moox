import * as React from "react";
import {
  LayoutChangeEvent,
  Pressable,
  PressableProps,
  StyleProp,
  useWindowDimensions,
  View,
  ViewStyle,
} from "react-native";
import { Animated } from "react-native";

import { Portal } from "@/react-multiversal/Portal";
import {
  calculateOptimalPosition,
  getArrowStyle,
  PositionName,
} from "@/react-multiversal/positions.utils";

function TooltipContent({
  arrowOffset = 8,
  arrowSize = 6,
  borderRadius = 6,
  arrowStyle,
  children,
  onLayout,
  position,
  style = {
    filter: `0 0 1px rgba(0,0,0, 0.2), 0 0 10px rgba(0,0,0, 0.1)`,
  },
  backgroundColor = "#414141",
}: {
  arrowOffset?: number;
  arrowSize?: number;
  borderRadius?: number;
  arrowStyle?: StyleProp<ViewStyle>;
  children: React.ReactNode;
  onLayout?: (event: LayoutChangeEvent) => void;
  position?: PositionName;
  style?: StyleProp<ViewStyle>;
  backgroundColor?: string;
}) {
  return (
    <Animated.View
      onLayout={onLayout}
      style={[
        style,
        {
          pointerEvents: "none",
          // margin is used to not affect width and height of the tooltip
          marginTop: position?.includes("top-")
            ? -arrowSize
            : position?.includes("bottom-")
              ? arrowSize
              : 0,
          marginLeft: position?.includes("left-")
            ? -arrowSize
            : position?.includes("right-")
              ? arrowSize
              : 0,
        },
      ]}
    >
      <View
        style={{
          backgroundColor,
          borderRadius,
        }}
      >
        {children}
        {!position ? null : (
          <View
            style={[
              getArrowStyle({
                position,
                color: backgroundColor,
                arrowSize,
                arrowOffset,
              }),
              arrowStyle,
            ]}
          />
        )}
      </View>
    </Animated.View>
  );
}

// This component will place the tooltip props near the element when focus/hover is detected
// It will also calculate the best position to place the tooltip with a preferred position if provided
// It will also recalculate the position on scroll and window resize etc
export default React.forwardRef(function TooltipOnFocus(
  {
    children,
    tooltip,
    size,
    preferredPositions,
    arrowOffset = 8,
    arrowSize = 6,
    borderRadius = 6,
    tooltipStyle,
    delay = 150,
    ...props
  }: PressableProps & {
    children: React.ReactNode;
    tooltip: React.ReactNode;
    size?: {
      width: number;
      height: number;
    };
    preferredPositions?: PositionName[];
    arrowOffset?: number;
    arrowSize?: number;
    borderRadius?: number;
    tooltipStyle?: StyleProp<ViewStyle>;
    delay?: number;
  },
  ref: React.Ref<View>
) {
  const windowDimensions = useWindowDimensions();

  const portalId = React.useId();

  const initialTooltipSize = React.useRef({
    width: size?.width,
    height: size?.height,
  });
  const [tooltipSize, setTooltipSize] = React.useState(
    initialTooltipSize.current
  );
  const [coords, setCoords] = React.useState<{
    x: number;
    y: number;
    usedPosition?: PositionName;
  }>({ x: 0, y: 0, usedPosition: undefined });

  const internalRef = React.useRef<View>(null);
  React.useEffect(() => {
    if (typeof ref === "function") {
      ref(internalRef.current);
    } else if (ref && internalRef.current) {
      (ref as React.MutableRefObject<View>).current = internalRef.current;
    }
  }, [ref]);

  // trigger an update onLayout (when the container is ready)
  // there are also below this, other triggers for update
  const handleContainerLayout = React.useCallback(() => {
    if (internalRef.current) {
      internalRef.current.measureInWindow((x, y, width, height) => {
        if (
          initialTooltipSize.current.width !== undefined &&
          initialTooltipSize.current.height !== undefined
        ) {
          const bestTooltipPosition = calculateOptimalPosition({
            window: {
              width: windowDimensions.width,
              height: windowDimensions.height,
            },
            referenceItem: { width, height, x, y },
            itemToPlace: {
              width: initialTooltipSize.current?.width,
              height: initialTooltipSize.current?.height,
            },
            preferredPositions,
          });
          if (!bestTooltipPosition) {
            setCoords({ x: 0, y: 0, usedPosition: undefined });
            setTooltipSize({ width: undefined, height: undefined });
            return;
          }
          setCoords({
            usedPosition: bestTooltipPosition.usedPosition,
            x: bestTooltipPosition.x,
            y: bestTooltipPosition.y,
          });
          setTooltipSize({
            width: bestTooltipPosition.width,
            height: bestTooltipPosition.height,
          });
        }
      });
    }
  }, [preferredPositions, windowDimensions]);

  // retrigger update on window resize
  React.useEffect(() => {
    if (
      initialTooltipSize.current.width !== undefined &&
      initialTooltipSize.current.height !== undefined
    ) {
      handleContainerLayout();
    }
  }, [handleContainerLayout, windowDimensions]);

  // retrigger update on all scroll events
  // as the relative position to the viewport is changing
  React.useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          handleContainerLayout();
          ticking = false;
        });
        ticking = true;
      }
    };
    const opts = {
      capture: true,
      passive: true,
    };
    window.addEventListener("scroll", handleScroll, opts);
    return () => {
      window.removeEventListener("scroll", handleScroll, opts);
    };
  }, [handleContainerLayout]);

  const handleTooltipLayout = React.useCallback(
    (event: LayoutChangeEvent) => {
      if (event.nativeEvent.layout.width > 0) {
        const size = {
          width: event.nativeEvent.layout.width,
          height: event.nativeEvent.layout.height,
        };
        if (
          initialTooltipSize.current.width === undefined ||
          initialTooltipSize.current.height === undefined
        ) {
          // workaround to avoid minor rendering issue in some browser due to rounding issue
          initialTooltipSize.current = {
            width: size.width + 1,
            height: size.height + 1,
          };
        }
        setTooltipSize(size);
        if (!coords.x || !coords.y) {
          handleContainerLayout();
        }
      }
    },
    [coords, handleContainerLayout]
  );
  // reset the tooltip size when the tooltip is changed
  // React.useEffect(() => {
  //   if (tooltip) {
  //     requestAnimationFrame(() => {
  //       initialTooltipSize.current = {
  //         width: undefined,
  //         height: undefined,
  //       };
  //       setTooltipSize(initialTooltipSize.current);
  //     });
  //   }
  // }, [tooltip]);

  const showHiddenTooltipToGetSize =
    tooltipSize.width === undefined || tooltipSize.height === undefined;

  const [focused, setFocused] = React.useState(false);
  const timeoutFocusedRef = React.useRef<null | NodeJS.Timeout>(null);
  const handleFocus = React.useCallback(() => {
    if (timeoutFocusedRef.current) clearTimeout(timeoutFocusedRef.current);
    timeoutFocusedRef.current = setTimeout(() => setFocused(true), delay);
  }, [delay]);
  const handleBlur = React.useCallback(() => {
    if (timeoutFocusedRef.current) clearTimeout(timeoutFocusedRef.current);
    setFocused(false);
  }, []);

  const showTip = tooltip && (focused || showHiddenTooltipToGetSize);

  return (
    <>
      <Pressable
        {...props}
        ref={internalRef}
        onLayout={handleContainerLayout}
        onPointerEnter={handleFocus}
        onPointerLeave={handleBlur}
        onFocus={handleFocus}
        onBlur={handleBlur}
      >
        {children}
      </Pressable>
      {!showTip ? null : (
        <Portal id={portalId}>
          <TooltipContent
            arrowOffset={arrowOffset}
            arrowSize={arrowSize}
            borderRadius={borderRadius}
            onLayout={handleTooltipLayout}
            position={coords.usedPosition}
            style={[
              tooltipStyle,
              {
                position: "absolute",
                top: coords.y,
                left: coords.x,
                width: tooltipSize.width,
                height: tooltipSize.height,
                opacity: showHiddenTooltipToGetSize ? 0 : 1,
              },
            ]}
          >
            {tooltip}
          </TooltipContent>
        </Portal>
      )}
    </>
  );
});
