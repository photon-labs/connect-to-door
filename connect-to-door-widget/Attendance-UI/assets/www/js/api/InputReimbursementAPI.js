Clazz.createPackage("com.attendance.api");

Clazz.com.attendance.api.InputReimbursementAPI = Clazz.extend(Clazz.com.attendance.abstract.API,{

	insertMasterDetailReimbursement : function(employeeID, cashAdvance, type, detail, statusReimbursement,assignTo , callbackFunction) {
		var moduleInsertReimburse = "/reimburse";
		var postBody = {"assign_to" : assignTo,"employee_id" : employeeID, "cash_advance" : cashAdvance, "type" : type , "detail" : detail, "status":statusReimbursement};
		this.ajaxPostRequest(moduleInsertReimburse, postBody, callbackFunction);
	},
});

