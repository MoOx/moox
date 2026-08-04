import { menuBarLinks } from "@/consts";
import { size } from "@/react-multiversal";
import Container from "@/react-multiversal/Container";
import LinkView from "@/react-multiversal/LinkView";
import SpacedView from "@/react-multiversal/SpacedView";
import { alpha, boxShadows, colors, themeDark, themeLight, useTheme } from "@/styles";
import { useRouterState } from "@tanstack/react-router";
import { Text, View } from "react-native";

export const WebsiteMobileMenuPlaceholder = () => {
  return <View style={{ height: 60 }} />;
};

export const WebsiteMobileMenuBackdropStyles = () => {
  // Liquid-glass treatment grounded in Apple's material system:
  // - translucent fill (vibrancy comes from saturation, not brightness)
  // - saturate(180%) for vibrancy, ~12px blur (regular-material zone)
  // - inset white highlight at the top edge = specular bezel (Safari-safe)
  // - ambient drop shadow underneath for separation
  const glassLight = `
    background-color: ${alpha(themeLight.colors.back, 0.55)} !important;
    -webkit-backdrop-filter: saturate(180%) blur(12px);
    backdrop-filter: saturate(180%) blur(12px);
    border-color: ${alpha(colors.white, 0.5)} !important;
    box-shadow:
      inset 0.5px 0.25px 0.5px ${alpha(colors.white, 0.95)},
      inset -0.5px -0.25px 1px ${alpha(colors.white, 0.95)},
      inset -4px -6px 14px -8px ${alpha(colors.white, 0.2)},
      0 4px 20px ${alpha(colors.black, 0.12)} !important;
  `;
  const glassDark = `
    background-color: ${alpha(themeDark.colors.back, 0.35)} !important;
    -webkit-backdrop-filter: saturate(180%) brightness(1.3) blur(12px);
    backdrop-filter: saturate(180%) brightness(1.3) blur(12px);
    border-color: ${alpha(colors.white, 0.18)} !important;
    box-shadow:
      inset 0.5px 0.25px 0.5px ${alpha(colors.white, 0.35)},
      inset -0.5px -0.25px 1px ${alpha(colors.white, 0.25)},
      inset 4px 6px 16px -8px ${alpha(colors.white, 0.2)},
      0 4px 20px ${alpha(colors.black, 0.4)} !important;
  `;
  return (
    <style
      dangerouslySetInnerHTML={{
        __html: `
          @supports (backdrop-filter: none) or (-webkit-backdrop-filter: none) {
            .userColorScheme-auto [data-website-footer-backdrop="true"],
            .userColorScheme-light [data-website-footer-backdrop="true"] {
              ${glassLight}
            }
            .userColorScheme-dark [data-website-footer-backdrop="true"] {
              ${glassDark}
            }
            @media (prefers-color-scheme: dark) {
              .userColorScheme-auto [data-website-footer-backdrop="true"] {
                ${glassDark}
              }
            }
          }`,
      }}
    />
  );
};

export const WebsiteMobileMenuLinks = () => {
  const theme = useTheme();
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  return (
    <>
      {Object.entries(menuBarLinks).map(([text, { href, isActive, icon }]) => {
        const active = isActive?.(pathname, href);
        const color =
          theme.mode === "light"
            ? active
              ? theme.dynamicColors.textMain
              : theme.dynamicColors.text
            : active
              ? "hsl(230 90% 70%)"
              : theme.dynamicColors.text;
        return (
          <LinkView key={href} href={href}>
            <SpacedView
              horizontal={size("m") * 1.25}
              vertical="xxs"
              style={{
                alignItems: "center",
                justifyContent: "center",
                borderRadius: 36,
                backgroundColor: active
                  ? theme.mode === "light"
                    ? "rgba(0,0,0, 0.075)"
                    : "rgba(255,255,255,0.15)"
                  : "transparent",
              }}
            >
              {icon({
                size: 24,
                color,
                active,
              })}
              <Text
                style={{
                  fontSize: 10,
                  fontWeight: active ? "700" : "500",
                  color,
                }}
              >
                {text}
              </Text>
            </SpacedView>
          </LinkView>
        );
      })}
    </>
  );
};

export const WebsiteMobileMenuLinksContainer = ({ children }: { children: React.ReactNode }) => {
  const theme = useTheme();
  return (
    <Container
      maxWidth={360}
      style={{
        flexDirection: "row",
        justifyContent: "center",
      }}
    >
      <SpacedView
        dataSet={{ "website-footer-backdrop": "true" }}
        horizontal="xxs"
        vertical="xxs"
        style={{
          marginInline: size("s"),
          marginBlock: size("xs"),
          flexDirection: "row",
          flexWrap: "wrap",
          // justifyContent: "center",
          alignItems: "center",

          borderWidth: 0.5,
          borderRadius: 999,
          borderColor: alpha(colors.black, 0.15),
          borderStyle: "solid",
          backgroundColor: theme.dynamicColors.back,
          boxShadow: boxShadows.moreVisible,
        }}
      >
        {children}
      </SpacedView>
    </Container>
  );
};

export default function WebsiteMobileMenu() {
  return (
    <View
      role="contentinfo"
      style={{
        zIndex: 1,
        position: "fixed",
        // +4xp to avoid safari liquid glass address bar solid background
        bottom: "calc(env(safe-area-inset-bottom) + 4px)",
        left: "env(safe-area-inset-left)",
        right: "env(safe-area-inset-right)",
      }}
    >
      <WebsiteMobileMenuLinksContainer>
        <WebsiteMobileMenuLinks />
      </WebsiteMobileMenuLinksContainer>
    </View>
  );
}
