import { useTheme } from "@/styles";
import { ReactNode } from "react";
import { ScrollView, StyleSheet } from "react-native";

const styles = StyleSheet.create({
  root: { flexGrow: 1, flexShrink: 1 },
});

/**
 * The scroller every screen renders.
 *
 * On the web the *document* scrolls, which is why no page in `src/pages`
 * renders a scroller of its own. There is no document here, so somebody has
 * to, and it is this file rather than the pages - that is what keeps them
 * mountable by both sides.
 *
 * `contentInsetAdjustmentBehavior="automatic"` is what hands the scroll offset
 * to UIKit, and therefore what makes the native tab bar's scroll-edge effect
 * and its `minimizeBehavior` work at all. Without it the bar never reacts and
 * the content runs under it.
 */
export default function Screen({ children }: { children: ReactNode }) {
  const theme = useTheme();
  return (
    <ScrollView
      contentInsetAdjustmentBehavior="automatic"
      style={[styles.root, theme.styles.back]}
    >
      {children}
    </ScrollView>
  );
}
