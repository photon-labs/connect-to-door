Clazz.createPackage("com.attendance.api");

Clazz.com.attendance.api.UpdateCheckInOutAPI = Clazz.extend(Clazz.com.attendance.abstract.API,{

	updateCheckInOut : function(employeeID, presenceId, checkIn, checkOut, date,callbackFunction) {
		var moduleUpdateCheckinOut = "/update-check-in-out";
		var postBody = {"employee_id" : employeeID, "presenceId" : presenceId, "checkIn" : checkIn, "checkOut" : checkOut ,"date":date};
		this.ajaxPostRequest(moduleUpdateCheckinOut, postBody, callbackFunction);
	},
	
	updateWorkingHour : function(employeeID, TimeCheckIn, Date, TimeCheckOut, callbackFunction){
		var module ="/force-login";
		var postBody = {"employee_id" : employeeID, "time_checkIn" : TimeCheckIn, "time_checkOut" :TimeCheckOut, "date" : Date};
		alert(JSON.stringify(postBody));
//		this.ajaxPostRequest(module, postBody, callbackFunction);
	}

});
