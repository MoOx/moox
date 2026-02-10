"use client";

import { useServerInsertedHTML } from "next/navigation";
import * as React from "react";

import {
  loadSavedColorScheme,
  standaloneUpdateHtmlClass,
  UserColorScheme,
  userColorSchemeStorageKey,
} from "@/react-multiversal/theme/colorScheme";

export default function Next_UserColorSchemeInit({
  colorScheme,
}: {
  colorScheme: UserColorScheme;
}) {
  const isServerInserted = React.useRef(false);
  React.useEffect(() => {
    if (window.localStorage) {
      void loadSavedColorScheme(
        window.localStorage.getItem(userColorSchemeStorageKey),
      );
    }
  }, []);
  useServerInsertedHTML(() => {
    if (!isServerInserted.current) {
      isServerInserted.current = true;
      return (
        <script
          dangerouslySetInnerHTML={{
            __html: `
              const UserColorSchemeHtmlClassModifier = ${standaloneUpdateHtmlClass.toString()};
              UserColorSchemeHtmlClassModifier(window.localStorage.getItem("${userColorSchemeStorageKey}") || "${colorScheme}");`,
          }}
        ></script>
      );
    }
  });
  return null;
}
