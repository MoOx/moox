import { fetchResume, ResumeItem } from "@/api";
import { alternateLinks, langFromParam } from "@/i18n";
import { assertLangParam } from "@/i18n.route";
import ResumeGroupPage from "@/pages/ResumeGroupPage";
import { fullName, pitchOf, titleOf } from "@/profile";
import { createFileRoute } from "@tanstack/react-router";

const byDateDesc = (a: ResumeItem, b: ResumeItem) =>
  (b.dateEnd || "9999") < (a.dateEnd || "9999") ? -1 : 1;

/**
 * Standalone detail of a grouped client. Read `ResumeGroupPage` for what it
 * renders; this file is the route around it.
 */
export const Route = createFileRoute("/{-$lang}/resume_/group/$group")({
  beforeLoad: ({ params }) => assertLangParam(params.lang),
  loader: async ({ params }) => {
    const group = decodeURIComponent(params.group);
    const all = await fetchResume(langFromParam(params.lang));
    const members = all.filter((i) => i.group === group).sort(byDateDesc);
    // The highlight entry carries the group-wide copy (groupTitle/groupPitch).
    const lead = members.find((i) => i.highlight) ?? members[0];
    return { members, lead };
  },
  head: ({ loaderData, params }) => ({
    links: alternateLinks(`/resume/group/${params.group}`, langFromParam(params.lang)),
    meta: loaderData?.lead
      ? [
          {
            title: [titleOf(loaderData.lead), loaderData.lead.company, fullName]
              .filter(Boolean)
              .join(" · "),
          },
          {
            name: "description",
            content: pitchOf(loaderData.lead) ?? titleOf(loaderData.lead),
          },
        ]
      : [],
  }),
  component: function PageResumeGroup() {
    const { members, lead } = Route.useLoaderData();
    return <ResumeGroupPage members={members} lead={lead} />;
  },
});
