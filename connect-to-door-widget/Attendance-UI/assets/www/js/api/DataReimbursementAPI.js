Clazz.createPackage("com.attendance.api");

Clazz.com.attendance.api.ReimburseAPI = Clazz.extend(Clazz.com.attendance.abstract.API,{

	getReimbursementDetail : function(searchByParameter, reimburse_id, callbackFunction) {
		var moduleDetail= "/reimburse";
		var postBody = {"reimbursement" : reimburse_id};
		this.ajaxPostRequest(moduleDetail, postBody, callbackFunction);
	},

});