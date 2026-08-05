import type { ResumeItem, ResumeStat } from "@/api";
import IconReact from "@/components/IconReact";
import IconReactNative from "@/components/IconReactNative";
import type { SkillCardIcon } from "@/components/SkillCard";
import { ind, sendStringAsMailString, socials, website } from "@/consts";
import { defaultLang, l, Lang, Localized } from "@/i18n";
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
export const taglineParts: Localized<readonly string[]> = {
  en: ["I make front-ends simple.", "Simple is the hard part."],
  fr: ["Je rends les front-ends simples.", "Le simple, c'est le plus dur."],
};
export const tagline: Localized<string> = {
  en: l(taglineParts, "en").join(" "),
  fr: l(taglineParts, "fr").join(" "),
};

// Scope, not headcount. "I'm a one-person front-end team" said the right thing
// with the wrong word: it excludes the team, three lines under a `Lead` title
// and next to a "Mentoring & technical direction" card - readers split on
// whether it meant "very productive" or "works alone". And leading with the
// speed AI buys is an invitation to negotiate the rate down, so AI appears here
// as what makes the pace safe, not as what makes it cheap.
export const summary: Localized<string> = {
  en: "Almost two decades turning tangled front-ends into systems teams can actually maintain: simpler architecture, less overhead, and devs who level up along the way. Today I own the whole front-end, from architecture to release - strict types, end-to-end (E2E) tests and CI keep it safe at that pace.",
  fr: "Presque deux décennies passées à transformer des front-ends emmêlés en systèmes qu'une équipe peut réellement maintenir : architecture plus simple, moins de frictions, et des devs qui montent en compétence en chemin. Aujourd'hui je prends en charge tout le front-end, de l'architecture à la mise en production - types stricts, tests end-to-end (E2E) et intégration continue sécurisent ce rythme.",
};

/**
 * Where I work from - recruiters and job boards filter on it.
 * Not named `location`: importing that would shadow `window.location`.
 */
export const workLocation: Localized<string> = {
  en: "Toulouse, France · Remote",
  fr: "Toulouse, France · Télétravail",
};

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
export const jobSubtitle: Localized<string> = {
  en: "React, React Native & cross-platform.",
  fr: "React, React Native & multiplateforme.",
};

/**
 * Availability, shown next to the pulsing badge. "Available now" on purpose: a
 * month would read as "not available before then". Staleness of a circulating
 * PDF is handled by `updatedOn` in the CV footer, which dates the whole
 * document instead of just this line.
 */
export const availabilityLabel: Localized<string> = {
  en: "Available now",
  fr: "Disponible maintenant",
};
export const availabilityDetail: Localized<string> = {
  en: "full time or less",
  fr: "temps plein ou partiel",
};

/** "Updated August 2026" - stamped at generation, so it is never stale. */
export const updatedOn = (lang: Lang = defaultLang) => {
  const date = new Date().toLocaleDateString(lang === "fr" ? "fr-FR" : "en-US", {
    month: "long",
    year: "numeric",
  });
  return lang === "fr" ? `Mis à jour en ${date}` : `Updated ${date}`;
};

