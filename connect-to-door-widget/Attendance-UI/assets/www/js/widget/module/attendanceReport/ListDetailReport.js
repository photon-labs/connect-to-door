Clazz.createPackage("com.attendance.widget.modules.attendane_report");

Clazz.com.attendance.widget.modules.attendane_report.ListDetailReport = Clazz.extend(Clazz.WidgetWithTemplate, {

	defaultContainer : "attendance\\:report-right-content",
	templateUrl: "../template/attendanceReport/attendanceReportRightContent.tmp",	

	data:{employee:[]},
	FilterAndPrintDetailReport:null,
	CookieAPI:null,
	dropDownControllerListener:null,
	statusDatePicker:"closed",

	/**
	 * @author dhika_p
	 * initialize construct object
	 */
	initialize : function(config){
		this.dropDownControllerListener = new Clazz.com.attendance.widget.listener.DropDownControllerListener();
		this.FilterAndPrintDetailReport = new Clazz.com.attendance.widget.listener.FilterAndPrintDetailReport();
		this.CookieAPI = new Clazz.com.attendance.api.CookieAPI();
	},


	bindUI:function(){
		var self = this;
		$('.attendance-report-button-view').click(function(){
			var inputDate = $('.input-month-year').val();
			var inputFilter = $('.input-filter-by').text();
			if(self.FilterAndPrintDetailReport.validationPrint(inputDate,inputFilter) == 0){
				self.FilterAndPrintDetailReport.showData();
      	  }
		});
		this.setActionButton();
	},

	/**
	 * @author dhika_p
	 * function to set action button in the template
	 */
	setActionButton : function(){
		var self = this;

		$('.input-month-year').attr("readonly",true);
		$('.input-month-year').click(function(){
			if (self.statusDatePicker == "closed"){
				$(".drop-master-filter").slideUp();
				showCalendarControl('dpMonthYear');
				self.statusDatePicker = "opened";
			}
			else if (self.statusDatePicker == "opened"){
				hideCalendarControl('dpMonthYear');
				self.statusDatePicker = "closed";
			}
		});		

		$('.input-month-year').click(function(event) {
			$('.attendance-dom').one('click',function() {
				hideCalendarControl('dpMonthYear');
				self.statusDatePicker = "closed";
			});			
			event.stopPropagation();
		});

		$('body').click(function(){
			self.statusDatePicker = "closed";
		});	

		$( ".attendance-report-month-year-picker" ).click(function(){
			$(".drop-master-filter").slideUp();
			if (self.statusDatePicker == "closed"){
				showCalendarControl('dpMonthYear');
				self.statusDatePicker = "opened";
			}
			else if (self.statusDatePicker == "opened"){
				hideCalendarControl('dpMonthYear');
				self.statusDatePicker = "closed";
			}
		});

		$('.attendance-report-month-year-picker').click(function(event) {
			$('.attendance-dom').one('click',function() {
				hideCalendarControl('dpMonthYear');
				self.statusDatePicker = "closed";
			});
			event.stopPropagation();
		});

		$('.image-print').click(function(){			
			self.FilterAndPrintDetailReport.print();
		});

		var dropDownContentItem = $('.content-drop-filter');
		var dropDownValue = $('.input-filter-by');
		var dropDownValueButton = $('.input-filter-by, .attendance-report-image-arrow');
		var dropDownContent = $(".drop-master-filter");
		dropDownContent.hide();

		dropDownContentItem.click(function(){
			self.dropDownControllerListener.dropDownSelectController(dropDownContent);
			var value = $(this).text();
			dropDownValue.text(value);
		});

		dropDownValueButton.click(function(event){
			self.statusDatePicker = "closed";
			hideCalendarControl('dpMonthYear');
			self.dropDownControllerListener.dropDownController(dropDownContent, event);
		});
	},

});
