Clazz.createPackage("com.attendance.widget.listener");

Clazz.com.attendance.widget.listener.ForceCheckInOutListener = Clazz.extend(Clazz.Widget, { 


	updatingCheckInOut : function(employeeID, TimeCheckIn, Date, TimeCheckOut, callback){
		require(["api/UpdateCheckInOutAPI"],
				function(){
			var updateCheckInOutAPI = new Clazz.com.attendance.api.UpdateCheckInOutAPI();
			updateCheckInOutAPI.updateWorkingHour(employeeID, TimeCheckIn,Date, TimeCheckOut, function(response){
				callback(response);
			});
		});
	}
});