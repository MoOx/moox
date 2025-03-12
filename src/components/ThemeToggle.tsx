"use client";

import AsyncStorage from "@react-native-async-storage/async-storage";
import dynamic from "next/dynamic";
import * as React from "react";
import { Text, useColorScheme, View } from "react-native";

import { themedColors, useTheme } from "@/app/styles";
import ThemePreview from "@/components/ThemePreview";
import { AbsoluteSize, WindowWidth } from "@/react-multiversal";
import { white } from "@/react-multiversal/colors";
import IfWindowWidthIs from "@/react-multiversal/IfWindowWidthIs";
import InPlaceOrPortal from "@/react-multiversal/InPlaceOrPortal";
import SpacedView from "@/react-multiversal/SpacedView";
import {
  UserColorScheme,
  userColorSchemeStorageKey,
} from "@/react-multiversal/theme/colorScheme";
import { useUserColorScheme } from "@/react-multiversal/theme/useUserColorScheme";

// import ColorSchemeToggle from "@/shared/components/ColorSchemeToggle";
const ColorSchemeToggle = dynamic(
  () => import("@/react-multiversal/ColorSchemeToggle"),
  {
    ssr: false,
  }
);

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
  showLabelFor: showLabels = WindowWidth.l,
  mode = "light",
}: {
  showPreview?: boolean;
  showLabelFor?: AbsoluteSize;
  mode?: "light" | "default";
}) {
  const colorScheme = useColorScheme();
  const [userColorScheme, setUserColorScheme] = useUserColorScheme();
  const theme = useTheme();
  const actualColorScheme =
    userColorScheme === "auto"
      ? colorScheme === "dark"
        ? "dark"
        : "light"
      : userColorScheme;
  const handleChange = React.useCallback(
    (value: UserColorScheme) => {
      AsyncStorage.setItem(userColorSchemeStorageKey, value);
      setUserColorScheme(value);
    },
    [setUserColorScheme]
  );

  const [detailsVisible, setDetailsVisible] = React.useState(false);
  const handleFocus = React.useCallback(() => {
    setDetailsVisible(true);
  }, [setDetailsVisible]);
  const handleBlur = React.useCallback(() => {
    setDetailsVisible(false);
  }, [setDetailsVisible]);

  return (
    <View>
      <ColorSchemeToggle
        toggleSize={32}
        iconSize={16}
        inactiveIconSize={12}
        systemColorScheme={colorScheme ?? "light"}
        value={userColorScheme}
        actualValue={actualColorScheme}
        onChange={handleChange}
        theme={
          mode === "light" ? toggleThemes.theme : toggleThemes.focusedTheme
        }
        focusedTheme={toggleThemes.focusedTheme}
        onPointerFocus={handleFocus}
        onPointerLeave={handleBlur}
        onFocus={handleFocus}
        onBlur={handleBlur}
      />
      {showLabels ? (
        <IfWindowWidthIs largerThan={showLabels}>
          <View
            style={{
              position: "absolute",
              top: 2,
              right: 64,
              alignItems: "flex-end",
              opacity: mode === "light" ? (detailsVisible ? 1 : 0.25) : 1,
            }}
          >
            <Text
              style={[
                mode === "light" ? theme.styles.textLight1 : theme.styles.text,
                { fontSize: 12, lineHeight: 12 },
              ]}
            >
              {"Appearance"}
            </Text>
            <Text
              style={[
                mode === "light" ? theme.styles.textLight1 : theme.styles.text,
                { fontSize: 14, lineHeight: 14, fontWeight: "800" },
              ]}
            >
              {userColorScheme.toUpperCase()}
            </Text>
          </View>
        </IfWindowWidthIs>
      ) : null}
      {!detailsVisible ? null : !showPreview ? null : (
        <InPlaceOrPortal
          id="theme-details"
          onExit={handleBlur}
          inPlaceStyle={[
            theme.styles.backAlt,
            {
              position: "absolute",
              top: 64,
              right: 6,
              borderRadius: 4,
            },
          ]}
        >
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <SpacedView horizontal="s" vertical="s" gap="xs">
              <ThemePreview
                mode="light"
                isActive={userColorScheme == "light"}
              />
              <Text
                style={[
                  theme.styles.textLight1,
                  { fontSize: 10, textAlign: "center" },
                  userColorScheme == "light"
                    ? [theme.styles.textMain, { fontWeight: "800" }]
                    : {},
                ]}
              >
                {"Light"}
              </Text>
            </SpacedView>
            <SpacedView horizontal="s" vertical="s" gap="xs">
              <View>
                <ThemePreview
                  mode="light"
                  isActive={userColorScheme == "auto"}
                />
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
                  <ThemePreview
                    mode="dark"
                    isActive={userColorScheme == "auto"}
                  />
                </div>
              </View>
              <Text
                style={[
                  theme.styles.textLight1,
                  { fontSize: 10, textAlign: "center" },
                  userColorScheme == "auto"
                    ? [theme.styles.textMain, { fontWeight: "800" }]
                    : {},
                ]}
              >
                {"Auto"}
              </Text>
            </SpacedView>
            <SpacedView horizontal="s" vertical="s" gap="xs">
              <ThemePreview mode="dark" isActive={userColorScheme == "dark"} />
              <Text
                style={[
                  theme.styles.textLight1,
                  { fontSize: 10, textAlign: "center" },
                  userColorScheme == "dark"
                    ? [theme.styles.textMain, { fontWeight: "800" }]
                    : {},
                ]}
              >
                {"Dark"}
              </Text>
            </SpacedView>
          </View>
        </InPlaceOrPortal>
      )}
    </View>
  );
}
