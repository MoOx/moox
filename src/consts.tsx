import type { ResumeItem, ResumeStat } from "@/api";
import type { CvSkillCardIcon } from "@/components/CvSkillCard";
import SVGAppStoreNpm from "@/svgs/components/SVGAppStoreNpm";
import SVGClaude from "@/svgs/components/SVGClaude";
import SVGExpo from "@/svgs/components/SVGExpo";
import SVGLine3Horizontal from "@/svgs/components/SVGLine3Horizontal";
import SVGMenuBlog from "@/svgs/components/SVGMenuBlog";
import SVGMenuContact from "@/svgs/components/SVGMenuContact";
import SVGMenuContactFill from "@/svgs/components/SVGMenuContactFill";
import SVGMenuHome from "@/svgs/components/SVGMenuHome";
import SVGMenuHomeFill from "@/svgs/components/SVGMenuHomeFill";
import SVGMenuResume from "@/svgs/components/SVGMenuResume";
import SVGMenuResumeFill from "@/svgs/components/SVGMenuResumeFill";
import SVGMenuTalk from "@/svgs/components/SVGMenuTalk";
import SVGPutaindecode from "@/svgs/components/SVGPutaindecode";
import SVGSocialBsky from "@/svgs/components/SVGSocialBsky";
import SVGSocialDribbble from "@/svgs/components/SVGSocialDribbble";
import SVGSocialGithub from "@/svgs/components/SVGSocialGithub";
import SVGSocialLinkedin from "@/svgs/components/SVGSocialLinkedin";
import SVGSocialX from "@/svgs/components/SVGSocialX";
import SVGSquareStack3dUpFill from "@/svgs/components/SVGSquareStack3dUpFill";
import SVGTypescript from "@/svgs/components/SVGTypescript";
import { ReactNode } from "react";
import { StyleProp, ViewStyle } from "react-native";

export const website = "https://moox.io";

export const footerAnchor = "links";

export const visualUrl = (url: string) => {
  return url.replace(/^(?:https?:\/\/(www\.)?)/i, "");
};
export const sendStringAsMailString = (
  send: string,
  visual: boolean = false,
) => {
  return visual ? send.replace("/", " @ ") : send.replace("/", "@");
};

export const ind = "33";
export const socials = {
  vcf: {
    value: "MaximeThirouin.vcf",
    color: "#f0506e",
    colorAlt: "#b00d2b",
  },
  text: {
    value: "678135439",
    // iMessage blue color
    color: "#007AFF",
    // iMessage green color
    colorAlt: "#1bb140",
  },
  call: {
    value: "678135439",
    // Message icon colors
    color: "#63d352",
    colorAlt: "#3a7a2e",
  },
  send: {
    value: "hello/moox.io",
    // Mail app icon colors
    color: "#3770EB",
    colorAlt: "#5DC5F8",
  },
  github: {
    value: "https://github.com/MoOx",
    color: "#8839A9",
    colorAlt: "#552E87",
  },
  linkedin: {
    value: "https://www.linkedin.com/in/MaxThirouin",
    color: "#0a66c2",
    colorAlt: "#25437C",
  },
  x: {
    value: "https://x.com/MoOx",
    color: "#666",
    colorAlt: "#000",
  },
  bsky: {
    value: "https://bsky.app/profile/moox.io",
    color: "#367BF5",
    colorAlt: "#6EB2F6",
  },
  dribbble: {
    value: "https://dribbble.com/MoOx",
    color: "#ea4c89",
    colorAlt: "#ec5e95",
  },
  npm: {
    value: "https://www.npmjs.com/~moox",
    color: "#f7df1e",
    colorAlt: "#73670d",
  },
  youtube: {
    value: "https://www.youtube.com/channel/UCn_edMm2hg7k58E4eQGU7pA",
    color: "#ff0033",
    colorAlt: "#fff",
  },
  putaindecode: {
    value: "https://putaindecode.io",
    color: "#E51D58",
    colorAlt: "#CC0613",
  },
};

