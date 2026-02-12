import Container from "@/react-multiversal/Container";
import { fontStyles } from "@/react-multiversal/font";
import SpacedView from "@/react-multiversal/SpacedView";
import TextForReader from "@/react-multiversal/TextForReader";
import { useTheme } from "@/styles";
import SVGCompanyFacebook from "@/svgs/components/SVGCompanyFacebook";
import SVGCompanyGoogle from "@/svgs/components/SVGCompanyGoogle";
import SVGCompanyMicrosoft from "@/svgs/components/SVGCompanyMicrosoft";
import SVGCompanyTwitter from "@/svgs/components/SVGCompanyTwitter";
import { Text, View } from "react-native";

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
            { textAlign: "center", textTransform: "uppercase" },
          ]}
          role="heading"
          aria-level={2}
        >
          {"They tried to hire me"}
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
      </SpacedView>
    </Container>
  );
}
