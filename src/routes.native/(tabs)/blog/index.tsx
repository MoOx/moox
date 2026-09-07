import BlogListPage from "@/pages/BlogListPage";
import { QueryView, useContentQuery } from "@/native/query";
import Screen from "@/native/Screen";

export default function BlogScreen() {
  const query = useContentQuery("blog");
  return (
    <Screen>
      <QueryView query={query} testID="loaded-blog">{(items) => <BlogListPage items={items} />}</QueryView>
    </Screen>
  );
}
