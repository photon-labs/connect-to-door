Clazz.createPackage("com.attendance.widget.module.attendanceDaily");
Clazz.com.attendance.widget.module.attendanceDaily.AttendanceDailyFooter = Clazz.extend(Clazz.WidgetWithTemplate, {
	templateUrl  : "../template/attendanceCommon/attendanceCommonFooter.tmp",
	defaultContainer : 'attendance\\:daily-footer',
	
	//listener
	SignOutAndBackListener : null,
	dailyDetailListener : null,

	//local storage
	CookieAPI : null,
	attendanceMenuButton:null,
	clicked:0,

	/**
	 * @author andhika_p
	 * initialize construct object
	 */
	initialize : function(config){
		this.dailyDetailListener = config.dailyDetailListener;
		this.SignOutAndBackListener = new Clazz.com.attendance.widget.listener.SignOutAndBackListener();
		this.CookieAPI = new Clazz.com.attendance.api.CookieAPI();	
	},

	bindUI : function(){
		this.setlogoutAndBack();
	},

	/**
	 * @author andhika_p
	 * give action for button in the template
	 */
	setlogoutAndBack : function(){
		var self = this;
		$('.attendance-footer-left').click(function(){
			self.dailyDetailListener.getCheckInOut();
			self.SignOutAndBackListener.buttonBackClick();
		});

		$('.attendance-footer-right').click(function(){
			self.SignOutAndBackListener.buttonSignOutClick();
		});
	},
});