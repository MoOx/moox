---
date: 2011-04-21
lang: fr
title: "Utiliser des variables et fonctions CSS, c'est possible !"
tags:
  - css
---

⚠️ **Note: cette article est déprécié puisque les spécifications CSS en cours
d'écriture prévoient beaucoup de customisation possible. Si vous souhaitez
utiliser cela dès aujourd'hui, je vous renvois sur le projet que j'ai créé qui
permet d'utiliser aujourd'hui la syntaxe CSS de demain**

### ⇢ _[cssnext](https://cssnext.github.io)_

---

Depuis la création d’Internet à aujourd’hui, les interfaces web ont bien
évolués. Les langages et méthodes aussi. On est passé de sites statiques à des
sites dynamiques, puis hautement dynamiques (la fameuse période 2.0…). Dans tous
ça, CSS n’a, à mon sens, que très peu évolué d’un point de vue des possibilités
du langage. Certains disent que la puissance des CSS réside dans la simplicité
de celles-ci. Ce qui n’est pas forcément faux. Ca se discute.

## CSS n’a ni variables, ni fonctions

Le langage des CSS n’a pas de côté dynamique. C’est lui avec lequel, à chaque
fois qu’on intègre une maquette graphique, on doit se taper tout de zéro. Il a
beau exister des [CSS « Reset »][1], [des frameworks CSS][2], [tout un tas de
grilles prête à l’emploi][3], [des composants de CSS réutilisables][4] avec
l’approche [objet][5], je n’ai jamais réellement été satisfait par ces méthodes,
que ce soit à cause des contraintes qu’impose la syntaxe (devoir mettre des
classes à tout va dans l’HTML ça peut vite devenir chiant dans un CMS), ou par
d’éventuelles limitations qui obligent à « trop » modifier la source du document
(pas assez de, ou trop de, ou juste ça me plait pas comment c’est fait).

## Comment faire pour avoir des variables et fonctions dans CSS ?

Bridé par le language, j’ai cherché des solutions car j’ai pas forcément envie
d’attendre CSS 4 qui sera surement pas officiel avant 20 ans (sachant que CSS 3
n’est encore qu’un brouillon et que CSS 2.1 est à peine ouvert aux
commentaires…) Du coup, voilà ce que j’ai recencé à ce jour:

- [Sass][6] dispo sur [GitHub][7]
- [LESS][8] dispo sur [GitHub][9]
- [Stylus][10] dispo sur [GitHub][11]

## Présentation des surcouches existantes aux langages des CSS

Voici des textes traduits des sites officiels, qui résument très bien les
outils. Puis s’ils résument pas bien, c’est pas de ma faute, c’est comme ça mais
ça montre qui est clair et qui ne l’est pas :)

### Sass

> Sass rend les CSS à nouveau amusant. Sass est une extension de CSS 3, en
> ajoutant règles imbriqués, variables, [mixins][12], l’héritage de sélection,
> et encore plus. Cela ce transforme en CSS standard, bien formaté, à l’aide
> d’outils en ligne de commande ou avec des plugins de frameworks web [-ou un >
>
> > petit outil avec GUI que je vous présenterais ;) ].
>
> Sass à 2 syntaxes. La principale (depuis Sass 3) est connu sous le nom de
> “SCSS » (pour “Sassy CSS”), et est un surensemble de la syntaxe CSS 3. Cela
> veut dire que du tout feuille de styles CSS 3 est aussi du SCSS valide. Les
> fichiers SCSS utilise l’extension .scss.
>
> La seconde sxyntaxe, plus ancienne, est connu comme la syntaxe indenté (juste
> “Sass”). Inspiré par le laconisme de [Haml][13], elle est destinée aux
> personnes qui préfèrent la concision. Au lieu de crochets et des
> points-virgules, elle utilise l’indentation des lignes pour spécifier les
> blocs. Bien que elle ne soit plus la syntaxe primaire, cette syntaxe
> continuera d’être pris en charge. Les fichiers de cette ancienne syntaxe
> utilisent l’extension .sass.

#### Petit exemple de code Sass avec la syntaxe Scss

```scss
// note : ceci est bien un commentaire valide avec sass. Au revoir les /**/

$blue: #3bbfce; // Variable
.content-navigation {
  border-color: $blue;

  // mixin
  color: darken($blue, 9%);

  // Imbrication
  li {
    font: {
      family: serif;
      weight: bold;
      size: 1.2em;
    }
  }
}

$margin: 16px;
.border {
  // operateurs
  padding: $margin / 2;
  margin: $margin / 2;
  border-color: $blue;
}
```

### LESS

> LESS étend CSS avec un comportement dynamique grâce à des variables, mixins,
> opérations et fonctions. LESS fonctionne à la fois sur côté-client (IE 6+,
> Webkit, Firefox) et côté serveur avec Node.js.

