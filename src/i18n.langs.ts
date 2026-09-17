/**
 * The language primitives, in a file that imports nothing.
 *
 * They sit apart from `i18n.ts` so the platform halves of `useLang` can reach
 * them without importing the module that imports *them*. Same reason as
 * `LinkText.types.ts`: a shared base has to be lower than both halves, not
 * beside one of them.
 */

/**
 * Languages the site is served in. English is the default and carries no URL
 * prefix (`/resume`); every other language is served under its own prefix
 * (`/fr/resume`) by the same route, declared with an optional `{-$lang}`
 * segment. Real URLs per language: shareable, indexable, no content
 * negotiation.
 *
 * None of which applies to an app, and that is the interesting half of the
 * comparison: an app has no URL to share, so `i18n.useLang.native.tsx` makes
 * the language a setting instead of a location.
 */
export const langs = ["en", "fr"] as const;

export type Lang = (typeof langs)[number];

export const defaultLang: Lang = "en";

export const isLang = (value: unknown): value is Lang => langs.includes(value as Lang);

/** URL prefix of a language - empty for the default one. */
export const langPrefix = (lang: Lang) => (lang === defaultLang ? "" : `/${lang}`);

/** The language a path is served in, read from its prefix. */
export const langFromPathname = (pathname: string): Lang =>
  langs.find(
    (lang) => lang !== defaultLang && (pathname === `/${lang}` || pathname.startsWith(`/${lang}/`)),
  ) ?? defaultLang;

/** The path without its language prefix: `/fr/resume` → `/resume`. */
export const unlocalizedPath = (path: string) => {
  const lang = langFromPathname(path);
  return lang === defaultLang ? path : path.slice(`/${lang}`.length) || "/";
};

/** The language of a route, read from its optional `{-$lang}` param. */
export const langFromParam = (lang: string | undefined): Lang =>
  isLang(lang) ? lang : defaultLang;

/**
 * The `{-$lang}` param for a language, to pass to `Link` / `navigate`:
 * `undefined` for English, which is served without a prefix.
 */
export const langToParam = (lang: Lang) => (lang === defaultLang ? undefined : lang);
