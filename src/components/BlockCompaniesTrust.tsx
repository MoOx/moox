import { useT } from "@/i18n";
import {
  companyIconCoef,
  companyIconStyle,
  companyIconWidth,
} from "@/components/BlockCompaniesTried";
import Container from "@/react-multiversal/Container";
import { fontStyles } from "@/react-multiversal/font";
import Box from "@/react-multiversal/Box";
import TextForReader from "@/react-multiversal/TextForReader";
import { useTheme } from "@/styles";
import SVGCompanyAirbus from "@/svgs/components/SVGCompanyAirbus";
import SVGCompanyFklg from "@/svgs/components/SVGCompanyFklg";
import SVGCompanyHove from "@/svgs/components/SVGCompanyHove";
import SVGCompanyMolotovTv from "@/svgs/components/SVGCompanyMolotovTv";
import { Text, View } from "react-native";

export default function BlockCompaniesTrust() {
  const theme = useTheme();
  const t = useT();

  return (
    <Container role="region" aria-label={t({ en: "Trusted by", fr: "Ils m'ont fait confiance" })}>
      <Box
        px="l"
        py="xl"
        gap="l"
        style={{ flex: 1, justifyContent: "center" }}
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
          {t({ en: "🇫🇷 Trusted by", fr: "🇫🇷 Ils m'ont fait confiance" })}
        </Text>
        <Box
          gap="m"
          style={{
            flex: 1,
            flexDirection: "row",
            flexWrap: "wrap",
            justifyContent: "center",
          }}
          role="list"
        >
          <View role="listitem">
            <TextForReader>{"FKLG"}</TextForReader>
            <SVGCompanyFklg
              role="img"
              aria-label="FKLG"
              width={companyIconWidth}
              height={companyIconWidth * companyIconCoef}
              style={companyIconStyle}
            />
          </View>
          <View role="listitem">
            <TextForReader>{"Molotov TV"}</TextForReader>
            <SVGCompanyMolotovTv
              role="img"
              aria-label="Molotov TV"
              width={companyIconWidth}
              height={companyIconWidth * companyIconCoef}
              style={companyIconStyle}
            />
          </View>
          <View role="listitem">
            <TextForReader>{"Hove"}</TextForReader>
            <SVGCompanyHove
              role="img"
              aria-label="Hove"
              width={companyIconWidth}
              height={companyIconWidth * companyIconCoef}
              style={companyIconStyle}
            />
          </View>
          <View role="listitem">
            <TextForReader>{"Airbus"}</TextForReader>
            <SVGCompanyAirbus
              role="img"
              aria-label="Airbus"
              width={companyIconWidth}
              height={companyIconWidth * companyIconCoef}
              style={companyIconStyle}
            />
          </View>
        </Box>
      </Box>
    </Container>
  );
}
