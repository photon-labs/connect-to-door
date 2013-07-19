Clazz.createPackage("com.attendance.api");

Clazz.com.attendance.api.CheckInOutAPI = Clazz.extend(Clazz.com.attendance.abstract.API,{

	checkInOut : function(employeeId,statusCheck,callbackFunction) {
		var moduleCheckInOut = "/check-in-out";
		var postBody = {"employee_id":employeeId,"status":statusCheck};
		this.ajaxPostRequest(moduleCheckInOut, postBody, callbackFunction);
	},

});