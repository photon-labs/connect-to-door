Clazz.createPackage("com.attendance.widget.listener");

data : null,

Clazz.com.attendance.widget.listener.FilterAndPrintDetailReport = Clazz.extend(Clazz.Widget, {
	loadingMask : null,

	initialize : function(){
		var self = this;
		this.loadingMask = new Clazz.com.attendance.widget.common.LoadingMask();
		require(["api/ProfileAPI"],function(){
			self.profileAPI = new Clazz.com.attendance.api.ProfileAPI();
		});
	},

	print: function(){
		var self = this;
		var inputDate = $('.input-month-year').val();
		var inputFilter = $('.input-filter-by').text();
		var date = inputDate.substring(0,2)+'-'+inputDate.substring(3,7);

		var fileName = "Attendance Report - "+inputFilter+" - "+date;
		if(self.validationPrint(inputDate, inputFilter) == 0){
//			$("#jqxgrid").jqxGrid('exportdata', 'csv', fileName);
			this.printCsv(this.data);
		}
	},

	printCsv : function(objArray){
		var data = [{
			'no': 'No',
			'employee_name': 'Name',
			'employee_id': 'Employee Id',
			'annual': 'Annual',
			'sick': 'Sick',
			'c_off': 'C-Off',
			'onsite': 'Onsite',
			'maternity': 'Maternity',
			'paternity': 'Paternity',
			'condolences': 'Condolences',
			'married': 'Married'
		}];
		for(i=0;i<objArray.length;i++){
			data.push(objArray[i]);
		}
		objArray = data;

		var array = typeof objArray != 'object' ? JSON.parse(objArray) : objArray;

		var str = '';

		for (var i = 0; i < array.length; i++) {
			var line = '';

			for (var index in array[i]) {
				line += array[i][index] + ',';
			}

			line.slice(0,line.Length-1); 

			str += line + '\r\n';
		}
		window.open( "data:text/csv;charset=utf-8," + escape(str))
	},

	validationPrint: function(inputDate, inputFilter){
		var valid = 0;

		if(inputDate == ""){
			$('.input-month-year').addClass('box_add-date_active-red-outline');
			valid=valid+1;
		}
		else{
			$('.input-month-year').removeClass('box_add-date_active-red-outline');
			valid=valid+0;
		}

		if(inputFilter == ""){
			$('.input-filter-by').addClass('box_w-dropdown_filter-by-red-outline');
			valid=valid+1;
		}
		else{
			$('.input-filter-by').removeClass('box_w-dropdown_filter-by-red-outline');
			valid=valid+0;
		}

		return valid;
	},

	showData : function(filter, month){
		var self = this
		var inputDate = $('.input-month-year').val();
		var inputFilter = $('.input-filter-by').text();

		if(inputFilter == "Before Adjustment"){
			inputFilter = "before";
		}
		if(inputFilter == "Adjustment"){
			inputFilter = "adjustment";
		}
		if(inputFilter == "After Adjustment"){
			inputFilter = "after";
		}

		var reportAPI = new Clazz.com.attendance.api.ReportAPI();
		this.loadingMask.showLoading();
		reportAPI.reportAPI(inputFilter,inputDate , function(response){
			if(response.status == "success"){
				self.selectData(response.data);
				self.loadingMask.removeLoading();
			}else{
				self.loadingMask.removeLoading();
				require(["widget/common/ErrorAlert"],function(){
					var errorAlert = new Clazz.com.attendance.widget.common.ErrorAlert({errorText:"Can't connect"});
					errorAlert.showAlert("nonIdle");        
				});
			}
		}); 

	},

	sortData : function(data){
		var sortData = [];
		for(i=0;i<data.length;i++){
			var x = {
				'no': data[i].no,
				'employee_name': data[i].employee_name,
				'employee_id': data[i].employee_id,
				'annual': data[i].annual,
				'sick': data[i].sick,
				'c_off': data[i].c_off,
				'onsite': data[i].onsite,
				'maternity': data[i].maternity,
				'paternity': data[i].paternity,
				'condolences': data[i].condolences,
				'married': data[i].married
			};
			sortData.push(x);
		}
		return sortData;
	},

	selectData: function(data){
		var sortData = this.sortData(data);
		this.data = sortData;
		var dataJqxgrid = $('<div class="data-jqxgrid-dom" id="jqxgrid"></div>');
		var contentTable = $('.attendance-content-table');
		$('.attendance-header-report').remove();
		$('.data-jqxgrid-dom').remove();
		contentTable.append(dataJqxgrid);

		var theme = getTheme();
		var customsortfunc = function (column, direction) {
			var sortdata = new Array();

			if (direction == 'ascending') direction = true;
			if (direction == 'descending') direction = false;

			if (direction != null) {
				for (i = 0; i < data.length; i++) {
					sortdata.push(data[i]);
				}
			}
			else sortdata = data;

			var tmpToString = Object.prototype.toString;
			Object.prototype.toString = (typeof column == "function") ? column : function () { return this[column] };
			if (direction != null) {
				sortdata.sort(compare);
				if (!direction) {
					sortdata.reverse();
				}
			}
			source.localdata = sortdata;
			$("#jqxgrid").jqxGrid('databind', source, 'sort');
			Object.prototype.toString = tmpToString;
		}

		// custom comparer.
		var compare = function (value1, value2) {
			value1 = String(value1).toLowerCase();
			value2 = String(value2).toLowerCase();

			try {
				var tmpvalue1 = parseFloat(value1);
				if (isNaN(tmpvalue1)) {
					if (value1 < value2) { return -1; }
					if (value1 > value2) { return 1; }
				}
				else {
					var tmpvalue2 = parseFloat(value2);
					if (tmpvalue1 < tmpvalue2) { return -1; }
					if (tmpvalue1 > tmpvalue2) { return 1; }
				}
			}
			catch (error) {
				var er = error;
			}

			return 0;
		};
		var source = {
				localdata: data,
				sort: customsortfunc,
				datatype: "array",
				datafields:
					[
					 { name: 'no', type: 'string' },
					 { name: 'employee_name', type: 'string' },
					 { name: 'employee_id', type: 'string' },
					 { name: 'annual', type: 'string' },
					 { name: 'sick', type: 'string' },
					 { name: 'c_off', type: 'string' },
					 { name: 'onsite', type: 'string' },
					 { name: 'maternity', type: 'string' },
					 { name: 'paternity', type: 'string' },
					 { name: 'condolences', type: 'string' },
					 { name: 'married', type: 'string' }
					 ]
		};
		var dataAdapter = new $.jqx.dataAdapter(source);

		// initialize jqxGrid
		$("#jqxgrid").jqxGrid({
			width: 825,
			source: dataAdapter,
			altrows: true,
			pageable: true,
			sortable: true,
			autoheight: true,
			theme: 'fresh',
			selectionmode: 'multiplecellsextended',
			columns: [
			          {text: 'No', datafield: 'no', width: 35},
			          {text: 'Name', datafield: 'employee_name', width: 185},
			          {text: 'EmployeeID', datafield: 'employee_id', width: 85},
			          {text: 'Annual', datafield: 'annual', width: 60},
			          {text: 'Sick', datafield: 'sick', width: 50},
			          {text: 'C-off', datafield: 'c_off', width: 55},
			          {text: 'Onsite', datafield: 'onsite', width: 60},
			          {text: 'Maternity', datafield: 'maternity', width: 75},
			          {text: 'Paternity', datafield: 'paternity', width: 75},
			          {text: 'Condolences', datafield: 'condolences', width: 85},
			          {text: 'Married', datafield: 'married', width: 60}
			          ]
		});

	},



});
