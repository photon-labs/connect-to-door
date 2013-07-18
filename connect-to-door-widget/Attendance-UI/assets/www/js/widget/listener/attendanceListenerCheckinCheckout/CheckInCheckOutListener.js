Clazz.createPackage("com.attendance.widget.listener");

Clazz.com.attendance.widget.listener.CheckInCheckOutListener = Clazz.extend(Clazz.Widget, {

	listEmployeeAPI : null,
	cookieAPI : null,
	listEmployeeArray : null,
	listDataEmployeeArray : null,
	updateCheckInOutAPI : null,
	initialize : function(){
		var self = this;
		this.listEmployeeArray = new Array();
		this.listDataEmployeeArray = new Array();

		this.cookieAPI = new Clazz.com.attendance.api.CookieAPI();
	},

	goToUpdatePage : function(listDataEmployeeArray,listEmployeeArray){
		require(["widget/module/checkInCheckOut/AttendanceCheckInCheckout"],
				function(){
			var attendanceCheckInOut = new Clazz.com.attendance.widget.module.checkInCheckOut.AttendanceCheckInCheckout({
				listDataEmployeeArray : listDataEmployeeArray,
				listEmployeeArray : listEmployeeArray
			});
			Clazz.navigationController.push(attendanceCheckInOut);
		});
	},

	getEmployeeList : function(){
		var self = this;
		var ID = this.cookieAPI.getUserIdEmployee();
		require(["api/AttendanceListEmployeeAPI"],
				function(){
			self.listEmployeeAPI = new Clazz.com.attendance.api.AttendanceListEmployeeAPI();
			self.listEmployeeAPI.getEmployee(ID, function(response){
				if(response.status == "success"){
					for(var i in response.employee_list){
					self.listDataEmployeeArray.push(response.employee_list[i]);
					self.listEmployeeArray.push(response.employee_list[i].employee_name);
					}
					self.goToUpdatePage(self.listDataEmployeeArray,self.listEmployeeArray);
				}
				else{
					var win = window.open("","_self"); /* url = "" or "about:blank"; target="_self" */
					win.close();
				}
			});
		});


	}

});
