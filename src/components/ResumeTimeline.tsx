import { useLang, useT } from "@/i18n";
import { ResumeItem, Talk } from "@/api";
import { DevCopyResumeEntry } from "@/components/DevCopyResumeEntry";
import ExperienceCard from "@/components/ExperienceCard";
import { resumeEntryTransitionName } from "@/profile";
import { monthRange, monthYear, resumeEntryPath } from "@/profile";
import { size } from "@/react-multiversal";
import { fontStyles } from "@/react-multiversal/font";
import Spacer from "@/react-multiversal/Spacer";
import { useTheme } from "@/styles";
import { Fragment } from "react";
import { Platform, Text, View } from "react-native";

/**
 * The chronological feed closing `/resume`: every mission, project and
 * education entry as a full-width `ExperienceCard`, with conference talks
 * interleaved at their date - the same story the CV condenses, complete.
 */
type TimelineEntry =
  | { kind: "resume"; date: string; item: ResumeItem }
  | { kind: "talk"; date: string; talk: Talk };

export const ResumeTimeline = ({
  items,
  talks = [],
  activeSlug,
  onOpenEntry,
}: {
  items: ResumeItem[];
  /** Interleaved at their date, as lighter cards (no icon, no image). */
  talks?: Talk[];
  /**
   * URL slug of the entry whose detail is currently open (modal above the
   * timeline). That card must give up its view-transition name to the modal -
   * duplicate names on one page make the browser skip the transition.
   */
  activeSlug?: string;
  /**
   * Intercepts the ⓘ click of resume entries (opens the detail as a modal
   * with a masked URL); the href stays the real, crawlable page.
   */
  onOpenEntry?: (item: ResumeItem, event?: { preventDefault?: () => void }) => void;
}) => {
  const theme = useTheme();
  const t = useT();
  const lang = useLang();
  const todayDateOnlyAsISOString = new Date().toISOString().slice(0, 10);

  // Ongoing entries sort at "today": the feed is ordered by when something
  // ended (or is still running), not when it started.
  const entries: TimelineEntry[] = [
    ...items.map((item) => ({
      kind: "resume" as const,
      date: (item.dateEnd || todayDateOnlyAsISOString).slice(0, 10),
      item,
    })),
    ...talks.map((talk) => ({
      kind: "talk" as const,
      date: (talk.date ?? "").slice(0, 10),
      talk,
    })),
  ].sort((a, b) => (a.date < b.date ? 1 : a.date > b.date ? -1 : 0));

  let latestYear: string | undefined;

  return (
    <View style={{ gap: size("m") }}>
      {entries.map((entry) => {
        const year = entry.date.slice(0, 4);
        const newYear = year !== latestYear;
        latestYear = year;

        return (
          <Fragment key={entry.kind === "resume" ? entry.item.slug : entry.talk.slug}>
            {newYear ? (
              <View role="heading" aria-level={3}>
                <Spacer size="m" />
                <Text style={[fontStyles.iosEm.title1, theme.styles.text]}>{year}</Text>
              </View>
            ) : null}
            {entry.kind === "resume" ? (
              // Deep-link target: the id sits on the card, offset by
              // `scroll-margin-top` (see styles.css).
              <View nativeID={entry.item.slug} dataSet={{ "scroll-anchor": "true" }}>
                <ExperienceCard
                  icon={entry.item.icon}
                  image={entry.item.image}
                  pretitle={entry.item.job_title}
                  title={entry.item.title}
                  company={entry.item.company}
                  dates={monthRange(entry.item, lang)}
                  tags={entry.item.hashtags}
                  infoHref={resumeEntryPath(entry.item)}
                  infoLabel={`${t({ en: "All the details about", fr: "Tous les détails sur" })} ${entry.item.company || entry.item.title}`}
                  infoOnPress={onOpenEntry ? (event) => onOpenEntry(entry.item, event) : undefined}
                  style={
                    // The card and its detail share a view-transition name
                    // (the "zoom" effect) - except the card whose detail is
                    // open: duplicate names would skip the transition.
                    !activeSlug || !entry.item.slug.endsWith(`/${activeSlug}`)
                      ? {
                          viewTransitionName: resumeEntryTransitionName(entry.item),
                        }
                      : undefined
                  }
                />
                {/* Dev-only, web-only: copy the entry as text for LinkedIn.
                    `import.meta.env` is a Vite API - Metro leaves `import.meta`
                    an empty object, so reading `.DEV` off it throws on native.
                    The `Platform` test short-circuits before that, and it is
                    the honest guard anyway: the tool writes to the browser
                    clipboard (see DevCopyResumeEntry). */}
                {Platform.OS === "web" && import.meta.env.DEV ? (
                  <DevCopyResumeEntry item={entry.item} />
                ) : null}
              </View>
            ) : (
              <ExperienceCard
                pretitle={`Conference talk${
                  entry.talk.lang ? ` · ${entry.talk.lang.toUpperCase()}` : ""
                }`}
                title={entry.talk.title}
                company={entry.talk.conference}
                dates={entry.talk.date ? monthYear(entry.talk.date, lang) : undefined}
                infoHref={`/${entry.talk.slug}`}
                infoLabel={`${t({ en: "All the details about the talk", fr: "Tous les détails sur la conférence" })} “${entry.talk.title}”`}
              />
            )}
          </Fragment>
        );
      })}
    </View>
  );
};
