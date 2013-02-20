---
lang: fr
title: Configurer un Serveur Web Apache PHP MySQL sur OS X Lion
author: MoOx
layout: post
comments: true
permalink: blog/configurer-serveur-web-apache-php-mysql-sur-os-lion/
categories:
  - Server
  - Web Development
tags:
  - apache
  - mysql
  - OS X Lion
  - php
  - xdebug
---
Ayant mis à jour récemment mon système d’exploitation (OS X 10.6 *Snow Leopard* à **OS X 10.7 *Lion***), j’ai du réinstaller mon serveur web dessus.  
La précédente technique que j’avais utilisé était basé sur MacPorts, j’avais donc écris un article à ce sujet: [Installer Apache PHP MySQL sous Mac OS X](/blog/installer-serveur-web-apache-php-mysql-mac-os-x-macports/). Comme je l’expliquais dans cette article, cette solution est pour moi la plus intéressante lorsque l’on cherche un serveur web AMP complet.

  
Mais aujourd’hui, j’utilise lorsque j’ai besoin d’un vrai serveur digne de ce nom, j’utilise la virtualisation avec Vagrant et VirtualBox (cela fera peut être l’objet d’un autre billet) afin d’avoir un environnement proche de celui que j’ai en production.

Du coup, nativement sur mon Mac OS, je n’ai besoin que d’un simple **serveur web Apache/PHP/MySQL **. Rien qui casse la baraque, juste de quoi faire tourner quelques petits scripts (voir un WordPress) sans allumer une VM. Si vous cherchez une solution complète, ej vous invite à vous rendre sur mon lien ci-dessus.

## Activer Apache/PHP en quelques secondes sur OS X Lion

Maintenant que *OS X Lion* vient de sortir, les versions des logiciels qu’ils embarquent sont assez récente. **Apache 2** est juste à activer dans les préférences du système dans la partie qui concerne le *Partage* (*Sharing* si votre OS est en anglais)

<figure class="embed--unknown">
    <a href="medias/2011/07/OS-X-Lion-System-Preferences-Sharing.png">
        <img src="medias/2011/07/OS-X-Lion-System-Preferences-Sharing.png" alt="" title="OS-X-Lion--System-Preferences--Sharing" class="embed__media" />
    </a>
</figure>

<figure class="embed--unknown">
    <a href="medias/2011/07/OS-X-Lion-System-Preferences-Sharing-Web-Sharing.png"></a>
        <img src="medias/2011/07/OS-X-Lion-System-Preferences-Sharing-Web-Sharing.png" alt="" title="OS-X-Lion--System-Preferences--Sharing--Web-Sharing" class="embed__media" />
    </a>
</figure>

Vous pouvez vérifier en cliquant sur un des liens que Apache fonctionne bien. Vous devriez voir une page avec « It works ! ».

Ensuite il faut activer sur Apache le module PHP 5 (5.3.6). Rien de complexe.  
Avec Terminal.app (`/Application/Utilitaires/Terminal.app`), un coup de `sudo pico /etc/apache2/httpd.conf` devrait vous ouvrir le fichier de configuration d’Apache dans la console.

*Remarque: pour toutes les commandes qui commencent par `sudo` (Super Utilisateur DO), il vous est demandé un mot de passe. Utilisez celui de votre session (et ne vous inquiétez pas si vous ne voyez aucun caratère s’afficher lorsque vous tapez, c’est normal – sécurité des systèmes & co).*

Sinon avec le Finder <kbd>⇧</kbd>+<kbd>⌘</kbd>+<kbd>G</kbd> (Go to the folder). Entrez `/private/etc/apache2/httpd.conf` puis ouvrez `httpd.conf` (mais là vous devrez avoir les droits sur le fichiers pour le modifier – préférez donc la méthode du Terminal).  
Cherchez et décommentez dans le premier quart du fichier la ligne `LoadModule php5_module libexec/apache2/libphp5.so`. Il suffit d’enlever le **#** présent au début de la ligne.

## Installer MySQL sur OS X Lion

Pour installer MySQL simplement, il suffit d’utiliser les packages du site officiel: [http://dev.mysql.com/downloads/mysql/](http://dev.mysql.com/downloads/mysql/). 
Installez MySQL, puis le panneau de préférence afin de pouvoir activer/désactiver MySQL à souhait, ainsi que si vous en avez besoin, le paquet pour avoir MySQL avec qui démarre avec le système.  
Une fois les paquets installés, il reste à « brancher » PHP et MySQL ensemble.

Un petit tour dans la configuration de PHP pour ajuster le lien entre MySQL et PHP:  
Allez dans `/private/etc/` et copier `php.ini.default` en `php.ini`, ceci afin de pouvoir adapter la configuration. Modifier directement le `php.ini.default` ne servirait à rien.

Avec Terminal.app , rien de plus simple il vous suffit d’exécuter les lignes suivantes:  

```bash
# copie du fichier
sudo cp /private/etc/php.ini.default /private/etc/php.ini
# ouverture pour édition
sudo open -a TextEdit /private/etc/php.ini
```

Modifiez dedans (en plus de vos ajustements personnels) les valeurs des sockets pour MySQL : remplacez `/var/mysql` en `/tmp` aux différents endroits (pour l’extension [MySQL], [MySQLi] et [Pdo_mysql]) afin d’avoir un socket qui pointe sur `/tmp/mysql.sock` (valeur par défaut du package MySQL pour Mac OS X)

## Petite touche en plus : xDebug

xDebug est déjà présent sur le système dans `/usr/lib/php/extensions`, il suffit de l’activer.  
Ajouter dans votre php.ini (cf configuration de php ci-dessus)  

```ini
[xdebug]
zend_extension=/usr/lib/php/extensions/no-debug-non-zts-20090626/xdebug.so
; more option ?
```
  
Toutes les [options de xdebug](http://xdebug.org/docs/all_settings) sont disponibles accessible sur le site officiel.

Et voilà le tour est joué ! Vous voilà avec **Apache 2, PHP 5.3.6 et MySQL 5.5 et xDebug sur MAC OS X Lion 10.7 !**
