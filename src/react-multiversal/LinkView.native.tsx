import { useExternalLinkPress, useInternalLinkPress } from "@/react-multiversal/LinkPress";
import { isInternalLink, LinkTextProps } from "@/react-multiversal/LinkText.types";
import { Ref } from "react";
import {
  GestureResponderEvent,
  Pressable,
  PressableProps,
  StyleProp,
  Text,
  View,
  ViewStyle,
} from "react-native";

/**
 * The same contract as the web `LinkView`, but built on a view rather than on
 * `TextProps`: the styles are `ViewStyle` (a text style would not reach the
 * children on a device anyway), and the handlers are the ones a view has.
 *
 * `isActive`, `underline` and `underlineOnFocus` stay in the type so a call
 * site can keep passing them for the web, but a view has no text to decorate
 * and no anchor to mark current, so they are dropped rather than forwarded.
 */
export type LinkViewProps = Omit<PressableProps, "style" | "onPress"> & {
  /**
   * Typed as the web half types it, on purpose. A caller that keeps a ref
   * (`WebsiteMenu` measures its trigger, `AvailabilityBadge` focuses one)
   * writes that ref once, for both platforms; the node behind it is a
   * `Pressable` here and an anchor there, and neither call site cares.
   */
  ref?: Ref<Text>;
  href: string;
  style?: StyleProp<ViewStyle>;
  containerStyle?: StyleProp<ViewStyle>;
  isActive?: LinkTextProps["isActive"];
  underline?: boolean;
  underlineOnFocus?: boolean;
  onPress?: LinkTextProps["onPress"];
};

/**
 * Native half of `LinkView.tsx` - read that file for what a link-shaped box is
 * for. The web version is a `Text` flipped to `display: flex`, because an
 * anchor is the one element that is both a link and able to wrap a layout.
 * Neither half of that holds on a device: `display` does not exist in Yoga, and
 * a `View` nested in a `Text` is laid out inline, at a fixed size, outside the
 * flex flow - which is why the boxes came out wrong.
 *
 * So the native link is a `Pressable`: an ordinary view, laid out like any
 * other, carrying the navigation the anchor carried. `role="link"` keeps the
 * announcement, and a `Pressable` is accessible by default, so the whole box is
 * one target instead of one per text node inside it.
 */
function LinkPressable({
  ref,
  role = "link",
  href,
  style,
  containerStyle,
  // Web-only props, absorbed here so they never reach a view that has no use
  // for them (see the type above).
  isActive: _isActive,
  underline: _underline,
  underlineOnFocus: _underlineOnFocus,
  onPress: _onPress,
  handlePress,
  ...props
}: LinkViewProps & { handlePress: (event: GestureResponderEvent) => void }) {
  return (
    <Pressable
      // The ref is declared as the web's `Text` (see the type above); the node
      // it lands on here is the `Pressable`'s view.
      ref={ref as unknown as Ref<View>}
      role={role}
      // Not a native prop, and ignored by the view: it is kept because it is
      // what says where this box goes, to a test (`navigation.test.tsx` finds
      // links by href) as much as to anyone reading the tree.
      href={href}
      onPress={handlePress}
      style={[containerStyle, style]}
      {...props}
    />
  );
}

function InternalLinkView(props: LinkViewProps) {
  const handlePress = useInternalLinkPress(props.href, props.onPress);
  return <LinkPressable {...props} handlePress={handlePress} />;
}

function ExternalLinkView(props: LinkViewProps) {
  const handlePress = useExternalLinkPress(props.href, props.onPress);
  return <LinkPressable {...props} handlePress={handlePress} />;
}

export default function LinkView(props: LinkViewProps) {
  // Two components, not one branch: the internal half subscribes to the router
  // and the external half must not.
  return isInternalLink(props.href) ? (
    <InternalLinkView {...props} />
  ) : (
    <ExternalLinkView {...props} />
  );
}
