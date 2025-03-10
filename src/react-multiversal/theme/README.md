# React Multiversal Theme

React cross-platform lib to easily handle theme data based on user preferred color scheme.
You will have everything you need to easily use theme based values in your app.
Simply rely on AsyncStorage + Appearance API (`useColorScheme`)

For SSR / SSG, you can will use the default value and optionally use a cookie to set the user's preferred color scheme.

## Theme

The theme is the main object that will hold all the theme values and requires light & dark color for a given theme.
⚠️ If for a given theme you don't want to offer a dark mode, you can simply set the dark values to the light values.

For colors, if you follow the color naming convention, you will get the following styles generated:

- `back` for background color (generated styles: `backgroundColor`)
- `border` for border color (generated styles: `borderColor`)
- `shadow` for shadow color (generated styles: `shadowColor`)
- otherwise, text color (generated styles: `color`)

To define your theme, you will need to define a `Theme` type and an object.

```ts
import { makeTheme, ThemeColors } from "@/react-multiversal/theme";

type ThemedColors = {
  back: string;
};
export const themedColors: ThemeColors<ThemedColors> = {
  light: {
    back: "#fff",
  },
  dark: {
    back: "#000",
  },
};
const {
  themeLight,
  themeDark,
  styles,
  dynamicStyles,
  dynamicColors,
  getWebStyleSheet,
  getWebHtmlClass,
} = makeTheme(themedColors);
```

## User Color Scheme

The user color scheme is the user's preferred color scheme. It can be light, dark or auto (system settings based).

### `useUserColorScheme`

This allow you to get or set the user's preferred color scheme.

```ts
const colorScheme = useUserColorScheme(); // "auto" by default
```

### `setUserColorScheme``

This allow you to set the user's preferred color scheme.

```ts
setUserColorScheme("light"); // "auto", "light", "dark"
```

#### Web (SSR / SSG)

For server & static rendering, you can use the `setUserColorScheme` function to set the user's preferred color scheme, before your actual rendering step if needed.

For example, in a Next.js App router setup, you can rely on the cookie to setup the user's preferred color scheme.

```ts
import { setUserColorScheme } from "react-multiversal-theme";
```

#### Web (CSR)

On the client, you can set this value whenever you need (eg: dark mode toggle).
This will trigger proper update for component using `useUserColorScheme` or `useTheme`.

## Setup

### React Native

Use the Appearance API to tell the color scheme the user's preferred color scheme.
You can setup this in your App component.

```ts
Appearance.addChangeListener(({ colorScheme }) => {
  setUserColorScheme(colorScheme);
});
```

### Web (Next.js / React Native for Web)

For the web you have 2 options depending on your needs.

### SSR

You can use a cookie to set the user's preferred color scheme.
Note that using cookies will disable static rendering when it would have been possible.
⚠️ We recommend using this solution only if that really make sense for your use case.

```ts
import { cookies } from 'next/headers';
import { setUserColorScheme } from 'react-multiversal-theme';

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cookieStore = await cookies();
  const userColorScheme = cookieStore.get("userColorScheme")?.value;
  if (userColorScheme) {
    setColorScheme(userColorScheme as UserColorScheme);
  }
```

### Static Rendering

For static rendering, you can only set a default value.
⚠️ If you want to set the user's preferred color scheme, you will need to rely on the client side to set it.
This is possible, but a flash is possible (eg: default "auto", user changed locally to "light") so you will need to handle this.
A bootsplash screen can be a good solution to hide this flash
