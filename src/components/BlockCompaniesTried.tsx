import * as React from "react";
import { Text } from "react-native";

import { useTheme } from "@/app/styles";
import Container from "@/react-multiversal/Container";
import { fontStyles } from "@/react-multiversal/font";
import SpacedView from "@/react-multiversal/SpacedView";
import SVGCompanyFacebook from "@/svgs/components/SVGCompanyFacebook";
import SVGCompanyGoogle from "@/svgs/components/SVGCompanyGoogle";
import SVGCompanyMicrosoft from "@/svgs/components/SVGCompanyMicrosoft";
import SVGCompanyTwitter from "@/svgs/components/SVGCompanyTwitter";

export const companyIconWidth = 160;
export const companyIconCoef = 12 / 32;
export const companyIconStyle = {
  filter: "grayscale(100%) contrast(25%) brightness(150%)",
};
export default function BlockCompaniesTried() {
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
        >
          {"COMPANIES THAT TRIED TO HIRE ME"}
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
          <SVGCompanyFacebook
            width={companyIconWidth}
            height={companyIconWidth * companyIconCoef}
            style={companyIconStyle}
          />
          <SVGCompanyTwitter
            width={companyIconWidth}
            height={companyIconWidth * companyIconCoef}
            style={companyIconStyle}
          />
          <SVGCompanyMicrosoft
            width={companyIconWidth}
            height={companyIconWidth * companyIconCoef}
            style={companyIconStyle}
          />
          <SVGCompanyGoogle
            width={companyIconWidth}
            height={companyIconWidth * companyIconCoef}
            style={companyIconStyle}
          />
        </SpacedView>
      </SpacedView>
    </Container>
  );
}
