import { useT } from "@/i18n";
import Container from "@/react-multiversal/Container";
import { fontStyles } from "@/react-multiversal/font";
import SpacedView from "@/react-multiversal/SpacedView";
import TextForReader from "@/react-multiversal/TextForReader";
import { useTheme } from "@/styles";
import SVGCompanyFacebook from "@/svgs/components/SVGCompanyFacebook";
import SVGCompanyGoogle from "@/svgs/components/SVGCompanyGoogle";
import SVGCompanyMicrosoft from "@/svgs/components/SVGCompanyMicrosoft";
import SVGCompanyTwitter from "@/svgs/components/SVGCompanyTwitter";
import { Platform, Text, View } from "react-native";

export const companyIconWidth = 160;
export const companyIconCoef = 12 / 32;
// The logo wall is deliberately desaturated. CSS `filter` does that on web;
// react-native-svg reads `filter` as a reference to an SVG filter element
// (`url(#id)`) and warns on anything else, so native shows the logos in colour
// rather than wrong. `opacity` is the closest native approximation of the
// "greyed back" intent without touching the marks themselves.
export const companyIconStyle =
  Platform.OS === "web"
    ? { filter: "grayscale(100%) contrast(25%) brightness(150%)" }
    : { opacity: 0.45 };
export default function BlockCompaniesTried() {
  const theme = useTheme();
  const t = useT();

  return (
    <Container
      horizontal="l"
      vertical="xl"
      gap="l"
      style={{ flexGrow: 1, flexShrink: 1, justifyContent: "center" }}
      role="region"
      aria-label={t({
        en: "They tried to hire me",
        fr: "Ils ont essayé de me recruter",
      })}
    >
      <Text
        style={[
          fontStyles.ios.headline,
          theme.styles.textLight1,
          { textAlign: "center", textTransform: "uppercase" },
        ]}
        role="heading"
        aria-level={2}
      >
        {t({
          en: "They tried to hire me",
          fr: "Ils ont essayé de me recruter",
        })}
      </Text>
      <SpacedView
        gap="m"
        style={{
          flexGrow: 1,
          flexShrink: 1,
          flexDirection: "row",
          flexWrap: "wrap",
          justifyContent: "center",
        }}
        role="list"
      >
        <View role="listitem">
          <TextForReader>Microsoft</TextForReader>
          <SVGCompanyMicrosoft
            role="img"
            aria-label="Microsoft"
            width={companyIconWidth}
            height={companyIconWidth * companyIconCoef}
            style={companyIconStyle}
          />
        </View>
        <View role="listitem">
          <TextForReader>Google</TextForReader>
          <SVGCompanyGoogle
            role="img"
            aria-label="Google"
            width={companyIconWidth}
            height={companyIconWidth * companyIconCoef}
            style={companyIconStyle}
          />
        </View>
        <View role="listitem">
          <TextForReader>Facebook</TextForReader>
          <SVGCompanyFacebook
            role="img"
            aria-label="Facebook"
            width={companyIconWidth}
            height={companyIconWidth * companyIconCoef}
            style={companyIconStyle}
          />
        </View>
        <View role="listitem">
          <TextForReader>Twitter</TextForReader>
          <SVGCompanyTwitter
            role="img"
            aria-label="Twitter"
            width={companyIconWidth}
            height={companyIconWidth * companyIconCoef}
            style={companyIconStyle}
          />
        </View>
      </SpacedView>
    </Container>
  );
}
