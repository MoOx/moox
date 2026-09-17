import { Stack } from "expo-router";

/** Blog keeps its own stack, so a post survives a trip to another tab. */
export default function BlogStackLayout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="[slug]" options={{ title: "Blog" }} />
    </Stack>
  );
}
