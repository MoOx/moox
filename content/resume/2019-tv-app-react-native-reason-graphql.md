---
company: "Loewe"
title:
  en: "TV/media remote app made with React Native, ReScript, GraphQL & Apollo"
  fr: "Application télécommande TV/média en React Native, ReScript, GraphQL & Apollo"
job_title: "Front-End Developer"
pitch:
  en: "Re-architected the React Native + ReScript codebase to make contributing easy, and polished the UI with tons of animations so the app feels truly native - not half web, half native. Untangled the hand-linked Xcode project into a Cocoapods Podfile, so React Native updates stopped hurting."
  fr: "Base de code React Native + ReScript ré-architecturée pour rendre les contributions faciles, et interface soignée à coups d'animations pour que l'app paraisse vraiment native - pas mi-web, mi-native. Projet Xcode lié à la main démêlé en un Podfile Cocoapods, pour que les mises à jour de React Native cessent de faire mal."
url: "https://www.loewe.tv/"
dateStart: 2019-02-25
dateEnd: 2019-05-10
hashtags:
  - ReScript
  - JavaScript
  - React
  - React Native
  - Reason React
  - Reason React Native
  - GraphQL
  - Apollo
  - Mobile
  - MQTT
  - iOS
  - Auth0
  - Cocoapods
  - Bitrise
  - Git
  - Fastlane
image: /resume/tvapp.jpg
remote: true
---

Loewe builds televisions; this was the app that drives them, a remote written
in React Native and ReScript, with GraphQL, Apollo and MQTT underneath. A short
mission with one goal: unblock a codebase that had become slow to contribute
to.

Three things were in the way. The ReScript code needed a structure people could
add to without reverse-engineering it first, so it got one, along with the
low-level components the team needed to keep up with mockups that kept moving.
The iOS project was a hand-linked `.xcodeproj` (libraries wired in by hand,
some of them copy-pasted), which turned every React Native upgrade into an
archaeology session; moving it to a Cocoapods Podfile made upgrades routine
again. And the app still felt like a web app in a native shell, which for a
device remote is fatal: pressing a button has to answer instantly, or the phone
loses to the plastic remote on the table. That is what the animation work
bought, the kind that never shows up in a changelog.

Turning the Sketch designs into components surfaced what static mockups always
hide: the loading, empty and error states nobody draws. The work also fed back
into bs-react-native, the ReScript bindings for React Native I was maintaining
at the time.

---

Loewe fabrique des téléviseurs ; voici l'application qui les pilote, une
télécommande écrite en React Native et ReScript, avec GraphQL, Apollo et MQTT
en dessous. Une mission courte, avec un seul objectif : débloquer une base de
code devenue lente à faire évoluer.

Trois choses barraient la route. Le code ReScript avait besoin d'une structure
à laquelle on puisse contribuer sans devoir d'abord la rétro-concevoir : il l'a
eue, avec les composants bas niveau nécessaires pour suivre des maquettes qui
n'arrêtaient pas de bouger. Le projet iOS était un `.xcodeproj` lié à la main
(bibliothèques câblées une à une, certaines copiées-collées), ce qui
transformait chaque montée de version de React Native en séance d'archéologie ;
son passage à un Podfile Cocoapods a rendu ces mises à jour routinières. Enfin,
l'application donnait encore la sensation d'un site web dans une coquille
native, ce qui est rédhibitoire pour une télécommande : un appui doit répondre
instantanément, sinon le téléphone perd face à la télécommande en plastique
posée sur la table. C'est ce qu'a acheté le travail d'animation, celui qui
n'apparaît jamais dans un journal de versions.

Transformer les maquettes Sketch en composants a fait remonter ce qu'une
maquette statique cache toujours : les états de chargement, les états vides et
les erreurs, que personne ne dessine. Le travail a aussi nourri
bs-react-native, les bindings ReScript pour React Native dont j'assurais alors
la maintenance.
