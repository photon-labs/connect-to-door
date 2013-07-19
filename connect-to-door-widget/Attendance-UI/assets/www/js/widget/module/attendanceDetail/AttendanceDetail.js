Clazz.createPackage("com.attendance.widget.detail");
Clazz.com.attendance.widget.detail.AttendanceDetail = Clazz.extend(Clazz.WidgetWithTemplate, {
	templateUrl  : "../template/attendanceDetail/attendanceDetail.tmp",
	name : "detail",
	
	//widget
	detailFooter : null,
	TitleInformationDetail : null,
	detailCalendar : null ,
	
	employeeID : null,
	projectID : null,
	employeeName : null,
	dayStart : null,
	dayEnd : null,
	
	initialize : function(config){
		var self = this;
		this.employeeID = config.employeeID;
		this.dayStart = config.dayStart;
		this.dayEnd = config.dayEnd;
		this.projectID = config.projectID;
		this.employeeName = config.employeeName;
		
		this.TitleInformationDetail = new Clazz.com.attendance.widget.detail.TitleInformationDetail({
			employeeName: self.employeeName,
			projectID: self.projectID,
			employeeID: self.employeeID,
		});
		
		this.detailCalendar = new Clazz.com.attendance.widget.detail.DetailCalendar({
			employeeID : self.employeeID,
			employeeName: self.employeeName,
			projectID: self.projectID,
			dayStart : self.dayStart,
			dayEnd : self.dayEnd
		});
		this.detailFooter = new Clazz.com.attendance.widget.common.Footer();
	},
	
	/**
	 * @author andhika_p
	 * this method for render widget 
	 */
	postRender : function(element){
		this.detailCalendar.render();
		this.TitleInformationDetail.render();
		this.detailFooter.render();	
	},

});