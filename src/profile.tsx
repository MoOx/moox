import type { ResumeItem, ResumeStat } from "@/api";
import IconReact from "@/components/IconReact";
import IconReactNative from "@/components/IconReactNative";
import type { SkillCardIcon } from "@/components/SkillCard";
import { ind, sendStringAsMailString, socials, website } from "@/consts";
import SVGActivityBricolage from "@/svgs/components/SVGActivityBricolage";
import SVGActivityClimbing from "@/svgs/components/SVGActivityClimbing";
import SVGActivityCrossfit from "@/svgs/components/SVGActivityCrossfit";
import SVGActivityDj from "@/svgs/components/SVGActivityDj";
import SVGActivityPekinExpress from "@/svgs/components/SVGActivityPekinExpress";
import SVGActivityStandup from "@/svgs/components/SVGActivityStandup";
import SVGClaude from "@/svgs/components/SVGClaude";
import SVGCss from "@/svgs/components/SVGCss";
import SVGDetox from "@/svgs/components/SVGDetox";
import SVGExpo from "@/svgs/components/SVGExpo";
import SVGJavaScript from "@/svgs/components/SVGJavaScript";
import SVGNextjs from "@/svgs/components/SVGNextjs";
import SVGPlaywright from "@/svgs/components/SVGPlaywright";
import SVGPostcss from "@/svgs/components/SVGPostcss";
import SVGSquareStack3DUpFill from "@/svgs/components/SVGSquareStack3DUpFill";
import SVGStorybook from "@/svgs/components/SVGStorybook";
import SVGTanstack from "@/svgs/components/SVGTanstack";
import SVGTypescript from "@/svgs/components/SVGTypescript";
import type { ComponentType } from "react";

// ------------------------------------------------------------------- Profile
// The site's editorial content: who Max is, what he sells, and the figures
// behind it. Single source of truth consumed by `/cv` (page + PDF + JSON-LD),
// the home page and `/resume`. Experiences, education and open-source entries
// come from the resume markdown frontmatter (`highlight` / `education` /
// `openSource` flags) - only the editorial copy and the figures that can't be
// computed at build time live here.

// Setup then punchline. The previous version ended on "- the ultimate
// sophistication", the attribute of Da Vinci's "Simplicity is the ultimate
// sophistication" with its subject missing: the reader got the punchline
// without the joke, in the only borrowed voice on the page. Same idea, own
// words. The second sentence repeats `Simple` instead of pronominalizing it
// ("That's the hard part") - nothing for a pronoun to point at, so the line
// survives translation to French word for word: "Je rends les front-ends
// simples. Le simple, c'est le plus dur."
// Split in two parts so the home band can stack them as a two-line punch;
// the one-line `tagline` is derived from the same value.
export const taglineParts = ["I make front-ends simple.", "Simple is the hard part."] as const;
export const tagline = taglineParts.join(" ");

// Scope, not headcount. "I'm a one-person front-end team" said the right thing
// with the wrong word: it excludes the team, three lines under a `Lead` title
// and next to a "Mentoring & technical direction" card - readers split on
// whether it meant "very productive" or "works alone". And leading with the
// speed AI buys is an invitation to negotiate the rate down, so AI appears here
// as what makes the pace safe, not as what makes it cheap.
export const summary =
  "Almost two decades turning tangled front-ends into systems teams can actually maintain: simpler architecture, less overhead, and devs who level up along the way. Today I own the whole front-end, from architecture to release - strict types, end-to-end (E2E) tests and CI keep it safe at that pace.";

/**
 * Where I work from - recruiters and job boards filter on it.
 * Not named `location`: importing that would shadow `window.location`.
 */
export const workLocation = "Toulouse, France · Remote";

/**
 * The headline: what a client searches for. It mirrors the job titles of the
 * last missions, so the claim is a summary of the CV, not a promotion.
 *
 * Split into parts so heroes can highlight "Front-End" (the searched term)
 * while the full title is derived from the same value - the two can't drift.
 */
