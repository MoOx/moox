# CV spec - `/cv` (2 pages A4, PDF)

Working document = the **content skeleton** for the CV design.
Text only, no visual yet. Legend: ✅ confirmed/real · ⚠️ TODO/confirm · 💡 placeholder.

The `/cv` is the **condensed "best of"** - a beautiful, miniaturized mix of the
home + `/resume`. Home stays sexy; `/resume` keeps the full detail; `/cv` = the
essential, dense, print-ready. Reuses the site's primitives (gradient bands,
`GradientText`, `GradientLinear`, stat components). White / gradient **band
rhythm** kept from the site - gradients are vector in PDF (free, Preview-safe).

---

## 0. Identity & contact (header, page 1)

- **Name**: Maxime "Max" Thirouin ✅
- **Title**: Senior Front-End Architect ✅
- **Sub**: Freelance since 2013 · React, React Native & cross-platform ✅
- **Location**: Toulouse, France 🇫🇷 · Remote ✅
- **Age**: 40 ✅ (optional on a CV - keep?)
- **Languages**: 🇫🇷 French Native · 🇬🇧 English Fluent ✅
- **Contacts** ✅: moox.io · github.com/MoOx · linkedin.com/in/MaxThirouin · +33 6 78 13 54 39 · <hello@moox.io>
- **Photo**: dribbling/portrait (`/max-1.png` or `/max-2.png`) with floating "pills":
  Web Developer · 19y - Mobile Developer · 8y - First Website · 27y ago - First Mobile Web App (PalmOS) · 20y ago ✅

**Tagline** ✅: _"I make front-ends simple - the ultimate sophistication."_
**Summary** ✅: _"Two decades turning tangled front-ends into systems teams can
actually maintain: simpler architecture, less overhead, and devs who level up
along the way."_

---

## 1. Profile stats - the "player-card" punch (page 1)

Global career stats. Verifiable first. (`consts.cvProfileStats`)

| stat      | label             | comment                                                           | source                          |
| --------- | ----------------- | ----------------------------------------------------------------- | ------------------------------- |
| **19**    | Years             | freelance front-end (since 2013); pro since 2007                  | ✅                              |
| **20+**   | Projects          | delivered since going freelance (2013)                            | ✅ repo (23 missions)           |
| **15+**   | Clients           | companies served (Kisio = Hove after rebrand)                     | ✅ repo (16)                    |
| **200M+** | Downloads / month | on OSS **I created** (PostCSS plugins, now in postcss-preset-env) | ✅ npm - first publisher = moox |

**OSS downloads - verified honest (created by me = first npm publisher):**

