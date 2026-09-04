import CvPage from "@/pages/CvPage";
import { Stack } from "expo-router";
import { QueryView, useResumePageQuery } from "@/native/query";
import Screen from "@/native/Screen";

/**
 * `/cv` - outside the tabs on purpose.
 *
 * On the site it is a peer of `/resume`: the print-shaped, two-page read that
 * the PDF export renders. In an app it is a document you open, not a place you
 * live in, so it is pushed over the tab bar with the platform's own header and
 * back button rather than given a fifth of the bar.
 */
export default function CvScreen() {
  const { resume, talks, blog } = useResumePageQuery();
  return (
    <>
      <Stack.Screen options={{ headerShown: true, title: "CV" }} />
      <Screen>
        <QueryView query={resume} testID="loaded-cv">
          {(items) => <CvPage blog={blog.data ?? []} resume={items} talks={talks.data ?? []} />}
        </QueryView>
      </Screen>
    </>
  );
}
