import BlurView from "@/react-multiversal/BlurView";
import { boxShadowGlass } from "@/react-multiversal/utils.styles";

export default function GlassView({
  style,
  children,
  blurAmount = 16,
}: {
  style?: any;
  children?: React.ReactNode;
  blurAmount?: number;
}) {
  return (
    <BlurView
      blurAmount={blurAmount}
      style={[
        style,
        {
          boxShadow: [...boxShadowGlass(), ...(style?.boxShadow || [])],
        },
      ]}
    >
      {children}
    </BlurView>
  );
}