type LinkWithIcon = {
  href: string;
  alt?: string;
  icon: (props: LinksIconProps) => ReactNode;
  isActive?: (currentLink: string | null, link: string) => boolean;
};
type LinksWithIcon = {
  [key: string]: LinkWithIcon;
};
type LinksIconProps = {
  size: number;
  color: string;
  active?: boolean;
  style?: StyleProp<ViewStyle>;
};
export const internalLinks: LinksWithIcon = {
  Home: {
    href: "/",
    icon: ({ style, size, color, active = true }: LinksIconProps) =>
      active ? (
        <SVGMenuHomeFill
          style={style}
          width={size}
          height={size}
          fill={color}
        />
      ) : (
        <SVGMenuHome style={style} width={size} height={size} fill={color} />
      ),
    isActive: (currentLink: string | null, link: string) =>
      currentLink === link,
  },
  Resume: {
    href: "/resume",
    icon: ({ style, size, color, active = true }: LinksIconProps) =>
      active ? (
        <SVGMenuResumeFill
          style={style}
          width={size}
          height={size}
          fill={color}
        />
      ) : (
        <SVGMenuResume style={style} width={size} height={size} fill={color} />
      ),
    isActive: (currentLink: string | null, link: string) =>
      currentLink === link,
  },
  Contact: {
    href: "/contact",
    icon: ({ style, size, color, active = true }: LinksIconProps) =>
      active ? (
        <SVGMenuContactFill
          style={style}
          width={size}
          height={size}
          fill={color}
        />
      ) : (
        <SVGMenuContact style={style} width={size} height={size} fill={color} />
      ),
    isActive: (currentLink: string | null, link: string) =>
      currentLink === link,
  },
  More: {
    href: "#" + footerAnchor,
    icon: ({ style, size, color }: LinksIconProps) => (
      <SVGLine3Horizontal
        style={style}
        width={size}
        height={size}
        fill={color}
      />
    ),
    isActive: (currentLink: string | null, link: string) =>
      currentLink === link,
  },
};

export const internalLinks2: LinksWithIcon = {
  Blog: {
    href: "/blog",
    icon: ({ style, size, color }: LinksIconProps) => (
      <SVGMenuBlog style={style} width={size} height={size} fill={color} />
    ),
  },
  Talks: {
    href: "/talks",
    icon: ({ style, size, color }: LinksIconProps) => (
      <SVGMenuTalk style={style} fill={color} width={size} height={size} />
    ),
    alt: "",
  },
};

export const allInternalLinks = { ...internalLinks, ...internalLinks2 };

export const socialLinks: LinksWithIcon = {
  LinkedIn: {
    alt: "@Max on LinkedIn",
    href: socials.linkedin.value,
    icon: ({ style, size, color }: LinksIconProps) => (
      <SVGSocialLinkedin
        style={style}
        fill={color}
        width={size}
        height={size}
      />
    ),
  },
  GitHub: {
    alt: "@MoOx on GitHub",
    href: socials.github.value,
    icon: ({ style, size, color }: LinksIconProps) => (
      <SVGSocialGithub style={style} fill={color} width={size} height={size} />
    ),
  },
  BlueSky: {
    alt: "@moox.io on bsky.app",
    href: socials.bsky.value,
    icon: ({ style, size, color }: LinksIconProps) => (
      <SVGSocialBsky style={style} fill={color} width={size} height={size} />
    ),
  },
  X: {
    alt: "@MoOx on X",
    href: socials.x.value,
    icon: ({ style, size, color }: LinksIconProps) => (
      <SVGSocialX style={style} fill={color} width={size} height={size} />
    ),
  },
};
export const socialLinks2 = {
  Dribbble: {
    alt: "@MoOx on Dribbble",
    href: socials.dribbble.value,
    icon: ({ style, size, color }: LinksIconProps) => (
      <SVGSocialDribbble
        style={style}
        fill={color}
        width={size}
        height={size}
      />
    ),
  },
  /*
  "Youtube": {
    alt: "@MoOx on Youtube",
    href: socials.youtube.value,
    icon: ({ style, size, color }: LinksIconProps) =>
      <SVGSocialYoutube style={style} fill={color} width={size} height={size} />,
  },
 */
};

export const moreLinks: LinksWithIcon = {
  npm: {
    alt: "@MoOx on npm",
    href: socials.npm.value,
    icon: ({ style, size, color }: LinksIconProps) => (
      <SVGAppStoreNpm style={style} fill={color} width={size} height={size} />
    ),
  },
};
export const moreLinks2: LinksWithIcon = {
  "putaindecode!": {
    href: socials.putaindecode.value,
    icon: ({ style, size, color }: LinksIconProps) => (
      <SVGPutaindecode style={style} fill={color} width={size} height={size} />
    ),
  },
};

export const menuBarLinks: LinksWithIcon = {
  ...internalLinks,
  // LinkedIn: {
  //   alt: "@Maxime on LinkedIn",
  //   href: socials.linkedin.value,
  //   icon: ({ style, size, color }: LinksIconProps) => (
  //     <SVGContact style={style} fill={color} width={size} height={size} />
  //   ),
  // },
};

