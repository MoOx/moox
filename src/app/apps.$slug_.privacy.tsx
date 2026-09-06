import { fetchApp } from "@/api";
import MdAsJsonRenderer from "@/components/MdAsJsonRenderer";
import WebsiteError from "@/components/WebsiteError";
import WebsiteWrapper from "@/components/WebsiteWrapper";
import { website } from "@/consts";
import Container from "@/react-multiversal/Container";
import { fontStyles } from "@/react-multiversal/font";
import LinkText from "@/react-multiversal/LinkText";
import SpacedView from "@/react-multiversal/SpacedView";
import Spacer from "@/react-multiversal/Spacer";
import { useTheme } from "@/styles";
import { createFileRoute } from "@tanstack/react-router";
import { Text, View } from "react-native";

/**
 * The app's privacy policy, whole, at `/apps/<slug>/privacy`.
 *
 * `$slug_` and not `$slug`: the trailing underscore is what stops the app's
 * own route from becoming this one's layout (same reason `resume_.$slug`
 * carries one).
 *
 * This is the page a store review reads, so it is the app's own
 * `marketing/privacy.md` and nothing else - no summary, no excerpt. Whatever
 * the app publishes is what is here, and `npm run apps` fails the build rather
 * than render it empty.
 */
export const Route = createFileRoute("/apps/$slug_/privacy")({
  loader: ({ params }) => fetchApp(params.slug),
  head: ({ loaderData: app }) =>
    !app
      ? {}
      : {
          links: [{ rel: "canonical", href: `${website}/apps/${app.slug}/privacy` }],
          meta: [
            { title: `${app.privacy.title} - ${app.name}` },
            { name: "description", content: app.privacy.summary ?? "" },
            // Nothing to index here beyond the page itself: the policy is a
            // contract, not a shareable card.
            { name: "robots", content: "index, follow" },
          ],
        },
  component: PageAppPrivacy,
});

function PageAppPrivacy() {
  const app = Route.useLoaderData();
  const theme = useTheme();

  if (!app) {
    return <WebsiteError statusCode={404} />;
  }

  return (
    <WebsiteWrapper>
      <View role="article" style={theme.styles.back}>
        <Container horizontal="l" vertical="xl">
          <SpacedView horizontal="l" style={{ maxWidth: 720 }}>
            <LinkText href={`/apps/${app.slug}`} style={theme.styles.textMainDark}>
              <Text style={fontStyles.iosEm.callout}>{`← ${app.name}`}</Text>
            </LinkText>
            <Spacer size="m" />
            <View role="heading" aria-level={1}>
              <Text style={[fontStyles.iosEm.largeTitle, theme.styles.text]}>
                {app.privacy.title}
              </Text>
            </View>
            <MdAsJsonRenderer body={app.privacy.body} />
          </SpacedView>
        </Container>
      </View>
    </WebsiteWrapper>
  );
}
