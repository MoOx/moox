import { fetchOne } from "@/api";
import BlogPostView from "@/components/BlogPostView";
import WebsiteError from "@/components/WebsiteError";
import WebsiteWrapper from "@/components/WebsiteWrapper";
import Container from "@/react-multiversal/Container";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/blog/$slug")({
  loader: ({ params }) =>
    fetchOne({
      data: {
        filename: decodeURIComponent(params.slug) + ".json",
        contentType: "blog",
      },
    }),
  head: ({ loaderData }) => ({
    meta: loaderData ? [{ title: loaderData.title }] : [],
  }),
  component: PageBlogPostView,
});

function PageBlogPostView() {
  const item = Route.useLoaderData();

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
