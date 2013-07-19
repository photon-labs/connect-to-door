Clazz.createPackage("com.attendance.api");

Clazz.com.attendance.api.DailyAttendanceAPI = Clazz.extend(Clazz.com.attendance.abstract.API,{

	getDailyAttendance : function(employeeId,date,callbackFunction) {
		var moduleDaily= "/daily-attendance";
		var postBody = {"employee_id":employeeId , "date":date};
		this.ajaxPostRequest(moduleDaily, postBody, callbackFunction);
	},

});