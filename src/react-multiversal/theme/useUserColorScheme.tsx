import {
  getColorScheme,
  setUserColorScheme,
  subscribeToColorScheme,
} from "@/react-multiversal/theme/colorScheme";
import { useSyncExternalStore } from "react";

export const useUserColorScheme = () => {
  const userColorScheme = useSyncExternalStore(
    subscribeToColorScheme,
    getColorScheme,
    getColorScheme,
  );
  return [userColorScheme, setUserColorScheme] as const;
};
