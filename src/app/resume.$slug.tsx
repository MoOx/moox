import { fetchOne } from "@/api";
import { ResumeTimelineEntry } from "@/components/ResumeTimelineEntry";
import WebsiteError from "@/components/WebsiteError";
import { fullName } from "@/profile";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect } from "react";

/**
 * Detail of one experience. A real, statically generated page (deep-linkable,
 * one URL per experience for crawlers) that renders as a modal above the
 * timeline: this route is a child of `/resume`, so the timeline is always
 * behind it - on client-side navigation the shared view-transition name makes
 * the card "zoom" into the modal.
 */
export const Route = createFileRoute("/resume/$slug")({
  loader: ({ params }) =>
    fetchOne({
      data: {
        filename: decodeURIComponent(params.slug) + ".json",
        contentType: "resume",
      },
    }),
  head: ({ loaderData }) => ({
    meta: loaderData
      ? [
          {
            title: `${loaderData.title} · ${loaderData.company} - ${fullName}`,
          },
          ...(loaderData.description
            ? [{ name: "description", content: loaderData.description }]
            : []),
        ]
      : [],
  }),
  component: PageResumeEntry,
});

function PageResumeEntry() {
  const item = Route.useLoaderData();
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
        <ResumeTimelineEntry item={item} detail={true} disableLinks={false} />
      </div>
    </div>
  );
}
