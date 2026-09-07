export type UserColorScheme = "light" | "dark" | "auto";
export const userColorSchemeStorageKey = "colorScheme";

const defaultColorScheme: UserColorScheme = "auto";
let colorScheme: UserColorScheme = defaultColorScheme;

const subscribers: Array<() => void> = [];
const notifySubscribers = () => subscribers.forEach((callback) => callback());

const htmlClassKey = "userColorScheme";
const htmlClass = (colorScheme: UserColorScheme) => htmlClassKey + "-" + colorScheme;
const htmlClasses = [htmlClass("light"), htmlClass("dark"), htmlClass("auto")];
export const getUserColorSchemeWebHtmlClass = (value: UserColorScheme) => htmlClass(value);
export const updateHtmlClass = (value: UserColorScheme) => {
  // The `<html>` class is how the web build switches CSS variables. Native has
  // no document to put a class on and does not need one: `useTheme` reads the
  // mode straight from the store there. Guarding on `document` rather than
  // `Platform` keeps this file free of a react-native import, which matters
  // because `standaloneUpdateHtmlClass` below is serialized into the HTML.
  if (typeof document !== "undefined" && document.documentElement) {
    const colorSchemeClass = htmlClass(value);
    // eslint-disable-next-line prefer-spread
    document.documentElement.classList.remove.apply(
      document.documentElement.classList,
      htmlClasses.filter((c) => c !== colorSchemeClass),
    );
    if (!document.documentElement.classList.contains(colorSchemeClass)) {
      document.documentElement.classList.add(colorSchemeClass);
    }
  }
};

// Used for client side early update
// !\\ Exported as string so beware when updating this code
export const standaloneUpdateHtmlClass = (value: UserColorScheme) => {
  const htmlClassKey = "userColorScheme";
  const htmlClass = (colorScheme: UserColorScheme) => htmlClassKey + "-" + colorScheme;
  const htmlClasses = [htmlClass("light"), htmlClass("dark"), htmlClass("auto")];
  if (document.documentElement) {
    if (!document.documentElement.classList) {
      console.log("[colorScheme] document.documentElement.classList is not available");
      return;
    }
    const colorSchemeClass = htmlClass(value);
    // eslint-disable-next-line prefer-spread
    document.documentElement.classList.remove.apply(
      document.documentElement.classList,
      htmlClasses.filter((c) => c !== colorSchemeClass),
    );
    if (!document.documentElement.classList.contains(colorSchemeClass)) {
      document.documentElement.classList.add(colorSchemeClass);
    }
  }
};

export async function loadSavedColorScheme(value?: null | string) {
  if (value && (value === "light" || value === "dark" || value === "auto")) {
    colorScheme = (value as UserColorScheme) || defaultColorScheme;
    updateHtmlClass(value as UserColorScheme);
    notifySubscribers();
  }
}

export const getColorScheme = (): UserColorScheme => colorScheme;

// for SSR/SSG, just update this value before rendering
export async function setUserColorScheme(value: UserColorScheme) {
  updateHtmlClass(value);
  colorScheme = value;
  notifySubscribers();
}

export const subscribeToColorScheme = (callback: () => void) => {
  subscribers.push(callback);
  return () => {
    const index = subscribers.indexOf(callback);
    if (index > -1) {
      subscribers.splice(index, 1);
    }
  };
};
