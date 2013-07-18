Clazz.createPackage("com.attendance.widget.module.attendanceReimbursement");

Clazz.com.attendance.widget.module.attendanceReimbursement.AttendanceReimbursementDropDown = Clazz.extend(Clazz.WidgetWithTemplate, {
	templateUrl: "../template/attendanceReimbursement/attendanceReimbursementDropdown.tmp",
	submenu_active : null,
	CookieAPI:null,
	dropDownControllerListener:null,
	reimbursementType : null,
	/**
	 * @author dhika_p
	 * initialize construct object
	 */
	initialize : function(config){
		var self = this;
		this.dropDownControllerListener = new Clazz.com.attendance.widget.listener.DropDownControllerListener();
		this.CookieAPI = new Clazz.com.attendance.api.CookieAPI();
		var requestID = this.CookieAPI.getRequest();
		if(requestID !== null && requestID !== undefined && requestID !== ""){
			self.CookieAPI.saveDropDownValueReimbursement(config.reimbursementType); 
		}
	},

	bindUI : function(){
		var self = this;
		var dropDownValue = this.CookieAPI.getDropDownValueReimbursement();
		if(dropDownValue != "" || dropDownValue != null){
			$('.attendance-reimbursement-input-dropdown').val(dropDownValue);
		}

		if(this.CookieAPI.getReimbursementStatus() == "build" || this.CookieAPI.getReimbursementStatus() == "build-apm"){
			this.CookieAPI.clearDropDownValueReimbursement();

			var dropDownContentItem = $(".attendance-reimbursement-dropdown-content");
			var dropDownValueReimbursement = $('.attendance-reimbursement-input-dropdown');
			var dropDownValueButton = $('.attendance-reimbursement-input-dropdown , .attendance-reimbursement-arrow-dropdown');
			var dropDownContent = $('.attendance-reimbursement-dropdown-master-content');
			dropDownValueReimbursement.attr("readonly",true);
			dropDownContent.hide();

			dropDownValueButton.click(function(event){
				$('.reimbursement-approval-dropdown-content-build').slideUp();
				self.dropDownControllerListener.dropDownController(dropDownContent, event);
			});

			dropDownContentItem.click(function(){
				self.dropDownControllerListener.dropDownSelectController(dropDownContent);
				var value = $(this).text();
				dropDownValueReimbursement.val(value);
				self.CookieAPI.saveDropDownValueReimbursement(value);
			});
		}
		else{
			$('.attendance-reimbursement-dropdown-master-content').hide();
			$('.attendance-reimbursement-input-dropdown , .attendance-reimbursement-arrow-dropdown').css("visibility","hidden");
			$('.attendance-reimbursement-dropdown-text-right').css("visibility","visible");
			$('.attendance-reimbursement-dropdown-text-right').text(dropDownValue);
		}
	},

	// default container place
	defaultContainer : "attendance\\:reimbursement-dropdown"	
});
