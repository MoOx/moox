import { l, Lang, Localized } from "@/i18n";

export type ContentItem = {
  slug: string;
  title: string;
  date?: string;
  body?: any;
};

/** A single headline figure, e.g. "125k+ Downloads / week". */
export type ResumeStat = {
  /** The value, e.g. "125k+", "10M", "82.3%". */
  stat: string;
  /** What it measures, e.g. "Downloads / week". */
  label: string;
  /** Optional eyebrow above the value, e.g. "Still", "Peak". */
  title?: string;
  /** Optional context line, e.g. "8 years after deprecating". */
  comment?: string;
  /** Optional source/proof link (npm, GitHub…). */
  url?: string;
};

export type ResumeItem = ContentItem & {
  company: string;
  dateStart: string;
  dateEnd?: string;
  wip?: boolean;
  hashtags: string[];
  image?: string;
  links?: Array<{
    title: string;
    url: string;
  }>;
  url?: string;
  // CV export (`/cv`) - curated fields authored in the markdown frontmatter.
  highlight?: boolean;
  education?: boolean;
  openSource?: boolean;
  /**
   * Not a client engagement (Pékin Express…). Kept in the résumé data, but never
   * listed as professional experience on the CV - a work-history parser would
   * otherwise read it as a job.
   */
  personal?: boolean;
  job_title?: string;
  icon?: string;
  /**
   * Folds several markdown entries into a single CV row. Each mission stays its
   * own file (the timeline needs them separate), but a CV lists the *client*,
   * not the contracts: the row's date span is derived from the whole group, so
   * nothing is hand-maintained.
   */
  group?: string;
  /**
   * The condensed-view pitch of a single entry (CV key row, /resume key
   * card, modal lead) - one paragraph, CV formula. Not "description, but
   * longer": description says what it is, the pitch says what I did.
   */
  pitch?: string;
  /**
   * Same as `pitch`, but written to cover every mission of the group at
   * once. Only meaningful on the `highlight` entry of a `group` - entries
   * without a group use `pitch`. Condensed views read
   * `groupPitch ?? pitch` (see `pitchOf` in profile.tsx).
   */
  groupPitch?: string;
  /**
   * Same as `title`, but covering the whole group ("iOS / Android & web
   * apps…" where the highlight mission's title only names one app). Same
   * rule as `groupPitch`: only on the `highlight` entry of a `group`.
   * Condensed views read `groupTitle ?? title` (see `titleOf`).
   */
  groupTitle?: string;
  stats?: ResumeStat[];
};

/**
 * A résumé entry as authored, before a language is picked: the editorial
 * fields may carry `{ en, fr }` maps and the body is split per language by
 * `scripts/generate-content-indexes.mjs`. Everything reaching a component goes
 * through `localizeResumeItem` first, so `ResumeItem` above stays plain
 * strings and no rendering code has to know about translations.
 *
 * Nothing else is translatable on purpose: `company` is a proper noun,
 * `hashtags` are technologies, and dates, slugs and images are not prose.
 */
export type ResumeItemSource = Omit<
  ResumeItem,
  "title" | "groupTitle" | "pitch" | "groupPitch" | "job_title" | "stats" | "links" | "body"
> & {
  title: Localized<string>;
  groupTitle?: Localized<string>;
  pitch?: Localized<string>;
  groupPitch?: Localized<string>;
  job_title?: Localized<string>;
  stats?: ResumeStatSource[];
  links?: Array<{ title: Localized<string>; url: string }>;
  /** `en` is always present; `fr` only once the entry has been translated. */
  body?: { en: unknown; fr?: unknown };
};

export type ResumeStatSource = Omit<ResumeStat, "stat" | "label" | "title" | "comment"> & {
  stat: Localized<string>;
  label: Localized<string>;
  title?: Localized<string>;
  comment?: Localized<string>;
};

/** Resolves every translatable field of an entry to one language. */
export const localizeResumeItem = (item: ResumeItemSource, lang: Lang): ResumeItem => ({
  ...item,
  title: l(item.title, lang),
  groupTitle: l(item.groupTitle, lang),
  pitch: l(item.pitch, lang),
  groupPitch: l(item.groupPitch, lang),
  job_title: l(item.job_title, lang),
  stats: item.stats?.map((stat) => ({
    ...stat,
    stat: l(stat.stat, lang),
    label: l(stat.label, lang),
    title: l(stat.title, lang),
    comment: l(stat.comment, lang),
  })),
  links: item.links?.map((link) => ({ ...link, title: l(link.title, lang) })),
  body: item.body ? l(item.body as Localized<unknown>, lang) : undefined,
});

export type BlogPost = ContentItem & {
  lang?: string;
};

export type Talk = ContentItem & {
  conference?: string;
  lang?: string;
  slides?: string;
  slidesEmbed?: string;
  video?: string;
  videoEmbed?: string;
};

export type ContentType = "blog" | "resume" | "talks";

export type ContentTypeMap = {
  blog: BlogPost;
  resume: ResumeItemSource;
  talks: Talk;
};

function sortByDate<T extends { date?: string }>(items: T[]): T[] {
  return [...items].sort((a, b) => {
    const dateA = a.date ? new Date(a.date).getTime() : 0;
    const dateB = b.date ? new Date(b.date).getTime() : 0;
    return dateB - dateA;
  });
}

async function readJson<T>(urlPath: string): Promise<T> {
  if (typeof window === "undefined") {
    // SSR/prerender: read from filesystem
    const fs = await import("node:fs");
    const path = await import("node:path");
    const filePath = path.join(process.cwd(), "public", urlPath);
    return JSON.parse(fs.readFileSync(filePath, "utf8")) as T;
  }
  // Client: fetch from static files
  const res = await fetch(urlPath);
  if (!res.ok) throw new Error(`Failed to fetch ${urlPath}: ${res.status}`);
  return (await res.json()) as T;
}

export async function fetchAll<T extends ContentType>(opts: {
  data: T;
}): Promise<ContentTypeMap[T][]> {
  const items = await readJson<ContentTypeMap[T][]>(`/content/${opts.data}.json`);
  return sortByDate(items);
}

export async function fetchOne<T extends ContentType>(opts: {
  data: { filename: string; contentType: T };
}): Promise<ContentTypeMap[T] | null> {
  try {
    const data = await readJson<ContentTypeMap[T]>(
      `/content/${opts.data.contentType}/${opts.data.filename}`,
    );
    const slug = opts.data.contentType + "/" + opts.data.filename.replace(/\.json$/, "");
    return { ...data, slug } as ContentTypeMap[T];
  } catch {
    return null;
  }
}

/**
 * The résumé, resolved for one language - what every loader should use. The
 * language boundary is here: past this point nothing carries `{ en, fr }`.
 */
export async function fetchResume(lang: Lang): Promise<ResumeItem[]> {
  const items = await fetchAll({ data: "resume" });
  return items.map((item) => localizeResumeItem(item, lang));
}

/** One résumé entry, resolved for one language. */
export async function fetchResumeEntry(filename: string, lang: Lang): Promise<ResumeItem | null> {
  const item = await fetchOne({ data: { filename, contentType: "resume" } });
  return item && localizeResumeItem(item, lang);
}
