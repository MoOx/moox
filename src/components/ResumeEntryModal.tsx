import { ResumeItem } from "@/api";
import ResumeEntryDetailCard from "@/components/ResumeEntryDetailCard";
import { size } from "@/react-multiversal";
import SVGXmark from "@/svgs/components/SVGXmark";
import { Link, useNavigate } from "@tanstack/react-router";
import { useEffect } from "react";
import { createPortal } from "react-dom";
import { View } from "react-native";

/**
 * Experience detail as a modal above `/resume`. Only reached by client-side
 * navigation (`?detail=<slug>` or `?group=<group>`, URL masked as the real
 * standalone page): the page behind stays mounted, scroll intact. A reload or
 * a shared URL lands on the standalone page instead (see `resume_.$slug.tsx`
 * and `resume_.group.$group.tsx`).
 *
 * Rendered through a portal to `document.body`: inside the page tree an
 * ancestor's stacking context would trap the dialog's z-index under the
 * sticky header.
 */
export default function ResumeEntryModal({
  items,
  activeSlug,
  label,
}: {
  /** One entry (`?detail`) or every mission of a group (`?group`). */
  items: ResumeItem[];
  /**
   * Full slug of the entry whose timeline card carries the shared
   * view-transition name (the "zoom" effect) - only that member keeps it in
   * the modal, duplicate names would kill the transition.
   */
  activeSlug?: string;
  /** Accessible name of the dialog. */
  label: string;
}) {
  const navigate = useNavigate();

  // Escape closes (the ✕, backdrop click and browser back also do).
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

  const dialog = (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={label}
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
        aria-hidden="true"
        tabIndex={-1}
        style={{
          position: "absolute",
          inset: 0,
          background: "rgba(10, 6, 32, 0.55)",
          backdropFilter: "blur(4px)",
        }}
      />
      <Link
        to="/resume"
        search={{}}
        resetScroll={false}
        aria-label="Close"
        style={{
          position: "absolute",
          top: 12,
          right: 12,
          zIndex: 1,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          width: 44,
          height: 44,
          borderRadius: 22,
          color: "#fff",
          background: "rgba(10, 6, 32, 0.6)",
          boxShadow: "0 2px 8px rgba(0, 0, 0, 0.35)",
        }}
      >
        <SVGXmark width={22} height={22} />
      </Link>
      <div
        style={{
          position: "relative",
          width: "100%",
          maxWidth: 720,
          maxHeight: "90vh",
          overflowY: "auto",
          borderRadius: 16,
          display: "flex",
          // Without this the flex item stretches to the scroller's 90vh and
          // the overflowing content spills past the card background - the
          // item must size to its content, the scroller does the scrolling.
          alignItems: "flex-start",
        }}
      >
        {/* minWidth 0: without it the flex item inherits the intrinsic width
            of the entry images (min-width: auto) and blows the layout out to
            the image's natural size. */}
        <View style={{ flexGrow: 1, flexShrink: 1, minWidth: 0, gap: size("m") }}>
          {items.map((member) => (
            <ResumeEntryDetailCard
              key={member.slug}
              item={member}
              transitionEnabled={member.slug === activeSlug}
            />
          ))}
        </View>
      </div>
    </div>
  );

  // SSR-safe: no document on the server (a direct `?detail` load), render in
  // place - the stacking issue only exists with the client's sticky header.
  return typeof document === "undefined" ? dialog : createPortal(dialog, document.body);
}
