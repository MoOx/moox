import { fetchAll, fetchOne } from "@/api";
import { ResumeTimelineEntry } from "@/components/ResumeTimelineEntry";
import WebsiteError from "@/components/WebsiteError";
import WebsiteWrapper from "@/components/WebsiteWrapper";
import { fullName, groupKey, pitchOf } from "@/profile";
import { size } from "@/react-multiversal";
import Container from "@/react-multiversal/Container";
import { fontStyles } from "@/react-multiversal/font";
import SpacedView from "@/react-multiversal/SpacedView";
import Spacer from "@/react-multiversal/Spacer";
import { useTheme } from "@/styles";
import { createFileRoute, Link } from "@tanstack/react-router";
import { Text, View } from "react-native";

/**
 * Standalone detail of one experience - the page a crawler, a deep link or a
 * reload lands on. From `/resume` the same content opens as a modal instead
 * (see `ResumeEntryModal`), with this URL masked over the timeline - the
 * TanStack equivalent of Next.js' intercepting routes. The split is
 * deliberate SEO: this page carries only the entry (plus its group's sibling
 * missions), not the whole résumé drowning it.
 */
export const Route = createFileRoute("/resume_/$slug")({
  loader: async ({ params }) => {
    const filename = decodeURIComponent(params.slug) + ".json";
    const [item, all] = await Promise.all([
      fetchOne({ data: { filename, contentType: "resume" } }),
      fetchAll({ data: "resume" }),
    ]);
    const members = item
      ? all
          .filter((i) => groupKey(i) === groupKey(item))
          .sort((a, b) =>
            (b.dateEnd || "9999") < (a.dateEnd || "9999") ? -1 : 1,
          )
      : [];
    return { item, members };
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
  const { item, members } = Route.useLoaderData();
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
            <Text
              style={[
                fontStyles.iosEm.callout,
                { color: theme.dynamicColors.textFlashy3 },
              ]}
            >
              {"← All experience - back to the timeline"}
            </Text>
          </Link>
          {/* Grouped clients: every mission of the group, newest first. */}
          <View style={{ gap: size("m") }}>
            {members.map((member) => (
              <ResumeTimelineEntry
                key={member.slug}
                item={member}
                detail={true}
                transitionEnabled={member.slug === item.slug}
              />
            ))}
          </View>
        </SpacedView>
      </Container>
      <Spacer size="xl" />
    </WebsiteWrapper>
  );
}
