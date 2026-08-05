import { fetchResume } from "@/api";
import BlockAugmentedWithAI from "@/components/BlockAugmentedWithAI";
import BlockBuilder from "@/components/BlockBuilder";
import BlockCompaniesTried from "@/components/BlockCompaniesTried";
import BlockCompaniesTrust from "@/components/BlockCompaniesTrust";
import BlockHey from "@/components/BlockHey";
import BlockPassionated from "@/components/BlockPassionated";
import BlockPitch from "@/components/BlockPitch";
import BlockTestimonials from "@/components/BlockTestimonials";
import WebsiteWrapper from "@/components/WebsiteWrapper";
import {
  availabilityLabel,
  freelanceSince,
  fullName,
  handle,
  jobTitle,
  nickname,
  personJsonLd,
  workLocation,
} from "@/profile";
import { alternateLinks, assertLangParam, l, langFromParam } from "@/i18n";
import Spacer from "@/react-multiversal/Spacer";
import { createFileRoute } from "@tanstack/react-router";
import { View } from "react-native";

export const Route = createFileRoute("/{-$lang}/")({
  beforeLoad: ({ params }) => assertLangParam(params.lang),
  loader: ({ params }) => fetchResume(langFromParam(params.lang)),
  head: ({ params }) => ({
    links: alternateLinks("/", langFromParam(params.lang)),
    meta: [
      // Same title vocabulary as `/cv` and `/resume` (see profile.tsx): three
      // pages advertising three different job titles read as sloppiness to a
      // human and as a contradiction to a crawler.
      {
        title:
          langFromParam(params.lang) === "fr"
            ? `${fullName} (${handle}) - ${jobTitle}, expert React & React Native. Freelance.`
            : `${fullName} (${handle}) - ${jobTitle}, React & React Native Expert. Freelance.`,
      },
      {
        name: "description",
        content:
          langFromParam(params.lang) === "fr"
            ? `${nickname} est ${jobTitle} freelance - ${l(workLocation, "fr")}. Il construit des sites, des applications web et mobiles avec React & React Native, en freelance depuis ${freelanceSince}. ${l(availabilityLabel, "fr")}.`
            : `${nickname} is a freelance ${jobTitle} - ${l(workLocation, "en")}. He builds websites, web apps and mobile apps with React & React Native, freelance since ${freelanceSince}. ${l(availabilityLabel, "en")}.`,
      },
    ],
  }),
  component: Home,
});

function Home() {
  const items = Route.useLoaderData();
  const resumeEntry = items.find((item) => item.slug.includes("pekin"));
  return (
    <WebsiteWrapper>
      {/* Machine-readable twin of the page, same data as /cv and /resume. */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(personJsonLd(items)),
        }}
      />
      <View role="article">
        <BlockHey />
        <BlockBuilder resumeEntry={resumeEntry} />
        <Spacer size="xxxl" />
        <Spacer size="m" />
        <BlockPitch />
        <Spacer size="l" />
        <BlockCompaniesTrust />
        <Spacer size="xxl" />
        <BlockTestimonials />
        <Spacer size="xl" />
        <BlockCompaniesTried />
        <Spacer size="xxl" />
        <BlockPassionated />
        <Spacer size="xxl" />
        <BlockAugmentedWithAI />
      </View>
    </WebsiteWrapper>
  );
}
