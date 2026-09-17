import { Lang, langFromPathname } from "@/i18n.langs";
import { usePathname } from "@/routing";
import { ReactNode } from "react";

/**
 * On the web, the language **is** the URL. `/fr/resume` and `/resume` are two
 * addresses that can be shared, indexed and linked between with `hreflang`, so
 * there is no state to hold: the current language is read off the path, and
 * switching it is a navigation like any other.
 *
 * `i18n.useLang.native.tsx` is the other half, and it is the clearest place in
 * this repo to see what changes between a site and an app.
 */
export const useLang = (): Lang => langFromPathname(usePathname());

/**
 * Nothing to provide: there is no state. It exists so the shell can be written
 * once, and it is the native half that gives it a body.
 */
export const LangProvider = ({ children }: { children: ReactNode }) => children;

/**
 * Switching language on the web means going to the other URL, which
 * `LanguageSwitcher` already does with a plain link. Native has no such URL,
 * so its half returns a setter instead.
 */
export const useSetLang = (): ((lang: Lang) => void) | undefined => undefined;
