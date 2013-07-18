Clazz.createPackage("com.attendance.widget.module.attendanceMenu");
Clazz.com.attendance.widget.module.attendanceMenu.AttendanceMenu = Clazz.extend(Clazz.WidgetWithTemplate, {
	templateUrl  : "../template/attendanceMenu/attendanceMenu.tmp",
	name : "menu",
	attendanceMenuAdminPanel : null,
	menuFooter : null,
	attendanceMenuCheckInOut : null,
	attendanceMenuProfileVoucher: null,
	IdleTimer: null,
	mask : null,
	pushVoucherListener : null,
	CookieAPI : null,
	
	initialize : function(config){
		var self = this;
		this.IdleTimer = new Clazz.com.attendance.widget.listener.IdleTimer();
		this.CookieAPI = new Clazz.com.attendance.api.CookieAPI();	
		this.attendanceMenuProfileVoucher = new Clazz.com.attendance.widget.module.attendanceMenu.AttendanceMenuProfileVoucher();
		this.attendanceMenuCheckInOut = new Clazz.com.attendance.widget.module.attendanceMenu.AttendanceMenuCheckInOut();
		this.attendanceMenuAdminPanel = new Clazz.com.attendance.widget.module.attendanceMenu.AttendanceMenuAdminPanel();
		this.menuFooter = new Clazz.com.attendance.widget.module.attendanceMenu.MenuFooter();
		this.mask = new Clazz.com.attendance.widget.common.AttendanceMask();
		this.pushVoucherListener = new Clazz.com.attendance.widget.listener.PushVoucherListener();
	},

	postRender : function(element){
		this.attendanceMenuCheckInOut.render();
		this.attendanceMenuAdminPanel.render();
		this.attendanceMenuProfileVoucher.render();
		this.menuFooter.render();
		this.mask.showMask();
	},

	bindUI : function(){
		var self = this;
		
		//cek request id
		var requestID = this.CookieAPI.getRequest();
		if (requestID != null){
			self.pushVoucherListener.pushVoucher();
		}
		
		setTimeout(function(){
			self.mask.removeMask();
		},1000);
		this.IdleTimer.getIdleTimer();
		
	},

	onResume : function (){
		this.IdleTimer.getIdleTimer();
		this.mask.removeMask();
	},

});