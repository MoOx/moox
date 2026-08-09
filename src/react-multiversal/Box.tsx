import { Size, spaceStyleGap, spaceStyleHorizontal, spaceStyleVertical } from "@/react-multiversal";
import { View, ViewProps } from "react-native";

/**
 * A `View` that carries its own spacing, so spacing never needs a node of its
 * own. `p` sets both axes; `px` / `py` override one.
 *
 * The point is the merge: padding and looks live on the *same* element, where
 * `SpacedView` forced a wrapper around whatever held the border-radius. A
 * positive size is padding, a negative one is a margin (`p="-m"`), which is the
 * pre-existing convention of the spacing scale.
 */
export default function Box({
  p,
  px,
  py,
  gap,
  style,
  ...props
}: ViewProps & {
  p?: Size;
  px?: Size;
  py?: Size;
  gap?: Size;
}) {
  return (
    <View
      {...props}
      style={[
        spaceStyleVertical(py ?? p),
        spaceStyleHorizontal(px ?? p),
        spaceStyleGap(gap),
        style,
      ]}
    />
  );
}
