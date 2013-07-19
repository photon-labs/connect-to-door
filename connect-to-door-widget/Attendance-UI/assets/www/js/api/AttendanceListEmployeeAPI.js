Clazz.createPackage("com.attendance.api");

Clazz.com.attendance.api.AttendanceListEmployeeAPI = Clazz.extend(Clazz.com.attendance.abstract.API,{

	getListEmployee : function(statusSearching, searchingValue , dateStart, dateEnd ,callbackFunction) {
		var moduleList= "/attendance-list";
		var status = null;
		if(statusSearching == "username"){
			var	postBody = {"user_name" : searchingValue, "date_start" : dateStart, "date_end" : dateEnd};
		}else if(statusSearching == "employeeID"){
			var	postBody = {"employee_id" : searchingValue, "date_start" : dateStart, "date_end" : dateEnd};
		}else if(statusSearching == "projectID"){
			var	postBody = {"project_id" : searchingValue, "date_start" : dateStart, "date_end" : dateEnd};
		}else{
			var	postBody = {"date_start" : dateStart, "date_end" : dateEnd};
		}

		this.ajaxPostRequest(moduleList, postBody, callbackFunction);
	},
	
	getEmployee : function(employeeId,callbackFunction) {
		var module = "/list-employee";
		var postBody = {"employee_id":employeeId};
		this.ajaxPostRequest(module, postBody, callbackFunction);
	}

});
