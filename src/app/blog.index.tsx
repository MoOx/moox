import { fetchAll } from "@/api";
import BlogPostList from "@/components/BlogPostList";
import WebsiteWrapper from "@/components/WebsiteWrapper";
import {
  fullName,
  jobTitle,
  nickname,
  putaindecodeArticles,
  putaindecodeArticlesUrl,
} from "@/profile";
import Container from "@/react-multiversal/Container";
import { fontStyles } from "@/react-multiversal/font";
import LinkText from "@/react-multiversal/LinkText";
import Box from "@/react-multiversal/Box";
import Spacer from "@/react-multiversal/Spacer";
import { useTheme } from "@/styles";
import { createFileRoute } from "@tanstack/react-router";
import { Text, View } from "react-native";

export const Route = createFileRoute("/blog/")({
  loader: () => fetchAll({ data: "blog" }),
  // English-only page (see `localizedPathPatterns` in i18n.ts), so no
  // `alternateLinks` here - but it still needs a title: without one the tab,
  // the search result and every share card fall back to the bare URL.
  head: () => ({
    meta: [
      { title: `Blog - ${fullName} (${nickname}), ${jobTitle}` },
      {
        name: "description",
        content: `Posts by ${nickname} on front-end engineering: React, React Native, tooling and the craft of shipping web and mobile apps.`,
      },
    ],
  }),
  component: PageBlogList,
});

function PageBlogList() {
  const theme = useTheme();
  const items = Route.useLoaderData();

  return (
    <WebsiteWrapper>
      <Container maxWidth={640} role="article">
        <Box px="l" py="m" style={theme.styles.back}>
          <View role="heading" aria-level={1}>
            <Text style={[fontStyles.ios.headline, theme.styles.textLight1]}>{"Latest"}</Text>
            <Text style={[fontStyles.iosEm.largeTitle, theme.styles.text]}>{"Posts"}</Text>
          </View>
          <Spacer />
          <BlogPostList items={items} />
          <Spacer size="l" />
          <Text style={[fontStyles.ios.callout, theme.styles.textLight1]}>
            {"Looking for more? "}
            <LinkText
              href={putaindecodeArticlesUrl}
              underline={true}
              style={[fontStyles.iosEm.callout, theme.styles.textMain]}
            >
              {`${putaindecodeArticles} more articles`}
            </LinkText>
            {" on putaindecode.io."}
          </Text>
        </Box>
      </Container>
    </WebsiteWrapper>
  );
}
