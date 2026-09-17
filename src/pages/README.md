# `src/pages`

The pages, as components: they take their data as props and render a screen.

Nothing in here knows what a route is. That is the whole point of the
directory, and it is what lets the same page be mounted twice:

| | mounts them | gets the data from |
| --- | --- | --- |
| the site | `src/routes.web/*.tsx` (TanStack Start) | a route `loader`, on the server at first paint and in the browser on a client navigation |
| the app | `src/routes.native/**` (Expo Router) | `useQuery`, in the component, always over the network |

Put a route `loader`, a `head`, a `useSearch` or a `<Link to>` in one of these
files and the page stops being mountable by the other side. The rule is
mechanical: **a page reads props and calls shared hooks (`useT`, `useTheme`,
`usePathname`), never a router.**

The split is also where the interesting differences live, so they are worth
naming rather than hiding:

- **Data.** The site can load before it renders, because a loader runs before
  the component. The app cannot, so every screen has a real loading state. See
  `src/native/query.tsx`.
- **Language.** `/fr/resume` is an address on the site and a setting in the
  app. See `i18n.useLang.tsx` and its native half.
- **Modals.** `/resume?detail=x` masks a URL on the site so a share and a
  reload land on the standalone page. The app has no URL to mask, so the same
  tap pushes the standalone screen onto the stack.
