Clazz.createPackage("com.attendance.api");

Clazz.com.attendance.api.CheckPresentAPI = Clazz.extend(Clazz.com.attendance.abstract.API,{

	CheckPresent : function(employeeId,callbackFunction) {
		var moduleCheckPresent = "/login";
		var postBody = {"employee_id":employeeId};
		this.ajaxPostRequest(moduleCheckPresent, postBody, callbackFunction);
	},

});