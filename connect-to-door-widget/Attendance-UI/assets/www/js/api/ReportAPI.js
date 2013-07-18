Clazz.createPackage("com.attendance.api");

Clazz.com.attendance.api.ReportAPI = Clazz.extend(Clazz.com.attendance.abstract.API,{

	reportAPI : function(status,month,callbackFunction) {
		var moduleReport = "/report";
		var postBody = {"status":status,"month":month};
		this.ajaxPostRequest(moduleReport, postBody, callbackFunction);
	},

});