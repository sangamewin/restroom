function gotoPage(uri) {
	//var currentPage = $(":mobile-pagecontainer").pagecontainer('getActivePage');
	
	 $(":mobile-pagecontainer").pagecontainer("change", uri, {role : "page"});
}

function mobileLoadingShow() {
	$.mobile.loading("show" , {
		text: "Thinking",
		textVisible : true,
		textOnly : false,
		theme : "b",
		html : ""
	});
}

function mobileLoadingHide() {
	$.mobile.loading("hide");
}

//<button class="show-page-loading-msg" data-theme="b" data-textonly="false" data-textvisible="true" data-msgtext="Loading theme a" data-icon="arrow-r" data-iconpos="right">Theme a</button>