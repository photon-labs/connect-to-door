Clazz.createPackage("com.attendance.api");

Clazz.com.attendance.api.LoginAPI = Clazz.extend(Clazz.com.attendance.abstract.API,{

	doLogin : function(employeeId,facebookID,callbackFunction) {
		var moduleLogin = "/login";
		var postBody = {"employee_id":employeeId,"facebook_id":facebookID};
		this.ajaxPostRequest(moduleLogin, postBody, callbackFunction);
	},

});