Clazz.createPackage("com.attendance.widget.module.attendanceMenu");
Clazz.com.attendance.widget.module.attendanceMenu.AttendanceMenuProfileVoucher = Clazz.extend(Clazz.WidgetWithTemplate, {
	templateUrl  : "../template/attendanceMenu/attendanceMenuBodyLeft.tmp",
	defaultContainer : "attendance\\:menu-body-left",
	menuListener : null,
	pushVoucherListener : null,

	initialize : function(config){
		this.menuListener = new Clazz.com.attendance.widget.listener.PushProfileListener();
		this.pushVoucherListener = new Clazz.com.attendance.widget.listener.PushVoucherListener();
	},
	
	bindUI : function(){
		var self = this;
		
		$('.attendance-menu-button-profile').click(function(){
			self.menuListener.buttonProfileClick();	
		});

		$('.attendance-menu-button-voucher').click(function(){
			self.pushVoucherListener.pushVoucher();				
		});
	},
});