// ---------------------------------------------------------------- CV / Résumé
// Static content for the exportable CV (`/cv`). Key experiences, education and
// open-source entries come from the resume markdown frontmatter
// (`highlight` / `education` / `openSource` flags) - only the editorial copy and
// the figures that can't be computed at build time live here.

// Setup then punchline. The previous version ended on "- the ultimate
// sophistication", the attribute of Da Vinci's "Simplicity is the ultimate
// sophistication" with its subject missing: the reader got the punchline
// without the joke, in the only borrowed voice on the page. Same idea, own
// words. The second sentence repeats `Simple` instead of pronominalizing it
// ("That's the hard part") - nothing for a pronoun to point at, so the line
// survives translation to French word for word: "Je rends les front-ends
// simples. Le simple, c'est le plus dur."
export const cvTagline = "I make front-ends simple. Simple is the hard part.";

// Scope, not headcount. "I'm a one-person front-end team" said the right thing
// with the wrong word: it excludes the team, three lines under a `Lead` title
// and next to a "Mentoring & technical direction" card - readers split on
// whether it meant "very productive" or "works alone". And leading with the
// speed AI buys is an invitation to negotiate the rate down, so AI appears here
// as what makes the pace safe, not as what makes it cheap.
export const cvSummary =
  "Almost two decades turning tangled front-ends into systems teams can actually maintain: simpler architecture, less overhead, and devs who level up along the way. Today I own the whole front-end, from architecture to release - strict types, end-to-end (E2E) tests and CI keep it safe at that pace.";

/** Where I work from - recruiters and job boards filter on it. */
export const cvLocation = "Toulouse, France · Remote";

/**
 * The headline: what a client searches for. It mirrors the job titles of the
 * last missions below, so the claim is a summary of the CV, not a promotion.
 */
export const cvJobTitle = "Lead Front-End Developer";

/**
 * Carries the platform reach the title deliberately leaves out - and does it
 * with the terms clients actually search for ("React Native" beats "mobile").
 */
export const cvJobSubtitle = "React, React Native & cross-platform.";

/**
 * Availability, shown next to the pulsing badge. "Available now" on purpose: a
 * month would read as "not available before then". Staleness of a circulating
 * PDF is handled by `cvUpdatedOn` in the footer, which dates the whole
 * document instead of just this line.
 */
export const cvAvailabilityLabel = "Available now";
export const cvAvailabilityDetail = "full time or 3 days/week";

/** "Updated August 2026" - stamped at generation, so it is never stale. */
export const cvUpdatedOn = () =>
  `Updated ${new Date().toLocaleDateString("en-US", {
    month: "long",
    year: "numeric",
  })}`;

export const cvLanguages = [
  { flag: "🇫🇷", label: "French", level: "Native" },
  { flag: "🇬🇧", label: "English", level: "Fluent" },
];

/** Legal name, and the one everybody actually uses. */
export const cvFullName = "Maxime Thirouin";
export const cvNickname = "Max";

/**
 * Article count on putaindecode.io, which `blog.json` cannot see - it only
 * indexes moox.io. Source: https://putaindecode.io/articles?search=moox
 */
export const cvPutaindecodeArticles = 22;

/**
 * The document's own metadata, authored once here and consumed three times:
 * the HTML `<head>`, the JSON-LD block, and the generated PDF's `/Info`
 * dictionary (the export script reads them back off the rendered page, so a
 * plain Node script needs no import of this TSX module).
 */
export const cvMetaKeywords = [
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

export const cvMetaTitle = `${cvFullName} (${cvNickname}) - CV / Résumé - ${cvJobTitle}, Web & Mobile`;

export type CvSkillDomain = {
  title: string;
  /** Lead-in line, only read on the feature card. */
  subtitle?: string;
  items: string[];
  /** The hero card of the mosaic: bigger, items on their own lines. */
  feature?: boolean;
  /**
   * Watermark behind the card. Kept on the domain rather than in a title-keyed
   * lookup in `cv.tsx`: that lookup dropped the icon silently the moment a
   * title was reworded, which is exactly the kind of drift this file exists to
   * prevent. At `opacity: 0.09` and 150px only solid glyphs read - thin,
   * line-art symbols vanish.
   */
  Icon?: CvSkillCardIcon;
  /** [from, to] - dark brand colors, angled like the site's cards. */
  gradient: [string, string];
};

export const cvSkillsDomains: CvSkillDomain[] = [
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
    // Not the React logo: this card claims modernization, design systems,
    // performance, release automation and mentoring, and a framework mark
    // relabels all of it "React" - which is also the fourth React mark in this
    // block already (watermark, the Cross-platform items, and two logos in the
    // row below). A composition glyph says "structure" without naming a stack.
    Icon: SVGSquareStack3dUpFill as CvSkillCardIcon,
    gradient: ["#0D0837", "#4421A7"],
  },
  {
    title: "Languages & Tooling",
    items: [
      "TypeScript · JavaScript · Node.js",
      "HTML / CSS · REST · GraphQL",
      "Playwright · Detox · Storybook",
      "CI/CD · Jenkins · Fastlane",
    ],
    Icon: SVGTypescript as CvSkillCardIcon,
    gradient: ["#0D0837", "#3178C6"],
  },
  {
    title: "Cross-platform",
    items: ["React", "React Native", "Expo", "Web · iOS · Android"],
    Icon: SVGExpo as CvSkillCardIcon,
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
    Icon: SVGClaude as CvSkillCardIcon,
    gradient: ["#0D0837", "#8C2C7B"],
  },
];

