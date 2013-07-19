Clazz.createPackage("com.attendance.api");

Clazz.com.attendance.api.DeleteAccountAPI = Clazz.extend(Clazz.com.attendance.abstract.API,{

	deleteAccount : function(status, employeeID, callbackFunction) {
		var moduleLogin = "/create-edit-account";
		var postBody = {"status" : status, "employee_id" : employeeID};
		this.ajaxPostRequest(moduleLogin, postBody, callbackFunction);
	},

});