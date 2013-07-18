Clazz.createPackage("com.attendance.widget.listener");
Clazz.com.attendance.widget.listener.MenuCheckInOutListener = Clazz.extend(Clazz.Widget, {
	CookieAPI : null,
	checkInOutAPI : null,
	errorAlert : null,

	initialize : function(config){
		this.CookieAPI = new Clazz.com.attendance.api.CookieAPI();
		this.checkInOutAPI = new Clazz.com.attendance.api.CheckInOutAPI();
		this.errorAlert = new Clazz.com.attendance.widget.common.ErrorAlert({errorText:""});
	},
	/**
	 * @author dede_pu
	 * function to get time at check in
	 */
	buttonCheckinClick: function(){
		var self = this;
		var employeeID = this.CookieAPI.getUserIdEmployee();
		var statusCheck = "checkIn" ; 
		self.checkInOutAPI.checkInOut(employeeID,statusCheck ,function(response){
			if(response.status == "success"){
				$('.attendance-menu-time').text('You have checked in at ' + response.checkIn.substring(11,16));
			}
			else{
				self.errorAlert.setErrorText(response.message);
				self.errorAlert.showAlert();
			}
		});
	},

	/**
	 * @author dede_pu
	 * function to get time at check out
	 */
	buttonCheckoutClick: function(){
		var self = this;
		var employeeID = this.CookieAPI.getUserIdEmployee();
		var statusCheck = "checkOut" ; 
		self.checkInOutAPI.checkInOut(employeeID,statusCheck ,function(response){
			if(response.status == "success"){
				$('.attendance-menu-time').text('You have checked out at ' + response.checkOut.substring(11,16));
			}
			else{
				self.errorAlert.setErrorText(response.message);
				self.errorAlert.showAlert();
			}
		});

	},

});