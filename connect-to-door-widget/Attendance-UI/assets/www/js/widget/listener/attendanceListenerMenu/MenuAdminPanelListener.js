Clazz.createPackage("com.attendance.widget.listener");
Clazz.com.attendance.widget.listener.MenuAdminPanelListener = Clazz.extend(Clazz.Widget, {
	CookieAPI : null,

	initialize : function(config){
		this.CookieAPI = new Clazz.com.attendance.api.CookieAPI();
	},

	/**
	 * @author dede_pu
	 * function to push Daily Attendance
	 */
	buttonDailyAttendanceClick: function(){
		var authority = this.CookieAPI.getAuthority();
			require(["widget/listener/attendanceListenerCommon/SignOutAndBackListener",
			         "widget/module/attendanceDaily/AttendanceDailyFooter",
			         "widget/module/attendanceDaily/AttendanceDaily",
			         "widget/listener/attendanceListenerDaily/DailyDetailListener",
			         "widget/module/attendanceDaily/AttendanceDailyDetail"],function(){
				var attendanceDaily = new Clazz.com.attendance.widget.module.attendanceDaily.AttendanceDaily();
				Clazz.navigationController.push(attendanceDaily);
			});
	},

	/**
	 * @author dede_pu
	 * function to push List Attendance
	 */
	buttonListClick: function(){
		var authority = this.CookieAPI.getAuthority();
			require(["widget/module/attendanceList/AttendanceList",
			         "api/CookieAPI",
			         "widget/listener/attendanceListenerCommon/SignOutAndBackListener",
			         "widget/listener/attendanceListenerList/FilterPanelListener",
			         "widget/listener/attendanceListenerList/PushDetailPersonListener",
			         "widget/listener/attendanceListenerCommon/DropDownControllerListener",
			         "widget/module/attendanceList/ListFilterPanel",
			         "widget/module/attendanceList/ListDetail",
			         "widget/listener/attendanceListenerDetail/CalendarListener"],function(){
				var attendanceList = new Clazz.com.attendance.widget.list.AttendanceList();
				Clazz.navigationController.push(attendanceList);
			});
	},

	/**
	 * @author dede_pu
	 * function to push Report Attendance
	 */
	buttonReportClick: function(){
		var authority = this.CookieAPI.getAuthority();
		if (authority == "General Manager" 
			|| authority == "Admin" 
				|| authority == "Finance"
					|| authority == "Super Admin") {
			require(["widget/module/attendanceReport/AttendanceReport",
			         "widget/module/attendanceReport/ListDetailReport",
			         "api/CookieAPI",
			         "widget/listener/attendanceListenerCommon/DropDownControllerListener",
			         "widget/listener/attendanceListenerCommon/SignOutAndBackListener",
			         "widget/listener/attendanceListenerReport/FilterAndPrintDetailReport"],function(){
				var attendanceReport = new Clazz.com.attendance.widget.attendanceReport.AttendanceReport();
				Clazz.navigationController.push(attendanceReport);
			});
		}
		else{
			require(["widget/common/ErrorAlert"],function(){
				var errorAlert = new Clazz.com.attendance.widget.common.ErrorAlert({errorText:"You are not authorized"});
				errorAlert.showAlert("nonIdle");	
			});
		}

	},

	/**
	 * @author dede_pu
	 * function to push Form Attendance
	 */
	buttonFormClick: function(){
		var authority = this.CookieAPI.getAuthority();
		if (authority == "Admin" || authority == "Super Admin" || authority == "Finance"){
			require(["widget/module/attendanceForm/AttendanceForm",
			         "widget/module/attendanceForm/CreateAndEditPanel",
			         "widget/module/attendanceForm/InputForm",
			         "widget/listener/attendanceListenerCommon/SignOutAndBackListener",
			         "api/CookieAPI","api/CreateAndEditAccountAPI",
			         "widget/listener/attendanceListenerForm/CreateAndEditListener",
			         "widget/listener/attendanceListenerCommon/DropDownControllerListener",
			         "widget/listener/attendanceListenerForm/InputAndSaveListener"],function(){
				var attendanceForm = new Clazz.com.attendance.widget.attendanceForm.AttendanceForm();
				Clazz.navigationController.push(attendanceForm);
			});
		}
		else{
			require(["widget/common/ErrorAlert"],function(){
				var errorAlert = new Clazz.com.attendance.widget.common.ErrorAlert({errorText:"You are not authorized"});
				errorAlert.showAlert("nonIdle");	
			});
		}

	},

});