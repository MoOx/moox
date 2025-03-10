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
  ref?: React.MutableRefObject<Text | null>;
  href?: string;
  underline?: boolean;
  underlineOnFocus?: boolean;
}) {
  const internalRef = React.useRef<Text | null>(null);
  const textRef = React.useCallback(
    (r: Text | null) => {
      internalRef.current = r;
      if (ref) {
        ref.current = r;
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

  return <Text ref={textRef} href={href} {...props} style={style} />;
}
