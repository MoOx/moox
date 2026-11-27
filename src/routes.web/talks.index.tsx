import { fetchAll } from "@/api";
import { l } from "@/i18n";
import TalkListPage from "@/pages/TalkListPage";
import { fullName, jobTitle, nickname, socialImageMeta } from "@/profile";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/talks/")({
  loader: () => fetchAll({ data: "talks" }),
  // English-only page (see `localizedPathPatterns` in i18n.ts), so no
  // `alternateLinks` here - but it still needs a title: without one the tab,
  // the search result and every share card fall back to the bare URL.
  head: () => ({
    meta: [
      ...socialImageMeta("en"),
      { title: `Talks - ${fullName} (${nickname}), ${l(jobTitle, "en")}` },
      {
        name: "description",
        content: `Conference talks and meetup sessions given by ${nickname} on React, React Native, CSS tooling and front-end architecture.`,
      },
    ],
  }),
  component: function PageTalkList() {
    return <TalkListPage items={Route.useLoaderData()} />;
  },
});
