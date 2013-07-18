Clazz.createPackage("com.attendance.widget.module.attendanceReimbursement");

Clazz.com.attendance.widget.module.attendanceReimbursement.AttendanceReimbursementSignature = Clazz.extend(Clazz.WidgetWithTemplate, {
	// template URL, used to indicate where to get the template
	templateUrl: "../template/attendanceReimbursement/attendanceReimbursementSignature.tmp",
	name : "attendanceReimbursementSignature",
	defaultContainer : "reimbursement\\:signature",
	attendanceReimbursementSignatureInsert:null,
	attendanceReimbursementSignatureButton:null,
	attendanceReimbursementSignatureDropdown:null,
	reimbursementStatus : null,
	CookieAPI: null,

	signatureHistory : null,
	
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
		}
		this.attendanceReimbursementSignatureInsert = new Clazz.com.attendance.widget.module.attendanceReimbursement.AttendanceReimbursementSignatureInsert({history :{}});
		this.reimbursementStatus = this.CookieAPI.getReimbursementStatus();
		this.selectSignatureUIByReimbursementStatus();
	},

	postRender : function(element) {		
		var self = this;
		var requestID = this.CookieAPI.getRequest();
		if(requestID !== null ){
			require(["widget/module/attendanceReimbursement/AttendanceReimbursementSignatureInsert"],function(){
				self.attendanceReimbursementSignatureInsert = new Clazz.com.attendance.widget.module.attendanceReimbursement.AttendanceReimbursementSignatureInsert({
					history : self.signatureHistory
				});
				
				self.attendanceReimbursementSignatureInsert.render();
			});
		}else{
			self.attendanceReimbursementSignatureInsert.render();
		}


		require(["widget/module/attendanceReimbursement/AttendanceReimbursementSignatureButton",
		         "api/CookieAPI"],function(){
			self.attendanceReimbursementSignatureButton = new Clazz.com.attendance.widget.module.attendanceReimbursement.AttendanceReimbursementSignatureButton();
			self.attendanceReimbursementSignatureButton.render();
		});

		require(["widget/module/attendanceReimbursement/AttendanceReimbursementSignatureDropdown"],function(){
			self.attendanceReimbursementSignatureDropdown = new Clazz.com.attendance.widget.module.attendanceReimbursement.AttendanceReimbursementSignatureDropdown();
			self.attendanceReimbursementSignatureDropdown.render();
		});


	},

	
	/**
	 * @author ty_astanto
	 * render widget on profile template
	 */	
	selectSignatureUIByReimbursementStatus : function(){
		var self = this;
		require(["lib/handlebars-1.0.0.beta.6"],function(){
			Handlebars.registerHelper('if-build',function(opt){
				if(self.reimbursementStatus == "build"){
					return opt.fn(this);
				}
			});
			Handlebars.registerHelper('if-build-apm',function(opt){
				if(self.reimbursementStatus == "build-apm"){
					return opt.fn(this);
				}
			});
			Handlebars.registerHelper('if-apm',function(opt){
				if(self.reimbursementStatus == "apm"){
					return opt.fn(this);
				}		
			});
			Handlebars.registerHelper('if-gm-apm',function(opt){
				if(self.reimbursementStatus == "gm-apm"){
					return opt.fn(this);
				}		
			});
			Handlebars.registerHelper('if-gm',function(opt){
				if(self.reimbursementStatus == "gm"){
					return opt.fn(this);
				}			
			});
			Handlebars.registerHelper('if-complete',function(opt){
				if(self.reimbursementStatus == "complete"){
					return opt.fn(this);
				}

			});
			Handlebars.registerHelper('if-complete-apm',function(opt){
				if(self.reimbursementStatus == "complete-apm"){
					return opt.fn(this);
				}		
			});
		});
	},
});
