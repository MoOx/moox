import { fetchOne } from "@/api";
import TalkView from "@/components/TalkView";
import WebsiteError from "@/components/WebsiteError";
import WebsiteWrapper from "@/components/WebsiteWrapper";
import Container from "@/react-multiversal/Container";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/talks/$slug")({
  loader: ({ params }) =>
    fetchOne({
      data: {
        filename: decodeURIComponent(params.slug) + ".json",
        contentType: "talks",
      },
    }),
  head: ({ loaderData }) => ({
    meta: loaderData ? [{ title: loaderData.title }] : [],
  }),
  component: PageTalkView,
});

function PageTalkView() {
  const item = Route.useLoaderData();

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
