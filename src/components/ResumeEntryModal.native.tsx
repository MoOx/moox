import { ResumeItem } from "@/api";

/**
 * Native half of `ResumeEntryModal.tsx`.
 *
 * The web modal is a DOM dialog: `<div role="dialog">` in a portal, a Tab focus
 * trap, `document.body.style.overflow` locked while it is open, and a masked
 * URL so a reload lands on the standalone page. None of that translates, and it
 * should not: on a phone the standalone entry route is the better answer - a
 * real screen with a real back gesture, already routed and already rendering.
 *
 * So the modal never opens here. `src/routes.native/(tabs)/resume/index.tsx` pushes
 * `/resume/<slug>` instead, and `ResumePage` is never handed a `detail` or a
 * `group` - which is why this renders nothing while still taking the props:
 * the page must not have to ask which platform it is on.
 */
export default function ResumeEntryModal(_props: {
  items: ResumeItem[];
  activeSlug?: string;
  label: string;
  onClose?: () => void;
}) {
  return null;
}
