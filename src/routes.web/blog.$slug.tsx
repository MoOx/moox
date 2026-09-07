import { fetchOne } from "@/api";
import BlogPostPage from "@/pages/BlogPostPage";
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
  component: function PageBlogPost() {
    return <BlogPostPage item={Route.useLoaderData()} />;
  },
});
