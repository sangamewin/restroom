/*
 *  Licensed Materials - Property of IBM
 *  5725-I43 (C) Copyright IBM Corp. 2011, 2013. All Rights Reserved.
 *  US Government Users Restricted Rights - Use, duplication or
 *  disclosure restricted by GSA ADP Schedule Contract with IBM Corp.
 */

function submitAuthentication (user, pwd) {
	
	WL.Logger.info("Authentication submitted for user " + user);
	
	var userResult = WL.Server.invokeProcedure({
		adapter: "MySqlAdapter",
		procedure : "validateLogin",
		parameters : [user, pwd]
	});
	
	var userOK = false;
	var msg =""; 
	
	if (userResult["isSuccessful"] == false) {
		msg = "Verify your login information, not connected";
		userOK = false;
	} else if (userResult["isSuccessful"] == true && userResult["resultSet"].length > 0){
		userOK = true;
	} else {
		msg = "Verify your login information";
		userOK = false;
	}
	
	var cities = WL.Server.invokeProcedure({
		adapter: "MySqlAdapter",
		procedure : "loadCities",
		parameters : []
	});
	
	
	if(userOK) {
		
		var userIdentity = {
				userId : user,
				displayName : userResult["resultSet"][0]["username"],
				attributes : {
					role : userResult["resultSet"][0]["usertype"],
					cities : cities ["resultSet"]
				}
		};
		
		WL.Server.setActiveUser("UserSecurityCheckRealm", userIdentity);
		
		return {
			authRequired : false,
			role : userResult["resultSet"][0]["usertype"],
			cities : cities ["resultSet"]
		};
		
	}
	
	return onAuthRequired (null, msg);
}

function onAuthRequired (headers, errorMessage) {
	errorMessage = errorMessage ? errorMessage : "not valid";
	return {
		authRequired : true,
		errorMessage : errorMessage
	};
}

function onLogout () {
	WL.Server.setActiveUser("UserSecurityCheckRealm", null);
	WL.Logger.info("Authentication submitted for user ");
}
