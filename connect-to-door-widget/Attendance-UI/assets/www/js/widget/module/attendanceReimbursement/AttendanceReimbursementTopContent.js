Clazz.createPackage("com.attendance.widget.module.attendanceReimbursement");

Clazz.com.attendance.widget.module.attendanceReimbursement.AttendanceReimbursementTopContent = Clazz.extend(Clazz.WidgetWithTemplate, {
	templateUrl: "../template/attendanceReimbursement/attendanceReimbursementTopContent.tmp",	
	attendanceReimbursementUserInfo:null,
	attendanceReimbursementItemized:null,
	attendanceReimbursementDropDown:null,
	headerItem : {},
	CookieAPI : null,
	
	/**
	* @author dhika_p
	* initialize construct object
	*/
	initialize : function(config){
		var self = this;
		this.CookieAPI = new Clazz.com.attendance.api.CookieAPI();
		var requestID = this.CookieAPI.getRequest();
		if(requestID !== null && requestID !== undefined && requestID !== ""){
			self.headerItem = config.headerItem;
			this.attendanceReimbursementUserInfo = new Clazz.com.attendance.widget.module.attendanceReimbursement.AttendanceReimbursementUserInfo({
				headerItem : self.headerItem
			});
			this.attendanceReimbursementDropDown = new Clazz.com.attendance.widget.module.attendanceReimbursement.AttendanceReimbursementDropDown({
				reimbursementType : self.headerItem.reimbursementType
			}); 
		}else{
			this.attendanceReimbursementUserInfo = new Clazz.com.attendance.widget.module.attendanceReimbursement.AttendanceReimbursementUserInfo();
			this.attendanceReimbursementDropDown = new Clazz.com.attendance.widget.module.attendanceReimbursement.AttendanceReimbursementDropDown(); 
		};
		require(["widget/listener/attendanceListenerVoucherReimbursement/AttendanceReimbursementSaveButtonListener"],function(){
			self.attendanceReimbursementItemized = new Clazz.com.attendance.widget.module.attendanceReimbursement.AttendanceReimbursementItemized();
		});				
		
	},

	postRender : function(element){
		this.attendanceReimbursementUserInfo.render();
		this.attendanceReimbursementDropDown.render();
		this.attendanceReimbursementItemized.render();		
	},
	
	/**
	* @author dhika_p
	* function to set action button in the template
	*/
	setActionButton : function(){
	
	},
	
	bindUI : function(){
		
	},

	// default container place
	defaultContainer : "attendance\\:reimbursement-top-content"	
});
