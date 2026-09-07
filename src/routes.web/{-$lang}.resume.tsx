import { fetchAll, fetchResume, ResumeItem } from "@/api";
import { alternateLinks, langFromParam } from "@/i18n";
import { assertLangParam } from "@/i18n.route";
import ResumePage from "@/pages/ResumePage";
import { fullName, jobTitle, metaDescription, nickname } from "@/profile";
import { createFileRoute, useNavigate } from "@tanstack/react-router";

export const Route = createFileRoute("/{-$lang}/resume")({
  beforeLoad: ({ params }) => assertLangParam(params.lang),
  // `?detail=<short-slug>` opens one entry as a modal above the page,
  // `?group=<group>` opens every mission of a grouped client - both masked as
  // their real standalone URL in the address bar (see ResumeEntryModal). The
  // keys must stay optional in the returned type, or every Link to /resume
  // would be forced to pass a `search` prop.
  validateSearch: (search: Record<string, unknown>): { detail?: string; group?: string } => ({
    ...(typeof search.detail === "string" ? { detail: search.detail } : {}),
    ...(typeof search.group === "string" ? { group: search.group } : {}),
  }),
  loader: async ({ params }) => {
    const [resume, talks, blog] = await Promise.all([
      fetchResume(langFromParam(params.lang)),
      fetchAll({ data: "talks" }),
      fetchAll({ data: "blog" }),
    ]);
    return { resume, talks, blog };
  },
  head: ({ params }) => ({
    links: alternateLinks("/resume", langFromParam(params.lang)),
    meta: [
      // Same title vocabulary as `/` and `/cv` (see profile.tsx) - one job
      // title site-wide, for humans and crawlers alike.
      {
        title:
          langFromParam(params.lang) === "fr"
            ? `${fullName} (${nickname}) - CV & parcours - ${jobTitle}`
            : `${fullName} (${nickname}) - Résumé & Experience Timeline - ${jobTitle}`,
      },
      {
        name: "description",
        content: metaDescription(langFromParam(params.lang)),
      },
    ],
  }),
  component: PageResume,
});

/**
 * The route around `ResumePage`, and the half of it that is genuinely a web
 * mechanism: the query string that says what is open, and the URL mask that
 * keeps the standalone page shareable while a modal covers the timeline.
 *
 * `src/routes.native/(tabs)/resume/index.tsx` is the same twenty lines answered with a
 * stack push, and reading them side by side is the shortest description of
 * what changes between a site and an app.
 */
function PageResume() {
  const { resume, talks, blog } = Route.useLoaderData();
  const { detail, group } = Route.useSearch();
  // Every navigation from this page stays in the language it is served in.
  const lang = Route.useParams().lang;
  const navigate = useNavigate();

  // The Next.js "intercepting routes" pattern, TanStack-style: the ⓘ links
  // keep their real href (crawlers and no-JS land on the standalone pages),
  // but a click is intercepted to open the modal over the page - URL masked
  // as the real one, so reload & share still get the standalone page.
  const openEntry = (item: ResumeItem, event?: { preventDefault?: () => void }) => {
    event?.preventDefault?.();
    const slug = item.slug.split("/").pop() ?? item.slug;
    void navigate({
      to: "/{-$lang}/resume",
      params: { lang },
      search: { detail: slug },
      // The page stays where it is - the modal opens over it.
      resetScroll: false,
      // On reload, load the masked URL for real → the standalone page
      // (without this the router restores the masked state from history and
      // re-opens the modal).
      mask: {
        to: "/{-$lang}/resume/$slug",
        params: { lang, slug },
        unmaskOnReload: true,
      },
    });
  };

  // Grouped clients (key-experience cards): the whole group in one modal,
  // masked as /resume/group/<group>. Ungrouped ones fall back to the entry.
  const openGroup = (item: ResumeItem, event?: { preventDefault?: () => void }) => {
    if (!item.group) {
      openEntry(item, event);
      return;
    }
    event?.preventDefault?.();
    void navigate({
      to: "/{-$lang}/resume",
      params: { lang },
      search: { group: item.group },
      resetScroll: false,
      mask: {
        to: "/{-$lang}/resume/group/$group",
        params: { lang, group: item.group },
        unmaskOnReload: true,
      },
    });
  };

  return (
    <ResumePage
      blog={blog}
      detail={detail}
      group={group}
      onOpenEntry={openEntry}
      onOpenGroup={openGroup}
      resume={resume}
      talks={talks}
    />
  );
}
