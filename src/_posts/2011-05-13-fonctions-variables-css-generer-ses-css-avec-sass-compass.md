---
lang: fr
title: Fonctions et variables CSS avec Sass et Compass
author: MoOx
layout: post
comments: true
permalink: blog/fonctions-variables-css-generer-ses-css-avec-sass-compass/
categories:
  - CSS
  - French
  - Web Development
tags:
  - compass
  - css
  - framework
  - less
  - sass
---

<figure class="flex-media--3-1"><a href="http://sass-lang.com/"><img class="flex-media__item" src="{{ site.baseurls.medias }}/2011/05/sass.jpg" alt="sass" /></a></figure>

Comme je l’ai expliqué dans mon précédent article, aujourd’hui il est possible de passer la vitesse supérieure avec ses CSS, afin d’avoir à sa disposition [variables et fonctions CSS][1]. Voici donc un petit mémo concernant la solution que j’ai choisi [Sass][2] avec la librairie Compass.  

Pour vous donner l’eau à la bouche, voici une petite vidéo que j’ai trouvé sur le site de Compass.

<figure class="flex-media--4-3">
  <iframe class="flex-media__item" src="http://player.vimeo.com/video/11671458" frameborder="0" webkitAllowFullScreen mozallowfullscreen allowFullScreen></iframe></figure>
[An introduction to Compass][3] from [Lorin Tackett][4] on [Vimeo][5].

## Pourquoi j’ai choisi **Sass**

Après avoir comparer 2 solutions (LESS et Sass) j’ai rapidement vu que Sass proposait un nombre supérieur de fonctions de base. Ne serait ce que un simple `rgba(#fff, .8)` impossible en CSS ou avec LESS. Allez faire un tour sur les documentations respectives de [Sass][6] et [LESS][7]. Je vous laisse libre arbitre pour ce choix qui vous appartient.  
Ensuite j’ai cherché des librairies. Pour Sass, sans aucun doute, [Compass][8] est le parfait complément. Pour LESS, j’ai trouvé [Bootstrap.less][9] qui à l’air pas mal non plus, bien que bien moins complet que Compass en terme de fonctionnalités.  
Après ce petit comparatif, j’ai eu le ressenti que le combo Sass / Compass avait l’air plus abouti que LESS. Mon choix s’est donc porté sur ces 2 projets.

Si Sass vous intéresse toujours, vous pouvez continuer la lecture ;) 

## Utiliser des variables et fonctions CSS avec Sass

Afin de pouvoir utiliser Sass, il faut installer les paquets nécessaires à son bon fonctionnement. Heureusement c’est pas bien compliqué.  
Si vous êtes sous Mac OS X, c’est même très simple car cela nécessite Ruby et Ruby Gem qui sont déjà installé sur ce système.  
Pour les autres il suffira d’installer ces 2 paquets.

Sous une distribution linux ça devrait ressembler à :  

```bash
sudo aptitude install ruby rubygems
```

Sous Windows il faudra installer ça avec un [installeur Ruby][10].

Maintenant, on vérifie que Ruby et RubyGem sont bien présents :  

```bash
# we check that ruby exists
which ruby
# this command should return something like /usr/bin/ruby

# same thing for gem
which gem
# /usr/bin/gem
```

Une fois qu’on a RubyGem d’opérationnel, on peut installer Sass de la façon suivante :  

```bash
# sudo is probably required if you are not logged as root
sudo gem install sass
```

Une fois ceci fait, faites un petit tour sur le [tutorial Sass][11] afin de faire un petit test pour vérifier que tout marche bien.

On crée un fichier test.scss avec le code suivant :  

```css
body {
    color: rgba(#fff, .8);
}
```

Ensuite on lance le binaire Sass depuis le dossier où se trouve le fichier de test :

```bash
sass --watch test.scss:style.css
```

On vérifie que le fichier contient bien du code css valide.  
Et pour vérifier que l’aspect de tracking des modifications on peut modifier le fichier ainsi:

```css
body {
    color: darken(rgba(#fff, .8), 10%);
}
```

On peut vérifier que la CSS a bien été modifié.

### Structure et Importation des fichiers Sass

