init-osx:
	brew install icoutils

favicon:
	icotool -c src/assets/_images/favicon-16.png src/assets/_images/favicon-32.png -o src/favicon.ico
