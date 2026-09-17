import { Platform } from "react-native";
/**
 * The three behaviours of /contact that a style object cannot express:
 * a parent `:hover` painting a child, keyframes, and a reduced-motion opt-out.
 *
 * react-native-web writes inline styles, so anything conditioned on the state
 * of an *ancestor* has to be a real selector. Rather than wiring a `useFocus`
 * on every row, every tile and every overlay, the page tags its nodes with
 * `dataSet` and this stylesheet - mounted once by the page - does the rest.
 * Everything here is scoped to `data-contact-*`, so it cannot leak.
 */

/** Marks the surface that reacts to hover, focus and press (the row/card). */
export const contactHoverableDataSet = { contactHoverable: "true" };
/** Marks a layer revealed on hover of the surface above (tint, border). */
export const contactHoverDataSet = { contactHover: "true" };
/** Marks an app icon tile: jiggles while its surface is hovered. */
export const contactJiggleDataSet = { contactJiggle: "true" };
/** Marks the "Recommended" badge: jiggles on its own, hover or not. */
export const contactBadgeDataSet = { contactBadge: "true" };
/** Marks a chip label: brightens with its chip. */
export const contactChipLabelDataSet = { contactChipLabel: "true" };

const css = `
@keyframes moox-contact-jiggle {
  0%, 100% { transform: rotate(-2.5deg) scale(1.04); }
  50% { transform: rotate(2.5deg) scale(1.04); }
}
/* A burst, then a rest. A badge that shakes without stopping stops being a
   nudge and becomes a tic; the pause is what makes the next one register. */
@keyframes moox-contact-badge {
  0%, 22%, 100% { transform: rotate(0deg) scale(1); }
  3% { transform: rotate(-3deg) scale(1.03); }
  8% { transform: rotate(3deg) scale(1.03); }
  13% { transform: rotate(-3deg) scale(1.03); }
  18% { transform: rotate(3deg) scale(1.03); }
}

[data-contact-hover="true"] {
  opacity: 0;
  transition: opacity 180ms ease-out;
}
[data-contact-hoverable="true"]:hover [data-contact-hover="true"],
[data-contact-hoverable="true"]:focus-within [data-contact-hover="true"] {
  opacity: 1;
}

/* The chip label goes from muted to full contrast with its chip. Reading the
   theme variable rather than a colour keeps this correct in both themes and
   under a forced colour scheme. */
[data-contact-hoverable="true"]:hover [data-contact-chip-label="true"],
[data-contact-hoverable="true"]:focus-within [data-contact-chip-label="true"] {
  color: var(--react-multiversal--theme--text);
}

[data-contact-jiggle="true"] {
  animation: moox-contact-jiggle 280ms ease-in-out infinite;
  animation-play-state: paused;
}
[data-contact-hoverable="true"]:hover [data-contact-jiggle="true"],
[data-contact-hoverable="true"]:focus-within [data-contact-jiggle="true"] {
  animation-play-state: running;
}

[data-contact-badge="true"] {
  animation: moox-contact-badge 3s ease-in-out infinite;
  transform-origin: 50% 50%;
}

/* Tactile feedback, on the whole surface rather than on the link inside it. */
[data-contact-hoverable="true"]:active {
  transform: scale(0.985);
}

@media (prefers-reduced-motion: reduce) {
  [data-contact-jiggle="true"],
  [data-contact-badge="true"] {
    animation: none !important;
  }
  [data-contact-hover="true"] {
    transition: none !important;
  }
  [data-contact-hoverable="true"]:active {
    transform: none;
  }
}
`;

export default function ContactPageStyles() {
  // A `<style>` element, i.e. web only. The rules it carries are hover,
  // `:active` and reduced-motion states, none of which exist on native.
  if (Platform.OS !== "web") return null;
  return <style dangerouslySetInnerHTML={{ __html: css }} />;
}
