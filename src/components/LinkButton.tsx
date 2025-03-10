import ButtonView, { ButtonViewProps } from "@/components/ButtonView";
import LinkView from "@/react-multiversal/LinkView";

export default function LinkButton({
  href,
  ...props
}: ButtonViewProps & {
  href: string;
}) {
  return (
    <LinkView href={href}>
      <ButtonView {...props} />
    </LinkView>
  );
}
