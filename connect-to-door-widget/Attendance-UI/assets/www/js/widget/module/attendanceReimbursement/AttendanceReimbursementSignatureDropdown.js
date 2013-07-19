Clazz.createPackage("com.attendance.widget.module.attendanceReimbursement");

Clazz.com.attendance.widget.module.attendanceReimbursement.AttendanceReimbursementSignatureDropdown = Clazz.extend(Clazz.WidgetWithTemplate, {
	templateUrl: "../template/attendanceReimbursement/attendanceReimbursementSignatureDropdown.tmp",
	reimbursementStatus : null,
	CookieAPI: null,
	dropDownControllerListener:null,
	insertSignatureListener : null,

	/**
	 * @author ty_astanto
	 * initialize construct object
	 */
	initialize : function(config){
		this.dropDownControllerListener = new Clazz.com.attendance.widget.listener.DropDownControllerListener();
		this.CookieAPI = new Clazz.com.attendance.api.CookieAPI();
		this.reimbursementStatus = this.CookieAPI.getReimbursementStatus();
		this.insertSignatureListener = new Clazz.com.attendance.widget.listener.InsertSignatureListener();
		this.selectDropdownUIByReimbursementStatus();
	},

	bindUI : function(){
		var self = this;
		var authority = this.CookieAPI.getAuthority();
		if(authority == "General Manager"
			|| authority == "Super Admin"){
			$('.attendance-reimbursement-submitted-approval-dropdown').text('Mohammad Daud');
			$('.reimbursement-approval-dropdown-content-build-apm').css('visibility','hidden');
			$('.attendance-reimbursement-submitted-approval-dropdown').css('cursor','default');
			$('.reimbursement-arrow-box').css('cursor','default');
			$('.reimbursement-arrow-box').css('visibility','hidden');
		}
		
		if (this.reimbursementStatus == "build"){
			this.insertSignatureListener.getListFromAPI("apm");
		}else {
			this.insertSignatureListener.getListFromAPI("gm");
		}
		
	},

	selectDropdownUIByReimbursementStatus : function(){
		var self = this;
		require(["lib/handlebars-1.0.0.beta.6"],function(){
			Handlebars.registerHelper('if-build',function(opt){
				if(self.reimbursementStatus == "build"){
					return opt.fn(this);
				}
			});
			Handlebars.registerHelper('if-apm',function(opt){
				if(self.reimbursementStatus == "apm"){
					return opt.fn(this);
				}
			});
			Handlebars.registerHelper('if-build-apm',function(opt){
				if(self.reimbursementStatus == "build-apm"){
					return opt.fn(this);
				}
			});
		});
	},

	/**
	 * @author ty_astanto
	 * controller dropdown in template
	 */
	dropdownController : function(){
		var self = this;
		var dropDownContentItem = $(".reimbursement-approval-dropdown-item , .reimbursement-approval-dropdown-item-apm");
		var dropDownValue = $('.attendance-reimbursement-submitted-approval-dropdown');
		var dropDownValueButton = $('.attendance-reimbursement-submitted-approval-dropdown , .reimbursement-arrow-box');
		var dropDownContent = $('.reimbursement-approval-dropdown-content-build, .reimbursement-approval-dropdown-content-apm, .reimbursement-approval-dropdown-content-build-apm');
		dropDownContent.hide();

		dropDownContentItem.click(function(){
			self.dropDownControllerListener.dropDownSelectControllerLargeScreen(dropDownContent);
			self.CookieAPI.saveAssignTo($(this).data("employeeId"));
			var value = $(this).text();
			dropDownValue.text(value);
		});

		dropDownValueButton.click(function(event){
			$('.attendance-reimbursement-content-no , .attendance-reimbursement-content-date , .attendance-reimbursement-content-description , .attendance-reimbursement-content-quantity , .attendance-reimbursement-content-cost').removeClass('request-list-highlight');
			$('.attendance-reimbursement-dropdown-master-content').slideUp();
			self.dropDownControllerListener.dropDownControllerLargeScreen(dropDownContent, event);
		});

	},

	setDropdownItem : function(data){
		var self = this;
		dataLength = data.length;
		var voucherStatus = this.CookieAPI.getReimbursementStatus();;
		if(voucherStatus == "build"){
			for(var index in data){
				var itemDropdown = $('<div class=reimbursement-approval-dropdown-item-apm >'+ data[index].employee_name +'</div>').data("employeeId",data[index].employee_id );
				$('.reimbursement-approval-dropdown-content-build').append(itemDropdown);
			}
			var selector = $('.reimbursement-approval-dropdown-content-build');
			self.setDropdownHeight(dataLength, selector);
		}else if(voucherStatus == "apm"){
			for(var index in data){
				var itemDropdown = $('<div class=reimbursement-approval-dropdown-item-apm >'+ data[index].employee_name +'</div>').data("employeeId",data[index].employee_id );
				$('.reimbursement-approval-dropdown-content-apm').append(itemDropdown);
			}
			var selector = $('.reimbursement-approval-dropdown-content-apm');
			self.setDropdownHeight(dataLength, selector);
		}else{
			for(var index in data){
				var itemDropdown = $('<div class=reimbursement-approval-dropdown-item-apm >'+ data[index].employee_name +'</div>').data("employeeId",data[index].employee_id );
				$('.reimbursement-approval-dropdown-content-build-apm').append(itemDropdown);
			}
			var selector = $('.reimbursement-approval-dropdown-content-build-apm');
			self.setDropdownHeight(dataLength, selector);
		}
	},

	setDropdownHeight : function(dataLength, selector){
		height = dataLength * 27;
		selector.css("height",height);
		this.dropdownController();
	},

	// default container place
	defaultContainer : "attendance\\:reimbursement-signature-dropdown",
});
