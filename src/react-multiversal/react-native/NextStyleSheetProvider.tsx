"use client";
import { useServerInsertedHTML } from "next/navigation";
import { StyleSheet } from "react-native";

export function NextStyleSheetProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  useServerInsertedHTML(() => {
    // @ts-expect-error
    const sheet = StyleSheet.getSheet();
    return (
      <style
        dangerouslySetInnerHTML={{ __html: sheet.textContent }}
        id={sheet.id}
      />
    );
  });
  return children;
}
