import { fetchAll } from "@/api";
import { l } from "@/i18n";
import BlogListPage from "@/pages/BlogListPage";
import { fullName, jobTitle, nickname, socialImageMeta } from "@/profile";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/blog/")({
  loader: () => fetchAll({ data: "blog" }),
  // English-only page (see `localizedPathPatterns` in i18n.ts), so no
  // `alternateLinks` here - but it still needs a title: without one the tab,
  // the search result and every share card fall back to the bare URL.
  head: () => ({
    meta: [
      ...socialImageMeta("en"),
      { title: `Blog - ${fullName} (${nickname}), ${l(jobTitle, "en")}` },
      {
        name: "description",
        content: `Posts by ${nickname} on front-end engineering: React, React Native, tooling and the craft of shipping web and mobile apps.`,
      },
    ],
  }),
  component: function PageBlogList() {
    return <BlogListPage items={Route.useLoaderData()} />;
  },
});