export const jobTitleParts = ["Lead", "Front-End", "Developer"] as const;
export const jobTitle = jobTitleParts.join(" ");

/**
 * Carries the platform reach the title deliberately leaves out - and does it
 * with the terms clients actually search for ("React Native" beats "mobile").
 */
export const jobSubtitle = "React, React Native & cross-platform.";

/**
 * Availability, shown next to the pulsing badge. "Available now" on purpose: a
 * month would read as "not available before then". Staleness of a circulating
 * PDF is handled by `updatedOn` in the CV footer, which dates the whole
 * document instead of just this line.
 */
export const availabilityLabel = "Available now";
export const availabilityDetail = "full time or less";

/** "Updated August 2026" - stamped at generation, so it is never stale. */
export const updatedOn = () =>
  `Updated ${new Date().toLocaleDateString("en-US", {
    month: "long",
    year: "numeric",
  })}`;

export const languages = [
  { flag: "🇫🇷", label: "French", level: "Native" },
  { flag: "🇬🇧", label: "English", level: "Fluent" },
];

/** Legal name, and the one everybody actually uses. */
export const fullName = "Maxime Thirouin";
export const nickname = "Max";
/** Web handle - GitHub, npm, X… "also known as MoOx on the web". */
export const handle = "MoOx";

/**
 * Article count on putaindecode.io, which `blog.json` cannot see - it only
 * indexes moox.io. Source: https://putaindecode.io/articles?search=moox
 */
export const putaindecodeArticles = 22;
export const putaindecodeArticlesUrl = "https://putaindecode.io/articles?search=moox";
export const putaindecodePodcastsUrl = "https://putaindecode.io/podcasts";

/**
 * The document's own metadata, authored once here and consumed three times:
 * the HTML `<head>`, the JSON-LD block, and the generated PDF's `/Info`
 * dictionary (the export script reads them back off the rendered page, so a
 * plain Node script needs no import of this TSX module).
 */
export const metaKeywords = [
  "React",
  "React Native",
  "TypeScript",
  "front-end architecture",
  "design systems",
  "accessibility",
  "cross-platform",
  "freelance",
  "remote",
  "Toulouse",
];

export const metaTitle = `${fullName} (${nickname}) - CV / Résumé - ${jobTitle}, Web & Mobile`;

export type SkillDomain = {
  title: string;
  /** Lead-in line, only read on the feature card. */
  subtitle?: string;
  items: string[];
  /**
   * One-sentence teaser for the home cards - the "why call him" of the domain
   * in prose, where `items` carry the detail on `/resume` and `/cv`.
   */
  blurb?: string;
  /**
   * The few terms the home teaser shows under the blurb. A curated field, not
   * `items.slice(0, n)`: the full items are phrased as engagements
   * ("Modernizing legacy React codebases"), too heavy for a teaser line.
   */
  keywords?: string[];
  /** The hero card of the mosaic: bigger, items on their own lines. */
  feature?: boolean;
  /**
   * Watermark behind the card. Kept on the domain rather than in a title-keyed
   * lookup in `cv.tsx`: that lookup dropped the icon silently the moment a
   * title was reworded, which is exactly the kind of drift this file exists to
   * prevent. At `opacity: 0.09` and 150px only solid glyphs read - thin,
   * line-art symbols vanish.
   */
  Icon?: SkillCardIcon;
  /** [from, to] - dark brand colors, angled like the site's cards. */
  gradient: [string, string];
};

