---
date: 2024-01-23
title: Parlons simplicité
lang: fr
---

<small>[🇺🇸 English version of this post](/blog/about-simplicity/)</small>

Aujourd'hui j'ai envie de vous parler simplement... de simplicité. C'est un
concept qui me tient à coeur, et qui est souvent mal compris. Sans tarder je
vais vous sortir une citation aussi simple que profonde:

> « La simplicité est la sophistication suprême » – Léonard de Vinci

Simplicité ne veut pas dire facilité. Loin de là. Regardez nos smartphones: ils
sont simples à utiliser, mais leur conception est de plus en plus complexe. La
simplicité demande de la pratique, de la technique et de la patience. On a du
matériel, du logiciel, et tout ça doit fonctionner parfaitement à l'unison.
C'est un travail d'orfèvre, et c'est ce qui rend la simplicité obtenue si belle.
Nos smartphones et les applications qu'on y retrouve sont bien souvent
intuitives. Pas besoin de manuel. Certains plus que d'autres arrivent à un degré
de simplicité qui les rends presque magiques. Apple par exemple, de par son
niveau de maitrise du logiciel couplé au matériel, arrive à offrir une
expérience inégalée. En terme d'expérience utilisateur, aujourd'hui aucune
marque peut se vanter d'offrir des fonctionnalités aussi simple et intuitive que
AirDrop (bien qu'imparfait techniquement), que Handoff ou encore iMessage avec
la continuté entre les périphériques connectés. On peut partager facilement une
expérience entre différents appareils, et ça, personne aujourd'hui offre ce
niveau de finition.

Quand il s'agit de développement, on retrouvera le même combat avec 2
composantes principales: le code, et son résultat. Nous savons tous que pour un
résultat donné, on peut s'y prendre de mille implémentations possibles.

Alors comment doit-on s'y prendre pour à la fois obtenir un résultat simple
d'utilisation et fonctionnel pour l'utilisateur, mais aussi simple à comprendre
pour les développeurs et surtout, simple à maintenir ?

## Commencez simple ne veux pas dire simplet

On le sait tous, quand on débute un nouveau projet, on a tendance à rêver grand
et aux fonctionnalités complexes... Mais qui ne veront peut être jamais le jour.
On va se ruer sur les bibliothèques derniers cris sans trop se questionner sur
leur efficacité réel pour notre besoin. Alors attendez une minute avant de
partir vous projeter dans la stratosphère, et gardez les pieds sur terre.
Commencer simple. Mais attention, simple ne veut pas dire simplet. Cela signifie
plutôt créer une base solide, comme les fondations d'une maison en bon état
saine. On s'occupe pas des finitions, juste d'une bonne base.

Par exemple choisir
[React Native (et/ou React Native for Web) pour son projet mobile et/ou web sera une bonne base sans risque](/blog/pourquoi-vous-devriez-utiliser-react-native-pour-vos-applications-web/).
Je en parle pas de prendre LA super solution de CSS-in-JS ou de choisir la
solution pour votre store interne mais de choisir une bonne fondation.
L'équation de la simplicité peut être plus que délicate. Donc il s'agit plutôt
de trouver le bon équilibre entre le simple et le fonctionnel. Ne compliquez pas
les choses, mais ne soyez pas non plus timide.

## KISS ?

Vous avez probablement entendu parler du KISS, qui signifie "Keep It Simple,
Stupid". Le côté stupide, je le vois plus comme un côté niais. Soyez niais et
gentil avec votre code et avec vous-mêmes. La simplicité est une manière
d'exprimer l'amour pour notre futur nous qui devra maintenir ce code. Si vous
pouvez faire une implémentation d'une partie dans un fichier de 500 lignes de
codes, pourquoi vouloir à tout prix séparer des choses dans 10 fichiers de 50
lignes ? Qu'est ce que ça apporte dans l'immédiat ? Ne pensez pas
réutilisabilité avant que ça soit vraiment le cas... La sur-ingénierie, c'est un
peu comme mettre une roue de Formule 1 sur un vélo. Ca peut fonctionner, mais
est-ce vraiment pertinent ?

Ne surchargez pas votre projet dès le début. Attendez que ça ait vraiment du
sens et que votre code vous envoie des signaux clairs disant : "Hé, j'ai
vraiment besoin que ce bout de code soit repensé MAINTENANT !". Et pas avant.

Une des choses que je trouve absurde sur bien des projets front-end par exemple,
c'est les tests unitaires. Faire des tests unitaires de composants React ne vous
garanti pas que votre application fonctionne. Ça vous garanti que vos composants
fonctionnent par rapporte aux tests que vous avez explicité. A travers votre
regard accompagné de vos biais. Alors que mettre en place des tests
fonctionnels, qui réalisent des actions réelles sur votre application, vous
garantira que votre application fonctionne avec un degré bien plus intéressant.
Et ça, c'est bien plus important que de savoir si votre composant est bien
"rendu" avec les bonnes props. Et le rendu, qu'elle est-il ? Tester des props
CSS ça vous dit vraiment si votre bouton est bien clicable en pratique ?
Rarement vous aurez un degré de certitude aussi élevé qu'un test fonctionnel.
Avoir un programme qui va réaliser des actions d'un utilisateur, des clics, des
scrolls, des saisies, et qui va vérifier que le résultat est bien celui attendu,
c'est bien plus puissant et pertinent. Et c'est souvent bien plus simple à
écrire qu'un test unitaire.

Bref c'était un petit article pour vous faire méditer sur votre rapport à votre
code et votre architecture. Ne compliquez pas les choses avant que vous ayez un
réel besoin.

Ayez une approche minimaliste. Ne faites rien qui n'est pas utile sur l'instant.

Des bisous.
