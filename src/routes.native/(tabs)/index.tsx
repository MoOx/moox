import HomePage from "@/pages/HomePage";
import { QueryView, useResumeQuery } from "@/native/query";
import Screen from "@/native/Screen";

/**
 * `/` - the same `HomePage` the site mounts from `src/routes.web/{-$lang}.index.tsx`.
 *
 * Put the two files side by side and the whole port is visible in about
 * fifteen lines: there, a `loader` and a `head` with the title, description
 * and `hreflang` alternates; here, a query and a loading state. The page
 * itself is untouched.
 */
export default function HomeScreen() {
  const resume = useResumeQuery();
  return (
    <Screen>
      <QueryView query={resume} testID="loaded-home">{(items) => <HomePage items={items} />}</QueryView>
    </Screen>
  );
}