#### Petit exemple de code LESS

```less
.box-shadow (@x: 0, @y: 0, @blur: 1px, @alpha) {
  @val: @x @y @blur rgba(0, 0, 0, @alpha);

  box-shadow: @val;
  -webkit-box-shadow: @val;
  -moz-box-shadow: @val;
}

.box {
  @base: #f938ab;
  color: saturate(@base, 5%);
  border-color: lighten(@base, 30%);
  div {
    .box-shadow(0, 0, 5px, 0.4);
  }
}
```

### Stylus

> Stylus est un nouveau langage révolutionnaire, qui apporte une méthode
> efficace, dynamique et expressive pour générer des CSS.

#### Petit exemple de code Stylus

```stylus
border-radius()
  -webkit-border-radius arguments
  -moz-border-radius arguments
  border-radius arguments

body
  font 12px Helvetica, Arial, sans-serif

a.button
  border-radius 5px
```

## Quel langage choisir pour générer ses CSS ?

À la vue des syntaxe (toute assez proche), on sais bien qu’on parle de CSS. On
dégage 2 approches: une qui ajoute des possibilités à CSS sans modifier la
syntaxe d’origine (Scss, LESS), et une qui veut simplifier (Sass, Stylus). La
syntaxe ne fait pas tout, il faut aussi regarder la méthode de génération des
feuilles de style en CSS :

- Sass possède une méthode en ligne de commande qui va surveiller vos fichiers
  .sass ou .scss et va mettre à jour tout seul vos CSS,
- LESS possède pour le développement, un fichier javascript, et pour la
  production, un compilateur (ligne de commande),
- Stylus utilise une méthode de compilation (je n’ai pas été foutu de trouver un
  exemple clair rapidement)

Sass est basé sur Ruby, LESS et Stylus sur Javascript (Node.js). Tous les 3
peuvents être utilisé depuis d’autres langages pour peu que vous utilisiez des
interface comme [Assetic en PHP][14]. Globalement rien de bien différent, si ce
n’est que Sass possède des solutions pour gérer la génération depuis votre GUI
([SassSalon][15], [Compass.app][16] ), utile pour des designers qui n’aiment
souvent pas les lignes de commandes…

Ensuite il faut rentrer un peu dans le détail des fonctionnalités offertes, mais
je vous laisse prendre le temps de faire ça par vous même en consultant les
docs.

Sass a une base qui a du vécu et 2 syntaxes. LESS, lui, me parait un peu light,
et je n’aime pas trop le coup du compilateur js. Quant à Stylus je n’ai pas trop
pris le temps de faire des tests, mais il est encore assez jeune, quoique
prometteur.

Pour l’instant j’utilise Sass (avec la syntaxe scss), ma principale raison est
le framework [Compass][17] qu’on peut rajouter en surcouche. Sass et Compass
représente une grosse communauté et à eux 2 un bon gros tas de fonctions. Je
rentrerais un peu plus dans le détail avec Sass/Compass dans un prochain post.

Il me paraît aujourd’hui évident d’utiliser une de ces solutions et je ne suis
pas près de m’en passer (pas avant que CSS ne possède des variables et mixins en
tout cas), surtout à notre époque où chaque nouvelle propriété amusante des CSS
utilise un préfixe par navigateur (et peu donc vite devenir gerbant à
l’utilisation).

_En tout cas, il y’a du choix, alors passez à la vitesse supérieur avec vos CSS
!_

Edit: Depuis j’ai publié d’autres articles relatifs, un plus détaillé sur [la
solution Sass/Compass (et son installation)][18]puis un autre sur [comment se
passer des lignes de commandes avec Compass.app !][19]

[1]: http://cssresetr.com/
[2]: http://css.4design.tl/framework-css-semantique-maquette-dynamique-et-autres-notes
[3]: http://css.4design.tl/framework-css-mettez-vos-grilles-au-pas
[4]: https://github.com/stubbornella/oocss
[5]: http://fr.wikipedia.org/wiki/Objet_(informatique)
[6]: http://sass-lang.com/
[7]: https://github.com/nex3/sass "Sass sur Github"
[8]: http://lesscss.org/
[9]: https://github.com/less/less.js "LESS sur Github"
[10]: http://learnboost.github.io/stylus/
[11]: https://github.com/LearnBoost/stylus "Stylus sur Github"
[12]: http://fr.wikipedia.org/wiki/Mixin
[13]: http://haml.info/
[14]: https://github.com/kriswallsmith/assetic
[15]: https://github.com/hlb/SassSalon
[16]: http://compass.kkbox.com/
[17]: http://beta.compass-style.org/
[18]: /blog/fonctions-variables-css-generer-ses-css-avec-sass-compass/
[19]: /blog/compass-app-application-pour-compiler-css-sass-compass/
