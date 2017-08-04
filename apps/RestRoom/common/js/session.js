var Session = (function() {
	
	function _login() {
		WL.Logger.info("_Login");
		
		mobileLoadingShow();
		
		var user = $("#loginUser").val().trim();
		var pwd = $("#loginPwd").val().trim();
		
		var invocationData = {
				adapter : "UserValidator",
				procedure : "submitAuthentication",
				parameters : [ user, pwd ]
		};
		
		challangeHandler.submitAdapterAuthentication (invocationData, {
			onSuccess: _loginSuccess, //this will never be called, instead this will make WL.Client.login success function.
			onFailure: _loginFail
		});
	}
	
	function _loginSuccess(res) {
		WL.Logger.info("login Success");
	}
	
	function _loginFail(res) {
		WL.Logger.info("login Fail");
		mobileLoadingHide();
		
		WL.SimpleDialog.show("Login", "Could not login, please try again", [{text : "OK"}]);
	}
	
	return {
		login : function() { _login(); },
		logout : function() { _logout(); },
	};
}());