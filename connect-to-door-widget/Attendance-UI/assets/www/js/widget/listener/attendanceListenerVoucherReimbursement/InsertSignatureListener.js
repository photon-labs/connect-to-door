Clazz.createPackage("com.attendance.widget.listener");

Clazz.com.attendance.widget.listener.InsertSignatureListener = Clazz.extend(Clazz.Widget, {
	loadingMask:null,
	CookieAPI : null,
	getSignatureLinkAPI : null,
	getListAPMGMAPI  : null,
	
	initialize : function(config){
		var self = this;
		this.CookieAPI = new Clazz.com.attendance.api.CookieAPI();
		this.loadingMask = new Clazz.com.attendance.widget.common.LoadingMask();
		require(["api/GetSignatureLinkAPI","api/GetListAPMGMAPI"],function(){
			self.getSignatureLinkAPI = new Clazz.com.attendance.api.GetSignatureLinkAPI();
			self.getListAPMGMAPI = new Clazz.com.attendance.api.GetListAPMGMAPI();
		});
	},

	getSignatureFromAPI : function(){
		var self = this;
		var employeeID = this.CookieAPI.getUserIdEmployee();
		this.loadingMask.showLoading();
		this.getSignatureLinkAPI.getSignature(employeeID, function(response){
			if(response.status == "success"){
				self.insertSignature(response.signature);
				self.loadingMask.removeLoading();
			}
		});
	},
	
	clearRequestLocalStorage : function(){
		this.CookieAPI.saveAdminVoucherSignature("false");
		this.CookieAPI.saveGMVoucherSignature("false");
		this.CookieAPI.clearListDataRequest();
		this.CookieAPI.clearRequest();
	},

	insertSignature : function(link){
		var reimbursementStatus = this.CookieAPI.getReimbursementStatus();
		var signatureInsert = new Clazz.com.attendance.widget.module.attendanceReimbursement.AttendanceReimbursementSignatureInsert({history : {}});
		if(reimbursementStatus == "build"){
			signatureInsert.setImageSignatureAdmin(link);
		}else if(reimbursementStatus == "apm"){
			signatureInsert.setImageSignatureAPM(link);
		}else if(reimbursementStatus == "build-apm"){
			signatureInsert.setImageSignatureAPM(link);
		}else if(reimbursementStatus == "gm-apm"){
			signatureInsert.setImageSignatureGM(link);
		}else if(reimbursementStatus == "gm"){
			signatureInsert.setImageSignatureGM(link);
		}else{
			signatureInsert.setImageSignatureAPM(link);
		}
	},
	/**
	 * @author dhika_p
	 * function to control image signature
	 */
	onButtonInsertSignatureClick : function(statusSignature , reimbersementStatus){
		var self = this;
		if (statusSignature == "true" && reimbersementStatus == "build"){
			self.insertSignatureUser();	
		}
		else if (statusSignature == "true" && reimbersementStatus == "apm"){
			self.insertSignatureAPM();	
		}
		else if (statusSignature == "true" && reimbersementStatus == "build-apm"){
			self.insertSignatureAPM();	
		}
		else if (statusSignature == "true" && reimbersementStatus == "gm-apm"){
			self.insertSignatureGM();	
		}
		else if (statusSignature == "true" && reimbersementStatus == "gm"){
			self.insertSignatureGM();	
		}
		else{
			self.insertSignatureUser();	
			self.insertSignatureAPM();	
			self.insertSignatureGM();	
		}
	},

	getListFromAPI : function(authority){
		this.getListAPMGMAPI.getList(authority, function(response){
			if(response.status == "success"){
				var AttendanceReimbursementSignatureDropdown  = new Clazz.com.attendance.widget.module.attendanceReimbursement.AttendanceReimbursementSignatureDropdown();
				AttendanceReimbursementSignatureDropdown.setDropdownItem(response.data);
			}
		});
	},
	
	/**
	 * @author dhika_p
	 * function to insert signature user
	 */
	insertSignatureUser : function(){
		$(".attendance-reimbursement-submited-admin .attendance-reimbursement-submitted-by-signature ").addClass('reimbursement-signature-user');
	},

	/**
	 * @author dhika_p
	 * function to insert signature APM
	 */
	insertSignatureAPM : function(){
		$(".attendance-reimbursement-submited-apm .attendance-reimbursement-submitted-by-signature ").addClass('reimbursement-signature-apm');
	},

	/**
	 * @author dhika_p
	 * function to insert signature GM
	 */
	insertSignatureGM : function(){
		$(".attendance-reimbursement-submited-gm .attendance-reimbursement-submitted-by-signature ").addClass('reimbursement-signature-gm');
	},

	/**
	 * @author dhika_p
	 * function to remove signature user
	 */
	removeSignatureUser : function(){
		$("attendance-reimbursement-submited-admin .attendance-reimbursement-submitted-by-signature ").removeClass('reimbursement-signature-user');
	},

	/**
	 * @author dhika_p
	 * function to remove signature APM
	 */
	removeSignatureAPM : function(){
		$("attendance-reimbursement-submited-admin .attendance-reimbursement-submitted-by-signature ").removeClass('reimbursement-signature-apm');
	},

	/**
	 * @author dhika_p
	 * function to remove signature GM
	 */
	removeSignatureGM : function(){
		$("attendance-reimbursement-submited-admin .attendance-reimbursement-submitted-by-signature ").removeClass('reimbursement-signature-gm');
	},
});
