init:
	npm install -g bower happyplan-cli

init-osx:
	brew install icoutils

install:
	npm install
	bower install

update:
	npm install
	bower prune
	bower update

favicon:
	icotool -c src/assets/_images/favicon-16.png src/assets/_images/favicon-32.png -o src/favicon.ico
