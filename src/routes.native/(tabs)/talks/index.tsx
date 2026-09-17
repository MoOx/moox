import TalkListPage from "@/pages/TalkListPage";
import { QueryView, useContentQuery } from "@/native/query";
import Screen from "@/native/Screen";

export default function TalksScreen() {
  const query = useContentQuery("talks");
  return (
    <Screen>
      <QueryView query={query} testID="loaded-talks">{(items) => <TalkListPage items={items} />}</QueryView>
    </Screen>
  );
}
