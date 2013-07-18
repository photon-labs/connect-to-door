Clazz.createPackage("com.attendance.widget.detail");
Clazz.com.attendance.widget.detail.TitleInformationDetail = Clazz.extend(Clazz.WidgetWithTemplate, {
	templateUrl  : "../template/attendanceDetail/attendanceDetailNavigationLeft.tmp",
	defaultContainer : "attendance\\:detail-navigation-left",
	name : "attendanceDetailNavigationLeft",
	data : {
		employeeName : null,
		employeeID : null,
		projectID : null
		},
	initialize : function(config){
		this.data.employeeName = config.employeeName;
		this.data.employeeID = config.employeeID;
		this.data.projectID = config.projectID;
	},
	
	postRender : function(element){
	},
	
});