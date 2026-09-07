import { useT } from "@/i18n";
import { Stack } from "expo-router";

/**
 * One stack per tab, which is the thing a single memory history could not do.
 *
 * On the site, opening an experience from `/resume` masks its URL over the
 * timeline and paints a modal; there is one history, and the browser's back
 * button is the only way out. Here the entry is a screen pushed on this tab's
 * own stack: the OS back gesture pops it, the timeline keeps its scroll
 * position underneath, and switching to another tab and back leaves the pushed
 * screen exactly where it was.
 */
export default function ResumeStackLayout() {
  const t = useT();
  return (
    <Stack>
      {/* The page carries its own title, so the platform header would be a
          second one. */}
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen
        name="[slug]"
        options={{ title: t({ en: "Experience", fr: "Expérience" }) }}
      />
      <Stack.Screen
        name="group/[group]"
        options={{ title: t({ en: "Missions", fr: "Missions" }) }}
      />
    </Stack>
  );
}