// Names the packages behind the "200M+ downloads / month" tile: without them the
// headline figure is a number nobody can reconcile with the cards below it.
export const cvOpenSourceIntro =
  "Contributing to open source since the early days. The PostCSS plugins I created - postcss-calc, postcss-custom-properties, postcss-color-hex-alpha & co - are downloaded 200M+ times a month. GitHub Arctic Code Vault Contributor.";

// ---------------------------------------------------------------- CV / figures
// Career origin years: every "N years" on the CV is derived from these, so the
// document is accurate at every generation.
export const cvProSince = 2007;
export const cvFreelanceSince = 2013;

// Declared here rather than with the other meta strings above: they interpolate
// `cvFreelanceSince`, which is defined just above.
export const cvMetaDescription = `CV of ${cvFullName} (${cvNickname}), ${cvJobTitle} - Web & Mobile, freelance since ${cvFreelanceSince}. React & React Native expert, available now.`;

export const cvMetaSubject = `${cvJobTitle} - Web & Mobile. Freelance since ${cvFreelanceSince}. React & React Native.`;

/**
 * Figures that can't be computed at build time (the static build makes no
 * authenticated GitHub / npm call). Baseline 2026-07-30 - refresh them with the
 * commands in STATS.md (§4 downloads, §5 GitHub).
 */
export const cvGithubStars = 12338;
/** Owned, non-fork repos the stars are spread across (STATS.md §5). */
export const cvGithubRepos = 89;
export const cvGithubFollowers = 1269;
export const cvGithubSince = 2009;
export const cvOssDownloadsPerMonth = "200M+";

/** 12338 → "12.3K" · 1269 → "1.3K". */
export const compactCount = (n: number) =>
  n < 1000 ? `${n}` : `${(n / 1000).toFixed(1).replace(/\.0$/, "")}K`;

/** Round down to the nearest `step`, then "+" - so a figure never overstates. */
export const roundedDownCount = (n: number, step = 5) =>
  `${Math.floor(n / step) * step}+`;

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

/** A CV stat; `highlight` marks the one rendered as a filled/gradient tile. */
export type CvStat = ResumeStat & { highlight?: boolean };

/**
 * Global career stats ("player-card" tiles), computed from the résumé data where
 * possible so they stay fresh. Manual figures come from STATS.md.
 */
export function cvProfileStats(items: ResumeItem[]): CvStat[] {
  const yearsPro = new Date().getFullYear() - cvProSince;
  // Missions since going freelance - same definition as STATS.md §2 (each
  // teaching year is its own contract, so those count too; OSS side projects
  // and my own education don't).
  const projects = items.filter(
    (i) =>
      i.dateStart &&
      i.dateStart >= `${cvFreelanceSince}-01-01` &&
      !i.openSource &&
      !i.education,
  );
  const clients = new Set(projects.map((i) => i.company).filter(Boolean));
  return [
    { stat: `${yearsPro}`, label: "Years", comment: `pro since ${cvProSince}` },
    {
      stat: roundedDownCount(projects.length),
      label: "Projects",
      comment: `freelance since ${cvFreelanceSince}`,
    },
    {
      stat: roundedDownCount(clients.size),
      label: "Clients",
      comment: "companies served",
    },
    {
      stat: cvOssDownloadsPerMonth,
      label: "Downloads / month",
      // Names what earns the figure right where the figure is - "open source I
      // created" was a claim, "the PostCSS plugins I created" is checkable.
      comment: "on OSS packages I created",
      url: socials.npm.value,
      highlight: true,
    },
    {
      stat: compactCount(cvGithubStars),
      label: "GitHub stars",
      // The repo count makes the total reconcilable: without it, a reader adds
      // up the four cards on page 2 and wonders where the rest comes from.
      comment: `across ${cvGithubRepos} repos I own`,
      url: socials.github.value,
    },
  ];
}

