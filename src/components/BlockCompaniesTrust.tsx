import { Text, View } from "react-native";

import { useTheme } from "@/app/styles";
import {
  companyIconCoef,
  companyIconStyle,
  companyIconWidth,
} from "@/components/BlockCompaniesTried";
import Container from "@/react-multiversal/Container";
import { fontStyles } from "@/react-multiversal/font";
import SpacedView from "@/react-multiversal/SpacedView";
import TextForReader from "@/react-multiversal/TextForReader";
import SVGCompanyAirbus from "@/svgs/components/SVGCompanyAirbus";
import SVGCompanyFklg from "@/svgs/components/SVGCompanyFklg";
import SVGCompanyHove from "@/svgs/components/SVGCompanyHove";
import SVGCompanyMolotovTv from "@/svgs/components/SVGCompanyMolotovTv";

export default function BlockCompaniesTrust() {
  const theme = useTheme();

  return (
    <Container>
      <SpacedView
        horizontal="l"
        vertical="xl"
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
          {"🇫🇷 Trusted by"}
        </Text>
        <SpacedView
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
        </SpacedView>
      </SpacedView>
    </Container>
  );
}
