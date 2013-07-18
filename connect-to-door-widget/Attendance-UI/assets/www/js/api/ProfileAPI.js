Clazz.createPackage("com.attendance.api");

Clazz.com.attendance.api.ProfileAPI = Clazz.extend(Clazz.com.attendance.abstract.API,{

	getPersonInformation : function(searchByParameter, value, callbackFunction) {
		var moduleProfile= "/profile";
		if(searchByParameter == "employee_id"){
			var postBody = {"search_by" : searchByParameter, "employee_id" : value};
		}else{
			var postBody = {"search_by" : searchByParameter, "username" : value};
		}
		this.ajaxPostRequest(moduleProfile, postBody, callbackFunction);
	},

});