export const skillsDomains: SkillDomain[] = [
  {
    title: "Front-End Architecture",
    subtitle: "Simpler systems, less overhead, teams that ship.",
    feature: true,
    // Phrased as what I get hired for, not as abstract competences: this is the
    // first block a reader hits, and "why call him" is the question it has to
    // answer. The card has the room, so it carries the whole list.
    // No "Cross-platform from a single codebase" line: the card sitting right
    // next to this one is literally titled "Cross-platform" and says it better.
    items: [
      "Modernizing legacy React codebases",
      "Design systems & component APIs",
      "Performance & rendering budgets",
      // Backed by the Hove pitch on page 1, which names who validated it. A
      // skills card may only claim what an experience row can evidence, and
      // "validated by disabled users" is the part almost no CV can show.
      "Accessibility, validated by disabled users",
      "Release automation & end-to-end (E2E) testing",
      "Maintainability at scale",
      "Mentoring & technical direction",
    ],
    blurb:
      "The structure that lets a team ship fast without breaking things - design systems, performance budgets, accessibility and release automation.",
    keywords: ["Design systems", "Performance", "Accessibility"],
    Icon: SVGSquareStack3DUpFill as SkillCardIcon,
    gradient: ["#0D0837", "#4421A7"],
  },
  {
    title: "Languages & Tooling",
    items: [
      "TypeScript",
      "JavaScript",
      "Node.js",
      "HTML / CSS",
      "REST",
      "GraphQL",
      "Playwright",
      "Detox",
      "Storybook",
      "CI/CD",
      "Jenkins",
      "Fastlane",
    ],
    blurb:
      "Strict TypeScript end to end, with Playwright, Detox and CI as the safety net - so refactors stay cheap and releases stay boring.",
    keywords: ["TypeScript", "Playwright", "CI/CD"],
    Icon: SVGTypescript as SkillCardIcon,
    gradient: ["#0D0837", "#3178C6"],
  },
  {
    title: "Web / Native / Cross-platform",
    items: ["React", "React Native", "Expo", "Web", "iOS", "Android", "TanStack", "Next.js"],
    blurb: "One React codebase for web, iOS and Android - each platform still feeling like itself.",
    keywords: ["React", "React Native", "Expo"],
    Icon: SVGExpo as SkillCardIcon,
    gradient: ["#0D0837", "#087EA4"],
  },
  {
    // Not a tool I "know" - a way of working. The claim is about intent being
    // the bottleneck, not the model, which is what actually separates senior
    // usage from the "AI writes bugs" complaint.
    title: "AI-assisted engineering",
    // Category first, product in parentheses: "Claude Code" is what is searched
    // today and shows this is a practice rather than a buzzword, but the tool
    // will be renamed long before the way of working changes.
    items: [
      "AI coding agents (Claude Code), daily",
      "Precise intent in, working code out",
      "Strict types, end-to-end tests & CI as the safety net",
    ],
    blurb:
      "AI coding agents daily: precise intent in, working code out - types, tests and CI keep the pace safe.",
    keywords: ["Claude Code", "Agents", "Guardrails"],
    Icon: SVGClaude as SkillCardIcon,
    gradient: ["#0D0837", "#8C2C7B"],
  },
];

export type ProfileIcon = ComponentType<{
  width?: number;
  height?: number;
  fill?: string;
  style?: object;
}>;

export type IconItem = {
  label: string;
  Icon: ProfileIcon;
  /** Shown on the condensed print CV; the site renders the full list. */
  cv?: boolean;
};

/**
 * The tech logo strip. Logos scan in a second, which no text card replaces -
 * but each one has to earn its slot. GraphQL left: it is one line in the
 * Languages card and it is not what anyone hires me for. The additions each
 * anchor a claim the cards make but no logo backed: PostCSS the 200M
 * downloads, Playwright/Detox/Storybook the testing & design-system work,
 * Claude the AI workflow. No npm: a registry is not a skill, and PostCSS
 * already anchors the 200M downloads tile that was the only reason to show it.
 */
