import SkillCard from "@/components/SkillCard";
import { skillsDomains } from "@/profile";
import { size } from "@/react-multiversal";
import SpacedView from "@/react-multiversal/SpacedView";
import { View } from "react-native";

/**
 * The skills mosaic, fed by `profile.skillsDomains` - the same data `/cv`
 * renders. Two densities, one content source:
 *
 * - `teaser` (home): title + one-sentence `blurb` + the curated `keywords`
 *   line. An appetizer that sends the reader to `/resume` for the detail.
 * - `full` (`/resume`): the complete `items` lists, like the CV but with the
 *   web's room.
 */
export default function SkillsCards({ mode = "full" }: { mode?: "teaser" | "full" }) {
  const teaser = mode === "teaser";
  return (
    <SpacedView
      gap="m"
      style={{
        flex: 1,
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "center",
      }}
      role="list"
    >
      {skillsDomains.map((d) => (
        <View
          key={d.title}
          style={{
            flexGrow: 1,
            flexBasis: teaser ? 240 : 220,
            minWidth: teaser ? 240 : 220,
            borderRadius: size("s"),
            overflow: "hidden",
          }}
          role="listitem"
        >
          <SkillCard
            title={d.title}
            subtitle={teaser ? undefined : d.subtitle}
            blurb={teaser ? d.blurb : undefined}
            items={teaser ? (d.keywords ?? []) : d.items}
            Icon={d.Icon}
            gradient={d.gradient}
            glass={true}
            style={{ flexGrow: 1 }}
          />
        </View>
      ))}
    </SpacedView>
  );
}
