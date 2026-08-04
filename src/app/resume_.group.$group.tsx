import { fetchAll, ResumeItem } from "@/api";
import ResumeEntryDetailCard from "@/components/ResumeEntryDetailCard";
import WebsiteError from "@/components/WebsiteError";
import WebsiteWrapper from "@/components/WebsiteWrapper";
import { fullName, pitchOf, titleOf } from "@/profile";
import { size } from "@/react-multiversal";
import Container from "@/react-multiversal/Container";
import { fontStyles } from "@/react-multiversal/font";
import SpacedView from "@/react-multiversal/SpacedView";
import Spacer from "@/react-multiversal/Spacer";
import { useTheme } from "@/styles";
import { createFileRoute, Link } from "@tanstack/react-router";
import { Text, View } from "react-native";

const byDateDesc = (a: ResumeItem, b: ResumeItem) =>
  (b.dateEnd || "9999") < (a.dateEnd || "9999") ? -1 : 1;

/**
 * Standalone detail of a grouped client (`group` frontmatter flag): every
 * mission of the group, newest first - what the key-experience cards link
 * to. Single entries live on `/resume/<slug>` instead.
 */
export const Route = createFileRoute("/resume_/group/$group")({
  loader: async ({ params }) => {
    const group = decodeURIComponent(params.group);
    const all = await fetchAll({ data: "resume" });
    const members = all.filter((i) => i.group === group).sort(byDateDesc);
    // The highlight entry carries the group-wide copy (groupTitle/groupPitch).
    const lead = members.find((i) => i.highlight) ?? members[0];
    return { members, lead };
  },
  head: ({ loaderData }) => ({
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
  component: PageResumeGroup,
});

function PageResumeGroup() {
  const { members, lead } = Route.useLoaderData();
  const theme = useTheme();

  if (!lead) {
    return <WebsiteError statusCode={404} />;
  }

  return (
    <WebsiteWrapper>
      <Spacer size="l" />
      <Container maxWidth={720}>
        <SpacedView horizontal="l" gap="m">
          <Link
            to="/resume"
            hash={lead.slug}
            style={{ textDecoration: "none", alignSelf: "flex-start" }}
          >
            <Text style={[fontStyles.iosEm.callout, { color: theme.dynamicColors.textFlashy3 }]}>
              {"← All experience - back to the timeline"}
            </Text>
          </Link>
          <View style={{ gap: size("m") }}>
            {members.map((member) => (
              <ResumeEntryDetailCard
                key={member.slug}
                item={member}
                transitionEnabled={member.slug === lead.slug}
              />
            ))}
          </View>
        </SpacedView>
      </Container>
      <Spacer size="xl" />
    </WebsiteWrapper>
  );
}
