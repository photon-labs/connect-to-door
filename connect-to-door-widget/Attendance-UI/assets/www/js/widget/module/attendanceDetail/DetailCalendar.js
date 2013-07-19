Clazz.createPackage("com.attendance.widget.detail");
Clazz.com.attendance.widget.detail.DetailCalendar = Clazz.extend(Clazz.WidgetWithTemplate, {
	templateUrl  : "../template/attendanceDetail/attendanceDetailCalendar.tmp",
	defaultContainer : "attendance\\:detail-calendar",
	name : "attendanceDetailCalendar",
	CalendarListener : null,
	CookieAPI : null,
	data : {detail : []},
	dataPrint : null,

	employeeId : null,
	dayStart : null,
	dayEnd : null,
	employeeName : null,
	projectID : null,
	printDataIntoCsv : null,

	//initialize listener and fill data with data sample in listener, convert data to date format,
	initialize : function(config){
		this.employeeId = config.employeeID;
		this.dayStart = config.dayStart;
		this.dayEnd = config.dayEnd;
		this.employeeName = config.employeeName;
		this.projectID = config.projectID;
		this.printDataIntoCsv = new Clazz.com.attendance.widget.common.PrintDataIntoCsv();
		this.CalendarListener = new Clazz.com.attendance.widget.listener.CalendarListener({
			detailCalendar : this
		});
		this.CookieAPI = new Clazz.com.attendance.api.CookieAPI();
	},

	bindUI : function(){
		var self = this;
		$('.detail-masking-scroll-pane').hide();
		this.CalendarListener.getDetailEmployeeFromAPI(this.employeeId,this.dayStart,this.dayEnd)
		$('.attendance-detail-absolute-dropdown').hide();
		$('.attendance-detail-footer-save').click(function(){
			self.CalendarListener.saveDetailChange(self.dayStart,self.dayEnd);
		});
		var pane = $('.scroll-pane');
		pane.jScrollPane(
				{
					showArrows: true,
					verticalArrowPositions: 'os',
					horizontalArrowPositions: 'os',
					autoReinitialise: true,
				}
		);

		$('.attendance-detail-footer-print').click(function(){
			self.setPrintDataAndPrint(self.dataPrint);
		});
	},
	
//	set data & print data into csv
	setPrintDataAndPrint : function(dataDetail){
		var header = [{
			'no': "",
			'date': "Name",
			'absence': this.employeeName
		}]
		var headerId = {
				'no': "",
				'date': "Employee ID",
				'absence': this.employeeId	
		};
		var headerProjectId = {
				'no': "",
				'date': "Project ID",
				'absence': this.projectID
		};
		var data = {
			'no':'No',
			'date': 'Date',
			'absence': 'Absence'
		};
		header.push(headerId);
		header.push(headerProjectId);
		header.push(data);
		for(var i=1, index=0; index < dataDetail.length; index++, i++){
			var absence = dataDetail[index].absence;
			if(absence == "" || absence == null || absence == undefined){
				absence = "present";
			}
			var dataComplete = {
					'no': i,
					'date': dataDetail[index].date,
					'absence': absence,
			};
			header.push(dataComplete);
		}
		this.printDataIntoCsv.print(header);
	},

	fillDetailEmployeeData : function(data){
		for(var indexLoop in data){
			var calendarDom = $("<div class='attendance-detail-calendar-perday'></div>");

			var calendarHeader = $("<div class='header-calendar'></div>");

			var calendarDate = $("<div class='attendance-detail-box-title'></div>")
			var calendarDateText = $("<div class='attendance-detail-box-text'>"+ data[indexLoop].date +"</div>");
			calendarDate.append(calendarDateText)

			calendarHeader.append(calendarDate);

			var calendarValue = $("<div class='value-calendar'></div>").data("absence", data[indexLoop].absence);

			if(data[indexLoop].absence == "holiday" || data[indexLoop].absence == "Holiday"){
				var calendarValueTextDom = $("<div class='attendance-detail-box-value-holiday'></div>");
				var calendarValueText = $("<div class='attendance-detail-box-text-value'></div>");
				var calendarArrow = "";

//				}else if(data[indexLoop].absence == "C-off"){
//				var calendarValueTextDom = $("<div class='attendance-detail-box-value-coff'></div>");
//				var calendarValueText = $("<div class='attendance-detail-box-text-value'>C-Off</div>");
//				var calendarArrow = "";

			}else if(data[indexLoop].absence == "leave" || data[indexLoop].absence == "Condolences" || data[indexLoop].absence == "Sick" ||
					data[indexLoop].absence == "Annual" || data[indexLoop].absence == "Maternity" || data[indexLoop].absence == "Paternity" ||
					data[indexLoop].absence == "Married" ||data[indexLoop].absence == "Onsite" ||data[indexLoop].absence == "C-off"){
				if(data[indexLoop].absence !== "leave" ){
					var calendarValueTextDom = $("<div class='attendance-detail-box-value-alpha'>"+ data[indexLoop].absence +"</div>");
				}else{
					var calendarValueTextDom = $("<div class='attendance-detail-box-value-alpha'></div>");
				}
				var calendarValueText = $("<div class='attendance-detail-box-text-value'></div>");
				var calendarArrow = $("<div class='attendance-dd-value'></div>");
			}else{
				var calendarValueTextDom = $("<div class='attendance-detail-box-value-present'></div>");
				var calendarValueText = $("<div class='attendance-detail-box-text-value'></div>");
				var calendarArrow ="";
			}

			calendarValueTextDom.append(calendarValueText);

			calendarValue.append(calendarValueTextDom);

			calendarDom.append(calendarHeader);
			calendarDom.append(calendarValue);
			calendarDom.append(calendarArrow);

			$('.attendance-detail-calendar-box').append(calendarDom);
		};
		this.setDropdownCalendar();

		//set header
		var firstDate = $('.attendance-detail-box-title .attendance-detail-box-text').eq(0).text();
		this.setHeaderDayCalendar(firstDate);
	},

	/**
	 * @author andhika_p
	 * this method used for set dropdown calendar, position absolute in every block calendar
	 */
	setDropdownCalendar : function(){
		var offset;
		var pIndex;
		var self = this;

		$('.attendance-detail-box-value-alpha').click(function(){
			$('.detail-masking-scroll-pane').show();
			offset = $(this).offset();
			pIndex = $('.attendance-detail-box-value-alpha').index(this);
			if ( $('.attendance-detail-box-value-alpha').hasClass("active") ) {
				$('.attendance-detail-absolute-dropdown').hide();
				$('.detail-masking-scroll-pane').hide();
				$('.attendance-detail-box-value-alpha').removeClass("active");
			}else{
				$('.attendance-detail-absolute-dropdown').css({"left" : offset.left, "top": (offset.top + 30)});
				$('.attendance-detail-absolute-dropdown').show();
				$('.attendance-detail-box-value-alpha').addClass("active");
			}
		});

		$('.attendance-dd-value').click(function(){
			pIndex = $('.attendance-dd-value').index(this);
			offset =$('.attendance-detail-box-value-alpha').eq(pIndex).offset();
			if ( $('.attendance-detail-box-value-alpha').hasClass("active") ) {
				$('.attendance-detail-absolute-dropdown').hide();
				$('.detail-masking-scroll-pane').hide();
				$('.attendance-detail-box-value-alpha').removeClass("active");
			}else{
				$('.attendance-detail-absolute-dropdown').css({"left" : offset.left, "top": (offset.top + 30)});
				$('.attendance-detail-absolute-dropdown').show();
				$('.attendance-detail-box-value-alpha').addClass("active");
			}
		});

		$('.attendance-detail-list-item').click(function(){
			$('.attendance-detail-footer-save-text').removeClass('detail-change-save');
			$('.attendance-detail-box-value-alpha').eq(pIndex).text($(this).text());
			$('.attendance-detail-absolute-dropdown').hide();
			$('.detail-masking-scroll-pane').hide();
			$('.attendance-detail-box-value-alpha').removeClass("active");
		});

		$('.attendance-detail-box-value-alpha,.attendance-dd-value').click(function(event){
			$('body').one('click',function(){
				$('.attendance-detail-absolute-dropdown').hide();
				$('.detail-masking-scroll-pane').hide();
				$('.attendance-detail-box-value-alpha').removeClass("active");
			});
			event.stopPropagation();		
		});

		$('.detail-masking-scroll-pane').click(function() {
			$('.detail-masking-scroll-pane').hide();
		});
	},

	setHeaderDayCalendar : function(fullDate){
//		var fullDate = "22-01-2013";
		var date = fullDate.substring(0,2);
		var month = fullDate.substring(3,5);
		var year = fullDate.substring(6,10);

		var inputDate = new Date(month +"/"+ date +"/"+ year);
		var dayNames = new Array('Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday');
		var day = (dayNames[inputDate.getDay()]);
		if(day == "Sunday"){
			var dayArray = new Array('Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday');
		}else if(day == "Monday"){
			var dayArray = new Array('Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday');
		}else if(day == "Tuesday"){
			var dayArray = new Array('Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday','Monday');
		}else if(day == "Wednesday"){
			var dayArray = new Array('Wednesday','Thursday','Friday','Saturday','Sunday','Monday','Tuesday');
		}else if(day == "Thursday"){
			var dayArray = new Array('Thursday','Friday','Saturday','Sunday','Monday','Tuesday','Wednesday');
		}else if(day == "Friday"){
			var dayArray = new Array('Friday','Saturday','Sunday','Monday','Tuesday','Wednesday','Thursday');
		}else{
			var dayArray = new Array('Saturday','Sunday','Monday','Tuesday','Wednesday','Thursday','Friday');
		}

		var index = 0;
		$('.attendance-detail-day').each(function(){
			$('.attendance-detail-day').eq(index).find('.detail-header-text').text(dayArray[index]);
			index++;
		});
	},
});