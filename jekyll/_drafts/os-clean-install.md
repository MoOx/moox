# (Re) Installing your OS

## Before

Save all your important file (some on the cloud (Dropbox or similar) or another hard disk if it's on the same as your OS)

## OS Install

Make your OS clean install.

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
	
	HD=/Volumes/HD

	DIR_SYNC=~/Dropbox
	DIR_DOT_FILES=$DIR_SYNC/Home
	ln -s ~/../../Dropboxs/$USER/Dropbox ~/Dropbox

	ln -s $DIR_SYNC/Applications/ ~/Applications
	ln -s $DIR_SYNC/Development ~/Development
	ln -s $DIR_SYNC/Sites ~/Sites
	>

	# Files
	ln -s $DIR_DOT_FILES/.bash_profile ~/
	ln -s $DIR_DOT_FILES/.bash_history ~/
	ln -s $DIR_DOT_FILES/.compass-ui ~/
	ln -s $DIR_DOT_FILES/.ssh ~/
	ln -s $DIR_DOT_FILES/.gitconfig ~/
	ln -s $DIR_DOT_FILES/.subversion ~/
	ln -s $DIR_DOT_FILES/rsync_excludes.txt ~/rsync_exclude.txt

	# Folders
	ln -s $DIR_DOT_FILES/.oh-my-zsh/ ~/.oh-my-zsh
	ln -s $DIR_DOT_FILES/.zsh-update ~/.zsh-update
	ln -s $DIR_DOT_FILES/.zshrc ~/.zshrc

	# Hide some files & folders on OS X
	chflags hidden $DIR_DOT_FILES
	chflags -h hidden ~/rsync_exclude.txt

#### OS X App pref sync

	# first of all, delete all local reference of prefs that you already have on your synced cloud drive
	cd ~/Library/Application\ Support/; ls -1 ~/Dropbox/Library/Application\ Support/ | sed 's/\ /\\\ /g' | xargs rm -rf
	# then link them all
	ln -s ~/Dropbox/Library/Application\ Support/* ~/Library/Application\ Support
	# and some more
	rm -rf ~/Library/PreferencePanes; ln -s $DIR_SYNC/Library/PreferencePanes/ ~/Library/PreferencePanes
	rm -rf ~/Library/Preferences; ln -s $DIR_SYNC/Library/Preferences/ ~/Library/Preferences
	rm -rf ~/Library/Fonts; ln -s $DIR_SYNC/Library/Fonts ~/Library/Fonts

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

Paste your token into ~/.github_token, then

	git config --global user.name "Maxime Thirouin"
	git config --global user.email m@moox.fr
	git config --global github.user MoOx
	git config --global github.token $(cat ~/.github_token)
	
#### [Github SSH Key](https://help.github.com/articles/generating-ssh-keys)

	cd ~/.ssh
	mkdir key_backup
	cp id_rsa* key_backup
	rm id_rsa*
	ssh-keygen -t rsa -C "m@moox.fr"
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
