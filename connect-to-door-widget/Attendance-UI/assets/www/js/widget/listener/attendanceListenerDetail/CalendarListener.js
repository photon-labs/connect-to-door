Clazz.createPackage("com.attendance.widget.listener");
Clazz.com.attendance.widget.listener.CalendarListener = Clazz.extend(Clazz.Widget, {
	detailAttendanceEmployeeAPI : null,
	loadingMask : null,
	CookieAPI : null,
	updateDetailEmployeeAPI : null,
	detailCalendar : null,
	
	initialize : function(config){
		var self = this;
		this.detailCalendar = config.detailCalendar;
		this.loadingMask = new Clazz.com.attendance.widget.common.LoadingMask();
		this.CookieAPI = new Clazz.com.attendance.api.CookieAPI();
		this.detailCalendar = config.detailCalendar;
		require(["api/DetailAttendanceEmployeeAPI", "api/UpdateDetailEmployeeAPI"],function(){
			self.updateDetailEmployeeAPI = new Clazz.com.attendance.api.UpdateDetailEmployeeAPI();
			self.detailAttendanceEmployeeAPI = new Clazz.com.attendance.api.DetailAttendanceEmployeeAPI();
		});
	},

	saveDetailChange : function(dayStart, dayEnd){
		var self = this;
		var index = 0;
		var employeeData = [];
		$('.attendance-detail-calendar-perday').each(function(){
			var divDate = $('.attendance-detail-calendar-perday').eq(index).find('.attendance-detail-box-title .attendance-detail-box-text').text();
			var divAbsence = null;
			absenceBox = $('.attendance-detail-calendar-perday').eq(index).find('.value-calendar').data("absence");
			if(absenceBox == "holiday"){
				divAbsence = "holiday";
			}else if(absenceBox == "c-off"){
				divAbsence = "c-off";
			}else if(absenceBox == "present"){
				divAbsence = "present"
			}else{
				divAbsence = $('.attendance-detail-calendar-perday').eq(index).find('.attendance-detail-box-value-alpha').text();
			}
			objectList={param_date:divDate, param_absence:divAbsence};
			employeeData.push(objectList);
			index++;
		});
		var adminID = this.CookieAPI.getUserIdEmployee();
		var employeeID = $('.attendance-detail-value-EmpID').text();
		this.loadingMask.showLoading();
		this.updateDetailEmployeeAPI.UpdateDetail(adminID, employeeID, employeeData, function(response){
			if(response.status == "success" || response.status == "Success"){
				self.getDetailEmployeeFromAPI(employeeID, dayStart, dayEnd);
				self.loadingMask.removeLoading();
				require(["widget/common/ErrorAlert"],function(){
					var errorAlert = new Clazz.com.attendance.widget.common.ErrorAlert({errorText : response.message});
					errorAlert.showAlert("nonIdle");
				});
			}else{
				self.loadingMask.removeLoading();
				require(["widget/common/ErrorAlert"],function(){
					var errorAlert = new Clazz.com.attendance.widget.common.ErrorAlert({errorText : response.message});
					errorAlert.showAlert("nonIdle");
				});
			}
		});
	},

	getDetailEmployeeFromAPI : function(employeeId, dayStart, dayEnd){
		var self = this;
		dayStart = this.convertDate(dayStart);
		dayEnd = this.convertDate(dayEnd);
		this.loadingMask.showLoading();
		this.detailAttendanceEmployeeAPI.getDetailEmployee(employeeId, dayStart, dayEnd,function(response){
			if (response.status == "success"){
				self.loadingMask.removeLoading();
				self.detailCalendar.employeeId = employeeId;
				self.detailCalendar.dayStart = dayStart;
				self.detailCalendar.dayEnd = dayEnd;
				self.detailCalendar.fillDetailEmployeeData(response.data);
				self.detailCalendar.dataPrint = response.data;
			}else{
				self.loadingMask.removeLoading();
				self.errorAlert = new Clazz.com.attendance.widget.common.ErrorAlert({errorText :  response.message});
				self.errorAlert.showAlert("nonIdle");
			}
		});
	},
	
	convertDate : function(date){
		lengthDate = date.length;
		var index = 0;
		for(index = 0; index < lengthDate ; index++){
			date.replace('/','-');
		}
		return date;
	},
});