import StatTile from "@/components/StatTile";
import { ProfileStat } from "@/profile";
import { size } from "@/react-multiversal";
import Container from "@/react-multiversal/Container";
import GradientLinear from "@/react-multiversal/GradientLinear";
import SpacedView from "@/react-multiversal/SpacedView";
import { gradientStaticIndigoStyles } from "@/styles";
import { StyleSheet, View } from "react-native";

/**
 * The CV's "player-card" profile tiles on the site's slightly-skewed indigo
 * band. The playful figures that used to live here (age, first website…)
 * duplicated the pills floating on the photo - the tiles carry the checkable
 * numbers instead (see STATS.md).
 */
export default function ResumeStats({ stats }: { stats: ProfileStat[] }) {
  return (
    <SpacedView vertical="xl">
      <GradientLinear
        style={[StyleSheet.absoluteFill, { transform: [{ skewY: "1deg" }] }]}
        stops={gradientStaticIndigoStyles}
      />
      <Container maxWidth={900}>
        <SpacedView horizontal="l">
          <View
            style={{
              flexDirection: "row",
              flexWrap: "wrap",
              alignItems: "stretch",
              gap: size("s"),
            }}
          >
            {stats.map((stat) => (
              <StatTile
                key={stat.label}
                stat={stat}
                variant={stat.highlight ? "gradient" : "glass"}
                flexBasis={140}
              />
            ))}
          </View>
        </SpacedView>
      </Container>
    </SpacedView>
  );
}
