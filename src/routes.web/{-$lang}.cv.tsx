import { fetchAll, fetchResume } from "@/api";
import { alternateLinks, langFromParam } from "@/i18n";
import { assertLangParam } from "@/i18n.route";
import CvPage from "@/pages/CvPage";
import {
  fullName,
  metaDescription,
  metaKeywords,
  metaSubject,
  metaTitle,
  nickname,
} from "@/profile";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/{-$lang}/cv")({
  beforeLoad: ({ params }) => assertLangParam(params.lang),
  loader: async ({ params }) => {
    const [resume, talks, blog] = await Promise.all([
      fetchResume(langFromParam(params.lang)),
      fetchAll({ data: "talks" }),
      fetchAll({ data: "blog" }),
    ]);
    return { resume, talks, blog };
  },
  head: ({ params }) => ({
    links: alternateLinks("/cv", langFromParam(params.lang)),
    meta: [
      // The page keeps the title short for the eye; the keywords a crawler, an
      // LLM or a job board matches on live here, where length is free. The PDF
      // export reads these same tags back off the rendered page to fill the
      // PDF's /Info dictionary, so this is the single source of truth.
      { title: metaTitle(langFromParam(params.lang)) },
      {
        name: "description",
        content: metaDescription(langFromParam(params.lang)),
      },
      { name: "author", content: `${fullName} (${nickname})` },
      {
        name: "keywords",
        content: metaKeywords(langFromParam(params.lang)).join(", "),
      },
      { name: "subject", content: metaSubject(langFromParam(params.lang)) },
    ],
  }),
  component: function PageCV() {
    const { resume, talks, blog } = Route.useLoaderData();
    return <CvPage resume={resume} talks={talks} blog={blog} />;
  },
});
