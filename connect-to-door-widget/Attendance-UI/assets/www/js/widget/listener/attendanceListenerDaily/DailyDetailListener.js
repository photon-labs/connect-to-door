Clazz.createPackage("com.attendance.widget.listener");

Clazz.com.attendance.widget.listener.DetailDailyListener = Clazz.extend(Clazz.Widget, {
	columnClicked:null,
	modeEdit:null,
	CookieAPI:null,
	lengthSelectionText : "",

	dailyAttendanceAPI : null,
	updateCheckinOutAPI : null,
	checkInOutAPI : null,

	statusClick : null,
	loadingMask : null,
	dataResponse : null,

	initialize : function(config){
		var self = this;
		this.checkInOutAPI = new Clazz.com.attendance.api.CheckInOutAPI();
		this.CookieAPI = new Clazz.com.attendance.api.CookieAPI();
		this.loadingMask = new Clazz.com.attendance.widget.common.LoadingMask();
		require(["api/DailyAttendanceAPI", "api/UpdateCheckInOutAPI"],function(){
			self.dailyAttendanceAPI = new Clazz.com.attendance.api.DailyAttendanceAPI();
			self.updateCheckinOutAPI = new Clazz.com.attendance.api.UpdateCheckInOutAPI();
		});
	},

	/**
	 * @author dhika_p
	 * function to activate input text in the selected field
	 */
	dailyCheckIn : function(offset, ColumnClicked, textCheckIn){
		this.columnClicked = ColumnClicked;
		$('.attendance-daily-mask').show();
		$('.attendance-daily-input-text').removeClass("attendance-daily-input-text-bg");
		$('.attendance-daily-input-text-dbl-click').css({"left" : (offset.left+3), "top": (offset.top+1)});
		$('.attendance-daily-input-text').css("width","125px");
		$('.attendance-daily-input-text-dbl-click').show();
		$('.attendance-daily-input-text').focus();
		$('.attendance-daily-input-text').val(textCheckIn);
		this.statusClick = true;

	},

	dailyCheckOut : function(offset, ColumnClicked, textCheckOut){
		this.columnClicked = ColumnClicked;
		$('.attendance-daily-mask').show();
		$('.attendance-daily-input-text').removeClass("attendance-daily-input-text-bg");
		$('.attendance-daily-input-text-dbl-click').css({"left" : (offset.left+3), "top": (offset.top+1)});
		$('.attendance-daily-input-text').css("width","109px");
		$('.attendance-daily-input-text-dbl-click').show();
		$('.attendance-daily-input-text').focus();
		$('.attendance-daily-input-text').val(textCheckOut);	
		this.statusClick = true;
	},

	/**
	 * @author dhika_p
	 * function give action mode edit
	 */
	modeEdit : function(modeEdit, presenceID, employeeID, checkInTime, checkOutTime , date){
		var date = $( ".daily-date-picker").val().substring(0,2);
		var month = $( ".daily-date-picker").val().substring(3,5);
		var year = $( ".daily-date-picker").val().substring(6,10);
		var date = year+"-"+month+"-"+date;
		var self = this;
		var timeRegex = /^([01]?[0-9]|2[0-3]):[0-5][0-9]$/;
		if (self.statusClick == true){
			self.loadingMask.showLoading();
			if (modeEdit == "checkin"){
				var timeValue = $('.attendance-daily-input-text').val();
				var timeValueLen = $('.attendance-daily-input-text').val().length;
				var lastValue = $('.daily-text-check-in').eq(self.columnClicked).text();
				if (timeValue != "" && timeValueLen == 5 && timeValue != lastValue  && timeRegex.test(timeValue)){
					$('.daily-text-check-in').eq(self.columnClicked).text(timeValue);
					$('.attendance-daily-input-text-dbl-click').hide();
					$('.attendance-daily-mask').hide();
					self.updateCheckinOutAPI.updateCheckInOut(employeeID, presenceID, timeValue, checkOutTime,date, function(response){
						self.statusClick = false;
						self.getDataDailyAttendanceFromAPi(date);
						self.loadingMask.removeLoading();
					});
				}else if(timeValueLen == 0 || timeValue == lastValue ){
					$('.attendance-daily-input-text-dbl-click').hide();
					$('.attendance-daily-mask').hide();	
					self.loadingMask.removeLoading();
				}else{
					$('.attendance-daily-input-text').addClass("attendance-daily-input-text-bg");
					$('.attendance-daily-mask').show();
					$('.attendance-daily-input-text').focus();
					self.loadingMask.removeLoading();
				}

			}else if(modeEdit == "checkout"){
				var timeValue = $('.attendance-daily-input-text').val();
				var timeValueLen = $('.attendance-daily-input-text').val().length;
				var lastValue = $('.daily-text-check-out').eq(self.columnClicked).text();
				if (timeValue != ""  && timeValueLen == 5 && timeValue != lastValue  && timeRegex.test(timeValue)){
					$('.daily-text-check-out').eq(self.columnClicked).text(timeValue);
					$('.attendance-daily-input-text-dbl-click').hide();
					$('.attendance-daily-mask').hide();
					self.updateCheckinOutAPI.updateCheckInOut(employeeID, presenceID, checkInTime, timeValue,date, function(response){
						self.statusClick = false;
						self.getDataDailyAttendanceFromAPi(date);
						self.loadingMask.removeLoading();
					});
				}else if(timeValueLen == 0 || timeValue == lastValue ){
					$('.attendance-daily-input-text-dbl-click').hide();
					$('.attendance-daily-mask').hide();	
					self.loadingMask.removeLoading();
				}else{
					$('.attendance-daily-input-text').addClass("attendance-daily-input-text-bg");
					$('.attendance-daily-mask').show();
					$('.attendance-daily-input-text').focus();
					self.loadingMask.removeLoading();
				}
			}else {
				$('.attendance-daily-input-text-dbl-click').hide();
				$('.attendance-daily-mask').hide();	
				self.loadingMask.removeLoading();
			}

		}

	},

	getDataDailyAttendanceFromAPi : function(date){
		var self = this;
		var employeeID = this.CookieAPI.getUserIdEmployee();
		this.dailyAttendanceAPI.getDailyAttendance(employeeID,date,function(response){
			if (response != undefined && response != null){
				self.dailyDetail.fillDailyAttendance(response.employee_data);
				self.dataResponse = response.employee_data;
			}
		});
	},
	
	/**
	 * @author dede_pu
	 * function to get time check in out from local storage API
	 */
	getCheckInOut : function(){
		var employeeID = this.CookieAPI.getUserIdEmployee();
		this.checkInOutAPI.checkInOut(employeeID,"check-status" ,function(response){
			if (response.check_in !== undefined && response.check_in !== null ){
				var checkIn = response.check_in;
				var checkOut = response.check_out;
				if(checkIn.length == 5){
					$('.attendance-menu-time').text('You have checked in at ' + checkIn);
				}
				if(checkOut.length == 5){
					$('.attendance-menu-time').text('You have checked out at ' + checkOut);
				}
			}
		});
	},

});