Clazz.createPackage("com.attendance.widget.module.Attendancevoucher");
/**
 * @author dede_pu
 * Create class AttendanceVoucher
 */
Clazz.com.attendance.widget.module.Attendancevoucher.AttendanceVoucher = Clazz.extend(Clazz.WidgetWithTemplate, {
	templateUrl  : "../template/attendanceVoucher/attendanceVoucher.tmp",
	name : "attendanceVoucher",
	voucherMenu : null,
	voucherFooter : null,
	mask : null,
	IdleTimer: null,
	CookieAPI : null,
	RequestAndReimburseStorage : null,
	
	initialize : function(config){
		this.voucherMenu = new Clazz.com.attendance.widget.module.Attendancevoucher.AttendanceVoucherMenu();
		this.voucherFooter = new Clazz.com.attendance.widget.common.Footer();
		this.IdleTimer = new Clazz.com.attendance.widget.listener.IdleTimer();
		this.mask = new Clazz.com.attendance.widget.common.AttendanceMask();
		this.CookieAPI = new Clazz.com.attendance.api.CookieAPI();	
		this.RequestAndReimburseStorage = new Clazz.com.attendance.listener.common.RequestAndReimburseStorage;
	},

	postRender : function(element){
		this.voucherMenu.render();
		this.voucherFooter.render();
		this.mask.showMask();
	},

	bindUI : function(){
		var self = this;
		//cek request id
		var requestID = this.CookieAPI.getRequest();
		if (requestID != null){
			self.RequestAndReimburseStorage.getItemVoucher(requestID);
		}
		
		setTimeout(function(){
			self.mask.removeMask();
		},1000);
		this.IdleTimer.getIdleTimer();
	},

	onPause : function(){

	},

	onResume : function (){
		this.IdleTimer.getIdleTimer();
		this.mask.removeMask();
	},
});