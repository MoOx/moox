import { glassDataSet } from "@/components/GlassFallbackStyles";
import WebsiteMenu from "@/components/WebsiteMenu";
import { useHref, useT } from "@/i18n";
import { footerAnchor, menuBarLinks } from "@/consts";
import { size } from "@/react-multiversal";
import Container from "@/react-multiversal/Container";
import LinkView from "@/react-multiversal/LinkView";
import SpacedView from "@/react-multiversal/SpacedView";
import { alpha, boxShadows, colors, useTheme } from "@/styles";
import { useRouterState } from "@tanstack/react-router";
import { Text, View } from "react-native";

export const WebsiteMobileMenuPlaceholder = () => {
  return <View style={{ height: 60 }} />;
};

/**
 * The pill of one menu bar entry. Extracted because the "More" entry is not a
 * plain link any more - it opens `WebsiteMenu` - and the two must stay
 * indistinguishable in the bar.
 */
const MenuBarItemContent = ({
  icon,
  text,
  active = false,
}: {
  icon: (props: { size: number; color: string; active?: boolean }) => React.ReactNode;
  text: string;
  active?: boolean;
}) => {
  const theme = useTheme();
  const color =
    theme.mode === "light"
      ? active
        ? theme.dynamicColors.textMain
        : theme.dynamicColors.text
      : active
        ? "hsl(230 90% 70%)"
        : theme.dynamicColors.text;
  return (
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
      {icon({ size: 24, color, active })}
      <Text style={{ fontSize: 10, fontWeight: active ? "700" : "500", color }}>{text}</Text>
    </SpacedView>
  );
};

export const WebsiteMobileMenuLinks = () => {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const localizeHref = useHref();
  const t = useT();
  return (
    <>
      {Object.entries(menuBarLinks).map(([text, { href, label, isActive, icon }]) => {
        const content = (
          <MenuBarItemContent
            icon={icon}
            text={t(label) ?? text}
            active={isActive?.(pathname, href)}
          />
        );
        // "More" pointed at the footer; it now opens the same links as a menu,
        // and keeps that href as its no-JS fallback.
        return href === "#" + footerAnchor ? (
          <WebsiteMenu key={href}>{content}</WebsiteMenu>
        ) : (
          <LinkView key={href} href={localizeHref(href)}>
            {content}
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
        dataSet={glassDataSet}
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
  const t = useT();
  return (
    <View
      role="navigation"
      aria-label={t({ en: "Mobile", fr: "Mobile" })}
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
