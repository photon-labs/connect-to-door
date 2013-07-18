Clazz.createPackage("com.attendance.api");

Clazz.com.attendance.api.UpdateStatusRequestAPI = Clazz.extend(Clazz.com.attendance.abstract.API,{

	UpdateRequestStatus : function(requestId, employeeId, date, Status, assignTo, callbackFunction) {
		var moduleUpdate = "/update-status-request";
		var postBody = {param_request_id : requestId,param_employee_id : employeeId, param_date :date, param_status : Status, assign_to :assignTo};
		this.ajaxPostRequest(moduleUpdate, postBody, callbackFunction);
	},

});

