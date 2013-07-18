Clazz.createPackage("com.attendance.widget.listener");
Clazz.com.attendance.widget.listener.FilterPanelListener = Clazz.extend(Clazz.Widget, {

	CookieAPI:null,
	listAPI : null,

	loadingMask : null,
	errorAlert: null,

	initialize : function(config){
		var self = this;
		this.CookieAPI = new Clazz.com.attendance.api.CookieAPI();
		this.loadingMask = new Clazz.com.attendance.widget.common.LoadingMask();

		require(["api/AttendanceListEmployeeAPI"],function(){
			self.listAPI = new Clazz.com.attendance.api.AttendanceListEmployeeAPI();
		});

	},

	getDataListAttendanceFromAPi : function(searchingStatus, Searchingvalue, dateStart, dateEnd){
		var self = this;
		this.loadingMask.showLoading();
		self.listAPI.getListEmployee(searchingStatus, Searchingvalue, dateStart, dateEnd,function(response){
			if(response.data.length !== 0 && response.status == "success"){
				listDetail  = new Clazz.com.attendance.widget.list.ListDetail();
				listDetail.fillListData(response.data);
				self.loadingMask.removeLoading();
				$('.attendance-header-list').remove();
				$('.attendance-list-print').show();
			}else if(response.data.length == 0 && response.status == "success"){
				self.loadingMask.removeLoading();
				var textError = null;
				if (searchingStatus == "employeeID"){
					textError = "Employee ID";
				}else if(searchingStatus == "projectID"){
					textError = "Project ID";
				}else if(searchingStatus == "username"){
					textError = "Name";
				}else {textError = "Date"}

				self.errorAlert = new Clazz.com.attendance.widget.common.ErrorAlert({errorText : "Incorrect "+ textError});
				self.errorAlert.showAlert("nonIdle");
			}
			else{
				self.errorAlert = new Clazz.com.attendance.widget.common.ErrorAlert({errorText : response.message});
				self.errorAlert.showAlert("nonIdle");
			}
		});
	},

	cekData : function(){
		ListFilterPanel = new Clazz.com.attendance.widget.list.ListFilterPanel();
		var date = ListFilterPanel.cekDateBox();
		if(date.dateFrom == null && date.dateTo == null && date.dateFrom == undefined && date.dateTo == undefined){
			listDetail  = new Clazz.com.attendance.widget.list.ListDetail();
			listDetail.clearList();
		}
	},

});
