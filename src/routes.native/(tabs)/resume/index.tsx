import { ResumeItem } from "@/api";
import ResumePage from "@/pages/ResumePage";
import { useRouter } from "expo-router";
import { QueryView, useResumePageQuery } from "@/native/query";
import Screen from "@/native/Screen";

/**
 * `/resume`, and the sharpest of the three diffs with the site.
 *
 * `src/routes.web/{-$lang}.resume.tsx` answers a tap by navigating to *itself* with a
 * `?detail=` search param, and masking the standalone URL over the result, so
 * the timeline stays put, a modal opens above it, and a share or a reload
 * still lands on the real page. Every word of that is about having an address
 * bar.
 *
 * There is none here, so the same tap does the plain thing: push the
 * standalone screen. No mask, no query string, no modal - and the OS back
 * gesture, which the web version has to emulate with a `<Link>` on the
 * backdrop and an Escape listener.
 *
 * `detail` and `group` are simply never passed, so `ResumePage` renders no
 * modal without being told which platform it is on.
 */
export default function ResumeScreen() {
  const { resume, talks, blog } = useResumePageQuery();
  const router = useRouter();

  const openEntry = (item: ResumeItem) => {
    const slug = item.slug.split("/").pop() ?? item.slug;
    router.push(`/resume/${slug}`);
  };

  const openGroup = (item: ResumeItem) => {
    if (!item.group) {
      openEntry(item);
      return;
    }
    router.push(`/resume/group/${item.group}`);
  };

  return (
    <Screen>
      <QueryView query={resume} testID="loaded-resume">
        {(items) => (
          <ResumePage
            blog={blog.data ?? []}
            onOpenEntry={openEntry}
            onOpenGroup={openGroup}
            resume={items}
            talks={talks.data ?? []}
          />
        )}
      </QueryView>
    </Screen>
  );
}
