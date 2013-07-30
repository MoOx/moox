# (Re) Installing your OS, with a tool to prepare you machine.

When you setup a new machine, you can choose to configure your workspace "by hand", install all your prefered apps & software, setup preferences etcetera.
This can be a pain in the ass, especially if you have multiple machine to handle. I just have 2 machines (+ the one of my wife) & it's so boring to repeat each stuff on each machine.
So you can do like I do, & like Github team does.
Using [Boxen](http://boxen.github.com/), a tool based on [Puppet](https://puppetlabs.com/puppet/what-is-puppet/).

(An alternative based on [Chef](http://www.opscode.com/chef/) also exist: [Pivotal Sprout](https://github.com/pivotal-sprout/sprout-wrap)).

At this point, you should just setup your Boxen. If you want to know more about Boxen right now, you can read my [post on this tool](#not-ready) (coming soon).
Or you can just [RTFM of Boxen](https://github.com/boxen/our-boxen#readme) & take a look to [all recipes available](https://github.com/boxen).

Now you have setup your-boxen, you can just follow my notes on how to reinstall a fresh OS X installation.

---

## Backup [time:30min,waiting:*h]

Save all your important file (some via BTSync, Dropbox, some on another HD).
This can includes :

Here is what I've on Dropbox :

	~/Library/Application Support
	~/Library/Fonts
	~/Library/Preferences
	~/Library/Messages

Here is what I share with BTSync :

	~/Music
	~/Movies
	~/Pictures

### Save Bootcamp partition

I try a lot of stuff, but Bootcamp is just shit since it use a old trick for MBR bla bla.
So forget that, & loose all your Windows data. Or just save what you need by hand (I just run some games so...)

---

## OS Install [time:10min,waiting:30min]

Make your OS clean install. Eventually use _Disk Utility_ to format for make a clean installation.

## Minimal OS configuration [time:2min]

* Finder Preferences
	* Show Path bar (alt+cmd+p)
	* Show Status bar (cmd+/)
* System Preferences
	* Mission Control
		* [ ] Show dashboard as a Space
		* [ ] Automatically rearrange Spaces...
		* Hot corners
			* bottom right : Put display to sleep
	* Energy Saver
		* Battery > sleep in 1h
		* Power Adapter > never sleep
	* Keyboard
		* [x] Show [...] viewers in menu bar

`/!\` Eventually install & configure a software like [Synergy](http://synergy-foss.org/download/?list) to be able to control/configure the fresh OS while you are working on another one.

## Update OS [waiting:5min~30min]

Use Software Updates right now before installing other stuffs & upgrade after that.

## Install XCode and/or Command Line Tools [waiting:1h~2h]

Boxen recommand full XCode, but if you are "in a hurry", you can try the CLI way (that will download just CL Tools).

### XCode.app [waiting:30min~1h]

From the AppStore, or copy it from a computer close to your :)
At the same time, get your app from AppStore.

#### Install Command Line Tools from app [waiting:30min]

XCode > Preferences > Downloads
`Command Line Tools	(Install)`

### CLI way (OS X > 10.9) [waiting:30min]

Just type in a terminal

	xcode-select --install

This will ask you to install Command Line Tools. This can take some minutes, not an hour like with XCode.app.

_Not sure if it's required:_ **Restart** to avoid issues with Boxen install & Command Line Tools.


---


## Get your Boxen [waiting:5min]

	sudo mkdir -p /opt/boxen
	sudo chown ${USER}:staff /opt/boxen
	git clone https://github.com/${USER}/our-boxen /opt/boxen/repo

While it's cloning repo, you can take a look to what it's inside.

* Here is what will be downloaded: [MoOx/our-boxen/Puppetfile](https://github.com/MoOx/our-boxen/blob/master/Puppetfile)
* What will be installed for all machine running this script: [MoOx/our-boxen/manifests/site.pp](https://github.com/MoOx/our-boxen/blob/master/manifests/site.pp)
* What will be installed for _MoOx_: [MoOx/our-boxen/modules/people/manifests/MoOx.pp](https://github.com/MoOx/our-boxen/blob/master/modules/people/manifests/MoOx.pp)

## Run Boxen script [time:1min,waiting:30min~1h30]

	cd /opt/boxen/repo
	script/boxen --no-fde

`/!\` You will need to type your sudo password then your Github login/passwd to run the sript, so don't grab you coffee too soon ;)

### Possible errors you might have

#### Bundler version

	Bundler is not compatible with Ruby 2.0 or Rubygems 2.0.
	Please upgrade to Bundler 1.3 or higher.
	Can't bootstrap, dependencies are outdated.

This can happen if like me, you are trying to use Boxen & an new (unsupported) OS X (10.9 in my case, while I'm writing this).

Stupid solution:

	sudo gem install bundler --pre

### Gem::Installer::ExtensionBuildError: ERROR: Failed to build gem native extension.

You forget to install XCode and/or Command Line Tools. Then restart.

## Retrieves your files [waiting:*h]

Cloud or local synced files & backup.

Start Dropbox, BTSync or similar

### Dropbox

	open /Applications/Dropbox.app

Dropbox Preferences

* [x] Use black and white menu bar icons

### BTSync

	open /Applications/BitTorrent\ Sync.app

Setup main secret key.
Eventually add more keys in `/Users/Shared` or in `/Volumes/Shared HD`.

_I advise you to open _Notifications Center_, scroll up & disable notifications for today :)_

### Backup

Restore you previous saved files.

**It's eventually time to take a nap now.**

## Setup saved preferences

Most of my preferences are saved in my Dropbox in `~/Dropbox/Library`.
I've a tiny shell script that remove some folders in `~/Library` to replace them with the ones in `~/Dropbox/Library`.

My shell script is in my dotfiles.

	//@todo script

## First run some apps

Run apps you want to open during startup & activate that option in _Preferences_.

	open /Applications/Alfred\ 2.app
	open /Applications/Cloud.app
	open /Applications/Dash.app
	open /Applications/Flux.app
	open /Applications/Flycut.app
	open /Applications/LimeChat.app
	open /Applications/Slate.app
	open /Applications/Shortcat.app
	open /Applications/Tunnelblick.app
	open /Applications/XtraFinder.app
	open /Users/${USER}/Dropbox/Applications/Utilities/Day-O.app

## Setup Internet Accounts

System Preferences > Internet Accounts

### If you have a good Twitter client with notifications

Remove duplicate OS X notifications: System Preferences > Notifications Center > Remove Twitter from center & choose "None" for alert style.

## Setup you Browser

Open you prefered browser, & setup sync.

## Setup MenuMeters

System Preferences > MenuMeters

## BOOTCAMP (I mean dual boot with Windows)

Since I use more that 1 partition on my machine (OS/soft + data), I can't use Bootcamp (& btw, Bootcamp way to install Windows is based on old hybrid MBR stuff bla bla…)

I used to make a manual hybrid GPT/MBR table using [gdisk](http://www.rodsbooks.com/gdisk/hybrid.html), but it's past.
GPT is used by default on Mac, on since latest mac run EFI 2.x, we can natively install & boot into Windows (via UEFI) on a GPT disk.
You "just need" to create a bootable Windows UEFI device. [Read more about MBR, GPT, Mac & stuff]

### Create a bootable Windows UEFI USB


// @todo


---

## @todo finish this post

---

# Old way, by hand
// @todo script that

### First thing to do

- Install an anti-thef solution like [Prey](preyproject.com)
- Install [DynDns Updater](http://dyn.com/support/clients/) if your want & maybe open an SSH access to your computer on a specific port (not ssh default port) - See later instruction for that part

- Setup a name to your computer

		# Setup od		
		sudo scutil --set HostName moox.dyndns-ip.com

### Setup System preference

##### OS X

###### Default system configurations

	# Remove quarantine
	defaults write com.apple.LaunchServices LSQuarantine -bool NO
	
	# Disable .DS_Store on network disk
	defaults write com.apple.desktopservices DSDontWriteNetworkStores true
		
	# Enable AirDrop over Ethernet and on unsupported Macs:
	defaults write com.apple.NetworkBrowser BrowseAllInterfaces -bool true

	# Hide iTunes annoying folder if you do not use original iTunes library folder
	chflags hidden ~/Automatically\ Add\ to\ iTunes.localized/
	
	# 'now playing' dock notification
	defaults write com.apple.dock itunes-notifications -bool TRUE
	defaults write com.apple.dock notification-always-show-image -bool TRUE
	killall Dock

	# To undo this
	#defaults delete com.apple.dock itunes-notifications
	#defaults delete com.apple.dock notification-always-show-image
	#killall Dock

##### System configuration via UI

  - General
    - Show scrollbar: When scrolling
    - Sidebar icon size: Small
  - Desktop
    - Customize wallpaper
  - Dock
    - Change size as you wish
    - Check Minimize windows into application icon
  - Mission control
    - Hot corners
      - Bottom Left: "Put display to sleep"
        - Do not be afraid to put display to sleep accidentaly, you will have to wait 1s in the corner before it take effect
  - Language & Text
    - Edit list as needed
  - Spotlight
    - Search Results: Edit list as needed
    - Privacy: Edit list (add others hard drive ?)
  - Universal Access
    - Check "Enable access for assistive devices"
  - Energy Saver
    - Adapt as you want
  - Mouse
    - If you use a mouse : Uncheck "Move content in the direction of finger…"
  - Mail, Contacts & Calendars
    - Add your accounts
  - Bluetooth
    - Disable, and uncheck "Show bluetooth status in menu bar"
  - Sharing
    - Think to share some files :)
- Finder Preferences
  - General
    - "New Finder windows show:" Downloads
  - Sidebar
     - uncheck All my files and iDisk
    - check your computer
- Remove icons you don't want into menu bar by command+click on them and move away

### OS X File explorer specific app

Install [XtraFinder](http://www.trankynam.com/xtrafinder/)

### Web browsing 

- Open defautl browser
  - Install [Google Chrome](https://www.google.com/intl/en/chrome/browser/) or your favorite browser & synchronize it

### Setup cloud sync service

- Download [Dropbox](https://www.dropbox.com/downloading?src=index) or similar & login to sync.

### Better screen lighting

Download & install [F.lux](http://stereopsis.com/flux/) app

### Add your custom .bashprofile or .bashrc

	# Delete .bashprofile
	@todo
	# Link bashprofile from your Cloud drive
	@todo

### Download a screenshot sharing service…

- …Like [CloudApp](http://getcloudapp.com)
  
### App Store or similar

- Open it & retrieve all your purchased app

### Install a decent Dev environnement


- Xcode (from App Store)
- Install [iTerm2](http://www.iterm2.com) ([download list](http://code.google.com/p/iterm2/downloads/list))

- Install [Oh My Zsh]
		
		wget --no-check-certificate https://github.com/robbyrussell/oh-my-zsh/raw/master/tools/install.sh -O - | sh
		chsh -s /bin/zsh

- Install a package manager is there is not (ex: for OS X [Homebrew](https://github.com/mxcl/homebrew/wiki/installation))

		/usr/bin/ruby -e "$(curl -fsSL https://raw.github.com/gist/323731)"
		# install some packages you use
		brew install wget unrar
		
		# Nginx
		brew install nginx
		
		# PHP with Unicode, FPM, MySQL & PostreSQL
		brew tap homebrew/dupes
		brew tap josegonzalez/homebrew-php
		brew install php54 --with-intl --with-mysql --with-pgsql
		cp /usr/local/opt/php54/homebrew-php.josegonzalez.php54.plist ~/Library/LaunchAgents/
		launchctl load -w ~/Library/LaunchAgents/homebrew-php.josegonzalez.php54.plist
		
		# For PostgreSQL, [if you have an issue about shared memory](http://stackoverflow.com/questions/10300750/postgresql-server-does-not-start)
		subl /etc/sysctl.conf
		
		# add
		kern.sysv.shmmax=16777216
		kern.sysv.shmall=65536
		
		# PEAR & PHPUNIT
		# if not already done, add php bin commands to your PATH in your .bash*
		#PATH="$(brew --prefix josegonzalez/php/php54)/bin:$PATH"
		sudo pear channel-discover pear.phpunit.de
		sudo pear channel-discover pear.symfony.com # for deps
		sudo pear install --alldeps phpunit/PHPUnit
		# If this is not working, check that the /usr/local/opt/php54/lib/php is in your include_path in the php.ini
		
		# Git-Flow
		brew install git-flow
		
		# Git-FTP deploy
		brew install git-ftp
		# config personal ftp
		git config --global git-ftp.url YOUR_VPS_SERVER
		git config --global git-ftp.user YOUR_VPS_FTP_USER
		git config --global git-ftp.password YOUR_VPS_FTP_PWD
		
		# For OS X, Rsync 3 if not present (to support hfs+)
		rsync --version
		brew install https://raw.github.com/adamv/homebrew-alt/master/duplicates/rsync.rb

- Install Ruby gems if not already present on your OS
		
	- Sass/Compass + Livreload
			sudo gem install sass compass compass-recipes guard-livereload

			# for Compass.app
			#sudo gem install tilt erb haml active_support

			# Compass development (install development dependencies)
			sudo gem install bundler
			cd $DIR_DEV/compass
			bundle install --binstubs devbin
			# Running core library and stylesheet tests
			#bundle exec rake test features
			# Running behavior tests
			#./devbin/cucumber

- Install some others dev tools

		# Yeoman
		curl -L get.yeoman.io | bash

- IE VMs
	
		curl -s https://raw.github.com/xdissent/ievms/master/ievms.sh | INSTALL_PATH="$HD/Users/MoOx/VMs/ievms" IEVMS_VERSIONS="6 9" bash

### Activate remote login (for personal use or emergency like thief)

On OS X
Start by changing default SSH port

	subl /private/etc/services
	
Add your own port

	ssh2             22222/udp  # SSH Remote Login Protocol
	ssh2             22222/tcp  # SSH Remote Login Protocol
	
Edit
	
	subl /System/Library/LaunchDaemons/ssh.plist
	
& Change
	
	<key>SockServiceName</key>
	<string>ssh2</string>


### Install some classic apps if not already present or from an App Store

- You watch Movies ? Install [VLC](http://www.videolan.org/vlc/index.html) or MPlayer (available on the App Store)
- Install [LibreOffice](http://www.libreoffice.org/download/) (+ MS Office ?)
- Install your favorites programs for fun/work like [Steam](http://store.steampowered.com/about/)
- For OS X, install [AppCleaner](http://www.freemacsoft.net/appcleaner/) (or TrashMe) to be able to really "uninstall" (I mean, delete prefs & similar stuffs)

### Link some files from your Sync Cloud service into

	ln -s $DIR_SYNC_BT/Applications/ ~/Applications
	ln -s $DIR_SYNC_BT/Development ~/Development

	# Files
	ln -s $DIR_DOTFILES/.bash_profile ~/
	ln -s $DIR_DOTFILES/.bash_history ~/
	ln -s $DIR_DOTFILES/.gitconfig ~/
	ln -s $DIR_DOTFILES/.slate.js ~/
	ln -s $DIR_DOTFILES/.zshrc ~/

	# Hide some files & folders on OS X
	chflags hidden $DIR_DOT_FILES
	chflags -h hidden ~/rsync_exclude.txt

#### OS X App pref sync

first of all, delete all local reference of prefs that you already have on your synced cloud drive
then link them all

	DIR_SYNC_DROPBOX=~/Dropbox
	cd ~/Library/Application\ Support/; ls -1 $DIR_SYNC_DROPBOX/Library/Application\ Support/ | sed 's/\ /\\\ /g' | xargs rm -rf
	
	ln -s $DIR_SYNC_DROPBOX/Library/Application\ Support/* ~/Library/Application\ Support


	cd ~/Library/PreferencePanes/; ls -1 $DIR_SYNC_DROPBOX/Library/PreferencePanes/ | sed 's/\ /\\\ /g' | xargs rm -rf
	ln -s $DIR_SYNC_DROPBOX/Library/PreferencePanes/* ~/Library/PreferencePanes
	
	cd ~/Library/Preferences/; ls -1 $DIR_SYNC_DROPBOX/Library/Preferences/ | sed 's/\ /\\\ /g' | xargs rm -rf
	ln -s $DIR_SYNC_DROPBOX/Library/Preferences/* ~/Library/Preferences

	sudo rm -rf ~/Library/Fonts; ln -s $DIR_SYNC_DROPBOX/Library/Fonts ~/Library/Fonts
	sudo rm -rf ~/Library/Messages; ln -s $DIR_SYNC_DROPBOX/Library/Messages ~/Library/Messages
	
	DIR_SYNC_BITSYNC=~/BTSync

	sudo rm -rf ~/iTunes; ln -s $DIR_SYNC_BITSYNC/iTunes ~/iTunes
	sudo rm -rf ~/Music; ln -s $DIR_SYNC_BITSYNC/Music ~/Music
	sudo rm -rf ~/Pictures; ln -s $DIR_SYNC_BITSYNC/Pictures ~/Pictures

	# Customize some icon (setfileicon is a custom command from my $DIR_SYNC/../bin included in my bashprofile)
	$OS_ICONS_DIR=/System/Library/CoreServices/CoreTypes.bundle/Contents/Resources

	setfileicon $OS_ICONS_DIR/MovieFolderIcon.icns ~/Applications/Multimedia
	setfileicon $OS_ICONS_DIR/UtilitiesFolder.icns ~/Applications/Utilities
	setfileicon $OS_ICONS_DIR/MovieFolderIcon.icns ~/Movies
	setfileicon $OS_ICONS_DIR/MusicFolderIcon.icns ~/Music

	setfileicon $OS_ICONS_DIR/GroupFolder.icns $HD/Users
	setfileicon $OS_ICONS_DIR/PicturesFolderIcon.icns $HD/Photos
	setfileicon $OS_ICONS_DIR/MusicFolderIcon.icns $HD/AudioBooks
	setfileicon $OS_ICONS_DIR/BurnableFolderIcon.icns $HD/Backup
	setfileicon $OS_ICONS_DIR/DownloadsFolder.icns $HD/Downloads
	setfileicon $OS_ICONS_DIR/ProfileBackgroundColor.icns $HD/Graphics
	#setfileicon $OS_ICONS_DIR/com.apple.iphone.icns $HD/iPhone


### Specific development installation 

#### RVM
	
	# install rvm - http://octopress.org/docs/setup/
	bash -s stable < <(curl -s https://raw.github.com/wayneeseguin/rvm/master/binscripts/rvm-installer)
	rvm install 1.9.3 && rvm use 1.9.3
	rvm rubygems latest
	
#### Middleman (static website gen)
	
	sudo gem install middleman middleman-blog rb-fsevent rdiscount

#### Node & NPM

	brew install node
	curl http://npmjs.org/install.sh | sh
	npm install -g grunt grunt-compass grunt-reload
	#npm install -g coffee-script
	# for appjs
	npm install -g node-gyp
	npm install -g appjs

### [Local mail with postfix relay](http://stevelorek.com/configure-postfix-relay-gmail-osx-lion.html)

### Enable local FTP Server

	sudo -s launchctl load -w /System/Library/LaunchDaemons/ftp.plist


### Git(hub) Configuration

[Token info](https://help.github.com/articles/creating-an-oauth-token-for-command-line-use)

	curl -u 'MoOx' -d '{"note":"Update token"}' https://api.github.com/authorizations
	
Copy your token from the token field & paste your token into ~/.github_token (`echo TOKEN > ./.github_token`), then

	git config --global user.name "Maxime Thirouin"
	git config --global user.email m@moox.io
	git config --global github.user MoOx
	git config --global github.token $(cat ~/.github_token)
	
#### [Github SSH Key](https://help.github.com/articles/generating-ssh-keys)

	cd ~/.ssh
	mkdir key_backup
	cp id_rsa* key_backup
	rm id_rsa*
	ssh-keygen -t rsa -C "m@moox.io"
	pbcopy < ~/.ssh/id_rsa.pub

[Paste clipboard content as a new key on your Github account settings](https://github.com/settings/ssh)

### Setup n64 emulator with high resolution textures
	
#### With Mupen64Plus

	ln -s ~/Dropbox/Games/n64/hires_textures ~/.local/share/mupen64plus/hires_texture
	
#### With wine
	brew install wine
	wine ~/Dropbox/Games/n64/project64_1.6.exe
	wine ~/Dropbox/Games/n64/RiceVideoSetup.exe
	ln -s ~/Dropbox/Games/n64/hires_textures ~/.wine/drive_c/Program\ Files/Project64\ 1.6/Plugin"
	wine ~/.wine/drive_c/Program\ Files/Project64\ 1.6/Project64.exe
	
#### With CrossOver

	# install crossover & project64 then 
	ln -s ~/Dropbox/Games/n64/hires_textures ~/Library/Application\ Support/CrossOver/Bottles/project64_1.6.exe/drive_c/Program\ Files/Project64\ 1.6/Plugin
