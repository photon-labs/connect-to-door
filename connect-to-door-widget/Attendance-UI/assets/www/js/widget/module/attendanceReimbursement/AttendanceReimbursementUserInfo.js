Clazz.createPackage("com.attendance.widget.module.attendanceReimbursement");

Clazz.com.attendance.widget.module.attendanceReimbursement.AttendanceReimbursementUserInfo = Clazz.extend(Clazz.WidgetWithTemplate, {
	templateUrl: "../template/attendanceReimbursement/attendanceReimbursementUserInfo.tmp",
	personInformationListener : null,
	data : {},
	headerItem : {},
	CookieAPI : null,
	/**
	* @author dhika_p
	* initialize construct object
	*/
	initialize : function(config){
		//get person information from API
		this.personInformationListener = new Clazz.com.attendance.widget.listener.PersonInformationListener();
		var self = this;
		this.CookieAPI = new Clazz.com.attendance.api.CookieAPI();
		var requestID = this.CookieAPI.getRequest();
		if(requestID !== null && requestID !== undefined && requestID !== ""){
			self.headerItem = config.headerItem;
		}
	},

	
	bindUI : function(){
		var self = this;
		var requestID = this.CookieAPI.getRequest();
		if(requestID == null ){
			self.personInformationListener.getPersonInformationFromAPI();
		}else{
			self.getPersonInformation(self.headerItem)
		}
		
	},

	getPersonInformation : function(data){
		if(data.projectID  == ""){
			emptyText = "-";
		}else{
			emptyText = data.projectID ;
		}
		
		$('.attendance-reimbursement-top-text-right .attendance-reimbursement-top-text-employee-name').text(data.name);
		$('.attendance-reimbursement-top-text-right .attendance-reimbursement-top-text-employee-id').text(data.employeeID);
		$('.attendance-reimbursement-top-text-right .attendance-reimbursement-top-text-project-id').text(emptyText);

	},
	
	// default container place
	defaultContainer : "attendance\\:reimbursement-userinfo"	
});
