import { fetchApps } from "@/api";
import AppHero from "@/components/AppHero";
import WebsiteWrapper from "@/components/WebsiteWrapper";
import { website } from "@/consts";
import Container from "@/react-multiversal/Container";
import { fontStyles } from "@/react-multiversal/font";
import SpacedView from "@/react-multiversal/SpacedView";
import { useTheme } from "@/styles";
import { createFileRoute } from "@tanstack/react-router";
import { Text, View } from "react-native";

/**
 * `/apps` - the apps, each one as the top of its own page.
 *
 * Same `AppHero` the app's page opens with, so the list and the page cannot
 * describe an app differently: the icon, the name, the App Store subtitle,
 * Play's one-liner, the deck's opening screen, both store badges, and a way
 * through to the rest.
 *
 * English only, like `/blog` and `/talks`: an app's own listing is already in
 * the visitor's language, and this page exists for the people arriving from it.
 */
export const Route = createFileRoute("/apps/")({
  loader: () => fetchApps(),
  head: () => ({
    links: [{ rel: "canonical", href: `${website}/apps` }],
    meta: [
      { title: "Apps - Maxime Thirouin (MoOx)" },
      {
        name: "description",
        content:
          "The apps I build and publish on the App Store and on Google Play, " +
          "with what each one does and its privacy policy.",
      },
    ],
  }),
  component: PageApps,
});

function PageApps() {
  const apps = Route.useLoaderData();
  const theme = useTheme();

  return (
    <WebsiteWrapper>
      <View role="article" style={theme.styles.back}>
        <Container horizontal="l" vertical="xl">
          <SpacedView horizontal="l" gap="s" style={{ maxWidth: 720 }}>
            <View role="heading" aria-level={1}>
              <Text style={[fontStyles.iosEm.largeTitle, theme.styles.text]}>{"Apps"}</Text>
            </View>
            <Text role="paragraph" style={[fontStyles.iosEm.body, theme.styles.textLight1]}>
              {"Small things I build for myself and publish because they may as well be useful " +
                "to somebody else. Free, and none of them wants an account."}
            </Text>
          </SpacedView>
        </Container>
        {apps.map((app, index) => (
          // The same alternation as an app's own page: white, then the site's
          // alternate surface, so two apps never run into each other.
          <View key={app.slug} style={index % 2 === 0 ? theme.styles.backAlt : theme.styles.back}>
            <AppHero app={app} level={2} moreHref={`/apps/${app.slug}`} />
          </View>
        ))}
      </View>
    </WebsiteWrapper>
  );
}
