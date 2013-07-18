Clazz.createPackage("com.attendance.api");

Clazz.com.attendance.api.CreateAndEditAccountAPI = Clazz.extend(Clazz.com.attendance.abstract.API,{

	createAndEditAccount : function(status, employeeID, username, projectID, name, emailPhoton, facebookId, startWork, jobRole, annual, coff,
						condolences, married, maternity, paternity, onsite, sick, dataURLSignature, gender, callbackFunction) {
		var moduleLogin = "/create-edit-account";
		var postBody = {"status" : status, "employee_id" : employeeID, "username" : username, "project_id" : projectID, "name" : name,
						"email_photon" : emailPhoton, "facebook_id" : facebookId, "start_work" : startWork, "job_role" : jobRole,
						"annual" : annual, "c_off" : coff, "condolences" : condolences, "married" : married, "maternity" : maternity,
						"paternity" : paternity, "onsite" : onsite, "sick" : sick, "signature": dataURLSignature, "gender": gender};
		this.ajaxPostRequest(moduleLogin, postBody, callbackFunction);
	},

});