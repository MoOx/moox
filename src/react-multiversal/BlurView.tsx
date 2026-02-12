import { View, type ViewProps } from "react-native";

export type BlurViewProps = ViewProps & {
  blurAmount?: number;
  // blurType?: BlurType;
  webBackdropFilter?: string;
};

export default function BlurView({
  blurAmount = 10,
  // blurType = "default",
  style,
  webBackdropFilter,
  ...props
}: BlurViewProps) {
  const webBlur = `blur(${blurAmount}px)`;
  const backdropFilter = webBackdropFilter
    ? [webBackdropFilter, webBlur].join(" ")
    : webBlur;
  return (
    <View
      {...props}
      style={[
        style,
        blurAmount !== 0 && {
          // WebkitBackdropFilter: backdropFilter,
          backdropFilter,
        },
      ]}
    />
  );
}
