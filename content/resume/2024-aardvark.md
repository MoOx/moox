---
company: "Aardvark Intelligence"
url: "https://www.aardvarkintel.com"
title:
  en: "Generative AI solution for automating legal and financial data"
  fr: "Solution d'IA générative pour l'automatisation de données juridiques et financières"
highlight: true
job_title: "Lead Front-End Developer"
icon: /resume/icons/aardvark.png
pitch:
  en: "Built the virtualized spreadsheet-like editor that keeps the UI instant on tens of thousands of rows, then made Playwright guard its performance in CI - so the release train never shipped a regression."
  fr: "Éditeur de type tableur virtualisé, construit pour garder l'interface instantanée sur des dizaines de milliers de lignes, puis performance surveillée par Playwright en intégration continue - pour qu'aucune régression ne parte en production."
stats:
  - stat: "50k+"
    label:
      en: "Rows"
      fr: "Lignes"
    comment:
      en: "editable in-browser, lag-free (virtualized)"
      fr: "éditables dans le navigateur, sans latence (virtualisées)"
  - stat:
      en: "2 weeks"
      fr: "2 semaines"
    label:
      en: "Release cadence"
      fr: "Cadence de livraison"
    comment:
      en: "fully automated CI (Playwright perf tests)"
      fr: "CI entièrement automatisée (tests de performance Playwright)"
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
produce the data; my job was the surface where people verify and correct it —
at a scale where a regular table gives up: tens of thousands of rows, all
editable, in the browser.

Spreadsheet-grade editing means spreadsheet-grade details: units, dates and
long text cells each needed their own editing behavior, and filtering started
client-side then moved to the backend once the datasets outgrew the browser.
Performance at that scale erodes silently, one innocent PR at a time — the
Playwright performance tests in CI exist precisely for that, with a fully
automated pipeline holding a two-week release cadence for almost two years.

Sole front-end in a three-person product team, I also took over design after
the designer's first drafts — up to a complete redesign once the product had
outgrown them, dark mode included — sparing the company a dedicated design
position. Built with React Native Web and TypeScript: a solid abstraction for
web-only today, with the door open to native apps tomorrow.

---

Aardvark automate le traitement de données juridiques et financières avec de
l'IA générative. Les modèles produisent la donnée ; mon travail portait sur la
surface où on la vérifie et la corrige — à une échelle où un tableau classique
abandonne : des dizaines de milliers de lignes, toutes éditables, dans le
navigateur.

Une édition digne d'un tableur impose des détails dignes d'un tableur : unités,
dates et cellules de texte long demandaient chacune leur propre comportement
d'édition, et le filtrage, d'abord côté client, est passé côté serveur quand
les jeux de données ont dépassé ce que le navigateur encaisse. À cette échelle,
la performance s'érode en silence, une pull request anodine après l'autre — les
tests de performance Playwright en intégration continue sont là exactement pour
ça, dans une chaîne entièrement automatisée qui a tenu une livraison toutes les
deux semaines pendant près de deux ans.

Seul front-end d'une équipe produit de trois personnes, j'ai aussi repris le
design après les premières maquettes — jusqu'à une refonte complète quand le
produit les avait dépassées, mode sombre compris — épargnant à l'entreprise un
poste de design dédié. Construit avec React Native Web et TypeScript : une
abstraction solide pour un usage web aujourd'hui, la porte ouverte aux
applications natives demain.
