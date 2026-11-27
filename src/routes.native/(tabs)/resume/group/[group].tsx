import ResumeGroupPage from "@/pages/ResumeGroupPage";
import { useLocalSearchParams } from "expo-router";
import { QueryView, useResumeGroupQuery } from "@/native/query";
import Screen from "@/native/Screen";

/**
 * `/resume/group/<group>` - every mission of a grouped client.
 *
 * Derived from the résumé query rather than fetched again, so this screen is
 * usually instant: the timeline it was opened from already filled the cache.
 * The site's loader refetches the whole résumé for the same page.
 */
export default function ResumeGroupScreen() {
  const { group } = useLocalSearchParams<{ group: string }>();
  const { members, lead, ...query } = useResumeGroupQuery(group);
  return (
    <Screen>
      <QueryView query={query} testID="loaded-resume-group">
        {() => <ResumeGroupPage lead={lead} members={members} />}
      </QueryView>
    </Screen>
  );
}
