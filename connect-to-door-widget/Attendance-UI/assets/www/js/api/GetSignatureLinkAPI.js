Clazz.createPackage("com.attendance.api");

Clazz.com.attendance.api.GetSignatureLinkAPI = Clazz.extend(Clazz.com.attendance.abstract.API,{

	getSignature : function(employeeID,callbackFunction) {
		var moduleGetSignature = "/signature";
		var postBody = {employee_id : employeeID};
		this.ajaxPostRequest(moduleGetSignature, postBody, callbackFunction);
	},

});
