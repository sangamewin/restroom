/*
 *  Licensed Materials - Property of IBM
 *  5725-I43 (C) Copyright IBM Corp. 2011, 2013. All Rights Reserved.
 *  US Government Users Restricted Rights - Use, duplication or
 *  disclosure restricted by GSA ADP Schedule Contract with IBM Corp.
 */

/************************************************************************
 * Implementation code for procedure - 'procedure1'
 *
 *
 * @return - invocationResult
 */
 
var validateLoginStatement = WL.Server.createSQLStatement("select username, password, usertype from user where username = ? and password = ?");
function validateLogin(user, password) {
	return WL.Server.invokeSQLStatement({
		preparedStatement : validateLoginStatement,
		parameters : [user, password]
	});
}


var loadAvailStmt = WL.Server.createSQLStatement("select * from avail");
function loadCities() {
	return WL.Server.invokeSQLStatement({
		preparedStatement : loadAvailStmt,
		parameters : []
	});
}

/************************************************************************
 * Implementation code for procedure - 'procedure2'
 *
 *
 * @return - invocationResult
 */
 
function procedure2(param) {
	return WL.Server.invokeSQLStoredProcedure({
		procedure : "storedProcedure2",
		parameters : [param]
	});
}

