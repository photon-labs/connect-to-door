Clazz.createPackage("com.attendance.api");

Clazz.com.attendance.api.InputRequestAPI = Clazz.extend(Clazz.com.attendance.abstract.API,{

	inputRequest : function(employeeID, date, detail, assignTo, callbackFunction) {
		var moduleInsertRequest = "/attendance-request";
		var postBody =  {"param_emp_id" : employeeID, "param_date" : date, "details_form" : detail, "assign_to" : assignTo};
		this.ajaxPostRequest(moduleInsertRequest, postBody, callbackFunction);
	},
});

