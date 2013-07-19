Clazz.createPackage("com.attendance.widget.module.Attendancevoucher");
/**
 * @author dede_pu
 * Create class AttendanceVoucherMenu
 */
Clazz.com.attendance.widget.module.Attendancevoucher.AttendanceVoucherMenu = Clazz.extend(Clazz.WidgetWithTemplate, {
	templateUrl  : "../template/attendanceVoucher/attendanceVoucherMenu.tmp",
	defaultContainer : "attendance\\:voucher-menu",
	pushRequestListener : null,
	pushReimbursementListener : null,
	CookieAPI:null,

	IdleTimer: null,
	mask : null,
	
	RequestAndReimburseStorage : null,

	initialize : function(config){
		this.pushRequestListener = new Clazz.com.attendance.widget.listener.PushRequestListener();
		this.pushReimbursementListener = new Clazz.com.attendance.widget.listener.PushReimbursementListener();
		this.IdleTimer = new Clazz.com.attendance.widget.listener.IdleTimer();
		this.menuFooter = new Clazz.com.attendance.widget.module.attendanceMenu.MenuFooter();
		this.CookieAPI = new Clazz.com.attendance.api.CookieAPI();	
		this.mask = new Clazz.com.attendance.widget.common.AttendanceMask();
		this.RequestAndReimburseStorage = new Clazz.com.attendance.listener.common.RequestAndReimburseStorage();

	},

	bindUI : function(){
		var self = this;
		//cek request id
		
		$('.attendance-voucher-request').click(function(){
			var requestID = self.CookieAPI.getRequest();
			if (requestID !== null && requestID.substring(0,3) == "req"){
				self.RequestAndReimburseStorage.getItemVoucher(requestID);
			}else{
				self.pushRequestListener.pushRequest();
			}
		});

		$('.attendance-voucher-reimbursement').click(function(){
			var requestID = self.CookieAPI.getRequest();
			if (requestID !== null && requestID.substring(0,3) == "rem"){
				self.RequestAndReimburseStorage.getItemVoucher(requestID);
			}else{
				self.pushReimbursementListener.pushReimbursement();
			}
			
		});

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