Clazz.createPackage("com.attendance.widget.list");
Clazz.com.attendance.widget.list.ListDetail = Clazz.extend(Clazz.WidgetWithTemplate, {
	templateUrl  : "../template/attendanceList/attendanceListDetail.tmp",
	defaultContainer : "attendance\\:list-detail",	
	name : "attendanceListDetail",

	//listener
	PushDetailPersonListener : null,
	cookieAPI : null,
	FilterPanelListener : null,
	data : {person:[]},
	printDataIntoCsv: null,

	//sorting status
	sortName : true,
	sortEmpID :true,
	sortProjectID: true,

	/**
	 * @author andhika_p
	 * initialize construct object
	 */
	initialize : function(config){
		this.printDataIntoCsv = new Clazz.com.attendance.widget.common.PrintDataIntoCsv();
		this.PushDetailPersonListener = new Clazz.com.attendance.widget.listener.PushDetailPersonListener();
		this.FilterPanelListener = new Clazz.com.attendance.widget.listener.FilterPanelListener();
		this.cookieAPI = new Clazz.com.attendance.api.CookieAPI();
	}, 

	bindUI : function(){
		var self = this;
		var userIdEmployee = this.cookieAPI.getUserIdEmployee();
		this.reNumberingList();
		var authority = this.cookieAPI.getAuthority();
		if (authority == "Admin" 
			|| authority == "Super Admin") {
			$('.li-name').css('cursor','pointer');
		}

		var itemTextValue = $('.item-text-name').text();
		if(itemTextValue == "" || itemTextValue == undefined || itemTextValue == null){
			$('.attendance-list-print').hide();
		}

		this.setActionButtonClick();
		var pane = $('.scroll-pane');
		pane.jScrollPane(
				{
					showArrows: true,
					verticalArrowPositions: 'os',
					horizontalArrowPositions: 'os',
					autoReinitialise: true,
				}
		);

		this.FilterPanelListener.cekData();
		this.setListHeight(this.data.person.length);

		$('.attendance-list-print').click(function(){
			self.setPrintDataAndPrint(self.data.person);
		});

		var authority = this.cookieAPI.getAuthority();
		if(authority == 'Employee' || authority == 'Project Manager'){
			$('.attendance-list-print').remove();
		}
	},

//	set data & print data into csv
	setPrintDataAndPrint : function(dataDetail){
		var data = [{
			'no': 'No',
			'employee_name': 'Name',
			'employee_id': 'Employee ID',
			'project_id': 'Project ID',
			'total_attendance': 'Total Attendance',
			'total_working': 'Total Working',
			'total_leave': 'Total Leave',
			'average_working_hour': 'Average Working Hour'
		}];
		for(var i=1, index=0; index < dataDetail.length; index++, i++){
			var dataComplete = {
					'no': i,
					'employee_name': dataDetail[index].employee_name,
					'employee_id': dataDetail[index].employee_id,
					'project_id': dataDetail[index].project_id,
					'total_attendance': dataDetail[index].total_attendance,
					'total_working': dataDetail[index].total_working,
					'total_leave': dataDetail[index].total_leave,
					'average_working_hour': dataDetail[index].average_working_hour
			};
			data.push(dataComplete);
		}
		this.printDataIntoCsv.print(data);
	},

	reNumberingList : function(){
		var number = 0;	
		$('.li-no .item-text').empty();
		$('.attendance-ul').each(function(){
			$('.attendance-ul').eq(number).find('.li-no .item-text').append(++number +'.');
		});
	},

	/**
	 * @author andhika_p
	 * give action for button in the template
	 */
	setActionButtonClick : function(){
		var self = this;
		$('.li-name').dblclick(function(){
			indexUl = $('.li-name').index(this);
			var employeeId = $('.attendance-ul').eq(indexUl).find('.li-employee .item-text').text();
			var projectID = $('.attendance-ul').eq(indexUl).find('.li-project .item-text').text();
			var employeeName = $(this).text();

			self.PushDetailPersonListener.buttonCallDetailClick(employeeId, projectID, employeeName);		
		});

		$(".attendance-list-header-name").click(function(){
			if(self.sortName == true){
				var sortingData = self.data.person.sort(self.sortByNameAsc); 
				self.sortName = false;
			}
			else{
				var sortingData = self.data.person.sort(self.sortByNameDesc); 
				self.sortName = true;
			}
			self.render();
			self.reNumberingList();
		});

		$(".attendance-list-header-employee-id").click(function(){		
			if(self.sortEmpID == true){
				var sortingData = self.data.person.sort(self.sortByEmployeeIDAsc); 
				self.sortEmpID = false;
			}
			else{
				var sortingData = self.data.person.sort(self.sortByEmployeeIDDesc); 
				self.sortEmpID = true;
			}
			self.render();
			self.reNumberingList();
		});

		$(".attendance-list-header-project-id").click(function(){
			if(self.sortProjectID == true){
				var sortingData = self.data.person.sort(self.sortByProjectIDAsc); 
				self.sortProjectID = false;
			}
			else{
				var sortingData = self.data.person.sort(self.sortByProjectIDDesc); 
				self.sortProjectID = true;
			}
			self.render();
			self.reNumberingList();
		});


	},

	/**
	 * @author andhika_p
	 * sorting JSON data by name ascending
	 */
	sortByNameAsc : function(x,y){
		var value = ((x.employee_name == y.employee_name) ? 0 : ((x.employee_name > y.employee_name) ? 1 : -1 ));
		return value;
	},

	/**
	 * @author andhika_p
	 * sorting JSON data by name descending
	 */
	sortByNameDesc : function(x,y){
		var value = ((x.employee_name == y.employee_name) ? 0 : ((x.employee_name < y.employee_name) ? 1 : -1 ));	
		return value;
	},

	/**
	 * @author andhika_p
	 * sorting JSON data by Employee ID ascending
	 */
	sortByEmployeeIDAsc : function(x,y){
		var value = ((x.employee_id == y.employee_id) ? 0 : ((x.employee_id > y.employee_id) ? 1 : -1 ));
		return value;
	},

	/**
	 * @author andhika_p
	 * sorting JSON data by Employee ID descending
	 */
	sortByEmployeeIDDesc : function(x,y){
		var value = ((x.employee_id == y.employee_id) ? 0 : ((x.employee_id < y.employee_id) ? 1 : -1 ));
		return value;
	},

	/**
	 * @author andhika_p
	 * sorting JSON data by Project ID ascending
	 */
	sortByProjectIDAsc : function(x,y){
		var value = ((x.project_id == y.project_id) ? 0 : ((x.project_id > y.project_id) ? 1 : -1 ));
		return value;
	},

	/**
	 * @author andhika_p
	 * sorting JSON data by Project ID descending
	 */
	sortByProjectIDDesc : function(x,y){
		var value = ((x.project_id == y.project_id) ? 0 : ((x.project_id < y.project_id) ? 1 : -1 ));
		return value;
	},

	setListHeight : function(dataLength){
		if(dataLength !== 0 && dataLength < 11){
			var listHeight = dataLength * 30;
			$(".attendance-list-item").css("height",listHeight)
		}else if(dataLength > 10){
			$(".attendance-list-item").css("height","300")
		}else{
			$(".attendance-list-item").css("height","0")
		}

	},

	fillListData : function(dataList){
		this.data.person = dataList;
		this.render();
	},

	clearList : function(){
		this.data.person = {};
		$('.jspPane').empty();
	}
});