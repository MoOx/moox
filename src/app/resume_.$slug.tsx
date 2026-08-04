import { fetchOne } from "@/api";
import ResumeEntryDetailCard from "@/components/ResumeEntryDetailCard";
import WebsiteError from "@/components/WebsiteError";
import WebsiteWrapper from "@/components/WebsiteWrapper";
import { fullName, pitchOf } from "@/profile";
import Container from "@/react-multiversal/Container";
import { fontStyles } from "@/react-multiversal/font";
import SpacedView from "@/react-multiversal/SpacedView";
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
export const Route = createFileRoute("/resume_/$slug")({
  loader: async ({ params }) => {
    const filename = decodeURIComponent(params.slug) + ".json";
    const item = await fetchOne({ data: { filename, contentType: "resume" } });
    return { item };
  },
  head: ({ loaderData }) => ({
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
  const theme = useTheme();

  if (!item) {
    return <WebsiteError statusCode={404} />;
  }

  return (
    <WebsiteWrapper>
      <Spacer size="l" />
      <Container maxWidth={720}>
        <SpacedView horizontal="l" gap="m">
          {/* The timeline cards carry `id={item.slug}` anchors, so this lands
              right back on the entry's card. */}
          <Link
            to="/resume"
            hash={item.slug}
            style={{ textDecoration: "none", alignSelf: "flex-start" }}
          >
            <Text style={[fontStyles.iosEm.callout, { color: theme.dynamicColors.textFlashy3 }]}>
              {"← All experience - back to the timeline"}
            </Text>
          </Link>
          <ResumeEntryDetailCard item={item} />
        </SpacedView>
      </Container>
      <Spacer size="xl" />
    </WebsiteWrapper>
  );
}
