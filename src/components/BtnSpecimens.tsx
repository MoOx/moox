import Btn, { BtnStatus, BtnVariant } from "@/react-multiversal/Btn";
import { size } from "@/react-multiversal";
import { Elevation } from "@/react-multiversal/design/elevation";
import { GlassMaterial } from "@/react-multiversal/design/glass.types";
import GradientLinear from "@/react-multiversal/GradientLinear";
import LinkView from "@/react-multiversal/LinkView";
import SVGChevronRight from "@/svgs/components/SVGChevronRight";
import SVGDownload from "@/svgs/components/SVGDownload";
import { gradientFlashyStops, useTheme } from "@/styles";
import { ReactNode } from "react";
import { StyleSheet, Text, View } from "react-native";

/**
 * Every axis `Btn` has, laid out so that a change to one of them is visible
 * across all the others. They are deliberately separate axes rather than a
 * list of presets: `variant` says what the button is made of, `elevation` how
 * far above the page it sits, `material` which glass at the top rung. What
 * used to be a single `mode` × `effect` × `alt` tangle is this grid.
 *
 * The glass rows exist to be compared against a device: screenshot this on iOS
 * and in a browser, and tune the `glass*` tokens in `styles.ts` until the
 * *difference* between `regular` and `clear` reads the same on both. Toggle
 * the site's colour scheme for the other half.
 */

const variants: BtnVariant[] = ["solid", "outline", "plain"];
const elevations: Elevation[] = ["flat", "raised", "floating"];
const materials: GlassMaterial[] = ["regular", "clear"];
const statuses: BtnStatus[] = ["idle", "loading", "success"];

const styles = StyleSheet.create({
  group: { gap: size("xs") },
  row: { flexDirection: "row", flexWrap: "wrap", alignItems: "center", gap: size("s") },
  column: { gap: size("xs"), alignItems: "flex-start" },
  label: { fontSize: 12, fontFamily: "monospace" },
  backdrop: {
    width: 300,
    height: 150,
    borderRadius: size("s"),
    overflow: "hidden",
    justifyContent: "center",
    alignItems: "center",
    gap: size("s"),
  },
  backdropText: { fontSize: 13, lineHeight: 18, padding: size("xs") },
  spread: { width: 260 },
});

const filler = "The quick brown fox jumps over the lazy dog. ".repeat(8);

function Group({ children, label }: { children: ReactNode; label: string }) {
  const theme = useTheme();
  return (
    <View style={styles.group}>
      <Text style={[styles.label, { color: theme.dynamicColors.textLight1 }]}>{label}</Text>
      {children}
    </View>
  );
}

/** The three backgrounds that tell the two glasses apart. A flat surface does not. */
function Backdrop({ children, kind }: { children: ReactNode; kind: "text" | "gradient" | "flat" }) {
  const theme = useTheme();
  return (
    <View style={styles.backdrop}>
      {kind === "gradient" ? (
        <View style={StyleSheet.absoluteFill}>
          <GradientLinear height="100%" stops={gradientFlashyStops(theme)} width="100%" />
        </View>
      ) : kind === "flat" ? (
        <View
          style={[StyleSheet.absoluteFill, { backgroundColor: theme.dynamicColors.backAlt }]}
        />
      ) : (
        <Text
          style={[StyleSheet.absoluteFill, styles.backdropText, { color: theme.dynamicColors.text }]}
        >
          {filler}
        </Text>
      )}
      {children}
    </View>
  );
}

export default function BtnSpecimens() {
  const theme = useTheme();
  return (
    <View style={{ gap: size("m") }}>
      {variants.map((variant) => (
        <Group key={variant} label={`variant="${variant}" × elevation`}>
          <View style={styles.row}>
            {elevations.map((elevation) => (
              <Btn key={elevation} elevation={elevation} onPress={() => {}} variant={variant}>
                {elevation}
              </Btn>
            ))}
          </View>
        </Group>
      ))}

      <Group label={'elevation="floating" × material, over three backgrounds'}>
        <View style={styles.row}>
          {(["text", "gradient", "flat"] as const).map((kind) => (
            <Backdrop key={kind} kind={kind}>
              {materials.map((material) => (
                <Btn
                  key={material}
                  elevation="floating"
                  material={material}
                  onPress={() => {}}
                  size="s"
                  variant="plain"
                >
                  {material}
                </Btn>
              ))}
            </Backdrop>
          ))}
        </View>
      </Group>

      <Group label="size">
        <View style={styles.row}>
          <Btn onPress={() => {}} size="s">
            small
          </Btn>
          <Btn onPress={() => {}} size="m">
            medium
          </Btn>
        </View>
      </Group>

      <Group label="icon, iconAfter, icon only, spread">
        <View style={styles.row}>
          <Btn icon={<SVGDownload height={16} width={16} />} onPress={() => {}}>
            Download PDF
          </Btn>
          <Btn iconAfter={<SVGChevronRight height={16} width={16} />} onPress={() => {}}>
            Read more
          </Btn>
          {/* No text of its own, so `aria-label` is its entire accessible name. */}
          <Btn
            aria-label="Download"
            icon={<SVGDownload height={16} width={16} />}
            onPress={() => {}}
            variant="outline"
          />
          <Btn
            iconAfter={<SVGChevronRight height={16} width={16} />}
            onPress={() => {}}
            spread
            style={styles.spread}
            variant="outline"
          >
            Pushed apart
          </Btn>
        </View>
      </Group>

      <Group label="status, disabled">
        <View style={styles.row}>
          {statuses.map((status) => (
            <Btn key={status} onPress={() => {}} status={status}>
              {status}
            </Btn>
          ))}
          <Btn disabled onPress={() => {}}>
            disabled
          </Btn>
        </View>
      </Group>

      <Group label="gradient (a layer, composes with any variant)">
        <View style={styles.row}>
          <Btn
            gradient={[theme.dynamicColors.textFlashy2, theme.dynamicColors.textFlashy4]}
            onPress={() => {}}
          >
            gradient
          </Btn>
          <Btn
            elevation="floating"
            gradient={[theme.dynamicColors.textFlashy2, theme.dynamicColors.textFlashy4]}
            onPress={() => {}}
          >
            gradient + floating
          </Btn>
        </View>
      </Group>

      <Group label="root: onPress → button, render → link, neither → decoration">
        <View style={styles.row}>
          <Btn onPress={() => {}}>button</Btn>
          <Btn render={<LinkView href="/resume" />} variant="outline">
            link
          </Btn>
          <Btn variant="plain">decoration</Btn>
        </View>
      </Group>
    </View>
  );
}
