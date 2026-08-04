/// <reference types="vite/client" />
import { StartClient } from "@tanstack/react-start/client";
import { startTransition, StrictMode } from "react";
import { hydrateRoot } from "react-dom/client";

// Dev only: an HMR update of a route file remounts the route tree - the page
// collapses for a frame and the browser clamps the scroll to 0 (regardless of
// the router's scrollRestoration option). Save the position before the update
// and pin it back until the re-rendered page is tall enough again.
if (import.meta.hot) {
  let scrollY = 0;
  import.meta.hot.on("vite:beforeUpdate", () => {
    scrollY = window.scrollY;
  });
  import.meta.hot.on("vite:afterUpdate", () => {
    const until = Date.now() + 1000;
    const pin = () => {
      window.scrollTo(0, scrollY);
      if (window.scrollY < scrollY && Date.now() < until) {
        requestAnimationFrame(pin);
      }
    };
    requestAnimationFrame(pin);
  });
}

startTransition(() => {
  hydrateRoot(
    document,
    <StrictMode>
      <StartClient />
    </StrictMode>,
  );
});
