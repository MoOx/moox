import { website } from "@/consts";
import { notFound, useRouterState } from "@tanstack/react-router";

/**
 * Languages the site is served in. English is the default and carries no URL
 * prefix (`/resume`); every other language is served under its own prefix
 * (`/fr/resume`) by the same route, declared with an optional `{-$lang}`
 * segment. Real URLs per language: shareable, indexable, no content
 * negotiation.
 */
export const langs = ["en", "fr"] as const;

export type Lang = (typeof langs)[number];

export const defaultLang: Lang = "en";

export const isLang = (value: unknown): value is Lang => langs.includes(value as Lang);

/** URL prefix of a language - empty for the default one. */
export const langPrefix = (lang: Lang) => (lang === defaultLang ? "" : `/${lang}`);

/**
 * A translatable value. Authored either as a plain value - English, not
 * translated (yet) - or as a per-language map where English is mandatory, so a
 * missing translation falls back to English instead of rendering nothing. Same
 * shape in the markdown frontmatter and in the TypeScript content files, so
 * there is one thing to learn and no parallel dictionary to keep in sync.
 */
export type Localized<T = string> = T | ({ en: T } & Partial<Record<Lang, T>>);

const isLocalizedMap = <T>(value: Localized<T>): value is { en: T } & Partial<Record<Lang, T>> =>
  typeof value === "object" && value !== null && "en" in value;

/** Reads a translatable value in the given language, falling back to English. */
export function l<T>(value: Localized<T>, lang: Lang): T;
export function l<T>(value: Localized<T> | undefined, lang: Lang): T | undefined;
export function l<T>(value: Localized<T> | undefined, lang: Lang): T | undefined {
  if (value === undefined) return undefined;
  if (!isLocalizedMap(value)) return value;
  return value[lang] ?? value.en;
}

/**
 * Guard for the optional `{-$lang}` route segment. Only the prefixed languages
 * are valid there: `/fr/resume` exists, `/en/resume` does not (English is the
 * unprefixed default), and `/xx/resume` is a 404 rather than a page rendered
 * in English under a bogus URL.
 */
export const assertLangParam = (lang: string | undefined) => {
  if (lang !== undefined && (!isLang(lang) || lang === defaultLang)) throw notFound();
};

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

/**
 * The paths that exist in every language - the `{-$lang}` routes in `src/app`.
 * `/blog` and `/talks` are deliberately English-only, so a link to them must
 * never be prefixed: it would point at a 404. Keeping the list here (rather
 * than prefixing every internal link blindly) makes `localizedHref` safe to
 * call on any href.
 */
const localizedPathPatterns = [/^\/$/, /^\/resume(\/|$)/, /^\/cv(\/|$)/, /^\/contact(\/|$)/];

export const isLocalizedPath = (path: string) =>
  localizedPathPatterns.some((pattern) => pattern.test(unlocalizedPath(path)));

/**
 * The same page in the given language. Only touches internal paths that have a
 * translated version - external URLs, hashes, mail links and English-only
 * sections are returned untouched.
 */
export const localizedHref = (href: string, lang: Lang) => {
  if (!href.startsWith("/") || !isLocalizedPath(href)) return href;
  const path = unlocalizedPath(href);
  const prefix = langPrefix(lang);
  if (prefix === "") return path;
  return path === "/" ? prefix : prefix + path;
};

/** The language of the page being rendered. */
export const useLang = (): Lang =>
  useRouterState({ select: (s) => langFromPathname(s.location.pathname) });

/**
 * Reads translatable values in the language of the page being rendered - the
 * component-side counterpart of `l()`. Résumé entries are already resolved by
 * their loader, so this is for the editorial strings that live in TypeScript
 * (`profile.tsx`, `consts.tsx`, the components themselves).
 */
export const useT = () => {
  const lang = useLang();
  // Same overloads as `l`: a value that is always defined stays defined, so
  // callers don't have to `?? ""` their way through the JSX.
  function t<T>(value: Localized<T>): T;
  function t<T>(value: Localized<T> | undefined): T | undefined;
  function t<T>(value: Localized<T> | undefined) {
    return l(value, lang);
  }
  return t;
};

/**
 * Localizes internal hrefs for the current page's language. The site's links
 * are plain `href` strings (see `LinkText` / `LinkView`), so this is how a link
 * stays in the language the visitor is reading.
 */
export const useHref = () => {
  const lang = useLang();
  return (href: string) => localizedHref(href, lang);
};

/** The language of a route, read from its optional `{-$lang}` param. */
export const langFromParam = (lang: string | undefined): Lang =>
  isLang(lang) ? lang : defaultLang;

/**
 * The `{-$lang}` param for a language, to pass to `Link` / `navigate`:
 * `undefined` for English, which is served without a prefix.
 */
export const langToParam = (lang: Lang) => (lang === defaultLang ? undefined : lang);

/**
 * `hreflang` alternates + canonical for a page, from its unlocalized path and
 * the language it is being served in. Every translated page must advertise all
 * of its versions, or search engines treat them as duplicates competing with
 * each other.
 */
export const alternateLinks = (path: string, lang: Lang) => [
  { rel: "canonical", href: website + localizedHref(path, lang) },
  ...langs.map((alternate) => ({
    rel: "alternate",
    hrefLang: alternate,
    href: website + localizedHref(path, alternate),
  })),
  { rel: "alternate", hrefLang: "x-default", href: website + localizedHref(path, defaultLang) },
];