export const techs: IconItem[] = [
  { Icon: SVGJavaScript, label: "JavaScript" },
  { Icon: SVGTypescript, label: "TypeScript" },
  { Icon: SVGCss, label: "CSS" },
  { Icon: IconReact as ProfileIcon, label: "React" },
  { Icon: IconReactNative as ProfileIcon, label: "Native" },
  { Icon: SVGExpo, label: "Expo" },
  { Icon: SVGTanstack, label: "TanStack" },
  { Icon: SVGNextjs, label: "Next.js" },
  { Icon: SVGPostcss, label: "PostCSS" },
  { Icon: SVGStorybook, label: "Storybook" },
  { Icon: SVGPlaywright, label: "Playwright" },
  { Icon: SVGDetox, label: "Detox" },
  { Icon: SVGClaude, label: "Claude" },
];

/**
 * Beyond code. The site shows everything; the print CV keeps only the
 * `cv: true` five - the strongest conversation pieces on limited paper.
 */
export const hobbies: IconItem[] = [
  { Icon: SVGActivityCrossfit, label: "CrossFit", cv: true },
  { Icon: SVGActivityClimbing, label: "Climbing", cv: true },
  { Icon: SVGActivityDj, label: "DJ", cv: true },
  { Icon: SVGActivityBricolage, label: "Bricolage", cv: true },
  { Icon: SVGActivityStandup, label: "Standup", cv: true },
  { Icon: SVGActivityPekinExpress, label: "Pekin Express\n#20", cv: true },
];

/**
 * Intro to the skills cards on the home - reworked from the old "Front-end
 * Architect" block prose. The tagline/summary pitch lives higher on the page
 * (the indigo band); this block answers the next question: in what shape does
 * the help come.
 */
export const skillsPitchTitle = "Where I can help.";
export const skillsPitch =
  "Years of shipping web & mobile apps made me confident in the high-level choices - architecture, stack, tooling - and in picking what fits the interface you actually need. Advice, training, or hands-on building: I help you and your team focus on what your users need.";

// Names the packages behind the "200M+ downloads / month" tile: without them the
// headline figure is a number nobody can reconcile with the cards below it.
export const openSourceIntro =
  "Contributing to open source since the early days. The PostCSS plugins I created - postcss-calc, postcss-custom-properties, postcss-color-hex-alpha & co - are downloaded 200M+ times a month. GitHub Arctic Code Vault Contributor.";

// -------------------------------------------------------------------- Figures
// Career origin years: every "N years" on the site is derived from these, so
// the pages are accurate at every generation.
export const proSince = 2007;
export const freelanceSince = 2013;

// Declared here rather than with the other meta strings above: they interpolate
// `freelanceSince`, which is defined just above.
export const metaDescription = `CV of ${fullName} (${nickname}), ${jobTitle} - Web & Mobile, freelance since ${freelanceSince}. React & React Native expert, available now.`;

export const metaSubject = `${jobTitle} - Web & Mobile. Freelance since ${freelanceSince}. React & React Native.`;

/**
 * Figures that can't be computed at build time (the static build makes no
 * authenticated GitHub / npm call). Baseline 2026-07-30 - refresh them with the
 * commands in STATS.md (§4 downloads, §5 GitHub).
 */
export const githubStars = 12338;
/** Owned, non-fork repos the stars are spread across (STATS.md §5). */
export const githubRepos = 89;
export const githubFollowers = 1269;
export const githubSince = 2009;
export const ossDownloadsPerMonth = "200M+";

/** 12338 → "12.3K" · 1269 → "1.3K". */
export const compactCount = (n: number) =>
  n < 1000 ? `${n}` : `${(n / 1000).toFixed(1).replace(/\.0$/, "")}K`;

/** Round down to the nearest `step`, then "+" - so a figure never overstates. */
export const roundedDownCount = (n: number, step = 5) => `${Math.floor(n / step) * step}+`;

/**
 * Stat labels are authored in sentence case and joined lowercase into a running
 * line ("900M+ trips / year"), but acronyms must survive it - "1 day → 1 click
 * qa & release" reads like a typo.
 */
