---
date: 2011-03-31
lang: fr
title: Installer Apache PHP MySQL sous Mac OS X
tags:
  - os x
  - apache
  - homebrew
  - mysql
  - php
---

⚠️ **Note: Cette article est déprécié. Voyez plutôt le lien suivant si vous êtes
débutant, ou tournez-vous vers [Homebrew][6] si vous êtes plus averti(e).**

_Pour une version plus simple à mettre en place,
[voyez comment activer les versions natives d'Apache et PHP ainsi que comment télécharger et installer MySQL](/blog/configurer-serveur-web-apache-php-mysql-sur-os-lion/)._

Une des premières choses à faire pour un développeur web comme moi, c’est
d’avoir **un environnement de développement pour travailler en local**. C’est
sûr que ça peut paraître la base comme ça, mais à l’époque où j’étais encore
sous Windows, j’ai déjà vu des gros noobs se taper de l’upload par FTP à chaque
sauvegarde de fichiers. Et ouais. Avec sauvegarde par bouton en forme de
disquette et upload par glisser déposer… Si si…

Enfin bref. _Installer un serveur web local sur OS X_ basé sur
**Apache/PHP/MySQL** peut se faire de plusieurs manières :

- [Activer le serveur web installé par défaut sur
  Mac](/blog/configurer-serveur-web-apache-php-mysql-sur-os-lion,
- Installer la solution [XAMPP][1] des amis d’apache,
- Installer la solution [MAMP][2],
- Installer la solution [Zend Server (Community Edition)][3],
- Utiliser une solution à partir d’un gestionnaire de paquet tel que
  [MacPorts][4], [Fink][5] ou [Howbrew][6],
- Se démerder avec du code source et tout compiler soit même !

## Quelle solution choisir pour son serveur web sous Mac OS X ?

Petit à petit j’ai eu l’occasion d’essayer toutes les solutions. J’ai commencé
sans me prendre la tête par la solution built-in mais j’y ai vite vu des
limitations dès lors que j’ai eu besoin de plus de libertés sur PHP (version,
extensions etc). Pour activer le _serveur web_, il suffit d’aller dans les
préférences d’OS X, puis de se rendre dans « Sharing » (Partage) et d’activer
« Web sharing » (Partage web).

Je ne suis pas fan de **XAMPP**, ne me demandez pas pourquoi. Je me rappelle
l’avoir installé et l’avoir supprimé dans l’heure qui suit (que ce soit sous
Windows, Ubuntu ou OS X)…

J’ai donc essayé **MAMP**, qui a comme inconvénient de nécessiter un démarrage
manuel. Pour un développeur web comme moi qui passe 80% de son temps à coder sur
sa machine, rien que ça peut devenir pénible. M’enfin si c’est que ça y’a la
version PRO (payante). Okay, au suivant.

**Zend Server (CE)** est vraiment pas mal, dans le sens une majeur partie de la
configuration PHP se fait via une interface web. Dans ce sens ça rejoint WAMP
pour la facilité de configuration (activer/désactiver une extension, mettre à
jour des valeurs du php.ini…). La webapp tourne sous lighttpd ce qui fait que si
vous pétez votre conf Apache (qui elle se fait à la main), la webapp n’en dépend
pas et peut toujours fonctionner. Zend Server est d’office avec la plupart des
extensions dont j’ai pu avoir besoin depuis que j’ai mon Mac (à ce jour plus
d’un an). J’ai vraiment trouvé cette solution élégante, sans prise de tête. Y’a
même un driver mssql pour vous dire (il me semble que ça m’a manqué dans
certaines des solutions ci-dessus) !

Récemment j’ai eu de nouveaux besoins pour mon job. Une extension qui n’était
pas dans Zend Server (client Solr pour l’anecdote), j’ai donc testé une solution
basée sur une gestionnaire de paquet, ce qui m’a rappelé les bons côtés des
distributions Linux avec leurs packages. Pour le choix du gestionnaire je me
suis orienté vers MacPorts non pas parce qu’il est supérieur, mais parce que les
2 autres (Fink et Homebrew) n’ont pas assez de paquets pour PHP (tout
simplement). MacPorts en recense une centaine sur la recherche « php ». Fink
environ 50, et Homebrew même pas une dizaine. Howbrew aurait l’avantage d’être
beaucoup plus rapide que les 2 autres solutions, mais à comme principe de base
de ne pas dupliquer un paquet déjà présent sur le système OS X. Et comme
Apache/PHP sont déjà présents (bien que la version ne soit pas à jour et les
extensions présentes ne se bousculent pas), il faut utiliser d’autres sources…
Donc je me suis simplement orienté vers **MacPorts** :

> The MacPorts Project is an open-source community initiative to design an easy-to-use system for compiling, installing, and upgrading either command-line, X11 or Aqua based open-source software on the [Mac OS X](//www.apple.com/osx/) operating system. To that end we provide the command-line driven MacPorts software package under a [BSD License](//opensource.org/licenses/bsd-license.php), and through it easy access to thousands of ports that [greatly simplify](//guide.macports.org/#introduction) the task of [compiling and installing](//guide.macports.org/#using) open-source software on your Mac.

Pour installer **MacPorts** rien de difficile : on se rend sur le site officiel
du projet, on télécharge l’image disque puis on installe ça facilement
(pré-requis : il faut avoir XCode et X11 d’installer sur sa machine, tous les 2
sont dispos sur les DVD d’applications fournies avec votre Mac). Après ça dans
notre Terminal on a accès la commande **port** qui permettra de faire des
équivalents d’apt-get / aptitude sous Linux. La grosse différence, qui est ses
avantages et inconvénients c’est que ça compile les sources sur votre machine.
Avantage : précision pour les options sur les paquets. Inconvénient : temps
d’installation (surtout pour les premiers paquets).

## Installation des paquets Apache, PHP, MySQL avec MacPorts

Passons donc au nécessaire. Installer Apache et le server mysql. PHP est
installé juste après avec quelques petites spécificités éventuelles. Pour ce
faire, dans votre _Application > Utilitaires > Terminal.app_, exécutez les
commandes suivantes et ne soyez pas pressé, allez vous faire un café, prenez
votre smartphone et allez [péter des cochons][7] quelques minutes sur votre
trône :

```bash
sudo port install apache2 mysql5-server
```

Si c’est votre première fois avec **port**, vous comptez au moins une bonne
douzaine de minutes le temps que les premiers paquets se compilent.

Une fois ceci fait, on va compiler et installer PHP 5 avec les options de
compilation (+\*) pour Apache, MySQL et PEAR ([PEAR quesako ?][8])

```bash
sudo port install php5 +apache2 +mysql5 +pear
```

Là encore ça peut prendre du temps.

Ensuite on passe aux paquets de base, manière de ne pas avoir à installer un
paquet toutes les 2h à chaque « *Fatal Error : Class not found* » :)

_Note: N’ayez pas peur de copier les commentaires des les lignes de codes dans
votre terminal, ça reste des commentaires, même pour un terminal ;)_

```bash
# usefull packages
sudo port install php5-apc php5-curl php5-ftp php5-gd php5-gettext php5-iconv php5-imagick php5-ldap php5-pcntl php5-pdflib php5-mbstring php5-mcrypt php5-memcached php5-soap php5-uploadprogress php5-xdebug php5-xmlrpc php5-zip
# database related packages
sudo port install php5-odbc php5-mysql php5-sqlite
```

A vous de voir ce qui vous intéresse dans la liste, mais la plupart sont des
classiques (et encore il en manque peut-être)

Pour la liste des paquets, vous avez un énorme choix et [vous pouvez parcourir
la liste sur le site][9]

Mémo à moi-même : pour mon boulot j’ai dû me rajouter ces 3 paquets (oui oui
j’ai besoin du driver mssql…)

```bash
sudo port install php5-solr freetds php5-mssql
```

Ensuite il reste quelques petites modifs avant d’avoir un environnement fin
prêt.

## Configuration d’Apache

On active PHP5 au niveau d’Apache

```bash
# activate php5 module for apache
cd /opt/local/apache2/modules
sudo /opt/local/apache2/bin/apxs -a -e -n "php5" libphp5.so
```

Il faut maintenant préciser à Apache que les fichiers index.php peuvent être les
fichiers index par défaut. Pour ce faire, il faut éditer le
fichier /opt/local/apache2/conf/httpd.conf et rechercher « DirectoryIndex
index.html »

```ini
; add "index.php" at the end
DirectoryIndex index.html index.php
```

On peut aussi ajouter la conf du module apache php (en fin de fichier ?)

```apache
Include conf/extra/mod_php.conf
```

Ayant déjà vécu un paquet de reinstall système, j’ai l’habitude de mettre mes
configs dans mes dossiers perso indépendamment du système, voilà donc ce que
j’ai ajouté en à la fin du httpd.conf.

```apache
Include /Users/YOUR-USERNAME/Dropbox/Servers/conf/development/*
```

Vous remarquerez que j’ai mis ça sur ma [Dropbox][10] (comme je suis rassuré
d’avoir tous mes petits fichiers au chaud bien à l’abri d’un hardreset :) ). [Je
vous invite à faire pareille][11], ça ne coûte rien et c’est tellement pratique
d’avoir un mega dossier synchro entre ses différentes machines (smartphone
inclus) !

