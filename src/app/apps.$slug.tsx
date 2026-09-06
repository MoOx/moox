import { fetchApp } from "@/api";
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
export const Route = createFileRoute("/apps/$slug")({
  loader: ({ params }) => fetchApp(params.slug),
  head: ({ loaderData: app }) =>
    !app
      ? {}
      : {
          links: [{ rel: "canonical", href: `${website}/apps/${app.slug}` }],
          meta: [
            { title: `${app.name} - ${app.subtitle}` },
            { name: "description", content: app.short || app.description[0] },
            { name: "keywords", content: app.keywords.join(", ") },
            { property: "og:type", content: "website" },
            { property: "og:title", content: app.name },
            { property: "og:description", content: app.short || app.description[0] },
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
            privacyPolicy: `${website}/apps/${app.slug}#privacy`,
            offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
          }),
        }}
      />
      <AppLandingPage app={app} />
    </WebsiteWrapper>
  );
}
