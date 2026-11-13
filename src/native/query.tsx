import { ContentType, ContentTypeMap, fetchAll, fetchOne, fetchResume, fetchResumeEntry, ResumeItem } from "@/api";
import { Lang, useLang, useT } from "@/i18n";
import { useTheme } from "@/styles";
import { QueryClient, useQuery, UseQueryResult } from "@tanstack/react-query";
import { ReactNode } from "react";
import { ActivityIndicator, StyleSheet, Text, View } from "react-native";

/**
 * What the app has instead of a route `loader`, and the second real difference
 * between the two halves of this repo.
 *
 * On the site, TanStack Start runs a route's `loader` *before* the component:
 * on the server for the first paint, in the browser on a client navigation.
 * The page therefore never renders without its data, and never renders a
 * spinner.
 *
 * Expo Router has no such hook, and could not usefully have one: there is no
 * server rendering the first screen, and no HTML to hold the result. So the
 * data is fetched by the component, which means every screen here has a real
 * loading state that the same screen on the web does not.
 *
 * The functions being called are the same ones the loaders call - `fetchAll`,
 * `fetchResume` - and `api.readJson.native.ts` already points them at the
 * deployed site, so both platforms read exactly the same JSON.
 *
 * What the cache buys that a loader does not: `/`, `/resume` and `/cv` all
 * want `fetchResume`, and a loader refetches per navigation. Here it is one
 * request, shared between the tabs, retried on a flaky connection and kept
 * across a tab switch. On a phone that is not a nicety.
 */
export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // The content is a deploy artifact: it changes when the site ships, not
      // while somebody is reading it.
      staleTime: 5 * 60 * 1000,
      retry: 2,
    },
  },
});

/** The résumé, resolved for the language currently selected in the app. */
export const useResumeQuery = () => {
  const lang = useLang();
  return useQuery({
    // The language is part of the key: entries are localized by `fetchResume`,
    // so switching language must not reuse the other language's copy.
    queryKey: ["resume", lang] as [string, Lang],
    queryFn: () => fetchResume(lang),
  });
};

/** One list of content: `blog` or `talks`. Both are English-only. */
export const useContentQuery = <T extends ContentType>(type: T) =>
  useQuery({
    queryKey: ["content", type],
    queryFn: () => fetchAll({ data: type }),
  });

/** One piece of content, by slug. */
export const useContentItemQuery = <T extends ContentType>(type: T, slug: string) =>
  useQuery({
    queryKey: ["content", type, slug],
    queryFn: () =>
      fetchOne({ data: { filename: decodeURIComponent(slug) + ".json", contentType: type } }),
  });

/** One résumé entry, by slug, in the selected language. */
export const useResumeEntryQuery = (slug: string) => {
  const lang = useLang();
  return useQuery({
    queryKey: ["resume-entry", lang, slug],
    queryFn: () => fetchResumeEntry(decodeURIComponent(slug) + ".json", lang),
  });
};

const byDateDesc = (a: ResumeItem, b: ResumeItem) =>
  (b.dateEnd || "9999") < (a.dateEnd || "9999") ? -1 : 1;

/**
 * Every mission of a grouped client. Derived from the résumé query rather than
 * fetched on its own, so opening a group costs nothing once the timeline has
 * been seen - the loader on the site refetches the whole résumé for this.
 */
export const useResumeGroupQuery = (group: string) => {
  const query = useResumeQuery();
  const name = decodeURIComponent(group);
  const members = (query.data ?? []).filter((i) => i.group === name).sort(byDateDesc);
  // The highlight entry carries the group-wide copy (groupTitle/groupPitch).
  return { ...query, members, lead: members.find((i) => i.highlight) ?? members[0] };
};

/** Everything `/cv` and `/resume` need, in the three requests the loader made. */
export const useResumePageQuery = () => {
  const resume = useResumeQuery();
  const talks = useContentQuery("talks");
  const blog = useContentQuery("blog");
  return { resume, talks, blog };
};

const styles = StyleSheet.create({
  center: { flexGrow: 1, alignItems: "center", justifyContent: "center", padding: 32, gap: 12 },
});

/**
 * The loading and error states a `loader` made unnecessary on the web.
 *
 * Deliberately one component rather than a copy per screen: what a screen
 * gains from the port is a stack and a native tab bar, not eight hand-rolled
 * spinners.
 */
export function QueryView<T>({
  query,
  testID,
  children,
}: {
  query: Pick<UseQueryResult<T>, "data" | "error" | "isPending">;
  /**
   * Which screen this is. Native tabs mount every tab at once - that is what
   * makes switching back instant - so a test cannot ask "is the screen
   * loaded?" and get an answer about the screen it asked for. It has to name
   * one.
   */
  testID: string;
  children: (data: T) => ReactNode;
}) {
  const theme = useTheme();
  const t = useT();
  if (query.isPending) {
    return (
      <View style={[styles.center, theme.styles.back]}>
        <ActivityIndicator color={theme.dynamicColors.text} />
      </View>
    );
  }
  if (query.error || query.data === undefined) {
    return (
      <View style={[styles.center, theme.styles.back]}>
        <Text style={theme.styles.text}>
          {t({
            en: "Could not load this from moox.io.",
            fr: "Impossible de charger cette page depuis moox.io.",
          })}
        </Text>
        <Text style={theme.styles.textLight1}>
          {query.error instanceof Error ? query.error.message : ""}
        </Text>
      </View>
    );
  }
  // "This screen has its data" is what a loader guaranteed before rendering,
  // and the one thing a test cannot infer from the tree now that it does not.
  return <View testID={testID}>{children(query.data)}</View>;
}

export type { ContentTypeMap };
