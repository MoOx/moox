import { ResumeItem } from "@/api";
import ResumeEntryDetailCard from "@/components/ResumeEntryDetailCard";
import { size } from "@/react-multiversal";
import SVGXmark from "@/svgs/components/SVGXmark";
import { langToParam, useLang } from "@/i18n";
import { Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { View } from "react-native";

const focusableSelector = "a[href], button, input, select, textarea, [tabindex]";

/** Tabbable descendants, in DOM order (the backdrop link is tabIndex -1). */
const tabbablesIn = (root: HTMLElement) =>
  Array.from(root.querySelectorAll<HTMLElement>(focusableSelector)).filter(
    (element) =>
      element.tabIndex >= 0 &&
      !element.hasAttribute("disabled") &&
      element.getClientRects().length > 0,
  );

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
  const lang = useLang();
  const dialogRef = useRef<HTMLDivElement>(null);

  // Focus management: move focus into the dialog on open, keep Tab cycling
  // inside it while it is open, and give focus back to the ⓘ that opened it on
  // close. `preventScroll` throughout: the page behind stays mounted and its
  // scroll position is the whole point of the modal.
  useEffect(() => {
    const dialog = dialogRef.current;
    const previouslyFocused =
      document.activeElement instanceof HTMLElement ? document.activeElement : null;
    dialog?.focus({ preventScroll: true });

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key !== "Tab" || !dialog) return;
      const tabbables = tabbablesIn(dialog);
      // Tabbing out of the last element wraps to the first (and back the other
      // way with Shift), as does tabbing from anywhere outside the dialog.
      const edge = event.shiftKey ? tabbables[0] : tabbables[tabbables.length - 1];
      const wrapTo = event.shiftKey ? tabbables[tabbables.length - 1] : tabbables[0];
      const active = document.activeElement;
      if (active && dialog.contains(active) && active !== edge) return;
      event.preventDefault();
      wrapTo?.focus({ preventScroll: true });
    };

    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      previouslyFocused?.focus?.({ preventScroll: true });
    };
  }, []);

  // Escape closes (the ✕, backdrop click and browser back also do).
  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        void navigate({
          to: "/{-$lang}/resume",
          params: { lang: langToParam(lang) },
          search: {},
          resetScroll: false,
        });
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [navigate, lang]);

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
      ref={dialogRef}
      role="dialog"
      aria-modal="true"
      aria-label={label}
      tabIndex={-1}
      style={{
        outline: "none",
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
        to="/{-$lang}/resume"
        params={{ lang: langToParam(lang) }}
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
        to="/{-$lang}/resume"
        params={{ lang: langToParam(lang) }}
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
