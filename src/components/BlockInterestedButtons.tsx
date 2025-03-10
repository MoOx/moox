import * as React from "react";
import { Text } from "react-native";

import { useTheme } from "@/app/styles";
import LinkButton from "@/components/LinkButton";
import Container from "@/react-multiversal/Container";
import { fontStyles } from "@/react-multiversal/font";
import SpacedView from "@/react-multiversal/SpacedView";

export default function BlockInterestedButtons() {
  const theme = useTheme();

  return (
    <Container>
      <SpacedView vertical="xxxl" gap="xl" style={{ alignItems: "center" }}>
        <Text style={[fontStyles.iosEm.title2, theme.styles.text]}>
          {"Interested with my profile ?"}
        </Text>
        <SpacedView
          style={{
            flexDirection: "row",
            flexWrap: "wrap",
            justifyContent: "center",
          }}
          gap="l"
        >
          <LinkButton href="/resume/" mode="outline">
            {(textStyles) => (
              <Text style={textStyles}>
                <Text style={fontStyles.iosEm.title3}>{"Learn more"}</Text>
                <Text style={fontStyles.ios.footnote}>
                  {"\nCheck out my resume"}
                </Text>
              </Text>
            )}
          </LinkButton>
          <LinkButton href="/contact/" mode="default">
            {(textStyles) => (
              <>
                <Text style={textStyles}>
                  <Text style={fontStyles.iosEm.title3}>{"Hire me"}</Text>
                  <Text style={fontStyles.ios.footnote}>
                    {"\nCheck out availabilities"}
                  </Text>
                </Text>
              </>
            )}
          </LinkButton>
        </SpacedView>
      </SpacedView>
    </Container>
  );
}
