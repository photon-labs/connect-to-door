Clazz.createPackage("com.attendance.api");
Clazz.com.attendance.api.GetListAPMGMAPI = Clazz.extend(Clazz.com.attendance.abstract.API,{
	getList : function(listParameter, callbackFunction) {
		var moduleGetList = "/list-recipients";
		var postBody =  {parameter : listParameter};
		this.ajaxPostRequest(moduleGetList, postBody, callbackFunction);
	},
});

