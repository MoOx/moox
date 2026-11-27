import { defaultLang, isLang } from "@/i18n.langs";
import { notFound } from "@tanstack/react-router";

/**
 * Web-only, and kept out of `i18n.ts` for that reason: it is the one piece of
 * the language contract that talks to a router.
 *
 * Guard for the optional `{-$lang}` route segment. Only the prefixed languages
 * are valid there: `/fr/resume` exists, `/en/resume` does not (English is the
 * unprefixed default), and `/xx/resume` is a 404 rather than a page rendered
 * in English under a bogus URL.
 *
 * The app has no counterpart because it has no such segment: see
 * `i18n.useLang.native.tsx`. Importing it only from `src/routes.web/*` is what keeps
 * `notFound` - and TanStack Router with it - out of the native bundle.
 */
export const assertLangParam = (lang: string | undefined) => {
  if (lang !== undefined && (!isLang(lang) || lang === defaultLang)) throw notFound();
};