Après avoir modifié la conf **Apache**, il faut bien sur penser à redémarrer le
serveur pour que la nouvelle configuration soit prise en compte:

```bash
sudo /opt/local/apache2/bin/apachectl -k restart
```

Ceci doit être fait dès que vous modifiez votre httpd.conf (ou apache2.conf
selon), pensez-y quand vous ajouterez des virtual hosts !

## Configuration de PHP

On doit créer un fichier de configuration de PHP. On copie donc la version par
défaut de développement. Puis vous pouvez prendre le temps d’éditer ce nouveau
php.ini pour l’adapter à vos besoins.

```bash
# create a default php.ini
sudo cp /opt/local/etc/php5/php.ini-development /opt/local/etc/php5/php.ini
# open it to customize
sudo open /opt/local/etc/php5/php.ini
```

Prenez 2 secondes pour éviter des warnings avec les fonctions/classes date, time
etc… en ajoutant ceci à la fin du fichier php.ini

```ini
# set a default timezone for your server
date.timezone="Europe/Paris"
```

## Configuration de MySQL

Il reste à configurer  notre serveur de base de données SQL.

Pendant qu’on est encore chaud sur le php.ini, on en profite pour adapter les
réglages MySQL. Voilà ce qui va être nécessaire (_cherchez dans le fichier les
clés de configs et modifiez les comme ici_)

