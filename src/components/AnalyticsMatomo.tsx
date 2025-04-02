"use client";

import { init, push } from "@socialgouv/matomo-next";
import { usePathname, useSearchParams } from "next/navigation";
import * as React from "react";

const MATOMO_OPTIONS = {
  url: "https://a.moox.fr",
  jsTrackerFile: "m.js",
  phpTrackerFile: "m.php",
  siteId: "3",
};

const Matomo = () => {
  const [initialised, setInitialised] = React.useState(false);

  React.useEffect(() => {
    if (!initialised) {
      init(MATOMO_OPTIONS);
    }
    return () => {
      setInitialised(true);
    };
  }, [initialised, setInitialised]);

  const searchParams = useSearchParams()?.toString();
  const pathname = usePathname();
  React.useEffect(() => {
    if (!pathname) return;

    const url = pathname + (searchParams ? "?" + searchParams : "");
    push(["setCustomUrl", url]);
    push(["trackPageView"]);
  }, [pathname, searchParams]);

  return null;
};

export default function AnalyticsMatomo() {
  if (process.env.NODE_ENV === "development") return null;
  return (
    <React.Suspense>
      <Matomo />
    </React.Suspense>
  );
}