export const languages: Array<{
  flag: string;
  label: Localized<string>;
  level: Localized<string>;
}> = [
  {
    flag: "🇫🇷",
    label: { en: "French", fr: "Français" },
    level: { en: "Native", fr: "Langue maternelle" },
  },
  { flag: "🇬🇧", label: { en: "English", fr: "Anglais" }, level: { en: "Fluent", fr: "Courant" } },
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
/**
 * Technology names are searched in English in both markets, so they are shared;
 * the descriptive terms are the ones a French recruiter or job board actually
 * types ("télétravail", not "remote"), and the English ones stay in the French
 * list too - half the French job ads for this role are written in English.
 */
const sharedKeywords = ["React", "React Native", "TypeScript", "freelance", "Toulouse"];

export const metaKeywords = (lang: Lang = defaultLang) =>
  lang === "fr"
    ? [
        ...sharedKeywords,
        "architecture front-end",
        "développeur front-end",
        "design system",
        "accessibilité",
        "multiplateforme",
        "télétravail",
        "remote",
      ]
    : [
        ...sharedKeywords,
        "front-end architecture",
        "design systems",
        "accessibility",
        "cross-platform",
        "remote",
      ];

export const metaTitle = (lang: Lang = defaultLang) =>
  lang === "fr"
    ? `${fullName} (${nickname}) - CV - ${jobTitle}, web & mobile`
    : `${fullName} (${nickname}) - CV / Résumé - ${jobTitle}, Web & Mobile`;

export type SkillDomain = {
  title: Localized<string>;
  /** Lead-in line, only read on the feature card. */
  subtitle?: Localized<string>;
  items: Localized<string[]>;
  /**
   * One-sentence teaser for the home cards - the "why call him" of the domain
   * in prose, where `items` carry the detail on `/resume` and `/cv`.
   */
  blurb?: Localized<string>;
  /**
   * The few terms the home teaser shows under the blurb. A curated field, not
   * `items.slice(0, n)`: the full items are phrased as engagements
   * ("Modernizing legacy React codebases"), too heavy for a teaser line.
   */
  keywords?: Localized<string[]>;
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
    title: { en: "Front-End Architecture", fr: "Architecture front-end" },
    subtitle: {
      en: "Simpler systems, less overhead, teams that ship.",
      fr: "Des systèmes plus simples, moins de frictions, des équipes qui livrent.",
    },
    feature: true,
    // Phrased as what I get hired for, not as abstract competences: this is the
    // first block a reader hits, and "why call him" is the question it has to
    // answer. The card has the room, so it carries the whole list.
    // No "Cross-platform from a single codebase" line: the card sitting right
    // next to this one is literally titled "Cross-platform" and says it better.
    items: {
      en: [
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
      fr: [
        "Modernisation de bases de code React vieillissantes",
        "Design systems & API de composants",
        "Performance & budgets de rendu",
        "Accessibilité, validée par des personnes en situation de handicap",
        "Automatisation des livraisons & tests end-to-end (E2E)",
        "Maintenabilité à grande échelle",
        "Mentorat & direction technique",
      ],
    },
    blurb: {
      en: "The structure that lets a team ship fast without breaking things - design systems, performance budgets, accessibility and release automation.",
      fr: "La structure qui permet à une équipe d'aller vite sans rien casser - design systems, budgets de performance, accessibilité et livraisons automatisées.",
    },
    keywords: {
      en: ["Design systems", "Performance", "Accessibility"],
      fr: ["Design systems", "Performance", "Accessibilité"],
    },
    Icon: SVGSquareStack3DUpFill as SkillCardIcon,
    gradient: ["#0D0837", "#4421A7"],
  },
  {
    title: { en: "Languages & Tooling", fr: "Langages & outillage" },
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
    blurb: {
      en: "Strict TypeScript end to end, with Playwright, Detox and CI as the safety net - so refactors stay cheap and releases stay boring.",
      fr: "TypeScript strict de bout en bout, avec Playwright, Detox et l'intégration continue comme filet - pour que les refactorisations restent bon marché et les livraisons ennuyeuses.",
    },
    keywords: ["TypeScript", "Playwright", "CI/CD"],
    Icon: SVGTypescript as SkillCardIcon,
    gradient: ["#0D0837", "#3178C6"],
  },
  {
    title: { en: "Web / Native / Cross-platform", fr: "Web / natif / multiplateforme" },
    items: ["React", "React Native", "Expo", "Web", "iOS", "Android", "TanStack", "Next.js"],
    blurb: {
      en: "One React codebase for web, iOS and Android - each platform still feeling like itself.",
      fr: "Une seule base de code React pour le web, iOS et Android - chaque plateforme gardant sa personnalité.",
    },
    keywords: ["React", "React Native", "Expo"],
    Icon: SVGExpo as SkillCardIcon,
    gradient: ["#0D0837", "#087EA4"],
  },
  {
    // Not a tool I "know" - a way of working. The claim is about intent being
    // the bottleneck, not the model, which is what actually separates senior
    // usage from the "AI writes bugs" complaint.
    title: { en: "AI-assisted engineering", fr: "Ingénierie assistée par IA" },
    // Category first, product in parentheses: "Claude Code" is what is searched
    // today and shows this is a practice rather than a buzzword, but the tool
    // will be renamed long before the way of working changes.
    items: {
      en: [
        "AI coding agents (Claude Code), daily",
        "Precise intent in, working code out",
        "Strict types, end-to-end tests & CI as the safety net",
      ],
      fr: [
        "Agents de code IA (Claude Code), au quotidien",
        "Une intention précise en entrée, du code qui marche en sortie",
        "Types stricts, tests end-to-end & CI comme filet de sécurité",
      ],
    },
    blurb: {
      en: "AI coding agents daily: precise intent in, working code out - types, tests and CI keep the pace safe.",
      fr: "Des agents de code IA au quotidien : une intention précise en entrée, du code qui marche en sortie - types, tests et CI sécurisent le rythme.",
    },
    keywords: {
      en: ["Claude Code", "Agents", "Guardrails"],
      fr: ["Claude Code", "Agents", "Garde-fous"],
    },
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
  label: Localized<string>;
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
  { Icon: SVGActivityClimbing, label: { en: "Climbing", fr: "Escalade" }, cv: true },
  { Icon: SVGActivityDj, label: "DJ", cv: true },
  { Icon: SVGActivityBricolage, label: "Bricolage", cv: true },
  { Icon: SVGActivityStandup, label: { en: "Standup", fr: "Stand-up" }, cv: true },
  {
    Icon: SVGActivityPekinExpress,
    label: { en: "Pekin Express\n#20", fr: "Pékin Express\n#20" },
    cv: true,
  },
];

/**
 * Intro to the skills cards on the home - reworked from the old "Front-end
 * Architect" block prose. The tagline/summary pitch lives higher on the page
 * (the indigo band); this block answers the next question: in what shape does
 * the help come.
 */
export const skillsPitchTitle: Localized<string> = {
  en: "Where I can help.",
  fr: "Là où je peux aider.",
};
export const skillsPitch: Localized<string> = {
  en: "Years of shipping web & mobile apps made me confident in the high-level choices - architecture, stack, tooling - and in picking what fits the interface you actually need. Advice, training, or hands-on building: I help you and your team focus on what your users need.",
  fr: "Des années à livrer des applications web et mobiles m'ont donné de l'assurance sur les choix structurants - architecture, stack, outillage - et sur le choix de ce qui convient vraiment à l'interface dont vous avez besoin. Conseil, formation ou développement : j'aide votre équipe à se concentrer sur ce dont vos utilisateurs ont besoin.",
};

// Names the packages behind the "200M+ downloads / month" tile: without them the
// headline figure is a number nobody can reconcile with the cards below it.
export const openSourceIntro: Localized<string> = {
  en: "Contributing to open source since the early days. The PostCSS plugins I created - postcss-calc, postcss-custom-properties, postcss-color-hex-alpha & co - are downloaded 200M+ times a month. GitHub Arctic Code Vault Contributor.",
  fr: "Contributeur open source depuis les débuts. Les plugins PostCSS que j'ai créés - postcss-calc, postcss-custom-properties, postcss-color-hex-alpha & co - sont téléchargés plus de 200 millions de fois par mois. GitHub Arctic Code Vault Contributor.",
};

// -------------------------------------------------------------------- Figures
// Career origin years: every "N years" on the site is derived from these, so
// the pages are accurate at every generation.
export const proSince = 2007;
export const freelanceSince = 2013;

// Declared here rather than with the other meta strings above: they interpolate
// `freelanceSince`, which is defined just above.
export const metaDescription = (lang: Lang = defaultLang) =>
  lang === "fr"
    ? `CV de ${fullName} (${nickname}), ${jobTitle} - web & mobile, freelance depuis ${freelanceSince}. Expert React & React Native, disponible maintenant.`
    : `CV of ${fullName} (${nickname}), ${jobTitle} - Web & Mobile, freelance since ${freelanceSince}. React & React Native expert, available now.`;

export const metaSubject = (lang: Lang = defaultLang) =>
  lang === "fr"
    ? `${jobTitle} - web & mobile. Freelance depuis ${freelanceSince}. React & React Native.`
    : `${jobTitle} - Web & Mobile. Freelance since ${freelanceSince}. React & React Native.`;

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
export function profileStats(items: ResumeItem[], lang: Lang = defaultLang): ProfileStat[] {
  const fr = lang === "fr";
  const yearsPro = new Date().getFullYear() - proSince;
  // Missions since going freelance - same definition as STATS.md §2 (each
  // teaching year is its own contract, so those count too; OSS side projects
  // and my own education don't).
  const projects = items.filter(
    (i) => i.dateStart && i.dateStart >= `${freelanceSince}-01-01` && !i.openSource && !i.education,
  );
  const clients = new Set(projects.map((i) => i.company).filter(Boolean));
  return [
    {
      stat: `${yearsPro}`,
      label: fr ? "Années" : "Years",
      comment: fr ? `en poste depuis ${proSince}` : `pro since ${proSince}`,
    },
    {
      stat: roundedDownCount(projects.length),
      label: fr ? "Projets" : "Projects",
      comment: fr ? `en freelance depuis ${freelanceSince}` : `freelance since ${freelanceSince}`,
    },
    {
      stat: roundedDownCount(clients.size),
      label: fr ? "Clients" : "Clients",
      comment: fr ? "entreprises accompagnées" : "companies served",
    },
    {
      stat: ossDownloadsPerMonth,
      label: fr ? "Téléchargements / mois" : "Downloads / month",
      // Names what earns the figure right where the figure is - "open source I
      // created" was a claim, "the PostCSS plugins I created" is checkable.
      comment: fr ? "sur des paquets open source que j'ai créés" : "on OSS packages I created",
      url: socials.npm.value,
      highlight: true,
    },
    {
      stat: compactCount(githubStars),
      label: fr ? "Stars GitHub" : "GitHub stars",
      // The repo count makes the total reconcilable: without it, a reader adds
      // up the four cards on page 2 and wonders where the rest comes from.
      comment: fr
        ? `répartis sur ${githubRepos} dépôts que je possède`
        : `across ${githubRepos} repos I own`,
      url: socials.github.value,
    },
  ];
}

/** "2014 – 2017". */
export const yearRange = (item: ResumeItem, lang: Lang = defaultLang) => {
  const now = lang === "fr" ? "aujourd'hui" : "now";
  const start = item.dateStart ? new Date(item.dateStart).getFullYear() : undefined;
  const end = item.wip ? now : item.dateEnd ? new Date(item.dateEnd).getFullYear() : now;
  if (!start) return `${end}`;
  return `${start}` === `${end}` ? `${start}` : `${start} – ${end}`;
};

/** Three-letter months, so a date fits on a CV line in both languages. */
const monthNames: Record<Lang, string[]> = {
  en: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
  fr: [
    "janv.",
    "févr.",
    "mars",
    "avr.",
    "mai",
    "juin",
    "juil.",
    "août",
    "sept.",
    "oct.",
    "nov.",
    "déc.",
  ],
};

export const monthYear = (iso: string, lang: Lang = defaultLang) => {
  const d = new Date(iso);
  return `${monthNames[lang][d.getMonth()]} ${d.getFullYear()}`;
};

/** Past this, months are noise: "2017 – 2023" beats "Mar 2017 – Oct 2023". */
const monthPrecisionMaxYears = 3;

/**
 * "Sep 2025 – Apr 2026" on recent, short engagements - "2025 – 2026" reads as
 * "finished in January" and silently ages the whole CV. Long spans fall back to
 * years, where the month carries no information and just adds weight.
 */
export const monthRange = (item: ResumeItem, lang: Lang = defaultLang) => {
  if (!item.dateStart) return yearRange(item, lang);
  const end = item.wip ? undefined : item.dateEnd;
  const years =
    (new Date(end ?? new Date()).getTime() - new Date(item.dateStart).getTime()) /
    (365.25 * 24 * 3600 * 1000);
  if (years > monthPrecisionMaxYears) return yearRange(item, lang);
  const startLabel = monthYear(item.dateStart, lang);
  const endLabel = end ? monthYear(end, lang) : lang === "fr" ? "aujourd'hui" : "now";
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

/**
 * The exported CV, one file per language: the French one is the same name with
 * a `.fr` suffix, so both sit next to each other and the English URL - the one
 * already circulating - never changes. `scripts/generate-resume-pdf.mjs` writes
 * exactly these paths; keep the two in sync.
 */
export const resumePdfPath = (lang: Lang = defaultLang) =>
  `/maxime-thirouin-freelance-front-end-developer-resume${lang === defaultLang ? "" : `.${lang}`}.pdf`;

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
export const personJsonLd = (items: ResumeItem[], lang: Lang = defaultLang) => ({
  "@context": "https://schema.org",
  "@type": "Person",
  name: fullName,
  alternateName: nickname,
  jobTitle: jobTitle,
  description: l(summary, lang),
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
  knowsLanguage: languages.map((language) => l(language.label, lang)),
  knowsAbout: [...metaKeywords(lang), ...skillsDomains.flatMap((d) => l(d.items, lang))],
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
