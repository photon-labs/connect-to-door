Clazz.createPackage("com.attendance.widget.module.attendanceReimbursement");

Clazz.com.attendance.widget.module.attendanceReimbursement.AttendanceReimbursementSignatureInsert = Clazz.extend(Clazz.WidgetWithTemplate, {
	// default container place
	defaultContainer : "attendance\\:reimbursement-signature-insert",
	templateUrl: "../template/attendanceReimbursement/attendanceReimbursementSignatureInsert.tmp",
	
	CookieAPI:null,
	statusSignature:null,
	reimbersementStatus:null,
	insertSignatureListener:null,
	
	signatureHistory : null,
	signatureStorage : {
		user : null,
		apm : null,
		gm : null,
		},
	/**
	 * @author ty_astanto
	 * initialize construct object
	 */
	initialize : function(config){
		var self = this;
		this.CookieAPI = new Clazz.com.attendance.api.CookieAPI();
		var requestID = this.CookieAPI.getRequest();
		if(requestID !== null ){
			self.signatureHistory = config.history;
		};
		
		this.insertSignatureListener = new Clazz.com.attendance.widget.listener.InsertSignatureListener();
		this.reimbursementStatus =  this.CookieAPI.getReimbursementStatus();
	},


	bindUI : function(){
		var self = this;
		$('.attendance-reimbursement-submitted-by-insert-button').show();
		this.CookieAPI = new Clazz.com.attendance.api.CookieAPI();
		var requestID = this.CookieAPI.getRequest();
		if(requestID !== null ){
			self.getSignature(self.signatureHistory);
			
		};
		this.clearLocalStorage();
	},
	
	clearLocalStorage : function(){
		var self = this;
		if(this.reimbursementStatus == "complete" || this.reimbursementStatus == "complete-apm"){
			self.insertSignatureListener.clearRequestLocalStorage();
		}
	},
	
	 getSignature : function(data){
		 var self = this;
		 for(var index in data){
			 if(data[index].status == "complete-apm" || data[index].status == "complete"){
				 self.signatureStorage.gm = data[index].signature;
			 }else if(data[index].status == "gm-apm" || data[index].status == "gm"){
				 self.signatureStorage.apm = data[index].signature;
			 }else if(data[index].status == "apm"){
				 self.signatureStorage.user = data[index].signature;
			 }
		 }
		 this.imageSignatureController();
	 },

	/**
	 * @author dhika_p
	 * function to control image signature
	 */
	imageSignatureController : function(){
		var self = this;
		if (this.reimbersementStatus == "apm"){
			self.setImageSignatureAdmin(self.signatureStorage.user);	
		}
		else if (this.reimbersementStatus == "gm-apm"){
			self.setImageSignatureAPM(self.signatureStorage.apm);	
		}
		else if (this.reimbersementStatus == "gm"){
			self.setImageSignatureAdmin(self.signatureStorage.user);	
			self.setImageSignatureAPM(self.signatureStorage.apm);	
		}
		else if (this.reimbersementStatus == "complete"){
			self.setImageSignatureAdmin(self.signatureStorage.user);	
			self.setImageSignatureAPM(self.signatureStorage.apm);	
			self.setImageSignatureGM(self.signatureStorage.gm);	
		}
		else if (this.reimbersementStatus == "complete-apm"){
			self.setImageSignatureAPM(self.signatureStorage.apm);
			self.setImageSignatureGM(self.signatureStorage.gm);	
		}
		else{
			self.setImageSignatureAdmin(self.signatureStorage.user);	
			self.setImageSignatureAPM(self.signatureStorage.apm);	
			self.setImageSignatureGM(self.signatureStorage.gm);	
		}

	},

	setImageSignatureAPM : function(link){
		$('.attendance-reimbursement-submitted-by-insert-button').remove();
		$(".insert-reimbursement-warning").removeClass("attendance-form-visible");
		$('.attendance-reimbursement-submited-apm .attendance-reimbursement-submitted-by-signature').css("background-image","url('"+ link +"')");
		$('.attendance-reimbursement-submited-apm .attendance-reimbursement-submitted-by-signature').css("background-size", "contain");
	},
	setImageSignatureAdmin : function(link){
		$(".insert-reimbursement-warning").removeClass("attendance-form-visible");
		$('.attendance-reimbursement-submitted-by-insert-button').remove();
		$('.attendance-reimbursement-submited-admin .attendance-reimbursement-submitted-by-signature').css("background-image","url('"+ link +"')");
		$('.attendance-reimbursement-submited-admin .attendance-reimbursement-submitted-by-signature').css("background-size", "contain");

	},
	setImageSignatureGM : function(link){
		$(".insert-reimbursement-warning").removeClass("attendance-form-visible");
		$('.attendance-reimbursement-submitted-by-insert-button').remove();
		$('.attendance-reimbursement-submited-gm .attendance-reimbursement-submitted-by-signature').css("background-image","url('"+ link +"')");
		$('.attendance-reimbursement-submited-gm .attendance-reimbursement-submitted-by-signature').css("background-size", "contain");

	},

		
});
