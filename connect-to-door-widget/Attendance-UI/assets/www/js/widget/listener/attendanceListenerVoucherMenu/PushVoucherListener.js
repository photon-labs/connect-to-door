Clazz.createPackage("com.attendance.widget.listener");
/**
 * @author dede_pu
 * Create class PushVoucherListener
 */
Clazz.com.attendance.widget.listener.PushVoucherListener = Clazz.extend(Clazz.Widget, {
	
	/**
	 * @author dede_pu
	 * function to push Voucher page
	 */
	pushVoucher : function(){
			require(["widget/module/attendanceVoucher/AttendanceVoucher",
			         "widget/module/attendanceVoucher/AttendanceVoucherMenu",
			         "widget/listener/attendanceListenerVoucherMenu/PushRequestListener",
			         "widget/listener/attendanceListenerVoucherMenu/PushReimbursementListener",
			         "widget/listener/attendanceListenerCommon/SignOutAndBackListener",
			         "widget/listener/attendanceListenerVoucherReimbursement/InsertMasterDetailListener",
			         "widget/listener/attendanceListenerCommon/RequestAndReimburseStorage",
			         "api/InputReimbursementAPI",
			         "widget/common/Footer",
			         ],function(){
				var attendanceVoucher = new Clazz.com.attendance.widget.module.Attendancevoucher.AttendanceVoucher();
				Clazz.navigationController.push(attendanceVoucher);
			})
	},
	
});