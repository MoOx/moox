import { fetchResume } from "@/api";
import { alternateLinks, l, langFromParam } from "@/i18n";
import { assertLangParam } from "@/i18n.route";
import HomePage from "@/pages/HomePage";
import {
  availabilityLabel,
  freelanceSince,
  fullName,
  handle,
  jobTitle,
  lowerKeepingAcronyms,
  nickname,
  socialImageMeta,
  workLocation,
} from "@/profile";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/{-$lang}/")({
  beforeLoad: ({ params }) => assertLangParam(params.lang),
  loader: ({ params }) => fetchResume(langFromParam(params.lang)),
  head: ({ params }) => ({
    links: alternateLinks("/", langFromParam(params.lang)),
    meta: [
      ...socialImageMeta(langFromParam(params.lang)),
      // Same title vocabulary as `/cv` and `/resume` (see profile.tsx): three
      // pages advertising three different job titles read as sloppiness to a
      // human and as a contradiction to a crawler.
      {
        title:
          langFromParam(params.lang) === "fr"
            ? `${fullName} (${handle}) - ${l(jobTitle, "fr")}, expert React & React Native. Freelance.`
            : `${fullName} (${handle}) - ${l(jobTitle, "en")}, React & React Native Expert. Freelance.`,
      },
      {
        name: "description",
        content:
          langFromParam(params.lang) === "fr"
            ? `${nickname} est ${lowerKeepingAcronyms(l(jobTitle, "fr"))} freelance - ${l(workLocation, "fr")}. Il construit des sites, des applications web et mobiles avec React & React Native, en freelance depuis ${freelanceSince}. ${l(availabilityLabel, "fr")}.`
            : `${nickname} is a freelance ${l(jobTitle, "en")} - ${l(workLocation, "en")}. He builds websites, web apps and mobile apps with React & React Native, freelance since ${freelanceSince}. ${l(availabilityLabel, "en")}.`,
      },
    ],
  }),
  component: function PageHome() {
    return <HomePage items={Route.useLoaderData()} />;
  },
});
