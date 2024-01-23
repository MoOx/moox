---
date: 2023-12-11
title: "Pourquoi vous devriez utiliser React Native pour vos applications web"
tags:
  - react
  - react-native
lang: fr
---

<small>[🇺🇸 English version of this post](/blog/why-you-should-use-react-native-for-web/)</small>

[_React Native for Web_](https://necolas.github.io/react-native-web/), un clone
web du framework largement adopté [React Native](https://reactnative.dev), est
quelque chose que vous devriez sérieusement considérer lors de vos
développements front-end, non seulement pour ses performances dans les
applications multiplateformes, mais aussi comme une solution autonome pour le
développement web.

Lors de sa création, _React Native for Web_ n'était pas censé être un clone de
_React Native_. Il devait simplement apporter un SDK web, inspiré de _React
Native_ certes, mais pas un clone. À l'époque, il était même appelé
[React Web SDK](https://github.com/necolas/react-native-web/commit/e34820c11c82417f673103c2d67ecd19e26f0193).
La motivation réside probablement dans le fait que _React_ lui-même était un
framework axé sur le web mais dépendant fortement du DOM. D'où le nom _React
DOM_ que nous connaissons aujourd'hui. _React_ est une bibliothèque de bas
niveau, et _React DOM_ est le lien entre _React_ et le DOM, tout comme _React
Native_ est le lien entre _React_ et les plateformes natives. _React DOM_ n'est
qu'une implémentation du réconciliateur _React_ pour le DOM. Il existe d'autres
implémentations comme
[React Native for Windows and macOS](https://microsoft.github.io/react-native-windows/)
ou même [@react-three/xr](https://github.com/pmndrs/react-xr) pour le contenu
VR.

À l'époque, le créateur de _React Native for Web_,
[@necolas](https://github.com/necolas), visait probablement simplement à offrir
un ensemble simple de primitives pour construire des applications web, non
explicitement liées au DOM, à l'instar de ce que propose _React Native_ pour iOS
et Android. Des éléments simples tels que `<View />`, `<Text />`, `<Image />`,
`<ScrollView />`, `<Touchable />` et ainsi de suite. Cependant, à mesure que le
projet évoluait, c'est devenu de plus en plus une réplique de _React Native_,
avec les mêmes APIs, les mêmes composants, le même comportement... Finalement la
même chose. Et c'est une bonne chose, car cela signifie que vous pouvez utiliser
_React Native for Web_ comme une solution autonome pour le développement web, et
pas seulement comme un compagnon pour les applications multiplateformes.

Lors de la création de ce projet, Necolas travaillait chez
[~~Twitter~~ X](https://twitter.com/) et se penchait sur une nouvelle
implémentation web. Le résultat de son travail était
[extraordinaire](https://twitter.com/necolas/status/1058949372837122048).
L'amélioration du CSS à elle seule aurait pu justifier l'existence de _React
Native for Web_.

Les développeurs front-end savent tous que la cohérence en matière de style est
un défi perpétuel dans le développement web. _React Native for Web_ offre une
solution de style fiable. En s'appuyant sur le sous-ensemble de CSS offert par
_React Native_ (principalement Flexbox), les développeurs peuvent maintenir des
styles cohérents sur tous les navigateurs et toutes les plateformes. Cette
cohérence simplifie non seulement le processus de développement, mais garantit
également que l'identité visuelle de l'application reste cohérente, même si une
application mobile n'est pas immédiatement prévue.

Mais _React Native for Web_ n'était pas seulement axé sur le CSS, car il
existait déjà de nombreuses solutions CSS-in-JS disponibles. Il s'agissait
d'avoir un impacte sur la plateforme web dans son ensemble. Et le résultat est
un framework qui peut être utilisé pour construire des applications web
accessibles.

## L'accessibilité qu'offre _React Native for Web_

Un aspect remarquable de _React Native for Web_ est son engagement envers
[l'accessibilité](https://necolas.github.io/react-native-web/docs/accessibility/).
Si HTML lui-même offre de nombreuses fonctionnalités d'accessibilité, il n'est
pas toujours facile de les utiliser. _React Native for Web_, en revanche,
facilite la construction d'applications web accessibles. En exposant ces
fonctionnalités d'accessibilité avec des props _React_ simples, comme le fait
_React Native_ (même s'il existe des différences qui pourraient finir par être
intégrées dans _React Native_ un jour), les développeurs peuvent garantir que
les applications web construites avec _React Native for Web_ sont inclusives et
respectent les normes d'accessibilité web. Cela est particulièrement crucial
pour les projets qui accordent la priorité à l'accessibilité ou doivent se
conformer à des réglementations tel que le
[RGAA en France](https://accessibilite.numerique.gouv.fr). Mais quand on parle
de la plateforme web, on ne parle pas seulement des ordinateurs de bureau. Le
mobile est maintenant une partie importante du web.

_React Native for Web_ apporte la marque de fabrique de _React Native_ - des
interactions utilisateur de haute qualité et semblables à celles des
applications natives - sur le web. La capacité du framework à gérer facilement
les gestes, les animations et les transitions, perfectionnée dans le domaine
mobile, se traduit parfaitement dans les applications web. Cela se traduit par
une expérience web qui reflète des interactions presque aussi fluides et
réactives auxquelles les utilisateurs sont habitués avec les applications
mobiles natives. En utilisant _React Native for Web_, de nouvelles possibilités
s'ouvrent. Vous pouvez maintenant utiliser des bibliothèques comme
[React Native Gesture Handler](https://docs.swmansion.com/react-native-gesture-handler/)
et
[React Native Reanimated](https://docs.swmansion.com/react-native-reanimated/),
qui ouvre la porte à un tout nouveau monde de possibilités. Vous pouvez
désormais construire des applications web avec le même niveau d'interactions que
les applications natives en utilisant simplement des choses comme
[React Native Bottom Sheet](https://github.com/gorhom/react-native-bottom-sheet).
C'est juste un exemple, mais vous pouvez facilement faire beaucoup plus avec ces
types de bibliothèques.

## React Native for Web ne vous bride pas

L'une des principales forces de _React Native for Web_ est sa compatibilité avec
_React DOM_, permettant une adoption progressive. Les développeurs peuvent
introduire progressivement des composants _React Native for Web_ dans une
application _React_ existante, remplaçant petit à petit certaines parties de
l'interface utilisateur. Cette approche progressive facilite une transition en
douceur, permettant aux équipes d'intégrer _React Native for Web_ dans leurs
projets sans avoir besoin d'une refonte à grande échelle. D'autre part, si vous
commencez directement un projet avec _React Native for Web_, vous n'êtes pas
obligé d'utiliser l'API _React Native_. À tout moment, vous pouvez décider dans
certains composants d'utiliser l'API _React DOM_ et d'utiliser toute la
plateforme web sans aucune limitation. Vous pouvez utiliser `<div>`, `<canvas>`
ou tout ce que vous voulez. Aucune restriction ! Et c'est très facile à faire.
Vous pouvez vous appuyer sur
[l'API Platform](https://reactnative.dev/docs/platform) ou créer directement un
fichier web spécifique, en utilisant une extension `.web.js`.

Attendez, quoi ? J'ai dit quoi ? Une implémentation web pour un composant donné
?

## _React Native for Web_ garde la porte ouverte aux plateformes mobile et desktop

Même si votre plan immédiat ne comprend pas le développement d'une application
iOS ou Android, **l'utilisation de _React Native for Web_ peut vous ouvrir la
porte à ces plateformes, alors que l'inverse n'est pas vrai**. Si vous commencez
une application web en utilisant directement _React DOM_, vous ne pourrez pas
facilement partager votre code avec d'autres plateformes car vous serez limité
au DOM. La codebase et les composants partagés entre _React Native for Web_ et
_React Native_ pour mobile facilitent l'ouverture de l'application aux
plateformes mobiles à l'avenir. Ce choix stratégique permet une flexibilité dans
les plans de développement futurs sans avoir besoin d'une refonte complète de
l'application web existante, ou pire et encore plus couteux: plusieurs
implémentations. Vous pourriez même utiliser votre codebase pour des
applications Windows ou macOS en utilisant
[React Native for Windows and macOS](https://microsoft.github.io/react-native-windows/),
un projet maintenu par Microsoft,
[utilisé sur des produits importants comme Office ou l'application Xbox Windows](https://microsoft.github.io/react-native-windows/resources-showcase).
Oui, Microsoft Office et l'app Xbox utilisent l'API _React Native_ ! C'est pas
rien non ?

Mais gardez à l'esprit que _React Native for Web_ n'est pas seulement là en tant
que compagnon capable pour le développement multiplateforme, mais surtout en
tant que solution autonome puissante pour les applications web. Avec son
engagement envers l'accessibilité, les interactions semblables à celles des
applications natives, la cohérence en matière de style et la possibilité
d'adoption progressive, _React Native for Web_ offre une solution polyvalente et
robuste. Et en maintenant la porte ouverte aux futures plateformes mobiles, les
développeurs peuvent faire des choix stratégiques qui permettent la flexibilité
et la scalabilité, faisant de _React Native for Web_ un framework a considérer
dans le monde du développement web.

Et cela pourrait devenir quelque chose de encore plus sérieux à l'avenir.
Necolas travaille chez [Meta](https://www.meta.com) depuis un certain temps et a
apporté de nombreuses contributions à _React_ lui-même pour assurer un avenir
prometteur pour les codebases multiplateformes. Si vous êtes curieux, vous
pouvez jeter un œil à sa
[RFC: React DOM for Native](https://github.com/react-native-community/discussions-and-proposals/pull/496)
ou même au projet [StyleX](https://stylexjs.com/blog/introducing-stylex) qui
[finira par être intégré à _React Native_ et _React Native for Web_](https://www.threads.net/@nicolas.img/post/C0fxzFuL4gp).

Tout ça pour dire que la prochaine fois que vous devez démarrez une application
web, envisagez d'utiliser _React Native for Web_ au lieu de _React DOM_
directement. Vous ne le regretterez pas. Je ne l'ai jamais regretté au cours des
dernières années où je l'ai utilisé.
