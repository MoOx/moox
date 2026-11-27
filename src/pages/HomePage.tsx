import { ResumeItem } from "@/api";
import BlockAugmentedWithAI from "@/components/BlockAugmentedWithAI";
import BlockBuilder from "@/components/BlockBuilder";
import BlockCompaniesTried from "@/components/BlockCompaniesTried";
import BlockCompaniesTrust from "@/components/BlockCompaniesTrust";
import BlockHey from "@/components/BlockHey";
import BlockPassionated from "@/components/BlockPassionated";
import BlockPitch from "@/components/BlockPitch";
import BlockTestimonials from "@/components/BlockTestimonials";
import WebsiteWrapper from "@/components/WebsiteWrapper";
import { personJsonLd } from "@/profile";
import { size } from "@/react-multiversal";
import Spacer from "@/react-multiversal/Spacer";
import { Platform, View } from "react-native";

export default function HomePage({ items }: { items: ResumeItem[] }) {
  const resumeEntry = items.find((item) => item.slug.includes("pekin"));
  return (
    <WebsiteWrapper>
      {/* Machine-readable twin of the page, same data as /cv and /resume. */}
      {/* Structured data for crawlers: a `<script>` element, so web only. */}
      {Platform.OS === "web" ? (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(personJsonLd(items)),
          }}
        />
      ) : null}
      <View role="article">
        <BlockHey />
        <BlockBuilder resumeEntry={resumeEntry} />
        {Platform.OS === "web" ? (
          <>
            <Spacer size={size("xxxl") + size("m")} />
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
          </>
        ) : null}
      </View>
    </WebsiteWrapper>
  );
}
