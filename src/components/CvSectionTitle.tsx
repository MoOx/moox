import GradientText from "@/components/GradientText";
import { size } from "@/react-multiversal";
import { weight } from "@/react-multiversal/font";
import { useTheme } from "@/styles";
import { View } from "react-native";

/**
 * Section heading of the CV: gradient title + hairline rule filling the row.
 * Uses `GradientText` (per-character solid colors) so it survives PDF export.
 */
export default function CvSectionTitle({
  children,
  fontSize = 26,
}: {
  children: string;
  fontSize?: number;
}) {
  const theme = useTheme();
  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        gap: size("s"),
      }}
    >
      <View role="heading" aria-level={2}>
        <GradientText
          style={{
            fontSize,
            lineHeight: fontSize * 1.15,
            fontWeight: weight.bold,
          }}
          stops={[
            { offset: 0, color: theme.colors.textFlashy4 },
            { offset: 0.5, color: theme.colors.textFlashy3 },
            { offset: 1, color: theme.colors.textFlashy2 },
          ]}
        >
          {children}
        </GradientText>
      </View>
      <View
        style={{
          flex: 1,
          height: 1,
          backgroundColor: theme.dynamicColors.ultraLight,
        }}
      />
    </View>
  );
}
