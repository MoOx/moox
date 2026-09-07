/**
 * Expo Router owns the entry point: it builds the route tree from `app/` with
 * `require.context`, so there is no root component to register here any more.
 *
 * What this file used to be - `registerRootComponent(App)` plus a
 * `native-globals` import that stubbed the browser `scrollTo` TanStack Router
 * called after every navigation - is the clearest single-file measure of what
 * the port removed.
 */
import "expo-router/entry";
