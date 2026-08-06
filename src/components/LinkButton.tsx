import ButtonView, { ButtonViewProps } from "@/components/ButtonView";
import LinkView from "@/react-multiversal/LinkView";

export default function LinkButton({
  href,
  // The name belongs on the link, not on the button visuals inside it: spread
  // into `ButtonView` it named a nested view and left the <a> unnamed, which
  // is what a screen reader reads. Icon-only buttons (the social row) have no
  // text of their own, so this *is* their entire accessible name.
  "aria-label": ariaLabel,
  ...props
}: ButtonViewProps & {
  href: string;
  "aria-label"?: string;
}) {
  return (
    <LinkView href={href} aria-label={ariaLabel}>
      <ButtonView {...props} />
    </LinkView>
  );
}
