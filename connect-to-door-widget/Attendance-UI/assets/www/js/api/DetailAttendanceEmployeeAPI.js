Clazz.createPackage("com.attendance.api");

Clazz.com.attendance.api.DetailAttendanceEmployeeAPI = Clazz.extend(Clazz.com.attendance.abstract.API,{

	getDetailEmployee : function(employeeID, dateStart, dateEnd, callbackFunction) {
		var moduleDaily= "/attendance-detail";
		var postBody = {'param_day_start' : dateStart,'param_day_end' : dateEnd,'param_employee_id' : employeeID};
		this.ajaxPostRequest(moduleDaily, postBody, callbackFunction);
	},

});