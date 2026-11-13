---
company: "Aardvark Intelligence"
url: "https://www.aardvarkintel.com"
title:
  en: "Generative AI solution for automating legal and financial data"
  fr: "Solution d'IA générative pour l'automatisation de données juridiques et financières"
highlight: true
job_title: "Senior Front-End Developer"
icon: /resume/icons/aardvark.png
pitch:
  en: "Built an AI chat and a virtualized spreadsheet-like editor, checked by hand at 50,000 rows with no visible lag, then had Storybook interaction tests in CI (Vitest + Playwright) fail the build whenever the 10,000-row table stopped virtualizing or lost search, sort or filters."
  fr: "Chat IA et éditeur de type tableur virtualisé, vérifié à la main sur 50 000 lignes sans latence visible, puis tests d'interaction Storybook en intégration continue (Vitest + Playwright) qui font échouer le build dès que la table de 10 000 lignes cesse d'être virtualisée ou perd recherche, tri ou filtres."
# 4 days a week: Enjoy (2024) then Exem (2025-2026) took the other days.
schedule:
  en: "4 days/week"
  fr: "4 j/semaine"
stats:
  # 50k is the size tested by hand during development; the CI story runs on
  # 10k (TableView.stories.tsx: fewer than 100 rows in the DOM, rows change on
  # scroll). No timing was ever measured, so no "performance test" claim.
  - stat: "50k"
    label:
      en: "Rows"
      fr: "Lignes"
    comment:
      en: "tested by hand, no visible lag (virtualized)"
      fr: "testées à la main, sans latence visible (virtualisées)"
  - stat:
      en: "2 weeks"
      fr: "2 semaines"
    label:
      en: "Release cadence"
      fr: "Cadence de livraison"
    comment:
      en: "fully automated CI (Storybook interaction tests in Playwright)"
      fr: "CI entièrement automatisée (tests d'interaction Storybook sous Playwright)"
  # Not "Solo": in bold right under the "Lead Front-End Developer" title it read
  # as a contradiction. Ownership is the point, headcount isn't.
  - stat:
      en: "End-to-end"
      fr: "De bout en bout"
    label:
      en: "Front-end ownership"
      fr: "Front-end sous ma responsabilité"
    comment:
      en: "sole front-end in a 3-person product team"
      fr: "seul front-end dans une équipe produit de trois personnes"
dateStart: 2024-04-03
dateEnd: 2026-01-31
# Order matters: the CV only renders the first 6, so the distinctive ones lead.
hashtags:
  - Virtualization
  - Performance
  - Playwright
  - CI/CD
  - TypeScript
  - React Native Web
  - React
  - React Native
  - JavaScript
  - UI Design
image: /resume/aardvark.jpg
remote: true
links:
  - title: Aardvark
    url: https://www.aardvarkintel.com
---

Aardvark automates legal and financial data with generative AI. The models
produce the data; my job was the surface where people verify and correct it,
at a scale where a regular table gives up: tens of thousands of rows, all
editable, in the browser.

Spreadsheet-grade editing means spreadsheet-grade details: units, dates and
long text cells each needed their own editing behavior, and filtering started
client-side then moved to the backend once the datasets outgrew the browser.
Performance at that scale erodes silently, one innocent PR at a time. I
checked the editor by hand at 50,000 rows while building it, and Storybook
interaction tests running in Chromium on every CI run (Vitest + Playwright)
fail the build if the 10,000-row table stops virtualizing or loses search,
sort or filters. The fully automated pipeline held a two-week release cadence
for almost two years.

Sole front-end in a three-person product team, I also took over design after
the designer's first drafts (up to a complete redesign once the product had
outgrown them, dark mode included), sparing the company a dedicated design
position. Built with React Native Web and TypeScript: a solid abstraction for
web-only today, with the door open to native apps tomorrow.

---

Aardvark automate le traitement de données juridiques et financières avec de
l'IA générative. Les modèles produisent la donnée ; mon travail portait sur la
surface où on la vérifie et la corrige, à une échelle où un tableau classique
abandonne : des dizaines de milliers de lignes, toutes éditables, dans le
navigateur.

Une édition digne d'un tableur impose des détails dignes d'un tableur : unités,
dates et cellules de texte long demandaient chacune leur propre comportement
d'édition, et le filtrage, d'abord côté client, est passé côté serveur quand
les jeux de données ont dépassé ce que le navigateur encaisse. À cette échelle,
la performance s'érode en silence, une pull request anodine après l'autre. J'ai
vérifié l'éditeur à la main sur 50 000 lignes pendant sa construction, et des
tests d'interaction Storybook exécutés dans Chromium à chaque passage de la CI
(Vitest + Playwright) font échouer le build si la table de 10 000 lignes cesse
d'être virtualisée ou perd la recherche, le tri ou les filtres. La chaîne
entièrement automatisée a tenu une livraison toutes les deux semaines pendant
près de deux ans.

Seul front-end d'une équipe produit de trois personnes, j'ai aussi repris le
design après les premières maquettes (jusqu'à une refonte complète quand le
produit les avait dépassées, mode sombre compris), épargnant à l'entreprise un
poste de design dédié. Construit avec React Native Web et TypeScript : une
abstraction solide pour un usage web aujourd'hui, la porte ouverte aux
applications natives demain.
