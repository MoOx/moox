import { ResumeItem } from "@/api";
import ResumeEntryDetailCard from "@/components/ResumeEntryDetailCard";
import WebsiteError from "@/components/WebsiteError";
import WebsiteWrapper from "@/components/WebsiteWrapper";
import { useHref, useT } from "@/i18n";
import Container from "@/react-multiversal/Container";
import { fontStyles } from "@/react-multiversal/font";
import LinkText from "@/react-multiversal/LinkText";
import Spacer from "@/react-multiversal/Spacer";
import { useTheme } from "@/styles";

/**
 * Standalone detail of ONE experience - the page a crawler, a deep link or a
 * reload lands on. From `/resume` the same content opens as a modal instead
 * (see `ResumeEntryModal`), with this URL masked over the timeline - the
 * TanStack equivalent of Next.js' intercepting routes.
 *
 * On the app there is nothing to mask and no modal: this *is* the screen the
 * tap pushes. Same component either way.
 */
export default function ResumeEntryPage({ item }: { item: ResumeItem | null }) {
  const theme = useTheme();
  const t = useT();
  const localizeHref = useHref();

  if (!item) {
    return <WebsiteError statusCode={404} />;
  }

  return (
    <WebsiteWrapper>
      <Spacer size="l" />
      <Container horizontal="l" gap="m" maxWidth={720}>
        {/* The timeline cards carry `id={item.slug}` anchors, so this lands
            right back on the entry's card. */}
        {/* `LinkText`, not the router's `<Link>`: that one renders a real DOM
            anchor, which has no view manager on native. */}
        <LinkText
          href={`${localizeHref("/resume")}#${item.slug}`}
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
        <ResumeEntryDetailCard item={item} />
      </Container>
      <Spacer size="xl" />
    </WebsiteWrapper>
  );
}
