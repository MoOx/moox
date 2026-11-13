/**
 * Type-level check that every `.native` (or `.ios`) half still exports what the
 * web half it replaces exports.
 *
 * Why this file exists: call sites import `./LinkView`, so TypeScript types
 * them against the *web* half on both platforms, and Metro then swaps in the
 * native one by extension. Nothing checked that the swap is safe. That used to
 * be the job of a second `tsconfig` carrying
 * `moduleSuffixes: [".native", ""]`, which meant two programs, two exclude
 * lists and two sets of `paths` to keep in sync.
 *
 * What is checked here is the *export surface*: everything the web half
 * exports, the native half exports too. That is
 * the failure that breaks at runtime (`undefined is not a function` on a
 * device, and nothing at all on the web). Signatures are deliberately not
 * compared: `react-native` and `@types/react-native-web` do not agree on the
 * event types, so `onPointerEnter` alone makes every pressable pair
 * structurally incompatible, and the noise would drown the real thing.
 *
 * Nothing imports this module at runtime and it holds no values, so it never
 * enters a bundle. Adding a `.native` file without adding it here is the one
 * way to lose the check, which is why the list is meant to be the whole set.
 */

type MissingOnNative<Web, Native> = Exclude<keyof Web, keyof Native>;

/**
 * Resolves to `true` when the native half exports everything the web half does,
 * and otherwise to an object naming what is missing, which is what the compiler
 * prints. Extra exports on the native side are fine and expected: nothing
 * resolves to them on the web (`langStorageKey` is one).
 */
type SameExports<Web, Native> = MissingOnNative<Web, Native> extends never
  ? true
  : { missingOnNative: MissingOnNative<Web, Native> };

type Assert<T extends true> = T;

export type Pairs = [
  Assert<SameExports<typeof import("./api.readJson"), typeof import("./api.readJson.native")>>,
  Assert<SameExports<typeof import("./routing"), typeof import("./routing.native")>>,
  Assert<SameExports<typeof import("./i18n.useLang"), typeof import("./i18n.useLang.native")>>,
  Assert<
    SameExports<typeof import("./components/Image"), typeof import("./components/Image.native")>
  >,
  Assert<
    SameExports<
      typeof import("./components/ResumeEntryModal"),
      typeof import("./components/ResumeEntryModal.native")
    >
  >,
  Assert<
    SameExports<
      typeof import("./react-multiversal/clipboard"),
      typeof import("./react-multiversal/clipboard.native")
    >
  >,
  Assert<
    SameExports<
      typeof import("./react-multiversal/responsiveStyle"),
      typeof import("./react-multiversal/responsiveStyle.native")
    >
  >,
  Assert<
    SameExports<
      typeof import("./react-multiversal/IfWindowWidthIs"),
      typeof import("./react-multiversal/IfWindowWidthIs.native")
    >
  >,
  Assert<
    SameExports<
      typeof import("./react-multiversal/LinkText"),
      typeof import("./react-multiversal/LinkText.native")
    >
  >,
  Assert<
    SameExports<
      typeof import("./react-multiversal/LinkView"),
      typeof import("./react-multiversal/LinkView.native")
    >
  >,
  Assert<
    SameExports<
      typeof import("./react-multiversal/TextBlock"),
      typeof import("./react-multiversal/TextBlock.native")
    >
  >,
  Assert<
    SameExports<
      typeof import("./react-multiversal/ElevatedSurface"),
      typeof import("./react-multiversal/ElevatedSurface.native")
    >
  >,
  Assert<
    SameExports<
      typeof import("./react-multiversal/ElevatedSurface"),
      typeof import("./react-multiversal/ElevatedSurface.ios")
    >
  >,
  Assert<
    SameExports<
      typeof import("./react-multiversal/design/glass"),
      typeof import("./react-multiversal/design/glass.native")
    >
  >,
];
