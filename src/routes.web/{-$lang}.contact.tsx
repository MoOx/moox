import { alternateLinks, langFromParam } from "@/i18n";
import { assertLangParam } from "@/i18n.route";
import ContactPage from "@/pages/ContactPage";
import { fullName, jobTitle } from "@/profile";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/{-$lang}/contact")({
  beforeLoad: ({ params }) => assertLangParam(params.lang),
  head: ({ params }) => ({
    links: alternateLinks("/contact", langFromParam(params.lang)),
    meta: [
      {
        // Derived from `profile.tsx`, like every other page title: this one had
        // been left behind on "Senior Front-End Architect", the title the CV
        // rework retired everywhere else.
        title:
          langFromParam(params.lang) === "fr"
            ? `Contacter ${fullName}, ${jobTitle}, expert React & React Native.`
            : `Contact ${fullName}, ${jobTitle}, React & React Native Expert.`,
      },
    ],
  }),
  component: function PageContact() {
    return <ContactPage />;
  },
});
