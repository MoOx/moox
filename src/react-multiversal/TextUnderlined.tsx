import * as React from "react";
import { Text, TextStyle } from "react-native";
import type { TextProps } from "react-native";

import { useFocus } from "@/react-multiversal/useFocus";

export type TextUnderlinedProps = TextProps & {
  ref?: React.RefObject<Text> | React.Ref<Text> | React.RefCallback<Text>;
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
  const internalRef = React.useRef<Text | null>(null);
  const setRefs = React.useCallback(
    (element: Text | null) => {
      internalRef.current = element;
      if (ref && "current" in ref) {
        (ref as React.RefObject<Text | null>).current = element;
      } else if (ref && typeof ref === "function") {
        ref(element);
      }
    },
    [ref]
  );

  const [hasAnyFocus] = useFocus<Text>(internalRef);

  return (
    <Text
      ref={setRefs}
      {...props}
      style={[
        {
          textDecorationLine:
            underline || (underlineOnFocus && hasAnyFocus)
              ? "underline"
              : "none",
        } as TextStyle,
        _style,
      ]}
    />
  );
}
