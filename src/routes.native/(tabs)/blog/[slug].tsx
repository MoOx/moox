import BlogPostPage from "@/pages/BlogPostPage";
import { useLocalSearchParams } from "expo-router";
import { QueryView, useContentItemQuery } from "@/native/query";
import Screen from "@/native/Screen";

export default function BlogPostScreen() {
  const { slug } = useLocalSearchParams<{ slug: string }>();
  const query = useContentItemQuery("blog", slug);
  return (
    <Screen>
      <QueryView query={query} testID="loaded-blog-post">{(item) => <BlogPostPage item={item} />}</QueryView>
    </Screen>
  );
}
