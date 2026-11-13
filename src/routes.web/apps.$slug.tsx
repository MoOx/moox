import { AppPage, fetchApp } from "@/api";
import AppLandingPage from "@/components/AppLandingPage";
import WebsiteError from "@/components/WebsiteError";
import WebsiteWrapper from "@/components/WebsiteWrapper";
import { website } from "@/consts";
import { createFileRoute } from "@tanstack/react-router";

/**
 * `/apps/<slug>`, one page per app in `content/apps.json`, all of them served
 * by the same template. English only, like `/blog` and `/talks`: the store
 * listings are translated six ways, but this URL exists for the two stores and
 * for people arriving from them, and the listing they arrive from is already
 * in their language.
 */
/** The one line that describes the app, whichever of the two the app has. */
const appDescription = (app: AppPage) =>
  app.short || app.description[0] || app.subtitle || app.name;

export const Route = createFileRoute("/apps/$slug")({
  loader: ({ params }) => fetchApp(params.slug),
  head: ({ loaderData: app }) =>
    !app
      ? {}
      : {
          links: [{ rel: "canonical", href: `${website}/apps/${app.slug}` }],
          meta: [
            // Every one of these is optional in a store listing, so none of
            // them is assumed: an app with no subtitle would otherwise get a
            // title ending in a dash, and one with no short description a
            // `content` of `undefined`.
            { title: [app.name, app.subtitle].filter(Boolean).join(" - ") },
            { name: "description", content: appDescription(app) },
            { name: "keywords", content: app.keywords.join(", ") },
            { property: "og:type", content: "website" },
            { property: "og:title", content: app.name },
            { property: "og:description", content: appDescription(app) },
            // The icon rather than a screenshot: the shots are phone-shaped,
            // and a card built for a landscape image crops them to a stripe.
            { property: "og:image", content: website + app.icon.src },
            { name: "twitter:card", content: "summary" },
          ],
        },
  component: PageApp,
});

function PageApp() {
  const app = Route.useLoaderData();

  if (!app) {
    return <WebsiteError statusCode={404} />;
  }

  return (
    <WebsiteWrapper>
      {/* The listing as data, for anything reading the page rather than
          looking at it - the same reason `/` carries a Person. */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "MobileApplication",
            name: app.name,
            description: app.description.join("\n\n"),
            applicationCategory: "UtilitiesApplication",
            operatingSystem: "iOS, Android",
            url: `${website}/apps/${app.slug}`,
            image: website + app.icon.src,
            screenshot: app.story
              .filter((step) => step.image)
              .map((step) => website + step.image?.src),
            sameAs: [app.stores.appStore, app.stores.play],
            privacyPolicy: `${website}/apps/${app.slug}/privacy`,
            // No `offers`: the trio publishes no price, and a hard-coded free
            // one is a fact this page would be inventing for every app after
            // the first paid one. Structured data is read as a claim.
          }),
        }}
      />
      <AppLandingPage app={app} />
    </WebsiteWrapper>
  );
}
