import ResumeEntryPage from "@/pages/ResumeEntryPage";
import { useLocalSearchParams } from "expo-router";
import { QueryView, useResumeEntryQuery } from "@/native/query";
import Screen from "@/native/Screen";

/**
 * `/resume/<slug>`. On the site this page exists so a crawler, a deep link or
 * a reload has something real to land on behind the modal; here it *is* what a
 * tap opens.
 */
export default function ResumeEntryScreen() {
  const { slug } = useLocalSearchParams<{ slug: string }>();
  const query = useResumeEntryQuery(slug);
  return (
    <Screen>
      <QueryView query={query} testID="loaded-resume-entry">{(item) => <ResumeEntryPage item={item} />}</QueryView>
    </Screen>
  );
}
