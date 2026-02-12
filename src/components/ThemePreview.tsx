import { platformColors } from "@/react-multiversal/colors";
import SpacedView from "@/react-multiversal/SpacedView";
import Spacer from "@/react-multiversal/Spacer";
import { themedColors, useTheme } from "@/styles";
import { View } from "react-native";

export default function ThemePreview({
  mode,
  isActive,
}: {
  mode: "light" | "dark";
  isActive: boolean;
}) {
  const theme = useTheme(mode);
  const borderColor = isActive
    ? mode === "light"
      ? platformColors.ios.light.blue
      : platformColors.ios.dark.blue
    : theme.dynamicColors.textLight2;

  return (
    <View
      style={{
        width: 64,
        height: 64,
        backgroundColor: theme.dynamicColors.back,
        borderRadius: 4,
        overflow: "hidden",
        borderColor,
        borderWidth: 4,
        borderStyle: "solid",
        opacity: isActive ? 1 : 0.5,
      }}
    >
      <SpacedView
        horizontal="xxs"
        vertical="xxs"
        gap="xxs"
        style={[
          theme.styles.back,
          { flexDirection: "row", justifyContent: "space-between" },
        ]}
      >
        <SpacedView
          gap="xxs"
          style={{ flexDirection: "row", alignItems: "center" }}
        >
          <View
            style={{
              width: 6,
              height: 6,
              borderRadius: 8,
              backgroundColor: platformColors.ios.light.blue,
              borderColor: themedColors.dark.backAlt,
              borderWidth: 1,
              borderStyle: "solid",
            }}
          />
          <View
            style={{
              width: 10,
              height: 3,
              borderRadius: 6,
              backgroundColor: themedColors.dark.textLight2,
            }}
          />
        </SpacedView>
        <View
          style={{
            width: 12,
            height: 6,
            borderRadius: 6,
            backgroundColor: theme.dynamicColors.backMain,
          }}
        />
      </SpacedView>
      <Spacer />
      <SpacedView horizontal="xxs" vertical="xxs">
        <View style={[theme.styles.backMain, { height: 8, borderRadius: 4 }]} />
      </SpacedView>
    </View>
  );
}