- Created by me (~207M/mo ≈ **52M/wk**): postcss-calc 75.7M · postcss-custom-properties 33.9M · postcss-color-rebeccapurple 32.4M · postcss-color-hex-alpha 32.4M · postcss-font-variant 29.9M · postcss-message-helpers 2.6M · react-svg-inline · react-topbar… · markdown-it-toc…
- Also mine: **cssnext** (→ postcss-preset-env, its successor) · **stylelint** (instigated, issue #1) · phenomic · rescript-react-native bindings
- Excluded (not mine, only maintainer): postcss-selector-parser (611M, beneb) · postcss-media-minmax (yisi) · postcss-nesting (jonathantneal) · color-name (1.36B, dfcreative)
- ⚠️ Final proof = git history; first-publisher confirms calc/custom-properties/etc. are mine (the cssnext plugin suite).

**Secondary (not hero tiles):** Speaker · 17 talks · Writer · 27 posts ✅ /talks /blog

Optional radar (player-card inspiration), evidence-linked axes:
Architecture · React/RN · Web · Mobile · Open Source · Design/UX. 💡 (self-assessed - label as such)

---

## 2. Skills (page 1)

Domains (`consts.cvSkillsDomains`) ✅:

- **Front-End Architecture** - Design systems · Performance · Maintainability · Scalability
- **Cross-platform** - React · React Native · Expo · Web · iOS · Android
- **Languages & Tooling** - TypeScript · JavaScript (ES1→today) · Node.js · HTML / CSS
- **APIs & Data** - REST · GraphQL · Apollo

Tech strip (icons) ✅: JavaScript · TypeScript · CSS · React · Native · GraphQL · Next.js · Expo · Claude

> Design choice pending (from the skills mockup): 3 gradient cards vs domains+icons vs restructured header. → decide in the structure/mockup step.

---

## 3. Key Experiences (page 1) - highlighted, with per-project stats

**Exem** - Front-End Developer · _Urban Dashboard_ · 2025–2026 ✅
Interactive EMF data visualization on city maps (Mapbox, React Strict DOM, TanStack Start).
Stats: - _(skipped: not online, niche, for towns/communautés de communes)_

**Aardvark Intelligence** - Web & Mobile Developer · _AI Chatbot_ · 2024–2026 ✅
Sole front-end dev on a generative-AI product automating legal & financial data.
Built a spreadsheet-like editor handling 50,000+ rows lag-free (virtualized),
2-week release train, fully automated CI running Playwright perf & search tests.
Stats: **50k+** rows (virtualized) · **2 weeks** release cadence · **3** team (solo front, 2 back)

**FKLG Production** (Kyan Khojandi) - Full-Stack · _VOD + fklg.art_ · 2023–2026 ✅
VOD platform (Shopify + Vimeo) and the video-production portfolio site.
Stats: - _(skipped: niche traffic)_ · human angle: "the guy from **Bref**"

**Hove** (ex-Kisio Digital) - Mobile & Web Developer · _transit apps_ · 2017–2023 ✅
White-label iOS/Android/web transit apps for cities & networks. Led up to 10
devs, then owned the project solo - turned a full day of manual multi-client QA
into a one-click Jenkins pipeline with Detox end-to-end tests.
Stats: **900M+** trips/year (TCL·Ilévia·TBM) · **4M+** people served · **10** devs led · **1 day → 1 click** QA & release

**IUT Blagnac** - University Lecturer · 2012–2020 ✅
~8 years lecturing: C programming and web fundamentals (HTML/CSS/JS) to
1st-years, then Agile methodology to 2nd-years.
Stats: **200+** students taught · **3** subjects (C · Web · Agile)

---

## 4. Open Source (page 2) - 4 real entries with stats

Intro: _Contributing since the early days, with libraries reaching millions of
weekly downloads. GitHub Arctic Code Vault Contributor._ ✅

**cssnext** - Creator & Maintainer · 2014–2017 ✅ - "Babel for CSS", now postcss-preset-env
Stats: **Still 130k+** dl/week (8y after deprecating) · **380+** commits (4y) · **20+** PostCSS plugins
_(postcss-preset-env, its successor, = ~7.8M dl/week today)_

**stylelint** - Instigator · 2015 ✅ - opened issue #1, now the standard CSS linter
Stats: **10M+** dl/week (community-built) · **Issue #1** (the very first one)

**phenomic** - Creator & Maintainer · 2015–2020 ✅ - one of the first React static-site generators
Stats: **3.2k** GitHub stars · **Precursor of Next.js** static rendering

**rescript-react-native** - Maintainer · 2017–2022 ✅ - type-safe React Native for ReScript
Stats: **35** repos maintained · **1.2k+** stars across the org · **React Native API** hand-mapped

---

## 5. Education (page 2) ✅

- **Professional Bachelor - Internet Development** · IUT Rodez · Sep 2006 – Jul 2007
- **DUT - Computer Science** · IUT Blagnac · Sep 2003 – Jul 2006

---

## 6. Social proof (page 2)

**Trusted by** (brands, in TEXT so a bot parses them) ✅:
FKLG · Molotov.tv · Hove · Airbus

**They tried to hire me** 💡 (great conversation piece - confirm framing):
Microsoft · Google · Facebook · Twitter

**Testimonials** (1–2, from the home) ✅:

- _"Max is truly a top React expert. Whether it's React Native or JS, nothing stands in his way."_ - **Aissa**, CTO @ Hove
- _"Max is one of those really rare engineers who doesn't just work on a project but takes ownership of it as well."_ - **James**, Co-Founder @ Aardvark Intelligence

---

## 7. More experience (page 2, compact list) ✅

Secondary line under Key Experiences (name · year · one-liner):
Molotov.tv (TV streaming, 2015) · Airbus (event app, 2014) · One2Team (workflow
mobile app, 2015–16) · Fittingbox (e-commerce eyewear try-on, 2009–10) · M6
(Reality TV / Pekin Express, 2025) · … _(pick the strongest brands)_

---

## 8. Hobbies - "Beyond Code" (page 2) ✅

CrossFit · Climbing · DJ · Standup · Pekin Express #20 _(the conversation piece)_

---

## 9. Footer (page 2) ✅

_"Full history & all my experiences online:"_ → **moox.io** + QR code.

---

## Proposed 2-page allocation (to iterate in the structure step)

**PAGE 1 - the punch**

1. Header / identity - _white band_
2. Tagline + summary - **gradient band**
3. Profile stats (player-card tiles) - _white band_
4. Skills (domains + tech strip) - _white/light band_
5. Key Experiences (5, with stats) - _white band_

**PAGE 2 - depth & proof** 6. Open Source (4, with stats) - **gradient card/band** 7. Education - _white band_ 8. Testimonials + Trusted by / They tried to hire me - _light band_ 9. More experience (compact) - _white band_ 10. Beyond Code (hobbies) - _white band_ 11. Footer (moox.io + QR)

> It's dense for 2 pages - expect to trim in the structure step (e.g. merge
> Education into a corner, cap "More experience" to 4 brands, one testimonial).

---

## Open questions before design

- ⚠️ Confirm **projects (~30)** and **clients (~20)** counts.
- Keep **age (40)** on the CV? (optional)
- "They tried to hire me" - keep? (bold, memorable, but verify you're comfortable)
- Photo: keep `max-2` (arms crossed) or `max-1`? Shrink how much?
