---
company: "Hove"
url: "https://hove.com/"
title: "iOS / Android app built for cities and transport networks"
groupTitle: "iOS / Android & web apps built for cities and transport networks"
highlight: true
job_title: "Lead Front-End Developer"
icon: /resume/icons/hove.png
group: hove
# The accessibility sentence claims what happened and nothing more: the app was
# tested by a disability users' association, which is third-party validation,
# not an RGAA or WCAG conformance audit. "Fully accessible, validated by users"
# is checkable; "RGAA compliant" would be a claim nobody ran the audit for.
groupPitch: "Created the white-label transit app for cities and grew it across 20 client networks. Called back by the CTO a year later to rescue it: rebuilt it with a smaller, senior team, stabilized the product, and automated multi-client QA and releases with Jenkins and Detox end-to-end tests - one QA pass switches client networks in-app. Made the app fully accessible, validated by a disability users' association."
stats:
  - title: "Networks served"
    stat: "900M+"
    label: "Trips / year"
    comment: "TCL · Ilévia · TBM (public data)"
  - stat: "4M+"
    label: "People served"
  - stat: "10"
    label: "Devs led"
    comment: "grown to 10, then rebuilt smaller and senior"
  - stat: "1 click"
    label: "For build, QA & releases"
    comment: "was a full day: builds, installs & QA per client network"
dateStart: 2019-06-06
dateEnd: 2022-12-31
# Order matters: the CV only renders the first 6, so the distinctive ones lead.
hashtags:
  - React Native
  - React Native Web
  - Accessibility
  - Detox
  - Jenkins
  - Fastlane
  - Flow
  - JavaScript
  - React
  - iOS
  - Android
  - Git
  - Lead
  - Mobile
  - Maps
  - Location
  - Apple Maps
  - Google Maps
  - Testing
  - Jest
  - Detox
  - Storybook
  - Jenkins
  - Fastlane
image: /resume/adm.jpg
remote: true
---

A year after my first Hove mission ended, the CTO called me back: the app I
had created needed rescuing. The team had grown to ten and the product had
grown fragile — my job was to tighten both. I rebuilt the team as a smaller,
senior one, stabilized the app and simplified the code it had accumulated.

The biggest win was operational. Shipping a change used to cost days per
client network — builds, installs, QA for every declination. This second
phase pushed the Fastlane automation to an "all-in-one" build embedding
every client's data, so QA switches networks in-app without rebuilding:
integrating a modification, QA included, went from several days to a few
hours, and releases became one click.

Under the hood the product work continued: polished animations for low-end
devices, native code and bridges for both platforms, several React Native
upgrades — and the app was brought to the web with React Native Web.

---

Développement d'un projet d'application de transport urbain en marque blanche
iOS/Android avec React Native.

- Récupération de l'application et stabilisation
- Minimisation du temps de déploiement avec synchronisation des données clients
  (de plusieurs jours à quelques heures pour intégrer un changement + QA)
- Simplification du système de déclinaison par client
- Création d'un système tout en un pour faciliter la QA (un build contient les
  données de tous les clients et un système permet de switcher à chaud sans
  re-build)
- Réduction de l'équipe
- Développement de fonctionnalités avec animations optimisés pour bien
  fonctionner sur des smartphones bas de gammes
- Intégration de code et dépendances natives pour iOS et Android avec bridge
  pour utilisation par React Native
- Gestion de plusieurs mises à jour de React Native au cours de la mission
- Portage de l'application iOS/Android sur le web avec React Native Web
