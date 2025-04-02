import * as React from "react";
import { Text, View } from "react-native";

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
      <Container maxWidth={640} role="article">
        <SpacedView horizontal="l" vertical="m" style={theme.styles.back}>
          <View role="heading" aria-level={1}>
            <Text style={[fontStyles.ios.headline, theme.styles.textLight1]}>
              {"Latest"}
            </Text>
            <Text style={[fontStyles.iosEm.largeTitle, theme.styles.text]}>
              {"Posts"}
            </Text>
          </View>
          <Spacer />
          <BlogPostList items={items} />
        </SpacedView>
      </Container>
    </WebsiteWrapper>
  );
}
