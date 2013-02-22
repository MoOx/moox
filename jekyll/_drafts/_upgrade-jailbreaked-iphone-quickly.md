Mise à jour Firmware iPhone et jailbreak

En tant que possesseur d'un iPhone un peu geek, je me vois dans l'obligation de jailbreaker mon iPhone afin de pouvoir mettre des petits tweaks dessus que ce soit pour avoir un mode landscape ou un émulateur SNES (mon jeu favori étant A Link To The Past).

Un chose pénible lors d'upgrade système de l'iPhone, c'est de devoir re-jailbreaker son iPhone, et de gérer tous les paquets qu'on a pris le temps d'installer. C'est rapidement pénible de devoir retrouver les sources et les ajouter à Cydia, puis de retélécharger les applications.

Pour éviter ce bordel monstre (ça peut facilement prendre une heure en tout), il existe une super petite appli disponible sur Cydia: OpenBackup.

Avant de faire sa mise à jour, il faut :

* Sauvegarder vos sources dans Cydia (en copiant, où à la main)
* Il faut faire un Backup avec OpenBackup. Il suffit d'ouvrir l'application et de faire "Backup".
* Après ça on fait un classique backup depuis iTunes, et on procède à la mise à jour du firmware + restauration.
* Jailbreakez votre iDevice (iPhone, iPad, iPod Touch, AppleTV)
* Lancez Cydia (qui va préparer le système iOS afin qu'il soit fin près à être utilisé jailbreaké), puis installez OpenSSH & OpenBackup depuis Cydia.
* Remettre les sources dans Cydia (via le fichier ou manuellement)
* Lancer OpenBackup et faire "Restore", ça prends quelques minutes, et ça reboot tout seul.


Là il se peut qu'il manque encore quelque applis, il suffit de re-synchroniser votre iOS avec iTunes (si vous rencontrer un soucis avec d'éventuelles applis crackés, réinstallez AppSync via Cydia)

Tous les apps de Cydia qui utilise des fichiers directement dans le système de fichiers d'iOS (ex: WinterBoard, Emulateurs) posent problème, car les fichiers ne sont pas sauvegarder dans les backup de l'iOS. Il faut donc avant copier le contenu des dossiers que vous avez remplis à la main (ex: <code>/Library/Themes</code> ou <code>/private/var/mobile/Media/ROMs</code> )
Donc si vous aviez un thème WinterBoard, il vous faut juste le retransférer puis le réactiver. Même problème pour les ROMs de vos émulateurs :)

Du coup montre en main, ça prends 20 minutes tout au plus.
