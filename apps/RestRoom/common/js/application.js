 var Application = (function() {
	
	function _start() {
		WL.Logger.debug("_start()");
		mobileLoadingShow();

		WL.Client.connect({
			onSuccess : wlConnectOk, 
			onFailure : wlConnectFail
		});
	}
	
	function wlConnectOk (response) {
		
		WL.Logger.info("response " + response);
		
		if (response && response.responseJSON && response.responseJSON.userInfo && response.responseJSON.userInfo.UserSecurityCheckRealm) {
			var realm = response.responseJSON.userInfo.UserSecurityCheckRealm;
			
			if((realm.userId) && (realm.isUserAuthenticated)) {
				mobileLoadingHide();
				WL.Logger.info("User Auth Success, goto next");
				_postLoginProcess();
				return;
			} else {
				WL.Logger.info("User not okay, need to validate");
			}
		}
		
		//initiate login
		WL.Client.login("UserSecurityCheckRealm", {
			onSuccess : wlLoginOk,
			onFailure : wlLoginFail
		});
	}
		
	function wlConnectFail (response) {	
		mobileLoadingHide();
		WL.Logger.info("Connection down, please check your wl server");
		WL.SimpleDialog.show("Connection Down", "WL Server is down, Connection not available", [{text: "Ok"}]);
	}
	
	function wlLoginOk (response) {	
		_postLoginProcess();
	}
	
	function wlLoginFail (response) {	
		gotoPage('index.html');
	}

	function _wlLoginRequired () {	
	}
	
	function _postLoginProcess() {
		var attributes = WL.Client.getUserInfo('UserSecurityCheckRealm', 'attributes');
		//var role = attributes.role; //for now ignoring the role, future enhancements.
			gotoPage('admin.html');
	}
	
	
	return {
		start: function() { _start(); },
		loginRequired: function() { _wlLoginRequired(); },
	};

}() );


