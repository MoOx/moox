import { ReactNode, useCallback, useEffect, useRef, useState } from "react";
import { Animated, LayoutChangeEvent, Pressable, View } from "react-native";

export default function Accordion({
  pressable,
  children,
}: {
  pressable: (expanded: boolean) => ReactNode;
  children: ReactNode;
}) {
  const [expanded, setExpanded] = useState(false);
  const handlePress = useCallback(
    () => setExpanded((expanded) => !expanded),
    [],
  );

  const [maxHeight, setMaxHeight] = useState<number | null>(null);
  const handleLayout = useCallback((event: LayoutChangeEvent) => {
    setMaxHeight(event.nativeEvent.layout.height);
  }, []);
  const animatedHeightValue = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    if (maxHeight) {
      Animated.timing(animatedHeightValue, {
        toValue: expanded ? maxHeight : 0,
        duration: 300,
        useNativeDriver: false,
      }).start();
    }
  }, [expanded, animatedHeightValue, maxHeight]);

  return (
    <>
      <Pressable onPress={handlePress}>{pressable(expanded)}</Pressable>
      <Animated.View
        style={
          maxHeight ? { height: animatedHeightValue, overflow: "hidden" } : {}
        }
      >
        <View onLayout={handleLayout}>{children}</View>
      </Animated.View>
    </>
  );
}
