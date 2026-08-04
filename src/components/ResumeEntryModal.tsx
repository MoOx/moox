import { ResumeItem } from "@/api";
import { ResumeTimelineEntry } from "@/components/ResumeTimelineEntry";
import { size } from "@/react-multiversal";
import { Link, useNavigate } from "@tanstack/react-router";
import { useEffect } from "react";
import { View } from "react-native";

/**
 * The experience detail as a modal above `/resume`. Only reached by
 * client-side navigation (`?detail=<slug>` masked as `/resume/<slug>`): the
 * page behind stays mounted, scroll intact. A reload or a shared URL lands on
 * the standalone `/resume/$slug` page instead - see `resume_.$slug.tsx`.
 *
 * Grouped clients (several missions under one `group`) open as one modal with
 * every mission of the group in sequence, newest first.
 */
export default function ResumeEntryModal({
  item,
  members,
}: {
  item: ResumeItem;
  members: ResumeItem[];
}) {
  const navigate = useNavigate();

  // Escape closes (backdrop click and browser back also do).
  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        void navigate({ to: "/resume", search: {}, resetScroll: false });
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
        search={{}}
        resetScroll={false}
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
