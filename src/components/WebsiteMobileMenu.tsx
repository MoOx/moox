import { menuBarLinks } from "@/consts";
import Container from "@/react-multiversal/Container";
import LinkView from "@/react-multiversal/LinkView";
import SpacedView from "@/react-multiversal/SpacedView";
import {
  alpha,
  boxShadows,
  colors,
  themeDark,
  themeLight,
  useTheme,
} from "@/styles";
import { useRouterState } from "@tanstack/react-router";
import { Text, View } from "react-native";

export const WebsiteMobileMenuPlaceholder = () => {
  return <View style={{ height: 60 }} />;
};

export const WebsiteMobileMenuBackdropStyles = () => {
  return (
    <style
      dangerouslySetInnerHTML={{
        __html: `
          @supports (backdrop-filter: none) {
            .userColorScheme-auto [data-website-footer-backdrop="true"],
            .userColorScheme-light [data-website-footer-backdrop="true"] {
              background-color: ${alpha(themeLight.colors.back, 0.85)} !important;
              backdrop-filter: saturate(200%) brightness(200%) blur(24px);
            }
            .userColorScheme-dark [data-website-footer-backdrop="true"] {
              background-color: ${alpha(themeDark.colors.back, 0.85)} !important;
              backdrop-filter: saturate(200%) brightness(200%) blur(24px);
            }
            @media (prefers-color-scheme: dark) {
              .userColorScheme-auto [data-website-footer-backdrop="true"] {
                background-color: ${alpha(themeDark.colors.back, 0.85)} !important;
                backdrop-filter: saturate(200%) brightness(200%) blur(24px);
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
        const color = active
          ? theme.dynamicColors.textMain
          : theme.dynamicColors.text;
        return (
          <LinkView key={href} href={href}>
            <SpacedView
              horizontal="xxs"
              vertical="xxs"
              style={{
                alignItems: "center",
                justifyContent: "center",
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
                  fontWeight: active ? "600" : "300",
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

export default function WebsiteMobileMenu() {
  const theme = useTheme();

  return (
    <View
      role="contentinfo"
      style={{
        zIndex: 1,
        position: "fixed",
        bottom: 0,
        left: 0,
        right: 0,
      }}
    >
      <Container maxWidth={360}>
        <SpacedView horizontal="xs" vertical="xs">
          <SpacedView
            dataSet={{ "website-footer-backdrop": "true" }}
            horizontal="xl"
            vertical="xxs"
            style={{
              flexDirection: "row",
              flexWrap: "wrap",
              justifyContent: "space-between",
              alignItems: "center",

              borderWidth: 0.5,
              borderRadius: 18,
              borderColor: alpha(colors.black, 0.25),
              borderStyle: "solid",
              backgroundColor: theme.dynamicColors.back,
              boxShadow: boxShadows.default,
            }}
          >
            <WebsiteMobileMenuLinks />
          </SpacedView>
        </SpacedView>
      </Container>
    </View>
  );
}
