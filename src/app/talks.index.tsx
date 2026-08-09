import { fetchAll } from "@/api";
import TalkList from "@/components/TalkList";
import WebsiteWrapper from "@/components/WebsiteWrapper";
import { fullName, jobTitle, nickname } from "@/profile";
import Container from "@/react-multiversal/Container";
import { fontStyles } from "@/react-multiversal/font";
import Box from "@/react-multiversal/Box";
import Spacer from "@/react-multiversal/Spacer";
import { useTheme } from "@/styles";
import { createFileRoute } from "@tanstack/react-router";
import { Text, View } from "react-native";

export const Route = createFileRoute("/talks/")({
  loader: () => fetchAll({ data: "talks" }),
  // English-only page (see `localizedPathPatterns` in i18n.ts), so no
  // `alternateLinks` here - but it still needs a title: without one the tab,
  // the search result and every share card fall back to the bare URL.
  head: () => ({
    meta: [
      { title: `Talks - ${fullName} (${nickname}), ${jobTitle}` },
      {
        name: "description",
        content: `Conference talks and meetup sessions given by ${nickname} on React, React Native, CSS tooling and front-end architecture.`,
      },
    ],
  }),
  component: PageTalkList,
});

function PageTalkList() {
  const theme = useTheme();
  const items = Route.useLoaderData();

  return (
    <WebsiteWrapper>
      <Container maxWidth={640} role="article">
        <Box px="l" py="m" style={theme.styles.back}>
          <View role="heading" aria-level={1}>
            <Text style={[fontStyles.ios.headline, theme.styles.textLight1]}>{"Latest"}</Text>
            <Text style={[fontStyles.iosEm.largeTitle, theme.styles.text]}>{"Talks"}</Text>
          </View>
          <Spacer />
          <TalkList items={items} />
        </Box>
      </Container>
    </WebsiteWrapper>
  );
}
