import { ContentTypeMap } from "@/api";
import BlogPostList from "@/components/BlogPostList";
import WebsiteWrapper from "@/components/WebsiteWrapper";
import { putaindecodeArticles, putaindecodeArticlesUrl } from "@/profile";
import Container from "@/react-multiversal/Container";
import { fontStyles } from "@/react-multiversal/font";
import LinkText from "@/react-multiversal/LinkText";
import Spacer from "@/react-multiversal/Spacer";
import { useTheme } from "@/styles";
import { Text, View } from "react-native";

export default function BlogListPage({ items }: { items: ContentTypeMap["blog"][] }) {
  const theme = useTheme();
  return (
    <WebsiteWrapper>
      <Container
        horizontal="l"
        vertical="m"
        style={theme.styles.back}
        maxWidth={640}
        role="article"
      >
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
      </Container>
    </WebsiteWrapper>
  );
}
