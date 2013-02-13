// just it case scripts below breack everything on a browser, just put the css like if there is no js
document.documentElement.classList.toggle('js');
document.documentElement.classList.toggle('no-js');

// my website

// call me just before bottom, I'll be dom ready :p
[].forEach.call(document.querySelectorAll('[href="#not-ready"]'), function(el){
	el.setAttribute('data-hint', 'Not ready yet !');
});

[].forEach.call(document.querySelectorAll('.js-togglable'), function(el){
	var toggler = el.querySelector('.js-togglable__toggler');
	var items = [].slice.call(el.querySelectorAll('.js-togglable__item'));
	
	var toggle = function(event) {
		items.forEach(function(item) {
			item.classList.toggle('js-togglable__item--hide');
		});
	};
	
	toggler.addEventListener('click', toggle);
	toggler.addEventListener('keyup', toggle);
});

// scroll down to hide non important annonce box

// inspired by @scottjehl hiding address bar script
var trickScrollTop = parseInt(getComputedStyle(document.querySelector('.annonce-box')).height, 10) - 4; // 1 by default

// If there's a hash, or addEventListener is undefined, stop here
if( !location.hash) {
	//scroll to value
	window.scrollTo( 0, trickScrollTop);
	
	var scrollTop = 1,
		getScrollTop = function(){
			return window.pageYOffset || document.compatMode === "CSS1Compat" && document.documentElement.scrollTop || document.body.scrollTop || 0;
		},
	
		//reset to 0 on bodyready, if needed
		bodycheck = setInterval(function(){
			if( document.body ){
				clearInterval( bodycheck );
				window.scrollTo( 0, trickScrollTop);
			}	
		}, 15 );
	
	window.addEventListener("load", function(){
		setTimeout(function(){
			//at load, if user hasn't scrolled more than 20 or so...
			if( getScrollTop() < 20 + trickScrollTop ){
				//reset to hide addr bar at onload
				window.scrollTo( 0, trickScrollTop);
			}
		}, 0);
	});
}

// everything run fine, let's tell this to our stylesheets
document.documentElement.classList.toggle('js');
document.documentElement.classList.toggle('no-js');
