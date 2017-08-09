var cities = (function() {
	
	function _loadCities(){
		var data = WL.Client.invokeProcedure({
			adapter : MySqlAdapter,
			procedure : loadCities,
			parameters : [],
		},
		{
			onSuccess : _loadCitiesSuccess(),
			onFailure : _loadCitiesFail(),
		});
		return data;
	}
	
	function _loadCitiesSuccess(){
		WL.Logger.info("Cities retrieved");
	}
	
	function _loadCitiesFail(){
		WL.Logger.info("Failed to retrieve cities");
	}
	
	function _updateCityM(status,city){
		WL.Client.invokeProcedure({
			adapter : MySqlAdapter,
			procedure : updateCityM,
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
			adapter : MySqlAdapter,
			procedure : updateCityW,
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


