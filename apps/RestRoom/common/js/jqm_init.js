// The mobileinit event occurs after jQuery is loaded, but before jQuery Mobile is loaded.

$(document).bind( "mobileinit", function(event) {
	// Make sure the viewport doesn't zoom when it is double-tapped.
    $.extend($.mobile.zoom, {locked:true,enabled:false});
});
