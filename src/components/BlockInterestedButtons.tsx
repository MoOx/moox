import * as React from "react";
import { Text } from "react-native";

import { alpha, colors, useTheme } from "@/app/styles";
import LinkButton from "@/components/LinkButton";
import Container from "@/react-multiversal/Container";
import { fontStyles } from "@/react-multiversal/font";
import SpacedView from "@/react-multiversal/SpacedView";
import SVGMenuContactFill from "@/svgs/components/SVGMenuContactFill";
import SVGMenuResumeFill from "@/svgs/components/SVGMenuResumeFill";

export default function BlockInterestedButtons() {
  const theme = useTheme("dark");

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
          <LinkButton
            href="/resume/"
            blurAmount={16}
            color={alpha(colors.white, 0.15)}
            theme="dark"
            spaceHorizontal="xl"
            spaceVertical="m"
          >
            {(textStyles) => (
              <>
                <SVGMenuResumeFill
                  width={36}
                  height={36}
                  fill={theme.dynamicColors.textOnMain}
                />
                <Text style={[textStyles, fontStyles.iosEm.title3]}>
                  {"More about me"}
                </Text>
              </>
            )}
          </LinkButton>
          <LinkButton href="/contact/" spaceHorizontal="xl" spaceVertical="m">
            {(textStyles) => (
              <>
                <SVGMenuContactFill
                  width={36}
                  height={36}
                  fill={theme.dynamicColors.textOnMain}
                />
                <Text style={[textStyles, fontStyles.iosEm.title3]}>
                  {"Hire me"}
                </Text>
              </>
            )}
          </LinkButton>
        </SpacedView>
      </SpacedView>
    </Container>
  );
}
