import { defaultLang, isLang, Lang } from "@/i18n.langs";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { createContext, ReactNode, use, useCallback, useEffect, useMemo, useState } from "react";

/**
 * Native half of `i18n.useLang.tsx`, and the sharpest diff between the site and
 * the app in this repo.
 *
 * The website reads its language off the URL, because a URL is the thing a
 * visitor shares and a crawler indexes: `/fr/resume` has to exist as an
 * address. An app has no address bar, nothing to index, and no second URL to
 * offer - so the same question ("what language is this?") stops being a
 * routing question and becomes what it always was on a device: a setting.
 *
 * Which is why there is no `{-$lang}` segment anywhere under `src/routes.native`. It
 * is not a feature that was dropped in the port; it is a web mechanism that
 * has no referent here.
 */

export const langStorageKey = "lang";

/**
 * The device's own language, and the only sensible first answer: a French
 * phone should open on French without anyone being asked. `Intl` ships with
 * Hermes, so this needs no dependency.
 */
const deviceLang = (): Lang => {
  const locale = Intl.DateTimeFormat().resolvedOptions().locale;
  const [language] = locale.split("-");
  return isLang(language) ? language : defaultLang;
};

const LangContext = createContext<{ lang: Lang; setLang: (lang: Lang) => void }>({
  lang: defaultLang,
  setLang: () => {},
});

export const LangProvider = ({ children }: { children: ReactNode }) => {
  // Starts on the device language rather than on `undefined`: a first frame in
  // the wrong language is a visible flash, and there is nothing to hydrate
  // against here, so guessing right and correcting later is free.
  const [lang, setLangState] = useState<Lang>(deviceLang);

  // The stored value is a *preference*, so it wins over the device - but it is
  // read asynchronously, which is exactly why it cannot be the initial state.
  useEffect(() => {
    let cancelled = false;
    void AsyncStorage.getItem(langStorageKey).then((stored) => {
      if (!cancelled && isLang(stored)) setLangState(stored);
    });
    return () => {
      cancelled = true;
    };
  }, []);

  const setLang = useCallback((next: Lang) => {
    setLangState(next);
    void AsyncStorage.setItem(langStorageKey, next);
  }, []);

  const value = useMemo(() => ({ lang, setLang }), [lang, setLang]);
  return <LangContext value={value}>{children}</LangContext>;
};

export const useLang = (): Lang => use(LangContext).lang;

/** Defined here and `undefined` on the web, where switching is a navigation. */
export const useSetLang = (): ((lang: Lang) => void) | undefined => use(LangContext).setLang;
