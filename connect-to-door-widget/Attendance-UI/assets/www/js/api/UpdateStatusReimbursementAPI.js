Clazz.createPackage("com.attendance.api");

Clazz.com.attendance.api.UpdateStatusReimbursementAPI = Clazz.extend(Clazz.com.attendance.abstract.API,{

	UpdateReimbursementStatus : function(reimbursement_id, statusReimburse, employeeID, assignTo,callbackFunction) {
		var moduleUpdate = "/reimburse";
		var postBody = {assign_to : assignTo, reimbursement_id : reimbursement_id, status : statusReimburse, employee_id : employeeID};
		this.ajaxPostRequest(moduleUpdate, postBody, callbackFunction);
	},

});



