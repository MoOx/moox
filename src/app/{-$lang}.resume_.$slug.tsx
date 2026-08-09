import { fetchResumeEntry } from "@/api";
import ResumeEntryDetailCard from "@/components/ResumeEntryDetailCard";
import WebsiteError from "@/components/WebsiteError";
import WebsiteWrapper from "@/components/WebsiteWrapper";
import { alternateLinks, assertLangParam, langFromParam, useT } from "@/i18n";
import { fullName, pitchOf } from "@/profile";
import Container from "@/react-multiversal/Container";
import { fontStyles } from "@/react-multiversal/font";
import Spacer from "@/react-multiversal/Spacer";
import { useTheme } from "@/styles";
import { createFileRoute, Link } from "@tanstack/react-router";
import { Text } from "react-native";

/**
 * Standalone detail of ONE experience - the page a crawler, a deep link or a
 * reload lands on. From `/resume` the same content opens as a modal instead
 * (see `ResumeEntryModal`), with this URL masked over the timeline - the
 * TanStack equivalent of Next.js' intercepting routes. Grouped clients have
 * their own page listing every mission: `/resume/group/<group>`.
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
  component: PageResumeEntry,
});

function PageResumeEntry() {
  const { item } = Route.useLoaderData();
  const { lang } = Route.useParams();
  const theme = useTheme();
  const t = useT();

  if (!item) {
    return <WebsiteError statusCode={404} />;
  }

  return (
    <WebsiteWrapper>
      <Spacer size="l" />
      <Container horizontal="l" gap="m" maxWidth={720}>
        {/* The timeline cards carry `id={item.slug}` anchors, so this lands
            right back on the entry's card. */}
        <Link
          to="/{-$lang}/resume"
          params={{ lang }}
          hash={item.slug}
          style={{ textDecoration: "none", alignSelf: "flex-start" }}
        >
          <Text style={[fontStyles.iosEm.callout, { color: theme.dynamicColors.textFlashy3 }]}>
            {t({
              en: "← All experience - back to the timeline",
              fr: "← Toutes les expériences - retour à la frise",
            })}
          </Text>
        </Link>
        <ResumeEntryDetailCard item={item} />
      </Container>
      <Spacer size="xl" />
    </WebsiteWrapper>
  );
}
