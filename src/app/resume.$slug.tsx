import { fetchAll, fetchOne } from "@/api";
import { ResumeTimelineEntry } from "@/components/ResumeTimelineEntry";
import WebsiteError from "@/components/WebsiteError";
import { fullName, groupKey, pitchOf } from "@/profile";
import { size } from "@/react-multiversal";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect } from "react";
import { View } from "react-native";

/**
 * Detail of one experience. A real, statically generated page (deep-linkable,
 * one URL per experience for crawlers) that renders as a modal above the
 * timeline: this route is a child of `/resume`, so the timeline is always
 * behind it - on client-side navigation the shared view-transition name makes
 * the card "zoom" into the modal.
 *
 * Grouped clients (several missions under one `group`) open as one modal with
 * every mission of the group in sequence, newest first.
 */
export const Route = createFileRoute("/resume/$slug")({
  loader: async ({ params }) => {
    const filename = decodeURIComponent(params.slug) + ".json";
    const [item, all] = await Promise.all([
      fetchOne({ data: { filename, contentType: "resume" } }),
      fetchAll({ data: "resume" }),
    ]);
    const members = item
      ? all
          .filter((i) => groupKey(i) === groupKey(item))
          .sort((a, b) =>
            (b.dateEnd || "9999") < (a.dateEnd || "9999") ? -1 : 1,
          )
      : [];
    return { item, members };
  },
  head: ({ loaderData }) => ({
    meta: loaderData?.item
      ? [
          {
            title: [loaderData.item.title, loaderData.item.company, fullName]
              .filter(Boolean)
              .join(" · "),
          },
          {
            name: "description",
            content: pitchOf(loaderData.item) ?? loaderData.item.title,
          },
        ]
      : [],
  }),
  component: PageResumeEntry,
});

function PageResumeEntry() {
  const { item, members } = Route.useLoaderData();
  const navigate = useNavigate();

  // Escape closes (backdrop click and browser back also do).
  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        void navigate({ to: "/resume" });
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [navigate]);

  // Lock the page scroll while the modal is open.
  useEffect(() => {
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, []);

  if (!item) {
    return <WebsiteError statusCode={404} />;
  }

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={item.title}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 100,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: 16,
      }}
    >
      <Link
        to="/resume"
        aria-label="Close"
        style={{
          position: "absolute",
          inset: 0,
          background: "rgba(10, 6, 32, 0.55)",
          backdropFilter: "blur(4px)",
        }}
      />
      <div
        style={{
          position: "relative",
          width: "100%",
          maxWidth: 720,
          maxHeight: "90vh",
          overflowY: "auto",
          borderRadius: 16,
          display: "flex",
        }}
      >
        <View style={{ flexGrow: 1, gap: size("m") }}>
          {/* Only the visited entry carries the shared view-transition name:
              the sibling missions' timeline cards are still visible behind
              the modal, and duplicate names would kill the transition. */}
          {members.map((member) => (
            <ResumeTimelineEntry
              key={member.slug}
              item={member}
              detail={true}
              transitionEnabled={member.slug === item.slug}
            />
          ))}
        </View>
      </div>
    </div>
  );
}
