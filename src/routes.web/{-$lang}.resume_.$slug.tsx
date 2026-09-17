import { fetchResumeEntry } from "@/api";
import { alternateLinks, langFromParam } from "@/i18n";
import { assertLangParam } from "@/i18n.route";
import ResumeEntryPage from "@/pages/ResumeEntryPage";
import { fullName, pitchOf } from "@/profile";
import { createFileRoute } from "@tanstack/react-router";

/**
 * Standalone detail of ONE experience. Read `ResumeEntryPage` for what it
 * renders; this file is the route around it.
 */
export const Route = createFileRoute("/{-$lang}/resume_/$slug")({
  beforeLoad: ({ params }) => assertLangParam(params.lang),
  loader: async ({ params }) => {
    const filename = decodeURIComponent(params.slug) + ".json";
    const item = await fetchResumeEntry(filename, langFromParam(params.lang));
    return { item };
  },
  head: ({ loaderData, params }) => ({
    links: alternateLinks(`/resume/${params.slug}`, langFromParam(params.lang)),
    meta: loaderData?.item
      ? [
          {
            title: [loaderData.item.title, loaderData.item.company, fullName]
              .filter(Boolean)
              .join(" · "),
          },
          {
            name: "description",
            content: pitchOf(loaderData.item) ?? loaderData.item.title,
          },
        ]
      : [],
  }),
  component: function PageResumeEntry() {
    return <ResumeEntryPage item={Route.useLoaderData().item} />;
  },
});
