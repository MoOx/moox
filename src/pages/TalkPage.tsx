import { ContentTypeMap } from "@/api";
import TalkView from "@/components/TalkView";
import WebsiteError from "@/components/WebsiteError";
import WebsiteWrapper from "@/components/WebsiteWrapper";
import Container from "@/react-multiversal/Container";

export default function TalkPage({ item }: { item: ContentTypeMap["talks"] | null }) {
  if (!item) {
    return <WebsiteError statusCode={404} />;
  }
  return (
    <WebsiteWrapper>
      <Container maxWidth={640}>
        <TalkView item={item} />
      </Container>
    </WebsiteWrapper>
  );
}
