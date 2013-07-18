Clazz.createPackage("com.attendance.widget.listener");
Clazz.com.attendance.widget.listener.PersonInformationListener = Clazz.extend(Clazz.Widget, {
	//local storage
	CookieAPI : null,
	profileAPI : null,

	personData : {
		name :"-",
		employeeID : "-",
		projectID : "-",
		emailAddress : "-",
		startWorking : "-",
		position : "-",
		annual : "-",
		coff : "-",
		condolences : "-",
		married : "-",
		maternity : "-",
		paternity : "-",
		onSite : "-",
		sick : "-",
	},
	/**
	 * @author andhika_p
	 * initialize construct object
	 */
	initialize : function(config){
		var self = this;
		this.CookieAPI = new Clazz.com.attendance.api.CookieAPI();
		require(["api/ProfileAPI"],function(){
			self.profileAPI = new Clazz.com.attendance.api.ProfileAPI();
		});
	},

	getPersonInformationFromAPI : function(){
		var self = this;
		var employee_id = this.CookieAPI.getUserIdEmployee();
		var searchParameter = "employee_id"
		this.profileAPI.getPersonInformation(searchParameter, employee_id,function(response){
			if (response != undefined && response != null){
				self.personData.name =response.employee_name;
				self.personData.employeeID = response.employee_id;
				self.personData.projectID = response.project_id;
				self.personData.emailAddress = response.employee_email_photon;
				self.personData.startWorking = response.employee_start_work;
				self.personData.position = response.authority;
				self.personData.annual = response.annual;
				self.personData.coff = response.c_off;
				self.personData.condolences = response.condolences;
				self.personData.married = response.married;
				self.personData.maternity = response.maternity;
				self.personData.paternity = response.paternity;
				self.personData.onSite = response.onsite;
				self.personData.sick = response.sick;
				
				var personInformation = new Clazz.com.attendance.widget.module.profile.PersonInformation();
				var reimbursementUserInfo = new Clazz.com.attendance.widget.module.attendanceReimbursement.AttendanceReimbursementUserInfo({headerItem : {}});
				personInformation.getPersonInformation(self.personData);
				reimbursementUserInfo.getPersonInformation(self.personData);
			}
		});
	},

	
});
