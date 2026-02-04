import * as React from "react";

import { getAll, getOne, Talk } from "@/api";
import TalkView from "@/components/TalkView";
import WebsiteError from "@/components/WebsiteError";
import WebsiteWrapper from "@/components/WebsiteWrapper";
import Container from "@/react-multiversal/Container";

export async function generateStaticParams() {
  const talks = getAll<Talk>("talks");
  return talks.map((talk) => ({
    slug: talk.slug.replace("talks/", ""),
  }));
}

export default async function PageTalkView({
  params,
}: {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const { slug } = await params;
  const item = getOne<Talk>(decodeURIComponent(slug) + ".json", "talks");

  if (!item) {
    return <WebsiteError statusCode={404} />;
  }

  return (
    <WebsiteWrapper>
      <Container maxWidth={640}>
        <TalkView item={item} />
      </Container>
    </WebsiteWrapper>
  );
}
