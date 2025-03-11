import * as React from "react";
import { Text, TextStyle } from "react-native";
import type { TextProps } from "react-native";

import { useFocus } from "@/react-multiversal/useFocus";

export default function TextUnderlined({
  ref,
  href,
  underline = false,
  underlineOnFocus = false,
  ...props
}: TextProps & {
  ref?: React.RefObject<Text | null>;
  href?: string;
  underline?: boolean;
  underlineOnFocus?: boolean;
}) {
  const internalRef = React.useRef<Text | null>(null);
  const setRefs = React.useCallback(
    (element: Text | null) => {
      internalRef.current = element;
      if (ref && "current" in ref) {
        (ref as React.RefObject<Text | null>).current = element;
      }
    },
    [ref]
  );

  const [hasAnyFocus] = useFocus<Text>(internalRef);

  const style = [
    {
      textDecorationLine:
        underline || (underlineOnFocus && hasAnyFocus) ? "underline" : "none",
    } as TextStyle,
    props.style,
  ];

  return <Text ref={setRefs} href={href} {...props} style={style} />;
}
