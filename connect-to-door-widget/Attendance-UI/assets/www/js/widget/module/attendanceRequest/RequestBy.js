Clazz.createPackage("com.attendance.widget.module.request");
Clazz.com.attendance.widget.module.request.RequestBy = Clazz.extend(Clazz.WidgetWithTemplate, {
	templateUrl  : "../template/attendanceRequest/attendanceRequestBy.tmp",
	name : "attendanceRequestBy",
	defaultContainer : "request\\:by",
	data : { employeeName : null, employeeID : null},
	readInputListener : null,

	/**
	 * @author andhika_p
	 * initialize construct object and fill data
	 */
	initialize : function(config){
		var self = this;
		this.CookieAPI = new Clazz.com.attendance.api.CookieAPI();
		this.readInputListener = new Clazz.com.attendance.widget.listener.ReadInputListener();
		
		//get voucher status
		var idRequest = this.CookieAPI.getRequest();
		if (idRequest !== "" && idRequest !== null && idRequest !== undefined){
			self.data.employeeID =config.employeeId;
			self.data.employeeName = config.employeeName;
		}

	},

	bindUI: function(){
		var self = this;
		var requestID = this.CookieAPI.getRequest();
		if(requestID == null ){
			var employeeData ={};
			employeeData = self.readInputListener.getPersonInformationFromAPI();
		}
	},

	getPersonInformation : function(data){
		$('.attendance-request-name .request-by-value-finish').text(data.name);
		$('.attendance-request-id .request-by-value-finish').text(data.employeeID);
	},

});