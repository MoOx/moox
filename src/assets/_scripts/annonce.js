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