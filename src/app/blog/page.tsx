import * as React from "react";
import { Text } from "react-native";

import { BlogPost, getAll } from "@/api";
import { useTheme } from "@/app/styles";
import BlogPostList from "@/components/BlogPostList";
import WebsiteWrapper from "@/components/WebsiteWrapper";
import Container from "@/react-multiversal/Container";
import { fontStyles } from "@/react-multiversal/font";
import SpacedView from "@/react-multiversal/SpacedView";
import Spacer from "@/react-multiversal/Spacer";

export default function PageBlogList() {
  const theme = useTheme();
  const items = getAll<BlogPost>("blog");

  return (
    <WebsiteWrapper>
      <Container maxWidth={640}>
        <SpacedView horizontal="l" vertical="m" style={theme.styles.back}>
          <Text style={[fontStyles.ios.headline, theme.styles.textLight1]}>
            {"Latest"}
          </Text>
          <Text style={[fontStyles.iosEm.largeTitle, theme.styles.text]}>
            {"Posts"}
          </Text>
          <Spacer />
          <BlogPostList items={items} />
        </SpacedView>
      </Container>
    </WebsiteWrapper>
  );
}
