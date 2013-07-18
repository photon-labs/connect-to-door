Clazz.createPackage("com.attendance.api");

Clazz.com.attendance.api.UpdateDetailEmployeeAPI = Clazz.extend(Clazz.com.attendance.abstract.API,{

	UpdateDetail : function(adminID, employeeId, employeeDetail, callbackFunction) {
		var moduleUpdate = "/attendance-detail-update";
		var postBody = {"param_emp_id" : employeeId, "param_admin" : adminID, "employee_detail" : employeeDetail};
		this.ajaxPostRequest(moduleUpdate, postBody, callbackFunction);
	},

});