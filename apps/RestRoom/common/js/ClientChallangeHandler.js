var challangeHandler = WL.Client.createChallengeHandler("UserSecurityCheckRealm");

challangeHandler.isCustomResponse = function (response) {
	if (!response || !response.responseJSON || response.responseTest === null) {
		WL.Logger.info("ChallangeHandler.isCustomeResponse :: false");
		WL.Logger.debug (response);
		return false;
	}
	
	if (typeof(response.responseJSON.authRequired) !== 'undefined') {
		WL.Logger.info("ChallangeHandler.isCustomeResponse :: true");
		WL.Logger.debug (response);
		return true;
	} else {
		WL.Logger.debug("ChallangeHandler.isCustomeResponse :: false(1)");
		WL.Logger.debug (response);
		return false;
	}
};

challangeHandler.handleChallenge = function (response) {
	var authRequired = response.responseJSON.authRequired;
	
	if(authRequired == true ) {
		WL.Logger.info("ChallangeHandler.handleChallange :: authRequired True");
		gotoPage('login.html');
	} else {
		WL.Logger.info("ChallangeHandler.handleChallange :: submitSuccess()");
		challangeHandler.submitSuccess();
	}
};