export const lowerKeepingAcronyms = (label: string) =>
  label
    .split(" ")
    .map((w) => (/^[A-Z0-9/&]{2,}$/.test(w) ? w : w.toLowerCase()))
    .join(" ");

/** "900M+ trips / year · 4M+ people served" - an entry's own frontmatter stats. */
export const statsLine = (stats: ResumeStat[] | undefined, max = 4) =>
  (stats ?? [])
    .slice(0, max)
    .map((s) => `${s.stat} ${lowerKeepingAcronyms(s.label)}`)
    .join(" · ");

/** A profile stat; `highlight` marks the one rendered as a filled/gradient tile. */
export type ProfileStat = ResumeStat & { highlight?: boolean };

/**
 * Global career stats ("player-card" tiles), computed from the résumé data where
 * possible so they stay fresh. Manual figures come from STATS.md.
 */
export function profileStats(items: ResumeItem[]): ProfileStat[] {
  const yearsPro = new Date().getFullYear() - proSince;
  // Missions since going freelance - same definition as STATS.md §2 (each
  // teaching year is its own contract, so those count too; OSS side projects
  // and my own education don't).
  const projects = items.filter(
    (i) => i.dateStart && i.dateStart >= `${freelanceSince}-01-01` && !i.openSource && !i.education,
  );
  const clients = new Set(projects.map((i) => i.company).filter(Boolean));
  return [
    { stat: `${yearsPro}`, label: "Years", comment: `pro since ${proSince}` },
    {
      stat: roundedDownCount(projects.length),
      label: "Projects",
      comment: `freelance since ${freelanceSince}`,
    },
    {
      stat: roundedDownCount(clients.size),
      label: "Clients",
      comment: "companies served",
    },
    {
      stat: ossDownloadsPerMonth,
      label: "Downloads / month",
      // Names what earns the figure right where the figure is - "open source I
      // created" was a claim, "the PostCSS plugins I created" is checkable.
      comment: "on OSS packages I created",
      url: socials.npm.value,
      highlight: true,
    },
    {
      stat: compactCount(githubStars),
      label: "GitHub stars",
      // The repo count makes the total reconcilable: without it, a reader adds
      // up the four cards on page 2 and wonders where the rest comes from.
      comment: `across ${githubRepos} repos I own`,
      url: socials.github.value,
    },
  ];
}

/** "2014 – 2017". */
export const yearRange = (item: ResumeItem) => {
  const start = item.dateStart ? new Date(item.dateStart).getFullYear() : undefined;
  const end = item.wip ? "now" : item.dateEnd ? new Date(item.dateEnd).getFullYear() : "now";
  if (!start) return `${end}`;
  return `${start}` === `${end}` ? `${start}` : `${start} – ${end}`;
};

const monthNames = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

export const monthYear = (iso: string) => {
  const d = new Date(iso);
  return `${monthNames[d.getMonth()]} ${d.getFullYear()}`;
};

/** Past this, months are noise: "2017 – 2023" beats "Mar 2017 – Oct 2023". */
const monthPrecisionMaxYears = 3;

/**
 * "Sep 2025 – Apr 2026" on recent, short engagements - "2025 – 2026" reads as
 * "finished in January" and silently ages the whole CV. Long spans fall back to
 * years, where the month carries no information and just adds weight.
 */
export const monthRange = (item: ResumeItem) => {
  if (!item.dateStart) return yearRange(item);
  const end = item.wip ? undefined : item.dateEnd;
  const years =
    (new Date(end ?? new Date()).getTime() - new Date(item.dateStart).getTime()) /
    (365.25 * 24 * 3600 * 1000);
  if (years > monthPrecisionMaxYears) return yearRange(item);
  const startLabel = monthYear(item.dateStart);
  const endLabel = end ? monthYear(end) : "now";
  // Same month on both ends ("Jul 2026 – Jul 2026", fklg): one label is
  // enough - same collapse yearRange does for identical years.
  return startLabel === endLabel ? startLabel : `${startLabel} – ${endLabel}`;
};

