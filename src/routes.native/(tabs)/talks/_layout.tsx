import { useT } from "@/i18n";
import { Stack } from "expo-router";

/** Same shape as the blog stack: a list, and a detail pushed on top of it. */
export default function TalksStackLayout() {
  const t = useT();
  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="[slug]" options={{ title: t({ en: "Talk", fr: "Conférence" }) }} />
    </Stack>
  );
}
