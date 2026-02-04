import * as React from "react";

import { BlogPost, getAll, getOne } from "@/api";
import BlogPostView from "@/components/BlogPostView";
import WebsiteError from "@/components/WebsiteError";
import WebsiteWrapper from "@/components/WebsiteWrapper";
import Container from "@/react-multiversal/Container";

export async function generateStaticParams() {
  const posts = getAll<BlogPost>("blog");
  return posts.map((post) => ({
    slug: post.slug.replace("blog/", ""),
  }));
}

export default async function PageBlogPostView({
  params,
}: {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const { slug } = await params;
  const item = getOne<BlogPost>(decodeURIComponent(slug) + ".json", "blog");

  if (!item) {
    return <WebsiteError statusCode={404} />;
  }

  return (
    <WebsiteWrapper>
      <Container maxWidth={640}>
        <BlogPostView item={item} />
      </Container>
    </WebsiteWrapper>
  );
}
