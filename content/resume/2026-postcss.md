---
company: "Open Source"
url: "https://github.com/postcss"
# One card for the whole PostCSS story: the org and the plugins I created from
# 2014 and maintained for years, then the return in 2026. The dates are the
# return's on purpose ("2026 – now"): a "2014 – now" span would claim twelve
# years without a break, and the title says where it started. Of the 13
# packages lifted on Tidelift, 4 are mine (postcss-url, reduce-css-calc,
# postcss-font-variant, postcss-selector-matches) and 3 more had releases of
# mine before 2026 (caniuse-api, postcss-color-gray, postcss-media-minmax), per
# npm's publish history. Figures: STATS.md, "postcss".
title:
  en: "Created the PostCSS org and several of its plugins in 2014; back in 2026, funded by Tidelift, to maintain them and other CSS tooling left unpatched"
  fr: "Créateur de l'organisation PostCSS et de plusieurs de ses plugins en 2014 ; de retour en 2026, financé par Tidelift, pour les maintenir avec d'autres outils CSS laissés sans correctifs"
openSource: true
job_title:
  en: "Org creator, back as maintainer"
  fr: "Créateur de l'org, de retour comme mainteneur"
pitch:
  en: "Came back to PostCSS, funded through Tidelift, to maintain packages I had created and others left with open vulnerabilities. Most of the work went into postcss-selector-parser: three security advisories fixed by making parsing linear-time on crafted input, with every fix on both the 7.x and 6.x lines."
  fr: "Retour sur PostCSS, financé par Tidelift, pour maintenir des paquets que j'avais créés et d'autres laissés avec des vulnérabilités ouvertes. L'essentiel du travail a porté sur postcss-selector-parser : trois alertes de sécurité corrigées en rendant l'analyse linéaire sur des entrées malveillantes, chaque correctif publié sur les branches 7.x et 6.x."
dateStart: 2026-04-01
wip: true
hashtags:
  - PostCSS
  - Security
  - Performance
  - Node.js
  - Open Source
# The card shows only `stat label`, never the comment: each label has to stand
# on its own.
stats:
  - stat: "13"
    label:
      en: "Packages maintained"
      fr: "Paquets maintenus"
    comment:
      en: "as a Tidelift lifter, 4 of them created by me"
      fr: "en tant que lifter Tidelift, dont 4 créés par moi"
    # Tidelift has no public page per lifter: the proof is the security notice
    # each lifted repository gets, committed under my name.
    url: "https://github.com/search?q=author%3Amoox+tidelift&type=commits"
  - stat: "3"
    label:
      en: "Security fixes in postcss-selector-parser"
      fr: "Correctifs de sécurité dans postcss-selector-parser"
    comment: "CVE-2026-9358 · CVE-2026-104844 · GHSA-67xj-gfww-g738"
    url: "https://github.com/postcss/postcss-selector-parser/blob/main/CHANGELOG.md"
  # Its own stat: labels are lowercased on the card, which turned "178M+" into
  # "178m+" when the figure sat inside one.
  - stat: "178M+"
    label:
      en: "Weekly downloads of that package"
      fr: "Téléchargements hebdomadaires de ce paquet"
    url: "https://www.npmjs.com/package/postcss-selector-parser"
  - stat: "500+"
    label:
      en: "Commits across the org"
      fr: "Commits dans l'organisation"
    url: "https://github.com/search?q=org%3Apostcss+author%3Amoox&type=commits"
---

I created the PostCSS GitHub organization in July 2014, in the cssnext days,
to give the plugins a shared home. Several of them were mine (postcss-url,
reduce-css-calc, postcss-font-variant, postcss-selector-matches and others),
and I maintained them for years, with 500+ commits across the org, before
moving on to other things.

In 2026 I came back through Tidelift, which pays maintainers to keep the
packages companies depend on secure and up to date. I lifted 13 CSS tooling
packages: the ones I had created, and others that had open vulnerability
reports and nobody left to act on them, such as postcss-selector-parser,
postcss-filter-plugins, postcss-reporter, caniuse-api, css, rework and
css-parse.

Most of the work went into postcss-selector-parser, which sits under a large
part of the CSS tooling in use today, so a fix there has to be careful as much
as fast. The advisories were CPU-exhaustion cases: crafted selectors that made
the parser quadratic. The fix was to make parsing linear on those inputs, path
by path, then to add a `maxInputLength` option and write down the threat
model, so users know what the parser does and does not protect them from.
Every fix shipped on the current 7.x line and was backported to 6.x, and a
change that turned out to break existing callers was reverted in a patch
release, with the contract it had broken now written in the docs. The work is
ongoing: AI-assisted security research has sharply increased the number of
reports reaching parsers like this one.

---

J'ai créé l'organisation GitHub PostCSS en juillet 2014, à l'époque de cssnext,
pour donner un foyer commun aux plugins. Plusieurs d'entre eux étaient les miens
(postcss-url, reduce-css-calc, postcss-font-variant, postcss-selector-matches et
d'autres), et je les ai maintenus pendant des années, avec plus de 500 commits
dans l'organisation, avant de passer à autre chose.

En 2026, j'y suis revenu par Tidelift, qui rémunère les mainteneurs pour garder
sûrs et à jour les paquets dont les entreprises dépendent. J'ai repris 13
paquets d'outillage CSS : ceux que j'avais créés, et d'autres qui avaient des
signalements de vulnérabilité ouverts et plus personne pour les traiter, comme
postcss-selector-parser, postcss-filter-plugins, postcss-reporter,
caniuse-api, css, rework et css-parse.

L'essentiel du travail a porté sur postcss-selector-parser, qui se trouve sous
une grande partie de l'outillage CSS utilisé aujourd'hui : un correctif doit y
être prudent autant que rapide. Les alertes portaient sur l'épuisement du
processeur : des sélecteurs fabriqués pour rendre l'analyse quadratique. La
correction a consisté à rendre l'analyse linéaire sur ces entrées, chemin par
chemin, puis à ajouter une option `maxInputLength` et à écrire le modèle de
menace, pour que les utilisateurs sachent ce dont l'analyseur les protège et ce
dont il ne les protège pas. Chaque correctif est sorti sur la branche 7.x
actuelle et a été reporté sur la 6.x, et un changement qui cassait des
appelants existants a été annulé dans une version corrective, avec le contrat
qu'il avait cassé désormais écrit dans la documentation. Le travail continue :
la recherche de failles assistée par IA a fortement augmenté le nombre de
signalements qui arrivent sur ce type d'analyseur.
