import SkillCard from "@/components/SkillCard";
import { useT } from "@/i18n";
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
export default function SkillsCards({
  mode = "full",
}: {
  mode?: "teaser" | "full";
}) {
  const t = useT();
  const teaser = mode === "teaser";
  return (
    <SpacedView
      gap="m"
      style={{
        flexGrow: 1,
        flexShrink: 1,
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "center",
      }}
      role="list"
    >
      {skillsDomains.map((d) => (
        <View
          key={t(d.title)}
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
            title={t(d.title)}
            subtitle={teaser ? undefined : t(d.subtitle)}
            blurb={teaser ? t(d.blurb) : undefined}
            items={teaser ? (t(d.keywords) ?? []) : t(d.items)}
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
