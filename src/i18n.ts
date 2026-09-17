import { website } from "@/consts";
import { defaultLang, Lang, langPrefix, langs, unlocalizedPath } from "@/i18n.langs";
import { useLang } from "@/i18n.useLang";

/**
 * The i18n contract. Everything here is pure except the three hooks at the
 * bottom, and those read the language through `i18n.useLang`, which is the one
 * file that differs between the site and the app.
 *
 * The language primitives live in `i18n.langs.ts` and are re-exported here, so
 * a component keeps importing everything from `@/i18n` and never has to know
 * the split exists.
 */
export * from "@/i18n.langs";
export { LangProvider, useLang, useSetLang } from "@/i18n.useLang";

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
 * The paths that exist in every language - the `{-$lang}` routes in `src/routes.web`.
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
 *
 * On the app this is close to a no-op: `useLang` returns a setting rather than
 * a path segment, and the native routes carry no `{-$lang}`, so the hrefs it
 * hands back are the unprefixed ones. Same call site, same contract, and the
 * language still reaches the page - through `useT` instead of through the URL.
 */
export const useHref = () => {
  const lang = useLang();
  return (href: string) => localizedHref(href, lang);
};

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