/** "2014 – 2017". */
export const cvYearRange = (item: ResumeItem) => {
  const start = item.dateStart
    ? new Date(item.dateStart).getFullYear()
    : undefined;
  const end = item.wip
    ? "now"
    : item.dateEnd
      ? new Date(item.dateEnd).getFullYear()
      : "now";
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

const monthYear = (iso: string) => {
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
export const cvMonthRange = (item: ResumeItem) => {
  if (!item.dateStart) return cvYearRange(item);
  const end = item.wip ? undefined : item.dateEnd;
  const years =
    (new Date(end ?? new Date()).getTime() -
      new Date(item.dateStart).getTime()) /
    (365.25 * 24 * 3600 * 1000);
  if (years > monthPrecisionMaxYears) return cvYearRange(item);
  return `${monthYear(item.dateStart)} – ${end ? monthYear(end) : "now"}`;
};

/**
 * One CV row per client: the group's earliest start and latest end, with the
 * copy, icon and stats of the entry flagged `highlight`. Missions stay separate
 * files; only the CV folds them.
 */
export const cvMergeGroup = (
  lead: ResumeItem,
  members: ResumeItem[],
): ResumeItem => {
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
export const cvGroupPeriods = (members: ResumeItem[]): string[] => {
  const ranges: Stint[] = members
    .filter((m): m is ResumeItem & { dateStart: string } =>
      Boolean(m.dateStart),
    )
    .map((m) => ({ start: m.dateStart, end: m.dateEnd ?? m.dateStart }))
    .sort((a, b) => (a.start < b.start ? -1 : 1));
  const months = (from: string, to: string) =>
    (new Date(to).getTime() - new Date(from).getTime()) /
    (30.44 * 24 * 3600 * 1000);
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
    year(s.start) === year(s.end)
      ? `${year(s.start)}`
      : `${year(s.start)} – ${year(s.end)}`,
  );
};

/** Entries with no `cvGroup` are their own group. */
export const cvGroupKey = (item: ResumeItem) => item.cvGroup ?? item.slug;

/** The project name of an open-source entry, e.g. `resume/2014-cssnext` → `cssnext`. */
export const cvProjectName = (item: ResumeItem) =>
  item.slug.replace(/^resume\//, "").replace(/^\d{4}-/, "");

/** OSS credentials with no résumé entry of their own. */
export const cvOpenSourceCredits = [
  {
    label: "PostCSS",
    note: "org creator · 500+ commits",
    url: "https://github.com/search?q=org%3Apostcss+author%3Amoox&type=commits",
  },
  {
    label: "react-native",
    note: "core contributions",
    url: "https://github.com/search?q=repo%3Afacebook%2Freact-native+author%3Amoox&type=commits",
  },
];

/** Where the quotes come from - makes them checkable, which is the whole point. */
export const cvRecommendationsUrl =
  "https://www.linkedin.com/in/maxthirouin/details/recommendations/";

/**
 * `schema.org/Person` for the CV page, built from the same values the page
 * renders. A crawler, a search engine or an LLM reads this instead of guessing
 * which string in a two-column layout is the name, the title or an employer -
 * and `alternateName` settles the "Max. / Maxime Thirouin" ambiguity without
 * touching the design.
 *
 * HTML only: a PDF has no equivalent, its structured channel is the `/Info`
 * dictionary that the export script fills.
 */
export const cvJsonLd = (items: ResumeItem[]) => ({
  "@context": "https://schema.org",
  "@type": "Person",
  name: cvFullName,
  alternateName: cvNickname,
  jobTitle: cvJobTitle,
  description: cvSummary,
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
  knowsLanguage: cvLanguages.map((l) => l.label),
  knowsAbout: [...cvMetaKeywords, ...cvSkillsDomains.flatMap((d) => d.items)],
  // One entry per client, deduplicated by `cvGroup` exactly like the rendered
  // rows - so the structured data never lists a mission the page folded away.
  worksFor: [
    ...new Map(
      items
        .filter(
          (i) => i.company && !i.openSource && !i.education && !i.personal,
        )
        .map((i) => [
          cvGroupKey(i),
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
export const cvTalksSelectedSlugs = [
  "talks/a-static-website-with-react-really", // dotJS 2016
  "talks/back-to-the-css", // dotCSS 2014
  "talks/post-css-era-codeurenseine", // Codeurs en Seine 2016
  "talks/you-might-not-need-redux", // React Toulouse
];
