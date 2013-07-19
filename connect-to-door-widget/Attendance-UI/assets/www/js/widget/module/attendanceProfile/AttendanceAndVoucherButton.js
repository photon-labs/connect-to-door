Clazz.createPackage("com.attendance.widget.module.profile");
Clazz.com.attendance.widget.module.profile.AttendanceAndVoucherButton = Clazz.extend(Clazz.WidgetWithTemplate, {
	templateUrl  : "../template/attendanceProfile/attendanceAndVoucherButton.tmp",
	defaultContainer : 'attendance\\:attendance-and-voucher-button',

	//listener
	attendanceAndVoucherButtonListener : null,
	pushVoucherListener : null,

	/**
	 * @author andhika_p
	 * initialize construct object listener
	 */
	initialize : function(config){
		this.attendanceAndVoucherButtonListener = new Clazz.com.attendance.widget.listener.SignOutAndBackListener();
		this.pushVoucherListener = new Clazz.com.attendance.widget.listener.PushVoucherListener();
	},

	bindUI : function(){
		this.popPageToMenu();
		this.pushVoucherPage();
	},

	/**
	 * @author andhika_p
	 * give action for button in the template to pop
	 */
	popPageToMenu : function(){
		var self = this;
		$('.attendance-profile-button-attendance').click(function(){
			self.attendanceAndVoucherButtonListener.buttonBackClick();
		});
	},	

	/**
	 * @author andhika_p
	 * give action for button in the template to push
	 */
	pushVoucherPage : function(){
		var self = this;
		$('.attendance-profile-button-voucher').click(function(){
			self.pushVoucherListener.pushVoucher();
		});
	},

});