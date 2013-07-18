Clazz.createPackage("com.attendance.widget.common");
Clazz.com.attendance.widget.common.Footer = Clazz.extend(Clazz.WidgetWithTemplate, {
	templateUrl  : "../template/attendanceCommon/attendanceCommonFooter.tmp",
	defaultContainer : 'attendance\\:common-footer',
	name : "attendanceCommonFooter",	
	
	//listener
	SignOutAndBackListener : null,

	//local storage
	CookieAPI : null,
	attendanceMenuButton:null,
	clicked:0,

	/**
	 * @author andhika_p
	 * initialize construct object
	 */
	initialize : function(config){
		var self = this;
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
			self.SignOutAndBackListener.buttonBackClick();
		});

		$('.attendance-footer-right').click(function(){
			self.SignOutAndBackListener.buttonSignOutClick();
		});
	},
});