```ini
# edit php.ini to add default mysql socket
# ...
pdo_mysql.default_socket=/tmp/mysql.sock
# ...
mysql.default_socket = /tmp/mysql.sock
```

Une fois ceci fait, on va vraiment configurer MySQL

```bash
# mysql installation
sudo -u mysql mysql_install_db5
```

Ensuite on défini les fameuses sockets pour php (entre autres) dans le
fichier /opt/local/etc/mysql5/my.cnf

```bash
# create file if not exists
sudo touch /opt/local/etc/mysql5/my.cnf
# open it
sudo open /opt/local/etc/mysql5/my.cnf
```

Voilà les ajouts/modifications à apporter

```ini
# add this into the configuration file, or edit current settings
[mysqld_safe]
socket = /tmp/mysql.sock
[mysqld]
socket=/tmp/mysql.sock
[client]
socket=/tmp/mysql.sock
```

Il y’en a peut être beaucoup mais il vaut mieux trop que pas assez.

## Activer Apache PHP et MySQL au démarrage de votre machine

Vous remarquerez que les paquets qui nécessitent de fonctionner en tant que
serveur (apache, mysql…) doivent être démarrés à la main. Mais si vous avez
l’oeil, lors des compilations, des commentaires similaires à celui-ci vous
indique comment faire simplement.

```bash
###########################################################
# A startup item has been generated that will aid in
# starting apache2 with launchd. It is disabled
# by default. Execute the following command to start it,
# and to cause it to launch at startup:
#
# sudo port load apache2
###########################################################
```

Donc pour loader Apache et MySQL au démarrage, rien de plus simple:

```bash
sudo port load apache2 mysql5-server
```

## Les petits plus

### Installer PHPUnit sur Mac OS X

Quand on est un développeur digne de ce nom, on se doit de faire des [tests
unitaires][12]. Voilà comment ajouter le nécessaire à votre configuration. Et
c’est là que PEAR est nécessaire !

```bash
# install phpunit
sudo pear channel-discover pear.phpunit.de
sudo pear install --alldeps phpunit/PHPUnit
```

Si vous avez des soucis avez les lignes commandes ci-dessus, comme quoi il vous
manque des dépendances, voici de quoi faire

```bash
sudo pear channel-discover pear.phpunit.de
sudo pear channel-discover pear.symfony-project.com
sudo pear channel-discover components.ez.no
sudo pear install phpunit/PHPUnit
```

### Installer Memcache

Memcache, un système de cache bien sympatique utilisable en PHP (entre autres)
peut s’installer simplement grâce aux MacPorts. Il suffit d’installer 2 paquets,
puis éventuellement de lancer ça au démarrage de la machine.

```bash
# Install the executable and the bindings for PHP5
sudo port install memcached php5-memcached

# Verify that the executable exists in your path
which memcached
# output something like /opt/local/bin/memcached

# Start memcached for the current session
memcached -d -m 24 -p 11211

# Configure memcached to execute on startup, if desired
sudo port load memcached
```

Avec tout ça, vous devrait être fin prêt pour attaquer du code ! Il reste
maintenant à bien configurer Apache, avec des virtual hosts mais ça fera peut
être l’objet d’un autre post.

[1]: http://www.apachefriends.org/
[2]: http://www.mamp.info/
[3]: http://www.zend.com/fr/products/server/free-edition
[4]: http://www.macports.org/
[5]: http://www.finkproject.org/
[6]: http://mxcl.github.io/homebrew/
[7]: http://www.rovio.com/en/our-work/games/view/1/angry-birds "Voir au site du jeu Angry Birds"
[8]: http://pear.php.net/ "Accéder au site de PEAR (PHP Extension and Application Repository)"
[9]: http://www.macports.org/ports.php?by=name&substr=php5 "Accéder à la liste des paquets php5 sur le site de MacPorts"
[10]: https://www.dropbox.com/referrals/NTE0MTA4MTg1OQ
[11]: https://www.dropbox.com/referrals/NTE0MTA4MTg1OQ "Créer votre compte Dropbox gratuitement !"
[12]: http://fr.wikipedia.org/wiki/Test_unitaire

\*[PEAR]: PHP Extension and Application Repository
