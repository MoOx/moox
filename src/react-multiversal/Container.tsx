import { ReactNode } from "react";
import {
  Platform,
  StyleProp,
  StyleSheet,
  View,
  ViewProps,
  ViewStyle,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const styles = StyleSheet.create({
  wrapper: {
    // flexGrow: 1,
    flexShrink: 1,
    width: "100%",
    overflow: "hidden",
    alignItems: "center",
  },
  container: {
    justifyContent: "center",
    flexGrow: 1,
    flexShrink: 1,
    width: "100%",
  },
});

export default function Container({
  wrapperStyle,
  style,
  maxWidth = 1024,
  children,
  ...props
}: ViewProps & {
  wrapperStyle?: StyleProp<ViewStyle>;
  style?: StyleProp<ViewStyle>;
  maxWidth?: number;
  children: ReactNode;
}) {
  return (
    <View style={[styles.wrapper, wrapperStyle]} {...props}>
      {Platform.OS === "web" ? (
        <View
          style={[
            styles.container,
            { maxWidth },
            {
              paddingLeft: "env(safe-area-inset-left)",
              paddingRight: "env(safe-area-inset-right)",
            },
            style,
          ]}
        >
          {children}
        </View>
      ) : (
        <SafeAreaView
          edges={{ bottom: "off", top: "off" }}
          style={[styles.container, { maxWidth }, style]}
        >
          {children}
        </SafeAreaView>
      )}
    </View>
  );
}
