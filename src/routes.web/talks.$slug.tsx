import { fetchOne } from "@/api";
import TalkPage from "@/pages/TalkPage";
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
  component: function PageTalk() {
    return <TalkPage item={Route.useLoaderData()} />;
  },
});
