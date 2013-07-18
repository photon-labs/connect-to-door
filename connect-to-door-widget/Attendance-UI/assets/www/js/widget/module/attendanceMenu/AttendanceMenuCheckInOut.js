Clazz.createPackage("com.attendance.widget.module.attendanceMenu");
Clazz.com.attendance.widget.module.attendanceMenu.AttendanceMenuCheckInOut = Clazz.extend(Clazz.WidgetWithTemplate, {
	templateUrl  : "../template/attendanceMenu/attendanceMenuBox.tmp",
	defaultContainer : "attendance\\:menu-box",
	menuCheckInOutListener : null,
	CookieAPI : null,
	checkInOutAPI : null,
	profileAPI : null,

	initialize : function(config){
		this.profileAPI = new Clazz.com.attendance.api.ProfileAPI();
		this.menuCheckInOutListener = new Clazz.com.attendance.widget.listener.MenuCheckInOutListener();
		this.CookieAPI = new Clazz.com.attendance.api.CookieAPI();
		this.checkInOutAPI = new Clazz.com.attendance.api.CheckInOutAPI();
	},

	bindUI : function(){
		var self = this;
		this.getCheckInOut();
		var employeeId = this.CookieAPI.getUserIdEmployee();
		var searchParameter = "employee_id";
		this.profileAPI.getPersonInformation(searchParameter, employeeId,function(response){
			if (response != undefined && response != null){
				var name = response.employee_name;
                var nameLength = name.length;
                for(var beginValue = 0; beginValue < nameLength; beginValue++){
                    if(name.substring(beginValue,beginValue+1) == " "){
                    	name = name.substring(0, beginValue);
                    }
                }
				$('.attendance-menu-welcome').text('Welcome, '+name);
			}
		});
		
		$('.attendance-menu-button-checkin').click(function(){
			self.menuCheckInOutListener.buttonCheckinClick();
		});

		$('.attendance-menu-button-checkout').click(function(){
			self.menuCheckInOutListener.buttonCheckoutClick();
		});
	},

	/**
	 * @author dede_pu
	 * function to get time check in out from local storage API
	 */
	getCheckInOut : function(){
		var employeeID = this.CookieAPI.getUserIdEmployee();
		this.checkInOutAPI.checkInOut(employeeID,"check-status" ,function(response){
			if (response.check_in !== undefined && response.check_in !== null ){
				var checkIn = response.check_in;
				var checkOut = response.check_out;
				if(checkIn.length == 5){
					$('.attendance-menu-time').text('You have checked in at ' + checkIn);
				}
				if(checkOut.length == 5){
					$('.attendance-menu-time').text('You have checked out at ' + checkOut);
				}
			}
		});
	},

});