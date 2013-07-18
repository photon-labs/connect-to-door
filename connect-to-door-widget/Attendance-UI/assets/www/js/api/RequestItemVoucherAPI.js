Clazz.createPackage("com.attendance.api");

Clazz.com.attendance.api.RequestItemVoucherAPI = Clazz.extend(Clazz.com.attendance.abstract.API,{

	requestValue : function(requestParameter, idValue, callbackFunction) {
		if(requestParameter == "request"){
			var moduleParameter = "/attendance-request-details";
			var postBody = {"param_request_id":idValue};
		}else{
			var moduleParameter = "/reimburse";
			var postBody = {"reimbursement_id":idValue};
		}
		this.ajaxPostRequest(moduleParameter, postBody, callbackFunction);
	},

});