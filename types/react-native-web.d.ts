// override react-native types with react-native-web types
import "react-native";
import * as ReactNativeWeb from "@types/react-native-web";

declare module "react-native" {
  type role =
    | ReactNativeWeb.TextProps["role"]
    | "article"
    | "banner"
    | "blockquote"
    | "button"
    | "code"
    | "complementary"
    | "contentinfo"
    | "deletion"
    | "emphasis"
    | "figure"
    | "insertion"
    | "form"
    | "list"
    | "listitem"
    | "main"
    | "navigation"
    | "paragraph"
    | "region"
    | "strong";

  // interface AccessibilityProps extends ReactNativeWeb.AccessibilityProps {
  //   role?: role;
  // }
  //   type displayTable =
  //     | "table"
  //     | "table-caption"
  //     | "table-column-group"
  //     | "table-header-group"
  //     | "table-footer-group"
  //     | "table-row-group"
  //     | "table-cell"
  //     | "table-column"
  //     | "table-row";
  // interface ViewStyle extends Omit<ReactNativeWeb.ViewStyle, keyof ViewStyle> {}
  // interface TextStyle extends Omit<ReactNativeWeb.TextStyle, keyof TextStyle> {}
  // interface ImageStyle extends Omit<ReactNativeWeb.ImageStyle, keyof ImageStyle> {}
  interface ViewProps extends ReactNativeWeb.ViewProps {
    suppressHydrationWarning?: boolean;
    role?: role;
  }
  interface TextProps extends ReactNativeWeb.TextProps {
    suppressHydrationWarning?: boolean;
    role?: role;
  }
  // interface TextInputProps extends ReactNativeWeb.TextInputProps {}
  // interface TouchableOpacityProps
  //   extends ReactNativeWeb.TouchableOpacityProps {}
  // interface TouchableHighlightProps
  //   extends ReactNativeWeb.TouchableHighlightProps {}
  // interface SwitchProps extends ReactNativeWeb.SwitchProps {}

  // interface PressableStateCallbackType
  //   extends ReactNativeWeb.PressableStateCallbackType {}

  // interface AccessibilityRole extends ReactNativeWeb

  // namespace AppRegistry {
  //   export function getApplication(
  //     appName: string
  //   ): ReactNativeWeb.AppRegistry.Application;
  // }
}

// declare module "react-native-web" {
//   export * from "@types/react-native-web";
// }