Une autre chose à savoir au niveau de Sass, très importante, et surtout très pratique : si vous avez un fichier SCSS ou Sass que vous souhaitez importer, mais que vous ne souhaitez pas voir compiler en fichier CSS, vous pouvez ajouter un underscore au début du nom de fichier. Du coup tous les fichiers qui commencent par _ ne sont pas compiler en .css, mais par contre peuvent être inclus dans vos .scss. Cela permet de créer une librairie avec [des fichiers Sass partiels][12].

Exemple de structure de dossier/fichiers SCSS :


```
/partials/
    _header.scss
    _body.scss
    _footer.scss
style.scss
```

style.scss contiendra des includes :

```scss
@import "partials/header";
@import "partials/footer";

@import "partials/body";

// some others rules ?
```

La librairie Compass utilise se système à outrance ([la preuve sur le Github de Compass][13]) :) Pratique non? 

<del datetime="2011-05-13T06:32:42+00:00">Superbe</del> transition : je vous propose de passer à l’étape 2 avec Compass.

## La librairie Compass<figure>

<figure class="flex-media--3-1"><a href="http://compass-style.org/"><img class="flex-media__item" src="{{ site.baseurls.medias }}/2011/05/compass.jpg" alt="compass" /></a></figure>

Maintenant que vous êtes équipé de la boite à outils CSS, il faut bien commencer à la remplir !  
Pour ce faire je vous propose d’installer la super [librairie Compass][8] qui comporte moult fonctionnalités utile pour [utiliser du CSS 3 sans les préfixes dans tous les sens][14] ou [générer des sprites CSS sans prises de têtes][15]. Rien que ça, ça vaut le détour !  
Hop hop on installe Compass, aussi vite que Sass :  

```bash
sudo gem install compass
```

Du coup une fois Compass installé, on ne va plus utiliser directement Sass, mais le binaire compass. Tout est parfaitement clair dans [le Tutorial de base sur le site de Compass][16] *(pour peu que vous ne soyez pas anglophobe)*  
Pour donner un petit exemple de création de projet :

```bash
compass create test-project
cd test-project
compass watch
```

Dès maintenant, vous pouvez créer et modifier dans ce dossier des fichiers .scss (ou .sass). Le processus de surveillance de Compass va automatiquement compiler vos feuilles de styles dans le répertoire contenant les CSS, et ce à la moindre modification.

Je vous laisse maintenant vous amuser avec ces nouveaux joujoux ! Profitez bien !

**Et si vous avez besoin de quelques fonctions Sass utilisant Compass, j’ai un petit repo Github [Compass-Recipes][17]. N’hésitez pas à y contribuer si vous vous sentez l’âme de Git-eur :) **

*Je vous conseille vivement de parcourir les documentations respectives de Sass et Compass, non pas pour tout apprendre d’un coup, mais plutôt afin d’entre-apercevoir l’étendu des possibilités !*

Et maintenant, [je vous explique comment se passer des quelques lignes de commandes lorsque l’on utilise Compass souvent, grâce à une petit appli compatible Mac OS X, Linux (et même Windows) ;) ][18]

 [1]: /blog/utiliser-des-variables-fonctions-css "Utiliser des variables et fonctions CSS, c’est possible !"
 [2]: http://sass-lang.com/
 [3]: http://vimeo.com/11671458
 [4]: http://vimeo.com/ltackett
 [5]: http://vimeo.com
 [6]: http://sass-lang.com/docs/yardoc/file.SASS_REFERENCE.html
 [7]: http://lesscss.org/#docs
 [8]: http://compass-style.org/
 [9]: http://markdotto.com/bootstrap/
 [10]: http://rubyinstaller.org/
 [11]: http://sass-lang.com/tutorial.html
 [12]: http://sass-lang.com/docs/yardoc/file.SASS_REFERENCE.html#partials
 [13]: https://github.com/chriseppstein/compass/tree/stable/frameworks/compass/stylesheets
 [14]: http://compass-style.org/reference/compass/css3/
 [15]: http://compass-style.org/reference/compass/utilities/sprites/
 [16]: http://compass-style.org/help/
 [17]: https://github.com/MoOx/Compass-Recipes
 [18]: http://moox.fr/blog/compass-app-application-pour-compiler-css-sass-compass/
