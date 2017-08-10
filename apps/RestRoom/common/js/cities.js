var Cities = (function() {
	
	function _loadCities(){
		 WL.Client.invokeProcedure({
			adapter : "MySqlAdapter",
			procedure : "loadCities",
			parameters : [],
		},
		{
			onSuccess : _loadCitiesSuccess,
			onFailure : _loadCitiesFail,
		});
	}
	
	function _loadCitiesSuccess(res){
		// Ensure that the result was successful.
    	if (res && res.invocationResult && res.invocationResult.isSuccessful &&
    		res.invocationResult.resultSet )
    	{
    		// get the cities
    		var cities = res.invocationResult.resultSet;
    		var template = $("#usageList").html();
    		$("#target").html(WL_.template(template)({cities:cities}));
    		
    	} else {
    		_loadCitiesFail();
    	}
	}
	
	function _loadCitiesFail(response){
		mobileLoadingHide();
		WL.Logger.info("Looks like connection to the WL server is down");
		WL.SimpleDialog.show("Connection Down [1]", "WL Server is down, Connection not available", [{text: "Ok"}]);
	}
	
	function _updateCityM(status,city){
		WL.Client.invokeProcedure({
			adapter : "MySqlAdapter",
			procedure : "updateCityM",
			parameters : [status,city]
		},
		{
			onSuccess : _updateCitySuccess(),
			onFail : _updateCityFail(),
		}
		);
	}
	
	function _updateCityW(status,city){
		WL.Client.invokeProcedure({
			adapter : "MySqlAdapter",
			procedure : "updateCityW",
			parameters : [status,city]
		},
		{
			onSuccess : _updateCitySuccess(),
			onFail : _updateCityFail(),
		}
		);
	}
	
	function _updateCitySuccess(){
		WL.Logger.info("Cities updated");
	}
	
	function _updateCityFail(){
		WL.Logger.info("Cities failed to be updated");
	}
	
	return {
		loadCities: function() { _loadCities(); },
		updateCityM: function(status, city) { _updateCityM(status, city);},
		updateCityW: function(status, city) { _updateCityW(status, city);}
	};
	
}() );

