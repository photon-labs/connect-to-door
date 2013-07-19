Clazz.createPackage("com.attendance.widget.module.attendanceReimbursement");

Clazz.com.attendance.widget.module.attendanceReimbursement.AttendanceReimbursementSignatureButton = Clazz.extend(Clazz.WidgetWithTemplate, {
	defaultContainer : "attendance\\:reimbursement-signature-button",
	templateUrl: "../template/attendanceReimbursement/attendanceReimbursementSignatureButton.tmp",
	CookieAPI:null,
	insertSignatureListener:null,
	
	/**
	 * @author ty_astanto
	 * initialize construct object
	 */
	initialize : function(config){
		this.CookieAPI = new Clazz.com.attendance.api.CookieAPI();
		this.insertSignatureListener = new Clazz.com.attendance.widget.listener.InsertSignatureListener();
		
	},

	bindUI : function(){
		this.CookieAPI.saveAdminReimbursementSignature("false");
		var self = this;
		$('.attendance-reimbursement-submitted-by-insert-button').click(function(){
			self.CookieAPI.saveAdminReimbursementSignature(true);
			self.insertSignatureListener.getSignatureFromAPI();
		});

	},

});
