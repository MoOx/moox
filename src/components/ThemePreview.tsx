import { platformColors } from "@/react-multiversal/colors";
import Box from "@/react-multiversal/Box";
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
    : theme.dynamicColors.ultraLight;

  return (
    <View
      style={{
        width: 64,
        height: 64,
        backgroundColor: theme.dynamicColors.back,
        borderRadius: 8,
        overflow: "hidden",
        borderColor,
        borderWidth: 3,
        borderStyle: "solid",
        opacity: isActive ? 1 : 0.5,
      }}
    >
      <Box
        p="xxs"
        gap="xxs"
        style={[
          theme.styles.back,
          {
            borderRadius: 8,
            flexDirection: "row",
            justifyContent: "space-between",
          },
        ]}
      >
        <Box gap="xxs" style={{ flexDirection: "row", alignItems: "center" }}>
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
        </Box>
        <View
          style={{
            width: 12,
            height: 6,
            borderRadius: 6,
            backgroundColor: theme.dynamicColors.backMain,
          }}
        />
      </Box>
      <Spacer />
      <Box p="xxs">
        <View style={[theme.styles.backMain, { height: 8, borderRadius: 4 }]} />
      </Box>
    </View>
  );
}
