requirejs.config({
	name: "main",
	
	shim: {
		"foundation/jquery.cookie":							{ deps: ["jquery"] },
		"foundation/jquery.event.move":						{ deps: ["jquery"] },
		"foundation/jquery.event.swipe":					{ deps: ["jquery"] },
		"foundation/jquery.foundation.accordion":			{ deps: ["jquery", "Modernizr"] },
		"foundation/jquery.foundation.alerts":				{ deps: ["jquery"] },
		"foundation/jquery.foundation.buttons":				{ deps: ["jquery"] },
		"foundation/jquery.foundation.clearing":			{ deps: ["jquery", "Modernizr"] },
		"foundation/jquery.foundation.forms":				{ deps: ["jquery", "Modernizr"] },
		"foundation/jquery.foundation.joyride":				{ deps: ["jquery"] },
		"foundation/jquery.foundation.magellan":			{ deps: ["jquery"] },
		"foundation/jquery.foundation.mediaQueryToggle":	{ deps: ["jquery"] },
		"foundation/jquery.foundation.navigation":			{ deps: ["jquery", "Modernizr"] },
		"foundation/jquery.foundation.orbit":				{ deps: ["jquery"] },
		"foundation/jquery.foundation.reveal":				{ deps: ["jquery"] },
		"foundation/jquery.foundation.tabs":				{ deps: ["jquery"] },
		"foundation/jquery.foundation.tooltips":			{ deps: ["jquery", "Modernizr"] },
		"foundation/jquery.foundation.topbar":				{ deps: ["jquery", "Modernizr", "foundation/jquery.foundation.mediaQueryToggle"] },
		"foundation/jquery.offcanvas":						{ deps: ["jquery"] },
		"foundation/jquery.placeholder":					{ deps: ["jquery"] }
	},

	paths: {
		Modernizr: "foundation/modernizr.foundation",
		jquery: "foundation/jquery"
	}
});

// JUST UNCOMMENT MODULES HERE TO PROPRELY DISABLE (ie do not include) SOME FILES

requirejs([
	"jquery",
	"foundation/jquery.cookie",
	"foundation/jquery.event.move",
	"foundation/jquery.event.swipe",
	// "foundation/jquery.foundation.accordion",
	// "foundation/jquery.foundation.alerts",
	// "foundation/jquery.foundation.buttons",
	// "foundation/jquery.foundation.clearing",
	// "foundation/jquery.foundation.forms",
	// "foundation/jquery.foundation.joyride",
	// "foundation/jquery.foundation.magellan",
	// "foundation/jquery.foundation.mediaQueryToggle",
	"foundation/jquery.foundation.navigation",
	// "foundation/jquery.foundation.orbit",
	// "foundation/jquery.foundation.reveal",
	// "foundation/jquery.foundation.tabs",
	// "foundation/jquery.foundation.tooltips",
	"foundation/jquery.foundation.topbar",
	// "foundation/jquery.offcanvas",
	// "foundation/jquery.placeholder"
], function ($) {

	//Foundation - app.js:
	(function ($, window, undefined) {
		'use strict';

		var $doc = $(document), Modernizr = window.Modernizr;

		$(document).ready(function () {
			if ($.fn.foundationAccordion) $doc.foundationAccordions();
			if ($.fn.foundationAlerts) $doc.foundationAlerts();
			if ($.fn.foundationButtons) $doc.foundationButtons();
			if ($.fn.foundationAccordion) $doc.foundationAccordion();
			if ($.fn.foundationNavigation) $doc.foundationNavigation();
			if ($.fn.foundationTopBar) $doc.foundationTopBar();
			if ($.fn.foundationCustomForms) $doc.foundationCustomForms();
			if ($.fn.foundationMediaQueryViewer) $doc.foundationMediaQueryViewer();
			if ($.fn.foundationTabs && $.foundation.customForms) $doc.foundationTabs({callback : $.foundation.customForms.appendCustomMarkup});
			if ($.fn.foundationTooltips) $doc.foundationTooltips();
			if ($.fn.foundationMagellan) $doc.foundationMagellan();
			if ($.fn.foundationClearing) $doc.foundationClearing();
			
			if ($.fn.placeholder) $('input, textarea').placeholder();
		});

		// UNCOMMENT THE LINE YOU WANT BELOW IF YOU WANT IE8 SUPPORT AND ARE USING .block-grids
		// $('.block-grid.two-up>li:nth-child(2n+1)').css({clear: 'both'});
		// $('.block-grid.three-up>li:nth-child(3n+1)').css({clear: 'both'});
		// $('.block-grid.four-up>li:nth-child(4n+1)').css({clear: 'both'});
		// $('.block-grid.five-up>li:nth-child(5n+1)').css({clear: 'both'});
	})($, window);
	
	// Hide address bar on mobile devices (except if #hash present, so we don't mess up deep linking).
	// if (Modernizr.touch && !window.location.hash) {
	// 	$(window).load(function () {
	// 		setTimeout(function () {
	// 		// At load, if user hasn't scrolled more than 20px or so...
	// 			if( $(window).scrollTop() < 20 ) {
	// 				window.scrollTo(0, 1);
	// 			}
	// 		}, 0);
	// 	});
	// }

});
