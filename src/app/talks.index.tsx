import { fetchAll } from "@/api";
import TalkList from "@/components/TalkList";
import WebsiteWrapper from "@/components/WebsiteWrapper";
import Container from "@/react-multiversal/Container";
import { fontStyles } from "@/react-multiversal/font";
import SpacedView from "@/react-multiversal/SpacedView";
import Spacer from "@/react-multiversal/Spacer";
import { useTheme } from "@/styles";
import { createFileRoute } from "@tanstack/react-router";
import { Text, View } from "react-native";

export const Route = createFileRoute("/talks/")({
  loader: () => fetchAll({ data: "talks" }),
  component: PageTalkList,
});

function PageTalkList() {
  const theme = useTheme();
  const items = Route.useLoaderData();

  return (
    <WebsiteWrapper>
      <Container maxWidth={640} role="article">
        <SpacedView horizontal="l" vertical="m" style={theme.styles.back}>
          <View role="heading" aria-level={1}>
            <Text style={[fontStyles.ios.headline, theme.styles.textLight1]}>
              {"Latest"}
            </Text>
            <Text style={[fontStyles.iosEm.largeTitle, theme.styles.text]}>
              {"Talks"}
            </Text>
          </View>
          <Spacer />
          <TalkList items={items} />
        </SpacedView>
      </Container>
    </WebsiteWrapper>
  );
}
