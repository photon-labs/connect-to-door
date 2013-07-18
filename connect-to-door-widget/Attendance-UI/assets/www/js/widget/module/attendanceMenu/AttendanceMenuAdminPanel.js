Clazz.createPackage("com.attendance.widget.module.attendanceMenu");
Clazz.com.attendance.widget.module.attendanceMenu.AttendanceMenuAdminPanel = Clazz.extend(Clazz.WidgetWithTemplate, {
	templateUrl  : "../template/attendanceMenu/attendanceMenuButton.tmp",
	defaultContainer : "attendance\\:menu-button",
	menuAdminPanelListener : null,



	initialize : function(config){
		this.menuAdminPanelListener = new Clazz.com.attendance.widget.listener.MenuAdminPanelListener();
	},

	bindUI : function(){
		var self = this;
		this.selectUIAuthority();

		$('.attendace-menu-button-attendance').click(function(){	
			self.menuAdminPanelListener.buttonDailyAttendanceClick();			
		});

		$('.attendace-menu-button-list').click(function(){	
			self.menuAdminPanelListener.buttonListClick();			
		});

		$('.attendance-menu-button-report').click(function(){
			self.menuAdminPanelListener.buttonReportClick();			
		});

		$('.attendance-menu-button-form').click(function(){
			self.menuAdminPanelListener.buttonFormClick();			
		});
	},
	
	selectUIAuthority : function(){
		var CookieAPI = new Clazz.com.attendance.api.CookieAPI();
		if(CookieAPI.getAuthority() == 'Employee' ||
				CookieAPI.getAuthority() == 'Project Manager' || CookieAPI.getAuthority() == 'Super Admin'){
			$('.attendance-menu-button-report').remove();
			$('.attendance-menu-button-form').remove();
		}
	},

});