import ThemePreview from "@/components/ThemePreview";
import { useT } from "@/i18n";
import { white } from "@/react-multiversal/colors";
import ColorSchemeToggle from "@/react-multiversal/ColorSchemeToggle";
import InPlaceOrPortal from "@/react-multiversal/InPlaceOrPortal";
import Box from "@/react-multiversal/Box";
import { UserColorScheme, userColorSchemeStorageKey } from "@/react-multiversal/theme/colorScheme";
import { useSystemColorScheme } from "@/react-multiversal/theme/useSystemColorScheme";
import { useUserColorScheme } from "@/react-multiversal/theme/useUserColorScheme";
import { boxShadows, themedColors, useTheme } from "@/styles";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useCallback, useState } from "react";
import { Text, View } from "react-native";

// Deliberately NOT `lazy()`. This component is rendered by the header of every
// page, so it sits inside the router's single Suspense boundary. A lazy import
// suspends during hydration, which makes React throw away the whole prerendered
// tree and client-render it from scratch: the page goes blank for a few frames
// (only the `html` background is left, i.e. a full-screen flash) and every
// route flashes on load. The chunk was ~12kB of already-bundled deps anyway.

const toggleThemes = {
  theme: {
    light: {
      backgroundColor: "rgb(200,200,200)",
      backgroundBorderColor: "rgb(185,185,185)",
      toggleBorderColor: "rgb(175,175,175)",
      toggleColor: "rgb(255,255,255)",
      toggleIconColor: "rgb(150,150,150)",
      inactiveIconColor: "rgb(255,255,255)",
    },
    dark: {
      backgroundColor: "rgb(30, 30, 30)",
      backgroundBorderColor: "rgb(40, 40, 40)",
      toggleBorderColor: "rgb(50, 50, 50)",
      toggleColor: "rgb(200, 200, 200)",
      toggleIconColor: "rgb(50, 50, 50)",
      inactiveIconColor: "rgb(100,100,100)",
    },
  },
  focusedTheme: {
    light: {
      backgroundColor: themedColors.light.backMain,
      backgroundBorderColor: themedColors.light.backMain,
      toggleBorderColor: themedColors.light.backMain,
      toggleColor: white,
      toggleIconColor: themedColors.light.backMain,
      inactiveIconColor: white,
    },
    dark: {
      backgroundColor: themedColors.dark.backMain,
      backgroundBorderColor: themedColors.dark.backMain,
      toggleBorderColor: themedColors.dark.backMain,
      toggleColor: white,
      toggleIconColor: themedColors.dark.backMain,
      inactiveIconColor: white,
    },
  },
};

export default function ThemeToggle({
  showPreview = false,
  mode = "light",
  size = 32,
}: {
  showPreview?: boolean;
  mode?: "light" | "default";
  size?: number;
}) {
  const colorScheme = useSystemColorScheme();
  const [userColorScheme, setUserColorScheme] = useUserColorScheme();
  const theme = useTheme();
  const t = useT();
  const actualColorScheme = userColorScheme === "auto" ? colorScheme : userColorScheme;
  const handleChange = useCallback(
    (value: UserColorScheme) => {
      void AsyncStorage.setItem(userColorSchemeStorageKey, value);
      void setUserColorScheme(value);
    },
    [setUserColorScheme],
  );

  const [detailsVisible, setDetailsVisible] = useState(false);
  const handleFocus = useCallback(() => {
    setDetailsVisible(true);
  }, [setDetailsVisible]);
  const handleBlur = useCallback(() => {
    setDetailsVisible(false);
  }, [setDetailsVisible]);

  return (
    <View>
      <ColorSchemeToggle
        toggleSize={size}
        iconSize={size * 0.5}
        inactiveIconSize={size * 0.375}
        systemColorScheme={colorScheme}
        value={userColorScheme}
        actualValue={actualColorScheme}
        onChange={handleChange}
        theme={mode === "light" ? toggleThemes.theme : toggleThemes.focusedTheme}
        focusedTheme={toggleThemes.focusedTheme}
        onPointerFocus={handleFocus}
        onPointerLeave={handleBlur}
        onFocus={handleFocus}
        onBlur={handleBlur}
      />
      {!detailsVisible ? null : !showPreview ? null : (
        <InPlaceOrPortal
          id="theme-details"
          onExit={handleBlur}
          inPlaceStyle={[
            theme.styles.backAlt,
            {
              position: "absolute",
              top: 48,
              right: 0,
              borderRadius: 8,
              boxShadow: boxShadows.moreVisible,
            },
          ]}
        >
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Box p="s" gap="xs">
              <ThemePreview mode="light" isActive={userColorScheme == "light"} />
              <Text
                style={[
                  theme.styles.textLight1,
                  { fontSize: 10, textAlign: "center" },
                  userColorScheme == "light" ? [theme.styles.textMain, { fontWeight: "800" }] : {},
                ]}
              >
                {t({ en: "Light", fr: "Clair" })}
              </Text>
            </Box>
            <Box p="s" gap="xs">
              <View>
                <ThemePreview mode="light" isActive={userColorScheme == "auto"} />
                <div
                  style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    bottom: 0,
                    right: 0,
                    clipPath: "polygon(100% 100%, 100% 0, 0 100%)",
                  }}
                >
                  <ThemePreview mode="dark" isActive={userColorScheme == "auto"} />
                </div>
              </View>
              <Text
                style={[
                  theme.styles.textLight1,
                  { fontSize: 10, textAlign: "center" },
                  userColorScheme == "auto" ? [theme.styles.textMain, { fontWeight: "800" }] : {},
                ]}
              >
                {t({ en: "Auto", fr: "Auto" })}
              </Text>
            </Box>
            <Box p="s" gap="xs">
              <ThemePreview mode="dark" isActive={userColorScheme == "dark"} />
              <Text
                style={[
                  theme.styles.textLight1,
                  { fontSize: 10, textAlign: "center" },
                  userColorScheme == "dark" ? [theme.styles.textMain, { fontWeight: "800" }] : {},
                ]}
              >
                {t({ en: "Dark", fr: "Sombre" })}
              </Text>
            </Box>
          </View>
        </InPlaceOrPortal>
      )}
    </View>
  );
}
