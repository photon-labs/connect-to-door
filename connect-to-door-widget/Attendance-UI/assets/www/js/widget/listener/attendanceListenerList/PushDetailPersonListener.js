Clazz.createPackage("com.attendance.widget.listener");
Clazz.com.attendance.widget.listener.PushDetailPersonListener= Clazz.extend(Clazz.Widget, {
	CookieAPI:null,
	
	initialize : function(config){
		this.CookieAPI = new Clazz.com.attendance.api.CookieAPI();
	},
	
	/**
	 * @author andhika_p
	 * push attendance detail page
	 */
	buttonCallDetailClick : function(employeeID, projectID, employeeName){
		var dayStart = $('.attendance-list-date-start').val();
		var dayEnd = $('.attendance-list-date-until').val();
		var CookieAPI = new Clazz.com.attendance.api.CookieAPI();
		var authority = this.CookieAPI.getAuthority();
		if (authority == "Admin" || authority == "Super Admin" || authority == "Finance") {
			require(["widget/module/attendanceDetail/AttendanceDetail",
			         "widget/module/attendanceDetail/DetailCalendar",
			         "widget/module/attendanceDetail/TitleInformationDetail",
			         "widget/common/Footer",
			         "widget/listener/attendanceListenerCommon/SignOutAndBackListener",
			         "widget/listener/attendanceListenerDetail/TitleInformationDetailListener",
			         "widget/listener/attendanceListenerDetail/CalendarListener",
			         "api/CookieAPI",
			         ],function(){
				var attendanceDetailpage = new Clazz.com.attendance.widget.detail.AttendanceDetail({
					dayStart : dayStart,
					dayEnd : dayEnd,
					employeeID : employeeID,
					employeeName : employeeName,
					projectID : projectID,
				});
				Clazz.navigationController.push(attendanceDetailpage);
			});
		}

	},

});