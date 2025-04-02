import * as React from "react";
import { View } from "react-native";

import { getAll, ResumeItem } from "@/api";
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

export default function Home() {
  const resumeEntry = getAll<ResumeItem>("resume").find((item) =>
    item.slug.includes("pekin")
  );
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
