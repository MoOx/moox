import TalkPage from "@/pages/TalkPage";
import { useLocalSearchParams } from "expo-router";
import { QueryView, useContentItemQuery } from "@/native/query";
import Screen from "@/native/Screen";

export default function TalkScreen() {
  const { slug } = useLocalSearchParams<{ slug: string }>();
  const query = useContentItemQuery("talks", slug);
  return (
    <Screen>
      <QueryView query={query} testID="loaded-talk">{(item) => <TalkPage item={item} />}</QueryView>
    </Screen>
  );
}
