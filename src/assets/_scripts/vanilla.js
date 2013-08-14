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

// everything run fine, let's tell this to our stylesheets
document.documentElement.classList.toggle('js');
document.documentElement.classList.toggle('no-js');
