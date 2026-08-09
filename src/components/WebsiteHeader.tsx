import AvailabilityBadge from "@/components/AvailabilityBadge";
import { WebsiteMobileMenuLinks } from "@/components/WebsiteMobileMenu";
import { socials } from "@/consts";
import { useHref, useT } from "@/i18n";
import { size, WindowWidth } from "@/react-multiversal";
import Avatar from "@/react-multiversal/Avatar";
import BlurView from "@/react-multiversal/BlurView";
import Container from "@/react-multiversal/Container";
import { boxShadowGlass } from "@/react-multiversal/GlassView";
import GradientLinear from "@/react-multiversal/GradientLinear";
import IfWindowWidthIs from "@/react-multiversal/IfWindowWidthIs";
import LinkView from "@/react-multiversal/LinkView";
import { default as SpacedView } from "@/react-multiversal/SpacedView";
import {
  alpha,
  boxShadows,
  colors,
  gradientFlashyStops,
  useTheme,
} from "@/styles";
import SVGMoox from "@/svgs/components/SVGMoox";
import SVGSocialGithub from "@/svgs/components/SVGSocialGithub";
import SVGSocialLinkedin from "@/svgs/components/SVGSocialLinkedin";
import { StyleSheet, View } from "react-native";

const styles = StyleSheet.create({
  menuGroup: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
  },
  link: {
    fontSize: 16,
    fontWeight: "300",
  },
  linkActive: {
    fontWeight: "800",
  },
});

export default function WebsiteHeader() {
  const theme = useTheme();
  const localizeHref = useHref();
  const t = useT();

  return (
    <>
      <GradientLinear
        style={{
          position: "absolute",
          top: -50,
          left: 0,
          right: 0,
          height: 100,
          transform: [{ skewY: "1deg" }],
        }}
        stops={gradientFlashyStops(theme)}
        angle={-80}
      />
      <Container
        role="banner"
        wrapperStyle={{
          position: "sticky",
          top: 0,
          zIndex: 10,
          overflow: "visible",
          paddingHorizontal: size("l"),
          paddingVertical: size("m"),
        }}
      >
        <BlurView
          blurAmount={24}
          webBackdropFilter={"saturate(175%)"}
          style={{
            backgroundColor: theme.dynamicColors.backMainAlpha05,
            padding: 8,
            boxShadow: [...boxShadowGlass(), ...boxShadows.default],
            borderRadius: 40,
          }}
        >
          <SpacedView
            horizontal="m"
            vertical="xs"
            gap="s"
            style={{
              borderWidth: 0.5,
              borderColor: alpha(colors.black, 0.15),
              backgroundColor: theme.dynamicColors.backAlpha85,
              boxShadow: "rgba(0, 0, 0, 0.15) -1px 0px 4px 0px",
              borderRadius: 36,
              flexDirection: "row",
              flexWrap: "wrap",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <View style={styles.menuGroup}>
              <LinkView
                href={localizeHref("/")}
                style={{ flexDirection: "row" }}
                aria-label={t({
                  en: "Go to home page",
                  fr: "Aller à l'accueil",
                })}
              >
                <Avatar size={32} borderWidth={2} borderColor="#000" />
                <View
                  style={{
                    flexDirection: "row",
                    position: "relative",
                    zIndex: 1,
                    paddingHorizontal: 10,
                    alignItems: "center",
                  }}
                >
                  <SVGMoox fill={theme.dynamicColors.text} width={52} />
                </View>
              </LinkView>
              <AvailabilityBadge showText={"on-focus"} />
            </View>
            <IfWindowWidthIs
              largerThan={WindowWidth.s}
              style={[styles.menuGroup, { flex: 2 }]}
            >
              {/* The site navigation, as a landmark: a screen reader can jump
                  straight to it, and a crawler reads it as the menu rather than
                  as five links in a row. */}
              <SpacedView
                role="navigation"
                aria-label={t({ en: "Main", fr: "Principale" })}
                gap="m"
                style={[styles.menuGroup, { justifyContent: "center" }]}
              >
                <WebsiteMobileMenuLinks />
              </SpacedView>
            </IfWindowWidthIs>
            <SpacedView
              gap="m"
              style={[styles.menuGroup, { justifyContent: "flex-end" }]}
            >
              <LinkView
                href={socials.linkedin.value}
                aria-label="@Max on LinkedIn"
              >
                <SVGSocialLinkedin
                  width={20}
                  height={20}
                  color={theme.dynamicColors.text}
                />
              </LinkView>
              <LinkView
                href={socials.github.value}
                aria-label="@MoOx on GitHub"
              >
                <SVGSocialGithub
                  width={20}
                  height={20}
                  color={theme.dynamicColors.text}
                />
              </LinkView>
            </SpacedView>
          </SpacedView>
        </BlurView>
      </Container>
    </>
  );
}
