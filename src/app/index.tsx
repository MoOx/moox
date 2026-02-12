import { fetchAll } from "@/api";
import BlockAugmentedWithAI from "@/components/BlockAugmentedWithAI";
import BlockBuilder from "@/components/BlockBuilder";
import BlockCompaniesTried from "@/components/BlockCompaniesTried";
import BlockCompaniesTrust from "@/components/BlockCompaniesTrust";
import BlockFrontendArchitect from "@/components/BlockFrontendArchitect";
import BlockHey from "@/components/BlockHey";
import BlockPassionated from "@/components/BlockPassionated";
import BlockTestimonials from "@/components/BlockTestimonials";
import WebsiteWrapper from "@/components/WebsiteWrapper";
import Spacer from "@/react-multiversal/Spacer";
import { createFileRoute } from "@tanstack/react-router";
import { View } from "react-native";

export const Route = createFileRoute("/")({
  loader: () => fetchAll({ data: "resume" }),
  head: () => ({
    meta: [
      {
        title:
          "MoOx, Freelance Front-End Senior Developer, React & React Native Expert.",
      },
      {
        name: "description",
        content:
          "Max is a Freelance Front-End Developer based in France. He build websites, web apps and mobile apps mostly using React & React Native.",
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
      <View role="article">
        <BlockHey />
        <BlockBuilder resumeEntry={resumeEntry} />
        <Spacer size="xxxl" />
        <Spacer size="m" />
        <BlockFrontendArchitect />
        <Spacer size="l" />
        <BlockCompaniesTried />
        <Spacer size="xl" />
        <BlockPassionated />
        <Spacer size="xxl" />
        <BlockAugmentedWithAI />
        <Spacer size="xxl" />
        <BlockTestimonials />
        <Spacer size="xl" />
        <BlockCompaniesTrust />
      </View>
    </WebsiteWrapper>
  );
}
