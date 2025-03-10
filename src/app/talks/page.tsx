import * as React from "react";
import { Text } from "react-native";

import { getAll, Talk } from "@/api";
import { useTheme } from "@/app/styles";
import TalkList from "@/components/TalkList";
import WebsiteWrapper from "@/components/WebsiteWrapper";
import Container from "@/react-multiversal/Container";
import { fontStyles } from "@/react-multiversal/font";
import SpacedView from "@/react-multiversal/SpacedView";
import Spacer from "@/react-multiversal/Spacer";

export default function PageTalkList() {
  const theme = useTheme();
  const items = getAll<Talk>("talks");

  return (
    <WebsiteWrapper>
      <Container maxWidth={640}>
        <SpacedView horizontal="l" vertical="m" style={theme.styles.back}>
          <Text style={[fontStyles.ios.headline, theme.styles.textLight1]}>
            {"Latest"}
          </Text>
          <Text style={[fontStyles.iosEm.largeTitle, theme.styles.text]}>
            {"Talks"}
          </Text>
          <Spacer />
          <TalkList items={items} />
        </SpacedView>
      </Container>
    </WebsiteWrapper>
  );
}
