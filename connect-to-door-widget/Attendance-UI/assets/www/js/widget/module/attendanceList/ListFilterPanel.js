Clazz.createPackage("com.attendance.widget.list");
Clazz.com.attendance.widget.list.ListFilterPanel = Clazz.extend(Clazz.WidgetWithTemplate, {
	templateUrl  : "../template/attendanceList/attendanceListContentLeft.tmp",
	defaultContainer : "attendance\\:list-content-left",
	name : "attendanceListContentLeft",
	data : {},
	//listener
	FilterPanelListener : null,
	dropDownControllerListener : null,


	initialize : function(config){
		this.FilterPanelListener = new Clazz.com.attendance.widget.listener.FilterPanelListener();
		this.dropDownControllerListener = new Clazz.com.attendance.widget.listener.DropDownControllerListener();
	},

	bindUI : function(){
		this.dropdownController();
		this.datepickerController();
		var self = this;
		var headerContent = $('.attendance-list-header-attendance');
		var header = $('<div class="attendance-header-list"></div>');
		headerContent.append(header);
		
		$('.attendance-list-button-search').click(function(){
			var typeSearch = $('.search-button-text').text()
			if(typeSearch !== "" && typeSearch !== null ){
				$('.search-button').removeClass('search-type-alert');
				self.cekLengthInput(typeSearch);
			}
			else{
				$('.search-button').addClass('search-type-alert');
				self.checkDateLength();
			}
			
		});
		
		$(".content-dd").hide();
		$(".attendance-search-input-text").hide();
	},

	/**
	 * @author andhika_p
	 * control datepicker in UI
	 */
	datepickerController : function(){
		var currentDate = this.getCurrentDate()

		$( ".attendance-list-date-start " ).datepicker({
			showOn: "button",
			buttonImage: "../images/nu-icon_date_alt.png",
			buttonImageOnly: true,
			maxDate : currentDate,
			dateFormat : "dd/mm/yy",
			onClose: function( selectedDate ) {
				if (selectedDate !== "" && selectedDate !== null ){
					$(".attendance-list-date-start").removeClass("highlight-list-date");
					$( ".attendance-list-date-until" ).datepicker( "option", "minDate", selectedDate);
				}
			}
		});

		$( ".attendance-list-date-until" ).datepicker({
			showOn: "button",
			buttonImage: "../images/nu-icon_date_alt.png",
			buttonImageOnly: true,
			maxDate : currentDate,
			dateFormat : "dd/mm/yy",
			onClose: function( selectedDate ) {
				if (selectedDate !== "" && selectedDate !== null ){
					$(".attendance-list-date-until").removeClass("highlight-list-date");
					$( ".attendance-list-date-start " ).datepicker( "option", "maxDate", selectedDate);
				}
			}
		});

		$( ".attendance-list-date-start" ).click(function(){
			$( ".date-from-content .ui-datepicker-trigger").click()
		});
		$( ".attendance-list-date-until" ).click(function(){
			$( ".date-until-content .ui-datepicker-trigger").click()
		});
		
		$( ".mask-date-start" ).click(function(){
			$( ".date-from-content .ui-datepicker-trigger").click()
		});
		
		$( ".mask-date-until" ).click(function(){
			$( ".date-until-content .ui-datepicker-trigger").click()
		});
		
		$( ".ui-datepicker-trigger" ).click(function(){
			$(".content-dd").slideUp();
		});
	},
	
	/**
	 * @author andhika_p
	 *  control dropdown in UI
	 */
	dropdownController : function(){
		var self = this;
		
		var dropDownContentItem = $(".content-li");
		var dropDownValue = $('.search-button-text');
		var dropDownValueButton = $(".button-dd, .search-button-text");
		var dropDownContent = $(".content-dd");
		dropDownValue.text("");
		dropDownContent.hide();
		dropDownValueButton.click(function(event){
			self.dropDownControllerListener.dropDownController(dropDownContent, event);
		});

		dropDownContentItem.click(function(){
			self.dropDownControllerListener.dropDownSelectController(dropDownContent);
			$('.search-button').removeClass('search-type-alert')
			$(".attendance-search-input-text").removeClass("highlight-list-input");
			var value = $(this).text();
			dropDownValue.text(value);
			$(".attendance-search-input-text").val("");
			self.validateSearchText();
			self.setMaxLength();
			if(value == "Date"){
				$(".attendance-search-input-text").hide();
			}
			else{
				$(".attendance-search-input-text").show();

			}
		});
	},

	/**
	 * @author andhika_p
	 * get current date with dd/mm/yyyy format
	 */
	getCurrentDate: function(){
		var d = new Date();
		var curr_date = d.getDate();
		var curr_month = d.getMonth()+1;
		var curr_year = d.getFullYear();

		return (curr_date +'/'+curr_month+'/'+curr_year);
	},

	/**
	 * @author andhika_p
	 * cek input search text, and highlight when length = 0
	 */	
	cekLengthInput : function(type){
		var self = this;
		var inputLength = $(".attendance-search-input-text").val().length;
		if(inputLength == 0 && type != "Date"){
			$(".attendance-search-input-text").addClass("highlight-list-input");
		}
		else{
			self.searchData(type);
		}
	},

	/**
	 * @author andhika_p
	 * Search data and show error alert
	 */	
	searchData : function(type){
		$(".attendance-search-input-text").removeClass("highlight-list-input");
		var self = this;
		var searchingValue= $(".attendance-search-input-text").val();
		var searchingStatus = null;
		dateFrom = $(".attendance-list-date-until").val()
		dateTo = $(".attendance-list-date-start").val()
		
		if(type == 'Name' && dateFrom !== "" && dateTo !== ""){
			searchingStatus = "username";
			self.FilterPanelListener.getDataListAttendanceFromAPi(searchingStatus, searchingValue, dateFrom, dateTo);
		}
		else if(type == "Employee ID" && dateFrom !== "" && dateTo !== ""){
			searchingStatus = "employeeID";
			self.FilterPanelListener.getDataListAttendanceFromAPi(searchingStatus, searchingValue, dateFrom, dateTo);
		}
		else if(type == 'Project ID' && dateFrom !== "" && dateTo !== ""){
			searchingStatus = "projectID";
			self.FilterPanelListener.getDataListAttendanceFromAPi(searchingStatus, searchingValue, dateFrom, dateTo);
		}
		else {
			self.checkDateLength();
		}
	},
	
	/**
	 * @author andhika_p
	 * check length of date input in UI
	 */
	checkDateLength : function(){
		var self = this;
		var dateFromLength = $(".attendance-list-date-start").val();
		var dateToLength = $(".attendance-list-date-until").val();
		var typeSearch = $('.search-button-text').text()
		if(dateFromLength == ""){
			$('.attendance-list-date-start').addClass("highlight-list-date");
		}else{
			$('.attendance-list-date-start').removeClass("highlight-list-date");
		}
		if(dateToLength == ""){
			$('.attendance-list-date-until').addClass("highlight-list-date");
		}else{
			$('.attendance-list-date-until').removeClass("highlight-list-date");
		}
		if(dateFromLength !== "" && dateToLength !== "" && typeSearch !== ""){
			var searchingStatus = "date";
			var searchingValue = "";
			self.FilterPanelListener.getDataListAttendanceFromAPi(searchingStatus, searchingValue, dateFrom, dateTo);
		};
	},
	
	/**
	 * @author andhika_p
	 * function to set length search text
	 */
	setMaxLength : function(){
		var textInput = $(".search-button-text").text();
		if(textInput == "Name"){
			$('.attendance-search-input-text').attr('maxLength','18');
		}
		else{
			$('.attendance-search-input-text').attr('maxLength','5');
		}
	},

	/**
	 * @author andhika_p
	 * function to validate key press 
	 */
	validateSearchText : function(){
		var inputText = $(".attendance-search-input-text");
		inputText.keypress(function(event){
			var dropdownValue = $(".search-button-text").text();
			var backspace = 08;
			var deleteButton = 46;
			var leftArrow = 37;
			var tab = 09;
			var zero = 48;
			var nine = 57;
			var i = 105;
			var I = 73;
			var space = 32;

			var charcode = event ? event.which : event.keyCode;
			if(dropdownValue == "Employee ID"){
				if(charcode == backspace || charcode == deleteButton || charcode == leftArrow || charcode == tab || charcode == i || charcode == I){
					return true;
				}
				else if(charcode < zero || charcode > nine){
					return false;
				}
				else{
					return true;
				}
			}
			else if(dropdownValue == "Name"){
				if((charcode >= 65 && charcode <= 90)||(charcode >= 97 && charcode <= 122)||(charcode == space) || charcode == backspace){
					return true;
				}
				else{
					return false;
				}
			}
			else {
				if(charcode == backspace || charcode == deleteButton || charcode == leftArrow || charcode == tab){
					return true;
				}
				else if(charcode < zero || charcode > nine){
					return false;
				}
				else{
					return true;
				}
			}
		});
	},
	
	cekDateBox : function(){
		dateFrom = $(".attendance-list-date-until").val()
		dateTo = $(".attendance-list-date-start").val()
		var date = {dateFrom : dateFrom , dateTo : dateTo};
		
		return date;
	},

});