/**
 * One row per client: the group's earliest start and latest end, with the
 * copy, icon and stats of the entry flagged `highlight`. Missions stay separate
 * files; only the condensed views fold them.
 */
export const mergeGroup = (lead: ResumeItem, members: ResumeItem[]): ResumeItem => {
  // ISO dates sort lexicographically.
  const asc = (a: string, b: string) => (a < b ? -1 : a > b ? 1 : 0);
  const isSet = (d: string | undefined): d is string => Boolean(d);
  const starts = members
    .map((m) => m.dateStart)
    .filter(isSet)
    .sort(asc);
  const ends = members
    .map((m) => m.dateEnd)
    .filter(isSet)
    .sort(asc);
  return {
    ...lead,
    dateStart: starts[0] ?? lead.dateStart,
    dateEnd: ends[ends.length - 1] ?? lead.dateEnd,
    wip: members.some((m) => m.wip),
  };
};

/**
 * Under a year between two missions for the same client is an ordinary contract
 * break (a summer, a renewal) and reads as one continuous stint. A year or more
 * is a real interruption: hiding it makes the dates contradict a pitch that
 * says "called back a year later", which is the first thing an interviewer
 * picks at.
 */
const contiguousGapMonths = 11;

type Stint = { start: string; end: string };

/** "2017 – 2018 · 2019 – 2023" - the group's actual stints, gaps included. */
export const groupPeriods = (members: ResumeItem[]): string[] => {
  const ranges: Stint[] = members
    .filter((m): m is ResumeItem & { dateStart: string } => Boolean(m.dateStart))
    .map((m) => ({ start: m.dateStart, end: m.dateEnd ?? m.dateStart }))
    .sort((a, b) => (a.start < b.start ? -1 : 1));
  const months = (from: string, to: string) =>
    (new Date(to).getTime() - new Date(from).getTime()) / (30.44 * 24 * 3600 * 1000);
  const stints: Stint[] = [];
  for (const r of ranges) {
    const last = stints.at(-1);
    if (last && months(last.end, r.start) < contiguousGapMonths) {
      if (r.end > last.end) last.end = r.end;
    } else {
      stints.push({ ...r });
    }
  }
  const year = (d: string) => new Date(d).getFullYear();
  return stints.map((s) =>
    year(s.start) === year(s.end) ? `${year(s.start)}` : `${year(s.start)} – ${year(s.end)}`,
  );
};

/** Entries with no `group` are their own group. */
export const groupKey = (item: ResumeItem) => item.group ?? item.slug;

/**
 * The paragraph a condensed view shows for an entry: the group-wide pitch
 * when the entry carries one (highlight of a `group`), else its own `pitch`.
 * Callers append their own last-resort fallback (`?? description` on the CV).
 */
export const pitchOf = (item: ResumeItem) => item.groupPitch ?? item.pitch;

/**
 * The one-liner a condensed view shows for an entry: the group-wide
 * `groupTitle` when the entry carries one (highlight of a `group`), else its
 * own `title`. Timeline and modal keep per-mission titles on purpose.
 */
export const titleOf = (item: ResumeItem) => item.groupTitle ?? item.title;

/**
 * The key-experience rows: one row per client - `highlight` entries with
 * their whole group folded in (dates derived, never hand-written), newest
 * first. Same derivation on `/cv` and `/resume`.
 */
export const keyExperiences = (items: ResumeItem[]): ResumeItem[] =>
  items
    .filter((i) => i.highlight)
    .map((i) =>
      mergeGroup(
        i,
        items.filter((o) => groupKey(o) === groupKey(i)),
      ),
    )
    .sort((a, b) => ((b.dateEnd || "9999") < (a.dateEnd || "9999") ? -1 : 1));

