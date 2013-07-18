Clazz.createPackage("com.attendance.widget.module.attendanceDaily");
Clazz.com.attendance.widget.module.attendanceDaily.AttendanceDaily = Clazz.extend(Clazz.WidgetWithTemplate, {
	templateUrl  : "../template/attendanceDaily/attendanceDaily.tmp",
	name : "daily_attendance",
	dailyFooter : null,
	IdleTimer: null,
	dailyDetail : null,
	mask : null,
	attendanceNowDate : null,
	dailyDetailListener:null,
	printDataIntoCsv: null,
	cookieAPI: null,

	initialize : function(config){
		this.cookieAPI = new Clazz.com.attendance.api.CookieAPI();
		this.dailyDetailListener = new Clazz.com.attendance.widget.listener.DetailDailyListener();
		this.IdleTimer = new Clazz.com.attendance.widget.listener.IdleTimer();
		this.attendanceNowDate = new Clazz.com.attendance.widget.module.request.RequestDate();
		this.mask = new Clazz.com.attendance.widget.common.AttendanceMask();
		this.printDataIntoCsv = new Clazz.com.attendance.widget.common.PrintDataIntoCsv();
		this.dailyDetail = new Clazz.com.attendance.widget.module.attendanceDaily.AttendanceDailyDetail({
			dailyDetailListener : this.dailyDetailListener
		});
		this.dailyFooter = new Clazz.com.attendance.widget.module.attendanceDaily.AttendanceDailyFooter({
			dailyDetailListener : this.dailyDetailListener
		});
		this.dailyDetailListener.dailyDetail = this.dailyDetail;
	},

	postRender : function(element){
		this.dailyFooter.render();
		this.dailyDetail.render();
		this.mask.showMask();

	},

	bindUI : function(){
		var self = this;
		var currentDate = this.getCurrentDate()
		setTimeout(function(){
			self.mask.removeMask();
		},1000);
		this.IdleTimer.getIdleTimer();

		$( ".daily-date-picker" ).datepicker({
			showOn: "button",
			buttonImage: "../images/nu-icon_date_alt.png",
			buttonImageOnly: true,
			maxDate : currentDate,
			dateFormat : "dd-mm-yy",	
			onClose: function( selectedDate ) {
				if (selectedDate !== "" && selectedDate !== null ){
					$('.jspPane').empty();
					var date = $( ".daily-date-picker").val().substring(0,2);
					var month = $( ".daily-date-picker").val().substring(3,5);
					var year = $( ".daily-date-picker").val().substring(6,10);
					var date = year+"-"+month+"-"+date;
					self.dailyDetailListener.getDataDailyAttendanceFromAPi(date);
				}
			}
		});

		$('.daily-date-picker').click(function(){
			$( ".daily-date-picker-dom .ui-datepicker-trigger" ).click();
		});

		$( ".daily-date-picker" ).val(currentDate);
		//set data print from start
		this.dataPrint = this.dailyDetail.dataPrint;

		$('.attendance-daily-print').click(function(){
			self.setPrintDataAndPrint(self.dailyDetailListener.dataResponse);
		});

		var authority = this.cookieAPI.getAuthority();
		if(authority == 'Employee' || authority == 'Project Manager'){
			$('.attendance-daily-print').remove();
		}
	},

	//set data & print data into csv
	setPrintDataAndPrint : function(dataDetail){
		var data = [{
			'no': 'No',
			'employee_name': 'Name',
			'check_in': 'Check In',
			'check_out': 'Check Out',
			'edited_by': 'Edited By'
		}];
		for(var i=1, index=0; index < dataDetail.length; index++, i++){
			var dataComplete = {
					'no': i,
					'employee_name': dataDetail[index].employee_name,
					'check_in':dataDetail[index].check_in,
					'check_out':dataDetail[index].check_out,
					'edited_by':dataDetail[index].admin
			};
			data.push(dataComplete);
		}
		this.printDataIntoCsv.print(data);
	},

	getCurrentDate: function(){
		var d = new Date();
		var curr_date = d.getDate();
		var curr_month = d.getMonth()+1;
		var curr_year = d.getFullYear();

		if (curr_date < 10){
			curr_date = "0" + curr_date;
		}

		if (curr_month < 10){
			curr_month = "0" + curr_month;
		}

		return (curr_date +'-'+curr_month+'-'+curr_year);
	},

	onPause : function(){
	},

	onResume : function (){
		this.IdleTimer.getIdleTimer();
		this.mask.removeMask();
	},

});