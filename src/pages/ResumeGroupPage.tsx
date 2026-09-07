import { ResumeItem } from "@/api";
import ResumeEntryDetailCard from "@/components/ResumeEntryDetailCard";
import WebsiteError from "@/components/WebsiteError";
import WebsiteWrapper from "@/components/WebsiteWrapper";
import { useHref, useT } from "@/i18n";
import { size } from "@/react-multiversal";
import Container from "@/react-multiversal/Container";
import { fontStyles } from "@/react-multiversal/font";
import LinkText from "@/react-multiversal/LinkText";
import Spacer from "@/react-multiversal/Spacer";
import { useTheme } from "@/styles";
import { View } from "react-native";

/**
 * Standalone detail of a grouped client (`group` frontmatter flag): every
 * mission of the group, newest first - what the key-experience cards link to.
 * Single entries live on `/resume/<slug>` instead.
 */
export default function ResumeGroupPage({
  members,
  lead,
}: {
  members: ResumeItem[];
  lead: ResumeItem | undefined;
}) {
  const theme = useTheme();
  const t = useT();
  const localizeHref = useHref();

  if (!lead) {
    return <WebsiteError statusCode={404} />;
  }

  return (
    <WebsiteWrapper>
      <Spacer size="l" />
      <Container horizontal="l" gap="m" maxWidth={720}>
        <LinkText
          href={`${localizeHref("/resume")}#${lead.slug}`}
          style={[
            fontStyles.iosEm.callout,
            { color: theme.dynamicColors.textFlashy3, alignSelf: "flex-start" },
          ]}
        >
          {t({
            en: "← All experience - back to the timeline",
            fr: "← Toutes les expériences - retour à la frise",
          })}
        </LinkText>
        <View style={{ gap: size("m") }}>
          {members.map((member) => (
            <ResumeEntryDetailCard
              key={member.slug}
              item={member}
              transitionEnabled={member.slug === lead.slug}
            />
          ))}
        </View>
      </Container>
      <Spacer size="xl" />
    </WebsiteWrapper>
  );
}
