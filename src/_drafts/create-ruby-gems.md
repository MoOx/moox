Récemment j'ai découvers Sass et Compass, un préprocesseur CSS ainsi que le framework qui va avec, afin de booster ma productivité lorsque je code des feuilles de styles. Très content de ces 2 solutions qui font bien la paire, j'ai voulu (comme d'hab') en faire plus.
J'ai ainsi depuis peu créer un repository sur Github afin d'y entreposer des "recettes" utilisants Sass et Compass : <a href="https://github.com/MoOx/compass-recipes">compass-recipes</a>.

Content de cette "librairie" et souhaitant la rendre accessible à tous, me voici partie pour en faire, comme le sont Sass et Compass des "gems" ruby.

Les Ruby Gems sont des composants codés en <a href="http://www.rubyfrance.org/documentations/rubygem---introduction/">Ruby</a> qui permettent d'avoir une gestion des paquets comme le font apt-get, aptitude, macports, fink, homebrew etc...

Trouvez vos gemmes plus facilement, publier les plus rapidement, et prenez plaisir à le faire.

<h2>Préparer sa "gem"</h2>

Afin de préparer sa gem, il faut pas grand chose de nécessaire. Il suffit de réaliser un fichier contenant les spécifications de votre gem, afin de pouvoir la construire.

Voilà à quoi peut ressembler un fichier .gemspec

<code class="block ruby">
TODO
</code>

Une fois ceci fait, on va construire sa gem
<code class="block shell"># check gem system is up to date, or update it
gem update --system
# build !
gem build my-gem.gemspec</code>

si vous voulez tester tout ça sans publier directement, vous pouvez vous l'installer avec vos autres gems en local

<code class="block shell">gem install my-gem</code>

Une fois que ça à l'air fonctionnel, on peut publier sa gem !
Il faut pour cela créer un compte sur RubyGems.org, et une fois votre compte validé :

<code class="block shell">gem push my-gem-0.1.0.gem</code>

Il va falloir saisir vos identifiants, et c'est tout !

Vous pourrez vérifier que votre gem est bien en ligne en allant sur https://rubygems.org/gems/{my-gem}

Ma dernière en date est bien là https://rubygems.org/gems/compass-recipes :)