/** The project name of an open-source entry, e.g. `resume/2014-cssnext` → `cssnext`. */
export const projectName = (item: ResumeItem) =>
  item.slug.replace(/^resume\//, "").replace(/^\d{4}-/, "");

/** The detail page of an entry: the slug is already `resume/<name>`. */
export const resumeEntryPath = (item: ResumeItem) => `/${item.slug}`;

/** Shared view-transition name, so the detail "zooms" out of its card. */
export const resumeEntryTransitionName = (item: ResumeItem) =>
  `resume-entry--${item.slug.split("/").pop()}`;

// Resume bodies are bilingual: English, then an `<hr>`, then French. The site
// is English-only for now, so keep only the part before the hr (proper
// `body.en` / `body.fr` parsing comes with the i18n pass, see WEB-REWORK.md).
//
export const bodyBeforeFirstHr = (body: any): any => {
  if (!body || !Array.isArray(body.children)) return body;
  const hrIndex = body.children.findIndex(
    //
    (child: any) => child != null && typeof child === "object" && child.tag === "hr",
  );
  return hrIndex === -1 ? body : { ...body, children: body.children.slice(0, hrIndex) };
};

/** OSS credentials with no résumé entry of their own. */
export const openSourceCredits = [
  {
    label: "PostCSS",
    note: "org creator, 500+ commits",
    url: "https://github.com/search?q=org%3Apostcss+author%3Amoox&type=commits",
  },
  {
    label: "react-native",
    note: "core contributions",
    url: "https://github.com/search?q=repo%3Afacebook%2Freact-native+author%3Amoox&type=commits",
  },
];

/** Where the quotes come from - makes them checkable, which is the whole point. */
export const recommendationsUrl =
  "https://www.linkedin.com/in/maxthirouin/details/recommendations/";

/**
 * `schema.org/Person`, built from the same values the pages render. A crawler,
 * a search engine or an LLM reads this instead of guessing which string in a
 * two-column layout is the name, the title or an employer - and
 * `alternateName` settles the "Max. / Maxime Thirouin" ambiguity without
 * touching the design.
 *
 * HTML only: a PDF has no equivalent, its structured channel is the `/Info`
 * dictionary that the export script fills.
 */
export const personJsonLd = (items: ResumeItem[]) => ({
  "@context": "https://schema.org",
  "@type": "Person",
  name: fullName,
  alternateName: nickname,
  jobTitle: jobTitle,
  description: summary,
  url: website,
  email: `mailto:${sendStringAsMailString(socials.send.value)}`,
  telephone: `+${ind}${socials.call.value}`,
  address: {
    "@type": "PostalAddress",
    addressLocality: "Toulouse",
    addressCountry: "FR",
  },
  sameAs: [
    socials.github.value,
    socials.linkedin.value,
    socials.npm.value,
    socials.bsky.value,
    socials.x.value,
  ],
  knowsLanguage: languages.map((l) => l.label),
  knowsAbout: [...metaKeywords, ...skillsDomains.flatMap((d) => d.items)],
  // One entry per client, deduplicated by `group` exactly like the rendered
  // rows - so the structured data never lists a mission the page folded away.
  worksFor: [
    ...new Map(
      items
        .filter((i) => i.company && !i.openSource && !i.education && !i.personal)
        .map((i) => [
          groupKey(i),
          {
            "@type": "Organization" as const,
            name: i.company,
            ...(i.url ? { url: i.url } : {}),
          },
        ]),
    ).values(),
  ],
});

/** Talks worth naming; titles & conferences are resolved from talks.json. */
export const selectedTalksSlugs = [
  "talks/a-static-website-with-react-really", // dotJS 2016
  "talks/back-to-the-css", // dotCSS 2014
  "talks/post-css-era-codeurenseine", // Codeurs en Seine 2016
  "talks/you-might-not-need-redux", // React Toulouse
];
