---
date: 2011-05-23
lang: fr
title: "Compass.app, une application qu'elle est bien pour compiler ses CSS avec Sass / Compass"
tags:
  - css
---

<figure class="flex-media--3-1">
  <a href="http://compass-style.org/">
    <img class="flex-media__item" src="/media/2011/05/compass.app_.jpg" alt="compass app" />
  </a>
</figure>

Suite à mes précédents articles sur [les pré-processeurs CSS qui permettent
d’utiliser des variables et fonctions][1], et [un petit tutoriel sur
l’installation et utilisation du combo Sass/Compass][2], voici la présentation
d’un petite application, qui permet de s’affranchir des toujours utiliser des
lignes de commandes pour lancer Compass.

Voici une petite vidéo d’intro (sans son) provenant du [site officiel de
Compass.app][3]

C’est quand même plus sympa d’avoir une petite appli discrète, avec les
notifications systèmes ! Quelques options sont configurables via un menu (pour
activer/désactiver certains types de notifications, ou spécifier la version de
compass à utiliser).

Des versions compilés de l’application sont disponibles à la vente sur le site,
mais l’application est Open-Source et il est bien indiqué dans la doc du
[repository Github de Compass.app][4] que nous pouvons librement le compiler.

Pour mémo, voici de quoi l’installer (sur Mac OS X, doit donc fonctionner sur
Linux, voir même Windows avec une petite adaptation pour les paths) :

## Prérequis à la compilation de Compass.app

1. Avoir Java installé (vérifier avec `java -version`)
2. [Télécharger la dernière version de jRuby][5] zippé (jRuby est un trip entre
   java et ruby, d’après ce que j’ai compris ça permet de coder un app java en
   ruby)
3. Dézippé jRuby dans `/usr/local/`
4. Renommer en jruby (au lieu d’un jruby-1.x)

## Compass.app

En ligne de commande,

```bash
# pour la session en cours, on ajoute jruby dans le path pour simplifier les appels
PATH=/usr/local/jruby/bin:$PATH
# installation d'un gem depuis jruby (autrement ça marche pas)
jruby -S gem install rawr

# ensuite créé un emplacement pour récupérer les sources de Compass.app
mkdir ~/Applications/CompassApp
cd ~/Applications/CompassApp
# on clone depuis github
git clone git://github.com/handlino/CompassApp.git "CompassApp"

# et on compile (un peu de patience)
./bin/build-all.sh
```

Vous trouverez ensuite les applis compilés et zippé pour Mac, Linux et Windows
dans ./packages

## Mise à jour de Compass.app

Pour faire une mise à jour (de temps en temps)

```bash
PATH=/usr/local/jruby/bin:$PATH
jruby -S gem update
cd ~/Applications/CompassApp
git pull
./bin/build-all.sh
```

Là encore il vous reste à réinstaller la version compilé (dézipé et
déplacement).

Certains risques de se demander pourquoi je n’ai pas ajouté jruby à mon PATH de
manière permanente, c’est tout simplement car il y’a des binaires en double (ex:
gem).

Bonne utilisation de Compass ;)

[1]: /blog/utiliser-des-variables-fonctions-css/
[2]: /blog/fonctions-variables-css-generer-ses-css-avec-sass-compass/
[3]: http://compass.kkbox.com/
[4]: https://github.com/KKBOX/CompassApp
[5]: http://jruby.org/download
