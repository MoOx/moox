import * as React from "react";
import { Animated, LayoutChangeEvent, Pressable, View } from "react-native";

export default function Accordion({
  pressable,
  children,
}: {
  pressable: (expanded: boolean) => React.ReactNode;
  children: React.ReactNode;
}) {
  const [expanded, setExpanded] = React.useState(false);
  const handlePress = React.useCallback(
    () => setExpanded((expanded) => !expanded),
    [],
  );

  const [maxHeight, setMaxHeight] = React.useState<number | null>(null);
  const handleLayout = React.useCallback((event: LayoutChangeEvent) => {
    setMaxHeight(event.nativeEvent.layout.height);
  }, []);
  const animatedHeightValue = React.useRef(new Animated.Value(0)).current;
  React.useEffect(() => {
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
