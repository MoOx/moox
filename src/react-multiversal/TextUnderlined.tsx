import { useFocus } from "@/react-multiversal/useFocus";
import { Ref, RefCallback, RefObject, useCallback, useRef } from "react";
import type { TextProps } from "react-native";
import { StyleSheet, Text } from "react-native";

const styles = StyleSheet.create({
  underline: { textDecorationLine: "underline" },
  none: { textDecorationLine: "none" },
});

export type TextUnderlinedProps = TextProps & {
  ref?: RefObject<Text> | Ref<Text> | RefCallback<Text>;
  href?: string;
  underline?: boolean;
  underlineOnFocus?: boolean;
};

export default function TextUnderlined({
  ref,
  underline = false,
  underlineOnFocus = false,
  style: _style,
  ...props
}: TextUnderlinedProps) {
  const internalRef = useRef<Text | null>(null);
  const setRefs = useCallback(
    (element: Text | null) => {
      internalRef.current = element;
      if (ref && "current" in ref) {
        (ref as RefObject<Text | null>).current = element;
      } else if (ref && typeof ref === "function") {
        ref(element);
      }
    },
    [ref],
  );

  const [hasAnyFocus] = useFocus<Text>(internalRef);

  return (
    <Text
      ref={setRefs}
      {...props}
      style={[
        underline || (underlineOnFocus && hasAnyFocus) ? styles.underline : styles.none,
        _style,
      ]}
    />
  );
}
