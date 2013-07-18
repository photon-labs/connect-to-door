Clazz.createPackage("com.attendance.widget.listener");
/**
 * @author dede_pu
 * Create class PushReimbursementListener
 */
Clazz.com.attendance.widget.listener.PushReimbursementListener = Clazz.extend(Clazz.Widget, {
	
	/**
	 * @author dede_pu
	 * function to push Reimbursement page
	 */
	pushReimbursement : function(data) {
		require(["widget/module/attendanceReimbursement/AttendanceReimbursement",
		         "widget/module/attendanceReimbursement/AttendanceReimbursementButtonTable",
		         "widget/module/attendanceReimbursement/AttendanceReimbursementDetailTable",
		         "widget/module/attendanceReimbursement/AttendanceReimbursementDropDown",
		         "widget/module/attendanceReimbursement/AttendanceReimbursementFooter",
		         "widget/module/attendanceReimbursement/AttendanceReimbursementItemized",
		         "widget/module/attendanceReimbursement/AttendanceReimbursementSignature",
		         "widget/module/attendanceReimbursement/AttendanceReimbursementSubmitedBy",
		         "widget/module/attendanceReimbursement/AttendanceReimbursementTopContent",
		         "widget/module/attendanceReimbursement/AttendanceReimbursementUserInfo",
		         "widget/listener/attendanceListenerVoucherReimbursement/AttendanceReimbursementSaveButtonListener",
		         "widget/listener/attendanceListenerVoucherReimbursement/InsertSignatureListener",
		         "widget/listener/attendanceListenerVoucherReimbursement/PrintReimbursementCompleteListener",
		         "widget/listener/attendanceListenerProfile/PersonInformationListener",
		         "widget/module/attendanceProfile/PersonInformation",
		         "widget/module/attendanceRequest/RequestDate",
				 "widget/listener/attendanceListenerCommon/SignOutAndBackListener",
				 "widget/listener/attendanceListenerCommon/DropDownControllerListener",
				 "widget/module/attendanceReimbursement/AttendanceReimbursementSignatureInsert",
				 "api/UpdateStatusReimbursementAPI"],function(){
				var attendanceReimbursement = new Clazz.com.attendance.widget.module.attendanceReimbursement.AttendanceReimbursement({data : data});
				Clazz.navigationController.push(attendanceReimbursement);
			});
	},

});
