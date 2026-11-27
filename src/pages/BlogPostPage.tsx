import { ContentTypeMap } from "@/api";
import BlogPostView from "@/components/BlogPostView";
import WebsiteError from "@/components/WebsiteError";
import WebsiteWrapper from "@/components/WebsiteWrapper";
import Container from "@/react-multiversal/Container";

export default function BlogPostPage({ item }: { item: ContentTypeMap["blog"] | null }) {
  if (!item) {
    return <WebsiteError statusCode={404} />;
  }
  return (
    <WebsiteWrapper>
      <Container maxWidth={640}>
        <BlogPostView item={item} />
      </Container>
    </WebsiteWrapper>
  );
}
