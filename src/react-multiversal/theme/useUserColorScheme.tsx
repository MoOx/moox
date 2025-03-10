"use client";

import * as React from "react";

import {
  getColorScheme,
  setUserColorScheme,
  subscribeToColorScheme,
} from "@/react-multiversal/theme/colorScheme";

export const useUserColorScheme = () => {
  const userColorScheme = React.useSyncExternalStore(
    subscribeToColorScheme,
    getColorScheme,
    getColorScheme
  );
  return [userColorScheme, setUserColorScheme] as const;
};
