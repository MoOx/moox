/!\ WIP /!\

# CSS Refactorisation

## Convert to a pre-processor

`sass-convert` or [css2Sass](http://css2sass.heroku.com/)

### Explode the code into files

And use pre-processed `@import`

### Easy replacements with regex for better readability

#### Urls

##### Images

	url\(('|")?(\.\.)?(\/)?(img|images)\/([^)'"]*)('|")?\)

	image-url\("$5"\)

##### Fonts

	url\(('|")?(\.\.)?(\/)?(fonts?)\/([^)'"]*)('|")?\)

	font-url\("$5"\)


#### Replace &/or remove deprecated CSS 3 prefix if you can

Depending on you browser support. (check on [CanIUse.com](http://caniuse.com))

##### Box shadow
	(-moz-|-webkit-)?box-shadow: ?([^;]+);\s+(-moz-|-webkit-)?box-shadow: ?([^;]+);\s+(-moz-|-webkit-)?box-shadow: ?([^;]+);

	//depending on browser support
	@include box-shadow($2);
	or
	box-shadow: $2;  

#####  Border-radius
	(-moz-|-webkit-)?border-radius: ?([^;]+);\s+(-moz-|-webkit-)?border-radius: ?([^;]+);\s+(-moz-|-webkit-)?border-radius: ?([^;]+);

	//depending on browser support
	@include border-radius($2);
	or
	border-radius: $2;


#### Replace colors 

	#ffffff
	#fff

	\bwhite([^-]|;,) // to avoid white-space dude !
	#fff$1

	#000000
	#000

	\bblack([^-]|;,)
	#000

	// sass rgba
	?0 ?, ?0 ?, ?0 ?, ?
	#000, 

	?255 ?, ?255 ?, ?255 ?, ?
	#fff, 


#### Remove useless 0.x

	( |,)0\.
	$1.

##### Dead code

Search CSS classes in non style files (search where you want & add `,-*.css,-*.scss` in the scope "Where" in SublimeText)

### Look for redondantes parts

Use variables !

#### Colors

	#([a-fA-F0-9]){3}(([a-fA-F0-9]){3})?

Then create a color files with var (Note: This can be long) using color functions of the pre-processor.

##### Colors Tools

* [coloratum](http://coloratum.com)
* [0to255](http://0to255.com/)
* [Color comparator](http://codepen.io/MoOx/full/Ctwzb)

#### Values

pixels, em & stuffs & create variables

#### Media queries

Create media queries breakpoints with em, & create some mixins

```scss
$media-width-large: 30em !default;

@mixin media-large() {
	@media (min-width: $media-width-small) { @content }
}

//...

selector {
	width: $small;
	@include media-small() { width: $large } 
}
```

#### Find multiples CSS properties...

...You know, copy pasted everywhere...
Then create base class + used `@extend` in your code.

## Start real refactoring

The previous step does not only make this CSS code more readable, but it has help you being familiar with it.

Now that you have a sort of readable code (I hope more than before), you can start real work.

### 