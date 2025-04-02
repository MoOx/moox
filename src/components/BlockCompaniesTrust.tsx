import { Text } from "react-native";

import { useTheme } from "@/app/styles";
import {
  companyIconCoef,
  companyIconStyle,
  companyIconWidth,
} from "@/components/BlockCompaniesTried";
import Container from "@/react-multiversal/Container";
import { fontStyles } from "@/react-multiversal/font";
import SpacedView from "@/react-multiversal/SpacedView";
import SVGCompanyAirbus from "@/svgs/components/SVGCompanyAirbus";
import SVGCompanyHove from "@/svgs/components/SVGCompanyHove";
import SVGCompanyMolotovTv from "@/svgs/components/SVGCompanyMolotovTv";
import SVGCompanyViareport from "@/svgs/components/SVGCompanyViareport";

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
            { textAlign: "center" },
          ]}
          role="heading"
          aria-level={2}
        >
          {"🇫🇷 COMPANIES THAT TRUSTED ME"}
        </Text>
        <SpacedView
          gap="m"
          style={{
            flex: 1,
            flexDirection: "row",
            flexWrap: "wrap",
            justifyContent: "center",
          }}
        >
          <SVGCompanyMolotovTv
            width={companyIconWidth}
            height={companyIconWidth * companyIconCoef}
            style={companyIconStyle}
          />
          <SVGCompanyHove
            width={companyIconWidth}
            height={companyIconWidth * companyIconCoef}
            style={companyIconStyle}
          />
          <SVGCompanyAirbus
            width={companyIconWidth}
            height={companyIconWidth * companyIconCoef}
            style={companyIconStyle}
          />
          <SVGCompanyViareport
            width={companyIconWidth}
            height={companyIconWidth * companyIconCoef}
            style={companyIconStyle}
          />
        </SpacedView>
      </SpacedView>
    </Container>
  );
}
