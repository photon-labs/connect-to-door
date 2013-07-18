Clazz.createPackage("com.attendance.widget.module.attendanceDaily");
Clazz.com.attendance.widget.module.attendanceDaily.AttendanceDailyDetail = Clazz.extend(Clazz.WidgetWithTemplate, {
	templateUrl  : "../template/attendanceDaily/attendanceDailyDetail.tmp",
	defaultContainer : "attendance\\:daily-detail",	
	name : "daily_detail",
	dailyDetail : null,

	CookieAPI:null,
	dailyDetailListener : null,

	modeEdit:null,
	columnClicked:null,
	presenceID : null,
	lengthSelectionText : "",
	employeeID : null,

	checkInTime : null,
	checkOutTime : null,

	/**
	 * @author andhika_p
	 * initialize construct object
	 */
	initialize : function(config){
		this.dailyDetailListener = config.dailyDetailListener;
		this.CookieAPI = new Clazz.com.attendance.api.CookieAPI();
	}, 

	bindUI : function(){
		var pane = $('.scroll-pane');
		var date = $( ".daily-date-picker").val().substring(0,2);
		var month = $( ".daily-date-picker").val().substring(3,5);
		var year = $( ".daily-date-picker").val().substring(6,10);
		var date = year+"-"+month+"-"+date;
		pane.jScrollPane(
				{
					showArrows: true,
					verticalArrowPositions: 'os',
					horizontalArrowPositions: 'os',
					autoReinitialise: true,
				}
		);
		this.dailyDetailListener.getDataDailyAttendanceFromAPi(date);
	},

	/**
	 * @author andhika_p
	 * block Arrow key
	 * @param selector
	 */
	blockArrowKey: function(selector){
		selector.attr('unselectable', 'on')
		selector.keydown(function (e) {
			var keyCode = e.keyCode || e.which,
			arrow = {left: 37, up: 38, right: 39, down: 40 };

			switch (keyCode) {
			case arrow.left:
				return false
				break;
			case arrow.up:
				return false
				break;
			case arrow.right:
				return false
				break;
			case arrow.down:
				return false
				break;
			}
		});
	},

	/**
	 * @author andhika_p
	 * handle enter pressed on selector
	 * @param selector
	 */
	keyPressEnter : function(selector){
		var enter = 13;
		selector.keyup(function(event){
			if(event.keyCode == enter){
				$('.dom-in-daily').click();
			}
		});
	},

	/**
	 * @author dhika_p
	 * function to activate input text in the selected field
	 */
	activateInputText : function(){
		var self = this;
		var offset;
		var pIndex;
		var textCheckIn;
		var authority = this.CookieAPI.getAuthority();

		$('.li-daily-check-in').dblclick(function(){
			if(authority == "General Manager"
				|| authority == "Admin"
					|| authority == "Super Admin"
						|| authority == "Finance") {
				$('.attendance-daily-mask').show();
				self.modeEdit = "checkin";
				offset = $(this).offset();
				self.columnClicked = $('.li-daily-check-in').index(this);
				textCheckIn = $(this).text();

				self.presenceID = $('.daily-presence-id-input').eq(self.columnClicked).val();
				self.employeeID = self.CookieAPI.getUserIdEmployee();

				self.checkOutTime = $('.li-daily-check-out').eq(self.columnClicked).text();
				self.checkInTime = 0 ;

				self.dailyDetailListener.dailyCheckIn(offset, self.columnClicked, textCheckIn);
			}
		});

		$('.li-daily-check-out').dblclick(function(){
			if(authority == "General Manager"
				|| authority == "Admin"
					|| authority == "Super Admin"){
				$('.attendance-daily-mask').show();
				self.modeEdit = "checkout";
				offset = $(this).offset();
				self.columnClicked = $('.li-daily-check-out').index(this);
				textCheckOut = $(this).text();

				self.presenceID = $('.daily-presence-id-input').eq(self.columnClicked).val();
				self.employeeID = self.CookieAPI.getUserIdEmployee();

				self.checkOutTime = textCheckOut;
				self.checkInTime = $('.li-daily-check-in').eq(self.columnClicked).text() ;

				self.dailyDetailListener.dailyCheckOut(offset, self.columnClicked, textCheckOut);
			}
		});


	},

	/**
	 * @author dhika_p
	 * function give action mode edit
	 */
	modeEdit : function(){
		var self = this;
		var date = $( ".daily-date-picker").val().substring(0,2);
		var month = $( ".daily-date-picker").val().substring(3,5);
		var year = $( ".daily-date-picker").val().substring(6,10);
		var date = year+"-"+month+"-"+date;
		$('.dom-in-daily').click( function(){
			self.dailyDetailListener.modeEdit(self.modeEdit , self.presenceID, self.employeeID, self.checkInTime, self.checkOutTime,date);
		});		
	},

	reNumberingList : function(){
		var number = 0;	
		$('.li-daily-no .daily-text').empty();
		$('.attendance-daily-ul').each(function(){
			$('.attendance-daily-ul').eq(number).find('.li-daily-no .daily-text').append(++number +'.');
		});
	},


	/**
	 * @author andhika_p
	 * insert dot when input text length == 2
	 */
	insertDotInputText : function(){
		var inputLength = $('.attendance-daily-input-text').val().length;
		if (inputLength == 2){
			$('.attendance-daily-input-text').val($('.attendance-daily-input-text').val()+':');
		}
	},

	/**
	 * @author andhika_p
	 * block hour
	 */
	hourBlock : function(charcode){
		var self = this;
		var inputLength = $('.attendance-daily-input-text').val().length;
		var inputText = $('.attendance-daily-input-text').val();

		if(inputLength == 0 && charcode > 50 ){
			return false;
		}

		if(inputText.substring(0,1) == 2 && charcode > 51 && inputLength < 3){
			return false;
		}

	},

	/**
	 * @author andhika_p
	 * block minutes
	 */
	minutesBlock : function(charcode){
		var inputLength = $('.attendance-daily-input-text').val().length;
		if(charcode > 53 && inputLength == 3){
			return false;
		}
	},

	readSelection: function(){
		var self = this;
		$(".attendance-daily-input-text").select(function() { 
			self.lengthSelectionText = $(".attendance-daily-input-text").val().length;
		});
	},

	setListHeight : function(dataLength){
		if(dataLength !== 0 && dataLength < 11){
			var listHeight = dataLength * 30;
			$(".attendance-daily-item").css("height",listHeight)
		}else if(dataLength > 10){
			$(".attendance-daily-item").css("height","300")
		}else{
			$(".attendance-daily-item").css("height","0")
		}

	},

	fillDailyAttendance : function(data){
		var self = this;
		$('.jspPane').empty();
		var DailyListContent = $('.jspPane');
		for(var indexLoop in data){
			if(data[indexLoop].employee_name != undefined){

				var ulListDaily = $("<ul class='attendance-daily-ul'></ul>")
				var liNumber = $("<li class='li-daily-no'><div class='daily-text'></div></li>");
				var liName = $("<li class='li-daily-name'><div class='daily-text-name'>"+ data[indexLoop].employee_name +"</div><input type='hidden' class='daily-presence-id-input' value ='"+ data[indexLoop].presence_id  +"'></input></li>");

				if(data[indexLoop].check_in != undefined || data[indexLoop].check_in != null){
					var liCheckIn = $("<li class='li-daily-check-in'><div class='daily-text-check-in'>"+ data[indexLoop].check_in +"</div></li>");
				}else{
					var liCheckIn = $("<li class='li-daily-check-in'><div class='daily-text-check-in'>-</div></li>");
				}

				if(data[indexLoop].check_out != undefined || data[indexLoop].check_out != null){
					var liCheckOut= $("<li class='li-daily-check-out'><div class='daily-text-check-out'>"+ data[indexLoop].check_out+"</div></li>");
				}else{
					var liCheckOut= $("<li class='li-daily-check-out'><div class='daily-text-check-out'>-</div></li>");
				}

				if(data[indexLoop].admin != undefined || data[indexLoop].admin != null){
					var liEditedBy = $("<li class='li-daily-edited-by'><div class='daily-text-edited-by'>"+ data[indexLoop].admin +"</div></li>");
				}else{
					var liEditedBy = $("<li class='li-daily-edited-by'><div class='daily-text-edited-by'>-</div></li>");

				}
				ulListDaily.append(liNumber);
				ulListDaily.append(liName);
				ulListDaily.append(liCheckIn);
				ulListDaily.append(liCheckOut);
				ulListDaily.append(liEditedBy);

				DailyListContent.append(ulListDaily);
			}
		}

		var authority = this.CookieAPI.getAuthority();
		if(authority == "General Manager"
			|| authority == "Admin"
				|| authority == "Super Admin"){
			$('.li-daily-check-in').css('cursor','pointer');
			$('.li-daily-check-out').css('cursor','pointer');
		}

		this.readSelection();

		$('.attendance-daily-input-text').attr("maxlength","5");
		var inputText = $('.attendance-daily-input-text');
		this.blockArrowKey(inputText);
		this.keyPressEnter(inputText);

		this.reNumberingList();

		inputText.keypress(function(event){

			//insert dot when input text length == 2
			self.insertDotInputText();

			var backspace = 8;
			var deleteButton = 46;
			var leftArrow = 37;
			var upArrow = 38;
			var rightArrow = 39;
			var downArrow = 40;
			var tab = 9;
			var zero = 48;
			var nine = 57;	
			var dot = 46;
			var percent = 37;
			var charcode = event ? event.which : event.keyCode;

			//block minutes
			var statusMinutes = self.minutesBlock(charcode)
			if(statusMinutes == false){
				return false;
			}

			if(self.lengthSelectionText !== "" && charcode > 50){
				return false;
			}
			else{
				self.lengthSelectionText = "";
			}

			//block hour input
			var statusHour = self.hourBlock(charcode);
			if(statusHour == false){
				return false;
			}

			if (charcode == percent || charcode == dot ){
				return false;
			}
			else if(charcode == backspace || charcode == deleteButton ){
				self.lengthSelectionText = "";
				return true;
			}
			else if(charcode < zero || charcode > nine){
				return false;
			}
			else if(charcode == leftArrow || charcode == tab|| charcode == upArrow || charcode == downArrow || charcode == rightArrow){
				return false;
			}
			else{
				return true;
			}
		});

		$('.attendance-daily-input-text-dbl-click').hide();
		$('.attendance-daily-mask').hide();
		this.activateInputText();
		this.modeEdit();
		this.setListHeight(data.length);
		var pane = $('.scroll-pane');
		pane.jScrollPane(
				{
					showArrows: true,
					verticalArrowPositions: 'os',
					horizontalArrowPositions: 'os',
					autoReinitialise: true,
				}
		);
	},
});